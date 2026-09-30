<template>
  <div
    ref="stage"
    class="travel-model"
    :class="{ 'fullscreen-fallback': fallbackFullscreen }"
    :aria-label="`${model.label}三维场景；方向键旋转，加减键缩放，双击全屏`"
    tabindex="0"
    @dblclick.prevent="toggleFullscreen"
    @keydown="onKeydown"
  >
    <div ref="viewport" class="model-viewport" />
    <div class="model-toolbar" @dblclick.stop>
      <span>{{ model.label }}</span>
    </div>
    <p v-if="status" class="model-status" role="status">{{ status }}</p>
  </div>
  <Teleport to="body">
    <aside v-if="debug && inView" class="model-debug" @dblclick.stop @pointerdown.stop>
      <header>
        <strong>model debug · {{ model.label }}</strong>
        <button type="button" @click="copyViewConfig">{{ copied ? '已复制' : '复制 view' }}</button>
      </header>
      <p class="debug-hint">拖动/滚轮调视角；点「记为最近/最远」写入缩放锁定，再复制贴到 travelPlaces</p>
      <dl>
        <div><dt>camera</dt><dd>{{ fmtVec(live.camera) }}</dd></div>
        <div><dt>target</dt><dd>{{ fmtVec(live.target) }}</dd></div>
        <div><dt>distanceScale</dt><dd>{{ live.distanceScale.toFixed(3) }}</dd></div>
        <div><dt>polarAngle</dt><dd>{{ live.polarAngle.toFixed(3) }}</dd></div>
        <div><dt>azimuth</dt><dd>{{ live.azimuthAngle.toFixed(3) }}</dd></div>
        <div><dt>minDistanceScale</dt><dd>{{ draft.minDistanceScale.toFixed(3) }}</dd></div>
        <div><dt>maxDistanceScale</dt><dd>{{ draft.maxDistanceScale.toFixed(3) }}</dd></div>
        <div><dt>minPolarAngle</dt><dd>{{ draft.minPolarAngle.toFixed(3) }}</dd></div>
        <div><dt>maxPolarAngle</dt><dd>{{ draft.maxPolarAngle.toFixed(3) }}</dd></div>
      </dl>
      <div class="debug-actions">
        <button type="button" @click="captureMinDistance">记为最近</button>
        <button type="button" @click="captureMaxDistance">记为最远</button>
        <button type="button" @click="captureMinPolar">记为俯仰下限</button>
        <button type="button" @click="captureMaxPolar">记为俯仰上限</button>
        <button type="button" @click="applyDraftLimits">应用锁定</button>
        <button type="button" @click="resetDraft">恢复配置</button>
      </div>
      <pre>{{ viewConfigSnippet }}</pre>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { withBase } from 'vitepress'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
  import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js'
  import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
  import type { TravelModel, TravelModelView } from '../../../../../public/map/js/travelPlaces'

  type Vec3 = [number, number, number]

  const DEFAULT_VIEW = {
    camera: [12, 82, 310] as Vec3,
    target: [0, 16, 0] as Vec3,
    fitDistance: 318,
    minDistanceScale: 0.78,
    maxDistanceScale: 1.35,
    minPolarAngle: Math.PI / 9,
    maxPolarAngle: Math.PI / 2 - 0.21,
  }

  
  const props = defineProps<{ model: TravelModel }>()
  const view = computed(() => ({ ...DEFAULT_VIEW, ...props.model.view }))

  const stage = ref<HTMLDivElement>()
  const viewport = ref<HTMLDivElement>()
  const status = ref('正在加载模型…')
  const fullscreen = ref(false)
  const fallbackFullscreen = ref(false)
  const debug = ref(false)
  const inView = ref(false)
  const copied = ref(false)
  const live = reactive({
    camera: [...DEFAULT_VIEW.camera] as Vec3,
    target: [...DEFAULT_VIEW.target] as Vec3,
    distanceScale: 1,
    polarAngle: 0,
    azimuthAngle: 0,
  })
  const draft = reactive({
    minDistanceScale: DEFAULT_VIEW.minDistanceScale,
    maxDistanceScale: DEFAULT_VIEW.maxDistanceScale,
    minPolarAngle: DEFAULT_VIEW.minPolarAngle,
    maxPolarAngle: DEFAULT_VIEW.maxPolarAngle,
  })

  let controls: OrbitControls | undefined
  let camera: THREE.PerspectiveCamera | undefined
  let fitDistance = 0
  /** 轨道注视点：始终锁定为配置值，禁止平移偏移 */
  const orbitTarget = new THREE.Vector3(...DEFAULT_VIEW.target)
  let observer: IntersectionObserver | undefined
  let cleanup = () => {}
  let disposed = false
  let previousOverflow = ''
  let copyTimer = 0

  const round3 = (n: number) => Math.round(n * 1000) / 1000
  const fmtVec = (v: Vec3) => `[${v.map((n) => round3(n)).join(', ')}]`
  const lockOrbitTarget = () => {
    if (!controls) return
    if (!controls.target.equals(orbitTarget)) {
      controls.target.copy(orbitTarget)
    }
  }
  const syncDraftFromView = () => {
    Object.assign(draft, {
      minDistanceScale: view.value.minDistanceScale,
      maxDistanceScale: view.value.maxDistanceScale,
      minPolarAngle: view.value.minPolarAngle,
      maxPolarAngle: view.value.maxPolarAngle,
    })
  }
  const syncLive = () => {
    if (!camera || !controls || !fitDistance) return
    lockOrbitTarget()
    live.camera = [camera.position.x, camera.position.y, camera.position.z]
    live.target = [orbitTarget.x, orbitTarget.y, orbitTarget.z]
    const offset = camera.position.clone().sub(orbitTarget)
    const spherical = new THREE.Spherical().setFromVector3(offset)
    live.distanceScale = spherical.radius / fitDistance
    live.polarAngle = spherical.phi
    live.azimuthAngle = spherical.theta
  }

  /** 写入限位；ensurePose 为 true 时扩展限位以包含当前姿态 */
  const applyLimits = (unlockExplore: boolean, ensurePose = false) => {
    if (!controls || !fitDistance || !camera) return
    if (unlockExplore) {
      controls.minDistance = fitDistance * 0.25
      controls.maxDistance = fitDistance * 4
      controls.minPolarAngle = 0.05
      controls.maxPolarAngle = Math.PI - 0.05
      return
    }
    if (ensurePose) {
      const offset = camera.position.clone().sub(orbitTarget)
      const spherical = new THREE.Spherical().setFromVector3(offset)
      const scale = spherical.radius / fitDistance
      // 略放宽，避免浮点导致 update 仍夹掉初始姿态
      draft.minDistanceScale = Math.min(draft.minDistanceScale, scale * 0.999)
      draft.maxDistanceScale = Math.max(draft.maxDistanceScale, scale * 1.001)
      draft.minPolarAngle = Math.min(draft.minPolarAngle, spherical.phi - 1e-4)
      draft.maxPolarAngle = Math.max(draft.maxPolarAngle, spherical.phi + 1e-4)
    }
    controls.minDistance = fitDistance * draft.minDistanceScale
    controls.maxDistance = fitDistance * draft.maxDistanceScale
    controls.minPolarAngle = draft.minPolarAngle
    controls.maxPolarAngle = draft.maxPolarAngle
  }

  /** 按配置精确落位；须在 fitDistance 已按画幅算好之后调用 */
  const applyConfiguredPose = () => {
    if (!camera || !controls || !fitDistance) return
    syncDraftFromView()
    orbitTarget.set(...view.value.target)
    // 先完全放开限位，让 update 同步内部球坐标时不夹持
    controls.minDistance = 0
    controls.maxDistance = Infinity
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
    controls.target.copy(orbitTarget)
    camera.position.set(...view.value.camera)
    controls.update()
    lockOrbitTarget()
    // 再写入真实限位，但不再 update，避免非 debug 把初始姿态夹走
    applyLimits(debug.value, true)
    // 钉死配置坐标与朝向（与 debug / 非 debug 同一路径）
    camera.position.set(...view.value.camera)
    controls.target.copy(orbitTarget)
    camera.lookAt(orbitTarget)
    syncLive()
  }

  const resolvedViewConfig = computed((): Required<TravelModelView> => ({
    camera: live.camera.map(round3) as Vec3,
    target: live.target.map(round3) as Vec3,
    fitDistance: round3(view.value.fitDistance),
    minDistanceScale: round3(draft.minDistanceScale),
    maxDistanceScale: round3(draft.maxDistanceScale),
    minPolarAngle: round3(draft.minPolarAngle),
    maxPolarAngle: round3(draft.maxPolarAngle),
  }))
  const viewConfigSnippet = computed(() => {
    const c = resolvedViewConfig.value
    return [
      'view: {',
      `  camera: [${c.camera.join(', ')}],`,
      `  target: [${c.target.join(', ')}],`,
      `  fitDistance: ${c.fitDistance},`,
      `  minDistanceScale: ${c.minDistanceScale},`,
      `  maxDistanceScale: ${c.maxDistanceScale},`,
      `  minPolarAngle: ${c.minPolarAngle},`,
      `  maxPolarAngle: ${c.maxPolarAngle},`,
      '},',
    ].join('\n')
  })

  const captureMinDistance = () => {
    draft.minDistanceScale = Math.min(live.distanceScale, draft.maxDistanceScale)
  }
  const captureMaxDistance = () => {
    draft.maxDistanceScale = Math.max(live.distanceScale, draft.minDistanceScale)
  }
  const captureMinPolar = () => {
    draft.minPolarAngle = Math.min(live.polarAngle, draft.maxPolarAngle)
  }
  const captureMaxPolar = () => {
    draft.maxPolarAngle = Math.max(live.polarAngle, draft.minPolarAngle)
  }
  const applyDraftLimits = () => {
    applyLimits(false)
    controls?.update()
    syncLive()
  }
  const resetDraft = () => {
    if (!camera || !controls) return
    fitDistance = view.value.fitDistance * Math.max(1, 1.1 / camera.aspect)
    applyConfiguredPose()
  }
  const copyViewConfig = async () => {
    // 复制前把当前姿态纳入限位，保证贴回后能原样初始化
    draft.minDistanceScale = Math.min(draft.minDistanceScale, live.distanceScale)
    draft.maxDistanceScale = Math.max(draft.maxDistanceScale, live.distanceScale)
    draft.minPolarAngle = Math.min(draft.minPolarAngle, live.polarAngle)
    draft.maxPolarAngle = Math.max(draft.maxPolarAngle, live.polarAngle)
    try {
      await navigator.clipboard.writeText(viewConfigSnippet.value)
      copied.value = true
      window.clearTimeout(copyTimer)
      copyTimer = window.setTimeout(() => { copied.value = false }, 1500)
    } catch {
      copied.value = false
    }
  }

  /** 全屏切换后等 Vue 落 class / 浏览器落 :fullscreen，再强制 resize */
  let onFullscreenLayout: (() => void) | undefined
  const syncFullscreen = () => {
    fullscreen.value = document.fullscreenElement === stage.value || fallbackFullscreen.value
    void nextTick(() => {
      requestAnimationFrame(() => onFullscreenLayout?.())
    })
  }
  const closeFallback = () => {
    if (!fallbackFullscreen.value) return
    fallbackFullscreen.value = false
    document.body.style.overflow = previousOverflow
    syncFullscreen()
    stage.value?.focus({ preventScroll: true })
  }
  const toggleFullscreen = async () => {
    if (!stage.value) return
    if (fallbackFullscreen.value) return closeFallback()
    try {
      if (document.fullscreenElement === stage.value) await document.exitFullscreen()
      else await stage.value.requestFullscreen()
    } catch {
      if (disposed) return
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      fallbackFullscreen.value = true
      syncFullscreen()
    }
  }
  const onEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeFallback()
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.target !== stage.value || !controls || !camera) return
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-'].includes(event.key)) return
    event.preventDefault()
    const offset = camera.position.clone().sub(orbitTarget)
    const spherical = new THREE.Spherical().setFromVector3(offset)
    if (event.key === 'ArrowLeft') spherical.theta -= 0.1
    if (event.key === 'ArrowRight') spherical.theta += 0.1
    if (event.key === 'ArrowUp') spherical.phi -= 0.1
    if (event.key === 'ArrowDown') spherical.phi += 0.1
    if (event.key === '+' || event.key === '=') spherical.radius *= 0.9
    if (event.key === '-') spherical.radius /= 0.9
    camera.position.copy(orbitTarget).add(offset.setFromSpherical(spherical))
    controls.update()
    lockOrbitTarget()
    syncLive()
  }

  const loadScene = async () => {
    if (!viewport.value || disposed) return
    try {
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xf7f7f5)
      scene.fog = new THREE.Fog(0xf7f7f5, 650, 1600)
      camera = new THREE.PerspectiveCamera(39, 1, 1, 2400)
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 0.95
      viewport.value.append(renderer.domElement)
      const contextLost = (event: Event) => {
        event.preventDefault()
        status.value = '图形上下文已丢失，请刷新页面'
      }
      renderer.domElement.addEventListener('webglcontextlost', contextLost)
      cleanup = () => {
        renderer.domElement.removeEventListener('webglcontextlost', contextLost)
        renderer.dispose()
        renderer.domElement.remove()
      }
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enablePan = false
      scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dcda, 0.95))
      const key = new THREE.DirectionalLight(0xffffff, 3.3)
      key.position.set(-65, 85, 105)
      key.castShadow = true
      key.shadow.mapSize.set(2048, 2048)
      Object.assign(key.shadow.camera, { left: -135, right: 135, top: 105, bottom: -105, near: 1, far: 400 })
      key.shadow.normalBias = 0.12
      key.shadow.bias = -0.00005
      scene.add(key)
      const fill = new THREE.DirectionalLight(0xffffff, 0.35)
      fill.position.set(80, 80, -80)
      scene.add(fill)
      const composer = new EffectComposer(renderer)
      composer.setPixelRatio(renderer.getPixelRatio())
      const ao = new SSAOPass(scene, camera, 1, 1, 32)
      ao.kernelRadius = 3
      ao.minDistance = 0.0002
      ao.maxDistance = 0.035
      composer.addPass(new RenderPass(scene, camera))
      composer.addPass(ao)
      composer.addPass(new OutputPass())
      let ready = false
      let poseReady = false
      const syncAoCamera = () => {
        ao.ssaoMaterial.uniforms.cameraNear.value = camera!.near
        ao.ssaoMaterial.uniforms.cameraFar.value = camera!.far
        ao.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(camera!.projectionMatrix)
        ao.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(camera!.projectionMatrixInverse)
      }
      const render = () => {
        if (!ready || disposed) return
        syncAoCamera()
        composer.render()
      }
      const placeAtDistance = (distance: number) => {
        const offset = camera!.position.clone().sub(orbitTarget)
        if (offset.lengthSq() < 1e-8) {
          // 零向量无法 setLength；用当前球坐标/默认后方回退
          offset.set(0, 0, 1)
        }
        offset.setLength(distance)
        camera!.position.copy(orbitTarget).add(offset)
      }
      const resize = () => {
        if (!viewport.value || !camera || !controls) return
        const { clientWidth: width, clientHeight: height } = viewport.value
        if (!width || !height) return
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
        composer.setPixelRatio(renderer.getPixelRatio())
        composer.setSize(width, height)
        const nextFit = view.value.fitDistance * Math.max(1, 1.1 / camera.aspect)
        if (!poseReady) {
          // 首次：按当前画幅算 fit，再精确套用配置姿态（不被限位夹走）
          fitDistance = nextFit
          applyConfiguredPose()
          poseReady = true
        } else if (Math.abs(nextFit - fitDistance) > 1) {
          // 竖图缩略图 ↔ 全屏横屏等：fit 基准变了就不能按比例拉近，否则相机会扎进模型、SSAO 花屏
          fitDistance = nextFit
          applyConfiguredPose()
        } else {
          // 同基准下的纯尺寸变化：保持相对缩放比
          const distance = camera.position.distanceTo(orbitTarget)
          const zoom = fitDistance > 0 ? distance / fitDistance : 1
          fitDistance = nextFit
          const nextDistance = nextFit * zoom
          controls.minDistance = 0
          controls.maxDistance = Infinity
          placeAtDistance(nextDistance)
          controls.target.copy(orbitTarget)
          controls.update()
          applyLimits(debug.value, true)
          placeAtDistance(nextDistance)
          controls.target.copy(orbitTarget)
          camera.lookAt(orbitTarget)
          lockOrbitTarget()
          syncLive()
        }
        render()
      }
      onFullscreenLayout = resize
      const onControlsChange = () => {
        lockOrbitTarget()
        syncLive()
        render()
      }
      controls.addEventListener('change', onControlsChange)
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(viewport.value)
      resize()
      const releaseRenderer = cleanup
      cleanup = () => {
        onFullscreenLayout = undefined
        resizeObserver.disconnect()
        controls?.removeEventListener('change', onControlsChange)
        controls?.dispose()
        scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose()
            for (const material of [object.material].flat()) material.dispose()
          }
        })
        key.shadow.dispose()
        for (const pass of composer.passes) pass.dispose?.()
        composer.dispose()
        releaseRenderer()
      }
      const gltf = await new GLTFLoader().loadAsync(withBase(props.model.src))
      if (disposed) {
        gltf.scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose()
            for (const material of [object.material].flat()) material.dispose()
          }
        })
        return
      }
      gltf.scene.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = !object.name.startsWith('16')
          object.receiveShadow = true
        }
      })
      scene.add(gltf.scene)
      ready = true
      status.value = ''
      // 模型就位后再钉一次，避免加载期间 resize/限位改过姿态
      if (poseReady) applyConfiguredPose()
      syncLive()
      render()
    } catch (error) {
      cleanup()
      cleanup = () => {}
      if (!disposed) status.value = '模型加载失败，请刷新页面重试'
      console.error('Travel model:', error)
    }
  }

  onMounted(() => {
    debug.value = new URLSearchParams(location.search).get('debug') === '1'
    document.addEventListener('fullscreenchange', syncFullscreen)
    document.addEventListener('keydown', onEscape)
    let sceneStarted = false
    observer = new IntersectionObserver((entries) => {
      inView.value = entries.some((entry) => entry.isIntersecting)
      if (inView.value && !sceneStarted) {
        sceneStarted = true
        if (!debug.value) observer?.disconnect()
        void loadScene()
      }
    }, { rootMargin: debug.value ? '0px' : '200px' })
    if (stage.value) observer.observe(stage.value)
  })
  // 配置热更新时重新套用视角（不依赖 remount）
  watch(
    () => props.model.view,
    () => {
      if (!camera || !controls || !fitDistance) return
      applyConfiguredPose()
    },
    { deep: true },
  )
  onBeforeUnmount(() => {
    disposed = true
    observer?.disconnect()
    document.removeEventListener('fullscreenchange', syncFullscreen)
    document.removeEventListener('keydown', onEscape)
    window.clearTimeout(copyTimer)
    closeFallback()
    cleanup()
    cleanup = () => {}
  })
</script>

<style scoped>
  .travel-model { position: relative; width: min(200px, 100%); aspect-ratio: var(--poster-ratio, 2 / 3); flex-shrink: 0; overflow: hidden; border-radius: 8px; background: #f7f7f5; color: #343936; }
  .model-viewport { position: absolute; inset: 0; }
  .model-viewport :deep(canvas) { display: block; width: 100%; height: 100%; touch-action: none; }
  .model-toolbar { position: absolute; inset: 8px 8px auto; display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; pointer-events: none; }
  .travel-model:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: -2px; }
  .model-status { position: absolute; inset: 40% 12px auto; text-align: center; font-size: 12px; pointer-events: none; }
  .travel-model:fullscreen, .fullscreen-fallback { width: 100vw; height: 100dvh; max-width: none; aspect-ratio: auto; border-radius: 0; }
  .fullscreen-fallback { position: fixed; inset: 0; z-index: 10000; }
</style>

<style>
  /* Teleport 到 body，不受场景容器尺寸影响 */
  .model-debug {
    position: fixed;
    top: 72px;
    right: 16px;
    z-index: 10050;
    width: min(360px, calc(100vw - 32px));
    max-height: calc(100dvh - 96px);
    overflow: auto;
    border-radius: 8px;
    background: #1f2421f0;
    color: #e8ece9;
    padding: 10px;
    font-size: 11px;
    line-height: 1.4;
    box-shadow: 0 8px 28px #00000040;
  }
  .model-debug header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
  .model-debug button {
    cursor: pointer; border: 0; border-radius: 4px;
    background: #ffffffde; padding: 2px 6px; color: #343936; font: inherit;
  }
  .model-debug .debug-hint { margin: 0 0 6px; opacity: 0.75; }
  .model-debug dl { margin: 0; display: grid; gap: 2px; }
  .model-debug dl > div { display: grid; grid-template-columns: 120px 1fr; gap: 6px; }
  .model-debug dt { opacity: 0.65; }
  .model-debug dd { margin: 0; font-variant-numeric: tabular-nums; word-break: break-all; }
  .model-debug .debug-actions { display: flex; flex-wrap: wrap; gap: 4px; margin: 8px 0; }
  .model-debug pre {
    margin: 0; white-space: pre-wrap; word-break: break-word;
    background: #00000040; border-radius: 4px; padding: 6px; font-size: 10px;
  }
</style>
