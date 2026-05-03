/** AI 作图画廊数据（本文件位于 theme/components/views/life/）：把 src 换成你的图片地址（本地可放 docs/public 下用 /xxx.png） */
export interface AiGalleryItem {
  src: string
  /** 短标题，显示在卡片下方 */
  title?: string
  /** 模型或工具，小字展示 */
  tool?: string
  /** 可选备注 / 提示词摘要 */
  note?: string
}

export const aiGalleryIntro =
  '这里收集我用 AI 生成的图像。点击图片可全屏预览。'

/** fetch manifest 失败或清单为空时使用；可在本数组中手写备用条目 */
export const aiGalleryFallbackItems: AiGalleryItem[] = []
