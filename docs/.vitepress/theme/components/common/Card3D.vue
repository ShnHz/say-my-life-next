<template>
  <div
    class="card-3d-wrap"
    ref="wrap"
  >
    <div
      class="card img-wrap"
      ref="img"
      :style="{
        'background-image': `url(${src})`,
      }"
    ></div>
  </div>
</template>
<script>
  export default {
    name: 'card-3d',
    props: {
      src: {
        type: String,
        default:
          // 'http://localhost:5173/say-my-life-next/.vitepress/public/map/assets/1.jpg',
          'https://assets.codepen.io/13471/pikachu-gx.webp',
          // 'https://cdn.chenyingshuang.cn/life/gundam/%E9%AB%98%E8%BE%BE%E8%83%8C%E6%99%AF%402x.jpg'
      },
    },
    data() {
      return {}
    },
    mounted() {
      const element = this.$refs.img
      const wrap = this.$refs.wrap
      const bounds = element.getBoundingClientRect()
      function transformElement(e) {
        const pos = [e.offsetX, e.offsetY]
        e.preventDefault()
        const l = pos[0]
        const t = pos[1]
        const h = bounds.height
        const w = bounds.width
        const px = Math.abs(Math.floor((100 / w) * l) - 100)
        const py = Math.abs(Math.floor((100 / h) * t) - 100)
        const pa = 50 - px + (50 - py)

        const lp = 50 + (px - 50) / 1.5
        const tp = 50 + (py - 50) / 1.5
        const px_spark = 50 + (px - 50) / 7
        const py_spark = 50 + (py - 50) / 7
        const p_opc = 20 + Math.abs(pa) * 1.5
        const ty = ((tp - 50) / 2) * -1
        const tx = ((lp - 50) / 1.5) * 0.5
        // css to apply for active card
        const grad_pos = `background-position: ${lp}% ${tp}%;`
        const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
        const opc = `opacity: ${p_opc / 100};`
        const tf = `rotateX(${ty}deg) rotateY(${tx}deg)`
        // const style = `
        //   .card:hover:before { ${grad_pos} }  /* gradient */
        //   .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */
        // `
        wrap.style = `--bp: ${lp}% ${tp}%`
        element.style.transform = tf
      }

      element.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(function () {
          transformElement(e)
        })
      })

      element.addEventListener('mouseout', (e) => {
        window.requestAnimationFrame(function () {
          element.style.transform = ''
        })
      })
    },
    methods: {},
  }
</script>
<style lang="less" scoped>
  .card-3d-wrap {
    --color1: rgb(0, 231, 255);
    --color2: rgb(255, 0, 231);
    --bp: 50%, 50%;
    perspective: 2000px;
    transform: translate3d(0, 0, 0);
    width: 300px;
    height: 400px;
    position: relative;
    padding: 20px;

    .img-wrap {
      --per: 30%;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      overflow: hidden;
      position: absolute;
      top: 20px;
      left: 20px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      background-color: #000;
      border-radius: 5% / 3.5%;
      transition: transform 0.5s ease, box-shadow 0.2s ease;
      transform-origin: center;
      will-change: transform, filter;
      transform-style: preserve-3d;
      box-shadow: -5px -5px 5px -5px var(--color1),
        5px 5px 5px -5px var(--color2), -7px -7px 10px -5px transparent,
        7px 7px 10px -5px transparent, 0 0 5px 0px rgba(255, 255, 255, 0),
        0 55px 35px -20px rgba(0, 0, 0, 0.5);
      &:hover {
        box-shadow: -20px -20px 30px -25px var(--color1),
          20px 20px 30px -25px var(--color2), -7px -7px 10px -5px var(--color1),
          7px 7px 10px -5px var(--color2), 0 0 13px 4px rgba(255, 255, 255, 0.3),
          0 55px 35px -20px rgba(0, 0, 0, 0.5);
      }
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-repeat: no-repeat;
        opacity: 0.5;
        mix-blend-mode: color-dodge;
        transition: all 0.33s ease;
      }
      &::before {
        z-index: 1;
        opacity: 0.5;
        filter: brightness(0.5) contrast(1);
        background-position: var(--bp);
        background-size: 300% 300%;
        background-image: linear-gradient(
          115deg,
          transparent 0%,
          var(--color1) 25%,
          transparent 47%,
          transparent 53%,
          var(--color2) 75%,
          transparent 100%
        );
      }
    }
  }
</style>
