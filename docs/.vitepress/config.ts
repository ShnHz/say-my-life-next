import path from 'path' 

import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import socialLinks from './configs/socialLinks'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
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
    outline: [3, 5],

    // 备案号
    record: '浙ICP备00000000号-0',
    recordLink: 'http://beian.miit.gov.cn/',
    // 作者
    author: '野宁新之助',
    // 项目开始时间
    startYear: '2019',
    // 全站访问量
    globalAccess: true,
    // 评论系统 文档：https://valine.js.org/，支持valine所有配置
    valine: {
      enable: true,
      appId: '2MgoJb7PsBdDJavPcPPU3oO2-gzGzoHsz',
      appKey: 'mF1z8VJ3jMiohj3Q2S4b7yB6',
    },
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
    }
  },
})
