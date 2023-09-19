<template>
  <div class="my-3d-wrap">
    <canvas id="wrap3d"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  import { loaderZiyouGundamModel } from './ziyouGundam.js'

  onMounted(() => {
    init()
  })

  let animationId
  let canvas: HTMLCanvasElement
  let scene
  let camera
  let renderer
  let controls

  const FPS = {
    clock: new THREE.Clock(), // 设置渲染频率为30FBS，也就是每秒调用渲染器render方法大约30次
    FPS: 60, // 间隔多长时间渲染渲染一次
    timeS: 0,
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    const T = FPS.clock.getDelta()
    FPS.timeS = FPS.timeS + T
    if (FPS.timeS > 1 / FPS.FPS) {
      renderer.render(scene, camera)
      FPS.timeS = 0
    }
  }

  const init = async () => {
    canvas = document.querySelector('#wrap3d') as HTMLCanvasElement
    scene = new THREE.Scene()
    camera = initCamera()
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    controls = new OrbitControls(camera, renderer.domElement)
    // 添加坐标辅助线
    const axisHelper = new THREE.AxesHelper(10)
    scene.add(axisHelper)

    loaderZiyouGundamModel(scene)

    animate()
  }

  /**
   * 初始化相机
   */
  const initCamera = () => {
    const aspectRatio = canvas.clientWidth / canvas.clientHeight
    const fov = 45
    const aspect = aspectRatio // the canvas default
    const near = 0.01
    const far = 100000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 200
    return camera
  }
</script>

<style lang="less">
  .my-3d-wrap {
    height: calc(100vh - var(--vp-nav-height));
    #wrap3d {
      width: 100%;
      height: 100%;
    }
  }
</style>
