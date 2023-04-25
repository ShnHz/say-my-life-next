<template>
  <li class="blog-item-wrap">
    <div
      :to="data.path"
      class="article-title"
    >
      {{ data.title }}
    </div>
    <p class="article-date">
      {{ proxy?.mixin_getDate(data.date, 'yyyy.MM.dd') }}
    </p>

    <p
      class="article-summary"
      v-if="data.summary"
    >
      {{ data.summary }}
    </p>

    <p class="tag-list">
      <ShnTag
        v-if="data?.config?.top"
        type="top"
      />
      <ShnTag
        v-if="data?.config?.tag.includes('info')"
        type="reprinted"
      />
      <ShnTag
        v-for="(item, index) in tagList"
        :key="`blog-tag-item-${index}-${data.path}`"
      >
        {{ item.title }}
      </ShnTag>
    </p>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import tagConfig from '@docs/.vitepress/configs/tags.js'

  import ShnTag from '../../../common/Tag.vue'
  import useCurrentInstance from '../../../../../utils/hooks/useCurrentInstance'

  const currentInstanc: any = useCurrentInstance()
  const proxy = currentInstanc.proxy

  const props = defineProps<{
    data: {
      path: string
      title: string
      summary: string
      date: string
      config: {
        top: boolean
        tag: string[]
      }
    }
  }>()

  const tagList = computed(() => {
    const list = props.data.config.tag
      .filter((item) => item && item != 'info')
      .map((item) => {
        return tagConfig[item]
      })
    return list
  })
</script>

<style scoped lang="less">
  .blog-item-wrap {
    cursor: pointer;
    width: 100%;
    position: relative;
    padding: 1rem 1.2rem;
    border-radius: 8px;

    background: var(--bg-3);
    transition: all 0.3s;
    &:not(:first-child) {
      margin-top: 20px;
    }

    &:hover {
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05), 0 0 6px rgba(0, 0, 0, 0.04);
      transform: translateY(-4px);
    }
    .article-title {
      font-size: 18px;
      color: var(--vp-c-text-1);
      line-height: 1.5;
      letter-spacing: 2px;
    }

    .article-date {
      font-size: 12px;
      color: var(--vp-c-text-2);
      letter-spacing: 1px;
    }

    .article-summary {
      padding: 16px 0 10px;
      color: var(--vp-c-text-2);
      font-size: 14px;
      line-height: 1.375rem;
      font-weight: 400;
      letter-spacing: 1px;
    }

    .tag-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
  }
</style>
