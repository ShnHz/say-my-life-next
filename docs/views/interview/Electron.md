---
title: Electron
config : {
    dir : true
}
password: true
---

#### 什么是electron

Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发经验。

#### electron的原理是什么？

Electron通过将Chromium和Node.js合并到同⼀个运⾏时环境中，并将其打包为Mac， Windows和Linux系统下的应⽤来实现这⼀⽬的。

Electron本质就是提供了一个浏览器的壳子，用于运行我们的web应用，但是我们的代码具有更强大的功能。 JavaScript 可以访问文件系统，用户 shell 等。这允许您构建更高质量的本机应用程序，但是内在的安全风险会随着授予您的代码的额外权力而增加。同时也内置了Nodejs环境，因此我们的页面也可以调用node的api。