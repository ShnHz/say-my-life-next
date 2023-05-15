<template>
  <li
    class="blog-item-wrap"
    @click="toPath(data.path)"
  >
    <div class="article-title">
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
        :type="item?.type"
      >
        <BuildFilled
          style="height: 14px; width: 14px"
          v-if="item?.icon && item?.icon === 'BuildFilled'"
        />
        <MovieCreationFilled
          style="height: 14px; width: 14px"
          v-if="item?.icon && item?.icon === 'MovieCreationFilled'"
        />
        <MusicNoteFilled
          style="height: 14px; width: 14px"
          v-if="item?.icon && item?.icon === 'MusicNoteFilled'"
        />
        {{ item?.title }}
      </ShnTag>
    </p>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import tagConfig from '@docs/.vitepress/configs/tags.js'
  import { useRouter, useData } from 'vitepress'

  import {
    BuildFilled,
    MusicNoteFilled,
    MovieCreationFilled,
  } from '@vicons/material'
  import ShnTag from '../../../common/Tag.vue'
  import useCurrentInstance from '../../../../../utils/hooks/useCurrentInstance'

  const vitePressData = useData()

  const router = useRouter()
  router.onAfterRouteChanged = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

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

  const toPath = (path) => {
    router.go(`${vitePressData.site.value.base}${path}`)
  }
</script>

<style scoped lang="less">
  .blog-item-wrap {
    cursor: pointer;
    width: 100%;
    position: relative;
    padding: 1rem 1.2rem;
    border-radius: 16px;

    background: var(--bg-3);
    transition: all 0.3s;
    &:not(:first-child) {
      margin-top: 20px;
    }

    &:hover {
      box-shadow: var(--box-shadow);
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
