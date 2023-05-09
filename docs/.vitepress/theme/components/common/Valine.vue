<template>
  <div class="valine-wrap">
    <div
      :id="`valine-wrap-${uuid}`"
      class="valine-module"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useData } from 'vitepress'

  const vitePressData = useData()
  const themeConfig = computed(() => {
    return vitePressData.site.value.themeConfig
  })
  const pageConfig = computed(() => {
    return vitePressData.page.value
  })

  const valineId = computed(() => {
    const regularPath = pageConfig.value.relativePath
      .replace('.md', '.html')
      .replace('views', '')
    return pageConfig.value.frontmatter.config &&
      pageConfig.value.frontmatter.config.valineId
      ? pageConfig.value.frontmatter.config.valineId
      : regularPath
  })
  const uuid = new Date().getTime() + Math.round(Math.random() * 10000)

  onMounted(() => {
    import('valine-gnas').then((module) => {
      const ValineGnas = module.default

      new ValineGnas({
        el: `#valine-wrap-${uuid}`,
        notify: false,
        verify: false,
        avatar: 'robohash',
        placeholder: '',
        visitor: true,
        recordIP: true,
        meta: ['nick', 'mail'],
        path: valineId.value,
        ...themeConfig.value.valine,
      })
    })
  })
</script>
<style lang="less">
  .leancloud_visitors {
    .leancloud-visitors-count {
      font-size: 16px;
    }
  }
  .valine-wrap {
    margin: 0 auto;
    .valine-module {
      .vcopy.txt-right,
      .vpower {
        display: none;
      }
    }
  }
</style>
