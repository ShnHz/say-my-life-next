<template>
  <div class="travtel-map-wrap">
    <div
      ref="map3DMain"
      id="map3DMain"
      class="map3DMain"
    ></div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { Line2 } from 'three/examples/jsm/lines/Line2.js'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
  import TWEEN from '@tweenjs/tween.js'
  import biaozhu from '../../../../../public/map/assets/biaozhu.png'
  import biaozhuguangquan from '../../../../../public/map/assets/biaozhuguangquan.png'
  import gradient from '../../../../../public/map/assets/gradient.png'
  import earthImg from '../../../../../public/map/assets/earth.jpg'
  import earth_aperture from '../../../../../public/map/assets/earth_aperture.png'
  import halo from '../../../../../public/map/assets/halo.png'
  import smallEarth from '../../../../../public/map/assets/smallEarth.png'
  import guangzhu from '../../../../../public/map/assets/guangzhu.png'
  import chinaData from '../../../../../public/map/data/china.json'
  import chinaOutlineData from '../../../../../public/map/data/china-outline.json'
  import { city } from '../../../../../public/map/js/city'
  // 顶点着色器和片段着色器代码
  const fragmentShader = `
    uniform sampler2D diffuse;
    uniform vec3 glowColor;
    varying float intensity;
    varying vec2 vUv;

    void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, 1.0)+ texture2D(diffuse, vUv);
    }
`
  const vertexShader2 = `
varying vec2 vUv;
    attribute float percent;
    uniform float u_time;
    uniform float number;
    uniform float speed;
    uniform float length;
    varying float opacity;
    uniform float size;
    void main()
    {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float l = clamp(1.0-length, 0.0, 1.0);
        gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l, 0.0, 1.) * size * (1./length);
        opacity = gl_PointSize/size;
        gl_Position = projectionMatrix * mvPosition;
    }
`
  var fragmentShader2 = `
   #ifdef GL_ES
    precision mediump float;
    #endif
    varying float opacity;
    uniform vec3 color;
    void main(){
        if (opacity <=0.2){
            discard;
        }
        gl_FragColor = vec4(color, 1.0);
    }
`
  export default {
    name: 'map3D',
    setup() {
      const map3DMain = ref(null)
      let renderer, camera, scene, stats, controls, stars, uniforms
      const radius = 5
      const group = new THREE.Group()
      const groupDots = new THREE.Group()
      const groupLines = new THREE.Group()
      const groupHalo = new THREE.Group() //卫星环+小卫星
      const aGroup = new THREE.Group()
      var initFlag = false
      var WaveMeshArr = [] //所有波动光圈集合
      var planGeometry = new THREE.PlaneGeometry(1, 1) //默认在XOY平面上
      var globeTextureLoader = new THREE.TextureLoader()
      var map = new THREE.Object3D()
      var camaPositions = [
        { x: 5, y: -20, z: 200 }, //远处
        { x: 0.5, y: -2, z: 20 }, //近处
      ]
      var API = {
        c: 1.7,
        p: 2.3,
        color: 0x10105,
      }
      var uniforms2 = {
        u_time: { value: 0.0 },
      }

      //threejs自带的经纬度转换
      function lglt2xyz(lng, lat) {
        const theta = (90 + lng) * (Math.PI / 180)
        const phi = (90 - lat) * (Math.PI / 180)
        return new THREE.Vector3().setFromSpherical(
          new THREE.Spherical(radius, phi, theta)
        )
      }

      const posArr = city.map((item) => {
        return lglt2xyz(item[1], item[2])
      })

      onMounted(async () => {
        var width = map3DMain.value.offsetWidth
        var height = map3DMain.value.offsetHeight
        initRenderer()
        initCamera()
        initScene()
        initLight()
        //初始化地球
        initEarth()
        //卫星特效
        // initSatellite()
        //地球光晕
        initEarthSprite()
        //初始化动态星空背景
        initPoints()
        //外圈中国描边高亮
        // initGeoJson()

        initControls()
        initTween()
        animate()
        const viewElem = document.body
        const resizeObserver = new ResizeObserver(() => {
          setTimeout(() => {
            handleResize()
          }, 300)
        })
        resizeObserver.observe(viewElem)

        /**
         * @desc 随机设置点
         * @param <Group> group ...
         * @param <number> radius ...
         */
        function setRandomDot(group) {
          var texture = new THREE.TextureLoader().load(biaozhu)
          var texture2 = new THREE.TextureLoader().load(biaozhuguangquan)
          posArr.map((pos) => {
            var dotMesh = createPointMesh(pos, texture)
            var waveMesh = createWaveMesh(pos, texture2)
            group.add(dotMesh)
            group.add(waveMesh)
            WaveMeshArr.push(waveMesh)
          })
        }

        /**
         * 标注
         */
        function createPointMesh(pos, texture) {
          var material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true, //使用背景透明的png贴图，注意开启透明计算
            // side: THREE.DoubleSide, //双面可见
            depthWrite: false, //禁止写入深度缓冲区数据
          })
          var mesh = new THREE.Mesh(planGeometry, material)
          var size = radius * 0.04 //矩形平面Mesh的尺寸
          mesh.scale.set(size, size, size) //设置mesh大小
          //设置mesh位置
          mesh.position.set(pos.x, pos.y, pos.z)
          // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
          var coordVec3 = new THREE.Vector3(pos.x, pos.y, pos.z).normalize()
          // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
          var meshNormal = new THREE.Vector3(0, 0, 1)
          // 四元数属性.quaternion表示mesh的角度状态
          //.setFromUnitVectors();计算两个向量之间构成的四元数值
          mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
          return mesh
        }

        /**
         * 标注的光圈
         */
        function createWaveMesh(pos, texture) {
          var material = new THREE.MeshBasicMaterial({
            color: 0x22ffcc,
            map: texture,
            transparent: true, //使用背景透明的png贴图，注意开启透明计算
            opacity: 1.0,
            // side: THREE.DoubleSide, //双面可见
            depthWrite: false, //禁止写入深度缓冲区数据
          })
          var mesh = new THREE.Mesh(planGeometry, material)
          var size = radius * 0.055 //矩形平面Mesh的尺寸
          mesh.size = size //自顶一个属性，表示mesh静态大小
          mesh.scale.set(size, size, size) //设置mesh大小
          mesh._s = Math.random() * 1.0 + 1.0 //自定义属性._s表示mesh在原始大小基础上放大倍数  光圈在原来mesh.size基础上1~2倍之间变化
          mesh.position.set(pos.x, pos.y, pos.z)
          // mesh姿态设置
          // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
          var coordVec3 = new THREE.Vector3(pos.x, pos.y, pos.z).normalize()
          // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
          var meshNormal = new THREE.Vector3(0, 0, 1)
          // 四元数属性.quaternion表示mesh的角度状态
          //.setFromUnitVectors();计算两个向量之间构成的四元数值
          mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
          return mesh
        }

        // 添加飞线
        function addLines(v0, v3) {
          // 夹角
          var angle = (v0.angleTo(v3) * 1.8) / Math.PI / 0.1 // 0 ~ Math.PI
          var aLen = angle * 0.4,
            hLen = angle * angle * 12
          var p0 = new THREE.Vector3(0, 0, 0)
          // 法线向量
          var direction = getVCenter(v0.clone(), v3.clone()).normalize()
          var rayLine = new THREE.Ray(p0, direction)

          // 使用新方法计算顶点坐标
          var target1 = new THREE.Vector3()
          target1.copy(rayLine.origin).addScaledVector(rayLine.direction, 1)
          var vtop = new THREE.Vector3()
          vtop
            .copy(rayLine.origin)
            .addScaledVector(rayLine.direction, hLen / target1.distanceTo(p0))

          // 控制点坐标
          var v1 = getLenVcetor(v0.clone(), vtop, aLen)
          var v2 = getLenVcetor(v3.clone(), vtop, aLen)
          // 绘制三维三次贝赛尔曲线
          var curve = new THREE.CubicBezierCurve3(v0, v1, v2, v3)
          var geometry = new LineGeometry()
          var points = curve.getSpacedPoints(50)
          var positions = []
          var colors = []
          var color = new THREE.Color()
          /**
           * HSL中使用渐变
           * h — hue value between 0.0 and 1.0
           * s — 饱和度 between 0.0 and 1.0
           * l — 亮度 between 0.0 and 1.0
           */
          for (var j = 0; j < points.length; j++) {
            // color.setHSL( .31666+j*0.005,0.7, 0.7); //绿色
            color.setHSL(0.81666 + j, 0.88, 0.715 + j * 0.0025) //粉色
            colors.push(color.r, color.g, color.b)
            positions.push(points[j].x, points[j].y, points[j].z)
          }
          geometry.setPositions(positions)
          geometry.setColors(colors)
          var matLine = new LineMaterial({
            linewidth: 0.0006,
            vertexColors: true,
            dashed: false,
          })

          return {
            curve: curve,
            lineMesh: new Line2(geometry, matLine),
          }
        }

        // 计算v1,v2 的中点
        function getVCenter(v1, v2) {
          return new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5)
        }

        // 计算V1，V2向量固定长度的点
        function getLenVcetor(v1, v2, len) {
          const v1v2Len = v1.distanceTo(v2)
          return v1.lerp(v2, len / v1v2Len)
        }

        /**
         * @description 初始化渲染场景
         */
        function initRenderer() {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
          renderer.setPixelRatio(window.devicePixelRatio)
          renderer.setSize(width, height)
          map3DMain.value.appendChild(renderer.domElement)
        }

        /**
         * @description 初始化相机
         */
        function initCamera() {
          camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
          camera.position.set(5, -20, 200)
          camera.lookAt(0, 3, 0)
          window.camera = camera
        }

        /**
         * @description 初始化场景
         */
        function initScene() {
          scene = new THREE.Scene()
          scene.background = new THREE.Color(0x020924)
          scene.fog = new THREE.Fog(0x020924, 200, 1000)
          window.scene = scene
        }

        /**
         * 初始化用户交互
         **/
        function initControls() {
          controls = new OrbitControls(camera, renderer.domElement)
          // 如果使用animate方法时，将此函数删除
          // controls.addEventListener( 'change', render );
          // 使动画循环使用时阻尼或自转 意思是否有惯性
          controls.enableDamping = true
          //动态阻尼系数 就是鼠标拖拽旋转灵敏度
          //controls.dampingFactor = 0.25;
          //是否可以缩放
          controls.enableZoom = true
          //是否自动旋转
          controls.autoRotate = true
          controls.autoRotateSpeed = 0.1
          //设置相机距离原点的最远距离
          // controls.minDistance = 2;
          //设置相机距离原点的最远距离
          // controls.maxDistance = 1000;
          //是否开启右键拖拽
          controls.enablePan = true
        }

        function initTween() {
          var tweena = cameraCon(3000)
          tweena.start()
        }

        function updateUvTransform() {
          uniforms.c.value = API.c
          uniforms.p.value = API.p
          uniforms.glowColor.value = new THREE.Color(API.color)
          renders()
        }

        function cameraCon(time) {
          var tween1 = new TWEEN.Tween(camaPositions[0])
            .to(camaPositions[1], time)
            .easing(TWEEN.Easing.Quadratic.InOut)
          var update = () => {
            camera.position.set(
              camaPositions[0].x,
              camaPositions[0].y,
              camaPositions[0].z
            )
          }
          tween1.onUpdate(update)
          tween1.onComplete(function () {
            initFlag = true
            //初始化点和曲线
            initDotAndFly()
            //光柱效果和底部矩形
            // initLightPillar()
          })
          return tween1
        }

        /**
         * @description 初始化光
         */
        function initLight() {
          const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1)
          scene.add(ambientLight)
          var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
          directionalLight.position.set(1, 0.1, 0).normalize()
          var directionalLight2 = new THREE.DirectionalLight(0xff2ffff, 0.2)
          directionalLight2.position.set(1, 0.1, 0.1).normalize()
          scene.add(directionalLight)
          scene.add(directionalLight2)
          var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2)
          hemiLight.position.set(0, 1, 0)
          scene.add(hemiLight)
          var directionalLight = new THREE.DirectionalLight(0xffffff)
          directionalLight.position.set(1, 500, -20)
          directionalLight.castShadow = true
          directionalLight.shadow.camera.top = 18
          directionalLight.shadow.camera.bottom = -10
          directionalLight.shadow.camera.left = -52
          directionalLight.shadow.camera.right = 12
          scene.add(directionalLight)
        }

        /**
         * 初始化背景星空
         */
        function initPoints() {
          var texture = new THREE.TextureLoader().load(gradient)
          const positions = []
          const colors = []
          const geometry = new THREE.BufferGeometry()
          for (var i = 0; i < 10000; i++) {
            var vertex = new THREE.Vector3()
            vertex.x = Math.random() * 2 - 1
            vertex.y = Math.random() * 2 - 1
            vertex.z = Math.random() * 2 - 1
            positions.push(vertex.x, vertex.y, vertex.z)
            var color = new THREE.Color()
            color.setHSL(
              Math.random() * 0.2 + 0.5,
              0.55,
              Math.random() * 0.25 + 0.55
            )
            colors.push(color.r, color.g, color.b)
          }
          geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
          )
          geometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(colors, 3)
          )
          var starsMaterial = new THREE.PointsMaterial({
            map: texture,
            size: 1,
            transparent: true,
            opacity: 1,
            vertexColors: true, //true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
          })
          stars = new THREE.Points(geometry, starsMaterial)
          stars.scale.set(300, 300, 300)
          scene.add(stars)
        }

        /**
         * 包含2个，一个地球，一个辉光球体
         */
        function initEarth() {
          // 地球
          globeTextureLoader.load(earthImg, function (texture) {
            var globeGgeometry = new THREE.SphereGeometry(radius, 100, 100)
            var globeMaterial = new THREE.MeshStandardMaterial({
              map: texture,
              side: THREE.DoubleSide,
            })
            var globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial)
            group.rotation.set(0.5, 2.9, 0.1)
            group.add(globeMesh)
            scene.add(group)
          })
        }

        /**
         * 创建地球光晕特效
         */
        function initEarthSprite() {
          var texture = globeTextureLoader.load(earth_aperture)
          var spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
          })
          var sprite = new THREE.Sprite(spriteMaterial)
          sprite.scale.set(radius * 3, radius * 3, 1)
          group.add(sprite)
        }

        /**
         * 添加卫星特效
         */
        function initSatellite() {
          // 光环
          globeTextureLoader.load(halo, function (texture) {
            var geometry = new THREE.PlaneGeometry(14, 14) //矩形平面
            var material = new THREE.MeshLambertMaterial({
              map: texture, //给纹理属性map赋值
              transparent: true,
              side: THREE.DoubleSide, //两面可见
              depthWrite: false,
            }) //材质对象
            var mesh = new THREE.Mesh(geometry, material) //网格模型对象
            groupHalo.add(mesh)
          })
          // 小地球
          globeTextureLoader.load(smallEarth, function (texture) {
            var p1 = new THREE.Vector3(-7, 0, 0) //顶点1坐标
            var p2 = new THREE.Vector3(7, 0, 0) //顶点2坐标
            const points = [p1, p2]
            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            var material = new THREE.PointsMaterial({
              map: texture, //给纹理属性map赋值
              transparent: true,
              side: THREE.DoubleSide, //两面可见
              size: 1, //点对象像素尺寸
              depthWrite: false,
            }) //材质对象
            var earthPoints = new THREE.Points(geometry, material) //点模型对象
            groupHalo.add(earthPoints) //点对象添加到场景中
          })
          groupHalo.rotation.set(1.9, 0.5, 1)
          scene.add(groupHalo)
        }

        /**
         * 光柱特效
         */
        function createLightPillar(pos) {
          var height = radius * 0.1 //光柱高度，和地球半径相关，这样调节地球半径，光柱尺寸跟着变化
          var geometry = new THREE.PlaneGeometry(radius * 0.05, height) //默认在XOY平面上
          geometry.rotateX(Math.PI / 2) //光柱高度方向旋转到z轴上
          geometry.translate(0, 0, height / 2) //平移使光柱底部与XOY平面重合
          var textureLoader = new THREE.TextureLoader() // TextureLoader创建一个纹理加载器对象
          var material = new THREE.MeshBasicMaterial({
            map: textureLoader.load(guangzhu),
            color: 0x44ffaa, //光柱颜色，光柱map贴图是白色，可以通过color调节颜色
            transparent: true, //使用背景透明的png贴图，注意开启透明计算
            side: THREE.DoubleSide, //双面可见
            depthWrite: false, //是否对深度缓冲区有任何的影响
          })
          var mesh = new THREE.Mesh(geometry, material)
          var group = new THREE.Group()
          // 两个光柱交叉叠加
          group.add(mesh, mesh.clone().rotateZ(Math.PI / 2)) //几何体绕x轴旋转了，所以mesh旋转轴变为z
          group.position.set(pos.x, pos.y, pos.z) //设置mesh位置
          var coordVec3 = new THREE.Vector3(pos.x, pos.y, pos.z).normalize()
          var meshNormal = new THREE.Vector3(0, 0, 1)
          // 四元数属性.quaternion表示mesh的角度状态
          //.setFromUnitVectors();计算两个向量之间构成的四元数值
          group.quaternion.setFromUnitVectors(meshNormal, coordVec3)
          return group
        }

        /**
         * 光柱底部的矩形平面特效
         */
        function createLightWaveMesh(pos, texture) {
          var geometry = new THREE.PlaneGeometry(1, 1) //默认在XOY平面上
          var material = new THREE.MeshBasicMaterial({
            color: 0x22ffcc,
            map: texture,
            transparent: true, //使用背景透明的png贴图，注意开启透明计算
            // side: THREE.DoubleSide, //双面可见
            depthWrite: false, //禁止写入深度缓冲区数据
          })
          var mesh = new THREE.Mesh(geometry, material)
          var size = radius * 0.05 //矩形平面Mesh的尺寸
          mesh.scale.set(size, size, size) //设置mesh大小
          return mesh
        }

        /**
         * 光柱效果
         */
        function initLightPillar() {
          var texture = new THREE.TextureLoader().load(biaozhu)
          var datas = [
            {
              lng: 86.39895905468748,
              lat: 45.15923349468924, //合肥
            },
            {
              lng: 106.54041,
              lat: 29.40268, //重庆
            },
          ]
          datas.forEach(function (obj) {
            var pos = lglt2xyz(obj.lng, obj.lat)
            var LightPillar = createLightPillar(pos)
            groupDots.add(LightPillar)
            var waveMesh = createLightWaveMesh(pos, texture)
            LightPillar.add(waveMesh)
          })
        }

        /**
         * @description 初始化点和曲线
         */
        function initDotAndFly() {
          // 创建标注点
          setRandomDot(groupDots)
          //随机点加载group上面
          group.add(groupDots)
          // 曲线
          var animateDots = []
          groupDots.children.forEach((elem) => {
            if (groupDots.children[0].position.x == elem.position.x) {
              return true
            }
            var line = addLines(groupDots.children[0].position, elem.position)
            groupLines.add(line.lineMesh)
            animateDots.push(line.curve.getPoints(100)) //这个是里面球
          })
          group.add(groupLines)
          // 添加动画
          // for (let i = 0; i < animateDots.length; i++) {
          //   const aGeo = new THREE.SphereGeometry(0.03, 0.03, 0.03)
          //   const aMater = new THREE.MeshPhongMaterial({ color: '#F8D764' })
          //   const aMesh = new THREE.Mesh(aGeo, aMater)
          //   aGroup.add(aMesh)
          // }
          var vIndex = 0

          function animateLine() {
            aGroup.children.forEach((elem, index) => {
              const v = animateDots[index][vIndex]
              elem.position.set(v.x, v.y, v.z)
            })
            vIndex++
            if (vIndex > 100) {
              vIndex = 0
            }
            setTimeout(animateLine, 20)
          }

          group.add(aGroup)
          animateLine()
        }

        /**
         * 中国描边高亮
         */
        function initGeoJson() {
          initMap(chinaData)
          outLineMap(chinaOutlineData)
        }

        function outLineMap(json) {
          json.features.forEach((elem) => {
            // 新建一个省份容器：用来存放省份对应的模型和轮廓线
            const province = new THREE.Object3D()
            const coordinates = elem.geometry.coordinates
            coordinates.forEach((multiPolygon) => {
              multiPolygon.forEach((polygon) => {
                // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
                if (polygon.length > 200) {
                  var v3ps = []
                  for (let i = 0; i < polygon.length; i++) {
                    var pos = lglt2xyz(polygon[i][0], polygon[i][1])
                    v3ps.push(pos)
                  }
                  var curve = new THREE.CatmullRomCurve3(
                    v3ps,
                    false /*是否闭合*/
                  )
                  var color = new THREE.Vector3(
                    0.5999758518718452,
                    0.7798940272761521,
                    0.6181903838257632
                  )
                  var flyLine = initFlyLine(
                    curve,
                    {
                      speed: 0.4,
                      // color: randomVec3Color(),
                      color: color,
                      number: 3, //同时跑动的流光数量
                      length: 0.2, //流光线条长度
                      size: 3, //粗细
                    },
                    5000
                  )
                  province.add(flyLine)
                }
              })
            })
            map.add(province)
          })
          group.add(map)
        }

        function initMap(chinaJson) {
          // 遍历省份构建模型
          chinaJson.features.forEach((elem) => {
            // 新建一个省份容器：用来存放省份对应的模型和轮廓线
            const province = new THREE.Object3D()
            const coordinates = elem.geometry.coordinates
            coordinates.forEach((multiPolygon) => {
              multiPolygon.forEach((polygon) => {
                const lineMaterial = new THREE.LineBasicMaterial({
                  color: 0xf19553,
                }) //0x3BFA9E
                const positions = []
                const linGeometry = new THREE.BufferGeometry()
                for (let i = 0; i < polygon.length; i++) {
                  var pos = lglt2xyz(polygon[i][0], polygon[i][1])
                  positions.push(pos.x, pos.y, pos.z)
                }
                linGeometry.setAttribute(
                  'position',
                  new THREE.Float32BufferAttribute(positions, 3)
                )
                const line = new THREE.Line(linGeometry, lineMaterial)
                province.add(line)
              })
            })
            map.add(province)
          })
          group.add(map)
        }

        /**
         * @param curve {THREE.Curve} 路径,
         * @param matSetting {Object} 材质配置项
         * @param pointsNumber {Number} 点的个数 越多越细致
         * */
        function initFlyLine(curve, matSetting, pointsNumber) {
          var points = curve.getPoints(pointsNumber)
          var geometry = new THREE.BufferGeometry().setFromPoints(points)
          const length = points.length
          var percents = new Float32Array(length)
          for (let i = 0; i < points.length; i += 1) {
            percents[i] = i / length
          }
          geometry.setAttribute(
            'percent',
            new THREE.BufferAttribute(percents, 1)
          )
          const lineMaterial = initLineMaterial(matSetting)
          var flyLine = new THREE.Points(geometry, lineMaterial)
          return flyLine
        }

        function initLineMaterial(setting) {
          const number = setting ? Number(setting.number) || 1.0 : 1.0
          const speed = setting ? Number(setting.speed) || 1.0 : 1.0
          const length = setting ? Number(setting.length) || 0.5 : 0.5
          const size = setting ? Number(setting.size) || 3.0 : 3.0
          const color = setting
            ? setting.color || new THREE.Vector3(0, 1, 1)
            : new THREE.Vector3(0, 1, 1)
          const singleUniforms = {
            u_time: uniforms2.u_time,
            number: { type: 'f', value: number },
            speed: { type: 'f', value: speed },
            length: { type: 'f', value: length },
            size: { type: 'f', value: size },
            color: { type: 'v3', value: color },
          }
          const lineMaterial = new THREE.ShaderMaterial({
            uniforms: singleUniforms,
            vertexShader: vertexShader2,
            fragmentShader: fragmentShader2,
            transparent: true,
            //blending:THREE.AdditiveBlending,
          })
          return lineMaterial
        }

        /**
         * @description 渲染
         */
        function renders() {
          renderer.clear()
          renderer.render(scene, camera)
        }

        /**
         * 更新
         **/
        function animate() {
          window.requestAnimationFrame(() => {
            if (controls) controls.update()
            if (stats) stats.update()
            if (TWEEN) TWEEN.update()
            if (initFlag) {
              //光环
              groupHalo.rotation.z = groupHalo.rotation.z + 0.01
              group.rotation.y = group.rotation.y + 0.001
              // 所有波动光圈都有自己的透明度和大小状态
              // 一个波动光圈透明度变化过程是：0~1~0反复循环
              if (WaveMeshArr.length) {
                WaveMeshArr.forEach(function (mesh) {
                  mesh._s += 0.007
                  mesh.scale.set(
                    mesh.size * mesh._s,
                    mesh.size * mesh._s,
                    mesh.size * mesh._s
                  )
                  if (mesh._s <= 1.5) {
                    //mesh._s=1，透明度=0 mesh._s=1.5，透明度=1
                    mesh.material.opacity = (mesh._s - 1) * 2
                  } else if (mesh._s > 1.5 && mesh._s <= 2) {
                    //mesh._s=1.5，透明度=1 mesh._s=2，透明度=0
                    mesh.material.opacity = 1 - (mesh._s - 1.5) * 2
                  } else {
                    mesh._s = 1.0
                  }
                })
              }
            }
            if (stars) {
              stars.rotation.y += 0.0001
            }
            uniforms2.u_time.value += 0.007
            renders()
            animate()
          })
        }
      })
      /**
       * 窗口变动
       **/
      const handleResize = () => {
        const width = map3DMain.value.offsetWidth
        const height = map3DMain.value.offsetHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        if (renderer) {
          renderer.setSize(width, height)
        }
      }

      return {
        map3DMain,
        handleResize,
      }
    },
  }
</script>

<style lang="less">
  .travtel-map-wrap {
    height: calc(100vh - var(--vp-nav-height));
    #map3DMain {
      height: 100%;
    }
  }

  .tagInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
    align-content: flex-start;
    pointer-events: initial;
    position: relative;
    z-index: 0;

    .tagInfoIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      align-content: flex-start;
      position: relative;
      z-index: 1;

      img {
        width: 40px;
        height: 43px;
        margin-bottom: -10px;
      }
    }

    .tagInfoName {
      font-size: 20px;
      font-family: PangMenZhengDao;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.53);
    }
  }

  //地图弹窗样式
  .popWin {
    position: absolute;
    display: flex;
    z-index: 100;
    left: 0px;
    top: 0px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: flex-start;
    pointer-events: initial;
    pointer-events: none;

    .line {
      margin-top: 20px;
      width: 100px;
      height: 160px;
    }

    .popWins {
      min-width: 197px;
      pointer-events: initial;

      p {
        font-size: 12px;
        font-weight: 400;
        padding-right: 30px;
        color: #bbcde6;
        line-height: 28px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        align-content: flex-start;

        span {
          width: 5px;
          height: 5px;
          background: #24dcf7;
          border-radius: 50%;
          margin-left: 35px;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
          flex-direction: row;
          align-content: flex-start;
        }
      }
    }

    .titleInfos {
      background: url('./assets/titlebg.png') no-repeat;
      background-size: 100% 100%;
      width: 243px;
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      align-content: flex-start;
      background-size: 100% 100%;

      p {
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        margin-left: 15px;
      }

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .cityName {
      font-family: 'PangMenZhengDao';
      font-size: 18px;
      margin-left: 20px;
    }

    .popWins2 {
      background: url('./assets/popbg.png') no-repeat;
      width: 243px;
      height: 154px;
      background-size: 100% 100%;
      padding-top: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;
      flex-direction: column;
      align-content: flex-start;

      .quezhen {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        align-content: flex-start;
        font-size: 14px;
        color: #fff;
        margin-left: 20px;
        line-height: 40px;

        .numcardItem1 {
          margin-top: 8px;
        }

        .real-time-num {
          height: 40px;
          color: #c8b639;
          width: auto !important;
          font-size: 18px !important;
          font-family: DIN-Bold !important;
          font-weight: bold !important;
        }
      }
    }
  }
</style>
