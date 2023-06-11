---
title: 无头浏览器 Puppeteer 初探
date: 2023/06/11 23:52:07
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js","nodejs","tool"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/6844903504276881422)

<div class="markdown-body cache html"><blockquote>
<p>作者简介 felix 蚂蚁金服·数据体验技术团队</p>
</blockquote>
<p>我们日常使用浏览器的步骤为：启动浏览器、打开一个网页、进行交互。而<code>无头浏览器</code>指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。</p>
<p>有了无头浏览器，我们就能做包括但不限于以下事情：</p>
<ul>
<li>对网页进行截图保存为图片或 pdf</li>
<li>抓取单页应用(SPA)执行并渲染(解决传统 HTTP 爬虫抓取单页应用难以处理异步请求的问题)</li>
<li>做表单的自动提交、UI的自动化测试、模拟键盘输入等</li>
<li>用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题</li>
<li>在最新的无头浏览器环境里做测试、使用最新浏览器特性</li>
<li>写爬虫做你想做的事情~</li>
</ul>
<p>无头浏览器很多，包括但不限于:</p>
<ul>
<li>PhantomJS, 基于 Webkit</li>
<li>SlimerJS, 基于 Gecko</li>
<li>HtmlUnit, 基于 Rhnio</li>
<li>TrifleJS, 基于 Trident</li>
<li>Splash, 基于 Webkit</li>
</ul>
<p>本文主要介绍 Google 提供的无头浏览器(headless Chrome), 他基于 <a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fchromedevtools.github.io%2Fdevtools-protocol%2F" title="https://chromedevtools.github.io/devtools-protocol/" ref="nofollow noopener noreferrer">Chrome DevTools protocol</a> 提供了不少高度封装的接口方便我们控制浏览器。</p>


## 简单的代码示例

            
<blockquote>
<p>为了能使用 <code>async</code>/<code>await</code> 等新特性，需要使用 v7.6.0 或更高版本的 Node.</p>
</blockquote>


### 启动/关闭浏览器、打开页面

            


```csharp
    // 启动浏览器
    const browser = await puppeteer.launch({
        // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
        // headless: false,
        timeout: 30000, // 默认超时为30秒，设置为0则表示不设置超时
    });

    // 打开空白页面
    const page = await browser.newPage();

    // 进行交互
    // ...

    // 关闭浏览器
    // await browser.close();

```



### 设置页面视窗大小

            


```arduino
    // 设置浏览器视窗
    page.setViewport({
        width: 1376,
        height: 768,
    });

```



### 输入网址

            


```csharp
    // 地址栏输入网页地址
    await page.goto('https://google.com/', {
        // 配置项
        // waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
    });

```



### 保存网页为图片

            
<p>打开一个网页，然后截图保存到本地：</p>


```csharp
await page.screenshot({
    path: 'path/to/saved.png',
});

```

<p><a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flaispace%2Fpuppeteer-explore%2Fblob%2Fmaster%2Fdemo%2Fsave-screenshot.js" title="https://github.com/laispace/puppeteer-explore/blob/master/demo/save-screenshot.js" ref="nofollow noopener noreferrer">完整示例代码</a></p>


### 保存网页为 pdf

            
<p>打开一个网页，然后保存 pdf 到本地：</p>


```csharp
await page.pdf({
     path: 'path/to/saved.pdf',
    format: 'A4', // 保存尺寸
});

```

<p><a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flaispace%2Fpuppeteer-explore%2Fblob%2Fmaster%2Fdemo%2Fsave-pdf.js" title="https://github.com/laispace/puppeteer-explore/blob/master/demo/save-pdf.js" ref="nofollow noopener noreferrer">完整示例代码</a></p>


### 执行脚本

            
<p>要获取打开的网页中的宿主环境，我们可以使用 <code>Page.evaluate</code> 方法：</p>


```javascript
// 获取视窗信息
const dimensions = await page.evaluate(() =&gt; {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
    };
});
console.log('视窗信息:', dimensions);

// 获取 html
// 获取上下文句柄
const htmlHandle = await page.$('html');

// 执行计算
const html = await page.evaluate(body =&gt; body.outerHTML, htmlHandle);

// 销毁句柄
await htmlHandle.dispose();

console.log('html:', html);

```

<p><code>Page.$</code> 可以理解为我们常用的 <code>document.querySelector</code>, 而 <code>Page.?</code> 则对应 <code>document.querySelectorAll</code>。</p>
<p><a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flaispace%2Fpuppeteer-explore%2Fblob%2Fmaster%2Fdemo%2Fevalute-script.js" title="https://github.com/laispace/puppeteer-explore/blob/master/demo/evalute-script.js" ref="nofollow noopener noreferrer">完整示例代码</a></p>


### 自动提交表单

            
<p>打开谷歌首页，输入关键字，回车进行搜索：</p>


```csharp
// 地址栏输入网页地址
await page.goto('https://google.com/', {
    waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
});

// 聚焦搜索框
// await page.click('#lst-ib');
await page.focus('#lst-ib');

// 输入搜索关键字
await page.type('辣子鸡', {
   delay: 1000, // 控制 keypress 也就是每个字母输入的间隔
});

// 回车
await page.press('Enter');

```

<p></p><figure><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/17/808030a25211446b8903281b9427c321~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" loading="lazy"><figcaption></figcaption></figure><p></p>
<p><a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flaispace%2Fpuppeteer-explore%2Fblob%2Fmaster%2Fdemo%2Fauto-submit-form.js" title="https://github.com/laispace/puppeteer-explore/blob/master/demo/auto-submit-form.js" ref="nofollow noopener noreferrer">完整示例代码</a></p>


## 复杂点的代码示例

            
<p>每一个简单的动作连接起来，就是一连串复杂的交互，接下来我们看两个更具体的示例。</p>


### 抓取单页应用: 模拟饿了么外卖下单

            
<p>传统的爬虫是基于 HTTP 协议，模拟 UserAgent 发送 http 请求，获取到 html 内容后使用正则解析出需要抓取的内容，这种方式面对服务端渲染直出 html 的网页时非常便捷。</p>
<p>但遇到单页应用(SPA)时，或遇到登录校验时，这种爬虫就显得比较无力。</p>
<p>而使用无头浏览器，抓取网页时完全使用了人机交互时的操作，所以页面的初始化完全能使用宿主浏览器环境渲染完备，不再需要关心这个单页应用在前端初始化时需要涉及哪些 HTTP 请求。</p>
<p>无头浏览器提供的各种点击、输入等指令，完全模拟人的点击、输入等指令，也就再也不用担心正则写不出来了啊哈哈哈</p>
<p>当然，有些场景下，使用传统的 HTTP 爬虫(写正则匹配) 还是比较高效的。</p>
<p>在这里就不再详细对比这些差异了，以下这个例子仅作为展示模拟一个完整的人机交互：使用移动版饿了么点外卖。</p>
<p>先看下效果：</p>
<p></p><figure><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/17/bcb3d48bb1c8a075d9a938c43e291bfa~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" loading="lazy"><figcaption></figcaption></figure><p></p>
<p>代码比较长就不全贴了，关键是几行：</p>


```javascript
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone6 = devices['iPhone 6'];

console.log('启动浏览器');
const browser = await puppeteer.launch();

console.log('打开页面');
const page = await browser.newPage();

// 模拟移动端设备
await page.emulate(iPhone6);

console.log('地址栏输入网页地址');
await page.goto(url);

console.log('等待页面准备好');
await page.waitForSelector('.search-wrapper .search');

console.log('点击搜索框');
await page.tap('.search-wrapper .search');

await page.type('麦当劳', {
    delay: 200, // 每个字母之间输入的间隔
});

console.log('回车开始搜索');
await page.tap('button');

console.log('等待搜素结果渲染出来');
await page.waitForSelector('[class^="index-container"]');

console.log('找到搜索到的第一家外卖店！');
await page.tap('[class^="index-container"]');


console.log('等待菜单渲染出来');
await page.waitForSelector('[class^="fooddetails-food-panel"]');


console.log('直接选一个菜品吧');
await page.tap('[class^="fooddetails-cart-button"]');

// console.log('===为了看清楚，傲娇地等两秒===');
await page.waitFor(2000);
await page.tap('[class^=submit-btn-submitbutton]');

// 关闭浏览器
await browser.close();

```

<p>关键步骤是：</p>
<ul>
<li>加载页面</li>
<li>等待需要点击的 DOM 渲染出来后点击</li>
<li>继续等待下一步需要点击的 DOM 渲染出来再点击</li>
</ul>
<p>关键的几个指令：</p>
<ul>
<li><code>page.tap</code>(或 <code>page.click</code>) 为点击</li>
<li><code>page.waitForSelector</code> 意思是等待指定元素出现在网页中，如果已经出现了，则立即继续执行下去, 后面跟的参数为 <code>selector</code> 选择器，与我们常用的 <code>document.querySelector</code> 接收的参数一致</li>
<li><code>page.waitFor</code> 后面可以传入 <code>selector</code> 选择器、<code>function</code> 函数或 <code>timeout</code> 毫秒时间，如 <code>page.waitFor(2000)</code> 指等待2秒再继续执行，例子中用这个函数暂停操作主要是为了演示</li>
</ul>
<p>以上几个指令都可接受一个 <code>selector</code> 选择器作为参数，这里额外介绍几个方法：</p>
<ul>
<li><code>page.$(selector)</code> 与我们常用的 <code>document.querySelector(selector)</code> 一致，返回的是一个 <code>ElementHandle</code> 元素句柄</li>
<li><code>page.?(selector)</code> 与我们常用的 <code>document.querySelectorAll(selector)</code> 一致，返回的是一个数组</li>
</ul>
<p>在有头浏览器上下文中，我们选择一个元素的方法是：</p>


```ini
const body = document.querySelector('body');
const bodyInnerHTML = body.innerHTML;
console.log('bodyInnerHTML: ', bodyInnerHTML);

```

<p>而在无头浏览器里，我们首先需要获取一个句柄，通过句柄获取到环境中的信息后，销毁这个句柄。</p>


```javascript
// 获取 html
// 获取上下文句柄
const bodyHandle = await page.$('body');
// 执行计算
const bodyInnerHTML = await page.evaluate(dom =&gt; dom.innerHTML, bodyHandle);
// 销毁句柄
await bodyHandle.dispose();
console.log('bodyInnerHTML:', bodyInnerHTML);

```

<p>除此之外，还可以使用 <code>page.$eval</code>:</p>


```ini
const bodyInnerHTML = await page.$eval('body', dom =&gt; dom.innerHTML);
console.log('bodyInnerHTML: ', bodyInnerHTML);

```

<p><code>page.evaluate</code> 意为在浏览器环境执行脚本，可传入第二个参数作为句柄，而 <code>page.$eval</code> 则针对选中的一个 DOM 元素执行操作。</p>
<p><a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flaispace%2Fpuppeteer-explore%2Fblob%2Fmaster%2Fdemo%2Fcraw-spa.js" title="https://github.com/laispace/puppeteer-explore/blob/master/demo/craw-spa.js" ref="nofollow noopener noreferrer">完整示例代码</a></p>


### 导出批量网页：下载图灵图书

            
<p>我在 <a target="_blank" href="https://link.juejin.cn?target=http%3A%2F%2Fwww.ituring.com.cn%2F" title="http://www.ituring.com.cn/" ref="nofollow noopener noreferrer">图灵社区</a> 上买了不少电子书，以前支持推送到 <code>mobi</code> 格式到 <code>kindle</code> 或推送 <code>pdf</code> 格式到邮箱进行阅读，不过经常会关闭这些推送渠道，只能留在网页上看书。</p>
<p>对我来说不是很方便，而这些书籍的在线阅读效果是服务器渲染出来的(带了大量标签，无法简单抽取出好的排版)，最好的方式当然是直接在线阅读并保存为 pdf 或图片了。</p>
<p>借助浏览器的无头模式，我写了个简单的下载已购买书籍为 <code>pdf</code> 到本地的脚本，支持批量下载已购买的书籍。</p>
<p>使用方法，传入帐号密码和保存路径，如：</p>


```shell
$ node ./demo/download-ituring-books.js '用户名' '密码' './books'

```

<p>注意：<code>puppeteer</code> 的 <code>Page.pdf()</code> 目前仅支持在无头模式中使用，所以要想看有头状态的抓取过程的话，执行到 <code>Page.pdf()</code> 这步会先报错：</p>
<p></p><figure><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/17/d883be51a6fa2d9ea6147a56a90ddc13~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" loading="lazy"><figcaption></figcaption></figure><p></p>
<p>所以启动这个脚本时，需要保持无头模式：</p>


```csharp
const browser = await puppeteer.launch({
    // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
    // 注意若调用了 Page.pdf 即保存为 pdf，则需要保持为无头模式
    // headless: false,
});

```

<p>看下执行效果：</p>
<p></p><figure><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/17/711bb9a2fe9c0b2d5dacb15048629da2~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" loading="lazy"><figcaption></figcaption></figure><p></p>
<p>我的书架里有20多本书，下载完后是这样子：</p>
<p></p><figure><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/17/17b7a81a75ae93a2a69ec8ae097dcf5d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" loading="lazy"><figcaption></figcaption></figure><p></p>
<p><a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flaispace%2Fpuppeteer-explore%2Fblob%2Fmaster%2Fdemo%2Fdownload-ituring-books.js" title="https://github.com/laispace/puppeteer-explore/blob/master/demo/download-ituring-books.js" ref="nofollow noopener noreferrer">完整示例代码</a></p>


## 无头浏览器还能做什么？

            
<p>无头浏览器说白了就是能模拟人工在有头浏览器中的各种操作。那自然很多人力活，都能使用无头浏览器来做(比如上面这个下载 pdf 的过程，其实是人力打开每一个文章页面，然后按 <code>ctrl+p</code> 或 <code>command+p</code> 保存到本地的自动化过程)。</p>
<p>那既然用自动化工具能解决的事情，就不应该浪费重复的人力劳动了，除此之外我们还可以做：</p>
<ul>
<li>自动化工具
如自动提交表单，自动下载</li>
<li>自动化 UI 测试
如记录下正确 DOM 结构或截图，然后自动执行指定操作后，检查 DOM 结构或截图是否匹配(UI 断言)</li>
<li>定时监控工具
如定时截图发周报，或定时巡查重要业务路径下的页面是否处于可用状态，配合邮件告警</li>
<li>爬虫
如传统 HTTP 爬虫爬不到的地方，就可配合无头浏览器渲染能力来做</li>
<li>etc</li>
</ul>
<blockquote>
<p>感兴趣的同学可以关注专栏或者发送简历至'qingsheng.lqs####alibaba-inc.com'.replace('####', '@')，欢迎有志之士加入~</p>
</blockquote>
<p>原文地址：<a target="_blank" href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FProtoTeam%2Fblog%2Fblob%2Fmaster%2F201710%2F2.md" title="https://github.com/ProtoTeam/blog/blob/master/201710/2.md" ref="nofollow noopener noreferrer">github.com/ProtoTeam/b…</a></p>
</div>
