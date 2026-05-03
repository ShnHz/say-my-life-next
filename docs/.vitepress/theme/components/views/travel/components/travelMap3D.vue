<template>
  <div
    class="travel-map-wrap"
    :class="[`mode-${mode}`, { 'is-embedded': embedded }]"
  >
    <el-radio-group
      v-if="!embedded"
      v-model="mode"
      class="cobe-mode-radio"
    >
      <el-radio-button label="cobeV2">COBE v2</el-radio-button>
      <el-radio-button label="polaroids">Polaroids</el-radio-button>
    </el-radio-group>

    <div ref="wrapperRef" class="cobe-wrapper">
      <!--
        必须把 canvas 包在与 canvas 同尺寸的方形 stage 里：
        cobe v2 会在 canvas 外自动套一层 100%×100% 的 div 并把锚点 div 注入其中，
        锚点 left/top 用的是该 div 的百分比，但 cobe 的投影坐标是基于 canvas 像素的，
        所以这层 div 必须 = canvas 大小，否则 label 会偏离 globe（参考 cobe-main 的 .showcases-globe）。
      -->
      <div class="cobe-stage">
        <canvas ref="canvasRef" class="cobe-canvas" />

        <template v-if="mode === 'cobeV2'">
          <div
            v-for="item in cobeV2Markers"
            :key="item.id"
            class="cobe-label"
            :style="markerOverlayStyle(item.id)"
          >
            {{ item.label }}
          </div>
        </template>

        <template v-else>
          <div
            v-for="item in polaroidsWithOverviewImages"
            :key="item.id"
            class="cobe-polaroid"
            :style="polaroidStyle(item.id, item.rotate)"
          >
            <img :src="item.image" :alt="item.caption" />
            <span class="cobe-polaroid-caption">{{ item.caption }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import createGlobe, { type COBEOptions, type Globe, type Marker } from 'cobe'
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    type CSSProperties,
  } from 'vue'
  import { city } from '../../../../../../public/map/js/city'
  import {
    polaroidMarkers,
    type PolaroidItem,
  } from '../../../../../../public/map/js/polaroids'

  type GlobeMode = 'cobeV2' | 'polaroids'

  interface TravelOverviewItem {
    name: string
    src: string
    video?: string
  }

  const props = withDefaults(
    defineProps<{
      overviewItems?: TravelOverviewItem[]
      /** 首页背景等场景：透明底、铺满父级、隐藏模式切换 */
      embedded?: boolean
    }>(),
    {
      overviewItems: () => [],
      embedded: false,
    },
  )

  /** 与 travel_overview.json 一致：去掉 VN/JP/SG 等前缀，便于与 Polaroid caption 对齐 */
  function normalizeOverviewPlaceName(name: string): string {
    return name.replace(/^[A-Z]{2,4}(?=[\u4e00-\u9fff])/u, '').trim()
  }

  function overviewSrcForCaption(caption: string): string | undefined {
    const cap = caption.trim()
    const rows = props.overviewItems ?? []
    if (!rows.length) return undefined

    for (const row of rows) {
      const simplified = normalizeOverviewPlaceName(row.name)
      if (
        simplified === cap ||
        row.name === cap ||
        simplified.includes(cap) ||
        row.name.endsWith(cap)
      ) {
        return row.src
      }
    }
    return undefined
  }

  /** Polaroid 占位图；若概览列表里能匹配地名则改用与下方相册相同的 CDN 地址 */
  const polaroidsWithOverviewImages = computed<PolaroidItem[]>(() =>
    polaroidMarkers.map((p) => ({
      ...p,
      image: overviewSrcForCaption(p.caption) ?? p.image,
    })),
  )

  interface CityMarker extends Marker {
    id: string
    label: string
  }

  interface ModeConfig {
    theta: number
    dark: number
    mapBrightness: number
    markerColor: [number, number, number]
    baseColor: [number, number, number]
    markerSize: number
    markerElevation: number
  }

  const mode = ref<GlobeMode>('cobeV2')
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

  const modeConfigs: Record<GlobeMode, ModeConfig> = {
    cobeV2: {
      theta: 0.2,
      dark: 0,
      mapBrightness: 10,
      /**
       * 这里的圆点是 cobe 用 WebGL 画的 marker 本体（非 DOM），就是 label 下方那个「贴在地球上的小点」。
       * 颜色和大小若过浅过小，会和白色地球完全融合 → 视觉上等于没有圆点。
       * 这里对齐 cobe-main showcaseConfigs.default 的取值。
       */
      markerColor: [0.3, 0.45, 0.85],
      baseColor: [1, 1, 1],
      markerSize: 0.015,
      markerElevation: 0.01,
    },
    polaroids: {
      theta: 0.2,
      dark: 0,
      mapBrightness: 9,
      markerColor: [0.3, 0.45, 0.85],
      baseColor: [1, 1, 1],
      markerSize: 0.012,
      markerElevation: 0,
    },
  }

  /** 竖直视角，由拖拽与模式默认共同决定 */
  let interactiveTheta = modeConfigs.cobeV2.theta

  const cobeV2Markers = computed<CityMarker[]>(() =>
    city.map((item, index) => ({
      id: `city-${index}`,
      label: item[0],
      location: [item[2], item[1]], // city.ts is [name, lng, lat], cobe needs [lat, lng]
      size: modeConfigs.cobeV2.markerSize,
    }))
  )

  const currentMarkers = computed<Marker[]>(() => {
    if (mode.value === 'cobeV2') {
      return cobeV2Markers.value
    }
    return polaroidsWithOverviewImages.value.map((item) => ({
      id: item.id,
      location: item.location,
      size: modeConfigs.polaroids.markerSize,
    }))
  })

  function markerOverlayStyle(id: string): CSSProperties {
    return {
      positionAnchor: `--cobe-${id}`,
      opacity: `var(--cobe-visible-${id}, 0)`,
      filter: `blur(calc((1 - var(--cobe-visible-${id}, 0)) * 8px))`,
    }
  }

  function polaroidStyle(id: string, rotate: number): CSSProperties {
    return {
      ...markerOverlayStyle(id),
      '--polaroid-rotate': `${rotate}deg`,
    } as CSSProperties
  }

  function getGlobeOptions(width: number): COBEOptions {
    const config = modeConfigs[mode.value]
    return {
      width,
      height: width,
      phi,
      theta: interactiveTheta,
      mapSamples: 16000,
      mapBrightness: config.mapBrightness,
      baseColor: config.baseColor,
      markerColor: config.markerColor,
      glowColor: [0.94, 0.93, 0.91],
      markers: currentMarkers.value,
      markerElevation: config.markerElevation,
      diffuse: 1.5,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      dark: config.dark,
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
  }

  function startAnimation() {
    if (!globe) return
    const tick = () => {
      if (!isDraggingGlobe) {
        phi += 0.001
      }
      globe?.update({
        phi,
        theta: interactiveTheta,
        markers: currentMarkers.value,
      })
      animationId = requestAnimationFrame(tick)
    }
    tick()
  }

  const THETA_MIN = 0.05
  const THETA_MAX = 1.35

  function clampTheta(v: number) {
    return Math.min(THETA_MAX, Math.max(THETA_MIN, v))
  }

  function onGlobePointerDown(e: PointerEvent) {
    if (e.button !== 0 || !canvasRef.value) return
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
    phi -= dx * 0.005
    interactiveTheta = clampTheta(interactiveTheta + dy * 0.005)
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
    toggleFullscreen()
  }

  function createOrRecreateGlobe() {
    const canvas = canvasRef.value
    if (!canvas) return

    const width = canvas.offsetWidth
    if (!width) return

    destroyGlobe()
    globe = createGlobe(canvas, getGlobeOptions(width))
    startAnimation()
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (canvas) {
      canvas.style.cursor = 'grab'
      canvas.addEventListener('pointerdown', onGlobePointerDown)
      canvas.addEventListener('pointermove', onGlobePointerMove)
      canvas.addEventListener('pointerup', endGlobeDrag)
      canvas.addEventListener('pointercancel', endGlobeDrag)
      canvas.addEventListener('dblclick', onGlobeDoubleClick)
    }

    createOrRecreateGlobe()
    if (wrapperRef.value) {
      resizeObserver = new ResizeObserver(() => {
        createOrRecreateGlobe()
      })
      resizeObserver.observe(wrapperRef.value)
    }
  })

  watch(mode, () => {
    interactiveTheta = modeConfigs[mode.value].theta
    createOrRecreateGlobe()
  })

  onBeforeUnmount(() => {
    const canvas = canvasRef.value
    if (canvas) {
      canvas.removeEventListener('pointerdown', onGlobePointerDown)
      canvas.removeEventListener('pointermove', onGlobePointerMove)
      canvas.removeEventListener('pointerup', endGlobeDrag)
      canvas.removeEventListener('pointercancel', endGlobeDrag)
      canvas.removeEventListener('dblclick', onGlobeDoubleClick)
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
  }

  .cobe-mode-radio {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 2;
  }

  .cobe-wrapper {
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
    padding: 2px 5px;
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
    transition: opacity 0.8s, filter 0.8s;
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
    .cobe-label,
    .cobe-polaroid {
      display: none !important;
    }
  }

  .cobe-polaroid {
    position: absolute;
    bottom: anchor(top);
    left: anchor(center);
    transform: translate(-50%, -12px) rotate(var(--polaroid-rotate, 0deg));
    width: 94px;
    padding: 6px 6px 20px;
    border-radius: 2px;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
    pointer-events: none;
    transition: opacity 0.3s, filter 0.3s;

    img {
      width: 82px;
      height: 82px;
      object-fit: cover;
      display: block;
    }
  }

  .cobe-polaroid-caption {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
    color: #111827;
    line-height: 1.2;
  }
</style>
