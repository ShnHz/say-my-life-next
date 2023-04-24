---
title: CSS属性值的计算过程
date: 2022/12/06 11:56:29
summary: 首先css的属性值，是从0到1的过程，浏览器会等一个标签的css属性值全部确认后，才能渲染出来。
config: {
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["css"],
    valine: true,
    valineId: 
}
password: false
---

css属性其实并不是你开发者写了哪些属性就有哪些属性的

### 确定声明值

首先，浏览器会有一个**默认样式表**，以及作者写的**作者样式表**，找到->没有冲突<-的样式，直接作为计算后的样式，当遇到冲突时，使用层叠解决

### 层叠（权重计算）

层叠的概念其实是和吃鸡一样，杀到最后一个吃鸡的样式，就会作为这个属性的样式

层叠规则：
+ 1.比较重要性
+ 2.比较特殊性
+ 3.比较源次序

#### 比较重要性

重要性从高到低：

+ 1.带有->!important<-的作者样式
+ 2.带有->!important<-的默认样式
+ 3.作者样式
+ 4.默认样式

#### 比较特殊性

比较的目标是**作者样式**

特殊性看选择器，选择器选中范围越窄，特殊性越强

具体规则：根据选择器，计算一个 4 位数的权重

1）千位：如果是内联样式，千位为 1，否则为 0

2）百位：等于选择器中所有 id 选择器的数量

3）十位：等于选择器中所有类选择器、属性选择器、伪类选择器的数量

4）个位：等于选择器中所有元素选择器、伪元素选择器的数量

例如：

```css
.color{
    /* 这个选择器的特殊性为 0 0 1 0 */
    color:red;
}
div{
    /* 这个选择器的特殊性为 0 0 0 1 */
    color:red;
}
div.color #id{
    /* 这个选择器的特殊性为 0 1 1 1 */
    color:red;
}
```

->VSCode<-其实就为我们提供了方便查看特殊性的功能，鼠标移动到选择器上，会出现一个悬浮框，上面就显示了所选选择器的特殊性

<img src="https://cdn.chenyingshuang.cn/blog/css/CSSShuXingZhiDeJiSuanGuoCheng/1.png" />

#### 比较源次序

比较代码的书写位置，后面的覆盖前面的

### 继承

对**仍然没有值**的属性，若**可以继承**则使用继承

#### 哪些属性是可以继承的？

文本

+ color(颜色，a元素除外)
+ direction(方向)
+ font（字体）
+ font-family（字体系列）
+ font-size（字体大小）
+ font-style（用于设置斜体）
+ font-variant（用于设置小型大写字母）
+ font-weight（用于设置粗体）
+ letter-spacing（字母间距）
+ line-height（行高）
+ text-align（用于设置对齐方式）
+ text-indent（用于设置首航缩进）
+ text-transform（用于修改大小写）
+ white-space（用于指定如何处理空格）
+ word-spacing（字间距）

列表

+ list-style（列表样式）
+ list-style-image（用于为列表指定定制的标记）
+ list-style-position（用于确定列表标记的位置）
+ list-style-type（用于设置列表的标记）

表格

+ border-collapse（用于控制表格相邻单元格的边框是否合并为单一边框）
+ border-spacing（用于指定表格边框之间的空隙大小）
+ caption-side（用于设置表格标题的位置）
+ empty-cells（用于设置是否显示表格中的空单元格）

页面设置（对于印刷物）

+ orphans（用于设置当元素内部发生分页时在页面底部需要保留的最少行数）
+ page-break-inside（用于设置元素内部的分页方式）
+ widows（用于设置当元素内部发生分也是在页面顶部需要保留的最少行数）

其他

+ cursor（鼠标指针）
+ quotes（用于指定引号样式）
+ visibility（可见性）

#### 哪些属性是不可以继承的？

文本

+ vertical-align（垂直文本对齐）  
+ text-decoration（规定添加到文本的装饰）        
+ text-shadow（文本阴影效果）       
+ white-space（空白符的处理）        
+ unicode-bidi（设置文本的方向）

盒子模型
+ display、width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left

背景

+ background、background-color、background-image、background-repeat、background-position、background-attachment

定位

+ float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

生成内容

+ content、counter-reset、counter-increment

轮廓样式

+ outline-style、outline-width、outline-color、outline

页面样式

+ size、page-break-before、page-break-after

声音样式

+ pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

### 使用默认值

如果经过了以上三步，属性值依然为空，则使用浏览器对该属性的默认值