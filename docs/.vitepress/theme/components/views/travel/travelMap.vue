<template>
  <div class="travtel-map-wrap">
    <div id="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { cityPolygon } from '../../../../public/js/cityPolygon'

  let map: any = null

  onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://webapi.amap.com/loader.js'
    script.onload = (e) => {
      console.log('map loader loaded')
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
    document.head.appendChild(script)
  })

  const markerInit = async (AMap) => {
    const address = [
      ['越南河内', 105.84009, 21.03438],
      ['越南岘港', 108.1716007, 16.0472484],
      ['越南胡志明', 106.4143502, 10.7553405],
      ['泰国曼谷', 100.4926821, 13.7248934],
      ['泰国芭提雅', 100.8525478, 12.8868533],
      ['浙江省杭州市', 120.210911, 30.252333],
      ['浙江省宁波市', 121.62452, 29.865818],
      ['江西省玉山', 118.251563, 28.691045],
      ['重庆市', 106.549155, 29.571212],
      ['四川省成都市', 104.072745, 30.663277],
      ['浙江省淳安县', 119.05357, 29.609172],
      ['安徽省黄山市', 118.345436, 29.724649],
      ['浙江省宁海市', 121.433558, 29.294065],
      ['陕西省华阴市', 110.09573, 34.573465],
      ['陕西省西安市', 108.94359, 34.347984],
      ['浙江省衢州市', 118.870047, 28.974788],
      ['浙江舟山市东极岛', 122.701536, 30.200436],
      ['上海市', 121.476516, 31.23667],
      ['江苏省无锡市', 120.323756, 31.501519],
      ['天津市', 117.21499, 39.094015],
      ['北京市', 116.404763, 39.916901],
      ['浙江省温州市雁荡山', 121.071166, 28.385854],
      ['江苏省苏州市', 120.629781, 31.335894],
      ['江苏省南京市', 118.800697, 32.065876],
      ['江苏省常州市', 119.979759, 31.81555],
      ['浙江省奉化市', 121.201382, 29.693029],
      ['浙江省绍兴市', 120.590023, 30.059909],
      ['浙江省台州市', 121.423408, 28.663968],
      ['海南省文昌市文昌站', 110.751541, 19.611148],
      ['海南省三亚市', 109.51856, 18.260109],
      ['浙江省宁波市象山市', 121.876136, 29.483026],
      ['江西省婺源市', 117.86787, 29.254795],
      ['福建省厦门市', 118.099884, 24.488302],
      ['福建省福州市', 119.308644, 26.082765],
      ['福建省泉州市', 118.683594, 24.880214],
      ['福建省龙岩市', 117.025745, 25.079911],
      ['浙江省舟山市', 122.207233, 29.99016],
      ['浙江省义乌市', 120.084457, 29.310898],
      ['浙江省横店市', 120.299243, 29.163333],
      ['浙江省金华市', 119.653441, 29.091458],
      ['浙江省丽水市', 119.926121, 28.476072],
      ['浙江省杭州市桐庐县', 119.697601, 29.800841],
      ['广西省南宁市', 108.36943, 22.821275],
      ['江西省赣州市', 114.938208, 25.839078],
      ['江西省萍乡市', 114.215647, 27.470308],
      ['江西省景德镇市', 117.190323, 29.275508],
      ['江西省鹰潭市龙虎山', 117.005055, 28.094106],
      ['湖南省长沙市', 112.948919, 28.236672],
      ['江苏省溧阳市', 119.489778, 31.421856],
      ['江苏省扬州市', 119.423447, 32.402383],
      ['浙江省温岭市', 121.393737, 28.378418],
    ]

    // 点标记显示内容，HTML要素字符串
    const markerContent =
      '<div class="custom-content-marker">' +
      '   <img src="https://cdn.chenyingshuang.cn/journey/location.png">' +
      '</div>'

    await AMap.plugin(['AMap.PlaceSearch'], () => {})
    const placeSearch = new AMap.PlaceSearch({
      pageSize: 1, // 单页显示结果条数
      pageIndex: 1, // 页码
      panel: false, // 结果列表将在此容器中进行展示。
      autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    })

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
