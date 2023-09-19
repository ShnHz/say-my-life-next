export default {
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
    {
      text: '小工具',
      collapsable: false,
      items: [
        {
          text: '边框圆角生成器',
          link: '/views/notes/tools/Fancyborderradius.md',
        },
        {
          text: '三角形生成器',
          link: '/views/notes/tools/SanJiaoXingXiaoGongJu.md',
        },
        // {
        //   text: '小于12px的文字生成器',
        //   link: '/views/notes/tools/XiaoYu12pxDeWenZiShengChengQi.md',
        // },
        // {
        //   text: '常用正则表达式工具',
        //   link: '/views/notes/tools/ChangYongZhengZeBiaoDaShiGongJu.md',
        // },
        // process.env.NODE_ENV == 'development'
        //   ? {
        //       text: '大文件上传和断点续存',
        //       link: '/views/notes/tools/BigFileUploadAndResume.md',
        //     }
        //   : null,
        // process.env.NODE_ENV == 'development'
        //   ? {
        //       text: '长安幻想答题搜索器',
        //       link: '/views/notes/tools/CAHXQuestion.md',
        //     }
        //   : null,
      ],
    },
    {
      text: 'JavaScript',
      collapsable: false,
      items: [
        {
          text: 'Object 对象',
          link: '/views/notes/js/Object',
        },
        {
          text: 'Array 数组',
          link: '/views/notes/js/Array',
        },
        {
          text: 'Date 日期处理',
          link: '/views/notes/js/Date',
        },
        {
          text: 'String 字符串',
          link: '/views/notes/js/String',
        },
        {
          text: 'BinaryTree 二叉树',
          link: '/views/notes/js/BinaryTree',
        },
        {
          text: 'Promise 同步',
          link: '/views/notes/js/Promise',
        },
        {
          text: 'Sort 排序',
          link: '/views/notes/js/Sort',
        },
      ],
    },
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
    {
      text: 'Vue2',
      collapsable: false,
      items: [
        {
          text: 'Axios 常用配置',
          link: '/views/notes/vue/Axios',
        },
        {
          text: 'Nprogress 页面顶部加载条',
          link: '/views/notes/vue/Nprogress',
        },
        {
          text: 'Interval 定时器',
          link: '/views/notes/vue/Interval',
        },
        {
          text: 'Rem 适配',
          link: '/views/notes/vue/Rem',
        },
        {
          text: 'Router 路由',
          link: '/views/notes/vue/Router',
        },
        {
          text: 'Sass 在vue中使用',
          link: '/views/notes/vue/Sass',
        },
        {
          text: 'Title 动态title',
          link: '/views/notes/vue/Title',
        },
        {
          text: 'Vue 全局组件',
          link: '/views/notes/vue/GlobalComponents',
        },
        {
          text: 'VueLazyload 使用方法',
          link: '/views/notes/vue/VueLazyload',
        },
        {
          text: 'vueProgressiveImage 使用方法',
          link: '/views/notes/vue/vueProgressiveImage',
        },
      ],
    },
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
  '/views/travel/': [
    {
      text: '总览',
      link: '/views/travel/Overview',
    },
    {
      text: '地图',
      link: '/views/travel/Map',
    },
    {
      text: '日历',
      link: '/views/travel/Calendar',
    },
    // {
    //   text: '计划',
    //   collapsable: false,
    //   items: [
    //     {
    //       text: '广州-佛山-潮汕',
    //       link: '/views/travel/plan/20230201.20230206',
    //     },
    //   ],
    // },
  ],
  '/views/life/': [
    {
      text: '动漫',
      link: '/views/life/Anime',
    },
    {
      text: '码农的童年',
      link: '/views/life/My3d',
    },
  ],
}
