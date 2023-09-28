<template>
  <div class="travtel-map-wrap">
    <div id="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { cityPolygon } from '../../../../../public/map/js/cityPolygon'
  import { city } from '../../../../../public/map/js/city'

  let map: any = null

  onMounted(() => {
    const hasScript = document.getElementById('amapLoader')
    if (!hasScript) {
      const script = document.createElement('script')
      script.id = 'amapLoader'
      script.src = 'https://webapi.amap.com/loader.js'
      script.onload = (e) => {
        console.log('map loader loaded')
        // @ts-ignore
        init()
      }
      document.head.appendChild(script)
    } else {
      init()
    }
  })

  const init = async () => {
    // @ts-ignore
    AMapLoader.load({
      key: 'f18a896571b2702b0ef2c949da4ed7da', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map('mapContainer', {
          zoom: 5, //初始化地图层级
          center: [120.19, 30.26], //初始化地图中心点
        })

        markerInit(AMap)
        polygonInit(AMap)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const markerInit = async (AMap) => {
    const address = city

    // 点标记显示内容，HTML要素字符串
    const markerContent =
      '<div class="custom-content-marker">' +
      '   <img src="https://cdn.chenyingshuang.cn/journey/location.png">' +
      '</div>'

    for (let i = 0; i < address.length; i++) {
      let point = {
        lng: address[i][1],
        lat: address[i][2],
      }

      const position = new AMap.LngLat(point.lng, point.lat) // Marker经纬度
      const marker = new AMap.Marker({
        position: position,
        content: markerContent, // 将 html 传给 content
        offset: new AMap.Pixel(-10, -10), // 以 icon 的 [center bottom] 为原点
      })

      map.add(marker)
    }
  }

  const polygonInit = async (AMap) => {
    const cityPolygons = cityPolygon.map((item) => {
      const polygonGroup = item.polygon.split('|')
      const polygon = polygonGroup.map((item) =>
        item
          .split(';')
          .map((_item) => _item.split(',').map((__item) => parseFloat(__item)))
      )
      return {
        ...item,
        polygon: polygon,
      }
    })

    for (let i = 0, len = cityPolygons.length; i < len; i++) {
      for (let j = 0, _len = cityPolygons[i].polygon.length; j < _len; j++) {
        const polygon = new AMap.Polygon({
          path: [cityPolygons[i].polygon[j]],
          fillColor: '#ccebc5', // 多边形填充颜色
          strokeOpacity: 1, // 线条透明度
          fillOpacity: 0.5, //填充透明度
          strokeColor: '#2b8cbe', // 线条颜色
          strokeWeight: 1, //线条宽度
          strokeStyle: 'dashed', // 线样式
          strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
        })
        map.add(polygon)
      }
    }
  }
</script>

<style lang="less">
  .travtel-map-wrap {
    height: calc(100vh - var(--vp-nav-height));
    #mapContainer {
      height: 100%;
    }

    .custom-content-marker {
      position: relative;
      width: 20px;
      height: 20px;
      img {
        width: 20px;
        height: 20px;
      }
    }

    .custom-content-marker img {
      width: 100%;
      height: 100%;
    }
  }
</style>
