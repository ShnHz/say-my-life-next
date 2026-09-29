<template>
  <div
    class="travel-map-wrap"
    :class="{ 'is-embedded': embedded }"
  >
    <div ref="wrapperRef" class="cobe-wrapper">
      <!--
        必须把 canvas 包在与 canvas 同尺寸的方形 stage 里：
        cobe v2 会在 canvas 外自动套一层 100%×100% 的 div 并把锚点 div 注入其中，
        锚点 left/top 用的是该 div 的百分比，但 cobe 的投影坐标是基于 canvas 像素的，
        所以这层 div 必须 = canvas 大小，否则 label 会偏离 globe（参考 cobe-main 的 .showcases-globe）。
      -->
      <div ref="stageRef" class="cobe-stage">
        <canvas
          ref="canvasRef"
          class="cobe-canvas"
          :tabindex="embedded ? undefined : 0"
          :aria-label="embedded ? '旅行地球' : '旅行地球：滚轮缩放，拖拽旋转，键盘加减号缩放'"
          @keydown="onGlobeKeydown"
        />

        <span
          v-for="item in cobeV2Markers"
          :key="item.id"
          class="cobe-label"
          :class="{ 'is-cluster': item.children.length }"
          :style="markerOverlayStyle(item.id)"
        >
          {{ markerText(item) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import createGlobe, { type COBEOptions, type Globe } from 'cobe'
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    shallowRef,
    ref,
    type CSSProperties,
  } from 'vue'
  import { travelPlaces } from '../../../../../../public/map/js/travelPlaces'
  import { buildLodTree, selectLodMarkers, markerText, layoutLabels, type LodMarker } from './globeLod'

  const props = withDefaults(
    defineProps<{
      /** 首页背景：透明底、铺满父级，仅自转、不接收操作 */
      embedded?: boolean
    }>(),
    {
      embedded: false,
    },
  )

  const stageRef = ref<HTMLDivElement | null>(null)
  const zoom = ref(1)
  const stageWidth = ref(600)
  const MAX_ZOOM = 12
  const tree = buildLodTree(travelPlaces)
  const labelLayout = shallowRef<ReturnType<typeof layoutLabels>>({})
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const canvasRef = ref<HTMLCanvasElement | null>(null)

  let globe: Globe | null = null
  let animationId = 0
  let resizeObserver: ResizeObserver | null = null
  /**
   * 初始自转相位：使中国（约东经 105° 一线）大致朝向镜头。
   * 若加载后大陆偏左/偏右，可微调 CHINA_MERIDIAN_DEG（±5°～15°），或把前面负号改成正号。
   */
  const CHINA_MERIDIAN_DEG = 250
  let phi = (-CHINA_MERIDIAN_DEG * Math.PI) / 180

  let isDraggingGlobe = false
  let dragLastX = 0
  let dragLastY = 0

  const markerElevation = 0.01
  const defaultTheta = 0.2

  /** 竖直视角，由拖拽与默认值共同决定 */
  let interactiveTheta = defaultTheta

  const cobeV2Markers = computed(() =>
    selectLodMarkers(tree, stageWidth.value, zoom.value).map(marker => ({
      ...marker, size: marker.size / zoom.value,
    })),
  )

  function markerOverlayStyle(id: string): CSSProperties {
    const layout = labelLayout.value[id]
    return {
      positionAnchor: `--cobe-${id}`,
      visibility: layout?.visible ? 'visible' : 'hidden',
      translate: `-50% ${layout?.offset ?? 0}px`,
    }
  }

  function setZoom(value: number) {
    zoom.value = Math.min(MAX_ZOOM, Math.max(1, value))
  }

  function onGlobeWheel(event: WheelEvent) {
    if (props.embedded) return
    event.preventDefault()
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stageWidth.value : 1)
    setZoom(zoom.value * Math.exp(-Math.max(-100, Math.min(100, delta)) * 0.005))
  }

  function onGlobeKeydown(event: KeyboardEvent) {
    if (props.embedded || !['+', '=', '-'].includes(event.key)) return
    event.preventDefault()
    setZoom(zoom.value * (event.key === '-' ? 1 / 1.5 : 1.5))
  }

  function getGlobeOptions(width: number): COBEOptions {
    return {
      width,
      height: width,
      phi,
      theta: interactiveTheta,
      scale: zoom.value,
      mapSamples: 16000,
      mapBrightness: 10,
      baseColor: [1, 1, 1],
      markerColor: [0.3, 0.45, 0.85],
      glowColor: [0.94, 0.93, 0.91],
      markers: cobeV2Markers.value,
      markerElevation,
      diffuse: 1.5,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      dark: 0,
      opacity: 0.7,
    }
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = 0
    }
  }

  function destroyGlobe() {
    stopAnimation()
    if (globe) {
      globe.destroy()
      globe = null
    }
    // COBE destroy 不移除它生成的 wrapper，避免每次 resize 再嵌套一层。
    const canvas = canvasRef.value
    if (canvas?.parentElement && canvas.parentElement !== stageRef.value) {
      canvas.parentElement.replaceWith(canvas)
    }
  }

  function startAnimation() {
    if (!globe) return
    let previousMarkers: LodMarker[] | undefined
    let lastLayout = 0
    const tick = (time = 0) => {
      // 首页和 Overview 始终自转，hover、拖拽和缩放都不暂停。
      phi += 0.001
      const markers = cobeV2Markers.value
      if (time - lastLayout > 80 || previousMarkers !== markers) {
        labelLayout.value = layoutLabels(markers, stageWidth.value, phi, interactiveTheta, zoom.value)
        lastLayout = time
      }
      globe?.update({
        phi,
        theta: interactiveTheta,
        scale: zoom.value,
        ...(previousMarkers !== markers ? { markers } : {}),
      })
      previousMarkers = markers
      animationId = requestAnimationFrame(tick)
    }
    tick()
  }

  const THETA_MIN = -1.5
  const THETA_MAX = 1.5

  function clampTheta(v: number) {
    return Math.min(THETA_MAX, Math.max(THETA_MIN, v))
  }

  function onGlobePointerDown(e: PointerEvent) {
    if (props.embedded || e.button !== 0 || !canvasRef.value) return
    isDraggingGlobe = true
    dragLastX = e.clientX
    dragLastY = e.clientY
    canvasRef.value.style.cursor = 'grabbing'
    try {
      canvasRef.value.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  function onGlobePointerMove(e: PointerEvent) {
    if (!isDraggingGlobe) return
    const dx = e.clientX - dragLastX
    const dy = e.clientY - dragLastY
    dragLastX = e.clientX
    dragLastY = e.clientY
    phi += dx * 0.005 / zoom.value
    interactiveTheta = clampTheta(interactiveTheta + dy * 0.005 / zoom.value)
  }

  function endGlobeDrag(e?: PointerEvent) {
    if (!isDraggingGlobe) return
    isDraggingGlobe = false
    if (canvasRef.value) {
      canvasRef.value.style.cursor = 'grab'
    }
    if (e && canvasRef.value && canvasRef.value.hasPointerCapture(e.pointerId)) {
      try {
        canvasRef.value.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }
  }

  function toggleFullscreen() {
    const el = wrapperRef.value
    if (!el) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void el.requestFullscreen()
    }
  }

  function onGlobeDoubleClick() {
    if (!props.embedded) toggleFullscreen()
  }

  function createOrRecreateGlobe() {
    const canvas = canvasRef.value
    if (!canvas) return

    const width = canvas.offsetWidth
    if (!width) return

    stageWidth.value = width
    destroyGlobe()
    globe = createGlobe(canvas, getGlobeOptions(width))
    startAnimation()
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (canvas && !props.embedded) {
      canvas.style.cursor = 'grab'
      canvas.addEventListener('pointerdown', onGlobePointerDown)
      canvas.addEventListener('pointermove', onGlobePointerMove)
      canvas.addEventListener('pointerup', endGlobeDrag)
      canvas.addEventListener('pointercancel', endGlobeDrag)
      canvas.addEventListener('dblclick', onGlobeDoubleClick)
      stageRef.value?.addEventListener('wheel', onGlobeWheel, { passive: false })
    }

    createOrRecreateGlobe()
    if (stageRef.value) {
      resizeObserver = new ResizeObserver(() => {
        createOrRecreateGlobe()
      })
      resizeObserver.observe(stageRef.value)
    }
  })

  onBeforeUnmount(() => {
    const canvas = canvasRef.value
    if (canvas) {
      canvas.removeEventListener('pointerdown', onGlobePointerDown)
      canvas.removeEventListener('pointermove', onGlobePointerMove)
      canvas.removeEventListener('pointerup', endGlobeDrag)
      canvas.removeEventListener('pointercancel', endGlobeDrag)
      canvas.removeEventListener('dblclick', onGlobeDoubleClick)
      stageRef.value?.removeEventListener('wheel', onGlobeWheel)
    }
    resizeObserver?.disconnect()
    resizeObserver = null
    destroyGlobe()
  })
</script>

<style lang="less">
  .travel-map-wrap {
    position: relative;
    height: calc(100vh - var(--vp-nav-height));
    background: #f7f8fb;
  }

  .travel-map-wrap.is-embedded {
    height: 100%;
    min-height: 0;
    background: transparent;
    pointer-events: none;
  }

  .cobe-wrapper {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #f7f8fb;
  }

  .travel-map-wrap.is-embedded .cobe-wrapper {
    background: transparent;
  }

  /*
   * stage 必须严格等于 canvas 的渲染尺寸：
   * cobe 在 stage 内部插入 <div style="width:100%;height:100%"> 包住 canvas，并把 anchor div
   * 也注入这层。锚点 left/top 用的是该 div 的百分比，而 cobe 投影坐标是 canvas 像素归一化的，
   * 只有当 stage = canvas 时锚点才会落在 globe 上正确的位置。
   */
  .cobe-stage {
    position: relative;
    width: min(100%, calc(100vh - var(--vp-nav-height)));
    aspect-ratio: 1 / 1;
  }

  .cobe-wrapper:fullscreen {
    background: #f7f8fb;
  }

  .travel-map-wrap.is-embedded .cobe-wrapper:fullscreen {
    background: transparent;
  }

  .cobe-wrapper:fullscreen .cobe-stage {
    width: min(100vw, 100vh);
  }

  .cobe-canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    &:focus-visible { outline: 2px solid #4263ad; outline-offset: -2px; }
  }

  .is-embedded .cobe-canvas {
    touch-action: auto;
  }

  /*
   * 对齐 cobe-main website/app/globals.css `.showcase-default-label`
   * （官网用 0.6rem + translate，不用大号 12px；长中文地名需 max-width 否则会撑满屏）
   */
  .cobe-label {
    box-sizing: border-box;
    display: inline-block;
    width: fit-content;
    max-width: 140px;
    position: absolute;
    bottom: anchor(top);
    left: anchor(center);
    translate: -50% 0;
    margin-bottom: 6px;
    padding: 4px 7px;
    border: 0;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    background: lab(36 55.64 -107.68);
    color: #fff;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.04em;
    line-height: 1.2;
    white-space: nowrap;
    pointer-events: none;
    transition: translate 0.15s;

    &.is-cluster { background: #344c81; font-weight: 600; }
  }

  .cobe-label::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate3d(-50%, -1px, 0);
    border: 4px solid transparent;
    border-top-color: lab(36 55.64 -107.68);
  }

  /* 不支持 CSS Anchor Positioning 时隐藏，避免标签堆叠成全屏异常排版（见 cobe globals @supports） */
  @supports not (anchor-name: --test) {
    .cobe-label {
      display: none !important;
    }
  }
</style>
