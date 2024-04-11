---
title: 一行代码让你的控制台终端骚起来
date: 2024/04/11 10:25:02
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js","tool"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7355382754693464105)

<p>因为最近在开发一个前端脚手架，要使用到一个 chalk 的包，但是我可能一些版本的问题，需要做版本的降级处理，但是我也就用到一两个方法，于是便有了一些自己研究这些让控制台输出好看样式的想法。</p>


# ANSI

            
<p>在 Node.js 中，可以通过向控制台输出包含 ANSI 转义码的字符串来实现彩色文本。ANSI 转义码是一系列用于控制视频文本外观的代码，比如颜色、加粗等。这种方式不需要依赖任何第三方库。</p>
<p>ANSI 转义序列是一系列由 ASCII 字符组成的序列，用于控制终端界面中文本的格式化。这些序列以 ESC（转义）字符开头，即 ASCII 码中的第 27 个字符（用十六进制表示为 0x1B，或者八进制表示为 033）。ANSI 转义序列被用于在文本终端上实现文本颜色、光标位置、清屏等控制功能。这些功能对于创建用户友好的终端应用程序非常重要。</p>


## ANSI 转义序列的基本格式

            
<p>ANSI 转义序列的基本格式通常是这样的：</p>


```
ESC[参数m

```


<p>在上面的这些内容当中：</p>
<ol>
<li>
<p>ESC 是转义字符（\033 或\x1b）。</p>
</li>
<li>
<p><code>[</code> 是固定的字符，用来标识序列的开始。</p>
</li>
<li>
<p>参数 是一系列数字，用分号分隔，用于指定颜色、样式等。</p>
</li>
<li>
<p>m 是一个结束字符，用来表示序列的结束。</p>
</li>
</ol>


## 常用的 ANSI 转义序列

            
<p>以下是一些常用的 ANSI 转义序列示例：</p>
<ol>
<li>
<p>重置：\x1b[0m 将颜色重置为默认颜色。</p>
</li>
<li>
<p>前景色（文字颜色）：</p>
<ol>
<li>黑色：\x1b[30m</li>
<li>红色：\x1b[31m</li>
<li>绿色：\x1b[32m</li>
<li>黄色：\x1b[33m</li>
<li>蓝色：\x1b[34m</li>
<li>品红：\x1b[35m</li>
<li>青色：\x1b[36m</li>
<li>白色：\x1b[37m</li>
</ol>
</li>
<li>
<p>背景色：</p>
<ol>
<li>黑色：\x1b[40m</li>
<li>红色：\x1b[41m</li>
<li>绿色：\x1b[42m</li>
<li>黄色：\x1b[43m</li>
<li>蓝色：\x1b[44m</li>
<li>品红：\x1b[45m</li>
<li>青色：\x1b[46m</li>
<li>白色：\x1b[47m</li>
</ol>
</li>
</ol>
<p>例如，要将文本颜色设置为红色，可以使用：</p>


```
ESC[31m你的文本ESC[0m

```


<p>这里，ESC[31m 将文本颜色设置为红色，ESC[0m 则重置文本属性，以避免红色文本影响后续的文本输出。</p>
<p>例如：</p>


```js
console.log("\x1b[31m这是红色的文本\x1b[0m");

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16d9f8e343b44ccd919b22a0228f90d0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1556&amp;h=818&amp;s=103769&amp;e=png&amp;b=1d1d1d" alt="20240402101621" loading="lazy"></p>
<p>除此之外，还有一些其他的简单的示例，如下代码所示：</p>


```js
// 输出红色文字
console.log("\x1b[31m%s\x1b[0m", "Hello, this is red text!");

// 输出绿色文字
console.log("\x1b[32m%s\x1b[0m", "Hello, this is green text!");

// 输出带有蓝色背景和白色文字的文本
console.log(
  "\x1b[44m\x1b[37m%s\x1b[0m",
  "Hello, white text on a blue background!"
);

```


<p>在这些示例中，%s 是一个占位符，用于 console.log 中的字符串替换。\x1b[0m 用于在文本输出后重置颜色，以避免影响到之后的控制台输出。</p>
<p>如下图所示，这是代码的最终结果输出</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6b7d2c4598d4422a7c886546dfbfa6e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1904&amp;h=1124&amp;s=198322&amp;e=png&amp;b=1d1d1d" alt="20240402102245" loading="lazy"></p>


# 一些比较惊艳人的效果

            
<p>要创建更加引人注目的控制台输出，可以混合使用不同的 ANSI 转义码，实现更丰富的文本效果，例如彩色文本、加粗、闪烁、背景色等。此外，通过定时更改输出，还可以实现简单的动画效果。</p>


## 文本样式

            
<p>要添加一些文本样式，最基本的就是加粗和下划线等等：</p>
<ol>
<li>
<p>加粗：\x1b[1m</p>
</li>
<li>
<p>下划线：\x1b[4m</p>
</li>
<li>
<p>反色：\x1b[7m （交换前景色和背景色）</p>
</li>
</ol>


### 组合样式

            


```js
// 加粗的红色文字
console.log("\x1b[1m\x1b[31m%s\x1b[0m", "This is bold red text.");

// 下划线和青色文字
console.log("\x1b[4m\x1b[36m%s\x1b[0m", "This is underlined cyan text.");

// 反色显示的消息
console.log("\x1b[7m%s\x1b[0m", "This message has inverted colors.");

```


<p>在上面的这些代码中，主要来讲解一下如下字段：</p>
<ol>
<li>
<p>\x1b[1m 是启用加粗样式的 ANSI 转义序列。</p>
</li>
<li>
<p>\x1b[31m 是将文本颜色设置为红色的 ANSI 转义序列。</p>
</li>
<li>
<p>\x1b[4m 是启用下划线样式的 ANSI 转义序列。</p>
</li>
<li>
<p>\x1b[36m 是将文本颜色设置为青色（Cyan）的 ANSI 转义序列。</p>
</li>
<li>
<p>\x1b[7m 是启用反显（反色）样式的 ANSI 转义序列。反显会交换文本的前景色和背景色，创建一种“反色”效果。</p>
</li>
</ol>
<p>最终输出结果如下图所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4621618c09614a5ca45901e84cf7e822~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1948&amp;h=860&amp;s=175909&amp;e=png&amp;b=1d1d1d" alt="20240402102851" loading="lazy"></p>


## 创建文本动画

            
<p>文本动画可以通过定期更新控制台内容来实现，例如创建一个简单的“加载”动画：</p>


```js
let frame = 0;
const frames = ["-", "\\", "|", "/"];
const interval = setInterval(() =&gt; {
  process.stdout.write("\r" + frames[frame]);
  frame = (frame + 1) % frames.length;
}, 100);

// 在10秒后停止动画
setTimeout(() =&gt; {
  clearInterval(interval);
  process.stdout.write("\rDone!\n");
}, 10000);

```


<p>这段 Node.js 代码实现了一个简单的命令行加载动画。它周期性地在终端显示四个字符（-、\、|、/），模拟一个旋转的效果。动画每隔 100 毫秒更新一次，持续 10 秒钟后自动停止，并在终端打印“Done!”消息表示结束。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d3a510ae1f64590b6dbb1676ac5c37c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1708&amp;h=1076&amp;s=307560&amp;e=gif&amp;f=305&amp;b=1e1e1d" alt="2024-04-02 10.47.47.gif" loading="lazy"></p>


## 实时数据可视化

            
<p>在项目的开发过程中，如果你使用过 webpack，那么你一定有必要来监听打包的进度，那么我们可以通过监听某个值的变化，并希望实时以柱状图的形式显示在控制台中：</p>


```js
const drawBar = (value) =&gt; {
  const maxBarLength = 50;
  const barLength = Math.floor((value / 100) * maxBarLength);
  const bar = "\x1b[32m" + "█".repeat(barLength) + "\x1b[0m";
  const empty = " ".repeat(maxBarLength - barLength);

  console.clear();
  console.log(`[${bar}${empty}] ${value}%`);
};

let currentValue = 0;

setInterval(() =&gt; {
  currentValue = (currentValue + 5) % 105;
  drawBar(currentValue);
}, 200);

```


<p>这段代码在终端上绘制一个进度条，其中使用绿色的 <code>█</code> 字符表示已完成部分，空格表示未完成部分，并显示当前的进度百分比，通过 ANSI 转义序列增强其绿色填充部分的视觉效果。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1799d2d1f94a46e28c6387c3371d9655~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1850&amp;h=1128&amp;s=296553&amp;e=gif&amp;f=360&amp;b=1e1e1e" alt="2024-04-02 20.32.14.gif" loading="lazy"></p>