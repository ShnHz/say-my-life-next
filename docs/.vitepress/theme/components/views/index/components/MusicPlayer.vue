<template>
  <div class="music-wrap">
    <div class="music-bar">
      <audio
        id="globalAudio"
        :src="active && active.href"
        type="audio/mp3"
        preload="meta"
        controls
      ></audio>
      <canvas id="musicBar"></canvas>
    </div>
    <div class="container">
      <div class="music-cd-wrap">
        <div class="music-cd">
          <div class="center-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
            >
              <path
                d="M183.83 480a55.2 55.2 0 0 1-32.36-10.55A56.64 56.64 0 0 1 128 423.58a50.26 50.26 0 0 1 34.14-47.73L213 358.73a16.25 16.25 0 0 0 11-15.49V92a32.1 32.1 0 0 1 24.09-31.15l108.39-28.14A22 22 0 0 1 384 54v57.75a32.09 32.09 0 0 1-24.2 31.19l-91.65 23.13A16.24 16.24 0 0 0 256 181.91V424a48.22 48.22 0 0 1-32.78 45.81l-21.47 7.23a56 56 0 0 1-17.92 2.96z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { init } from 'vitepress'
  import { onMounted, ref } from 'vue'
  let canvas: HTMLCanvasElement | null
  let audio: HTMLAudioElement | null
  let ctx, dataArray, analyser
  const active = ref<{
    name: string
    href: string
  }>({
    name: '兜圈',
    href: 'https://cdn.chenyingshuang.cn/index/music/%E6%9E%97%E5%AE%A5%E5%98%89_%E5%85%9C%E5%9C%88.mp3',
  })

  onMounted(() => {
    canvas = document.getElementById('musicBar') as HTMLCanvasElement
    audio = document.getElementById('globalAudio') as HTMLAudioElement
    ctx = canvas.getContext('2d')

    initCanvas()
    initAudio()
  })

  const initCanvas = () => {
    //初始化canvas
    if (!canvas) return
    const wrap = document.querySelector('.music-bar') as HTMLDivElement
    canvas.width = wrap!.clientWidth
    canvas.height = wrap!.clientHeight
  }

  const initAudio = () => {
    audio!.crossOrigin = 'anonymous'
    //播放事件
    audio!.onplay = function () {
      //创建一个音频上下文实例
      const audioCtx = new window.AudioContext()
      //添加一个音频源节点
      const source = audioCtx.createMediaElementSource(audio!)
      //分析器节点
      analyser = audioCtx.createAnalyser()
      //fft分析器  越大 分析越细
      analyser.fftSize = 512
      //创建一个无符号字节的数组
      dataArray = new Uint8Array(analyser.frequencyBinCount)
      //音频源节点 链接分析器
      source.connect(analyser)
      //分析器链接输出设备
      analyser.connect(audioCtx.destination)

      draw()
    }
  }

  const draw = () => {
    requestAnimationFrame(draw)

    const { width, height } = canvas!

    ctx.clearRect(0, 0, width, height)
    //分析器节点分析出的数据到数组中
    ctx.fillStyle = '#78C5F7'
    ctx.lineWidth = 2
    ctx.beginPath()
    //getByteFrequencyData，分析当前音频源的数据 装到dataArray数组中去
    //获取实时数据
    analyser.getByteFrequencyData(dataArray)
    console.log(dataArray)
    const len = dataArray.length
    const barWidth = width / len
    let x = 0
    for (let i = 0; i < len; i++) {
      const data = dataArray[i]
      const barHeight = (data / 255) * height

      // ctx.fillRect(x,y,barWidth,height)

      let v = dataArray[i] / 128.0
      let y = (v * height) / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += barWidth
    }
    // ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke()
  }
</script>

<style scoped lang="less">
  .music-wrap {
    overflow: hidden;
    height: 200px;

    position: relative;
    background: #131313;
    .music-bar {
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .music-cd-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    .music-cd {
      cursor: pointer;
      width: 500px;
      height: 500px;
      position: relative;
      z-index: 0;
      top: 0;
      border-radius: 50%;
      margin: 0 auto;
      border: 12px solid #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      background-size: cover;
      background-image: url('https://cdn.chenyingshuang.cn/index/music/jay.jpg');
      background-position: 50% 50%;
      -webkit-animation: rotate360 16s infinite linear;
      -webkit-transform-origin: center center;
      -ms-transform-origin: center center;
      transform-origin: center center;

      .center-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: repeating-linear-gradient(
          -45deg,
          #ff3543,
          #ff3543 1px,
          #ff4e5b 1px,
          #ff4e5b 3px
        );
        transform: translate(-50%, -50%);
        border: 4px solid #fff;
        border-radius: 50%;
        svg {
          width: 40px;
          height: 40px;
          color: #fff;
        }
        &::after,
        &::before {
          z-index: -1;
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 0.5px solid #333;
        }

        &::after {
          width: 30px;
          height: 30px;
        }
        &::before {
          width: 56px;
          height: 56px;
        }
      }
    }

    &:before,
    &:after {
      position: absolute;
      content: '';
      display: block;
      box-sizing: border-box;
    }
  }

  @-webkit-keyframes rotate360 {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
      -ms-transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
</style>
