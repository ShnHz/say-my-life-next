<template></template>

<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useData } from 'vitepress'
  import ValineGnas from 'valine-gnas'

  const vitePressData = useData()
  const themeConfig = computed(() => {
    return vitePressData.site.value.themeConfig
  })

  onMounted(() => {
    console.log(1)
    addGlobalAccess()
  })

  // 记录全局访问量
  const addGlobalAccess = () => {
    new ValineGnas({
      appId: themeConfig.value.valine.appId,
      appKey: themeConfig.value.valine.appKey,
      globalAccess: true,
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
