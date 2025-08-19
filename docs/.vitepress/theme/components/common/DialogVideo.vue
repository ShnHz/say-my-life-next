<template>
  <el-dialog
    v-model="isShow"
    title=""
    width="800"
    @closed="closeModal"
    class="el-dialog-video"
  >
    <ClientOnly>
      <component
        v-if="VideoPlayer"
        :is="VideoPlayer"
        :src="props.video"
        :poster="props.poster"
        controls
        :loop="false"
        :volume="0.6"
        :autoplay="props.autoplay"
      />
      <div v-else class="video-loading">加载视频播放器...</div>
    </ClientOnly>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, reactive, onMounted, type Component } from 'vue'

  const VideoPlayer = ref<Component | null>(null)
  
  // 动态导入视频播放器组件，避免 SSR 问题
  onMounted(async () => {
    try {
      if (typeof window !== 'undefined') {
        // 动态导入 CSS 文件
        await import('video.js/dist/video-js.css' as any)
        const { VideoPlayer: VPlayer } = await import('@videojs-player/vue')
        VideoPlayer.value = VPlayer as Component
      }
    } catch (error) {
      console.error('Failed to load video player:', error)
    }
  })

  const emit = defineEmits(['update:show', 'closed'])
  const isShow = ref<boolean>(false)
  const props = withDefaults(
    defineProps<{
      show: boolean
      video: string
      poster?: string
      autoplay?: boolean
    }>(),
    {
      show: false,
      video: '',
      poster: '',
    }
  )
  watch(
    () => props.show,
    (newValue) => {
      isShow.value = newValue

      if (isShow.value) {
        nextTick(() => {
          initModal()
        })
      }
    },
    {
      immediate: true,
    }
  )

  const initModal = () => {}
  const closeModal = () => {
    isShow.value = false
    emit('update:show', false)
    emit('closed', isShow.value)
  }

  const options = reactive({
    width: '800px', //播放器宽度
    height: '450px', //播放器高度
    color: '#409eff', //主题色
    title: '', //视频名称
    src: props.video, //视频源
    muted: false, //静音
    webFullScreen: false,
    speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
    autoPlay: false, //自动播放
    loop: false, //循环播放
    mirror: false, //镜像画面
    ligthOff: false, //关灯模式
    volume: 0.3, //默认音量大小
    control: true, //是否显示控制
    controlBtns: [
      'audioTrack',
      'quality',
      'speedRate',
      'volume',
      'setting',
      'pip',
      'pageFullScreen',
      'fullScreen',
    ], //显示所有按钮,
  })
</script>
<style lang="scss">
  .el-dialog-video {
    width: 818px;
    height: 460px;
    background: transparent;
    margin: 0 auto;
    padding: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 32px;
    overflow: hidden;
    .el-dialog__header {
      z-index: 1;
      position: absolute;
      height: 100px;
      width: 100%;
      .el-dialog__headerbtn,
      .el-dialog__close {
        color: #fff;
      }
    }
    .el-dialog__body {
      padding: 0;
      height: 100%;
      width: 100%;
    }
         .video-js {
       width: 100%;
       height: 100%;
     }
     
     .video-loading {
       display: flex;
       align-items: center;
       justify-content: center;
       height: 460px;
       font-size: 16px;
       color: #666;
       background: #000;
     }
   }
 </style>
