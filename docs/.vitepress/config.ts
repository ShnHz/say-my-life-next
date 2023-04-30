const path = require('path')

import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import socialLinks from './configs/socialLinks'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '野宁新之助',
  description: 'Think twice before you do.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks,
    search: {
      provider: 'local',
    },
    lastUpdated: true,
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
    returnToTopLabel: 'Return to top',

    // 备案号
    record: '浙ICP备00000000号-0',
    recordLink: 'http://beian.miit.gov.cn/',
    // 作者
    author: '野宁新之助',
    // 项目开始时间
    startYear: '2022',
  },
  vite: {
    plugins: [],
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../'),
        '@docs': path.resolve(__dirname, '../'),
      },
    },
  },
})
