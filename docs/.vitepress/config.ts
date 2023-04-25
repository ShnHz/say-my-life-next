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
