<template>
  <div class="music-wrap">
    <div class="music-bar">
      <audio
        id="globalAudio"
        :src="active?.href"
        type="audio/mp3"
        preload="meta"
        @canplay="audioCanplay"
        @timeupdate="updateTime"
      ></audio>
      <canvas id="musicBar"></canvas>
    </div>
    <div class="container">
      <div
        class="music-cd-wrap"
        :class="{ 'is-playing': active?.status === 'playing' }"
      >
        <div
          class="music-cd"
          :style="{ 'background-image': `url(${active?.cover})` }"
        >
          <div
            class="center-wrap"
            :style="{
              transform: `translate(-50%, -50%) scale(${
                active?.status === 'playing' ? cdScale : 1
              })`,
            }"
          >
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

        <div class="music-player-control">
          <div class="music-name">
            {{ active?.name }}
          </div>
          <div
            class="btn-wrap"
            :class="{ 'is-disabled': !audioInfo.canPlay }"
            @click="active?.status === 'paused' ? playMusic() : pausedMusic()"
            :title="active?.status === 'paused' ? '播放' : '暂停'"
          >
            <NIcon
              :component="PlayCircleSharp"
              :size="40"
              color="#000"
              v-show="active?.status === 'paused'"
            />
            <NIcon
              :component="PauseCircle"
              :size="40"
              color="#000"
              v-show="active?.status === 'playing'"
            />
          </div>

          <div
            class="btn-wrap prev-btn"
            title="上一首"
            @click="prev"
          >
            <NIcon
              :component="PlaySkipBackCircle"
              :size="36"
              color="#000"
            />
          </div>
          <div
            class="btn-wrap next-btn"
            title="下一首"
            @click="next"
          >
            <NIcon
              :component="PlaySkipForwardCircle"
              :size="36"
              color="#000"
            />
          </div>
        </div>
      </div>
      <NSlider
        :tooltip="false"
        :min="0"
        :max="audioInfo.duration"
        :step="1"
        v-model:value="audioInfo.currentTime"
        @update:value="changeTime"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import { useThrottleFn } from '@vueuse/core'

  import musicList from '@docs/.vitepress/configs/music.js'

  import { NIcon, NSlider } from 'naive-ui'
  import {
    PlayCircleSharp,
    PauseCircle,
    PlaySkipBackCircle,
    PlaySkipForwardCircle,
  } from '@vicons/ionicons5'

  let canvas: HTMLCanvasElement | null
  let audio: HTMLAudioElement | null
  let ctx, dataArray, analyser
  const maxFrequency = ref<number>(128)
  const active = ref()
  let activeIndex: number = 0
  const audioInfo = ref({
    canPlay: false,
    currentTime: 0,
    duration: 100,
  })

  onMounted(() => {
    canvas = document.getElementById('musicBar') as HTMLCanvasElement
    audio = document.getElementById('globalAudio') as HTMLAudioElement
    ctx = canvas.getContext('2d')

    initCanvas()
    initAudio()
    initMusic()
  })

  const initCanvas = () => {
    //初始化canvas
    if (!canvas) return
    const wrap = document.querySelector('.music-bar') as HTMLDivElement
    canvas.width = wrap!.clientWidth
    canvas.height = wrap!.clientHeight
  }

  const initAudio = () => {
    audio!.volume = 0.1
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
      //音频源节点 链接分析器
      source.connect(analyser)
      //分析器链接输出设备
      analyser.connect(audioCtx.destination)

      draw()
    }
  }

  const draw = () => {
    requestAnimationFrame(draw)
    if (active.value?.status === 'playing') {
      const { width, height } = canvas!

      let gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#ff4446')
      gradient.addColorStop(1, 'rgb(103, 175, 187)')

      analyser.fftSize = 256
      var data = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(data)
      var el = ctx.canvas
      var count = data.length
      maxFrequency.value = Math.max(...data)
      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0)'
      ctx.clearRect(0, 0, width, height)
      ctx.fillRect(0, 0, el.width, el.height)
      ctx.transform(1, 0, 0, -1, 0, el.height)
      ctx.fillStyle = gradient
      var w = el.width / count
      var x = 0,
        h = 0,
        v = 0
      for (var i = 0; i < data.length; i++) {
        v = data[i] / 0xff
        h = v * el.height
        ctx.fillRect(x + 1, 0, w - 2, h)
        x += w
      }
      ctx.restore()
    }
  }

  const initMusic = () => {
    changeMusic(activeIndex)
  }

  const changeMusic = (index, play = false) => {
    activeIndex = index
    active.value = {
      ...musicList[index],
      status: play ? 'playing' : 'paused',
    }
    audioInfo.value.canPlay = false

    if (play) {
      let timer = setInterval(() => {
        if (audioInfo.value.canPlay) {
          audio?.play()
          clearInterval(timer)
        }
      }, 1000)
    }
  }

  const playMusic = useThrottleFn(() => {
    if (audioInfo.value.canPlay) {
      audio?.play()
      active.value.status = 'playing'
    }
  }, 1000)
  const pausedMusic = useThrottleFn(() => {
    if (audioInfo.value.canPlay) {
      audio?.pause()
      active.value.status = 'paused'
    }
  }, 1000)

  // 音频可以播放
  const audioCanplay = (e) => {
    audioInfo.value.canPlay = true
    audioInfo.value.duration = parseInt(e.target.duration)
  }

  // 同步更新音频播放进度
  const updateTime = (e) => {
    audioInfo.value.currentTime = parseInt(e.target.currentTime)
  }

  // 调整播放进度
  const changeTime = (e) => {
    useThrottleFn(() => {
      audio!.currentTime = e
      audio!.play()
      active.value.status = 'playing'
    }, 1000)()
  }

  // 上一首
  const prev = () => {
    changeMusic(
      activeIndex - 1 <= 0 ? musicList.length - 1 : activeIndex - 1,
      true
    )
  }

  // 下一首
  const next = () => {
    changeMusic(activeIndex + 1 >= musicList.length ? 0 : activeIndex + 1, true)
  }

  const cdScale = computed(() => {
    const magnification = 0.5
    return 1 + (maxFrequency.value / 255) * magnification
  })
</script>

<style scoped lang="less">
  .music-wrap {
    overflow: hidden;
    height: 200px;

    position: relative;
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: url(https://cdn.chenyingshuang.cn/index/music/musci_bg.jpg);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .music-bar {
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      audio {
        opacity: 0;
      }
      canvas {
        // background: rgba(255, 255, 255, 0); /*关键点*/
      }
    }
    .container {
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .music-cd-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.3s ease;
        &:hover {
          transform: scale(1.1) !important;
          .music-player-control {
            .music-name {
              opacity: 1;
              transform: translate(-50%, 10px);
            }
            .btn-wrap {
              opacity: 1;
            }
          }
        }
        &.is-playing {
          .music-cd {
            animation-play-state: running;
            .center-wrap {
              svg {
                color: var(--vp-c-brand-light);
              }
            }
          }
        }
        .music-player-control {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .music-name {
            white-space: nowrap;
            position: absolute;
            padding: 4px 12px;
            top: -70px;
            left: 50%;
            font-size: 14px;
            background: #fff;
            border-radius: 10px;
            color: #333;
            box-shadow: var(--box-shadow2);
            transform: translateX(-50%);
            opacity: 0;
            transition: all 0.3s ease;
          }
          .btn-wrap {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #fff;
            opacity: 0;
            transition: all 0.3s ease;
            &.is-disabled {
              cursor: not-allowed;
            }
            &:hover {
              transform: scale(1.1);
            }
            &.prev-btn,
            &.next-btn {
              width: 36px;
              height: 36px;
              position: absolute;
              top: 2px;
            }
            &.prev-btn {
              left: -100px;
            }
            &.next-btn {
              right: -100px;
            }
          }
        }
      }
      .music-cd {
        width: 400px;
        height: 400px;
        position: relative;
        z-index: 0;
        top: 0;
        border-radius: 50%;
        margin: 0 auto;
        border: 12px solid #e0dfdb;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        background-size: cover;
        background-image: url('https://cdn.chenyingshuang.cn/index/music_cd.png');
        background-position: 50% 50%;
        -webkit-animation: rotate360 32s infinite linear;
        -webkit-transform-origin: center center;
        -ms-transform-origin: center center;
        transform-origin: center center;
        animation-play-state: paused;
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
          border: 4px solid #fff;
          border-radius: 50%;
          transition: all 0.3s ease;
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
            border: 0.5px solid #eee;
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

      :deep(.n-slider) {
        max-width: 200px;
        position: absolute;
        bottom: 12px;
        .n-slider-rail__fill {
          background-color: #ff3543;
        }
        .n-slider-handles {
          --n-handle-size: 12px;
          .n-slider-handle {
            &::after {
              content: '';
              display: block;
              width: 4px;
              height: 4px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
              background-color: #ff3543;
            }
          }
        }
      }
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
