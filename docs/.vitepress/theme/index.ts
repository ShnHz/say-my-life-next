// https://vitepress.dev/guide/custom-theme\

import { h } from 'vue'
import Theme from 'vitepress/theme'
import Mixins from '../utils/mixins/mixins'
import MyLayout from './components/layout/Layout.vue'

import '../styles/style.less'
import '../styles/article.less'
import 'element-plus/dist/index.css'

import '../plugins/axios.js'

// ------------------------------views
import index from '@theme/components/views/index/index.vue'
import guide from '@theme/components/views/guide/guide.vue'
import tag from '@theme/components/views/tag/tag.vue'
import create from '@theme/components/views/create/create.vue'

import fancyBorderRadius from './components/views/note/fancyBorderRadius.vue'
import sanJiaoXingXiaoGongJu from './components/views/note/sanJiaoXingXiaoGongJu.vue'

// ------------------------------components
import ElementPlus from 'element-plus'
// common
import CodeDemo from '@theme/components/common/CodeDemo.vue'

// note
import Color from './components/views/note/components/Color.vue'
import Shadow from './components/views/note/components/Shadow.vue'

// travel
import travelOverview from './components/views/travel/travelOverview.vue'
import travelMap from './components/views/travel/travelMap.vue'
import travelCalendar from './components/views/travel/travelCalendar.vue'
import TravelPlan from './components/views/travel/components/TravelPlan.vue'

// life
import my3d from './components/views/life/my3d/my3d.vue'
import CardAnime from './components/views/life/components/CardAnime.vue'

export default {
  ...Theme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    if (process.env.NODE_ENV === 'development') {
      app.component('ViewCreate', create)
    }
    app.component('ViewIndex', index)
    app.component('ViewGuide', guide)
    app.component('ViewTag', tag)
    app.component('ViewFancyBorderRadius', fancyBorderRadius)
    app.component('ViewSanJiaoXingXiaoGongJu', sanJiaoXingXiaoGongJu)
    app.component('ViewTravelOverview', travelOverview)
    app.component('ViewTravelMap', travelMap)
    app.component('ViewTravelCalendar', travelCalendar)
    app.component('ViewMy3d', my3d)

    app.component('CodeDemo', CodeDemo)

    app.component('Color', Color)
    app.component('Shadow', Shadow)

    app.component('TravelPlan', TravelPlan)

    app.component('LifeCardAnime', CardAnime)

    app.use(ElementPlus)

    app.mixin(Mixins)
  },
}
