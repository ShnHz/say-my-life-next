// https://vitepress.dev/guide/custom-theme\

import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/style.less'

import index from './components/views/index/index.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('index', index)
  },
}
