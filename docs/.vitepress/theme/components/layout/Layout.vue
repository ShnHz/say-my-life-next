<template>
  <el-config-provider :locale="zhCn">
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
        <ValineGlobal v-if="themeConfig.globalAccess" />
      </template>
      <template #doc-after>
        <ClientOnly>
          <Valine
            v-if="
              themeConfig.valine.enable &&
              pageConfig.frontmatter.config &&
              pageConfig.frontmatter.config.valine
            "
          />
        </ClientOnly>
      </template>
    </Layout>
  </el-config-provider>
</template>
<script lang="ts" setup>
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

  import { onMounted, computed } from 'vue'
  import { useData } from 'vitepress'

  import DefaultTheme from 'vitepress/theme'
  import Footer from './Footer.vue'
  import BlogTitle from './BlogTitle.vue'
  import Valine from '../common/Valine.vue'
  import ValineGlobal from '../common/ValineGlobal.vue'

  const vitePressData = useData()
  const themeConfig = computed(() => {
    return vitePressData.site.value.themeConfig
  })

  const pageConfig = computed(() => {
    return vitePressData.page.value
  })

  const isBlog = computed<boolean>(() => {
    return pageConfig.value.relativePath.includes('views/blog')
  })

  const { Layout } = DefaultTheme
</script>
<style lang="less">
  .blog-no-aside {
    .container {
      .aside {
        display: none;
      }
    }
  }

  .not-blog {
    .content-container {
      max-width: none !important;
      margin: 0;
    }
  }
</style>
