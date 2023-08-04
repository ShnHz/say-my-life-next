---
title: CSS 滚动驱动动画终于正式支持了~
date: 2023/08/04 18:13:23
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

###### 原文 [掘金](https://juejin.cn/post/7259026189904805944)

<div class="markdown-body cache"><blockquote>
<p>欢迎关注我的公众号：<strong>前端侦探</strong></p>
</blockquote>
<p>在最新的<code>Chrome 115</code>中，令人无比期待的<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FCSS_scroll-driven_animations" title="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations" target="_blank" ref="nofollow noopener noreferrer">CSS 滚动驱动动画(CSS scroll-driven animations)</a>终于正式支持了~有了它，几乎以前任何需要<code>JS</code>监听滚动的交互都可以纯 CSS 实现了，就是这么强大，一起了解一下吧</p>
<blockquote>
<p>温馨提示：文章略长，建议收藏后反复查阅</p>
</blockquote>


## 一、快速入门 CSS 滚动驱动动画

            
<p>直接介绍 <code>API</code> 可能不太感兴趣，这里先通过一个最直观的例子感受一下。</p>
<p>下面是一个页面进度指示器，进度随着页面的滚动而变化</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24acf71be9f84cd693f0d5874e7be927~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 13.39.36.gif" loading="lazy"></p>
<p>页面很简单，很多内容和一个进度条</p>


```html
&lt;div class="progress"&gt;&lt;/div&gt;
...很多内容

```


<p>进度条是<code>fixed</code>定位</p>


```css
.progress{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-color: #F44336;
  transform-origin: 0 50%;
}

```


<p>然后给这个进度条添加一个动画，表示进度从<code>0</code>到<code>100%</code></p>


```css
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

```


<p>接着给这个进度条绑定动画</p>


```css
.progress{
  animation: grow-progress 3s linear;
}

```


<p>刷新页面，可以看到进度条在<code>3s</code>内从<code>0</code>增长到了<code>100%</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42c17b2f13b3433686aae88183d45ee7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="Kapture 2023-07-22 at 13.49.38" loading="lazy"></p>
<p>显然这种动画没什么意义，我们需要在滚动时才触发，并且滚动多少，动画就播放多少。</p>
<blockquote>
<p>注意：动画时长不能为0，因为为0表示动画不执行，所以必须写上一个任意非零时间，或者直接为<code>auto</code></p>
</blockquote>
<p>最后，加上<strong>最核心</strong>的一段，也就是今天的主角<code>animation-timeline</code></p>


```css
.progress{
  /*...*/
  animation-timeline: scroll();
}

```


<p>这样进度条就乖乖的跟随页面滚动而变化了（注意<code>Chrome 115+</code>）</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11eeee52e5d14b42a25fe5cba1c0ddec~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 13.39.36.gif" loading="lazy"></p>
<p>完整代码可以访问：</p>
<p><span href="https://code.juejin.cn/pen/7258614059845566521" title="CSS scroll-driven-animations (juejin.cn)" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7258614059845566521" data-src="https://code.juejin.cn/pen/7258614059845566521" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FabQjwLa" title="https://codepen.io/xboxyan/pen/abQjwLa" target="_blank" ref="nofollow noopener noreferrer">CSS scroll-driven-animations-back (codepen.io)</a></li>
</ul>
<p>是不是非常简单？是不是非常神奇？如果你感兴趣，可以接着往下看</p>


## 二、CSS 滚动驱动动画

            
<p>大家可能知道，传统 <code>JS</code> 监听滚动有一些问题，如下</p>
<ul>
<li>现代浏览器在单独的进程上执行滚动，因此只能异步传递滚动事件。</li>
<li>由于是异步传递，因此主线程动画容易出现卡顿</li>
</ul>
<p>因此，为了解决滚动卡顿的问题，CSS 滚动驱动动画应运而生。那么，什么是 CSS 滚动驱动动画？</p>
<p>默认情况下，动画是<strong>随着时间的流逝</strong>而播放的。</p>
<p><strong>CSS 滚动驱动动画</strong>指的是将<strong>动画的执行过程由页面滚动</strong>进行接管，也就是这种情况下，<strong>动画只会跟随页面滚动的变化而变化</strong>，也就是滚动多少，动画就执行多少，<strong>时间不再起作用</strong>。</p>
<p>如何改变动画的时间线呢？ 那就需要用到这个核心概念了：<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fanimation-timeline" title="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline" target="_blank" ref="nofollow noopener noreferrer">animation-timeline</a>，表示<strong>动画时间线</strong>（或者叫时间轴），用于控制 CSS 动画进度的时间线，是必不可少的一个属性。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da2ca2e9f9f64332ba3e2a66d21688cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722182057011" loading="lazy"></p>
<p>默认值是<code>auto</code>，也是就传统的时间线。下面是它一些关键词</p>


```css
/* 关键词 */
animation-timeline: none;
animation-timeline: auto;
/* 命名时间线 */
animation-timeline: --timeline_name;

/* 滚动时间线 */
animation-timeline: scroll();
animation-timeline: scroll(scroller axis);

/* 视图时间线 */
animation-timeline: view();
animation-timeline: view(axis inset);

```


<p>是不是有点混乱？不要慌，实际滚动场景千千万，这里可以分为两大类：一类是<strong>滚动进度时间线</strong>，也就是上面的关键词<code>scroll()</code>，还有一类是<strong>视图进度时间线</strong>，也就是关键词<code>view()</code>。</p>
<p>两者形式对应两种不同的应用场景，这是什么意思呢？下面一一介绍</p>


## 三. CSS 滚动进度时间线

            
<p><strong>滚动进度时间线（<code>scroll progress timeline</code>）</strong>。表示页面或者容器滚动，<strong>将滚动进度映射到动画进度上</strong>。起始滚动位置代表 <code>0%</code> 进度，结束滚动位置代表 <code>100%</code> 进度，下面是一个可视化演示</p>
<blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fscroll-driven-animations.style%2Ftools%2Fscroll-timeline%2Fprogress%2F" target="_blank" title="https://scroll-driven-animations.style/tools/scroll-timeline/progress/" ref="nofollow noopener noreferrer">scroll-driven-animations.style/tools/scrol…</a></p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c80afe2f6edb4ec9a2e6b37803a1545b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 14.05.38.gif" loading="lazy"></p>
<p>在上面的进度条例子中，我们用到的就是<code>scroll progress timeline</code>，因为我们监听的就是页面的滚动</p>


```css
animation-timeline: scroll();

```


<p>这里的<code>scroll()</code>是一个简写，可以传递两个参数，分别是<code>&lt;scroller&gt;</code>和<code>&lt;axis&gt;</code></p>
<p><code>&lt;scroller&gt;</code>表示滚动容器，支持以下几个关键值</p>
<ul>
<li><code>nearest</code>：使用最近的祖先滚动容器*（默认）*</li>
<li><code>root</code>：使用文档视口作为滚动容器。</li>
<li><code>self</code>：使用元素本身作为滚动容器。</li>
</ul>
<p><code>&lt;axios&gt;</code>表示滚动方向，支持以下几个关键值</p>
<ul>
<li><code>block</code>：滚动容器的块级轴方向*（默认）*。</li>
<li><code>inline</code>：滚动容器内联轴方向。</li>
<li><code>y</code>：滚动容器沿 y 轴方向。</li>
<li><code>x</code>：滚动容器沿 x 轴方向。</li>
</ul>


```css
/* 无参数 */
animation-timeline: scroll();

/* 设置滚动容器 */
animation-timeline: scroll(nearest); /* 默认 */
animation-timeline: scroll(root);
animation-timeline: scroll(self);

/* 设置滚动方向 */
animation-timeline: scroll(block); /* 默认 */
animation-timeline: scroll(inline);
animation-timeline: scroll(y);
animation-timeline: scroll(x);

/* 同时设置 */
animation-timeline: scroll(block nearest); /* 默认 */
animation-timeline: scroll(inline root);
animation-timeline: scroll(x self);

```


<blockquote>
<p>需要注意的是，这里语法容错性比较强，没有顺序要求，会自动识别</p>
</blockquote>
<p>因此，如果需要监听横向滚动，可以这样</p>


```css
animation-timeline: scroll(inline);

```


<p>不知大家发现没，前面的滚动容器只有三个关键词，并不能通过<code>#id</code>方式任意指定滚动容器，真的能满足所有需求吗？</p>
<p>当然不行！有时候结构稍微复杂一点，自动查找就不适用了，并且这里的<strong>最近祖先滚动容器还受到绝对定位的影响</strong>，因此，我们还需要手动去指定滚动容器。</p>
<p>官方的解决方式是<strong>创建一个带有名称的时间线</strong>，具体做法是，在<strong>滚动容器</strong>上添加一个属性<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fscroll-timeline-name" title="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline-name" target="_blank" ref="nofollow noopener noreferrer">scroll-timeline-name</a>，这个属性值必须以<code>--</code>开头，就像 CSS 变量一样，还可以通过<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fscroll-timeline-axis" title="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline-axis" target="_blank" ref="nofollow noopener noreferrer">scroll-timeline-axis</a>设置滚动方向，此时的<code>animation-timeline</code>就不用默认的<code>scroll()</code>了，而是改用前面设置的变量，示意如下</p>


```css
@keyframes animate-it { … }

/*滚动容器*/
.scroller {
  scroll-timeline-name: --my-scroller;
  scroll-timeline-axis: inline;
}

.scroller .subject {
  animation: animate-it linear;
  animation-timeline: --my-scroller;
}

```


<p>这里的<code>scroll-timeline-axis</code>和<code>scroll-timeline-name</code>还可以简写成一个属性<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fscroll-timeline" target="_blank" title="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline" ref="nofollow noopener noreferrer">scroll-timeline</a></p>


```css
scroll-timeline-name: --my-scroller;
scroll-timeline-axis: inline;
/**可简写为**/
scroll-timeline: --my-scroller inline;

```


<p>下面来看一个横向滚动的例子，刚好可以把上面的几个新概念都用上。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/532c8a7b975f45ee903b0a5dfda0b00a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 14.37.00.gif" loading="lazy"></p>
<p>布局还是类似，只是放在了一个可以横向滚动的容器中</p>


```html
&lt;main&gt;
  &lt;div class="progress"&gt;&lt;/div&gt;
  ...很多内容...
&lt;/main&gt;

```


<p>给<code>main</code>设置横向滚动，<code>.progress</code>设置<code>fixed</code>定位，还有动画和上个例子一样</p>


```css
main{
  display: flex;
  overflow: scroll;
}
.progress{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-color: #F44336;
  transform-origin: 0 50%;
  animation:grow-progress 3s linear;
}
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

```


<p>由于这里<code>main</code>才是滚动容器，并不是页面，而<code>.progress</code>是<code>fixed</code>定位，如果直接用<code>scroll(nearest)</code>获取到的就是页面根容器，并不是<code>main</code>，所以这里需要用命名<code>scroll-timeline</code>，实现如下</p>


```css
main{
  /**/
  scroll-timeline: --scrollcontainer inline;
}
.progress{
  /**/
  animation-timeline: --scrollcontainer;
}

```


<p>这样就可以将横向滚动进度一一映射到动画上了，而且不受结构限制，非常自由</p>
<p>完整代码可以查看：</p>
<p><span href="https://code.juejin.cn/pen/7258615967712804925" title="CSS scroll-driven-animations-inline (juejin.cn)" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7258615967712804925" data-src="https://code.juejin.cn/pen/7258615967712804925" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FdyQjRQx" title="https://codepen.io/xboxyan/pen/dyQjRQx" target="_blank" ref="nofollow noopener noreferrer">CSS scroll-driven-animations-inline (codepen.io)</a></li>
</ul>


## 四、CSS 视图进度时间线

            
<p><strong>视图进度时间线（<code>view progress timeline</code>）</strong>。这个名字有些难以理解，其实表示的是一个元素出现在页面视野范围内的进度，也就是关注的是元素自身位置。元素刚刚出现之前代表 <code>0%</code> 进度，元素完全离开之后代表 <code>100%</code> 进度，下面是一个可视化演示</p>
<blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fscroll-driven-animations.style%2Ftools%2Fview-timeline%2Fprogress%2F" target="_blank" title="https://scroll-driven-animations.style/tools/view-timeline/progress/" ref="nofollow noopener noreferrer">scroll-driven-animations.style/tools/view-…</a></p>
</blockquote>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f98c52d97fba404ead8ba243b8b03d3f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 14.51.44.gif" loading="lazy"></p>
<p>这个概念非常像<code>JS</code>中的<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FIntersection_Observer_API" title="https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API" target="_blank" ref="nofollow noopener noreferrer">Intersection_Observer_API</a>，也就<strong>交叉观察者</strong>，可以<strong>监测到元素在可视区</strong>的情况，因此，在这种场景中，无需关注滚动容器是哪个，只用处理自身就行了。</p>
<p>和前面的<code>scroll progress time</code>语法类似，也有一个快捷语法</p>


```css
animation-timeline: view()

```


<p>由于无需关注滚动容器，所以它的参数也不一样，分别是<code>&lt;axios&gt;</code>和<code>&lt;inset&gt;</code></p>
<p><code>&lt;axios&gt;</code>表示滚动方向，支持以下几个关键值</p>
<ul>
<li><code>block</code>：滚动容器的块级轴方向*（默认）*。</li>
<li><code>inline</code>：滚动容器内联轴方向。</li>
<li><code>y</code>：滚动容器沿 y 轴方向。</li>
<li><code>x</code>：滚动容器沿 x 轴方向。</li>
</ul>
<p><code>&lt;inset&gt;</code>表示调整元素的视区范围，有点类似<code>scroll-padding</code>，支持两个值，表示开始和结束两个范围。</p>


```css
animation-timeline: view(auto); /* 默认值 */
animation-timeline: view(20%);
animation-timeline: view(200px);
animation-timeline: view(20% 40%);
animation-timeline: view(20% 200px);
animation-timeline: view(100px 200px);
animation-timeline: view(auto 200px);

```


<p>这里的<code>&lt;inset&gt;</code>还可以用<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fview-timeline-inset" title="https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline-inset" target="_blank" ref="nofollow noopener noreferrer">view-timeline-inset</a>单独来表示，不过需要注意的是，这种用法要使用命名的<code>view progress time</code>，如下</p>


```css
scroll-timeline: --my-scroller block;
view-timeline-inset: 20% 200px;
animation-timeline: --my-scroller;

```


<blockquote>
<p>按照我的经验，<code>view progress time</code>中使用命名的情况比较少，因为无需知道滚动容器，因此推荐用<code>view()</code></p>
</blockquote>
<p>下面来看一个例子，有一个列表</p>


```html
&lt;div&gt;欢&lt;/div&gt;
&lt;div&gt;迎&lt;/div&gt;
&lt;div&gt;关&lt;/div&gt;
&lt;div&gt;注&lt;/div&gt;
&lt;div&gt;前&lt;/div&gt;
&lt;div&gt;端&lt;/div&gt;
&lt;div&gt;侦&lt;/div&gt;
...

```


<p>简单修饰后效果如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7bdb5a7d600414aa7ed64d15d6b4d0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722152836026" loading="lazy"></p>
<p>现在，我们添加一个淡入和缩放的动画</p>


```css
@keyframes appear {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

```


<p>然后通过<code>animation-time</code>绑定在每个元素上，因为我们想做一个元素进入的动画，所以要用到<code>view progress timeline</code></p>


```css
div{
  /**/
  animation: appear 1s linear both;
  animation-timeline: view();
}

```


<p>可以得到这样的效果</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55285491b4774c1c9f9405e0259a3df0~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 15.48.19.gif" loading="lazy"></p>
<p>效果是出来了，不过好像有点太过了，太夸张了，可以看到，<strong>每个元素在滚动出现到离开的过程中都完整的执行了我们定义的动画</strong>。那么，有没有办法让这个范围变小一点呢？默认的范围如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0b94d3587f540c6befce005aa45b23e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722225627354" loading="lazy"></p>
<p>当然也是可以的，这里就需要用到<code>view</code>的第二个参数<code>&lt;inset&gt;</code>了，比如设置<code>40% 0</code>表示调整视区范围，相当于将滚动容器上边距减少了 <code>40%</code>，当滚动到视区上面<code>40%</code>的时候就完成了动画（默认是滚动到<code>0%</code>，也就是完全离开的时候）</p>


```css
div{
  /**/
  animation-timeline: view(40% 0);
}

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd8114cbf23a480792af859bbe21e4a3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230723115526561" loading="lazy"></p>
<p>还可以更加激进一点，设置成<code>100%</code>，相当于元素一旦完全进入，动画就执行完成了，这样元素出现动画会更加和谐</p>


```css
div{
  /**/
  animation-timeline: view(100% 0);
}

```


<p>此时的动画范围就更小了，如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaf4f540471d465fb2df2ab3d4890944~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230723120245407" loading="lazy"></p>
<p>效果如下，是不是感觉没那么夸张了呢</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0ccdbe5e48540ac935d08549dc66b4f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 16.21.36.gif" loading="lazy"></p>
<p>完整代码可以查看：</p>
<p><span href="https://code.juejin.cn/pen/7258616829306732604" title="CSS scroll-driven-animations-view (juejin.cn)" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7258616829306732604" data-src="https://code.juejin.cn/pen/7258616829306732604" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FWNYKOPO" title="https://codepen.io/xboxyan/pen/WNYKOPO" target="_blank" ref="nofollow noopener noreferrer">CSS scroll-driven-animations-view (codepen.io)</a></li>
</ul>


## 五、CSS 动画范围区间

            
<p>默认情况下，动画会根据滚动区间范围一一映射，就比如第一个滚动指示器的例子，滚动多少，指示器的进度就走多少。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d9c436643b848c5be06131dd4bc14dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722180458893" loading="lazy"></p>
<p>但有时候，我们并不需要完整的区间，比如这个例子，右下角的返回顶部按钮</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f215e3893b0045c4995ae48a06de3eb7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 17.57.33.gif" loading="lazy"></p>
<p>像这种情况下，我们其实<strong>只需要前面滚动一定距离</strong>就可以让返回按钮完全出现了，对应关系应该是这样</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a933d72688945e7a4e754a5a7147977~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722180944722" loading="lazy"></p>
<p>那么，如何截取一定的滚动区间呢？这就要涉及一个新的属性，叫做<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fanimation-range" title="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range" target="_blank" ref="nofollow noopener noreferrer">animation-range</a>，也就是“动画范围”。</p>
<p>这里也要分两种场景，也就是前面提到的<strong>滚动进度时间线</strong>和<strong>视图进度时间线</strong></p>


### 1. 滚动进度时间线

            
<p>首先来看<code>scroll()</code>场景，由于只是滚动容器的监听，因此比较简单，直接设置范围就行了</p>


```css
animation-range: normal; /* 等价于 normal normal */
animation-range: 20%; /* 等价于 20% normal */
animation-range: 100px; /* 等价于 100px normal */

```


<p>比如上面这个返回顶部的例子，动画其实很简单，就是一个向上的位移动画</p>


```css
@keyframes back-progress {
  from { transform: translateY(150%); }
  to { transform: translateY(0%); }
}

```


<p>如果仅仅添加一个滚动时间轴</p>


```css
.back{
  /**/
  animation: back-progress 1s linear forwards;
  animation-timeline: scroll();
}

```


<p>那么，这个返回按钮就像滚动进度条那样，慢慢的出来，直到滚动到最底部才完全出来，效果如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26ca2235278048848403e5d5565f58dc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 22.52.29.gif" loading="lazy"></p>
<p>这时只需要在<code>[0, 固定距离]</code>的范围内出现就好了，表示只在这个区间范围内触发动画，关键代码如下</p>


```css
.back{
  /**/
  animation: back-progress 1s linear forwards;
  animation-timeline: scroll();
  animation-range: 0 100px;
}

```


<p>这样就实现了滚动<code>100px</code>时自动出现的返回顶部按钮，<code>100px</code>后按钮会一直显示</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca9bb7f4310646cfb77ce728006ad6a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 17.57.33.gif" loading="lazy"></p>
<p>完整代码可以查看：</p>
<p><span href="https://code.juejin.cn/pen/7258613645440417849" title="CSS scroll-driven-animations-back (juejin.cn)" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7258613645440417849" data-src="https://code.juejin.cn/pen/7258613645440417849" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FPoxBjVz" title="https://codepen.io/xboxyan/pen/PoxBjVz" target="_blank" ref="nofollow noopener noreferrer">CSS scroll-driven-animations-back (codepen.io)</a></li>
</ul>
<p>还有一个头部吸顶的例子，原理也是类似的，如下</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a84c151961f148cd9005fa6099f9e073~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-23 at 14.13.13.gif" loading="lazy"></p>
<p>头部是一个高度和字号不断变小的动画，然后需要设置一下<code>animation-range</code>，关键实现如下</p>


```css
@keyframes header {
  to { 
    height: 60px;
    font-size: 30px;
  }
}
.header{
  /**/
  animation: header 1s linear forwards;
  animation-timeline: scroll();
  animation-range: 0 calc(100vh - 60px);
}

```


<p>完整代码可以查看：</p>
<p><span href="https://code.juejin.cn/pen/7258894357275607077" title="CSS scroll-driven-animations-header (juejin.cn)" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7258894357275607077" data-src="https://code.juejin.cn/pen/7258894357275607077" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FqBQyYjE" title="https://codepen.io/xboxyan/pen/qBQyYjE" target="_blank" ref="nofollow noopener noreferrer">CSS scroll-driven-animations-header (codepen.io)</a></li>
</ul>


### 2. 视图进度时间线

            
<p>再来看看<code>view()</code>场景。由于涉及到元素和可视区域的交叉，情况稍微复杂一些，如下</p>


```css
animation-range: cover; /* 等价于 cover 0% cover 100% */
animation-range: contain; /* 等价于 contain 0% contain 100% */
animation-range: cover 20%; /* 等价于 cover 20% cover 100% */
animation-range: contain 100px; /* 等价于 contain 100px cover 100% */


animation-range: normal 25%;
animation-range: 25% normal;
animation-range: 25% 50%;
animation-range: entry exit; /* 等价于 entry 0% exit 100% */
animation-range: cover cover 200px; /* 等价于 cover 0% cover 200px */
animation-range: entry 10% exit; /* 等价于 entry 10% exit 100% */
animation-range: 10% exit 90%;
animation-range: entry 10% 90%;

```


<p>有以下关键词</p>
<ul>
<li><strong>cover</strong>：元素首次开始进入滚动容器可见范围（0%）到完全离开的过程（100% ），也就是元素只需要和可视范围有交集（默认）</li>
<li><strong>contain</strong>：元素完全进入滚动容器可见范围（0%）到刚好要离开的过程（100% ），也就是元素必须完全在可见范围才会触发</li>
<li><strong>entry</strong>：元素进入滚动容器可见范围的过程，刚进入是 0%，完全进入是 100%</li>
<li><strong>exit</strong>：元素离开滚动容器可见范围的过程，刚离开是 0%，完全离开是 100%</li>
<li><strong>entry-crossing</strong>：和<strong>entry</strong>比较类似，暂时没有发现明显差异</li>
<li><strong>exit-crossing</strong>：和<strong>exit</strong>比较类似，暂时没有发现明显差异</li>
</ul>
<p>下面做了一个示意图，表示各自的范围区间</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8ce3db7d0524dc0b174e65665eac774~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722223333917" loading="lazy"></p>
<p>如果还是不太清楚，可以用下面这个工具去对比各自的差异</p>
<blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fscroll-driven-animations.style%2Ftools%2Fview-timeline%2Fprogress" target="_blank" title="https://scroll-driven-animations.style/tools/view-timeline/progress" ref="nofollow noopener noreferrer">scroll-driven-animations.style/tools/view-…</a></p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d7cdfa48515463b9f49ee7b87a2196a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230722210228448" loading="lazy"></p>
<p>比如前面的列表进入时的动画，之前是用<code>view(100% 0)</code>实现的，大家有没有发现，这个效果其实和<code>entry</code>的示意效果一样的？</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2901743b01ee4c61b31f404c149ee16b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image-20230723120344950" loading="lazy"></p>
<p>如果用<code>animation-range</code>就很好理解了，这里需要进入动画，所以可以直接用<code>entry</code></p>


```css
div{
  animation: appear 1s linear forwords;
  animation-timeline: view();
  animation-range: entry; /*只在进入过程中生效*/
}

```


<p>同样可以实现相同的效果。</p>
<p>除此之外还可以同时设置进入和离开两种动画，这就需要定义两个动画，然后分别给两个动画定义动画区间，关键实现如下</p>


```css
div{
  animation: appear 1s linear forwards, 
            disappear 1s linear forwards;
  animation-timeline: view();
  animation-range: entry,exit; /*进入过程执行appear，离开过程执行disappear*/
}

/*出现动画*/
@keyframes appear {
  0% {
    opacity: 0;
    transform: scaleX(0);
  }

  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}
/*离开*/
@keyframes disappear {
  100% {
    opacity: 0;
    transform: scaleX(0);
  }

  0% {
    opacity: 1;
    transform: scaleX(1);
  }
}

```


<p>这样就得到一个进入和离开均存在动画的滚动列表</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecb4f40feadd4fb78281e6b46048f71a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-22 at 21.19.34.gif" loading="lazy"></p>
<p>完整代码可以查看：</p>
<p><span href="https://code.juejin.cn/pen/7258632665178308666" title="CSS scroll-driven-animations-range (juejin.cn)" class="code-editor-container"><iframe class="code-editor-frame" data-code="code-editor-element" data-code-id="7258632665178308666" data-src="https://code.juejin.cn/pen/7258632665178308666" style="display:none;" loading="lazy"></iframe><span class="loading-placeholder" style="display:none"><img class="placeholder-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAJElEQVRoge3BMQEAAADCoPVP7WkJoAAAAAAAAAAAAAAAAAAAbjh8AAFte11jAAAAAElFTkSuQmCC" loading="lazy"><span class="loading-logo"></span></span></span></p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fxboxyan%2Fpen%2FNWEBgEj" target="_blank" title="https://codepen.io/xboxyan/pen/NWEBgEj" ref="nofollow noopener noreferrer">CSS scroll-driven-animations-range (codepen.io)</a></li>
</ul>
<p>另外，还可以将<code>animation-range</code>合并到同一个动画中，在关键帧前面加上<code>entry</code>这些关键词，这样就无需指定<code>animation-range</code>中了，示意代码如下</p>


```css
div{
  animation: animate-in-and-out 1s linear forwards;
  animation-timeline: view();
}

@keyframes animate-in-and-out {
  entry 0% {
    opacity: 0;
    transform: scaleX(0);
  }

  entry 100% {
    opacity: 1;
    transform: scaleX(1);
  }
  exit 100% {
    opacity: 0;
    transform: scaleX(0);
  }

  exit 0% {
    opacity: 1;
    transform: scaleX(1);
  }
}

```




## 六、更多有趣的案例

            
<p>除了以上一些案例外，CSS 滚动驱动动画还能做更多有趣的事情，这里推荐一个网站</p>
<blockquote>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fscroll-driven-animations.style%2F" target="_blank" title="https://scroll-driven-animations.style/" ref="nofollow noopener noreferrer">scroll-driven-animations.style/</a></p>
</blockquote>
<p>比如这个 Cover Flow 效果</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/131dc8c452a34a9d99d0c90e8eeb65f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-23 at 14.34.42.gif" loading="lazy"></p>
<p>参见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fscroll-driven-animations.style%2Fdemos%2Fcover-flow%2Fcss%2F" target="_blank" title="https://scroll-driven-animations.style/demos/cover-flow/css/" ref="nofollow noopener noreferrer">scroll-driven-animations.style/demos/cover…</a></p>
<p>还有下面的卡片堆叠效果</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a54bf138fc8a405c8bbf848b9f18c10a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="Kapture 2023-07-23 at 14.45.07.gif" loading="lazy"></p>
<p>参见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fscroll-driven-animations.style%2Fdemos%2Fstacking-cards%2Fcss%2F" target="_blank" title="https://scroll-driven-animations.style/demos/stacking-cards/css/" ref="nofollow noopener noreferrer">scroll-driven-animations.style/demos/stack…</a></p>
<p>还有其他的例子就不展示了，大家可以自行体验</p>


## 七、用一张图总结一下

            
<p>总的来说，CSS 滚动驱动动画为以后的交互带来了无限可能，下面用一张图总结一下</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c074f0684bb1432da341ad7833e99e35~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="CSS Scroll-driven Animations.png" loading="lazy"></p>
<p>最后，如果觉得还不错，对你有帮助的话，欢迎点赞、收藏、转发❤❤❤</p>
<blockquote>
<p>欢迎关注我的公众号：<strong>前端侦探</strong></p>
</blockquote></div>
