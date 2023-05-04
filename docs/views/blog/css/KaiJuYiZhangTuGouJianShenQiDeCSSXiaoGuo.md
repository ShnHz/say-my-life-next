---
title: 开局一张图，构建神奇的 CSS 效果
date: 2023/04/17 09:57:24
summary: i坤狂喜文章
config: {
    show: true,
    top: false,
    dir: false,
    dirTag: ["h3","h4","h5"],
    tag: ["css","info"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

###### 原文 [掘金](https://juejin.cn/post/7178672441068585019)

<div class="markdown-body cache"><p>假设，我们有这样一张 Gif 图：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2722689571d241b3a80ec3244e239c6d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>利用 CSS，我们尝试来搞一些事情。</p>


## 图片的 Glitch Art 风

            
<p>在这篇文章中 --<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F78%23top" target="_blank" title="https://github.com/chokcoco/iCSS/issues/78#top" ref="nofollow noopener noreferrer">CSS 故障艺术</a>，我们介绍了利用混合模式制作一种晕眩感觉的视觉效果。有点类似于抖音的 LOGO。</p>
<p>像是这样：</p>
<p>假设，我们有这样一张图：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9aa4198c74424a868256193945fe4429~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>只需要一个标签即可</p>


```HTML
&lt;div class="mix"&gt;&lt;/div&gt;

```


<p>给两张同样的图片，叠加上 青色<code>#0ff</code> 和 红色<code>#f00</code>，并且错开一定的距离，两张图都要加上 <code>background-blend-mode: lighten</code>，其中一张再加上 <code>mix-blend-mode: darken</code>：</p>


```CSS
.mix {
    width: 400px;
    height: 400px;
    background: url($img), #0ff;
    background-blend-mode: lighten;

  &amp;::after {
    content: '';
    position: absolute;
    margin-left: 10px;
    width: 400px;
    height: 400px;
    background: url($img), #f00;
    background-blend-mode: lighten;
    mix-blend-mode: darken;
  }
}

```


<p>得到如下效果：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed53f3c19e16440fa6a318aebf041559~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>简单解释下：</p>
<ol>
<li>
<p>因为图片本身不是红色和青色的，所以需要通过 <code>background-image</code> 叠加上这两种颜色，并通过 <code> background-blend-mode: lighten</code> 让其表现出来</p>
</li>
<li>
<p>为了保持中间叠加部分的原色，需要再叠加一个 <code>mix-blend-mode: darken</code> 反向处理一下。（不理解的同学可以打开调试，手动关掉几个混合模式，自己感受感受即可）</p>
</li>
</ol>
<p>完整的 DEMO：</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fchokcoco.github.io%2FCSS-Inspiration%2F%23%2F.%2Fblendmode%2Fblend-mix-img" target="_blank" title="https://chokcoco.github.io/CSS-Inspiration/#/./blendmode/blend-mix-img" ref="nofollow noopener noreferrer">图片的类抖音 LOGO Glitch 效果</a></p>
<p>当然，这里使用 Gif 图也是完全可以的，我们替换下我们的 Gif 图，看看会得到什么样的一种效果：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0ff9bcf7e50428fa130a740f7e3fccc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>有点意思，完整的代码你可以戳这里：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FrNKXwOb" target="_blank" title="https://codepen.io/Chokcoco/pen/rNKXwOb" ref="nofollow noopener noreferrer">iKUN - 使用background-blend-mode | mix-blend-mode 实现类抖音LOGO晕眩效果</a></p>


## 多图融合

            
<p>混合模式当然不止是这样。</p>
<p>我们再来实现一个有趣的效果。</p>
<p>首先，找一张地球图，可能像是这样（是不是有点眼熟）：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51e5b7320b1949d6a4d5616ca0acbeb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>把我们的人物放上去，得到这样一种效果：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88e70a246c3f49a88d4326b76b8368f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>神奇的事情在于，如果，我们给叠加在上面的动图，添加一个混合模式，会发生什么呢？尝试一下：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51f7ebe26aa14e85b8b19d438ac69266~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>通过混合模式 <code>mix-blend-mode: multiply</code>，巧妙的消除了大部分非人物的背景，再通过 <code>filter: contrast(3)</code> 加深这个效果，彻底去掉动图背景，融入了我们的地球背景中。</p>
<p>这样，我们巧妙的将两张图，融合成了一张图。</p>
<p>当然，多调试调试，还能有不一样的效果，这里我实现了两种不一样的效果，完整的代码如下：</p>


```HTML
&lt;div&gt;&lt;/div&gt;
&lt;div class="white"&gt;&lt;/div&gt;

```




```CSS
div {
    position: relative;
    margin: auto;
    width: 400px;
    height: 500px;
    flex-shrink: 0;
    background: url(earth.jpg);
    background-size: cover;
    background-position: 0 -150px;
    background-repeat: no-repeat;
    
    &amp;::before {
        content: "";
        position: absolute;
        top: 240px;
        left: 160px;
        width: 70px;
        height: 90px;
        background: var(cxk.gif);
        background-size: cover;
        background-position: -30px 0;
        mix-blend-mode: multiply;
        filter: contrast(3);
    }
}


.white {
    &amp;::before {
        mix-blend-mode: color-dodge;
        filter: invert(1) contrast(3);
    }
}

.black {
    &amp;::before {
        background: var(--bgUrl), #000;
        background-size: cover;
        background-position: -70px 0;
        mix-blend-mode: multiply;
        filter: contrast(3);
    }
}

```


<p>这样，我们就得到了两种不一样的效果：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eea35ca91ad140d682baf34dcaa7107e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>完整的 Demo，你可以戳这里：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FxxJKxdx" target="_blank" title="https://codepen.io/Chokcoco/pen/xxJKxdx" ref="nofollow noopener noreferrer">CodePen Demo -- CSS iKUN Animation</a></p>


## 干掉背景

            
<p>上面的效果不错，但是，还远远不够。</p>
<p>有的时候，我们只想更突出主题，不想过多的看到背景元素。</p>
<p>怎么办呢？</p>
<p>这里，我介绍两种还不错的小技巧，当然，这个技巧对图片本身可能会有一点点要求。</p>
<p>第一个技巧，是我在这篇文章中，曾经介绍过的一个技巧 -- <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F175" target="_blank" title="https://github.com/chokcoco/iCSS/issues/175" ref="nofollow noopener noreferrer">巧用 background-clip 实现超强的文字动效</a>。</p>
<p>这里的核心在于，借助 <code>background-clip: text</code> 能够只在文字部分展示图片内容的特性，结合滤镜和混合模式的处理，实现一种文字动图效果。达到有效的去除一些背景的干扰。</p>
<p>我们一起来看看。</p>
<p>还是这张 Gif 图：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85bb1341a658473ebbb26021900f9c68~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>我们首先通过滤镜 <code>filter: grayscale(1)</code>，将他从彩色的，处理成黑白灰的：</p>


```css
p {
    background: url(xxx);
    filter: grayscale(1);
}

```


<p>处理后的图片，大概会是这样：</p>
<img width="389" alt="image" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce4c7e953854458fb219f8184eefa7fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" loading="lazy">
<p>基于一张黑白底色的图片，我们再运用 <code>background-clip: text</code>，再通过混合模式 <code>mix-blend-mode: hard-light</code>，并且，很重要的一点，我们把这个效果放在黑色的背景之上：</p>


```CSS
body {
  background: #000;
}
p {
  color: transparent;
  background: url(xxx) center/cover;
  background-clip: text;
  filter: grayscale(1);
  mix-blend-mode: hard-light;
}

```


<p>将会得到这样一种神奇的效果，通过<strong>混合模式的叠加处理</strong>，文字的亮部将会保留，而暗部则会与黑色背景融合：</p>
<img width="363" alt="image" src="https://user-images.githubusercontent.com/8554143/207828575-0af65ac0-761b-46c8-ace8-79c44ee2ce5e.png" loading="lazy">
<p>当然，我们更希望的是，人的部分展示保留，而 Gif 图片中的背景部分被隐藏，就完美了！</p>
<p>这里，我们继续优化下代码，我们希望能把被 <code>grayscale()</code> 处理过的原图的明暗部分置换，刚好，在 <code>filter</code> 中，存在一个 <code>invert()</code> 函数，能够反转输入图像的色值。</p>
<p>因此，在 <code>grayscale()</code> 之后，再配合一次 <code>invert(1)</code> 函数：</p>


```CSS
body {
  background: #000;
}
p {
  color: transparent;
  background: url(xxx) center/cover;
  background-clip: text;
  filter: grayscale(1) invert(1);
  mix-blend-mode: hard-light;
}

```


<p>OK，至此，我们利用纯 CSS 实现了这样一种 unbelievable 的文字效果：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/657b10b6ddf240ec833f64ae8867fa5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<blockquote>
<p>合理添加混合模式 <code>mix-blend-mode</code>，能够更好的去除背景的干扰，实际使用的时候根据不同图片的颜色需要进行一定的调试。</p>
</blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FYzvgmBq" target="_blank" title="https://codepen.io/Chokcoco/pen/YzvgmBq" ref="nofollow noopener noreferrer">CodePen Demo - iKUN Animation</a></p>


### 另一种干掉背景的方式

            
<p>那是不是只有上述的方式可以干掉图片的背景，保留主体人物部分呢？</p>
<p>当然不止，还有其他方式。下面，我们不借助 <code>background-clip: text</code>，通过另外一种借助混合模式和滤镜的方式去掉背景干扰。</p>
<p>我们借助 Demo 1 的例子继续，就是如下这个效果：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e3e61b3be824a9fb7ba09fb4969f002~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>在这个例子的基础上，我们直接加上 <code>filter: grayscale(1) invert(1)</code> 和 <code>mix-blend-mode: hard-light</code>，像是这样：</p>


```CSS
.mix {
    background: url($img), #0ff;
    background-blend-mode: lighten;
    filter: grayscale(1) invert(1);
    mix-blend-mode: hard-light;

  &amp;::after {
    content: '';
    position: absolute;
    margin-left: 10px;
    background: url($img), #f00;
    background-blend-mode: lighten;
    mix-blend-mode: darken;
  }
}

```


<p>看看效果：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/530445c384bf48a7a7ed2b2a42b74d2d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>Wow，怎么做到的呢？我们来调试一些，你就能更好的 Get 到其中的奥妙：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b8d05c813ca468c9a9b8303e81c8af5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>这里，核心发挥作用的还是 <code>filter: grayscale(1) invert(1)</code>，而 <code>mix-blend-mode: hard-light</code> 的意义是让一些不那么明显的背景直接比较被干掉。</p>
<p>完整的代码，你可以戳：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FGRGbXrz" target="_blank" title="https://codepen.io/Chokcoco/pen/GRGbXrz" ref="nofollow noopener noreferrer">CodePen Demo -- iKUN Animation</a></p>


## 再动起来

            
<p>有点意思，但还不够。我们再回到 <code>background-clip: text</code> 的效果中。</p>
<p>背景图在动，我们能不能让文字也动起来呢？这样，整个动画就处于一种 Gif 在图，我们的内容也在动的双重动效之下。</p>
<p>尝试一下，这里为了尝试更多的效果，我借助了 <a href="https://link.juejin.cn?target=https%3A%2F%2Fcss-doodle.com%2F" target="_blank" title="https://css-doodle.com/" ref="nofollow noopener noreferrer">CSS-doodle</a> 这个库，这里我们核心要做的事情是：</p>
<ol>
<li>借助 <code>background-clip: text</code> 只展示文字部分的背景图的特性，首先设置多个重叠在一起的 DIV</li>
<li>每个 DIV 都借助文章上面介绍的技巧，设置背景图，利用 <code>filter: grayscale(1) invert(1)</code>，只展示人的部分</li>
<li>给每个 DIV 添加文本内容，添加 <code>background-clip: text</code></li>
<li>随机给文本设置初始高度定位</li>
<li>通过动画让文本动起来，并且设置不同的 <code>animation-delay</code></li>
</ol>
<p>上面其实只是最核心的一些流程介绍，可以结合代码一起看看，完整的 CSS-doodle 代码如下：</p>


```HTML
&lt;css-doodle grid="10x10"&gt;
    :doodle {
        @size: 70vmin 70vmin;
    }
    :container {
        position: relative;
        filter: grayscale(1) invert(1);
    }
    position: absolute;
    inset: 0;
    
    :after {
        position: absolute;
        content:"---------";
        inset: 0;
        font-size: 24px;
        line-height: 0;
        color: transparent;
        background: url(xxx)
        center/cover;
        background-clip: text;
        padding-top: @r(69vmin);
        animation: move .5s @r(-0.99s) infinite linear;
    }
    
    @keyframes move {
        0% {
            padding-left: 0
        }
        100% {
            padding-left: 70vmin;
        }
    }
&lt;/css-doodle&gt;

```




```CSS
html,
body {
    position: relative;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #000;
    cursor: pointer;
}

```


<p>这样，我们就得到了一种图在动，内容也在动的效果：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38e11f6ece22438b8fc9333ea5ea886d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>当然，这个效果可能会有一点绕！实际上你可以想象一下，把图片固定，通过 <code>background-clip: text</code> 透出图片内容，同时，让文本内容动起来，就是如此。如果去掉 <code>background-clip: text</code> 看看下图，可能你会更好理解一点：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86addb186eb343a38ee8f5bd903100ae~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<blockquote>
<p>当然，实际上如果去掉 <code>background-clip: text</code> 并不会如上图所示，因为这里每一层会使用一张背景图，<code>background-clip</code> 无法引用于它的子元素，只能应用于本身，所以这个动画也有一个缺陷，如果图层数量太多，效果会比较卡顿。</p>
</blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FZERdERb" target="_blank" title="https://codepen.io/Chokcoco/pen/ZERdERb" ref="nofollow noopener noreferrer">CodePen Demo -- CSS Doodle - iKUN Animation</a></p>
<p>修改每个 DIV 的文本内容，得到的效果也不相同，像是把内容替换成 <code>.。.</code>，可以得到这样的效果：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7c4123c3511436dbc9792a3ab6f4351~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FNWzZKQB" target="_blank" title="https://codepen.io/Chokcoco/pen/NWzZKQB" ref="nofollow noopener noreferrer">CodePen Demo -- CSS Doodle - iKUN Animation</a></p>


## 3D 视角

            
<p>OK，最后我们再来尝试下 3D 视角。</p>
<p>使用 CSS，我们可以非常轻松的实现 3D 多面体，像是这样：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4be8882644cf406db2bab830da11ac41~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>如果我们把每边的图片，替换成上述的效果，再把我们的视角放置于中间，会发生什么呢？看看，八面体的图片墙：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec393e520ca8424fa598fcd10c7310c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>再尝试把视角，放进 3D 照片墙的中间：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf0ef72567a84625b9064d814574e7c9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="" loading="lazy"></p>
<p>Wow，是不是挺有意思的，完整的 Demo，你可以戳这里：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2FChokcoco%2Fpen%2FyLEmoEa" target="_blank" title="https://codepen.io/Chokcoco/pen/yLEmoEa" ref="nofollow noopener noreferrer">iKUN Animation</a></p>
<p>不断改变 <code>perspective</code>，还可以得到不一样的观感体验，感兴趣的，可以自己调试调试。</p>


## 总结

            
<p>总结一下，本文通过一张 Gif 图，介绍了一些利用 CSS 来实现的有趣例子。</p>
<p>当然，CSS 的强大远不止这样，本文仅仅是挖掘了一个方向，从将人物凸显的方向，列出了一些我认为比较有意思的动效。</p>
<p>核心用到了混合模式、滤镜、<code>background-clip</code>、CSS-Doodle 以及配合了一些动画，这些日常中大家可能用的不太多的属性，如果你对这些属性还不是特别了解，希望进阶一下，不妨再看看我的这些文章：</p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F16" target="_blank" title="https://github.com/chokcoco/iCSS/issues/16" ref="nofollow noopener noreferrer">不可思议的混合模式 mix-blend-mode</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F31" target="_blank" title="https://github.com/chokcoco/iCSS/issues/31" ref="nofollow noopener noreferrer">不可思议的混合模式 background-blend-mode</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F140" target="_blank" title="https://github.com/chokcoco/iCSS/issues/140" ref="nofollow noopener noreferrer">CSS 奇技淫巧 | 妙用混合模式实现文字镂空波浪效果</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F169" target="_blank" title="https://github.com/chokcoco/iCSS/issues/169" ref="nofollow noopener noreferrer">利用混合模式，让文字智能适配背景颜色</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F175" target="_blank" title="https://github.com/chokcoco/iCSS/issues/175" ref="nofollow noopener noreferrer">巧用 background-clip 实现超强的文字动效</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F147" target="_blank" title="https://github.com/chokcoco/iCSS/issues/147" ref="nofollow noopener noreferrer">深入探讨 filter 与 backdrop-filter 的异同</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F212" target="_blank" title="https://github.com/chokcoco/iCSS/issues/212" ref="nofollow noopener noreferrer">除了 filter 还有什么置灰网站的方式？</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS%2Fissues%2F141" target="_blank" title="https://github.com/chokcoco/iCSS/issues/141" ref="nofollow noopener noreferrer">深入浅出 CSS 动画</a></li>
</ul>


## 最后

            
<p>好了，本文到此结束，希望本文对你有所帮助 :)</p>
<p>更多精彩 CSS 技术文章汇总在我的 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchokcoco%2FiCSS" target="_blank" title="https://github.com/chokcoco/iCSS" ref="nofollow noopener noreferrer">Github -- iCSS</a> ，持续更新，欢迎点个 star 订阅收藏。</p>
<p>如果还有什么疑问或者建议，可以多多交流，原创文章，文笔有限，才疏学浅，文中若有不正之处，万望告知。</p></div>
