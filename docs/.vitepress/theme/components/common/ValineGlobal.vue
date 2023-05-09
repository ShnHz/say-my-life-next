<template></template>

<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useData } from 'vitepress'

  const vitePressData = useData()
  const themeConfig = computed(() => {
    return vitePressData.site.value.themeConfig
  })

  onMounted(() => {
    addGlobalAccess()
  })

  // 记录全局访问量
  const addGlobalAccess = () => {
    import('valine-gnas').then((module) => {
      const ValineGnas = module.default

      new ValineGnas({
        appId: themeConfig.value.valine.appId,
        appKey: themeConfig.value.valine.appKey,
        globalAccess: true,
      })
    })
  }
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
