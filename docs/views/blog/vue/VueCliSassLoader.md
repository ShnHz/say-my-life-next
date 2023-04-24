---
date: 2020/12/09 11:12:56 
config: {
    top: false,
    dir: false,
    tag: ['vue','css'],
    valine: true,
    valineId: /blog/vue/VueCliSassLoader.html
}
title : vue-cli中使用sass-loader的坑
---
#### Vue-cli3 中引入sass全局变量的方法

Vue-cli官网上的说明

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/variables.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/variables.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
```

但是根据sass-loader的版本不同，对应的键名也是不同的

```js
sass-loader v8-，这个选项名是 "data"
sass-loader v8 中，这个选项名是 "prependData"
sass-loader v10+，这个选项名是 "additionalData"
```
