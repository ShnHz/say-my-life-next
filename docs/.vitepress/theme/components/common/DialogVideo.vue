<template>
  <el-dialog
    v-model="isShow"
    title=""
    width="800"
    @closed="closeModal"
    class="el-dialog-video"
  >
    <video-player
      :src="props.video"
      :poster="props.poster"
      controls
      :loop="false"
      :volume="0.6"
      :autoplay="props.autoplay"
    />
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, reactive } from 'vue'
  import { VideoPlayer } from '@videojs-player/vue'
  import 'video.js/dist/video-js.css'

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
  }
</style>
