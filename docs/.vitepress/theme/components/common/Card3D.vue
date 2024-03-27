<template>
  <div
    class="card-3d-wrap"
    ref="wrap"
  >
    <div
      class="card img-wrap animated"
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
          // 'https://assets.codepen.io/13471/pikachu-gx.webp',
          'https://cdn.chenyingshuang.cn/life/gundam/%E9%AB%98%E8%BE%BE%E8%83%8C%E6%99%AF%402x.jpg',
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
    display: inline-flex;
    width: 300px;
    height: 400px;
    position: relative;
    padding: 20px;

    .img-wrap {
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
      &.animated {
        // transition: none;
        // animation: holoCard 12s ease 0s 1;
        &:before {
          transition: none;
          animation: holoGradient 12s ease 0s 1;
        }
        &:after {
          transition: none;
          animation: holoSparkle 12s ease 0s 1;
        }
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
      &::after {
        opacity: 1;
        background-image: url('https://assets.codepen.io/13471/sparkles.gif'),
          url(https://assets.codepen.io/13471/holo.png),
          linear-gradient(
            125deg,
            #ff008450 15%,
            #fca40040 30%,
            #ffff0030 40%,
            #00ff8a20 60%,
            #00cfff40 70%,
            #cc4cfa50 85%
          );
        background-position: 50% 50%;
        background-size: 160%;
        background-blend-mode: overlay;
        z-index: 2;
        filter: brightness(1) contrast(1);
        transition: all 0.33s ease;
        mix-blend-mode: color-dodge;
        opacity: 0.75;
        animation-delay: 0.25s;
      }
      &:hover {
        box-shadow: -20px -20px 30px -25px var(--color1),
          20px 20px 30px -25px var(--color2), -7px -7px 10px -5px var(--color1),
          7px 7px 10px -5px var(--color2), 0 0 13px 4px rgba(255, 255, 255, 0.3),
          0 55px 35px -20px rgba(0, 0, 0, 0.5);
        &::before {
          animation: none;
          background-image: linear-gradient(
            110deg,
            transparent 25%,
            var(--color1) 48%,
            var(--color2) 52%,
            transparent 75%
          );
          background-size: 250% 250%;
          opacity: 0.88;
          filter: brightness(0.66) contrast(1.33);
          transition: none;
        }
        &::after {
          filter: brightness(1) contrast(1);
          opacity: 1;
        }
      }
    }
  }

  @keyframes holoCard {
    0%,
    100% {
      transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }
    5%,
    8% {
      transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
    }
    13%,
    16% {
      transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
    }
    35%,
    38% {
      transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
    }
    55% {
      transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
    }
  }

  @keyframes holoSparkle {
    0%,
    100% {
      opacity: 0.75;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(1.25);
    }
    5%,
    8% {
      opacity: 1;
      background-position: 40% 40%;
      filter: brightness(0.8) contrast(1.2);
    }
    13%,
    16% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(0.8);
    }
    35%,
    38% {
      opacity: 1;
      background-position: 60% 60%;
      filter: brightness(1) contrast(1);
    }
    55% {
      opacity: 0.33;
      background-position: 45% 45%;
      filter: brightness(1.2) contrast(1.25);
    }
  }

  @keyframes holoGradient {
    0%,
    100% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(0.5) contrast(1);
    }
    5%,
    9% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
    13%,
    17% {
      background-position: 0% 0%;
      opacity: 0.88;
    }
    35%,
    39% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.5) contrast(1);
    }
    55% {
      background-position: 0% 0%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
  }
</style>
