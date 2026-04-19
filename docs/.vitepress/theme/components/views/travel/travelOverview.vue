<template>
  <div class="travtel-overview-wrap">
    <div class="travtel-overview-map-wrap">
      <travelMap />
    </div>
    <div class="travtel-overview-list-wrap">
      <div
        class="img-wrap"
        :class="{ video: item.video }"
        v-for="(item, index) in imgs"
        :key="`journey-overview-item-${index}`"
        @click="handleClick(item)"
      >
        <el-image
          :src="item.src"
          fit="cover"
          lazy
        >
          <div
            class="image-slot"
            slot="error"
          >
            <i class="el-icon-picture-outline"></i>
          </div>
          <div
            class="loading-image-slot"
            slot="placeholder"
          >
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
        <p :class="{ len6: item.name.length === 6 }">
          <span>"</span>{{ item.name }}<span>"</span>
        </p>
      </div>
    </div>

    <DialogVideo
      v-model:show="dialogVideo.show"
      :video="dialogVideo.video"
      :poster="dialogVideo.poster"
      @closed="
        dialogVideo = {
          show: false,
          video: '',
          poster: '',
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'
  import travelMap from './travelMap.vue'
  import DialogVideo from '../../common/DialogVideo.vue'

  // 定义数据类型
  interface TravelItem {
    src: string
    name: string
    video?: string
  }

  // 响应式数据
  const list = ref<TravelItem[]>([])

  // 从JSON文件加载数据
  const loadTravelData = async () => {
    // 根据环境判断数据源
    const isDev =
      process.env.NODE_ENV === 'development' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'

    if (isDev) {
      // 开发环境：使用本地JSON文件
      await loadFromUrl(
        '/json/travel_overview.json',
        '🔧 开发环境：使用本地JSON文件'
      )
    } else {
      // 生产环境：优先使用云存储，失败时回退到public目录
      try {
        await loadFromUrl(
          'https://cdn.sanghangning.cn/journey/json/travel_overview.json',
          '🚀 生产环境：使用云存储URL'
        )
      } catch (error) {
        console.warn('云存储加载失败，回退到public目录:', error)
        await loadFromUrl(
          '/json/travel_overview.json',
          '📁 回退到public目录文件'
        )
      }
    }
  }

  // 从指定URL加载数据的辅助函数
  const loadFromUrl = async (url: string, logMessage: string) => {
    try {
      console.log(logMessage, url)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch travel data from ${url}`)
      }
      const data = await response.json()
      list.value = data
    } catch (error) {
      console.error(`Error loading travel data from ${url}:`, error)
      // 如果所有数据源都失败，使用默认数据
      if (url === '/json/travel_overview.json') {
        console.warn('所有数据源都失败，使用默认数据')
        list.value = []
      } else {
        throw error
      }
    }
  }

  // 组件挂载时加载数据
  onMounted(() => {
    loadTravelData()
  })

  const imgs = computed(() => {
    return list.value.map((item) => {
      return {
        ...item,
        src: `http://cdn.sanghangning.cn/${item.src}`,
      }
    })
  })

  const handleClick = (item: any) => {
    if (item.video) {
      dialogVideo.value = {
        show: true,
        video: item.video,
        poster: '',
      }
    }
  }

  const dialogVideo = ref<{
    show: boolean
    video: string
    poster: string
  }>({
    show: false,
    poster: '',
    video: '',
  })
</script>

<style scoped lang="less">
  .travtel-overview-wrap {
    .travtel-overview-map-wrap {
      border-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      height: 50vh;
    }
  }
  .travtel-overview-list-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    .img-wrap {
      width: calc(33.3333% - (20px / 3));
      min-height: 200px;
      aspect-ratio: 4/2.5; /* 宽高比 4:3 = 宽度:高度 */
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      :deep(.el-image) {
        width: 100%;
        height: 100%;
        .image-slot,
        .loading-image-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
        }
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #000;
          opacity: 0.2;
        }
        img {
          transition: all 0.3s ease-out;
        }
      }
      &.video {
        cursor: pointer;
      }

      p {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-80%);
        text-align: center;
        color: #fff;
        font-size: 36px;
        font-family: NotoSansHans-Black;
        text-indent: 16px;
        letter-spacing: 16px;
        span {
          font-size: 24px;
        }
        &.len6 {
          font-size: 28px;
          letter-spacing: 12px;
        }
      }

      &:hover {
        :deep(.el-image) {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .travtel-overview-list-wrap {
      .img-wrap {
        width: 400px;
        height: 200px;
      }
    }
  }
</style>
