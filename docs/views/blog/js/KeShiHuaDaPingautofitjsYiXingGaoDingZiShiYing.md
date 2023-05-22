---
title: 可视化大屏：autofit.js 一行搞定自适应
date: 2023/05/22 20:21:34
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js","css"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7224015103481118757)

<div class="markdown-body cache"><blockquote>
<p>2023-05-15 更新：
关于autofit.js 问答与解惑，请访问：
<a href="https://juejin.cn/post/7231089453694009404" target="_blank" title="https://juejin.cn/post/7231089453694009404">autofit.js 问答和食用指南</a></p>
<p>在线DEMO（非大屏项目）：<a href="https://link.juejin.cn?target=https%3A%2F%2Ffarm.sino-eco.com%2Fwebsite%2Fbingchonghai%2F" target="_blank" title="https://farm.sino-eco.com/website/bingchonghai/" ref="nofollow noopener noreferrer">farm.sino-eco.com/website/bin…</a> （autofit.js v1.1.2+）</p>
</blockquote>


### 可视化大屏适配/自适应现状

            
<p>可视化大屏的适配是一个老生常谈的话题了，现在其实不乏一些大佬开源的自适应插件、工具但是我为什么还要重复造轮子呢？因为目前市面上适配工具每一个都无法做到完美的效果，做出来的东西都差不多，最终实现效果都逃不出白边的手掌心，可以解决白边问题的，要么太过于复杂，要么会影响dom结构。</p>


#### 三大常用方式

            
<ol start="0">
<li>
<p>vw/vh方案</p>
<ol start="0">
<li>概述：按照设计稿的尺寸，将<code>px</code>按比例计算转为vw和vh</li>
<li>优点：可以动态计算图表的宽高，字体等，灵活性较高，当屏幕比例跟 ui 稿不一致时，不会出现两边留白情况</li>
<li>缺点：每个图表都需要单独做字体、间距、位移的适配，比较麻烦</li>
</ol>
</li>
<li>
<p>scale方案</p>
<ol start="0">
<li>概述：也是目前效果最好的一个方案</li>
<li>优点：代码量少，适配简单 、一次处理后不需要在各个图表中再去单独适配.</li>
<li>缺点：留白，有事件热区偏移，下面介绍的autofit.js已经完全解决了此问题</li>
</ol>
</li>
<li>
<p>rem + vw vh方案</p>
<ol start="0">
<li>概述：这名字一听就麻烦，具体方法为获得 rem 的基准值 ，动态的计算<code>html根元素的font-size</code> ，图表中通过 vw vh 动态计算字体、间距、位移等</li>
<li>优点：布局的自适应代码量少，适配简单</li>
<li>缺点：留白，有时图表需要单独适配字体</li>
</ol>
</li>
</ol>
<p>基于此背景，我决定要造一个简单又好用的轮子。</p>


### 解决留白问题

            
<p>留白问题是在使用scale时才会出现，而其他方式实现起来又复杂，效果也不算太理想，总会破坏掉原有的结构，可能使元素挤在一起，所以我们还是选择使用scale方案，不过这次要做出一点小小的改变。</p>


#### 常用分辨率

            
<p>首先来看一下我的拯救者的分辨率：</p>
<p><img src="https://glnf123456.obs.cidc-rp-13.joint.cmecloud.cn/fileUpload/202304201412912.png" alt="image-20230420141240837" loading="lazy"> 它可以代表从1920往下的分辨率</p>
<p>我们可以发现，比例分别是：1.77、1.6、1.77、1.6、1.33... 总之，没有特别夸张的宽高比。</p>


#### 计算补齐白边所需的px

            
<p>只要没有特别夸张的宽高比，就不会出现特别宽或者特别高的白边，那么我们能不能直接将元素宽高补过去？也就是说，当屏幕右侧有白边时，我们就让宽度多出一个白边的px，当屏幕下方有白边时，我们就让高度多出一个白边的px。</p>
<p>很喜欢CSGO玩家的一句话："啊？"</p>
<p>先想一下，如果此时按宽度比例缩放，会在下方留下白边，所以设置一下它的高度，设置多少呢？比如 scale==0.8 ，也就是说整个#app缩小了0.8倍，我们需要将高扩大多少倍才可以回到原来的大小呢？</p>
<p><img src="https://glnf123456.obs.cidc-rp-13.joint.cmecloud.cn/fileUpload/202304201442346.webp" alt="QQ录屏20230420144111" loading="lazy"></p>
<p>emmm.....</p>
<p>算数我最不在行了，启动高材生</p>
<p><img src="https://glnf123456.obs.cidc-rp-13.joint.cmecloud.cn/fileUpload/202304201437978.png" alt="image-20230420143742913" loading="lazy"></p>
<p>原来是八分之十，我vue烧了。</p>
<p>当浏览器窗口比设计稿大或者小的时候，就应该触发缩放，但是比例不一定，如果按照scale等比缩放时，宽度从1920缩小0.8倍也就是1536，而高度缩小0.8也就是743，如果此时浏览器高度过高，那么就会出现下方的白边，根据高材生所说的，缩小0.8后只需要放大八分之十就可以变回原大小，所以以现在的高度743*1.25=928，使宽度=928px就可以完全充满白边！</p>
<p>思路是正确的，但是能不能再简单一点</p>
<p>是浏览器高度！我忽略了浏览器高度，我可以直接使用浏览器高度乘以1.25然后再缩放达0.8！就是 1 ！</p>
<p>也就是说 clientHeight / scale 就等于我们需要的高度！</p>
<p>我们用代码试一试（autofit.js初代核心代码）</p>


```ini
function keepFit(designWidth, designHeight, renderDom) {
 &nbsp;let clientHeight = document.documentElement.clientHeight;
 &nbsp;let clientWidth = document.documentElement.clientWidth;
 &nbsp;let scale = 1;
 &nbsp;if (clientWidth / clientHeight &lt; designWidth / designHeight) {
 &nbsp; &nbsp;scale = (clientWidth / designWidth)
 &nbsp; &nbsp;document.querySelector(renderDom).style.height = `${clientHeight / scale}px`;
  } else {
 &nbsp; &nbsp;scale = (clientHeight / designHeight)
 &nbsp; &nbsp;document.querySelector(renderDom).style.width = `${clientWidth / scale}px`;
  }
 &nbsp;document.querySelector(renderDom).style.transform = `scale(${scale})`;
}

```


<p>解释一下：</p>
<p>参数分别是：设计稿的宽高和你要适配的元素，在vue中可以直接传#app。</p>
<p>下面的if判断的是宽度固定还是高度固定，当屏幕宽高比小于设计宽高比时，</p>
<p>我们把高度写成 clientHeight / scale ，宽度也是同理。</p>


#### 最终效果

            
<p>将这段代码放到App.vue的mounted运行一下</p>
<p><img src="https://glnf123456.obs.cidc-rp-13.joint.cmecloud.cn/fileUpload/202304201514156.webp" alt="autofit" loading="lazy"></p>
<p>如上图所示：我们成功了，我们仅用了1 2 3 4....这么几行代码，就做到了足以媲美复杂写法的自适应！</p>
<p>我把这些东西封装了一个npm包：<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fautofit.js" target="_blank" title="https://www.npmjs.com/package/autofit.js" ref="nofollow noopener noreferrer">autofit.js</a> ，开箱即用，欢迎下载！</p>


### 亲手打造集成工具：autofit.js

            
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be705da1f5043e78b88dad9021ea598~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="autofit.png" loading="lazy"></p>
<p>这是一款可以使你的项目一键自适应的工具 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F995231030%2Fautofit.js" target="_blank" title="https://github.com/995231030/autofit.js" ref="nofollow noopener noreferrer">github源码👉go</a></p>
<ul>
<li>从npm下载</li>
</ul>



```css
npm i autofit.js

```


<ul>
<li>引入</li>
</ul>



```javascript
import autofit from 'autofit.js'

```


<ul>
<li>快速开始</li>
</ul>



```csharp
autofit.init()

```


<blockquote>
<p>默认参数为1920*929（即去掉浏览器头的1080）, 直接在大屏启动时调用即可</p>
</blockquote>
<ul>
<li>使用</li>
</ul>



```php
// App.vue 需要在renderDom挂载到dom之后，才可以生效
export default { &nbsp;
 &nbsp;mounted() {
 &nbsp;autofit.init({
 &nbsp; &nbsp; &nbsp; &nbsp;designHeight: 1080,
 &nbsp; &nbsp; &nbsp; &nbsp;designWidth: 1920,
 &nbsp; &nbsp; &nbsp; &nbsp;renderDom:"#app",
 &nbsp; &nbsp; &nbsp; &nbsp;resize: true
 &nbsp;  })
  },
}

```


<blockquote>
<p>以上使用的是默认参数，可根据实际情况调整，参数分别为</p>


```bash
 &nbsp; * - renderDom（可选）：渲染的dom，默认是 "#app"，必须使用id选择器 
 &nbsp; * - designWidth（可选）：设计稿的宽度，默认是 1920 
 &nbsp; * - designHeight（可选）：设计稿的高度，默认是 929 ，如果项目以全屏展示，则可以设置为1080
 &nbsp; * - resize（可选）：是否监听resize事件，默认是 true

```


</blockquote>
</div>
