---
title: CSS 特殊属性值
outline: [3, 5]
---

### inherit

->inherit<- 关键字使得元素获取其父元素的计算值。它可以应用于任何 <code>CSS</code> 属性，包括 <code>CSS</code> 简写 <code>all</code>。

对于继承属性，->inherit<- 关键字只是增强了属性的默认行为，通常只在覆盖原有的值的时候使用。

继承始终来自文档树中的父元素，即使父元素不是包含块。

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)

### initial

CSS 关键字 ->initial<- 将属性的初始（或默认）值应用于元素。不应将初始值与浏览器样式表指定的值混淆。它可以应用于任何 <code>CSS</code> 属性，包括 <code>CSS</code> 简写 <code>all</code>，->initial<- 可用于将所有 <code>CSS</code> 属性恢复到其初始状态。

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)

### unset

CSS 关键字 ->unset<- 可以分为两种情况，如果这个属性本来有从父级继承的值（这个属性默认可以继承，且父级有定义），则将该属性重新设置为继承的值，如果没有继承父级样式，则将该属性重新设置为初始值。换句话说，在第一种情况下（继承属性）它的行为类似于->inherit<- ，在第二种情况下（非继承属性）类似于->initial<-。它可以应用于任何 <code>CSS</code> 属性，包括 <code>CSS</code> 简写 <code>all</code> 。

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)

### revert

属性应用了该值后，将还原到具有由浏览器或用户创建的自定义样式表（在浏览器侧设置）设置的值

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)
