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

    <p>
      <!-- <Tag
        v-if="
          data.frontmatter &&
          data.frontmatter.config &&
          data.frontmatter.config.top
        "
        type="top"
        icon="gnas-i gnas-i-pushpin-fill"
      >
        置顶
      </Tag>
      <Tag
        :key="`tag-${index}-${item.type}`"
        v-for="(item, index) in $tagFormat(
          (data.config && data.config.tag) || []
        )"
        :type="item.type"
      >
        {{ item.name }}
      </Tag> -->
    </p>
  </li>
</template>

<script setup lang="ts">
  import useCurrentInstance from '../../../../../utils/hooks/useCurrentInstance'

  const currentInstanc: any = useCurrentInstance()
  const proxy = currentInstanc.proxy

  const props = defineProps<{
    data: {
      path: string
      title: string
      summary: string
      date: string
    }
  }>()
</script>

<style scoped lang="less">
  .blog-item-wrap {
    width: 100%;
    padding: 1rem 1.2rem;
    border-radius: 8px;
    background: #fff;

    &:not(:first-child) {
      margin-top: 20px;
    }
    .article-title {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.87);
      line-height: 1.5;
    }

    .article-date {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }

    .article-summary {
      padding: 16px 0 10px;
      color: rgba(0, 0, 0, 0.87);
      font-size: 14px;
      line-height: 1.375rem;
      font-weight: 400;
    }
  }
</style>
