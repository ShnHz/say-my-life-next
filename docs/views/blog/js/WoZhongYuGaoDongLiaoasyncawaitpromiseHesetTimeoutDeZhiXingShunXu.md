---
title: 我终于搞懂了async/await、promise和setTimeout的执行顺序
date: 2023/02/21 14:49:27
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

###### 原文 [掘金](https://juejin.cn/post/7171002835016892453)

<div class="markdown-body cache">

### 从一道题目出发

            
<p>今天看到一道面试题，是关于<code>async/await</code>、<code>promise</code>和<code>setTimeout</code>的执行顺序，题目如下：</p>


```javascript
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('asnyc1 end');
}
async function async2() {
	console.log('async2');
}
console.log('script start');
setTimeout(() =&gt; {
	console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
	console.log('promise1');
	reslove();
}).then(function () {
	console.log('promise2');
})
console.log('script end');

```


<p>我给出的答案：</p>


```sql
script start
async1 start
async2
asnyc1 end // x
promise1
script end
promise2
setTimeOut

```


<p>正确的答案：</p>


```sql
script start
async1 start
async2
promise1
script end
asnyc1 end
promise2
setTimeOut

```


<p>为什么<code>promise1</code>比<code>asnyc1 end</code>先出来呢？带着这个疑问，我去了解了一下<strong>事件循环机制</strong>。</p>


### js EventLoop 事件循环机制

            
<p>JavaScript的事件分两种:</p>









































<table><thead><tr><th>宏任务(macro-task)</th><th>微任务(micro-task)</th></tr></thead><tbody><tr><td>script</td><td>promise.[ then/catch/finally ]((非new Promise))</td></tr><tr><td>setTimeout</td><td>process.nextTick(Node.js 环境)</td></tr><tr><td>setInterval</td><td>MutaionOberver（浏览器环境）</td></tr><tr><td>setImmediate(Node.js 环境)</td><td>Object.observe</td></tr><tr><td>IO操作</td><td>x</td></tr><tr><td>UI交互事件</td><td>x</td></tr><tr><td>postMessage</td><td>x</td></tr><tr><td>MessageChannel</td><td>x</td></tr></tbody></table>
<p>事件的执行顺序，是先执行宏任务，然后执行微任务，这个是基础，任务可以有同步任务和异步任务，同步的进入主线程，异步的进入Event Table并注册函数，异步事件完成后，会将回调函数放入Event Queue中(宏任务和微任务是不同的Event Queue)，同步任务执行完成后，会从Event Queue中读取事件放入主线程执行，回调函数中可能还会包含不同的任务，因此会循环执行上述操作。</p>
<blockquote>
<p><strong>注意：</strong> <code>setTimeOut</code>并不是直接的把你的回掉函数放进上述的异步队列中去，而是在定时器的时间到了之后，把回掉函数放到执行异步队列中去。如果此时这个队列已经有很多任务了，那就排在他们的后面。这也就解释了为什么<code>setTimeOut</code>为什么不能精准的执行的问题了。<code>setTimeOut</code>执行需要满足两个条件：</p>
<ol>
<li>主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回调函数</li>
<li>这个回调函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行</li>
</ol>
</blockquote>


### promise、async/await

            
<p>首先，<code>new Promise</code>是同步的任务，会被放到主进程中去立即执行。而<code>.then()</code>函数是异步任务会放到异步队列中去，那什么时候放到异步队列中去呢？当你的<code>promise</code>状态结束的时候，就会立即放进异步队列中去了。</p>
<p><strong>带<code>async</code>关键字的函数会返回一个<code>promise</code>对象</strong>，如果里面没有<code>await</code>，执行起来等同于普通函数；如果没有<code>await</code>，<code>async</code>函数并没有很厉害是不是。</p>
<p><code>await</code> 关键字要在 <code>async</code> 关键字函数的内部，<code>await</code> 写在外面会报错；<code>await</code>如同他的语意，就是在等待，等待右侧的表达式完成。此时的<code>await</code>会让出线程，阻塞<code>async</code>内后续的代码，先去执行<code>async</code>外的代码。等外面的同步代码执行完毕，才会执行里面的后续代码。就算<code>await</code>的不是<code>promise</code>对象，是一个同步函数，也会等这样操作。</p>


### 流程梳理

            
<p>我们整体再梳理一下上面代码执行的流程：</p>
<blockquote>
<ol>
<li>整个代码片段（script）作为一个宏任务执行<code>console.log('script start')</code>，输出<code>script start</code>；</li>
<li>执行<code>setTimeout</code>，是一个异步动作，放入宏任务异步队列中；</li>
<li>执行<code>async1()</code>，输出<code>async1 start</code>，继续向下执行；</li>
<li>执行<code>async2()</code>，输出<code>async2</code>，并返回了一个<code>promise</code>对象，<code>await</code>让出了线程，把返回的<code>promise</code>加入了微任务异步队列，所以<code>async1()</code>下面的代码也要等待上面完成后继续执行;</li>
<li>执行 <code>new Promise</code>，输出<code>promise1</code>，然后将<code>resolve()</code>放入微任务异步队列；</li>
<li>执行<code>console.log('script end')</code>，输出<code>script end</code>；</li>
<li>到此同步的代码就都执行完成了，然后去微任务异步队列里去获取任务</li>
<li>接下来执行<code>resolve</code>（<code>async2</code>返回的<code>promise</code>返回的），输出了<code>async1 end</code>；</li>
<li>然后执行<code>resolve（new Promise的）</code>，输出了<code>promise2</code>；</li>
<li>最后执行<code>setTimeout</code>，输出了<code>settimeout</code>。</li>
</ol>
</blockquote>
<p>在第<code>4</code>步中， <code>await</code> 这里有一个机制， 就是 <code>await</code> 的等待， 不会阻塞外部函数的执行， 而 <code>await</code> 等待的 如果是一个 <code>Promise</code> 则 <code>Promise</code> 里面的代码还是同步执行， 如果不是 <code>Promise</code> ，就会使用 <code>Promise.resolve</code> 来进行封装， 这里的 <code>async2</code> 是一个 <code>async</code> 方法， 里面的 打印会同步执行， 而 <code>await async2()</code> 后面的代码 会放到微任务队列中的第一个位置，等待外部同步代码执行完毕以后再执行。</p>
<p>所以我知道了<code>script end</code>为什么会优先于<code>async1 end</code>输出。</p></div>
