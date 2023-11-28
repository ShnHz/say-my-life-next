---
title: 谈谈外网刷屏的量子纠缠效果
date: 2023/11/28 13:53:00
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7304531203771301923?searchId=20231128134719C26C10379F79A75226FB)

<p>大家好，我卡颂。</p>
<p>最近被一段酷炫的量子纠缠效果刷屏了：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac55dd9f3ce94e85bf8a37f58a6441ef~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=750&amp;h=416&amp;s=7098368&amp;e=gif&amp;f=84&amp;b=26251d" alt="acda85f4-d21d-407e-b433-b88a4a65468b.gif" loading="lazy"></p>
<p>原作者是<code>@_nonfigurativ_</code>，一位艺术家、程序员。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98475cc1442d4bf1b0a10e6d98c0da63~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=546&amp;h=116&amp;s=21255&amp;e=png&amp;b=ffffff" alt="" loading="lazy"></p>
<p>今天简单讲讲他的核心原理。</p>
<p>欢迎围观朋友圈、加入<a href="https://juejin.cn/user/1943592291009511/pins" target="_blank" title="https://juejin.cn/user/1943592291009511/pins">人类高质量前端交流群</a>，带飞</p>


## 基础概念

            
<p>首先我们需要知道两个概念：</p>
<ul>
<li>
<p>屏幕坐标系，屏幕左上角就是<strong>屏幕坐标系</strong>的圆点</p>
</li>
<li>
<p>窗口坐标系，页面窗口左上角就是<strong>窗口坐标系</strong>的圆点</p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61521cb90a0c4d45bebad17e47e50999~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1327&amp;h=949&amp;s=860027&amp;e=png&amp;b=ffffff" alt="" loading="lazy"></p>
<p>如果只用一台电脑，不外接屏幕的话，我们会有：</p>
<ul>
<li>
<p>一个屏幕坐标系</p>
</li>
<li>
<p>打开几个页面，每个页面有各自的窗口坐标系</p>
</li>
</ul>
<p>如果外接了屏幕（或外接<code>pad</code>），那么就存在多个屏幕坐标系，这种情况的计算需要用到<strong>管理屏幕设备的API</strong> —— <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fzh%2Farticles%2Fmulti-screen-window-placement%2F" title="https://developer.chrome.com/zh/articles/multi-screen-window-placement/" target="_blank" ref="nofollow noopener noreferrer">window.getScreenDetails</a>，在本文的讨论中不涉及这种情况。</p>
<p>当我们打开一个新页面窗口，窗口的左上角就是窗口坐标系的圆点，如果要在页面正中间画个圆，那圆心的窗口坐标系坐标应该是<code>(window.innerWidth / 2, window.innerHeight / 2)</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5947edad450d4dccbfbb10a2b1645949~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=945&amp;h=815&amp;s=300986&amp;e=png&amp;b=ffffff" alt="" loading="lazy"></p>
<p>对于一个打开的窗口：</p>
<ul>
<li>
<p>他的左上角相对于屏幕顶部的距离为<code>window.screenTop</code></p>
</li>
<li>
<p>他的左上角相对于屏幕左边的距离为<code>window.screenLeft</code></p>
</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fbb2b938e0e4184bf88f933e290c01c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1079&amp;h=795&amp;s=800656&amp;e=png&amp;b=c5d3e6" alt="" loading="lazy"></p>
<p>所以，我们可以轻松得出圆的圆心在<strong>屏幕坐标系</strong>中的坐标：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6260cec1e7be43f0b9272ec0a23e5860~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1001&amp;h=916&amp;s=895827&amp;e=png&amp;b=a121bb" alt="" loading="lazy"></p>


## 位置检测

            
<p>在效果中，当打开两个页面，他们能感知到对方的位置并作出反应，这是如何实现的呢？</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33c637e1c0bc4489904aa104a576a032~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=974&amp;h=396&amp;s=441417&amp;e=png&amp;b=0b0913" alt="" loading="lazy"></p>
<p>当前，我们已经知道圆心在<strong>屏幕坐标系</strong>中的坐标。如果打开多个页面，就会获得多个<strong>圆心的屏幕坐标系坐标</strong>。</p>
<p>现在需要做的，就是让这些页面互相知道对方的坐标，这样就能向对应的方向做出连接的特效。</p>
<p>同源网站跨页面通信的方式有很多，比如：</p>
<ul>
<li>
<p><code>Window.postMessage</code></p>
</li>
<li>
<p><code>LocalStorage</code>、<code>SessionStorage</code></p>
</li>
<li>
<p><code>SharedWorker</code></p>
</li>
<li>
<p><code>BroadcastChannel</code></p>
</li>
</ul>
<p>甚至<code>Cookie</code>也能用于跨页面通信（可以在同源的所有页面之间共享）。</p>
<p>在这里作者使用的是<code>LocalStorage</code>：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a074c8f07294a2696406f07c382b223~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1192&amp;h=372&amp;s=87487&amp;e=png&amp;b=ffffff" alt="" loading="lazy"></p>
<p>只需要为每个页面生成一个唯一<code>ID</code>：</p>


```js
const pageId = Math.random().toString(36).substring(2); // 生成一个随机的页面ID

```


<p>每当将圆心最新坐标存储进<code>LocalStorage</code>时：</p>


```js
localStorage.setItem(
  pageId,
  JSON.stringify({
    x: window.screenX,
    y: window.screenY,
    width: window.innerWidth,
    height: window.innerHeight,
  })
);

```


<p>在另一个页面通过监听<code>storage事件</code>就能获取<strong>对方圆心的屏幕坐标系坐标</strong>：</p>


```js
window.addEventListener("storage", (event) =&gt; {
  if (event.key !== pageId) {
    // 来自另一个页面
    const { x, y } = JSON.parse(event.newValue);
    // ...
  }
});

```


<p>再将对方<strong>圆心的屏幕坐标系坐标</strong>转换为自身的<strong>窗口坐标系坐标</strong>，并在该坐标绘制一个圆，就能达到类似<strong>窗口叠加后，下面窗口的画面出现在上面窗口内</strong>的效果。</p>
<p>通俗的讲，所有页面都会绘制其他页面的圆，只是有些圆在页面窗口外，看不见罢了。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fe45cb40074429891336ad83f2c2843~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=790&amp;h=444&amp;s=361580&amp;e=png&amp;b=0a0812" alt="" loading="lazy"></p>
<p>考虑到页面性能，<strong>检测圆心的屏幕坐标系坐标</strong>、<strong>渲染圆</strong>相关操作可以放到<code>requestAnimationFrame</code>回调中执行。</p>


## 后记

            
<p>上述只是该效果的核心原理。要完全复刻效果，还得考虑：</p>
<ul>
<li>
<p>渲染大量粒子（我们示例中用<strong>圆</strong>代替），且多窗口通信时的性能问题</p>
</li>
<li>
<p>窗口移动时的阻尼效果</p>
</li>
<li>
<p>当前的实现是在同一个屏幕坐标系中，如果要跨屏幕实现，需要使用<code>window.getScreenDetails</code></p>
</li>
</ul>
<p>不得不感叹跨界（作者是艺术家 + 程序员）迸发的想象力真的不一般。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca26acab1c914755b46a05a54cd4a5ff~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=586&amp;h=486&amp;s=75407&amp;e=png&amp;b=ffffff" alt="" loading="lazy"></p>
