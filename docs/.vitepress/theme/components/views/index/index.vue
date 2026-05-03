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
          <div
            class="avatar"
            @touchstart="handleAvatarTouch"
          >
            <img
              src="https://cdn.sanghangning.cn/index/labixiaoxin.png"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
    <MusicPlayer />
    <div class="other-wrap">
      <div class="container">
        <!-- banner -->
        <div class="banner-wrap">
          <ul>
            <li
              v-for="(item, index) in carouselList"
              :key="`carousel-item-img-${index}`"
              :class="{ 'is-active': carouselIndex === index }"
              :style="{
                'background-image': `url(${item.img}) `,
              }"
              @click="toCarouse(index)"
            ></li>
          </ul>

          <ElCarousel
            autoplay
            effect="fade"
            indicator-position="none"
            arrow="never"
            :interval="10000"
            :touchable="true"
            :pause-on-hover="false"
            @change="handleCarouseChange"
            ref="nCarousel"
          >
            <ElCarouselItem
              v-for="(item, index) in carouselList"
              :key="`carousel-item-${index}`"
            >
              <div class="carousel-title">{{ item.title }}</div>
              <div class="carousel-desc">{{ item.desc }}</div>
            </ElCarouselItem>
          </ElCarousel>
        </div>

        <div class="scroll-wrap">
          <div
            class="scroll"
            style="--t: 20s"
          >
            <div
              v-for="item in 2"
              :key="`scroll-item-${item}`"
            >
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
              <span>Vue</span>
              <span>React</span>
              <span>Python</span>
              <span>Photoshop</span>
              <span>Music</span>
              <span>Movie</span>
              <span>Travel</span>
            </div>
          </div>
        </div>

        <!-- blog -->
        <div>
          <ul>
            <BlogItem
              v-for="(item, index) in blogList"
              :key="`blog-item-${index}`"
              :data="item"
            />
          </ul>

          <div
            class="more-wrap"
            @click="more"
          >
            <p>
              查看更多
              <ReadMoreSharp style="height: 14px; width: 14px" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { data } from '@docs/.vitepress/utils/loaders/blog.data.js'

  import { computed, onMounted, onUnmounted, ref } from 'vue'

  import Background from './components/Background.vue'
  import BlogItem from './components/BlogItem.vue'
  import MusicPlayer from './components/MusicPlayer.vue'
  import { ReadMoreSharp } from '@vicons/material'

  import { useRouter, useRoute, useData } from 'vitepress'
  const vitePressData = useData()

  // --------------------------------------common
  const router = useRouter()
  const route = useRoute()
  const frontmatter: any = route.data.frontmatter
  const desc = ref<string>('')
  const easyTyper = ref({
    output: '',
    isEnd: false,
    speed: 120,
    singleBack: true,
    sleep: 0,
    type: 'normal',
    backSpeed: 150,
    sentencePause: false,
  })
  let timer: ReturnType<typeof setInterval> | null = null
  let typerInstance: { close?: () => void } | null = null

  onMounted(async () => {
    const EasyTyper = (await import('easy-typer-js')).default

    startEasyTyper(EasyTyper)
    timer = setInterval(() => {
      easyTyper.value = {
        output: '',
        isEnd: false,
        speed: 120,
        singleBack: true,
        sleep: 0,
        type: 'normal',
        backSpeed: 150,
        sentencePause: false,
      }
      startEasyTyper(EasyTyper)
    }, 10000)

    // 移动端优化
    if (window.innerWidth <= 768) {
      // 防止双击缩放
      let lastTouchEnd = 0
      document.addEventListener(
        'touchend',
        (event) => {
          const now = new Date().getTime()
          if (now - lastTouchEnd <= 300) {
            event.preventDefault()
          }
          lastTouchEnd = now
        },
        false
      )

      // 优化滚动性能
      document.addEventListener(
        'touchmove',
        (event) => {
          if ((event as any).scale !== 1) {
            event.preventDefault()
          }
        },
        { passive: false }
      )
    }
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
    timer = null
    typerInstance?.close?.()
    typerInstance = null
  })

  const startEasyTyper = (EasyTyper) => {
    typerInstance?.close?.()
    typerInstance = new EasyTyper(
      easyTyper.value,
      frontmatter.hero.text,
      () => {},
      () => {
        desc.value = easyTyper.value.output
      }
    )
  }

  const carouselList = ref<any[]>([
    {
      title: '记得写日记',
      desc: '做一个热爱生活的人，把生活记录下来。',
      img: 'https://cdn.sanghangning.cn/index/carousel1.jpg',
    },
    {
      title: '常常去旅行',
      desc: '我认为旅行是从大自然学习的最佳方式。走遍世界，这是我最大的梦想。',
      img: 'https://cdn.sanghangning.cn/index/carousel2.jpg',
    },
    {
      title: '好好打代码',
      desc: '每天都要学习！争取Github全绿。',
      img: 'https://cdn.sanghangning.cn/index/carousel3.jpg',
    },
    {
      title: '天天学习呀',
      desc: '阶段性学习，能有成果展示出来。',
      img: 'https://cdn.sanghangning.cn/index/carousel4.jpg',
    },
  ])
  const nCarousel = ref()
  const carouselIndex = ref<number>(0)

  const handleCarouseChange = (currentIndex) => {
    carouselIndex.value = currentIndex
  }
  const toCarouse = (index) => {
    nCarousel.value.setActiveItem(index)
  }

  const maxBlogNum = ref<number>(20)
  const more = () => {
    router.go(`${vitePressData.site.value.base}views/Guide`)
  }

  const blogList = computed<[]>(() => {
    return data.filter((item, index) => {
      return index < maxBlogNum.value
    })
  })

  // 移动端触摸交互
  const handleAvatarTouch = () => {
    // 在移动端添加触摸反馈
    if (window.innerWidth <= 768) {
      const avatar = document.querySelector('.avatar')
      if (avatar) {
        avatar.classList.add('touch-active')
        setTimeout(() => {
          avatar.classList.remove('touch-active')
        }, 200)
      }
    }
  }
</script>

<style scoped lang="less">
  .index-wrap {
    overflow: hidden;
    // 移动端优化
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
          letter-spacing: 4px;
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

          // 移动端触摸反馈
          &.touch-active {
            transform: scale(0.95);
            border-color: var(--vp-c-brand);
            transition: all 0.1s ease;
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
    .other-wrap {
      width: 100%;
      background: var(--bg-2);

      .banner-wrap {
        padding: 24px 0;
        ul {
          display: flex;
          gap: 12px;
          li {
            cursor: pointer;
            width: 200px;
            height: 120px;
            background-position: center center;
            background-size: cover;
            border-radius: 16px;
            border: 4px solid var(--vp-c-bg);
            transition: all 0.3s linear;
            &:hover {
              border-color: var(--vp-c-brand-lightest);
            }
            &.is-active {
              border-color: var(--vp-c-brand);
            }
          }
        }

        :deep(.el-carousel) {
          height: 100px;
          .el-carousel__container {
            height: 100px;
          }
          .el-carousel__item {
            padding: 24px 12px;
            .carousel-title {
              font-size: 26px;
            }
            .carousel-desc {
              margin-top: 12px;
              font-size: 18px;
            }
          }
        }
      }

      .more-wrap {
        cursor: pointer;
        width: 100%;
        position: relative;
        margin: 20px 0 0;
        padding: 24px 0 36px;
        text-align: center;
        background-image: var(--bg-more);
        border-radius: 16px 16px 0 0;
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--vp-c-text-1);
          transition: all 0.3s;
          transform: translateY(0);
          opacity: 0.2;
          font-size: 12px;
          :deep(.n-icon) {
            margin-left: 8px;
          }
        }
        &:hover {
          p {
            color: var(--vp-c-brand);
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      }
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

  .scroll-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 16px;
  }
  .scroll {
    display: flex;
    width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(
      90deg,
      transparent,
      #fff 20%,
      #fff 80%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent,
      #fff 20%,
      #fff 80%,
      transparent
    );
    > div span {
      display: inline-block;
      margin: 10px;
      padding: 5px 10px;
      background-color: var(--bg-2);
      border-radius: 5px;

      letter-spacing: 0.2em;
      text-transform: uppercase;

      cursor: pointer;
      transition: background-color 0.5s;
      &:hover {
        background-color: var(--el-color-primary);
      }
    }
  }

  .scroll > div {
    white-space: nowrap;
    animation: animate var(--t) linear infinite;
    animation-delay: calc(var(--t) * -1);
  }
  @keyframes animate {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  .scroll > div:nth-child(2) {
    animation: animate2 var(--t) linear infinite;
    animation-delay: calc(var(--t) / -2);
  }
  @keyframes animate2 {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-200%);
    }
  }

  // .scroll:hover > div {
  //   animation-play-state: paused;
  // }

  // 移动端适配
  @media screen and (max-width: 768px) {
    .index-wrap {
      .first-wrap {
        height: 100vh;

        .info-wrap {
          transform: translateY(-180px);
          padding: 0 20px;

          .hello {
            margin-bottom: 20px;
            font-size: 18px;
            text-align: center;
          }

          .title {
            line-height: 1.2;
            margin-bottom: 20px;
            font-size: 36px;
            text-align: center;
            letter-spacing: 2px;
          }

          .desc {
            font-size: 16px;
            text-align: center;
            margin-bottom: 30px;
          }

          .avatar {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            margin-top: 40px;
          }
        }
      }

      .other-wrap {
        .container {
          padding: 0 14px;
        }
        .banner-wrap {
          padding: 16px 0;

          ul {
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;

            li {
              width: calc(50% - 4px);
              height: 80px;
              border-radius: 12px;
              border-width: 2px;
            }
          }

          :deep(.el-carousel) {
            height: 80px;
            margin-top: 12px;

            .el-carousel__container {
              height: 80px;
            }

            .el-carousel__item {
              padding: 12px 8px;

              .carousel-title {
                font-size: 18px;
                text-align: center;
              }

              .carousel-desc {
                margin-top: 8px;
                font-size: 14px;
                text-align: center;
                line-height: 1.4;
              }
            }
          }
        }

        .scroll-wrap {
          margin: 12px;

          .scroll {
            width: 95vw;
            // 移动端滚动优化
            -webkit-overflow-scrolling: touch;

            > div span {
              margin: 6px;
              padding: 4px 8px;
              font-size: 12px;
              background-color: var(--bg-2);
              // 移动端触摸优化
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }
          }
        }

        .more-wrap {
          margin: 16px 0 0;
          padding: 16px 0 24px;

          p {
            font-size: 14px;
          }
        }
      }
    }
  }

  // 超小屏幕适配 (iPhone SE 等)
  @media screen and (max-width: 480px) {
    .index-wrap {
      .first-wrap {
        .info-wrap {
          transform: translateY(-150px);
          padding: 0 16px;

          .hello {
            font-size: 16px;
            margin-bottom: 16px;
          }

          .title {
            font-size: 28px;
            margin-bottom: 16px;
            letter-spacing: 1px;
          }

          .desc {
            font-size: 14px;
            margin-bottom: 24px;
          }

          .avatar {
            width: 100px;
            height: 100px;
            margin-top: 30px;
          }
        }
      }

      .other-wrap {
        .container {
          padding: 0 14px;
        }
        .banner-wrap {
          ul {
            li {
              width: calc(50% - 4px);
              height: 70px;
            }
          }

          :deep(.el-carousel) {
            height: 70px;

            .el-carousel__item {
              padding: 8px 6px;

              .carousel-title {
                font-size: 16px;
              }

              .carousel-desc {
                font-size: 12px;
                margin-top: 6px;
              }
            }
          }
        }

        .scroll-wrap {
          .scroll {
            > div span {
              margin: 4px;
              padding: 3px 6px;
              font-size: 11px;
            }
          }
        }
      }
    }
  }

  // 横屏适配
  @media screen and (max-width: 768px) and (orientation: landscape) {
    .index-wrap {
      .first-wrap {
        .info-wrap {
          transform: translateY(-120px);

          .title {
            font-size: 32px;
            margin-bottom: 16px;
          }

          .desc {
            font-size: 16px;
            margin-bottom: 20px;
          }

          .avatar {
            width: 100px;
            height: 100px;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
