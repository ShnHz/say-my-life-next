<template>
  <div class="travtel-plan-wrap">
    <div class="title">{{ pageConfig.title }}</div>
    <div class="plan-list">
      <div
        class="plan-ul"
        v-for="(item, index) in list"
        :key="`plan-ul-${index}`"
      >
        <div class="date">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useData } from 'vitepress'

  const vitePressData = useData()
  const themeConfig = computed(() => {
    return vitePressData.site.value.themeConfig
  })
  const pageConfig = computed(() => {
    return vitePressData.page.value
  })
  const list = computed(() => {
    return pageConfig.value.frontmatter.list
  })

  onMounted(() => {
    console.log(pageConfig.value)
  })
</script>

<style lang="less">
  .travtel-plan-wrap {
    .title {
      position: relative;
      margin-bottom: 1rem;
      font-weight: 500;
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
</style>
