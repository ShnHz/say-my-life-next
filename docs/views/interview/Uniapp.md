---
title: uni-app
config : {
    dir : true
}
password: true
---

#### 1.uni-app是什么？

是一个使用 ->Vue.js<- 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台的跨平台工具

#### 2.uni-app的原理是什么？

条件编译

#### 3.关于uni-app的ui库、ui框架、ui组件

->uni-app<-是有内置组件的，不像常规的web开发一样需要去套用第三方ui组件库，但->uni-app<-体系不是这样，内置组件就是为手机优化的。

但内置组件只能满足基础需求，更多场景，需要扩展组件。扩展组件是基于内置组件的二次封装，从性能上来讲，扩展组件的性能略低于内置组件，所以开发者切勿抛弃内置组件，直接全套用三方UI组件库。

众多扩展组件如何选择？组件分2大类：

+ 1、vue组件（文件后缀为vue）
+ 2、小程序自定义组件（文件后缀为wxml或其他小程序平台特有后缀名称）

<img src="https://cdn.chenyingshuang.cn/interview/uni-app/1.jpg" />

#### 4.uni-app 全局变量

用->vuex<-或者->globalData<-