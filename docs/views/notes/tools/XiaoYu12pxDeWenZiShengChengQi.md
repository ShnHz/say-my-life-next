---
title: 小于12px的文字生成器
date: 2022/11/29 14:56:44
summary: 众所周知，谷歌浏览器上显示字体最小为12px，那么如何显示更小的字体呢
config: {
    top: false,
    dir: false,
    dirTag: ["h3","h4","h5"],
    tag: ["css","tool"],
    valine: true,
    valineId: 
}
password: false
---

::: tip
使用->svg<-作为解决方案

+ 为什么不用 ->transform: scale()<- ？ 设置后占位区域并没有改变，难以调节对齐方式。
+ 为什么不用 ->canvas<- ？ 无法选中文字（也可以解决，但不如 svg 简洁）
:::

<views-tools-XiaoYu12pxDeWenZiShengChengQi />