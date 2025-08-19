// 视频播放器相关的类型声明

declare module 'video.js/dist/video-js.css' {
  const content: any
  export default content
}

declare module '@videojs-player/vue' {
  import { Component } from 'vue'
  
  export const VideoPlayer: Component
  export const install: (app: any) => void
  
  const plugin: {
    VideoPlayer: Component
    install: (app: any) => void
  }
  
  export default plugin
}
