---
title: 为iframe正名，你可能并不需要微前端
date: 2023/04/21 10:02:33
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","info"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

###### 原文 [掘金](https://juejin.cn/post/7185070739064619068)

<div class="markdown-body cache"><p>作者：刘显安(码怪)</p>
<blockquote>
<p>任何新技术、新产品都是有一定适用场景的，它可能在当下很流行，但它不一定在任何时候都是最优解。</p>
</blockquote>


# 前言

            
<p>最近几年微前端很火，火到有时候项目里面用到了iframe还要偷偷摸摸地藏起来生怕被别人知道了，因为担心被人质疑：你为什么不用微前端方案？直到最近笔者接手一个项目，需要将现有的一个系统整体嵌入到另外一个系统（一共20多个页面），在被微前端坑了几次之后，回过头发现，iframe真香！</p>
<p>qiankun的作者有一篇<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.yuque.com%2Fkuitos%2Fgky7yw%2Fgesexv%3Fspm%3Data.21736010.0.0.25c06df01VID5V" title="https://www.yuque.com/kuitos/gky7yw/gesexv?spm=ata.21736010.0.0.25c06df01VID5V" target="_blank" ref="nofollow noopener noreferrer">《Why Not Iframe》</a> 介绍了iframe的优缺点（不过作者还有一篇<a href="https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F391248835" title="https://zhuanlan.zhihu.com/p/391248835" target="_blank" ref="nofollow noopener noreferrer">《你可能并不需要微前端》</a>给微前端降降火），诚然iframe确实存在很多缺点，但是在选择一个方案的时候还是要具体场景具体分析，它可能在当下很流行，但它不一定在任何时候都是最优解：iframe的这些缺点对我来说是否能够接受？它的缺点是否有其它方法可以弥补？使用它到底是利大于弊还是弊大于利？我们需要在优缺点之间找到一个平衡。</p>


# 优缺点分析

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7ba7b4fe292438c9f84f8d095b032a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>


## iframe适合的场景

            
<p>由于iframe的一些限制，部分场景并不适合用iframe，比如像下面这种iframe只占据页面中间部分区域，由于父页面已经有一个滚动条了，为了避免出现双滚动条，只能动态计算iframe的内容高度赋值给iframe，使得iframe高度完全撑满，但这样带来的问题是弹窗很难处理，如果居中的话一般弹窗都相对的是iframe内容高度而不是屏幕高度，从而导致弹窗可能看不见，如果固定弹窗top又会导致弹窗跟随页面滚动，而且稍有不慎iframe内容高度计算有一点点偏差就会出现双滚动条。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7744c2ded9794f58bb3e9fde13f4c90c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>所以：</p>
<ul>
<li>如果页面本身比较简单，是一个没有弹窗、浮层、高度也是固定的纯信息展示页的话，用iframe一般没什么问题；</li>
<li>如果页面是包含弹窗、信息提示、或者高度不是固定的话，需要看<strong>iframe是否占据了全部的内容区域</strong>，如果是像下图这种经典的导航+菜单+内容结构、并且整个内容区域都是iframe，那么可以放心大胆地尝试iframe，否则，需要慎重考虑方案选型。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/117cf442197848b9a39a9338917a2c0f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>为什么一定要满足“iframe占据全部内容区域”这个条件呢？可以想象一下下面这种场景，滚动条出现在页面中间应该大部分人都无法接受：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe05936603d64af49474f44cb8bb6f51~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>


# 实战：A系统接入B系统

            
<p>满足“iframe占据全部内容区域”条件的场景，iframe的几个缺点都比较好解决。下面通过一个实际案例来详细介绍将一个线上在运行的系统接入到另外一个系统的全过程。以笔者前段时间刚完成的ACP（全称Alibaba.com Pay，阿里巴巴国际站旗下一站式全球收款平台，下称A系统）接入生意贷（下称B系统）为例，已知：</p>
<ul>
<li>ACP和生意贷都是MPA页面；</li>
<li>ACP系统在此之前没有接入其他系统的先例，生意贷是第一个；</li>
<li>生意贷作为被接入系统，本次需要接入的一共有20多个页面，且服务端包含大量业务逻辑以及跳转控制，有些页面想看看长什么样子都非常困难，需要在Node层mock大量接口；</li>
<li>接入时需要做功能删减，部分接口入参需要调整；</li>
<li>生意贷除了接入到ACP系统中，之前还接入过AMES系统，本次接入需要兼容这部分历史逻辑；</li>
</ul>
<p>我们希望的效果：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abb51daa3fdf44218567982b65ac5517~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>假设我们新增一个页面 <code>/fin/base.html?entry=xxx </code>作为我们A系统承接B系统的地址，A系统有类似如下代码：</p>


```scala
class App extends React.Component {
    state = {
        currentEntry: decodeURIComponent(iutil.getParam('entry') || '') || '',
    };
    render() {
        return &lt;div&gt;
            &lt;iframe id="microFrontIframe" src={this.state.currentEntry}/&gt;
        &lt;/div&gt;;
    }
}

```




## 隐藏原系统导航菜单

            
<p>因为是接入到另外一个系统，所以需要将原系统的菜单和导航等都通过一个类似“hideLayout”的参数去隐藏。</p>


## 前进后退处理

            
<p>需要特别注意的是，iframe页面内部的跳转虽然不会让浏览器地址栏发生变化，但是却会产生一个看不见的“history记录”，也就是点击前进或后退按钮（<code>history.forward()</code>或<code>history.back()</code>）可以让iframe页面也前进后退，但是地址栏无任何变化。</p>
<p>所以准确来说前进后退无需我们做任何处理，我们要做的就是让浏览器地址栏同步更新即可。</p>
<blockquote>
<p>如果要禁用浏览器的上述默认行为，一般只能在iframe跳转时通知父页面更新整个<code>&lt;iframe /&gt;DOM</code>节点。</p>
</blockquote>


## URL的同步更新

            
<p>让URL同步更新需要处理2个问题，一个是什么时候去触发更新的动作，一个是URL更新的规律，即父页面的URL地址（A系统）与iframe的URL地址（B系统）映射关系的维护。</p>
<p>保证URL同步更新功能正常需要满足这3种情况：</p>
<ul>
<li>case1: 页面刷新，iframe能够加载正确页面；</li>
<li>case2: 页面跳转，浏览器地址栏能够正确更新；</li>
<li>case3: 点击浏览器的前进或后退，地址栏和iframe都能够同步变化；</li>
</ul>


### 什么时候更新URL地址

            
<p>首先想到的肯定是在iframe加载完发送一个通知给父页面，父页面通过<code>history.replaceState</code>去更新URL。</p>
<blockquote>
<p>为什么不是<code>history.pushState</code>呢？因为前面提到过，浏览器默认会产生一条历史记录，我们只需要更新地址即可，如果用pushState会产生2条记录。</p>
</blockquote>
<p>B系统：</p>


```xml
&lt;script&gt;
var postMessage = function(type, data) {
    if (window.parent !== window) {
        window.parent.postMessage({
            type: type,
            data: data,
        }, '*');
    }
}
// 为了让URL地址尽早地更新，这段代码需要尽可能前置，例如可以直接放在document.head中
postMessage('afterHistoryChange', { url: location.href });
&lt;/script&gt;

```


<p>A系统：</p>


```typescript
window.addEventListener('message', e =&gt; {
    const { data, type } = e.data || {};
    if (type === 'afterHistoryChange' &amp;&amp; data?.url) {
        // 这里先采用一个兜底的URL承接任意地址
        const entry = `/fin/base.html?entry=${encodeURIComponent(data.url)}`;
        // 地址不一样才需要更新
        if (location.pathname + location.search !== entry) {
            window.history.replaceState(null, '', entry);
        }
    }
});

```




### 优化URL的更新速度

            
<p>按照上面的方法实现后可以发现，URL虽然可以更新但是速度有点慢，点击跳转后一般需要等待7-800毫秒地址栏才会更新，有点美中不足。可以把地址栏的更新在“跳转后”基础之上再加一个“跳转前”。为此我们必须有一个全局的beforeRedirect钩子，先不考虑它的具体实现：</p>
<p>B系统：</p>


```php
function beforeRedirect(href) {
    postMessage('beforeHistoryChange', { url: href });
}

```


<p>A系统：</p>


```typescript
window.addEventListener('message', e =&gt; {
    const { data, type } = e.data || {};
    if ((type === 'beforeHistoryChange' || type === 'afterHistoryChange') &amp;&amp; data?.url) {
        // 这里先采用一个兜底的URL承接任意地址
        const entry = `/fin/base.html?entry=${encodeURIComponent(data.url)}`;
        // 地址不一样才需要更新
        if (location.pathname + location.search !== entry) {
            window.history.replaceState(null, '', entry);
        }
    }
});

```


<p>加上上述代码之后，点击iframe中的跳转链接，URL会实时更新，浏览器的前进后退功能也正常。</p>
<blockquote>
<p>为什么需要同时保留跳转前和跳转后呢？因为如果只保留跳转前，只能满足前面的case1和case2，case3无法满足，也就是点击后退按钮只有iframe会后退，URL地址不会更新。</p>
</blockquote>


### 美化URL地址

            
<p>简单的使用<code>/fin/base.html?entry=xxx</code>这样的通用地址虽然能用，但是不太美观，而且很容易被人看出来是iframe实现的，比较没有诚意，所以如果被接入系统的页面数量在可枚举范围内，建议给每个地址维护一个新的短地址。</p>
<p>首先，新增一个SPA页面<code>/fin/*.html</code>，和前面的<code>/fin/base.html</code>指向同一个页面，然后维护一个URL地址的映射，类似这样：</p>


```javascript
// A系统地址到B系统地址映射
const entryMap = {
    '/fin/home.html': 'https://fs.alibaba.com/xxx/home.htm?hideLayout=1',
    '/fin/apply.html': 'https://fs.alibaba.com/xxx/apply?hideLayout=1',
    '/fin/failed.html': 'https://fs.aibaba.com/xxx/failed?hideLayout=1',
    // 省略
};
const iframeMap = {}; // 同时再维护一个子页面 -&gt; 父页面URL映射
for (const entry in entryMap) {
    iframeMap[entryMap[entry].split('?')[0]] = entry;
}
class App extends React.Component {
    state = {
        currentEntry: decodeURIComponent(iutil.getParam('entry') || '') || entryMap[location.pathname] || '',
    };
    render() {
        return &lt;div&gt;
            &lt;iframe id="microFrontIframe" src={this.state.currentEntry}/&gt;
        &lt;/div&gt;;
    }
}

```


<p>同时完善一下更新URL地址部分：</p>


```javascript
// base.html继续用作兜底
let entry = `/fin/base.html?entry=${encodeURIComponent(data.url)}`;
const [path, search] = data.url.split('?');
if (iframeMap[path]) {
    entry = `${iframeMap[path]}?${search || ''}`;
}
// 地址不一样才需要更新
if (location.pathname + location.search !== entry) {
    window.history.replaceState(null, '', entry);
}

```


<blockquote>
<p>省略参数透传部分代码。</p>
</blockquote>


## 全局跳转拦截

            
<p>为什么一定要做全局跳转拦截呢？一个因为我们需要把hideLayout参数一直透传下去，否则就会点着点着突然出现下面这种双菜单的情况：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/110b0f09df6e4f559ff36540fd89f385~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>另一个是有些页面在被嵌入前是当前页面打开的，但是被嵌入后不能继续在当前iframe打开，比如支付宝付款这种第三方页面，想象一下下面这种情况会不会觉得很怪？所以这类页面一定要做特殊处理让它跳出去而不是当前页面打开。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/063c839ca02f452aa7ff77098edba2a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>URL跳转可以分为服务端跳转和浏览器跳转，浏览器跳转又包括A标签跳转、location.href跳转、window.open跳转、historyAPI跳转等；</p>
<p>而根据是否新标签打开又可以分为以下4种场景：</p>
<ol>
<li>继续当前iframe打开，需要隐藏原系统的所有layout；</li>
<li>当前父页面打开第三方页面，不需要任何layout；</li>
<li>新开标签打开第三方页面（如支付宝页面），不需要做特殊处理；</li>
<li>新开标签打开宿主页面，需要把原系统layout替换成新layout；</li>
</ol>
<p>为此，先定义好一个<code>beforeRedirect</code>方法，由于新标签打开有<code>target="_blank"</code>和<code>window.open</code>等方式，父页面打开有<code>target="_parent"</code>和<code>window.parent.location.href</code>等方式，为了更好的统一封装，我们把特殊情况的跳转统一在<code>beforeRedirect</code>处理好，并约定只有有返回值的情况才需要后续继续处理跳转：</p>


```ini
// 维护一个需要做特殊处理的第三方页面列表
const thirdPageList = [
    'https://service.alibaba.com/',
    'https://sale.alibaba.com/xxx/',
    'https://alipay.com/xxx/',
    // ...
];
/**
 * 封装统一的跳转拦截钩子，处理参数透传和一些特殊情况
 * @param {*} href 要跳转的地址，允许传入相对路径
 * @param {*} isNewTab 是否要新标签打开
 * @param {*} isParentOpen 是否要在父页面打开
 * @returns 返回处理好的跳转地址，如果没有返回值则表示不需要继续处理跳转
 */
function beforeRedirect(href, isNewTab) {
    if (!href) {
        return;
    }
    // 传过来的href可能是相对路径，为了做统一判断需要转成绝对路径
    if (href.indexOf('http') !== 0) {
        var a = document.createElement('a');
        a.href = href;
        href = a.href;
    }
    // 如果命中白名单
    if (thirdPageList.some(item =&gt; href.indexOf(item) === 0)) {
        if (isNewTab) {
            // _rawOpen参见后面 window.open 拦截
            window._rawOpen(href);
        } else {
            // 第三方页面如果不是新标签打开就一定是父页面打开
            window.parent.location.href = href;
        }
        return;
    }
    // 需要从当前URL继续往下透传的参数
    var params = ['hideLayout', 'tracelog'];
    for (var i = 0; i &lt; params.length; i++) {
        var value = getParam(params[i], location.href);
        if (value) {
            href = setParam(params[i], value, href);
        }
    }
    if (isNewTab) {
        let entry = `/fin/base.html?entry=${encodeURIComponent(href)}`;
        const [path, search] = href.split('?');
        if (iframeMap[path]) {
            entry = `${iframeMap[path]}?${search || ''}`;
        }
        href = `https://payment.alibaba.com${entry}`;
        window._rawOpen(href);
        return;
    }
    // 如果是以iframe方式嵌入，向父页面发送通知
    postMessage('beforeHistoryChange', { url: href });
    return href;
}

```




### 服务端跳转拦截

            
<p>服务端主要是对301或302重定向跳转进行拦截，以Egg为例，只要重写 <code>ctx.redirect</code> 方法即可。</p>


### A标签跳转拦截

            


```ini
document.addEventListener('click', function (e) {
    var target = e.target || {};
    // A标签可能包含子元素，点击目标可能不是A标签本身，这里只简单判断2层
    if (target.tagName === 'A' || (target.parentNode &amp;&amp; target.parentNode.tagName === 'A')) {
        target = target.tagName === 'A' ? target : target.parentNode;
        var href = target.href;
        // 不处理没有配置href或者指向JS代码的A标签
        if (!href || href.indexOf('javascript') === 0) {
            return;
        }
        var newHref = beforeRedirect(href, target.target === '_blank');
        // 没有返回值一般是已经处理了跳转，需要禁用当前A标签的跳转
        if (!newHref) {
            target.target = '_self';
            target.href = 'javascript:;';
        } else if (newHref !== href) {
            target.href = newHref;
        }
    }
}, true);

```




### location.href拦截

            
<p>location.href拦截至今是一个困扰前端界的难题，这里只能采用一个折中的方法：</p>


```ini
// 由于 location.href 无法重写，只能实现一个 location2.href = ''
if (Object.defineProperty) {
    window.location2 = {};
    Object.defineProperty(window.location2, 'href', {
        get: function() {
            return location.href;
        },
        set: function(href) {
            var newHref = beforeRedirect(href);
            if (newHref) {
                location.href = newHref;
            }
        },
    });
}

```


<p>因为我们<strong>不仅实现了location.href的写，location.href的读也一起实现了</strong>，所以可以放心大胆的进行全局替换。找到对应前端工程，首先全局搜索<code>window.location.href</code>，批量替换成<code>(window.location2 || window.location).href</code>，然后再全局搜索<code>location.href</code>，批量替换成<code>(window.location2 || window.location).href</code>（思考一下为什么一定是这个顺序呢）。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48ae09523b6f46269362ec9025f51406~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<blockquote>
<p>另外需要注意，有些跳转可能是写在npm包里面的，这种情况只能npm也跟着替换一下了，并没有其它更好办法。</p>
</blockquote>


### window.open拦截

            


```ini
var tempOpenName = '_rawOpen';
if (!window[tempOpenName]) {
    window[tempOpenName] = window.open;
    window.open = function(url, name, features) {
        url = beforeRedirect(url, true);
        if (url) {
            window[tempOpenName](url, name, features);
        }
    }
}

```




### history.pushState拦截

            


```ini
var tempName = '_rawPushState';
if (!window.history[tempName]) {
    window.history[tempName] = window.history.pushState;
    window.history.pushState = function(state, title, url) {
        url = beforeRedirect(url);
        if (url) {
            window.history[tempName](state, title, url);
        }
    }
}

```




### history.replaceState拦截

            


```ini
var tempName = '_rawReplaceState';
if (!window.history[tempName]) {
    window.history[tempName] = window.history.replaceState;
    window.history.replaceState = function(state, title, url) {
        url = beforeRedirect(url);
        if (url) {
            window.history[tempName](state, title, url);
        }
    }
}

```




## 全局loading处理

            
<p>完成上述步骤后，基本上已经看不出来是iframe了，但是跳转的时候中间有短暂的白屏会有一点顿挫感，体验不算很流畅，这时候可以给iframe加一个全局的loading，开始跳转前显示，页面加载完再隐藏：</p>
<p>B系统：</p>


```javascript
document.addEventListener('DOMContentLoaded', function (e) {
    postMessage('iframeDOMContentLoaded', { url: location.href });
});

```


<p>A系统：</p>


```typescript
window.addEventListener('message', (e) =&gt; {
    const { data, type } = e.data || {};
    // iframe 加载完毕
    if (type === 'iframeDOMContentLoaded') {
        this.setState({loading: false});
    }
    if (type === 'beforeHistoryChange') {
        // 此时页面并没有立即跳转，需要再稍微等待一下再显示loading
        setTimeout(() =&gt; this.setState({loading: true}), 100);
    }
});

```


<p>除此之外还需要利用iframe自带的onload加一个兜底，防止iframe页面没有上报 <code>iframeDOMContentLoaded</code> 事件导致loading不消失：</p>


```javascript
// iframe自带的onload做兜底
iframeOnLoad = () =&gt; {
    this.setState({loading: false});
}
render() {
    return &lt;div&gt;
        &lt;Loading visible={this.state.loading} tip="正在加载..." inline={false}&gt;
            &lt;iframe id="microFrontIframe" src={this.state.currentEntry} onLoad={this.iframeOnLoad}/&gt;
        &lt;/Loading&gt;
    &lt;/div&gt;;
}

```


<p>还需要注意，当新标签页打开页面时并不需要显示loading，需要注意区分。</p>


## 弹窗居中问题

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77b8181ef065464580ca0f6480bf66be~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>当前场景下弹窗个人觉得并不需要处理，因为菜单的宽度有限，不仔细看的话甚至都没注意到弹窗没有居中：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b6f64672caa4e3e80b4032e73a5926a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>如果非要处理的话也不麻烦，覆盖一下原来页面弹窗的样式，当包含<code>hideLayout</code>参数时，让弹窗的位置分别向左移动<code>menuWidth/2</code>、向上移动<code>navbarHeight/2</code>即可（遮罩位置不能动、也动不了）。</p>
<p>添加了<code>marginLeft=-120px</code>、<code>marginTop=-30px</code> 后的弹窗效果：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed44aa14e065408cbe3056441579a5f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>


## 最终效果

            
<p>其实不难看出，最终效果和SPA几乎无异，而且菜单和导航本来就是无刷新的，页面跳转没有割裂感：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78ef290a47e84bb6ae1e9fa7727a8af1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>


# 结语

            
<p>上述方案有几个没有提到的点：</p>
<ul>
<li>方案成立的前提是建立在2个系统共用一套用户体系，否则需要对2个系统的登录体系进行打通，一般包括账号绑定、A系统默认免登B系统，等等，这需要一定额外的工作量；</li>
<li>参数的透传与删除，例如我希望除了hideLayout参数之外其它URL参数全部在父子页面之间透传；</li>
<li>埋点，数据上报的时候需要增加一个额外参数来标识流量来自另外一个系统；</li>
</ul>
<p>在第一次摸索方案时可能需要花费一些时间，但是在熟悉之后，如果后续还有类似把B系统接入A系统的需求，在没有特殊情况且顺利的前提下可能花费1-2天时间即可完成，最重要的是大部分工作都是全局生效的，不会随着页面的增多而导致工作量增加，测试回归的成本也非常低，只需要验证所有页面跳转、展示等是否正常，功能本身一般不会有太大问题，而如果是微前端方案的话需要从头到尾全部仔仔细细测试一遍，开发和测试的成本都不可估量。</p></div>
