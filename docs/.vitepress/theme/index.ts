// https://vitepress.dev/guide/custom-theme\

import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/style.less'
import Mixins from './utils/mixins'

// ------------------------------views
import index from './components/views/index/index.vue'

// ------------------------------components
// common
import CodeDemo from './components/common/CodeDemo.vue'

// note
import Color from './components/views/note/components/Color.vue'
import Shadow from './components/views/note/components/Shadow.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('index', index)

    app.component('CodeDemo', CodeDemo)

    app.component('Color', Color)
    app.component('Shadow', Shadow)

    app.mixin(Mixins)
  },
}
