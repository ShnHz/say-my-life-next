<template>
  <Layout
    :class="{
      'is-blog': isBlog,
      'not-blog': !isBlog,
      'blog-no-aside': isBlog && !pageConfig.frontmatter.config.dir,
    }"
  >
    <template #doc-before>
      <BlogTitle v-if="isBlog" />
    </template>
    <template #layout-bottom>
      <Footer />
    </template>
    <template #doc-after>
      <Valine
        v-if="
          themeConfig.valine.enable &&
          pageConfig.frontmatter.config &&
          pageConfig.frontmatter.config.valine
        "
      />
    </template>
  </Layout>
</template>
<script lang="ts" setup>
  import { onMounted, computed } from 'vue'
  import { useData } from 'vitepress'
  import ValineGnas from 'valine-gnas'

  import DefaultTheme from 'vitepress/theme'
  import Footer from './Footer.vue'
  import BlogTitle from './BlogTitle.vue'
  import Valine from '../common/Valine.vue'

  const vitePressData = useData()
  const themeConfig = vitePressData.site.value.themeConfig
  const pageConfig = vitePressData.page.value

  const isBlog = computed<boolean>(() => {
    return pageConfig.relativePath.includes('views/blog')
  })

  const { Layout } = DefaultTheme

  onMounted(() => {
    if (themeConfig.globalAccess) {
      addGlobalAccess()
    }
  })

  // 记录全局访问量
  const addGlobalAccess = () => {
    new ValineGnas({
      appId: themeConfig.valine.appId,
      appKey: themeConfig.valine.appKey,
      globalAccess: true,
    })
  }
</script>
<style lang="less">
  .blog-no-aside {
    .container {
      .aside {
        display: none;
      }
    }
  }

  .not-blog{
    .content-container{
      max-width: none !important;
      margin: 0;
    }
  }
</style>
