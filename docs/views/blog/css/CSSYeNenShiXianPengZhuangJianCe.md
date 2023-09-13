---
title: CSS 也能实现碰撞检测
date: 2023/09/13 14:07:54
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

###### 原文 [掘金](https://juejin.cn/post/7269797025863499837)

<blockquote>
<p>我的小册&nbsp;<a href="https://s.juejin.cn/ds/yJsqHWT/" title="https://s.juejin.cn/ds/yJsqHWT/" target="_blank">《CSS 技术揭秘与实战通关》</a>上线了，想了解更多有趣、进阶、系统化的 CSS 内容，可以猛击 -&nbsp;<a href="https://s.juejin.cn/ds/yJsqHWT/" title="https://s.juejin.cn/ds/yJsqHWT/" target="_blank">LINK</a>。</p>
</blockquote>
<p>本文，我们将一起学习，使用纯 CSS，实现如下所示的动画效果：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/439b0cc98d98466bb875862ca01534bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>上面的动画效果，非常有意思，核心有两点：</p>
<ol>
<li>小球随机做 X、Y 方向的直线运动，并且能够实现碰撞到边界的时候，实现反弹效果</li>
<li>小球在碰撞边界的瞬间，颜色发生随机的变化</li>
</ol>
<p>嗯？很有意思的效果。<strong>看上去，我们好像使用 CSS 实现了碰撞检测</strong>。</p>
<p>然而，实际情况真的是这样吗？让我们一起一探究竟！</p>


## 实现 X 轴方向的运动

            
<p>这里其实我们并没有实现碰撞检测，因为小球和小球之间接触时，并没有发生碰撞效果。</p>
<p>我们只实现了，小球与边界之间的碰撞反应。不过这里，也并非碰撞检测，我们只需要设置好单个方向的运动动画，并且设置 <code>animation-direction: alternate;</code> 即可！</p>
<p>下面，我们一起来实现单个方向上的运动动画：</p>


```HTML
&lt;div&gt;&lt;/div&gt;

```




```CSS
div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #0cf;
    animation: horizontal 3s infinite linear alternate;
}

@keyframes horizontal {
    from { 
        left: 0;
    }
    to { 
        left: calc(100vw - 100px);
    }
}

```


<p>简单解读一下：</p>
<ol>
<li>元素设置为 <code>position: absolute</code> 绝对定位，利用 <code>left</code> 进行 X 轴方向的运动</li>
<li>我们让元素 <code>div</code> 运动的距离为 <code>left: calc(100vw - 100px)</code>，元素本身的高宽都是 <code>100px</code>，因此相当于运动到屏幕的最右侧</li>
<li>动画设置了 <code>alternate</code> 也就是 <code>animation-direction: alternate;</code> 的简写，表示<strong>动画在每个循环中正反交替播放</strong></li>
</ol>
<p>这样，我们就巧妙的实现了，在视觉上，小球元素移动到最右侧边界时，回弹的效果：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/875201121eac4b9aa79a2bc22abed9f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>


## 如法炮制 Y 轴方向的运动

            
<p>好，有了上面的铺垫，我们只需要再如法炮制 Y 轴方向的运动即可。</p>
<p>利用元素的 <code>top</code> 进行 Y 轴方向的运动：</p>


```CSS
div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #0cf;
    animation: 
        horizontal 3s infinite linear alternate,
        vertical 3s infinite  linear alternate;
}

@keyframes horizontal {
    from { 
        left: 0;
    }
    to { 
        left: calc(100vw - 100px);
    }
}

@keyframes vertical {
    from { 
        top: 0;
    }
    to { 
        top: calc(100vh - 100px);
    }
}

```


<p>我们增加了一个 <code>vertical 3s infinite  linear alternate</code> Y 轴的运动动画，实现小球从 <code>top: 0</code> 到 <code>top: calc(100vh - 100px);</code> 的运动。</p>
<p>这样，我们就成功的得到了 X、Y 两个方向上的小球运动，它们叠加在一起的效果如下：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c36219f7e384d92b8e14a822061cafd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<blockquote>
<p>颜色的变化可以忽略，GIF 录制问题。</p>
</blockquote>
<p>当然，此时的问题在于，缺少了随机性，小球的始终在左上和右下角之间来回运动。</p>
<p>为了解决这个问题，我们需要添加一定的随机性，这个问题也要解决，我们只需要让两个方向上运动时间不一致即可。</p>
<p>我们修改一下代码，让 X、Y 轴的运动时长不一致即可：</p>


```CSS
div {
    position: absolute;
    // ...
    animation: 
        horizontal 2.6s infinite linear alternate,
        vertical 1.9s infinite  linear alternate;
}

```


<p>如此一来，整体的效果就好上了不少，由于整个动画是无限反复进行的，随着时间的推进，整个动画呈现出来的就是<strong>无序、随机的运动</strong>：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b0be38b2cc54dcaa69e13e2fa63d1a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>


## 使用 transform 替代 top、left

            
<p>当然，上面的效果基本上没有什么太大的问题了，但是代码层面不够优雅，主要有两点问题：</p>
<ol>
<li>元素移动使用的是 <code>top</code> 和 <code>left</code>，性能相对较差，需要使用 <code>transform</code> 进行替代</li>
<li>代码中 hardcode 了 <code>100px</code>，由于 DEMO 中小球的大小是 <code>100px x 100px</code>，并且在动画的代码中也使用了 <code>100px</code> 这个值进行了运动终态的计算，因此如果想修改小球的元素大小，需要改动地方较多</li>
</ol>
<p>上述两个问题，使用 <code>transform: translate()</code> 都可以解决，但是我们为什么一开始不用 <code>transform</code> 呢？</p>
<p>我们来尝试一下，使用 transform 替代 top、left：</p>


```css
div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #0cf;
    animation: 
        horizontal 2.6s infinite linear alternate,
        vertical 1.9s infinite  linear alternate;
}
@keyframes horizontal {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100vw - 100%)); }
}
@keyframes vertical {
    from { transform: translateY(0); }
    to { transform: translateY(calc(100vh - 100%)); }
}

```


<p>上述代码中，我们使用了 transform 替代 top、left 运动。并且，将动画代码中的 <code>100px</code> 替换成了 <code>100%</code>，这一点的好处是，在 <code>transform: translate</code> 中，<code>100%</code> 表示的是元素本身的高宽，这样，当我们改变元素本身的大小时，就无需再改变 <code>@keyframes</code> 中的代码，通用性更强。</p>
<p>我们来看看修改后的效果：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d1ef1d242646498a6bac0211fed284~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>有点问题！预想中的效果并没有出现，整个动画只有 Y 轴方向上的动画效果。</p>
<p>这是什么原因呢？</p>
<p>其本质在于，定义的 <code>vertical 1.9s infinite  linear alternate</code> 的垂直方向的动画效果覆盖了在其之前定义的 <code>transform: translateX(calc(100vw - 100%))</code> 动画效果。</p>
<p>说人话就是 X、Y 轴的动画都使用了 <code>transform</code> 属性，<strong>两者之间造成了冲突</strong>。</p>


### 使用 animation-composition 进行动画合成

            
<p>在之前，这种情况基本是无解的，常见的解决方案就是：</p>
<ol>
<li>解法一：使用 <code>top</code>、<code>left</code> 替代 transform</li>
<li>解法二：多一层嵌套，将一个方向的动画拆解到元素的父元素上</li>
</ol>
<p>不过，到今天，这个问题有了更好的解法！也就是 CSS animation 家族中的新属性 —— <code>animation-composition</code>。</p>
<p>这是一个非常新的属性，表示<strong>动画合成属性</strong>，从 Chrome 112 版本开始支持。</p>
<p>有三种不同的取值：</p>


```css
{
    animation-composition: replace;        // 表示动画值替换
    animation-composition: add;              // 表示动画值追加
    animation-composition: accumulate; // 表示动画值累加
}

```


<p>本文不会详细介绍 <code>animation-composition</code>，感兴趣的可以看看 MDN 的属性介绍或者 XBOXYAN 大佬的这篇文章 -- <a href="https://juejin.cn/post/7224903881729720380?searchId=2023082117561558870BC0CEBB37C57E03" target="_blank" title="https://juejin.cn/post/7224903881729720380?searchId=2023082117561558870BC0CEBB37C57E03">了解一下全新的CSS动画合成属性animation-composition</a></p>
<p>这里，基于上面的代码，我们只需要再多设置一个 <code>animation-composition: accumulate</code> 即可解决问题：</p>


```css
div {
    animation: 
        horizontal 2.6s infinite linear alternate,
        vertical 1.9s infinite  linear alternate;
    animation-composition: accumulate;
}

```


<p>此时，我们就能通过一个元素，利用 transform 得到 X、Y 两个方向位移动画的合成效果，也就是我们想要的效果：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b0be38b2cc54dcaa69e13e2fa63d1a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>


## 使用 steps 实现颜色切换

            
<p>解决了位移动画的问题，我们就只剩下最后一个问题了，如何在碰撞的瞬间，实现颜色的切换？</p>
<p>这里也非常好解决，由于我们是知道每一轮 X、Y 方向上的动画时长的，那我们只需要在每次这个结点上，切换一次颜色即可。</p>
<p>并且，由于颜色不是过渡变换，而是直接的跳变，所以，我们需要用到 animation 中的 <code>animation-timing-function: steps()</code>，也就是步骤缓动函数。</p>
<blockquote>
<p>对 <code>animation-timing-function: steps()</code> 还不太了解的，可能需要先补一补基础，可以看看这一篇文章：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F141" target="_blank" title="https://github.com/chokcoco/iCSS/issues/141" ref="nofollow noopener noreferrer">深入浅出 CSS 动画</a></p>
</blockquote>
<p>举个例子，假设 X 方向上，单次的动画时长为 3s，那我们可以设置一个 <code>steps(10)</code> 的颜色动画，总时长为 30s，这样，每隔 3s 就会触发一次 <code>steps()</code> 步骤动画，颜色的变化就能够和小球与边界的碰撞动画发生在同一时刻。</p>
<p>那如何快速实现颜色的变化呢？利用 <code>filter: hue-rotate()</code> 即可快速实现颜色的变化。</p>
<p>理解一下下面的代码：</p>


```HTML
&lt;div class="normal"&gt;&lt;/div&gt;
&lt;div class="steps"&gt;&lt;/div&gt;

```




```CSS
div {
    width: 200px;
    height: 200px;
    background: #fc0;
}
.normal {
    animation: colorChange 10s linear infinite;
}
.steps {
    animation: colorChange 10s steps(5) infinite;
}
@keyframes colorChange {
    100% {
        filter: hue-rotate(360deg);
    }
}

```


<p>这里，我们用 <code>filter: hue-rotate(360deg)</code> 的改变，实现颜色的变化，观察下面的动图，理解 <code>steps(5)</code> 的作用。</p>
<ol>
<li><code>animation: colorChange 10s linear infinite</code> 表示背景动画的过渡变化</li>
<li><code>animation: colorChange 10s steps(5) infinite</code>，这里表示 10s 的动画分成 5 步，每两秒，会触发一次动画：</li>
</ol>
<p>效果如下：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/381923aca1614cfb8f23fade748dce7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>理解了这一步，我们就可以把颜色的变化，也一起叠加到上述的小球变化中：</p>


```CSS
div {
    animation: 
        horizontal 2.6s infinite linear alternate,
        vertical 2s infinite  linear alternate,
        colorX 26s infinite steps(10),
        colorY 14s infinite steps(7);
    animation-composition: accumulate;
}

@keyframes horizontal {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100vw - 100%)); }
}
@keyframes vertical {
    from { transform: translateY(0); }
    to { transform: translateY(calc(100vh - 100%)); }
}
@keyframes colorX {
    to {
        filter: hue-rotate(360deg);
    }
}
@keyframes colorY {
    to {
        filter: hue-rotate(360deg);
    }
}

```


<p>这样，我们就成功的得到了题图中的效果：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faae6296f1304b67a59da9ead58dd2dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>完整的代码，你可以戳这里：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FbGONqaE%3Feditors%3D0100" target="_blank" title="https://codepen.io/Chokcoco/pen/bGONqaE?editors=0100" ref="nofollow noopener noreferrer">Random Circle Path</a></p>


## 应用于图片效果、应用与多粒子效果

            
<p>OK，上面，我们就把整个效果的完整原理剖析了一遍。</p>
<p>掌握了整个原理之后，我们就可以把这个效果应用于不同场景中。</p>
<p>譬如，假设我们有这么一张图片：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d7bcca9a46d46808f6a3abd17f5c2f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>基于上面的效果，稍加改造，我们就可以得到类似的如下效果：</p>


```HTML
&lt;div&gt;&lt;/div&gt;

```




```CSS
div {
    width: 220px;
    height: 97px;
    background: linear-gradient(#f00, #f00), url(https://s1.ax1x.com/2023/08/15/pPQm9oT.jpg);
    background-blend-mode: lighten;
    background-size: contain; 
    animation: horizontal 3.7s infinite -1.4s linear alternate,
            vertical 4.1s infinite -2.1s linear alternate,
            colorX 37s infinite -1.4s steps(10),
            colorY 28.7s infinite -2.1s steps(7);
    animation-composition: accumulate;
}
@keyframes horizontal {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100vw - 100%)); }
}
@keyframes vertical {
    from { transform: translateY(0); }
    to { transform: translateY(calc(100vh - 100%)); }
}
@keyframes colorX {
    to {
        filter: hue-rotate(2185deg);
    }
}
@keyframes colorY {
    to {
        filter: hue-rotate(1769deg);
    }
}

```


<p>效果如下：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f46ba2d04d7c4a9d8ec5ad28a2d997e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>上面的 DEMO 是基于元素背景色的，本 DEMO 是基于图片的，因此这里多了一步，利用 <code>mix-blend-mode</code>，实现了图片颜色的变化。</p>
<p>完整的代码，你可以戳这里：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FWNYVmBo" target="_blank" title="https://codepen.io/Chokcoco/pen/WNYVmBo" ref="nofollow noopener noreferrer">CodePen Demo -- Random DVD Path</a></p>


### 实现多粒子碰撞

            
<p>OK，我们再进一步，基于上面的效果，我们可以实现各种有趣的粒子效果，如果同时让页面存在 1000 个粒子呢？</p>
<p>下面是我使用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fcss-doodle.com%2F" target="_blank" title="https://css-doodle.com/" ref="nofollow noopener noreferrer">CSS-Doodle</a> 实现的纯 CSS 的粒子效果，其核心原理与上面的保持一致，只是添加了更多的随机性：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc28bbad1e8e4a1baf9d86396388263c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="" loading="lazy"></p>
<p>Amazing！是不是非常有趣，整个效果的代码基于 CSS-doodle 的语法，不超过 40 行。完整的代码，你可以戳这里：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FPoXYjGV%3Feditors%3D1000" target="_blank" title="https://codepen.io/Chokcoco/pen/PoXYjGV?editors=1000" ref="nofollow noopener noreferrer">CSS Doodle - CSS Particles Animation</a></p>