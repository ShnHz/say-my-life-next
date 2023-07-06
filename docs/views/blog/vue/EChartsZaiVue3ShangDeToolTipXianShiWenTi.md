---
title: ECharts在Vue3上的ToolTip显示问题
date: 2023/07/06 16:44:46
summary:
config:
  {
    show: true,
    top: false,
    dir: true,
    dirTag: ['h3', 'h4', 'h5'],
    tag: ['vue'],
    valine: true,
    valineId,
  }
password: false
outline: [3, 5]
---

#### 触发原因

直奔主题，在 ->vue3<- 下使用 ->echarts<-，如果将 ->echarts<- 实例包装成相应式对象（也就是 ->ref<- 和 ->reactive<-），这会导致一些莫名奇妙的 bug，控制台不会有任何报错，但是会不显示 ->tooltip<-

#### 解决方案

可以用 ->shallowRef<- 或者 ->普通变量<-
