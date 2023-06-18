<template>
  <div class="travtel-map-wrap">
    <div id="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import AMapLoader from '@amap/amap-jsapi-loader'

  let map = null

  onMounted(() => {
    // @ts-ignore
    AMapLoader.load({
      key: 'f18a896571b2702b0ef2c949da4ed7da', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map('mapContainer')
      })
      .catch((e) => {
        console.log(e)
      })
  })
</script>

<style scoped lang="less">
  .travtel-map-wrap {
    height: calc(100vh - var(--vp-nav-height));
    #mapContainer {
      height: 100%;
    }
  }
</style>
