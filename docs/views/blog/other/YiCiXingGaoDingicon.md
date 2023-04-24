---
title: Icon工具网站汇总
date: 2022/12/18 19:32:48
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["css","tool"],
    valine: true,
    valineId: 
}
password: false
---

<other-TheIconAnimation />

### 什么是 IconFont

顾名思义，->IconFont<- 就是字体图标。严格地说，就是一种字体，但是，它们不包含字母或数字，而是包含符号和字形。您可以使用 CSS 设置样式，就像设置常规文本一样，这使得 ->IconFont<- 成为 Web 开发时图标的热门选择。

### IconFont 的优缺点

#### 优点

+ 可以方便地将任何 CSS 效果应用于它们。
+ 因为它们是矢量图形，所以它们是可伸缩的。这意味着我们可以在不降低质量的情况下伸缩它们。
+ 我们只需要发送一个或少量 HTTP 请求来加载它们，而不是像图片，可能需要多个 HTTP 请求。
+ 由于尺寸小，它们加载速度快。
+ 它们在所有浏览器中都得到支持（甚至支持到 IE6）。

#### 缺点

+ 不能用来显示复杂图像
+ 通常只限于一种颜色，除非应用一些 CSS 技巧
+ 字体图标通常是根据特定的网格设计的，例如 16x16, 32×32, 48×48等。如果由于某种原因将网格系统改为25×25，可能不会得到清晰的结果

还有一个缺点，大家写代码的时候有没有发现，即使设置了->vertical-align<-居中或者->line-height<-，但是图标还是和文字对不齐，那是因为中文、英文大小写的高度是不一致的而且英文字母里边有->y,j<-这种特殊字符，高度都是不一样的，所以图标与文字的对齐中线是->y,j<-字符，这就会导致我们在视觉上看中文汉字其实是偏上的，就会有没对齐的感觉。

<img src="https://cdn.chenyingshuang.cn/blog/other/YiCiXingGaoDingicon/1.png" />

我们可以设置->vertical-align<-为->-0.15em<-来解决这个问题

```css
i{
    width:1em;
    height:1em;
    vertical-align:-0.15em;   
}
```

### icon工具

#### iconfont

[iconfont](https://www.iconfont.cn/home/index)

这个网站大家应该都很熟悉了，有图标库、插画库、字体库等等

使用方法也很简单，可以看官方的[帮助](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code)

#### iconpack

[iconpack](https://iconpark.oceanengine.com/home)

->IconPark<- 图标库是一个通过技术驱动矢量图标样式的图标库产品，可以实现根据单一->SVG<-源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景;
致力于构建高质量、统一化、可定义的图标资源，让大多数设计师都能够选择适合自己的风格图标，并支持把图标源文件导出为
->React、Vue2、Vue3、SVG<-多种形式的组件代码，打通 Desian to Code 链路，实现产品、研发、设计
师一站式对接，使用更高效，具备一项发明专利。

资源的数量可能不如->iconfont<-，但是使用便捷性个人认为还是挺强的

#### Font Awesome

[fontawesome](https://fontawesome.dashgame.com/)

一套绝佳的图标字体库和CSS框架，自由度没有前两个网站高，但是胜在方便简洁

#### Iconify

->Iconify<-支持100多个图标集，上万种图标可随意使用，你能想到的他都有，->Iconify<-是->SVG<-图标，不是字体图标，所以你也可以结合->elementui-plus<-使用。