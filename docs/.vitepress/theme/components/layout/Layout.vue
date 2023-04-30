<template>
  <Layout>
    <template #layout-bottom>
      <Footer />
    </template>
  </Layout>
</template>
<script setup>
  import DefaultTheme from 'vitepress/theme'
  import Footer from './Footer.vue'

  const { Layout } = DefaultTheme
</script>
