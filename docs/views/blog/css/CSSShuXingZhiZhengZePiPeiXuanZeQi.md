---
title: CSS属性值正则匹配选择器
date: 2022/12/01 20:54:02
summary: 原来css选择器也能正则，一直不知道，一看全找到
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

### css选择器

先来复习一下CSS选择器都有哪些吧，简单列个表格，选择器也是有优先级的

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

#### 伪类选择器

##### 标记状态的伪类
+ ->:link<- 选取未访问过的超链接
+ ->:visited<- 选取访问过的连接
+ ->:hover<- 选取鼠标悬浮的元素
+ ->:active<- 选取点中的元素
+ ->:focus<- 选取获取焦点的元素

##### 筛选功能的伪类
+ ->:empty<- 选取没有子元素的元素
+ ->:checked<- 选取勾选状态下的input 元素  只对 radio 和checkbox 有效
+ ->:disabled<- 选取禁用的表单元素
+ ->:first-child<- 选取当前选择器下的第一个元素
+ ->:last-child<- 选取当前选择器下的最后一个元素
+ ->:nth-child(an+b)<- 选取指定位置的元素,参数支持an+b的形势.比如 li:nth(2n+1),就可以选取li元素序号是2的整数倍+1的所有元素,也就是1,3,5,7,9序号的li元素
+ ->:nth-last-child(an+b)<- 和上面类似,不过从后面选取.
+ ->:only-child<- 选取元素唯一的子元素,如果元素的父元素只有它一个子元素就会生效,如果还有其他的兄弟元素,则不生效
+ ->:only-of-type<- 选取唯一的某个元素类型。如果元素的父元素只有它一个当前类型的子元素就会生效。

#### 伪元素选择器

伪元素选择器是用来香元素设置某种特殊效果，伪元素选择器并不是真实的DOM元素，所以称之伪元素，常用的如下:

+ ->::first-line<- 为元素的第一行使用样式
+ ->::first-letter<- 为某个元素的首字母或第一个文字使用样式
+ ->::before<- 在某个元素之前插入内容
+ ->::after<- 在某个元素之后插入内容
+ ->::selection<- 对光标选中的元素添加样式

::: tip
1.伪元素构造的元素是虚拟的,所以不能使用js去操作

2.first-line和first-letter不使用于内联样式,在内联样式中都会失效

3.如果同时使用了 before 和 first-letter. 第一个内容要从 before 中算起,如果 before 中第一个为非文本内容,那 first-letter 也会作用到这个非文本内容上,但不会生效。

4.在CSS3 中规定, 伪类用一个冒号 ->:<- 表示, 伪元素用两个冒号 ->::<- 来表示
:::

### css选择器的正则

好了，接下来进入主题，讲一讲css选择器的正则是如何使用的

::: tip CSS属性选择器的发展目前分为3个阶段
CSS2.1属性选择器
+ 直接匹配：->[attr], [attr="val"], [attr~="val"], [attr|="bar"]<-

CSS3属性选择器
+ 正则匹配：->[foo^="bar"], [foo$="bar"], [foo*="bar"]<-

CSS4属性选择器
+ 忽略大小写匹配：->[attr="val" i]<-

其中，后面两个阶段都属于正则匹配阶段，随着CSS的发展，更复杂的正则匹配应该会出现，我们可以拭目以待。
:::

#### CSS2.1属性选择器

###### [attr]

只要元素有'attr'这个属性就可以

```css
[class]{
    /* 只要有class属性 */
}
```

###### [attr="val"]

元素的属性名是'attr'值必须是'val'

```css
[class="this-class"]{
    /* 有class属性且class=this-class */
}
```

###### [attr~="val"]

'attr'值需含有单词'val'，注意这里的措辞是“单词”而不是字符，CSS是老外发明的，老外的的母语是English, English的句子都是一个单词+空格+一个单词实现的

在CSS2.1的时候，CSS对其他国家的语言的考量还没有那么深入。因此，像这里这种匹配“单词”的用法只对ASCII范围的字符有用。对于中文，哪怕你在中文中间打个空格，假装成“单词”，也是没用的

```css
[class~="btn"]{
    /* 
        有class属性且包含单词btn，例如
        class="btn error"
        class="btn success"
        class="btn-warning" × 这样子匹配不到
    */
}

[class~="中文"]{
    /* 
        class="中文 btn" × 这样子匹配不到
    */
}
```

###### [attr|="val"]

'attr'属性值开头必须是'val'的单词，或者开头是'val-'。同样的，是“单词”，不是“字符”

```css
[class|="btn"]{
    /* 
        有class属性且单词btn开头，例如
        class="btn-error"
        class="btn-success"
        class="btn-warning"
    */
}
```

#### CSS3属性选择器

###### [attr^="val"]

值开头三个字符需要是'val'

```css
[class^="btn"]{
    /* 
        有class属性且字符btn开头，例如
        class="btn-error"
        class="btn-success"
        class="btn-warning"
    */
}
```

###### [attr$="val"]

值结尾三个字符需要是'val'

```css
[class$="btn"]{
    /* 
        有class属性且字符btn结尾，例如
        class="error-btn"
        class="success-btn"
        class="warning-btn"
        class="a-btn b c" × 这样子匹配不到
    */
}
```

###### [attr*="val"]

值任意位置包含'val'

```css
[class*="btn"]{
    /* 
        有class属性且包含字符btn，例如
        class="success-btn"
        class="a btn b"
        class="a-btn b c"
        class="b t n" × 这样子匹配不到
    */
}
```

#### CSS4属性选择器

###### [attr operator value i]

例如：->[attr~="val" i], [attr*="val" I]<- 等都是合法的写法。其中，i也可以使用大写I。

就和正则表达式中的i作用一样，忽略大小写，由于类似中文这样的语言并没有大小写的概念，因此，此特性也只对ASCII范围的字符。

```css
[data-index*="btn"]{
    /* 
        有data-index（大小写都行）属性且包含字符btn（大小写都行），例如
        data-index="btn-error"
        data-index="BTN-success"
        data-index="BTn-warning"
        dAtA-INDEX="BTN"
    */
}
```