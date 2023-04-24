---
title: CSS
config : {
    dir : true
}
password: true
---

### CSS

#### 1.说一说样式优先级是怎么样的？

!important -> 行内样式 -> id选择器 -> 类选择器 -> 属性选择器 -> 伪类选择器 -> 标签选择器 -> 伪元素选择器 -> 兄弟选择器 -> 子选择器 -> 后代选择器 -> 通配符

选择器 | 权重 | 示例
--- | --- | ---
!important | 10000 | 
行内样式 | 1000 | 
id选择器 | 100 | #id
类选择器 | 10  | .class
属性选择器 | 10 | div[shuxing]
伪类选择器 | 10 | :hover
标签选择器 | 1 | div
伪元素选择器 | 1 | :before
兄弟选择器 | 0 | ~
子选择器 | 0 | >
后代选择器 | 0 | div p 
相邻选择器 | 0 | +
通配符 | 0 | *

#### 2.垂直水平居中有几种方法
+ <code>display:flex;align-items:center;justify-content:center;</code>，不用知道元素宽高
+ <code>display:grid;</code>，子元素<code>align-self:center;justify-self:center;</code>，不用知道元素宽高
+ <code>left:50%;top:50%;transform: translate(-50%, -50%);</code>，不用知道元素宽高
+ <code>left:50%;top:50%;margin-top:-元素高度/2;margin-left:-元素宽度/2;</code>，需要知道元素宽高
+ <code>line-height:元素高度;text-align:center;</code>，需要知道元素高度，且只对行内元素/行内块元素/文字生效

#### 3.css 实现高度是宽度一半的盒子，可以等比例变化
利用<code>padding-bottom</code>我们就可以实现一个宽高比例固定的元素

```html
<div class="wrapper">
  <div class="intrinsic-aspect-ratio-container"></div>
</div>
```

```css
.wrapper {
  width: 40vw;
}
.intrinsic-aspect-ratio-container {
  width: 100%;
  height: 0;
  padding: 0;
  padding-bottom: 50%;
  margin: 50px;
  background-color: lightsalmon;
}
```
#### 4.怪异盒模型和标准盒模型的区别?
如何设置盒模型的类型呢，使用<code>box-sizing</code>

w3c盒模型（标准盒模型）,当值为<code>border-box</code>时：
+ 元素的width包含了content/border/padding

IE盒模型（怪异盒模型）,当值为<code>content-box</code>时：
+ 元素的width只包含content

#### 5.常见的CSS布局单位？

+ px 像素
+ % 百分比
+ vw vh 根据浏览器的宽度以及高度（0-100）
+ rem em，rem根据根元素的font-size来作为基准值，em根据父元素的font-size来作为基准值

#### 6.link和@import的区别？

+ link是html标签，可以通过js来控制dom修改样式，@import是纯css的范畴
+ link在网页加载时同步进行加载，@import要在网页加载完成后开始加载
+ link没有兼容性问题，@import需要高版本的浏览器才可以兼容

#### 7.flex的属性有哪些？

此属性是以下 CSS 属性的简写：

+ flex-grow 这个属性规定了该项在 flex 容器中分配剩余空间的相对比例
+ flex-shrink 属性指定了 flex 元素的收缩规则，在flex 元素的默认宽度之和大于容器的宽度时候，元素会发生收缩，其收缩的大小的依据是 flex-shrink 值
+ flex-basis 指定了 flex 元素在主轴方向上的初始大小

#### 8.如果flex:1，元素长度超出的话，会表现为什么样的状态？

会将剩余的flex空间全部使用，收缩空间

#### 9.如果三个flex:1，但是内容宽度都不一样，会呈现什么样的状态？

收缩空间

#### 10.css是什么时候会开启硬件加速的？

检测到某个DOM元素可能会从中获益的时候才会应用硬件加速

+ 3D transform
+ opacity
+ video
+ canvas
+ will-change

会增加内存消耗，消耗更多电量

#### 11.css开启硬件加速的原理

浏览器首先将页面解析成DOM树，DOM树和CSS让浏览器构建渲染树，渲染树包括渲染对象。每个渲染对象会被分配到一个图层中，每个图层会被更新到GPU中，

由于GPU中的transform等CSS属性不触发回流，单独处理，所以能大大提高网页的性能。

#### 12.主题切换怎么实现

+ css变量
+ 类名切换

### BFC

#### 1.说一说BFC？

BFC中文名叫块格式化上下文，通俗的理解就是一个布局容器，内部的样式不会影响到外部样式。

#### 2.如何开启BFC？

+ position:fixed|absoulte;
+ display:inline-block|flex|table-cell;
+ float:除了none;
+ overflow:除了none;

#### 3.BFC的作用？

+ 解决margin的重叠问题
+ 解决高度塌陷问题
+ 创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。（原理是BFC的区域不会与浮动元素发生重叠）

### 浮动
#### 1.浮动元素引起的问题？

会造成高度塌陷，影响布局

#### 2.如何清除浮动？

+ 利用<code>BFC</code>，设置父元素的<code>overflow</code>不为<code>none</code>，设置父元素的<code>position</code>为<code>absolute/fixed</code>，设置父元素的<code>display/float</code>
+ 设置父元素<code>after伪元素</code>清除浮动
+ 添加一个块级兄弟元素放在最后面，设置<code>clear:both</code>

#### 3.浮动的工作原理

浮动元素会脱离文档流，不占据空间，会根据<code>float</code>的值向左或向右移动，直到它的外边界碰到父元素的内边界或另一个元素的外边界为止。

### scss

#### 1.scss用过哪些功能

+ 嵌套语法
+ for循环
+ 变量
+ &父选择器
+ 混合器