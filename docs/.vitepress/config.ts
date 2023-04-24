import { defineConfig } from 'vitepress'

console.log(process.env.NODE_ENV)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '野宁新之助',
  description: 'Think twice before you do.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/views/Guide/' },
      { text: '标签', link: '/views/Tag/' },
      { text: '笔记', link: '/views/notes/Web' },
      { text: '面试', link: '/views/interview/Question' },
      { text: '生活', link: '/views/life/game/GTA5' },
      { text: '旅程', link: '/views/travel/Map' },
      { text: '友链', link: '/views/Friend' },
    ],
    sidebar: {
      '/views/notes/': [
        {
          text: '书签',
          link: '/views/notes/Web',
        },
        {
          text: 'Chrome',
          link: '/views/notes/Chrome',
        },
        {
          text: 'VsCode',
          link: '/views/notes/VsCode',
        },
        // {
        //   text: '小工具',
        //   collapsable: false,
        //   items: [
        //     {
        //       text: '边框圆角生成器',
        //       link: '/views/notes/tools/Fancyborderradius.md',
        //     },
        //     {
        //       text: '三角形生成器',
        //       link: '/views/notes/tools/SanJiaoXingXiaoGongJu.md',
        //     },
        //     {
        //       text: '小于12px的文字生成器',
        //       link: '/views/notes/tools/XiaoYu12pxDeWenZiShengChengQi.md',
        //     },
        //     {
        //       text: '常用正则表达式工具',
        //       link: '/views/notes/tools/ChangYongZhengZeBiaoDaShiGongJu.md',
        //     },
        //     process.env.NODE_ENV == 'development'
        //       ? {
        //           text: '大文件上传和断点续存',
        //           link: '/views/notes/tools/BigFileUploadAndResume.md',
        //         }
        //       : null,
        //     process.env.NODE_ENV == 'development'
        //       ? {
        //           text: '长安幻想答题搜索器',
        //           link: '/views/notes/tools/CAHXQuestion.md',
        //         }
        //       : null,
        //   ],
        // },
        // {
        //   text: 'JavaScript',
        //   collapsable: false,
        //   items: [
        //     {
        //       text: 'Object 对象',
        //       link: '/views/notes/js/Object',
        //     },
        //     {
        //       text: 'Array 数组',
        //       link: '/views/notes/js/Array',
        //     },
        //     {
        //       text: 'Date 日期处理',
        //       link: '/views/notes/js/Date',
        //     },
        //     {
        //       text: 'String 字符串',
        //       link: '/views/notes/js/String',
        //     },
        //     {
        //       text: 'BinaryTree 二叉树',
        //       link: '/views/notes/js/BinaryTree',
        //     },
        //     {
        //       text: 'Promise 同步',
        //       link: '/views/notes/js/Promise',
        //     },
        //     {
        //       text: 'Sort 排序',
        //       link: '/views/notes/js/Sort',
        //     },
        //   ],
        // },
        {
          text: 'CSS',
          collapsable: false,
          items: [
            {
              text: 'CSS 特殊属性值',
              link: '/views/notes/css/CssSpecialAttributes',
            },
            {
              text: 'Class 常用Class',
              link: '/views/notes/css/Class',
            },
            {
              text: 'Color 常用色彩',
              link: '/views/notes/css/Color',
            },
            {
              text: 'Shadow 投影',
              link: '/views/notes/css/Shadow',
            },
            {
              text: 'Scss css预编译器',
              link: '/views/notes/css/Scss',
            },
          ],
        },
        // {
        //   text: 'Vue',
        //   collapsable: false,
        //   items: [
        //     '/views/notes/vue/Axios',
        //     '/views/notes/vue/Nprogress',
        //     '/views/notes/vue/Interval',
        //     '/views/notes/vue/Rem',
        //     '/views/notes/vue/Router',
        //     '/views/notes/vue/Sass',
        //     '/views/notes/vue/Title',
        //     '/views/notes/vue/GlobalComponents', //vue 全局组件
        //     '/views/notes/vue/VueLazyload',
        //     '/views/notes/vue/vueProgressiveImage',
        //   ],
        // },
        // {
        //   text: '动画',
        //   collapsable: false,
        //   items: [
        //     '/views/notes/animation/ComponentButton',
        //     '/views/notes/animation/ComponentTabbar',
        //     '/views/notes/animation/CoolSquare',
        //     '/views/notes/animation/Face',
        //     '/views/notes/animation/Mountain',
        //     '/views/notes/animation/Pikachu',
        //     '/views/notes/animation/ShapesColor',
        //     '/views/notes/animation/XRay',
        //     '/views/notes/animation/ParticleText',
        //     '/views/notes/animation/PulsatingPlanet',
        //     // '/views/notes/animation/PokemonCards',
        //   ],
        // },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/ShnHz' }],
  },
  vite: {
    plugins: [],
    server: {
      host: '0.0.0.0',
    },
  },
})
