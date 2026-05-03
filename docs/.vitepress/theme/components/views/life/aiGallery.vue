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
          v-if="item.title || item.tool || item.note"
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
  import {
    aiGalleryFallbackItems,
    aiGalleryIntro,
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
      out.push({
        src,
        title: typeof r.title === 'string' ? r.title : undefined,
        tool: typeof r.tool === 'string' ? r.tool : undefined,
        note: typeof r.note === 'string' ? r.note : undefined,
      })
    }
    return out
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
