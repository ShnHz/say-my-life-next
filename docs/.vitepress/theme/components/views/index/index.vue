<template>
  <div class="index-wrap">
    <div class="first-wrap">
      <div class="container">
        <Background />
        <div class="info-wrap">
          <div class="hello">
            {{ frontmatter.hero.hello }}
          </div>
          <div class="title">
            {{ frontmatter.hero.name }}
          </div>
          <div class="desc">{{ desc }}</div>
          <div class="avatar">
            <img
              src="https://cdn.chenyingshuang.cn/index/labixiaoxin.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="other-wrap"></div>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    ref,
  } from 'vue'
  import EasyTyper from 'easy-typer-js'
  import Background from './components/Background.vue'

  // --------------------------------------common
  const proxy: any = getCurrentInstance()
  const frontmatter: any = proxy?.proxy?.$frontmatter
  const desc = ref<string>('')
  let easyTyper: any = {
    output: '',
    isEnd: false,
    speed: 120,
    singleBack: true,
    sleep: 0,
    type: 'normal',
    backSpeed: 150,
    sentencePause: false,
  }
  let timer

  onMounted(() => {
    startEasyTyper()
    timer = setInterval(() => {
      easyTyper = {
        output: '',
        isEnd: false,
        speed: 120,
        singleBack: true,
        sleep: 0,
        type: 'normal',
        backSpeed: 150,
        sentencePause: false,
      }
      startEasyTyper()
    }, 10000)
  })

  onUnmounted(() => {
    clearInterval(timer)
    timer = null
  })

  const startEasyTyper = () => {
    new EasyTyper(
      easyTyper,
      frontmatter.hero.text,
      () => {},
      () => {
        desc.value = easyTyper.output
      }
    )
  }
</script>

<style scoped lang="less">
  .index-wrap {
    overflow: hidden;
    .first-wrap {
      height: 100vh;
      width: 100%;
      position: relative;
      .info-wrap {
        position: relative;
        top: 50%;
        transform: translateY(-240px);
        .hello {
          margin-bottom: 36px;
          font-size: 26px;
          letter-spacing: -0.4px;
        }
        .title {
          line-height: 80px;
          position: relative;
          margin-bottom: 36px;
          font-size: 80px;
          font-weight: 700;
          white-space: pre-wrap;
          letter-spacing: -0.4px;
          background: var(--vp-home-hero-name-background);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: var(--vp-home-hero-name-color);
        }
        .desc {
          display: inline-block;
          height: 24px;
          min-width: 1px;
          position: relative;
          font-size: 24px;
          font-weight: 400;
          vertical-align: bottom;

          &::before {
            content: '|';
            display: block;
            position: absolute;
            top: 0;
            right: -8px;
            font-size: 16px;
            animation: flicker 1s infinite;
          }
        }
        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 160px;
          position: relative;
          margin-top: 100px;
          border-radius: 50%;
          border: 2px solid #888;
          overflow: hidden;
          background: var(--bg-1);
          transition: all 0.3s linear;
          &:hover {
            border: 2px solid var(--vp-c-brand);
          }
          img {
            cursor: pointer;
            margin-top: 0px;

            &:hover {
              transform: rotate(666turn);
              transition-delay: 1s;
              transition-property: all;
              transition-duration: 59s;
              transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
            }
          }
        }
      }
    }
    .other-wrap{
      width: 100%;
      height: 300px;
      background: var(--bg-2);
    }
  }

  @keyframes flicker {
    0% {
      opacity: 0;
    }
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
