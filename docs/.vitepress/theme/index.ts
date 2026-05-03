// https://vitepress.dev/guide/custom-theme

import { defineAsyncComponent } from 'vue'
import Theme from 'vitepress/theme'
import {
  focus as vFocus,
  enterFloat as vEnterFloat,
  enterNumber as vEnterNumber,
} from '../utils/mixins/directives/directives.js'
import MyLayout from './components/layout/Layout.vue'

import '../styles/style.less'
import '../styles/article.less'

import '../plugins/axios.js'

const index = defineAsyncComponent(
  () => import('./components/views/index/index.vue')
)
const guide = defineAsyncComponent(
  () => import('./components/views/guide/guide.vue')
)
const tag = defineAsyncComponent(() => import('./components/views/tag/tag.vue'))
const create = defineAsyncComponent(
  () => import('./components/views/create/create.vue')
)
const friend = defineAsyncComponent(
  () => import('./components/views/friend/friend.vue')
)

const fancyBorderRadius = defineAsyncComponent(
  () => import('./components/views/note/fancyBorderRadius.vue')
)
const sanJiaoXingXiaoGongJu = defineAsyncComponent(
  () => import('./components/views/note/sanJiaoXingXiaoGongJu.vue')
)

const CodeDemo = defineAsyncComponent(
  () => import('./components/common/CodeDemo.vue')
)
const Card3D = defineAsyncComponent(
  () => import('./components/common/Card3D.vue')
)
const ImageList = defineAsyncComponent(
  () => import('./components/common/ImageList.vue')
)

const Color = defineAsyncComponent(
  () => import('./components/views/note/components/Color.vue')
)
const Shadow = defineAsyncComponent(
  () => import('./components/views/note/components/Shadow.vue')
)

const travelOverview = defineAsyncComponent(
  () => import('./components/views/travel/travelOverview.vue')
)
const travelMap = defineAsyncComponent(
  () => import('./components/views/travel/travelMap.vue')
)
const travelCalendar = defineAsyncComponent(
  () => import('./components/views/travel/travelCalendar.vue')
)

const CardAnime = defineAsyncComponent(
  () => import('./components/views/life/components/CardAnime.vue')
)
const weightLoss = defineAsyncComponent(
  () => import('./components/views/life/weight-loss.vue')
)
const aiGallery = defineAsyncComponent(
  () => import('./components/views/life/aiGallery.vue')
)

export default {
  ...Theme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.directive('focus', vFocus)
    app.directive('enterFloat', vEnterFloat)
    app.directive('enterNumber', vEnterNumber)

    if (import.meta.env.DEV) {
      app.component('ViewCreate', create)
    }
    app.component('ViewIndex', index)
    app.component('ViewGuide', guide)
    app.component('ViewTag', tag)
    app.component('ViewFriend', friend)
    app.component('ViewFancyBorderRadius', fancyBorderRadius)
    app.component('ViewSanJiaoXingXiaoGongJu', sanJiaoXingXiaoGongJu)
    app.component('ViewTravelOverview', travelOverview)
    app.component('ViewTravelMap', travelMap)
    app.component('ViewTravelCalendar', travelCalendar)

    app.component('CodeDemo', CodeDemo)
    app.component('Card3D', Card3D)
    app.component('ImageList', ImageList)

    app.component('Color', Color)
    app.component('Shadow', Shadow)

    app.component('LifeCardAnime', CardAnime)
    app.component('ViewWeightLoss', weightLoss)
    app.component('ViewAiGallery', aiGallery)
  },
}
