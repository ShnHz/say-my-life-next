import path from 'path'
import { fileURLToPath, URL } from 'node:url'

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
    // 锁定页面默认密码，请使用MD5，4位数MD5加密后的密码
    password: '81dc9bdb52d04dc20036dbd8313ed055',
  },
  vite: {
    plugins: [],
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, '../../'),
        },
        {
          find: '@docs',
          replacement: path.resolve(__dirname, '../'),
        },
        {
          find: /^.*\/VPDoc\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/layout/VPDoc.vue', import.meta.url)
          ),
        },
      ],
    },
    rollupOptions: {
      output: {
        manualChunks(id: any, { getModuleInfo }) {
          const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
          const cssLangRE = new RegExp(cssLangs)
          const isCSSRequest = (request: string): boolean =>
            cssLangRE.test(request)
          // 分vendor包
          if (
            id.includes('node_modules') &&
            !isCSSRequest(id) &&
            staticImportedByEntry(id, getModuleInfo, cache.cache)
          ) {
            return 'vendor'
          } else if (
            // 分manifest包，解决chunk碎片问题
            getModuleInfo(id).importers.length +
              getModuleInfo(id).dynamicImporters.length >
              1 &&
            id.includes('src')
          ) {
            return 'manifest'
          }
        },
      },
    },
  },
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('./plugins/extends-markdown/markdown-it-code-default'))
    },
  },
})
