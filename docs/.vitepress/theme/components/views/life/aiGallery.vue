<template>
  <div class="ai-gallery">
    <header class="ai-gallery__head">
      <h1 class="ai-gallery__title">AI 作图画廊</h1>
      <p class="ai-gallery__desc">{{ aiGalleryIntro }}</p>
    </header>

    <p
      v-if="loading"
      class="ai-gallery__loading"
    >
      加载作品清单…
    </p>

    <template v-else>
      <p
        v-if="loadError"
        class="ai-gallery__warn"
      >
        {{ loadError }}
      </p>

      <div
        v-if="items.length"
        class="ai-gallery__masonry"
        role="list"
      >
      <figure
        v-for="(item, index) in items"
        :key="`ai-gallery-${index}-${item.src}`"
        class="ai-gallery__card"
        role="listitem"
      >
        <el-image
          class="ai-gallery__img"
          :src="item.src"
          fit="cover"
          lazy
          :preview-src-list="previewList"
          :initial-index="index"
          preview-teleported
          hide-on-click-modal
        >
          <template #error>
            <div class="ai-gallery__slot ai-gallery__slot--err">
              <span>加载失败</span>
            </div>
          </template>
          <template #placeholder>
            <div class="ai-gallery__slot ai-gallery__slot--ph">
              <span class="ai-gallery__spin" />
            </div>
          </template>
        </el-image>
        <figcaption
          v-if="item.title || item.tool || item.note || item.prompt"
          class="ai-gallery__cap"
        >
          <span
            v-if="item.title"
            class="ai-gallery__cap-title"
            >{{ item.title }}</span
          >
          <span
            v-if="item.tool"
            class="ai-gallery__cap-tool"
            >{{ item.tool }}</span
          >
          <span
            v-if="item.note"
            class="ai-gallery__cap-note"
            >{{ item.note }}</span
          >
          <el-popover
            v-if="item.prompt"
            :width="320"
            trigger="click"
            placement="top"
            popper-class="ai-gallery__pop"
          >
            <template #reference>
              <button
                type="button"
                class="ai-gallery__prompt-btn"
                aria-label="查看提示词"
              >
                提示词
              </button>
            </template>
            <div class="ai-gallery__pop-body">
              <div class="ai-gallery__pop-head">
                <span class="ai-gallery__pop-title">提示词</span>
                <button
                  type="button"
                  class="ai-gallery__pop-copy"
                  @click="copyPrompt(item.prompt)"
                >
                  复制
                </button>
              </div>
              <pre class="ai-gallery__pop-text">{{ item.prompt }}</pre>
            </div>
          </el-popover>
        </figcaption>
      </figure>
      </div>

      <p
        v-else-if="!loadError"
        class="ai-gallery__empty"
      >
        暂无作品。请在仓库根目录执行
        <code>npm run manifest:ai-gallery</code>
        生成
        <code>docs/public/json/ai-gallery-manifest.json</code>
        ，或在
        <code>aiGalleryData.ts</code>
        的
        <code>aiGalleryFallbackItems</code>
        中添加备用图片。
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import {
    aiGalleryFallbackItems,
    aiGalleryIntro,
    aiGalleryPromptOverrides,
    type AiGalleryItem,
  } from './aiGalleryData'

  const items = ref<AiGalleryItem[]>([])
  const loading = ref(true)
  const loadError = ref<string | null>(null)

  const previewList = computed(() => items.value.map((i) => i.src))

  function manifestUrl() {
    const base = import.meta.env.BASE_URL || '/'
    const root = base.endsWith('/') ? base : `${base}/`
    return `${root}json/ai-gallery-manifest.json`
  }

  function mapManifestItems(raw: unknown): AiGalleryItem[] {
    if (!raw || typeof raw !== 'object') return []
    const itemsUnknown = (raw as { items?: unknown }).items
    if (!Array.isArray(itemsUnknown)) return []
    const out: AiGalleryItem[] = []
    for (const row of itemsUnknown) {
      if (!row || typeof row !== 'object') continue
      const r = row as Record<string, unknown>
      const src = typeof r.src === 'string' ? r.src.trim() : ''
      if (!src) continue
      const key = typeof r.key === 'string' ? r.key : undefined
      const override = key ? aiGalleryPromptOverrides[key] : undefined
      out.push({
        key,
        src,
        title:
          (typeof r.title === 'string' ? r.title : undefined) ??
          override?.title,
        tool:
          (typeof r.tool === 'string' ? r.tool : undefined) ?? override?.tool,
        note:
          (typeof r.note === 'string' ? r.note : undefined) ?? override?.note,
        prompt:
          (typeof r.prompt === 'string' ? r.prompt : undefined) ??
          override?.prompt,
      })
    }
    return out
  }

  async function copyPrompt(text?: string) {
    if (!text) return
    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      ElMessage.success('提示词已复制')
    } catch {
      ElMessage.error('复制失败，请手动选择文本复制')
    }
  }

  async function loadGallery() {
    loading.value = true
    loadError.value = null
    try {
      const url = manifestUrl()
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`清单请求失败（${res.status}）`)
      }
      const data = await res.json()
      const mapped = mapManifestItems(data)
      items.value = mapped.length ? mapped : [...aiGalleryFallbackItems]
    } catch (e) {
      items.value = [...aiGalleryFallbackItems]
      const msg =
        e instanceof Error ? e.message : '加载清单失败'
      loadError.value =
        items.value.length > 0
          ? `${msg}（已显示备用条目）`
          : `${msg} 请确认已执行 npm run manifest:ai-gallery 且站点可访问 /json/ai-gallery-manifest.json。`
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadGallery()
  })
</script>

<style scoped lang="less">
  .ai-gallery {
    min-height: 60vh;
    padding: 24px 20px 80px;
    max-width: 1400px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .ai-gallery__head {
    margin-bottom: 28px;
    text-align: center;
  }

  .ai-gallery__title {
    margin: 0 0 10px;
    font-size: 1.75rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--vp-c-text-1);
  }

  .ai-gallery__desc {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  .ai-gallery__masonry {
    column-count: 2;
    column-gap: 14px;
  }

  @media (min-width: 520px) {
    .ai-gallery__masonry {
      column-count: 3;
      column-gap: 16px;
    }
  }

  @media (min-width: 900px) {
    .ai-gallery__masonry {
      column-count: 4;
      column-gap: 18px;
    }
  }

  @media (min-width: 1200px) {
    .ai-gallery__masonry {
      column-count: 5;
      column-gap: 20px;
    }
  }

  .ai-gallery__card {
    break-inside: avoid;
    margin: 0 0 14px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--vp-c-bg-soft);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    @media (min-width: 900px) {
      margin-bottom: 18px;
    }
  }

  .ai-gallery__card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .ai-gallery__img {
    display: block;
    width: 100%;
    vertical-align: middle;

    :deep(.el-image__inner) {
      width: 100% !important;
      height: auto !important;
      display: block;
    }

    :deep(.el-image__wrapper) {
      width: 100% !important;
    }
  }

  .ai-gallery__cap {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px 12px;
    font-size: 0.8rem;
    line-height: 1.35;
  }

  .ai-gallery__cap-title {
    color: var(--vp-c-text-1);
    font-weight: 500;
  }

  .ai-gallery__cap-tool {
    color: var(--vp-c-brand-1);
    font-size: 0.75rem;
  }

  .ai-gallery__cap-note {
    color: var(--vp-c-text-3);
    font-size: 0.72rem;
  }

  .ai-gallery__prompt-btn {
    align-self: flex-start;
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 9px;
    border-radius: 999px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-size: 0.72rem;
    line-height: 1.4;
    cursor: pointer;
    transition:
      border-color 0.18s ease,
      color 0.18s ease,
      background 0.18s ease;
  }

  .ai-gallery__prompt-btn:hover {
    color: var(--vp-c-brand-1);
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-soft);
  }

  .ai-gallery__prompt-btn-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--vp-c-brand-1);
  }

  .ai-gallery__slot {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-3);
    font-size: 0.85rem;
  }

  .ai-gallery__slot--ph {
    min-height: 160px;
  }

  .ai-gallery__spin {
    width: 28px;
    height: 28px;
    border: 2px solid var(--vp-c-divider);
    border-top-color: var(--vp-c-brand-1);
    border-radius: 50%;
    animation: ai-gallery-spin 0.7s linear infinite;
  }

  @keyframes ai-gallery-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .ai-gallery__loading {
    text-align: center;
    color: var(--vp-c-text-2);
    padding: 48px 16px;
  }

  .ai-gallery__warn {
    margin: 0 0 16px;
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
  }

  .ai-gallery__empty {
    text-align: center;
    color: var(--vp-c-text-2);
    padding: 48px 16px;
    line-height: 1.8;

    code {
      font-size: 0.88em;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--vp-c-bg-mute);
    }
  }
</style>

<style lang="less">
  .el-popover.ai-gallery__pop {
    padding: 0 !important;
    border-radius: 10px;
    overflow: hidden;
  }

  .ai-gallery__pop-body {
    display: flex;
    flex-direction: column;
    max-height: 320px;
  }

  .ai-gallery__pop-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
  }

  .ai-gallery__pop-title {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--vp-c-text-1);
  }

  .ai-gallery__pop-copy {
    appearance: none;
    border: 1px solid var(--vp-c-brand-1);
    background: transparent;
    color: var(--vp-c-brand-1);
    font-size: 0.72rem;
    line-height: 1.4;
    padding: 2px 10px;
    border-radius: 999px;
    cursor: pointer;
    transition:
      background 0.18s ease,
      color 0.18s ease;
  }

  .ai-gallery__pop-copy:hover {
    background: var(--vp-c-brand-1);
    color: #fff;
  }

  .ai-gallery__pop-text {
    margin: 0;
    padding: 10px 12px 12px;
    overflow: auto;
    max-height: 260px;
    font-family:
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Consolas,
      monospace;
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--vp-c-text-1);
    white-space: pre-wrap;
    word-break: break-word;
    background: transparent;
  }
</style>
