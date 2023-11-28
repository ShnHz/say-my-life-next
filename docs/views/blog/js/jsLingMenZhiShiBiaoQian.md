---
title: js 冷门知识 - 标签
date: 2023/11/28 13:47:48
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

###### 原文 [掘金](https://juejin.cn/post/6989536154819231774?searchId=202311281347549D757307AB90955166E5)


# 前言

            
<p>本系列将分多篇文章介绍 js 相关的“冷门知识”，这里的“冷门知识”是指大部分开发者都不曾留意过的知识点，亦或者是意料不到的知识点。这些知识点对现实中的面试、开发也许没有很大的帮助，甚至压根没任何用处，但希望以此博得大家一乐，并额外拓展下知识面。</p>
<p>本系列文章的大部分知识参考于阮一峰写的“<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.wangdoc.com%2F" target="_blank" title="https://www.wangdoc.com/" ref="nofollow noopener noreferrer">网道 - 互联网开发文档 (wangdoc.com)</a>”，强烈建议 web 前端开发者都看下这份文档，既是入门的好帮手，也是拓展知识面的利器。</p>
<p>本系列文章的任何参考，均会在文末标出。</p>
<p>文章示例均是经过本人验证，如有错漏，请在评论区指正。</p>


# 跳出循环

            
<p>我们都知道 js 的“跳出循环”都是使用关键字 <code>break</code> 或 <code>continue</code>，单独的 <code>break</code> 用来跳出当前循环，单独的 <code>continue</code> 用来跳出一次循环（这里强调“单独”是有原因的，往下看即可明白）。</p>
<p>假设我们现在有两个循环体，如下：</p>


```js
for (var i=0; i&lt;2; i++) {
  for (var j=0; j&lt;2; j++) {
    console.log(i, j)
  }
}

```


<p>现有要求在第二个循环体里判断，当 <code>j===1</code> 时，不允许输出 <code>i</code> 和 <code>j</code> 的值并直接跳出所有循环体，注意是所有循环体。</p>
<p>你也许会这样写，添加一个变量标识是否需要跳转出循环，再在顶层循环里做一次判断。</p>


```js
var flag = false
for (var i=0; i&lt;2; i++) {
  for (var j=0; j&lt;2; j++) {
    if (j === 1) {
        flag = true
        break
    }
    console.log(i, j)
  }
  if (flag) {
      break
  }
}

```


<p>控制台正常输出的结果是</p>


```
0 0

```


<p>这种方法是没问题的，但是如果这里不单止有一个内嵌循环体，而是有一百个内嵌循环体且带有参数<code>j</code>的循环体是最里面一个，是不是就要写一百次个判断？那岂不是很麻烦。</p>
<p>当然，事实上如果代码是放在函数体里面的，可以用 <code>return</code> 来解决，但这里不考虑这种情况。</p>


# break + 标签

            
<p>其实 es5 里面有一种更简便的跳出指定循环体的写法，那就是使用 es5 的标签（label），如下：</p>


```js
top:for (var i = 0; i &lt; 2; i++) {
  for (var j = 0; j &lt; 2; j++) {
    if (j === 1) {
      break top
    }
    console.log(i, j)
  }
}

```


<p>上面的代码在原来的代码里有两个变化：</p>
<ol>
<li>
<p>一个变化是在第一个 <code>for</code> 前面添加了代码 <code>top:</code>，这个冒号前面的 <code>top</code> 就是 es5 的标签，标签名可以自定义（<code>top</code>、<code>myTop</code>等等），但不能是 js 的关键字。这里的意思是将第一个循环体外的环境标识为 <code>top</code> 标签。</p>
</li>
<li>
<p>另一个变化是当 <code>j === 1</code> 时，关键字 <code>break</code> 不再是单独使用，而是配合标签 <code>top</code> 使用，<code>break top</code> 意思是指直接跳出中间的循环体到标签 <code>top</code> 所在的环境，也就是说，程序会直接跳出第一个循环体和第二个循环体。</p>
</li>
</ol>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94cc5bbc3dc4403e9aa6963465c8453a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="image.png" loading="lazy"></p>
<p>这样，不管里面内嵌了多少个循环体，都可以用简单的 <code>break top</code> 解决。</p>
<p>我们也可以将标签 <code>top</code> 放到 <code>for</code> 上面的代码行</p>


```js
top:
for (var i = 0; i &lt; 2; i++) {
  ...
}

```


<p>也可以加一个代码块，这样可能更加好理解一点。</p>


```js
top: {
  for (var i = 0; i &lt; 2; i++) {
    ...
  }
}

```




# continue + 标签

            
<p>当然，<code>continue</code> 也是可以配合标签使用，比如：</p>


```js
top2:
for (var i = 0; i &lt; 2; i++) {
  console.log('i:', i)
  for (var j = 0; j &lt; 2; j++) {
      if (j == 0) {
        continue top2
      }
      console.log('i, j:', i, j)
  }
}

```


<p>控制台输出：</p>


```makefile
i: 0
i: 1

```


<p>当代码执行到 <code>continue top2</code>，内层循环体直接跳出（并非跳出一次）到外层循环，因此 <code>console.log('i, j:', i, j)</code> 的代码根本没有执行，<code>continue top2</code> 这里的作用是不是很像单独的 <code>break</code> 的作用？这完全可以使用 <code>break</code> 来代替，因此 <code>continue + 标签</code> 的用法没什么使用价值。</p>


# 标签的错误理解

            
<p>在“网道”文档里，是这样介绍“标签”:</p>
<blockquote>
<p>JavaScript 语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置...</p>
</blockquote>
<p>我当时看到这句话，就产生了一个错觉，“可以通过标签跳转到程序的任意位置”，这么逆天......</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/034b5e8af26941159f4375973493ce95~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="image.png" loading="lazy"></p>
<p>然后，我试了一下这样写。</p>


```js
top:console.log(123)
for (var i = 0; i &lt; 2; i++) {
  for (var j = 0; j &lt; 2; j++) {
    if (j == 1) {
      break top
    }
    console.log(i, j)
  }
}

```


<p>按照逻辑来说，这里应该死循环，当 <code>j===1</code> 时，跳转到 <code>top</code>，<code>top</code> 标记于 <code>console.log(123)</code>，因此再次打印了 <code>123</code>，并且继续再次进行下面的循环......</p>
<p>但这个代码运行是直接报错的。</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/997fda8fb78145eaa2b2cbdd3808baf4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="image.png" loading="lazy"></p>
<p>这说明标签可能只允许标记在最近的循环体上，标记在其他代码上会报错，并且并非我想象中的“可以通过标签跳转到程序的任意位置”。</p>
<p>然后我又换了一个写法。</p>


```js
top: {
  console.log(123)
  for (var i = 0; i &lt; 2; i++) {
    for (var j = 0; j &lt; 2; j++) {
      if (j == 1) {
        break top
      }
      console.log(i, j)
    }
  }
}

```


<p>这次不会报错了，但并没有预期出现死循环，这也很符合预期，因为 <code>top</code> 是标记在代码块上的。</p>


# 标签的正确理解

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b4478348b964d5ba27c716435f2a45b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="image.png" loading="lazy"></p>
<p>经过上一章节的试验，我们并不可以通过“标签”跳转到程序的任意位置，我们只可以通过“标签”跳出循环体或代码块，跳出后，继续往下面执行代码。</p>
<p>标签的正确用法如下：</p>


```js
标签: for (...) {
    ...
    break 标签
    ...
}

```


<p>或</p>


```js
标签:
for (...) {
    ...
    break 标签
    ...
}

```


<p>或</p>


```js
标签: {
    ...
    break 标签
    ...
}

```




# 参考

            
<ol>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.wangdoc.com%2Fjavascript%2Fbasic%2Fgrammar.html%23%25E6%25A0%2587%25E7%25AD%25BE%25EF%25BC%2588label%25EF%25BC%2589" target="_blank" title="https://www.wangdoc.com/javascript/basic/grammar.html#%E6%A0%87%E7%AD%BE%EF%BC%88label%EF%BC%89" ref="nofollow noopener noreferrer">JavaScript 的基本语法 - JavaScript 教程 - 网道 (wangdoc.com)</a></li>
</ol>
