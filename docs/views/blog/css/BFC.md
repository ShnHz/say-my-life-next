---
date: 2022/11/13 13:59:56 
config: {
    top: false,
    dir: true,
    tag: ['css','info'],
    valine: true,
    valineId: /blog/css/BFC.html
}
title : 面试官：请说说什么是BFC？
---
###### 原文 [掘金](https://juejin.cn/post/6950082193632788493)

### BFC到底是什么东西

<code class="default">BFC</code> 全称：<code class="default">Block Formatting Context</code>， 名为 "块级格式化上下文"。

<code class="default">W3C</code>官方解释为：<code class="default">BFC</code>它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，<code class="default">Block Formatting Context</code>提供了一个环境，<code class="default">HTML</code>在这个环境中按照一定的规则进行布局。

简单来说就是，<code class="default">BFC</code>是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用<code class="default">BFC</code>呢，<code class="default">BFC</code>可以看做是一个<code class="default">CSS</code>元素属性

### 怎么触发BFC

+ position:fixed|absoulte;
+ display:inline-block|flex|table-cell;
+ float:除了none;
+ overflow:除了none;

这些属性都可以开启<code class="default">BFC</code>

### BFC的规则

+ <code class="default">BFC</code>就是一个块级元素，块级元素会在垂直方向一个接一个的排列
+ <code class="default">BFC</code>就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
+ 垂直方向的距离由<code class="default">margin</code>决定， 属于同一个<code class="default">BFC</code>的两个相邻的标签外边距会发生重叠
+ 计算<code class="default">BFC</code>的高度时，浮动元素也参与计算

### BFC可以解决什么问题？

#### 1.使用Float脱离文档流，高度塌陷
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高度塌陷</title>
    <style>
        .box {
            margin: 100px;
            width: 100px;
            height: 100px;
            background: red;
            float: left;
        }
        .container {
            background: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>
```

***效果：***

<img src="https://cdn.chenyingshuang.cn/blog/css/BFC/1.jpg" />

可以看到上面效果给<code class="default">box</code>设置完<code class="default">float</code>结果脱离文档流，使<code class="default">container</code>高度没有被撑开，从而背景颜色没有颜色出来，解决此问题可以给<code class="default">container</code>触发<code class="default">BFC</code>，上面我们所说到的触发<code class="default">BFC</code>属性都可以设置。

***修改代码***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高度塌陷</title>
    <style>
        .box {
            margin: 100px;
            width: 100px;
            height: 100px;
            background: red;
            float: left;
        }
        .container {
            background: #000;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>
```

***效果：***

<img src="https://cdn.chenyingshuang.cn/blog/css/BFC/2.jpg" />

#### 2.Margin边距重叠

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            margin: 10px;
            width: 100px;
            height: 100px;
            background: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>
```

***效果：***

<img src="https://cdn.chenyingshuang.cn/blog/css/BFC/3.jpg" />

可以看到上面我们为两个盒子的<code class="default">margin</code>外边距设置的是<code class="default">10px</code>，可结果显示两个盒子之间只有<code class="default">10px</code>的距离，这就导致了<code class="default">margin</code>塌陷问题，这时<code class="default">margin</code>边距的结果为最大值，而不是合，为了解决此问题可以使用<code class="default">BFC</code>规则（为元素包裹一个盒子形成一个完全独立的空间，做到里面元素不受外面布局影响），或者简单粗暴方法一个设置<code class="default">margin</code>，一个设置<code class="default">padding</code>。

***修改代码***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Margin边距重叠</title>
    <style>
        .box {
            margin: 10px;
            width: 100px;
            height: 100px;
            background: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <p><div class="box"></div></p>
    </div>
</body>
</html>
```

***效果：***


<img src="https://cdn.chenyingshuang.cn/blog/css/BFC/4.jpg" />

#### 3.两栏布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>两栏布局</title>
    <style>
            div {
                 width: 200px;
                 height: 100px;
                 border: 1px solid red;
            }

    </style>
</head>
<body>
    <div style="float: left;">
        两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局
    </div>
    <div style="width: 300px;">
        我是蛙人，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭
    </div>
</body>
</html>
```

***效果：***

<img src="https://cdn.chenyingshuang.cn/blog/css/BFC/5.jpg" />

可以看到上面元素，第二个<code class="default">div</code>元素为<code class="default">300px</code>宽度，但是被第一个<code class="default">div</code>元素设置<code class="default">Float</code>脱离文档流给覆盖上去了，解决此方法我们可以把第二个<code class="default">div</code>元素设置为一个<code class="default">BFC</code>。

***修改代码***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>两栏布局</title>
    <style>
            div {
                 width: 200px;
                 height: 100px;
                 border: 1px solid red;
            }

    </style>
</head>
<body>
    <div style="float: left;">
        两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局
    </div>
    <div style="width: 300px;display:flex;">
        我是蛙人，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭
    </div>
</body>
</html>
```

***效果：***

<img src="https://cdn.chenyingshuang.cn/blog/css/BFC/6.jpg" />



