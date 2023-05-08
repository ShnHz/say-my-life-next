---
title: 纯CSS渐变绘制 Chrome 图标
date: 2023/05/08 02:47:33
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","css"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7230603857033986109)

<div class="markdown-body cache">
<p>今天学习一下利用 CSS 渐变来绘制一个 Chrome 图标，如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e10c621a1df45bd835caf9e591074e8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>如何仅使用渐变而不借助其他标签呢？一起看看如何实现的吧</p>


### 一、图形拆解

            
<p>乍一看好像没法直接通过渐变写出来，所以需要对图形进行简单的拆分。</p>
<p>中间的圆圈没有什么难度，主要是周围的“扇形”，但是好像又不是完整的“扇形”，互相都有遮挡</p>
<p>经过一番思索，可以分解成这样的几个图形，如下</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c08949c03902485f92f4475d5ca6af0c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>这下每个部分是不是都可以用渐变写出来了呢？</p>


### 二、径向渐变

            
<p>假设 <code>HTML</code> 就一个标签</p>


```html
&lt;chrome&gt;&lt;/chrome&gt;

```


<p>中间的圆圈其实是<strong>蓝色→白色→透明</strong>的渐变，然后加上橙色的底色，用代码实现就是</p>


```css
chrome{
  background: radial-gradient( closest-side circle, #477EE6 calc(100% - 10px), #fff 0 100%, transparent 0) center/90px no-repeat #F2C146;
}

```


<p>注意，这里使用了关键词<code>closest-side</code>，表示<strong>最近的边</strong>，好处是<strong>可以根据背景尺寸直接控制圆的大小</strong>，默认值是<code>farthest-side</code>，其他选项详细如下</p>


<table><thead><tr><th align="center">关键字</th><th align="center">描述</th></tr></thead><tbody><tr><td align="center"><code>closest-side</code></td><td align="center">渐变中心距离容器<strong>最近的边</strong>作为终止位置。</td></tr><tr><td align="center"><code>closest-corner</code></td><td align="center">渐变中心距离容器<strong>最近的角</strong>作为终止位置。</td></tr><tr><td align="center"><code>farthest-side</code></td><td align="center">渐变中心距离容器<strong>最远的边</strong>作为终止位置。</td></tr><tr><td align="center"><code>farthest-corner（默认值）</code></td><td align="center">渐变中心距离容器<strong>最远的角</strong>作为终止位置。</td></tr></tbody></table>
<p>当然，对于<strong>完全对称</strong>的容器，<code>closest-*</code> 和 <code>farthest-*</code>是完全相同的，各自的区别如下所示</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fe5f57ee2dc4753a99613e8379c92a9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>可以得到这样的效果</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9cf854e024940818916e7bf11afa79f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>


### 三、锥形渐变

            
<p>下面再来绘制周围的“扇形”。</p>
<p>其实就是几个旋转角度的矩形，在以前，这种矩形只能通过 dom 元素，利用 <code>CSS transform</code>才能实现。不过现在可以借助锥形渐变来实现这样的效果了</p>
<blockquote>
<p>有兴趣的可以参考之前这篇文章：<a href="https://juejin.cn/post/7212101184709247033" target="_blank" title="https://juejin.cn/post/7212101184709247033">锥形渐变只能画圆锥吗？conic-gradient 10大应用举例</a></p>
</blockquote>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17d3a17432e540198d2f87cef353bca2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-03-18 at 14.01.10.gif" loading="lazy"></p>
<p>在绘制之前，需要搞清楚背景的先后顺序，一句话概括就是：</p>
<blockquote>
<p>多背景的情况下，前面的背景层级 &gt; 后面的背景层级</p>
</blockquote>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86b119b2faa64407be2a53bf767a3573~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>下面来绘制绿色的部分，其实是一个起始角度为 <code>120deg</code>，旋转角度为<code>90deg</code>的锥形渐变</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e95ad18ef8c4ac48ee39d7d186a1b2d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>还有一个问题，<strong>旋转中心并不是在图形正中心，而是中间的圆三等分上的一个点</strong>，如果我们知道了中心点的位置还有偏移的角度，是不是可以算出旋转中心点的位置？如下</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb81df6f0ea6456996be710334574b1a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>根据以上位置关系，由于需要用的中间圆的半径，所以可以用一个 CSS 变量来表示，用 CSS 实现就是</p>


```css
chrome{
  --size: 45%; /*用一个变量方便计算*/
  background: 
    background: radial-gradient( closest-side circle, #477EE6 calc(100% - 10px), #fff calc(100% - 9.5px) 100%, transparent calc(100% + .5px)) center/var(--size) no-repeat,
    /*绿色*/
    conic-gradient(from 210deg at calc( 50% + calc(var(--size) / 2) * cos(30deg) ) calc( 50% + calc(var(--size) / 2) * sin(30deg) ), #539E55 100deg, transparent 0)
    #F2C146
}

```


<p>注意，现代浏览器（Chrome 111+） 已经支持了<code>sin</code>、<code>cos</code>数学函数</p>
<blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fsin" target="_blank" title="https://developer.mozilla.org/en-US/docs/Web/CSS/sin" ref="nofollow noopener noreferrer">developer.mozilla.org/en-US/docs/…</a></p>
</blockquote>
<p>当然，这里也可以改成具体的数值，比如 <code>cos(30deg)</code> 约等于 <code>0.866</code>，<code>sin(30deg)</code>等于<code>0.5</code>，所以可以改成</p>


```css
chrome{
  background: 
    background: radial-gradient( closest-side circle, #477EE6 calc(100% - 10px), #fff calc(100% - 9.5px) 100%, transparent calc(100% + .5px)) center/var(--size) no-repeat,
    /*绿色*/
    conic-gradient(from 210deg at calc( 50% + calc(var(--size) / 2) * 0.866) ) calc( 50% + calc(var(--size) / 2) * 0.5 ), #539E55 100deg, transparent 0)
    /*橙色底色*/
    #F2C146
}

```


<p>效果如下</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/198f02c311884cac9d630ca10f4d4f37~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>用同样的方式可以绘制出红色部分</p>


```css
chrome{
  background: 
    background: radial-gradient( closest-side circle, #477EE6 calc(100% - 10px), #fff calc(100% - 9.5px) 100%, transparent calc(100% + .5px)) center/var(--size) no-repeat,
    /*红色*/
    conic-gradient(from 330deg at calc( 50% - calc(var(--size) / 2) * 0.866 ) calc( 50% + calc(var(--size) / 2) * .5 ), #D75442 100deg, transparent 0),
    /*绿色*/
    conic-gradient(from 210deg at calc( 50% + calc(var(--size) / 2) * 0.866) ) calc( 50% + calc(var(--size) / 2) * 0.5 ), #539E55 100deg, transparent 0)
    /*橙色底色*/
    #F2C146
}

```


<p>效果如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b96e180c89848e28d4764d125405357~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>是不是有点像了？其实还红色部分多了一点，需要用橙色盖住，其实就是这样</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8880a8a3a4aa47bfbb8b0a8bd35c5fa1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>可以通过锥形渐变或者线性渐变实现，这里采用锥形渐变实现</p>


```css
chrome{
  background: 
    
    background: radial-gradient( closest-side circle, #477EE6 calc(100% - 10px), #fff calc(100% - 9.5px) 100%, transparent calc(100% + .5px)) center/var(--size) no-repeat,
    /*橙色部分*/
    conic-gradient( #F2C146 90deg, transparent 0) 50% 50%/ 100% var(--size) no-repeat,
    /*红色*/
    conic-gradient(from 330deg at calc( 50% - calc(var(--size) / 2) * 0.866 ) calc( 50% + calc(var(--size) / 2) * .5 ), #D75442 100deg, transparent 0),
    /*绿色*/
    conic-gradient(from 210deg at calc( 50% + calc(var(--size) / 2) * 0.866) ) calc( 50% + calc(var(--size) / 2) * 0.5 ), #539E55 100deg, transparent 0)
    /*橙色底色*/
    #F2C146
}

```


<p>效果如下</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/945534520a04479db8cbb35be749a8da~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>最后设置圆角就行了~下面是完整代码</p>


```css
chrome{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  --size: 45%;
  background: radial-gradient( closest-side circle, #477EE6 calc(100% - 10px), #fff calc(100% - 9.5px) 100%, transparent calc(100% + .5px)) center/var(--size) no-repeat,
    conic-gradient( #F2C146 90deg, transparent 0) 50% 50%/ 100% var(--size) no-repeat,
    conic-gradient(from 330deg at calc( 50% - calc(var(--size) / 2) * 0.866 ) calc( 50% + calc(var(--size) / 2) * .5 ), #D75442 100deg, transparent 0),
    conic-gradient(from 210deg at calc( 50% + calc(var(--size) / 2) * 0.866 ) calc( 50% + calc(var(--size) / 2) * .5 ), #539E55 100deg, transparent 0), 
    #F2C146
}

```


<p>这样就绘制出了一个 Chrome 图标🤡</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8b18b88900b4d238b08078df98b5871~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>你也可以查看以下任意链接：</p>
<p><span href="https://code.juejin.cn/pen/7222179595339235380" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7222179595339235380" data-src="https://code.juejin.cn/pen/7222179595339235380" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Frunjs.work%2Fprojects%2F1781bb9104af4dbe" target="_blank" title="https://runjs.work/projects/1781bb9104af4dbe" ref="nofollow noopener noreferrer">CSS chrome (runjs.work)</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FZEqBdEK" target="_blank" title="https://codepen.io/xboxyan/pen/ZEqBdEK" ref="nofollow noopener noreferrer">CSS chrome (codepen.io)</a></li>
</ul>


### 四、总结一下

            
<p>以上就是通过 CSS 渐变绘制出一个 Chrome 图标的全部过程了，没有用到任何额外标签（包括伪元素），再次感叹 CSS 渐变的强大。下面总结一下</p>
<ol>
<li>复杂的图形需要通过拆分转换成熟悉的形状</li>
<li>径向渐变中的<code>closest-side</code>，表示<strong>最近的边</strong>，可以根据背景尺寸直接控制圆的大小</li>
<li>多背景的情况下，前面的背景层级 &gt; 后面的背景层级</li>
<li>以前旋转的矩形只能通过 <code>CSS transform</code>才能实现，现在可以借助锥形渐变来实现</li>
<li>CSS 三角函数可以很方便的计算角度和位置的关系</li>
</ol>
<p>最后，如果觉得还不错，对你有帮助的话，欢迎点赞、收藏、转发❤❤❤</p>
</div>
