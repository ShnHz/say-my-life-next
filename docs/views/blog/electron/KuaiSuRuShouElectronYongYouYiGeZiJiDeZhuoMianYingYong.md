---
title: 快速入手Electron，拥有一个自己的桌面应用
date: 2023/02/16 13:05:24
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

###### 原文 [掘金](https://juejin.cn/post/7015476516196712462)

<div class="markdown-body cache"><blockquote>
<p>前言</p>
</blockquote>
<p>小浪学习<code>electron</code>的原因是软件构造课需要交一个软件作业，不想用<code>java</code>写，还不能是网页，一开始想到的是用<code>uniapp</code>写个项目打包成<code>APP</code>，然后想了想，一直听说 <code>electron</code> 可以把前端页面(<code>原生</code>/<code>h5</code>/<code>vue</code>/<code>react</code>...)打包成桌面应用，把前端页面当做<code>GUI</code>这岂不是很<code>Nice</code>,<code>Typora</code> 就是 <code>electron</code> 做的，很好奇，就去学学看，下面是小浪学习 <code>electron</code> 的笔记，希望能给大家一点帮助，学习 <code>electron</code> 教程好像很多，但是还是官方文档比较清晰全面，有可能你在视频教程里看见的能使用的，自己去敲的时候发现各种问题，还以为是自己哪里拼错了，一看是官方文档更新了...</p>


## 1.基础使用

            
<p>要想弄个桌面端的应用，那我们得快速的去了解它</p>


### 1.1终端乱码问题

            
<blockquote>
<p><code>tip</code>: electron 控制打印会出现中文乱码</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/415ede9a1d404238b155cab94420d9f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211004134055911" loading="lazy"></p>
<p>只需要在终端（<code>cmd</code>）输入   <code>chcp 65001</code> 运行下就行了</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cc9e6036f4949e5becdd4c2bec3badb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211004134132071" loading="lazy"></p>


### 1.2安装

            


```bash
// 如果没有node 的话先装 node
http://nodejs.cn/download/

// 在当前目录安装最新
npm i -D electron

// 全局安装最新
cnpm install electron -g

// 当然你可以指定版本号安装
npm i -D electron@11.0.4

```


<p><code>node -v</code> <code>electron -v</code>查看是否安装成功</p>


### 1.3快速创建

            
<blockquote>
<p>开始创建一个 electron</p>
</blockquote>
<ul>
<li>首先说下目录必须包括：<code>package.json</code> 这个文件</li>
<li>然后要有个入口文件下面这个例子我用 <code>index.js</code>举例，不过一般写成 <code>main.js</code>比较好</li>
<li>起码你需要个展示的GUI界面，一般是前端页面，也可以直接放个网址</li>
</ul>
<p>新建一个目录(项目):</p>
<p>初始化<code>package.json</code>文件</p>


```bash
npm init

```


<p>描述记得写，这个<code>electron</code> 打包的时候我记得需要描述</p>
<p>启动命令写 <code>"test": "nodemon --watch index.js --exec electron ."</code> ，这样子最后在终端输入 <code>npm test</code>这样每次修改<code>index.js</code> 主进程文件都会重新启动项目了，<code>index.js</code>可以自行修改 <code>main.js</code>等等</p>
<p>来看看最后的的 <code>package.json</code>文件吧</p>


```js
// package.json 文件

{
  "name": "electron_demo",
  "version": "1.0.0",
  "description": "\"这是一个electron demo\"",
  "main": "index.js",
  "scripts": {
    "test": "nodemon --watch index.js --exec electron ."
  },
  "author": "",
  "license": "ISC"
}


```


<p>我的目录下放了以下几个文件</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c71f4ff2f1af4b369da5a8faf9ca4aaa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211002115657083" loading="lazy"></p>
<p><code>electron</code> 分为两个进程 <strong>主进程</strong> 和 <strong>渲染进程</strong></p>
<blockquote>
<p><code>index.js</code> 这个文件是 <strong>主进程</strong></p>
</blockquote>
<p>官方是这样写的</p>


```js
const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () =&gt; {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () =&gt; {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。

```


<p>我看其他人差不多是这样写的</p>


```js
const { app, BrowserWindow } = require('electron')
let win
// 监听electron 加载完毕的时候的创建窗口等等
app.on('ready', function () {
    // 创建一个窗口 设置属性
    win = new BrowserWindow({
    //fullscreen: true   //全屏
    //frame: false,   	//让桌面应用没有边框，这样菜单栏也会消失
    resizable: false,   //不允许用户改变窗口大小
    width: 800,         //设置窗口宽高
    height: 600,
    icon: iconPath,     //应用运行时的标题栏图标
    minWidth: 300,     // 最小宽度
    minHeight: 500,    // 最小高度
    maxWidth: 300,    // 最大宽度
    maxHeight: 600,    // 最大高度
    // 进行对首选项的设置
    webPreferences:{    
      backgroundThrottling: false,   //设置应用在后台正常运行
      nodeIntegration:true,     //设置能在页面使用nodejs的API
      contextIsolation: false,  //关闭警告信息
      //preload: path.join(__dirname, './preload.js')
    }
  })
  // 这里让主进程加载一个index.html
  win.loadFile('index.html')
  // 设置为最顶层
  //win.setAlwaysOnTop(true)
  //win.loadURL(`www.baidu.com`) 可以让主进程打开文件或者一个链接
  // 监听窗口关闭事件
  win.on('closed',()=&gt;{
      //释放win
      win = null
  })
})

// 监听所有的窗口都关闭了
app.on('window-all-closed', () =&gt; {
    
    console.log('窗口全部都关闭了')
})

```


<blockquote>
<p><code>index.html</code>是<strong>渲染进程</strong>也就是前端页面里面随便写点东西，这里相当是把前端当成 GUI 了</p>
</blockquote>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge" /&gt;
    &lt;title&gt;electron test&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    electron demo
    &lt;script&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;


```


<blockquote>
<p>这样使用 <code>npm test</code> 就可以出来这么一个界面了，<code>test</code>这个命令 是 <code>package.json</code> <code>script</code> 中配的</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72537c1239d349bd96e785df06c7364f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211003211108491" loading="lazy"></p>


## 2.Remote 模块

            
<p>在渲染进程里（比如<code>index.html</code>里面加载了一些<strong>js文件</strong>，那里面的<strong>js</strong>如果要使用到 <strong>BrowserWindow</strong> 这些属性的话就必须使用 <code>remote</code>）</p>
<p>使用 <code>remote</code> 模块, 你可以调用 <code>main</code> <strong>进程对象的方法</strong></p>


### 2.1.electron14.0之前版本使用

            
<blockquote>
<p>在主进程的窗口中加入<code>enableRemoteModule: true</code>参数才能够调用remote模块</p>
</blockquote>


```js
const { app, BrowserWindow } = require('electron')
app.on('ready', function () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //这里进行加入
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.loadFile('index.html')
  // 监听所有的窗口都关闭了
  app.on('window-all-closed', () =&gt; {
    //释放win
    win = null
    console.log('窗口全部都关闭了')
  })
})


```


<blockquote>
<p>然后在渲染进程里写，这里我直接内嵌js了</p>
</blockquote>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge" /&gt;
    &lt;title&gt;electron test&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    electron demo
    &lt;button id="btn"&gt;添加新的窗口&lt;/button&gt;
    &lt;script&gt;
      const { log } = console
      // 导入 remote 中的  BrowserWindow
      const { BrowserWindow } = require('electron').remote

      const btn = document.getElementById('btn')
      btn.onclick = () =&gt; {
        let newWin = new BrowserWindow({
          width: 800,
          height: 600,
        })
        // newWin.loadURL('www.baidu.com')
        win.loadFile('index2.html')

        newWin.on('close', () =&gt; {
          newWin = null
        })
      }
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;


```


<p>这里点击按钮，就又可以创建一个新的窗口了</p>


### 2.2.electron14.0版本API修改

            
<blockquote>
<p>但是这里是有版本的区分的，这里一开始也困扰了我很久很久...最后看了下文档<code>14.0</code>后 改了，我用的<code>15</code>。。。</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12832ff7f85c4ab89c34aaeebed3132f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211003215043335" loading="lazy"></p>
<blockquote>
<p>1.还得自行安装 <code>remote</code></p>
</blockquote>


```bash
npm i -D @electron/remote

```


<blockquote>
<p>2.主进程中导入</p>
</blockquote>


```js
app.on('ready',function(){
	require('@electron/remote/main').initialize()
})

```


<blockquote>
<p>3.渲染进程中</p>
</blockquote>


```js
//这样来引入remote
const { BrowserWindow } = require('@electron/remote') 

```




## 3.创建系统菜单

            
<blockquote>
<p>1.新建一个 menu.js</p>
</blockquote>


```js
// 1.导入 electron 中的 Menu
const { Menu } = require('electron')

// 2.创建菜单模板,数组里的每一个对象都是一个菜单
const template = [
  {
    label: '菜单一',
    // submenu 代表下一级菜单
    submenu: [
      { 
          label: '子菜单一' ,
          // 添加快捷键
          accelerator: 'ctrl+n'
      },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
  {
    label: '菜单二',
    // submenu 代表下一级菜单
    submenu: [
      { label: '子菜单一' },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
]

// 3.从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 4.设置为应用程序菜单
Menu.setApplicationMenu(myMenu)


```


<p><code>accelerator: 'ctrl+n'</code>可以指定菜单的快捷键</p>
<blockquote>
<p>2.随便写个页面</p>
</blockquote>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge" /&gt;
    &lt;title&gt;自定义菜单&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    自定义菜单
    &lt;script&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;


```


<blockquote>
<p>3.写 main.js</p>
</blockquote>


```js
// 1.引入 electron
const { app, BrowserWindow } = require('electron')
// 定义一个窗口
let win = null
// 2.引入自定义的菜单
require('./menu')

// 3.监听ready
app.on('ready', function () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  // 打开控制台
  win.webContents.openDevTools()
  win.loadFile('./index.html')
  // 4.监听窗口关闭事件
  win.on('close', () =&gt; {
    win = null
  })
})


```


<blockquote>
<p>npm test启动</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab8963721d54f73a508a93088ef71f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="46" loading="lazy"></p>


## 4.给菜单添加事件

            
<blockquote>
<p>比如给子菜单添加一个点击事件新建一个窗口</p>
</blockquote>


```js
// 1.导入 electron 中的 Menu
const { Menu, BrowserWindow } = require('electron')

// 2.创建菜单模板,数组里的每一个对象都是一个菜单
const template = [
  {
    label: '菜单一',
    // submenu 代表下一级菜单
    submenu: [
      {
        label: '子菜单一',
        // 添加点击事件
        click: () =&gt; {
          // 创建一个新的窗口
          let sonWin = new BrowserWindow({
            width: 200,
            height: 200,
          })
          sonWin.loadFile('./index2.html')
          // 为关闭的时候进行清空
          sonWin.on('close', () =&gt; {
            sonWin = null
          })
        },
      },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
  {
    label: '菜单二',
    // submenu 代表下一级菜单
    submenu: [
      { label: '子菜单一' },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ],
  },
]

// 3.从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 4.设置为应用程序菜单
Menu.setApplicationMenu(myMenu)


```


<blockquote>
<p>效果图</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68fdf9ed39c0403188c1193c1021b9b5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="47" loading="lazy"></p>
<blockquote>
<p>上面的的开发者工具和<strong>chrome/edge浏览器</strong>一样，在菜单栏的<code>View -&gt; Toggle Developer Tools</code>，或者 <code>Ctrl + Shift + I</code>就能调用出来，用来调试页面</p>
</blockquote>


## 5.使用Node.js 模块/API

            
<p>比如写个<strong>读写文件</strong>例子</p>
<p>在主线程创建窗口的时候 <code>webPreferences</code>一定在加上  <code>nodeIntegration: true</code>，<code>contextIsolation: false</code></p>
<p>这样在渲染进程才能使用<code>node</code> 的一些语法</p>
<blockquote>
<p>main.js</p>
</blockquote>


```js
// 导入 electron
const { app, BrowserWindow } = require('electron')

let mainWindow = null

app.on('ready', () =&gt; {
  // // 新建一个窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
      contextIsolation: false,
    },
  })
  // 加载渲染文件
  mainWindow.loadFile('./main.html')
  // 窗口关闭后清空变量
  mainWindow.on('close', () =&gt; {
    mainWindow = null
  })
})

```


<blockquote>
<p>main.html 主要的渲染文件</p>
</blockquote>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge" /&gt;
    &lt;title&gt;读写文件测试&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;button onclick="readFile()"&gt;读取文件&lt;/button&gt;
    &lt;button onclick="writeFile()"&gt;写入文件&lt;/button&gt;
    &lt;p id="show_file_content"&gt;页面内容&lt;/p&gt;
    &lt;script src="./index.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;


```


<blockquote>
<p>index.js 加载需要的js</p>
</blockquote>
<p>可以看出，在渲染进程中，就是<code>main.html</code> 里面加载的 <code>index.js</code> 中，既可以使用 <code>docment.getElementById</code> 这些 <code>WebAPI</code>,又能使用用 <code>node</code> 的模块进行混写</p>


```js
// 导入 node 的模块
const fs = require('fs')
const path = require('path')
const { log } = console

// 获取到文件展示的dom
const showContent = document.getElementById('show_file_content')

// 读取文件
function readFile() {
  console.log('读取文件')
  fs.readFile(path.join(__dirname, '/test.txt'), (err, data) =&gt; {
    if (err) {
      throw new Error(err, '读取文件失败')
    }
    showContent.innerText = data
  })
}
// 需要写入的内容
const content = '今天是国庆的第二天，在学 electron'

// 写入文件
function writeFile() {
  fs.writeFile(
    path.join(__dirname, '/test.txt'),
    content,
    'utf8',
    (err, data) =&gt; {
      if (err) {
        return new Error(err, '读取文件失败')
      }
      log('写入文件成功')
    }
  )
}


```


<blockquote>
<p>测试用的 txt</p>
</blockquote>


```txt
今天是国庆的第二天，在学 electron

```


<blockquote>
<p>项目的目录</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/261e3ccd1caf4d26847e861205d73278~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211002155537033" loading="lazy"></p>
<blockquote>
<p>效果图</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e392606cde154267aed6ff0c08c57c09~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="45" loading="lazy"></p>


## 6.设置无边框

            
<blockquote>
<p>在创建窗口的时候 可以设置无边框，带的菜单也消失了</p>
</blockquote>


```js
let win = new BrowserWindow({
    frame: false,   	//让桌面应用没有边框，这样菜单栏也会消失
    width: 800,         //设置窗口宽高
    height: 600,
})

```


<p>菜单其实它还在，你仍然可以通过快捷键调用出菜单，可以直接删除菜单<code>win.removeMenu()</code></p>
<blockquote>
<p>没有菜单栏怎么去拖拽窗口</p>
</blockquote>
<p>在css中你可以设置哪个可以进行拖拽/禁止拖拽</p>
<p>比如 <code>body{ -webkit-app-region: drag | no-drag;}</code></p>
<blockquote>
<p>效果图：无边框，在<code>body</code>设置可拖拽</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76910042f01a4848abb0948cdc20a828~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="44" loading="lazy"></p>


## 7.系统托盘

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7b3e10d88f54101a7889b42f01d5aa6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211004102538924" loading="lazy"></p>
<p>看到上面这个图大家都应该清楚吧，当我们关闭一个应用程序的时候，它其实关闭了，但是没有完全关闭，只是隐藏了，有的就存在系统托盘中，那么如何在<code>electron</code> 设置系统托盘呢</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Ftutorial%2Ftray" target="_blank" rel="nofollow noopener noreferrer" title="https://www.electronjs.org/docs/tutorial/tray" ref="nofollow noopener noreferrer">官方文档：Tray</a></p>
<blockquote>
<p>主进程 index.js</p>
</blockquote>
<p>在<code>electron</code> 这里一开始我就添加系统托盘，当然你可以监听窗口被关闭的时候在创建托盘</p>


```js
// 引入托盘 Tray,和 Menu 等下要创建菜单,nativeImage创建 icon图标
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')
const path = require('path')
let win, tray
app.on('ready', function () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  // 创建icon我这里使用的是一个png
  const icon = nativeImage.createFromPath(
    path.join(__dirname, '/static/icon.png')
  )
  // 实例化一个 托盘对象，传入的是托盘的图标
  tray = new Tray(icon)
  // 移动到托盘上的提示
  tray.setToolTip('electron demo is running')
  // 还可以设置 titlle
  tray.setTitle('electron demo')

  // 监听托盘右键事件
  tray.on('right-click', () =&gt; {
    // 右键菜单模板
    const tempate = [
      {
        label: '无操作',
      },
      {
        label: '退出',
        click: () =&gt; app.quit(),
      },
    ]
    //通过 Menu 创建菜单
    const menuConfig = Menu.buildFromTemplate(tempate)
    // 让我们的写的托盘右键的菜单替代原来的
    tray.popUpContextMenu(menuConfig)
  })
  //监听点击托盘的事件
  tray.on('click', () =&gt; {
    // 这里来控制窗口的显示和隐藏
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })
  win.loadFile('index.html')
})
// 监听所有的窗口都关闭了
app.on('window-all-closed', () =&gt; {
  //释放win
  win = null
  console.log('窗口全部都关闭了')
})


```


<blockquote>
<p>效果图</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7baeb0d2309f4c38bb107a22a3690f49~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="48" loading="lazy"></p>


## 8.进程间通信

            
<p><code>electron</code>中主进程和渲染进程两者之间需要通信</p>
<blockquote>
<p>官方文档：</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Fapi%2Fipc-main" target="_blank" rel="nofollow noopener noreferrer" title="https://www.electronjs.org/docs/api/ipc-main" ref="nofollow noopener noreferrer">ipcMain</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Fapi%2Fipc-renderer" target="_blank" rel="nofollow noopener noreferrer" title="https://www.electronjs.org/docs/api/ipc-renderer" ref="nofollow noopener noreferrer">ipcRenderer</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Fapi%2Fweb-contents%23contentssendchannel-args" target="_blank" rel="nofollow noopener noreferrer" title="https://www.electronjs.org/docs/api/web-contents#contentssendchannel-args" ref="nofollow noopener noreferrer">webContents</a></p>
</blockquote>
<p><strong>主线程</strong> 到 <strong>渲染线程</strong> 通过 <code>webContents.send</code> 来发送 ---&gt;<code>ipcRenderer.on</code> 来监听</p>
<p><strong>渲染线程</strong> 到 <strong>主线程</strong> 需要通过  <code>ipcRenderer.send</code>发送  ---&gt; <code>ipcMain.on</code>来监听</p>


### 8.1.主进程到渲染进程

            
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs%2Fapi%2Fweb-contents%23contentssendchannel-args" target="_blank" rel="nofollow noopener noreferrer" title="https://www.electronjs.org/docs/api/web-contents#contentssendchannel-args" ref="nofollow noopener noreferrer"><code>webContents.send(channel, ...args)</code></a></p>
<ul>
<li><code>channel</code> String</li>
<li><code>...args</code> any[]</li>
</ul>
<blockquote>
<p>主进程 <code>mian.js</code></p>
</blockquote>
<p>在主进程中使用 <code>webContents.send</code> 发送消息</p>


```js
//主进程
const { app, BrowserWindow } = require('electron')
let win
// 监听electron 加载完毕的时候的创建窗口等等
app.on('ready', function () {
  // 创建一个窗口
  win = new BrowserWindow({
    width: 800, //设置窗口宽高
    height: 600,

    // 进行对首选项的设置
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true, //设置能在页面使用nodejs的API
      contextIsolation: false, //关闭警告信息
    },
  })
  // 发送给渲染线程
  setTimeout(() =&gt; {
    win.webContents.send('mainMsg', '我是主线程发送的消息')
  }, 3000)
  // 这里让主进程加载一个main.html
  win.loadFile('main.html')
})

// 监听所有的窗口都关闭了
app.on('window-all-closed', () =&gt; {
  //释放win
  win = null
  app.quit()
  console.log('窗口全部都关闭了')
})


```


<blockquote>
<p>渲染进程 <code>main.html</code> 外链一个 <code>render.js</code></p>
</blockquote>
<p>在渲染线程中使用 <code>ipcRenderer.on</code>来进行监听</p>
<p><code>ipcRenderer.on(channel, listener)</code></p>
<ul>
<li><code>channel</code> String</li>
<li><code>listener</code> Function</li>
</ul>
<p>监听 <code>channel</code>, 当有新消息到达，使用 <code>listener(event, args...)</code> 调用 <code>listener</code> .</p>
<p>还有个监听一次的消息<code>ipcRenderer.once(channel, listener)</code></p>
<p>为这个事件添加一个一次性 <code>listener</code> 函数.这个 <code>listener</code> 将在下一次有新消息被发送到 <code>channel</code> 的时候被请求调用，之后就被删除了</p>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge" /&gt;
    &lt;title&gt;通信测试&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    通信测试
    &lt;p id="receive"&gt;接收信息&lt;/p&gt;
    &lt;script src="./render.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;


```




```js
//渲染进程

//引入ipcRenderer
const electron = require('electron')
const { ipcRenderer } = require('electron')
const { log } = console

log(ipcRenderer)
ipcRenderer.on('mainMsg', (event, task) =&gt; {
  log(task)
  document.getElementById('receive').innerText = task
})


```


<blockquote>
<p>效果图</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/087129ad564a42d8b54b1d1785710231~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="49" loading="lazy"></p>


### 8.2.渲染进程到主进程

            
<blockquote>
<p><code>render.js</code> 渲染线程中进行发送  <code>ipcRenderer.send</code></p>
</blockquote>
<p><code>ipcRenderer.send(channel[, arg1][, arg2][, ...])</code></p>
<ul>
<li><code>channel</code> String</li>
<li><code>arg</code> (可选)</li>
</ul>
<p>还有发送同步消息的<code>ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])</code></p>


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge" /&gt;
    &lt;title&gt;通信测试&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    通信测试
    &lt;p id="receive"&gt;接收信息&lt;/p&gt;
    &lt;button onclick="sendMain()"&gt;发送消息给主线程&lt;/button&gt;
    &lt;script src="./render.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;


```




```js
const electron = require('electron')
const { ipcRenderer } = require('electron')

//...

function sendMain() {
  ipcRenderer.send('task', '退出程序')
}


```


<blockquote>
<p><code>main.js</code> 主进程里面 <code>ipcMain.on</code> 进行监听，这里退出程序</p>
</blockquote>
<p><code>ipcMain.on(channel, listener)</code></p>
<ul>
<li><code>channel</code> String</li>
<li><code>listener</code> Function</li>
</ul>
<p>监听 <code>channel</code>, 当新消息到达，将通过 <code>listener(event, args...)</code> 调用 <code>listener</code>.</p>
<p>还有个 <code>ipcMain.once(channel, listener)</code>为事件添加一个一次性用的<code>listener</code> 函数.这个 <code>listener</code> 只有在下次的消息到达 <code>channel</code> 时被请求调用，之后就被删除了.</p>


```js
const { app, BrowserWindow, ipcMain } = require('electron')
// 监听electron 加载完毕的时候的创建窗口等等
app.on('ready', function () {
  //...
})

ipcMain.on('task', (event, info) =&gt; {
  if (info === '退出程序') {
    app.quit()
  }
})


```


<blockquote>
<p>效果图</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22c4401cffd7415ba5a167dc9778bd48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="50" loading="lazy"></p>
<p>这样就方便里我做一些窗口交互，比如<code>todoList</code>,到时间了右下角弹出一个新的窗口进行提醒</p>


### 8.3渲染进程到渲染进程

            
<p><code>ipcRenderer.sendTo(webContentsId, channel, ...args)</code></p>
<ul>
<li><code>webContentsId</code> Number</li>
<li><code>channel</code> String</li>
<li><code>...args</code> any[]</li>
</ul>
<p>通过 <code>channel</code> 发送消息到带有 <code>webContentsId</code> 的窗口.</p>
<p>前提是要知道对应的渲染进程的<code>ID</code></p>
<p>当然也可以让主进程作为中转站，先发到主进程在到其他的渲染进程</p>


## 9.Vue + Electron

            
<p>那么 <code>Vue</code> 怎么使用 <code>Electron</code> 打包呢？毕竟学习这个初衷，就是把 <code>Vue</code> 项目变成一个桌面应用，前面讲的都是原生的方法，那么继续往下面看吧</p>


### 9.1你需要有个Vue项目

            
<p>如果手上没有，那么用 <code>vue ui</code> 创建一个<code>Vue</code>项目/或者直接在命令行里用 <code>vue create</code> 创建</p>


```bash
vue ui

```


<p>相信大家都会，这里我就是简单用<code>vue ui</code>的建一个，这里大家可以略过</p>
<p>默认打开一个8000端口的服务，一个可视化的UI界面就出来了</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2e6923ef74c4f6ea63a1242f4666123~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005094817591" loading="lazy"></p>
<blockquote>
<p>选择左下角 更多---&gt;项目管理器</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76c99d4115fc4fa59562e91cb4f75002~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005095048918" loading="lazy"></p>
<blockquote>
<p>创建</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afac3ffe606b4b46aa755acfaa838f9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005095255377" loading="lazy"></p>
<blockquote>
<p>选择好目录后在此创建</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e5f0460dcf54e77905a256fc9656569~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005095412222" loading="lazy"></p>
<blockquote>
<p>填写一些基本信息，包管理我这里用 npm ，然后下一步</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90b600e4a09446b6996e52bf2d466ccb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005095517636" loading="lazy"></p>
<blockquote>
<p>选择预设，我这里选手动</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f993f6435df4dc1acfbaba2a455f9b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005095738225" loading="lazy"></p>
<blockquote>
<p>需要哪些插件选哪些，我这里就默认了，因为是个简单的例子</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ccff58b126f4525bc3aedae85b20d37~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005095856488" loading="lazy"></p>
<blockquote>
<p>选择 Vue 的版本2.x 还是 3这些按照你的习惯来，平时写什么选什么,下面的选项我选择的标准</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2c5865a163f451697b9b683f23e7c02~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005100020344" loading="lazy"></p>
<blockquote>
<p>创建项目</p>
</blockquote>
<p>我这里就不保存预设了，然后就是漫长的等待<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e1fba4cee344604850def265dbb9951~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005100221788" loading="lazy"></p>
<blockquote>
<p>创建完毕后运行改项目</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0711e3fde3644d1689b574ac2e353d5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005102004448" loading="lazy"></p>
<blockquote>
<p>启动项目</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36896a3101db45069c8dbd833f950a0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005102132311" loading="lazy"></p>
<p>就会得到一个这样的默认页面</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33574a90ca55482faca8c36cffbb22fb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005102159772" loading="lazy"></p>
<p>好了创建项目完毕，继续</p>


### 9.2添加 electron 插件

            
<blockquote>
<p>在插件--&gt;添加插件 搜索 <code>vue-cli-plugin-electron-builder</code>,安装第一个</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ef4ce8185e84d56b9e7378bf43633aa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005102527050" loading="lazy"></p>
<blockquote>
<p>我这里默认选择electorn 13.0.0版本</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0273671757f4d6285f2780955188d7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005102834003" loading="lazy"></p>
<blockquote>
<p>安装完成后会出现在已安装插件里面</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98682a2056cd495abd173a697421790b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005103108921" loading="lazy"></p>
<p>当然也可以在 命令行中进行安装</p>


```bash
vue add electron-builder

```




### 9.3运行

            
<blockquote>
<p>在当前vue项目下的命令行输入下面的命令运行</p>
</blockquote>


```bash
npm run electron:serve

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d5fc62b8e1b40eda84c32e1bd3c2080~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005103731994" loading="lazy"></p>
<p>很好，已经运行出来了</p>


### 9.4 package.json background.js

            
<p>查看<code>package.json</code>文件找找主进程文件在哪</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a9c7dd81b6f458bb0e26835c0c9c2b4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005104023792" loading="lazy"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33301c3825a44c6a81a1dfde40a3ad0f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005104135614" loading="lazy"></p>
<blockquote>
<p>主进程文件是 <code>background.js</code>，这个文件在 <code>Vue项目/src/下面</code></p>
</blockquote>


```js
'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () =&gt; {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () =&gt; {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () =&gt; {
  if (isDevelopment &amp;&amp; !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) =&gt; {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () =&gt; {
      app.quit()
    })
  }
}


```


<p>看到上面的主进程文件是不是很熟悉，你可以像以前一样做一些操作，使用node混写完成一些功能</p>


### 9.5打包

            
<p>上面我们只是运行出来了，上交的软件，老师总不会还特意去配环境，然后<code>npm run electron:serve</code>吧，显然是不可能的，那我们继续进行打包成一个可执行的文件exe</p>
<p>命令行执行下面的命令</p>


```bash
npm run electron:build

```




#### 打包出现的问题

            
<blockquote>
<p>我在打包的时候特别不顺利... 查来查去原来<code>electron</code> 是有问题</p>
</blockquote>
<p>我给出的建议就是 把<code>node_modules</code>目录下的 <strong>electron 删除</strong></p>
<p>用<code>cnpm</code> 安装 <code>electron</code></p>
<p>如果没有 <code>cnpm</code> 先进行安装</p>
<blockquote>
<p>全局安装<code>cnpm</code></p>
</blockquote>


```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 查看是否安装成功了
cnpm -v

```


<blockquote>
<p>重新安装 <code>electron</code></p>
</blockquote>


```bash
cnpm i electron

```


<blockquote>
<p>打包</p>
</blockquote>


```js
npm run electron:build

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7678cbda1804561935ae8ef6de76dcc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005131543735" loading="lazy"></p>
<p>打包完成，打包的文件就放在项目下的 <code>dist_electron</code> 里面</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/724e565bb55544f2875b79dcf918c8f2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005131647326" loading="lazy"></p>


### 9.6安装

            
<blockquote>
<p>双击就自动安装了</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e0725f12ac14e968284a61308834a68~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005131805110" loading="lazy"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c6ffdb7f54c428fb7bd774222edee60~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005131940327" loading="lazy"></p>
<p>桌面上就出现这么一个应用图标</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47def2592a1543b0901f34313dc75466~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005132041458" loading="lazy"></p>


### 9.7自定义

            
<p>点进去查看没有问题，但是是不是太low 了，一点击就是自动安装，而且使用的默认图标</p>
<blockquote>
<p>安装打包工具</p>
</blockquote>


```bash
cnpm i electron-builder --D

```




#### 9.7.1.首先找一个 icon 图片

            
<p>好像有插件可以把图片转为各种大小的<code>icon</code></p>
<p>安装下，这样就不用网站上转图片了</p>


```bash
cnpm i electron-icon-builder 

```


<p>需要在<code>package.json</code>中<code>scripts</code>添加<code>build-icon</code>指令</p>
<p><code>longzhu.jpg</code> 这个图片自己找的 卡卡罗特 可以自行修改</p>
<p><code>output</code> 是输出文件夹</p>


```js

  "scripts": {
    "build-icon": "electron-icon-builder --input=./public/longzhu.jpg --output=build --flatten"
  },

```


<p>命令行输入</p>


```bash
npm run build-icon

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceecc86d39184d8c8d1703b4bfbe28a8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005141605242" loading="lazy"></p>
<p>build完成之后，生成了不同大小的图片</p>


#### 9.7.2.vue.config.js

            
<p>因为我们之前安装的插件是  <code>vue-cli-plugin-electron-builder</code> ，而不是<code>electron-builder</code></p>
<p><code>electron-builder</code>打包普通项目，<code>build</code> 配置直接在<code>package.json</code> 里面写</p>
<p><code>vue-cli-plugin-electron-builder</code>的 <code>build</code> 配置是需要在 项目根目录下 <code>vue.config.js</code> 里面配置</p>
<p>如果没有请新建</p>


```js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.test.app",
        productName: "Lang", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2021", //版权信息
        directories: {
          output: "./dist" //输出文件路径
        },
        win: {
          //win相关配置
          icon: "./build/icons/icon.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序,打包文件的后缀为exe
              arch: [
                "x64", //64位
                "ia32" //32位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, //一键安装
          language: "2052", //安装语言
          perMachine: true, //应用所有用户
          allowToChangeInstallationDirectory: true //用户可以选择路径
        }
      }
    }
  }
};


```




#### 9.7.3.执行打包

            


```bash
npm run electron:build

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41fdf3c10fae49f8afccb04c8ec79a21~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005143529020" loading="lazy"></p>
<p>OK，打包成功！</p>
<p><strong>可能遇到的问题</strong></p>
<p>打包的路上不是一帆风顺的，在这一步打包失败了，因为打包的时候去下载一些依赖，然后下载失败了</p>
<p>解决方法1：梯子</p>
<p>解决方法2： <a href="https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fwm9028%2Farticle%2Fdetails%2F114583011" target="_blank" rel="nofollow noopener noreferrer" title="https://blog.csdn.net/wm9028/article/details/114583011" ref="nofollow noopener noreferrer">可以参考这个</a></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25942115043b41e1ab4d86fbd36b72ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005143747806" loading="lazy"></p>
<blockquote>
<p>打包好的东西</p>
</blockquote>
<p>打包好的东西放在我们之前配置的<code>build</code> <code>output: "./dist"</code> //输出文件路径</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ac1db1992be43e2982b9ef0292e8189~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005144321420" loading="lazy"></p>
<p>可以看出图标变了</p>
<p><img src="%E5%B0%8F%E6%B5%AA%E5%AD%A6%E4%B9%A0Electron.assets/image-20211005144400797.png" alt="image-20211005144400797" loading="lazy"></p>
<p>我们可以自定义安装文件夹了</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7e48cb6089941d4931870360c333b94~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005144559596" loading="lazy"></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4e56d80bc164586b8379113709c42cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="image-20211005144749686" loading="lazy"></p>
<p>好了，基础的打包工作就这么结束了，大家可以自己写属于自己的软件，这里只是一个简单的应用教学</p>


## 结语

            
<p><code>Electron</code> 真的不错诶，建议大家学习的时候多看看官方的文档，虽然官方文档还有很多地方没有翻译完整，但是并不影响我们去学习他的热情，感觉版本迭代很快，官方文档显得又多又乱，大家可以在文档上面搜索</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.electronjs.org%2Fdocs" target="_blank" rel="nofollow noopener noreferrer" title="https://www.electronjs.org/docs" ref="nofollow noopener noreferrer">Electron官方文档</a></p>
<blockquote>
<p>往期精彩</p>
</blockquote>
<p><a href="https://juejin.cn/post/7006518993385160711" target="_blank" title="https://juejin.cn/post/7006518993385160711">还不会Vue3？一篇笔记带你快速入门</a></p>
<p><a href="https://juejin.cn/post/6999440503712251935" target="_blank" title="https://juejin.cn/post/6999440503712251935">还不会TS？ 带你 TypeScript 快速入门</a></p>
<p><a href="https://juejin.cn/post/6994337441314242590" target="_blank" title="https://juejin.cn/post/6994337441314242590">快速上手Vuex 到 手写简易 Vuex</a></p>
<p><a href="https://juejin.cn/post/6990582632270528525" target="_blank" title="https://juejin.cn/post/6990582632270528525">从了解到深入虚拟DOM和实现diff算法</a></p>
<p><a href="https://juejin.cn/post/6989106100582744072" target="_blank" title="https://juejin.cn/post/6989106100582744072">手写一个简易vue响应式带你了解响应式原理</a></p>
<p><a href="https://juejin.cn/post/6988316779818778631" target="_blank" title="https://juejin.cn/post/6988316779818778631">从使用到自己实现简单Vue Router看这个就行了</a></p>
<p><a href="https://juejin.cn/post/6983934602196811789" target="_blank" title="https://juejin.cn/post/6983934602196811789">前端面试必不可少的基础知识，虽然少但是你不能不知道</a></p></div>
