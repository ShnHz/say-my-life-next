// https://vitepress.dev/guide/custom-theme\

import { h } from 'vue'
import Theme from 'vitepress/theme'
import Mixins from '../utils/mixins/mixins'
import MyLayout from './components/layout/Layout.vue'

import '../styles/style.less'
import '../styles/article.less'

import '../plugins/axios.js'

// ------------------------------views
import index from '@theme/components/views/index/index.vue'
import guide from '@theme/components/views/guide/guide.vue'
import create from '@theme/components/views/create/create.vue'

import fancyBorderRadius from './components/views/note/fancyBorderRadius.vue'
import sanJiaoXingXiaoGongJu from './components/views/note/sanJiaoXingXiaoGongJu.vue'

// ------------------------------components
// common
import CodeDemo from '@theme/components/common/CodeDemo.vue'

// note
import Color from './components/views/note/components/Color.vue'
import Shadow from './components/views/note/components/Shadow.vue'

export default {
  ...Theme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('ViewIndex', index)
    app.component('ViewGuide', guide)
    app.component('ViewCreate', create)
    app.component('ViewFancyBorderRadius', fancyBorderRadius)
    app.component('ViewSanJiaoXingXiaoGongJu', sanJiaoXingXiaoGongJu)

    app.component('CodeDemo', CodeDemo)

    app.component('Color', Color)
    app.component('Shadow', Shadow)

    app.mixin(Mixins)
  },
}
