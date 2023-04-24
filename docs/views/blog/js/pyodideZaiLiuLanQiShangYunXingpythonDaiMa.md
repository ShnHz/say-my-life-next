---
title: pyodide-在浏览器上运行python代码
date: 2023/04/14 10:15:21
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","tool"],
    valine: true,
    valineId: 
}
password: false
---

### pyodide 是什么？

->Pyodide<-是CPython到[WebAssembly](https://juejin.cn/post/7212444005065211961?share_token=1776334d-d47f-4967-9a29-62bea7f09453)
/Emscripten的一个接口，主要在浏览器中使用。

->Pyodide<-在浏览器中使用->micropip<-安装和运行->Python<-包。它附带了一个健壮的->Javascript<-⟺ ->Python<-外部函数接口，这样您就可以在代码中自由地混合这两种语言，而不会产生太大的摩擦。这包括对错误处理（用一种语言抛出错误，用另一种语言捕获错误）、异步/等待等的完全支持。在浏览器中使用时，->Python<-可以完全访问->Web API<-。

[官方文档](https://pyodide.org/en/stable/index.html#)

### 一个简单的demo

我们可以随便新建一个->index.html<-写入以下代码

```html
<head>
  <script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js"></script>

  <script>
    async function main() {
      let pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/',
      })
      console.log(pyodide.runPython("print('Hello, world from the browser!')"))
    }
    main()
  </script>
</head>
```

打开控制台可以看到输出了“Hello, world from the browser!”，这代表我们的->python<-代码成功在浏览器环境跑起来了！

### 常用的语法

#### 加载第三方库

导入 ->Pyodide<- 后只有 ->Python<- 标准库可用。要使用其他包，您需要使用以下任一方式加载它们：

+ ->micropip.install()<-(Python) 用于带有轮子的纯 Python 包以及 Pyodide 包（包括 Emscripten/wasm32 二进制轮子）。它可以从 PyPI、JsDelivr CDN 或其他 URL 安装包。
+ ->pyodide.loadPackage()<-(Javascript) 用于使用 Pyodide 构建的包。这是一个开销较小但功能更有限的函数。micropip 使用这个函数来加载 Pyodide 包。在大多数情况下，您应该使用 micropip。

```js
pyodide = await loadPyodide()
await pyodide.loadPackage('micropip')
const micropip = pyodide.pyimport('micropip')
await micropip.install('numpy')
```

#### 输入js变量

我们可以用 ->pyodide.toPy(obj, options)<- 这个api

尽可能将 ->JavaScript<- 对象转换为 ->Python<- 对象。

如果对象是不可变的或 ->PyProxy<-，它将原封不动地返回。如果对象不能转换为->Python<-，它将原封不动地返回。

```js
const pyData = pyodide.toPy({
    x: 1,
    y: 2
})

const pyReturnData = pyodide.runPython(
    `
    print(x)
    print(y)
    `,
    { globals: pyData }
)
```

此时就会在python代码中输出->x=1,y=2<-

#### 输出python变量

当我们在->python<-代码中获得了想要的数据，该如何从->javascript<-中获取呢？

->pyodide.runPython()<- 这个api，如果 ->Python<- 代码中的最后一条语句是表达式（并且代码不以分号结尾），则返回表达式的值。

```js
const pyReturnData = pyodide.runPython(
    `
    x = 1
    x
    `
)
```

此时就会从->javascript<-中获取到->x<-的值，即->pyReturnData=1<-