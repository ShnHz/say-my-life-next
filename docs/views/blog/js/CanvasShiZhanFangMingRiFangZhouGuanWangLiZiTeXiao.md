---
title: Canvas实战-仿明日方舟官网粒子特效
date: 2023/03/14 13:03:03
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["css","js"],
    valine: true,
    valineId: 
}
password: false
---

<blog-js-CanvasRhodesIsland />

### 前言

先来看看官网的效果 [传送门](https://ak.hypergryph.com/#world)

很明显使用了 ->canvas2d<- 中的 **像素操作**


### 实现

首先分析这个动画效果是如何实现的，我们可以简单分为三个步骤：

+ 01.解析图片转换为粒子
+ 02.绘制时添加动画
+ 03.根据鼠标位置对粒子进行排斥

解析图片通过->Canvas<-的->getImageData<-获取像素数据实现。

较难点在于 **绘制动画** 和 **粒子排斥**，涉及到 ->数学应用 和 动画/交互逻辑<-。

我们这边简单说一下 **粒子排斥** 的一个数学算法（也可能是最难的一部分），其余具体的实现可以看 [原文](https://juejin.cn/post/7160491044222533639)

#### 粒子排斥

明显观察到画布会**以鼠标为中心对粒子进行一定范围的排斥**，越接近中心排斥的速度越快。

我们可以向->particle<-对象的->update<-方法中传入鼠标在->canvas<-画布中的位置->mouseX, mouseY<-。

并结合粒子当前位置->(x, y)<- 和 排斥力度->Inten<- 重新计算移动速度->vx、vy<-。由此使粒子不断远离中心。

##### 设计方案

+ 01.设置固定值 ->Radius<-(斥力影响范围)、->Inten<-(斥力标准值)。
+ 02.设置鼠标位置 ->(mouseX, mouseY)<- 为斥力中心。
+ 03.计算每个粒子与中心的 直线距离->distance<-。
+ 04.通过 ->Radius / distance<- 获得 中心影响范围 与 直线距离 的比例->disPercent<-。**比例越大越接近中心，受到的斥力也越大**
+ 05.将粒子与中心形成的 ->夹角angle<-、->比例disPercent<-和->斥力值Inten<-，转换为粒子x、y轴的速度->repX、repY<-。
+ 06.->vx += repX & vy += repY<-，粒子逐渐远离中心。

### 参考资料

###### [Canvas实战】仿明日方舟Logo粒子动画 vue3+ts](https://juejin.cn/post/7160491044222533639)
