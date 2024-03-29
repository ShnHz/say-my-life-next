---
title: 写html页面没意思，来挑战chrome插件开发
date: 2024/03/29 18:04:18
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js","tool","css"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7350571075548397618)

<p>谷歌浏览器插件开发是指开发可以在谷歌浏览器中运行的扩展程序，可以为用户提供额外的功能和定制化的体验。<strong>谷歌浏览器插件通常由HTML、CSS和JavaScript组成，非常利于前端开发者。</strong>
开发者可以利用这些技术在浏览器中添加新的功能、修改现有功能或者与网页进行交互。</p>
<p>要开发谷歌浏览器插件，开发者通常需要创建一个包含*清单文件（manifest.json）、背景脚本（background script）、内容脚本（content script）*等文件的项目结构。清单文件是插件的配置文件，包含插件的名称、版本、描述、权限以及其他相关信息。背景脚本用于处理插件的后台逻辑，而内容脚本则用于在网页中执行JavaScript代码。</p>
<p>谷歌浏览器插件可以实现各种功能，例如添加新的工具栏按钮、修改网页内容、捕获用户输入、与后台服务器进行通信等。开发者可以通过谷歌浏览器插件API来访问浏览器的各种功能和数据，实现各种定制化的需求。
插件开发涉及的要点：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9729b88bf4014fc2b93f1076fc710b56~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1538&amp;h=752&amp;s=121589&amp;e=png&amp;b=ffffff" alt="image.png" loading="lazy"></p>


## 基础配置

            
<p>开发谷歌浏览器插件，最重要的文件 <code>manifest.json</code></p>


```json
{
  "name": "Getting Started Example",  // 插件名称
  "description": "Build an Extension!", // 插件描述
  "version": "1.0", // 版本
  "manifest_version": 3, // 指定插件版本，这个很重要，指定什么版本就用什么样的api，不能用错了
  "background": {
    "service_worker": "background.js" // 指定background脚本的路径
  },
  "action": {
    "default_popup": "popup.html", // 指定popup的路径
    "default_icon": {  // 指定popup的图标，不同尺寸
      "16": "/images/icon16.png",
      "32": "/images/icon32.png",
      "48": "/images/icon48.png",
      "128": "/images/icon128.png"
    }
  },
  "icons": { // 指定插件的图标，不同尺寸
    "16": "/images/icon16.png",
    "32": "/images/icon32.png",
    "48": "/images/icon48.png",
    "128": "/images/icon128.png"
  },
  "permissions": [],// 指定应该在脚本中注入那些变量方法，后文再详细说
  "options_page": "options.html",
  "content_scripts": [ // 指定content脚本配置
    {
      "js": [ "content.js"], // content脚本路径
      "css":[ "content.css" ],// content的css
      "matches": ["&lt;all_urls&gt;"] // 对匹配到的tab起作用。all_urls就是全部都起作用
    }
  ]
}

```


<ul>
<li>name: 插件名称</li>
</ul>
<p>manifest_version：对应chrome API插件版本,浏览器插件采用的版本，目前共2种版本，是2和最新版3</p>
<ul>
<li>version： 本插件的版本，和发布相关</li>
<li>action：点击图标时，设置一些交互
<ul>
<li>default_icon：展示图标
<ul>
<li>16、32、48、128</li>
</ul>
</li>
<li>default_popup：popup.html，一个弹窗页面</li>
<li>default_title：显示的标题</li>
</ul>
</li>
<li>permissions：拥有的权限
<ul>
<li>tabs：监听浏览器tab切换事件</li>
</ul>
</li>
<li>options_ui</li>
<li>background：
<ul>
<li>service_worker：设置打开独立页面</li>
</ul>
</li>
</ul>
<p><strong><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FGoogleChrome%2Fchrome-extensions-samples%2Ftree%2F7b66cabcb1a7cf72f62dcc5045f630c37cbc9762%2Ffunctional-samples" target="_blank" title="https://github.com/GoogleChrome/chrome-extensions-samples/tree/7b66cabcb1a7cf72f62dcc5045f630c37cbc9762/functional-samples" ref="nofollow noopener noreferrer">官方实例</a></strong></p>
<p><strong><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fget-started%2Ftutorial%2Fhello-world%3Fhl%3Dzh-cn" target="_blank" title="https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=zh-cn" ref="nofollow noopener noreferrer">官方教程</a></strong></p>


## 打开pop弹窗页面

            
<p>设置action的default_popup属性</p>


```json
{
  "name": "Hello world",
  "description": "show 'hello world'!",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "/images/icon16.png",
      "32": "/images/icon32.png",
      "48": "/images/icon48.png",
      "128": "/images/icon128.png"
    }
  },
  "permissions":["tabs", "storage", "activeTab", "idle"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "js": [ "content.js"],
      "css":[ "content.css" ],
      "matches": ["&lt;all_urls&gt;"]
    }
  ]
}

```




### 创建popup.html

            


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;显示出hello world&lt;/title&gt;
    &lt;link rel="stylesheet" type="text/css" href="popup.css"&gt;
  &lt;/head&gt;

  &lt;body&gt;
    &lt;h1&gt;显示出hello world&lt;/h1&gt;
    &lt;button id="clickBtn"&gt;点击按钮&lt;/button&gt;
    &lt;script src="popup.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;

```


<p>文件可以通过链接引入css、js。</p>


```css
body {
    width: 600px;
    height: 300px;
}
h1 {
    background-color: antiquewhite;
    font-weight: 100;
}


```




```javascript
console.log(document.getElementById('clickBtn'));
document.getElementById('clickBtn').addEventListener('click', function () {
  console.log('clicked');
});

```




### 点击插件图标

            
<p>点击图标可以看到如下的popup的页面。</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c96f4a799eb432cb33b133c7e44067b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1502&amp;h=796&amp;s=216416&amp;e=png&amp;b=fefbfb" alt="image.png" loading="lazy"></p>


### 调试popup.js的方法

            
<ul>
<li>通过弹窗，在弹窗内部点击右键，选择审查内容
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdb9d68109864140b47cace5ae569815~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1234&amp;h=626&amp;s=78665&amp;e=png&amp;b=fefafa" alt="image.png" loading="lazy"></li>
<li>通过插件图标，进行点击鼠标右键，选择审查弹出内容
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64e9e274cec44aa9be20593204ba6600~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=426&amp;h=636&amp;s=72646&amp;e=png&amp;b=fbfbfb" alt="image.png" loading="lazy"></li>
</ul>


## 通过background打开独立页面

            
<p>基于<code>background</code>的<code>service_worker</code>API可以打开一个独立后台运行脚本。此脚本会随着插件安装，初始化执行一次，然后一直在后台运行。可以用来存储浏览器的全局状态数据。
background脚本是长时间运行在后台，随着浏览器打开就运行，直到浏览器关闭而结束运行。通常把需要一直运行的、启动就运行的、全局公用的数据放到background脚本。</p>


```javascript
chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({
    url: chrome.runtime.getURL('newPage.html')
  });
});


```


<p>为了打开独立页面，需要修改<code>manifest.json</code></p>


```json
{
  "name": "newPage",
  "description": "Demonstrates the chrome.tabs API and the chrome.windows API by providing a user interface to manage tabs and windows.",
  "version": "0.1",
  "permissions": ["tabs"],
  "background": {
    "service_worker": "service-worker.js"
  },
  "action": {
    "default_title": "Show tab inspector"
  },
  "manifest_version": 3
}

```


<p>为了实现打开独立页面，在manifest.json中就不能在配置 <code>action:default_popup</code>
在<code>newPage.js</code>文件中可以使用*<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fapi%2Ftabs%3Fhl%3Dzh-cn" target="_blank" title="https://developer.chrome.com/docs/extensions/reference/api/tabs?hl=zh-cn" ref="nofollow noopener noreferrer">chrome.tabs</a>*和<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fapi%2Fwindows%3Fhl%3Dzh-cn" target="_blank" title="https://developer.chrome.com/docs/extensions/reference/api/windows?hl=zh-cn" ref="nofollow noopener noreferrer">chrome.windows</a>API；
可以使用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fapi%2Fruntime%3Fhl%3Dzh-cn%23method-getURL" target="_blank" title="https://developer.chrome.com/docs/extensions/reference/api/runtime?hl=zh-cn#method-getURL" ref="nofollow noopener noreferrer">chrome.runtime.getUrl</a> 跳转一个页面。</p>


```javascript
chrome.runtime.onInstalled.addListener(async () =&gt; {
  chrome.tabs.create(
    {
      url: chrome.runtime.getURL('newPage.html'),
    }
  );
});

```




## content内容脚本

            
<p>content-scripts（内容脚本）是在网页上下文中运行的文件。通过使用标准的文档对象模型(DOM)，它能够<code>读取浏览器访问的网页的详细信息</code>，可以对打开的页面进行更改，还可以将DOM信息传递给其父级插件。内容脚本相对于background还是有一些访问API上的限制，它可以直接访问以下chrome的API</p>
<ul>
<li>i18n</li>
<li>storage</li>
<li>runtime:
<ul>
<li>connect</li>
<li>getManifest</li>
<li>getURL</li>
<li>id</li>
<li>onConnect</li>
<li>onMessage</li>
<li>sendMessage</li>
</ul>
</li>
</ul>
<p><code>content.js</code>运行于一个独立、隔离的环境，它不会和主页面的脚本或者其他插件的内容脚本发生冲突
有2种方式添加content脚本</p>


### 在配置中设置

            


```json
"content_scripts": [
  {
    "js": [ "content.js"],
    "css":[ "content.css" ],
    "matches": ["&lt;all_urls&gt;"]
  }
]

```


<p>content_scripts属性除了配置js，还可以设置css样式，来实现修改页面的样式。
matches表示需要匹配的页面；
除了这3个属性，还有</p>
<ul>
<li>run_at: 脚本运行时刻，有以下3个选项
<ul>
<li>document_idle，默认；浏览器会选择一个合适的时间注入，并是在dom完成加载</li>
<li>document_start；css加载完成，dom和脚本加载之前注入。</li>
<li>document_end：dom加载完成之后</li>
</ul>
</li>
<li>exclude_matches：排除匹配到的url地址。作用和matches相反。</li>
</ul>


### 动态配置注入

            
<p>在特定时刻才进行注入，比如点击了某个按钮，或者指定的时刻
需要在<code>popup.js</code>或<code>background.js</code>中执行注入的代码。</p>


```javascript
chrome.tabs.executeScript(tabs[0].id, {
  code: 'document.body.style.backgroundColor = "red";',
});

```


<p>也可以将整个content.js进行注入</p>


```javascript
chrome.tabs.executeScript(tabs[0].id, {
  file: "content.js",
});

```




### 利用content制作一个弹窗工具

            
<p>某天不小心让你的女神生气了，为了能够道歉争取到原谅，你是否可以写一个道歉信贴到每一个页面上，当女神打开网站，看到每个页面都会有道歉内容。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f9a304c1b6a4e84b587588ffdd65876~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=670&amp;h=458&amp;s=23731&amp;e=png&amp;b=eee5d8" alt="image.png" loading="lazy"></p>
<p>道歉信内容自己写哈，这个具体看你的诚意。
下面设置2个按钮，原谅和不原谅。 点击原谅，就可以关闭弹窗。 点击不原谅，这个弹窗调整css布局位置继续显示。（有点像恶意贴片广告了）</p>
<p>下面设置content.js的内容</p>


```js
let newDiv = document.createElement('div');
newDiv.innerHTML = `&lt;div id="wrapper"&gt;
  &lt;h3&gt;小仙女～消消气&lt;/h3&gt;
  &lt;div&gt;&lt;button id="cancel"&gt;已消气&lt;/button&gt;
  &lt;button id="reject"&gt;不原谅&lt;/button&gt;&lt;/div&gt;
&lt;/div&gt;`;
newDiv.id = 'newDiv';
document.body.appendChild(newDiv);
const cancelBtn = document.querySelector('#cancel');
const rejectBtn = document.querySelector('#reject');
cancelBtn.onclick = function() {
  document.body.removeChild(newDiv);
  chrome.storage.sync.set({ state: 'cancel' }, (data) =&gt; {
  });
}
rejectBtn.onclick = function() {
  newDiv.style.bottom = Math.random() * 200 + 10 + "px";
  newDiv.style.right = Math.random() * 800 + 10 + "px";
}
// chrome.storage.sync.get({ state: '' }, (data) =&gt; {
//   if (data.state === 'cancel') {
//     document.body.removeChild(newDiv);
//   }
// });

```


<p>content.css布局样式</p>


```css
#newDiv {
  font-size: 36px;
  color: burlywood;
  position: fixed;
  bottom: 20px;
  right: 0;
  width: 300px;
  height: 200px;
  background-color: rgb(237, 229, 216);
  text-align: center;
  z-index: 9999;
}

```




## 打开option页面

            
<p>options页，就是插件的设置页面，有2个入口</p>
<ul>
<li>1:点击插件详情，找到扩展程序选项入口</li>
</ul>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/432ac78d8afa44abbc99eb09a0df77e8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1504&amp;h=592&amp;s=110751&amp;e=png&amp;b=666666" alt="image.png" loading="lazy"></p>
<ul>
<li>2插件图标，点击右键，选择 ‘选项’ 菜单</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/122c46f2967745678db6c19be25a1a9d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=354&amp;h=620&amp;s=61102&amp;e=png&amp;b=fbfbfb" alt="image.png" loading="lazy"></p>
<p>可以看到设置的option.html页面</p>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;插件的option配置&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h3&gt;插件的option配置&lt;/h3&gt;
&lt;/body&gt;
&lt;/html&gt;

```


<p>此页面也可以进行js、css的引入。</p>


## 替换浏览器默认页面

            
<p>override功能，是可以替换掉浏览器默认功能的页面，可以替换newtab、history、bookmark三个功能，将新开页面、历史记录页面、书签页面设置为自定义的内容。
修改<code>manifest.json</code>配置</p>


```json
{
  "chrome_url_overrides": {
    "newtab": "newtab.html",
    "history": "history.html",
    "bookmarks": "bookmarks.html"
  }
}

```


<p>创建一个newtab的html页面</p>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;new tab&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;

```


<p>插件更新后，点开新的tab，就会出现我们自定义的页面。第一次的情况会让用户进行选择，是进行更换还是保留原来的配置。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/987120dcfdf64ec5a01d711c5ef0df87~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1500&amp;h=682&amp;s=85288&amp;e=png&amp;b=d1d1d1" alt="image.png" loading="lazy">
很多插件都是使用newtab进行自定义打开的tab页，比如掘金的浏览器插件，打开新页面就是<a href="https://juejin.cn/extension?utm_source=jj_nav" target="_blank" title="https://juejin.cn/extension?utm_source=jj_nav">掘金网站插件</a>。</p>


## 页面之间进行数据通信

            
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01c8fa5e65e847a9b09d396fdd090aaa~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1500&amp;h=870&amp;s=267530&amp;e=png&amp;b=fefefe" alt="image.png" loading="lazy">
如需将单条消息发送到扩展程序的其他部分并选择性地接收响应，请调用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fapi%2Fruntime%3Fhl%3Dzh-cn%23method-sendMessage" target="_blank" title="https://developer.chrome.com/docs/extensions/reference/api/runtime?hl=zh-cn#method-sendMessage" ref="nofollow noopener noreferrer">runtime.sendMessage()</a> 或 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Freference%2Fapi%2Ftabs%3Fhl%3Dzh-cn%23method-sendMessage" target="_blank" title="https://developer.chrome.com/docs/extensions/reference/api/tabs?hl=zh-cn#method-sendMessage" ref="nofollow noopener noreferrer">tabs.sendMessage()</a>。通过这些方法，您可以从内容脚本向扩展程序发送一次性 JSON 可序列化消息，或者从扩展程序向内容脚本发送。如需处理响应，请使用返回的 promise。
来源地址：<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fdevelop%2Fconcepts%2Fmessaging%3Fhl%3Dzh-cn%23simple" target="_blank" title="https://developer.chrome.com/docs/extensions/develop/concepts/messaging?hl=zh-cn#simple" ref="nofollow noopener noreferrer">developer.chrome.com/docs/extens…</a></p>


### content中脚本发送消息

            
<p><code>chrome.runtime.sendMessage</code>只能放在content的脚本中。</p>


```javascript
(async () =&gt; {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();

```




### 其他页面发送消息

            
<p>其他页面需向内容脚本发送请求，请指定请求应用于哪个标签页，如下所示。此示例适用于 Service Worker、弹出式窗口和作为标签页打开的 chrome-extension:// 页面</p>


```javascript
(async () =&gt; {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();

```




### 接收消息使用onMessage

            
<p>在扩展程序和内容脚本中使用相同的代码</p>


```javascript
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);

```




## 添加右键菜单

            


### 创建菜单

            
<p>首先在<code>manifest.json</code>的权限中添加配置</p>


```json
{
  "permissions": ["contextMenus"]
}


```


<p>在<code>background.js</code>中添加创建菜单的代码</p>


```javascript
let menu1 = chrome.contextMenus.create({
  type: 'radio', // 可以是 【normal、checkbox、radio】，默认是normal
  title: 'click me',
  id: "myMenu1Id",
  contexts:['image'] // 只有是图片时，菜显示
}, function(){
  
})

let menu2 = chrome.contextMenus.create({
  type: 'normal', // 可以是 【normal、checkbox、radio】，默认是normal
  title: 'click me222',
  id: "myMenu222Id",
  contexts:['all'] //所有类型都显示
}, function(){
  
})

let menu3 = chrome.contextMenus.create({
  id: 'baidusearch1',
  title: '使用百度搜索：%s', 
  contexts: ['selection'], //选择页面上的文字
});

// 删除一个菜单
chrome.contextMenus.remove('myMenu222Id'); // 被删除菜单的id menuItemId
// 删除所有菜单
chrome.contextMenus.removeAll();

// 绑定菜单点击事件
chrome.contextMenus.onClicked.addListener(function(info, tab){
  if(info.menuItemId == 'myMenu222Id'){
    console.log('xxx')
  }
})

```


<p>以下是其他可以使用的api</p>


```javascript
// 删除某一个菜单项
chrome.contextMenus.remove(menuItemId)；
// 删除所有自定义右键菜单
chrome.contextMenus.removeAll();
// 更新某一个菜单项
chrome.contextMenus.update(menuItemId, updateProperties);
// 监听菜单项点击事件, 这里使用的是 onClicked
chrome.contextMenus.onClicked.addListener(function(info, tab)) {
  //...
});

```




### 绑定点击事件，发送接口请求

            
<p>首先需要在<code>manifest.json</code>的<code>hosts_permissions</code>中添加配置</p>


```javascript
{
  "host_permissions": ["http://*/*", "https://*/*"]
}

```


<p>创建node服务器，返回json数据</p>


```javascript
// server.mjs
const { createServer } = require('node:http');
const url = require('url');

const server = createServer((req, res) =&gt; {
  var pathname = url.parse(req.url).pathname;

  if (pathname.includes('api')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(
      JSON.stringify({
        name: 'John Doe',
        age: 30,
      })
    );
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n' + pathname);
  }
});

server.listen(8080, '127.0.0.1', () =&gt; {
  console.log('Listening on 127.0.0.1:8080');
});

```


<p>编辑<code>background.js</code>文件</p>


```javascript
// 插件右键快捷键
// 点击右键进行选择
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'group1') {
    console.log('分组文字1', info);
  }
  if (info.menuItemId === 'group2') {
    console.log('分组文字2');
  }
  // 点击获取到数据
  if (info.menuItemId === 'fetch') {
    console.log('fetch 获取数据');
    const res = fetch('http://localhost:8080/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) =&gt; {
      console.log(res, '获取到http://localhost:8080/api接口数据');
      chrome.storage.sync.set({ color: 'red' }, function (err, data) {
        console.log('store success!');
      });
    });
  }
  // 创建百度搜索,并跳转到搜索结果页
  if (info.menuItemId === 'baidusearch1') {
    // console.log(info, tab, "baidusearch1")
    // 创建一个新的tab页面
    chrome.tabs.create({
      url:
        'https://www.baidu.com/s?ie=utf-8&amp;wd=' + encodeURI(info.selectionText),
    });
  }
});

// 创建右键快捷键
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  let contexts = [
    'page',
    'selection',
    'link',
    'editable',
    'image',
    'video',
    'audio',
  ];
  // for (let i = 0; i &lt; contexts.length; i++) {
  //   let context = contexts[i];
  //   let title = "Test '" + context + "' menu item";
  //   chrome.contextMenus.create({
  //     title: title,
  //     contexts: [context],
  //     id: context,
  //   });
  // }

  // Create a parent item and two children.
  let parent = chrome.contextMenus.create({
    title: '操作数据分组',
    id: 'parent',
  });
  chrome.contextMenus.create({
    title: '分组1',
    parentId: parent,
    id: 'group1',
  });
  chrome.contextMenus.create({
    title: '分组2',
    parentId: parent,
    id: 'group2',
  });
  chrome.contextMenus.create({
    title: '获取远程数据',
    parentId: parent,
    id: 'fetch',
  });

  // Create a radio item.
  chrome.contextMenus.create({
    title: '创建单选按钮1',
    type: 'radio',
    id: 'radio1',
  });
  chrome.contextMenus.create({
    title: '创建单选按钮2',
    type: 'radio',
    id: 'radio2',
  });

  // Create a checkbox item.
  chrome.contextMenus.create({
    title: '可以多选的复选框1',
    type: 'checkbox',
    id: 'checkbox',
  });
  chrome.contextMenus.create({
    title: '可以多选的复选框2',
    type: 'checkbox',
    id: 'checkbox2',
  });

  // 在title属性中有一个%s的标识符，当contexts为selection，使用%s来表示选中的文字
  chrome.contextMenus.create({
    id: 'baidusearch1',
    title: '使用百度搜索：%s',
    contexts: ['selection'],
  });

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  chrome.contextMenus.create(
    { title: 'Oops', parentId: 999, id: 'errorItem' },
    function () {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
});

```


<p>点击鼠标右键，效果如下</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03f423e259124663aa8bee83aacb714e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=764&amp;h=298&amp;s=120395&amp;e=png&amp;b=eae6e5" alt="image.png" loading="lazy"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f523bd805b564f4d9d1b3bf36142eabe~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=958&amp;h=288&amp;s=136170&amp;e=png&amp;b=e5e1e5" alt="image.png" loading="lazy"></p>
<p>如果在页面选择几个文字，那么就显示出百度搜索快捷键，</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3655c6c896b4962a6b7f4821e9056b6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=734&amp;h=258&amp;s=71727&amp;e=png&amp;b=ece4e7" alt="image.png" loading="lazy"></p>


## 缓存，数据存储

            
<p>首先在<code>manifest.json</code>的权限中添加<code>storage</code>配置</p>


```json
{
  "permissions": ["storage"]
}

```




```javascript
chrome.storage.sync.set({color: 'red'}, function(){
  console.log('background js storage set data ok!')
})

```


<p>然后就可以在content.js或popup.js中获取到数据</p>


```javascript
// 这里的参数是，获取不到数据时的默认参数
chrome.storage.sync.get({color: 'yellow'}, function(){
  console.log('background js storage set data ok!')
})

```




## tabs创建页签

            
<p>首先在<code>manifest.json</code>的权限中添加tabs配置</p>


```json
{
  "permissions": ["tabs"]
}

```


<p>添加tabs的相关操作</p>


```javascript
chrome.tabs.query({}, function(tabs){
  console.log(tabs)
})
function getCurrentTab(){
  let [tab] = chrome.tabs.query({active: true, lastFocusedWindow: true});
  return tab;
}

```




## notifications消息通知

            
<p>Chrome提供chrome.notifications的API来推送桌面通知；首先在manifest.json中配置权限</p>


```json
{
  "permissions": [
    "notifications"
  ],
}

```


<p>然后在background.js脚本中进行创建</p>


```javascript
// background.js
chrome.notifications.create(null, {
  type: "basic",
  iconUrl: "drink.png",
  title: "喝水小助手",
  message: "看到此消息的人可以和我一起来喝一杯水",
});


```




## devtools开发扩展工具

            
<p>在manifest中配置一个devtools.html</p>


```json
{
  "devtools_page": "devtools.html",
}

```


<p>devtools.html中只引用了devtools.js，如果写了其他内容也不会展示</p>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt; &lt;/head&gt;
  &lt;body&gt;
    &lt;script type="text/javascript" src="./devtools.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;

```


<p>创建devtools.js文件</p>


```javascript
// devtools.js
// 创建扩展面板
chrome.devtools.panels.create(
  // 扩展面板显示名称
  "DevPanel",
  // 扩展面板icon，并不展示
  "panel.png",
  // 扩展面板页面
  "Panel.html",
  function (panel) {
    console.log("自定义面板创建成功！");
  }
);

// 创建自定义侧边栏
chrome.devtools.panels.elements.createSidebarPane(
  "Sidebar",
  function (sidebar) {
    sidebar.setPage("sidebar.html");
  }
);

```


<p>然后在创建自定的Panel.html和sidebar.html页面。</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgitee.com%2Fshenshuai89%2Flearn-chrome-extension" target="_blank" title="https://gitee.com/shenshuai89/learn-chrome-extension" ref="nofollow noopener noreferrer">相关代码下载</a></p>
