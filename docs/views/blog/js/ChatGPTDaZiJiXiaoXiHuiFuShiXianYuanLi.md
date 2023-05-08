---
title: ChatGPT 打字机消息回复实现原理
date: 2023/05/08 02:45:03
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

###### 原文 [掘金](https://juejin.cn/post/7229632570374783034)

<div class="markdown-body cache"><blockquote>
<p>🔔概述： 相较于繁重的 WebSockets，SSE 无疑是 H5 简单即时数据更新的轻量级代替方案。</p>
</blockquote>


## 1 背景

            
<p>在使用 ChatGPT 时，发现输入 prompt 后，页面是逐步给出回复的，起初以为使用了 WebSckets 持久化连接协议，查看其网络请求，发现这个接口的通信方式并非传统的 http 接口或者 WebSockets，而是基于 EventStream 的事件流，像打字机一样，一段一段的返回答案。</p>
<p>ChatGPT 是一个基于深度学习的大型语言模型，处理自然语言需要大量的计算资源和时间，响应速度肯定比普通的读数据库要慢的多，普通 http 接口等待时间过长，显然并不合适。对于这种单项对话场景，ChagtGPT 将先计算出的数据“推送”给用户，边计算边返回，避免用户因为等待时间过长关闭页面。而这，正式采用了 SSE 技术。</p>
<p><img src="https://yppphoto.hellobixin.com/yppphoto/34d61d7be4a041c19681b86bb2cc6896.gif" alt="" loading="lazy"></p>


## 2 简介

            
<p>Server-Sent Events 服务器推送事件，简称 SSE，是一种服务端实时<strong>主动</strong>向浏览器推送消息的技术。
SSE 是 HTML5 中一个与通信相关的 API，主要由两部分组成：服务端与浏览器端的通信协议（<code>HTTP</code> 协议）及浏览器端可供 JavaScript 使用的 <code>EventSource</code> 对象。</p>
<p>从“服务端主动向浏览器实时推送消息”这一点来看，该 API 与 WebSockets API 有一些相似之处。但是，该 API 与 WebSockers API 的不同之处在于：</p>





































<table><thead><tr><th align="center">Server-Sent Events API</th><th align="center">WebSockets API</th></tr></thead><tbody><tr><td align="center">基于 HTTP 协议</td><td align="center">基于 TCP 协议</td></tr><tr><td align="center">单工，只能服务端单向发送消息</td><td align="center">全双工，可以同时发送和接收消息</td></tr><tr><td align="center">轻量级，使用简单</td><td align="center">相对复杂</td></tr><tr><td align="center">内置断线重连和消息追踪的功能</td><td align="center">不在协议范围内，需手动实现</td></tr><tr><td align="center">文本或使用 Base64 编码和 gzip 压缩的二进制消息</td><td align="center">类型广泛</td></tr><tr><td align="center">支持自定义事件类型</td><td align="center">不支持自定义事件类型</td></tr><tr><td align="center">连接数 HTTP/1.1 6 个，HTTP/2 可协商（默认 100）</td><td align="center">连接数无限制</td></tr></tbody></table>


## 3 服务端实现

            


### 3.1 协议

            
<p>SSE 协议非常简单，本质是浏览器发起 http 请求，服务器在收到请求后，返回状态与数据，并附带以下 headers： <code>js Content-Type: text/event-stream Cache-Control: no-cache Connection: keep-alive </code> - SSE API规定推送事件流的 MIME 类型为 <code>text/event-stream</code>。 - 必须指定浏览器不缓存服务端发送的数据，以确保浏览器可以实时显示服务端发送的数据。 - SSE 是一个一直保持开启的 TCP 连接，所以 Connection 为 keep-alive。</p>


### 3.2 消息格式

            
<p>EventStream（事件流）为 <code>UTF-8</code> 格式编码的<code>文本</code>或使用 Base64 编码和 gzip 压缩的二进制消息。
每条消息由一行或多行字段（<code>event</code>、<code>id</code>、<code>retry</code>、<code>data</code>）组成，每个字段组成形式为：<code>字段名:字段值</code>。字段以行为单位，每行一个（即以 <code>\n</code> 结尾）。以<code>冒号</code>开头的行为注释行，会被浏览器忽略。
每次推送，可由多个消息组成，每个消息之间以空行分隔（即最后一个字段以<code>\n\n</code>结尾）。</p>
<blockquote>
<p>📢 注意：</p>
<ul>
<li>除上述四个字段外，其他所有字段都会被忽略。</li>
<li>如果一行字段中不包含冒号，则整行文本将被视为字段名，字段值为空。</li>
<li>注释行可以用来防止链接超时，服务端可以定期向浏览器发送一条消息注释行，以保持连接不断。</li>
</ul>
</blockquote>


#### 3.2.1 event

            
<p>事件类型。如果指定了该字段，则在浏览器收到该条消息时，会在当前 <code>EventSource</code> 对象（见 4）上触发一个事件，事件类型就是该字段的字段值。可以使用 <code>addEventListener</code> 方法在当前 <code>EventSource</code> 对象上监听任意类型的命名事件。
如果该条消息没有 <code>event</code> 字段，则会触发 <code>EventSource</code> 对象 <code>onmessage</code> 属性上的事件处理函数。</p>


#### 3.2.2 id

            
<p>事件ID。事件的唯一标识符，浏览器会跟踪事件ID，如果发生断连，浏览器会把收到的最后一个事件ID放到 HTTP Header <code>Last-Event-Id</code> 中进行重连，作为一种简单的同步机制。
例如可以在服务端将每次发送的事件ID值自动加 1，当浏览器接收到该事件ID后，下次与服务端建立连接后再请求的 Header 中将同时提交该事件ID，服务端检查该事件ID是否为上次发送的事件ID，如果与上次发送的事件ID不一致则说明浏览器存在与服务器连接失败的情况，本次需要同时发送前几次浏览器未接收到的数据。</p>


#### 3.2.3 retry

            
<p>重连时间。整数值，单位 ms，如果与服务器的连接丢失，浏览器将等待指定时间，然后尝试重新连接。如果该字段不是整数值，会被忽略。
当服务端没有指定浏览器的重连时间时，由浏览器自行决定每隔多久与服务端建立一次连接（一般为 30s）。</p>


#### 3.2.4 data

            
<p>消息数据。数据内容只能以一个字符串的文本形式进行发送，如果需要发送一个对象时，需要将该对象以一个 JSON 格式的字符串的形式进行发送。在浏览器接收到该字符串后，再把它还原为一个 JSON 对象。</p>


### 3.3 示例

            
<p>如下事件流示例，共发送了 4 条消息，每条消息间以一个空行作为分隔符。
第一条仅仅是个注释，因为它以冒号开头。
第二条消息只包含一个 data 字段，值为 'this is second message'。
第三条消息包含两个 data 字段，其会被解析为一个字段，值为 'this is third message part 1\nthis is third message part 2'。
第四条消息包含完整四个字段，指定了事件类型为 'server-time'，事件id 为 '1'，重连时间为 '30000'ms，消息数据为 <code>JSON</code> 格式的 '{"text": "this is fourth message", "time": "12:00:00"}'。</p>


```js
: this is first message

data: this is second message
data: this is third message part one
data this is third message part two

event: server-time
id: 1 retry: 30000
data: {"text": "this is fourth message", "time": "2023-04-09 12:00:00"}

```




## 4 浏览器 API

            
<p>在浏览器端，可以使用 JavaScript 的 EventSource API 创建 <code>EventSource</code> 对象监听服务器发送的事件。一旦建立连接，服务器就可以使用 HTTP 响应的 'text/event-stream' 内容类型发送事件消息，浏览器则可以通过监听 EventSource 对象的 <code>onmessage</code>、<code>onopen</code> 和 <code>onerror</code> 事件来处理这些消息。</p>


### 4.1 建立连接

            
<p>EventSource 接受两个参数：URL 和 options。
URL 为 http 事件来源，一旦 EventSource 对象被创建后，浏览器立即开始对该 URL 地址发送过来的事件进行监听。
options 是一个可选的对象，包含 withCredentials 属性，表示是否发送凭证（cookie、HTTP认证信息等）到服务端，默认为 false。</p>


```js
const eventSource = new EventSource('http_api_url', { withCredentials: true }) 

```


<p>与 XMLHttpRequest 对象类型，EventSource 对象有一个 readyState 属性值，具体含义如下表：</p>





















<table><thead><tr><th align="center">readyState</th><th align="center">含义</th></tr></thead><tbody><tr><td align="center">0</td><td align="center">浏览器与服务端尚未建立连接或连接已被关闭</td></tr><tr><td align="center">1</td><td align="center">浏览器与服务端已成功连接，浏览器正在处理接收到的事件及数据</td></tr><tr><td align="center">2</td><td align="center">浏览器与服务端建立连接失败，客户端不再继续建立与服务端之间的连接</td></tr></tbody></table>
<p>可以使用 EventSource 对象的 <code>close</code> 方法关闭与服务端之间的连接，使浏览器不再建立与服务端之间的连接。</p>


```js
// 初始化 eventSource 等省略 

// 关闭连接 
eventSource.close() 

```




### 4.2 监听事件

            
<p>EventSource 对象本身继承自 EventTarget 接口，因此可以使用 addEventListener() 方法来监听事件。EventSource 对象触发的事件主要包括以下三种：</p>
<ul>
<li>open 事件：当成功连接到服务端时触发。</li>
<li>message 事件：当接收到服务器发送的消息时触发。该事件对象的 data 属性包含了服务器发送的消息内容。</li>
<li>error 事件：当发生错误时触发。该事件对象的 event 属性包含了错误信息。</li>
</ul>


```js
// 初始化 eventSource 等省略 

eventSource.addEventListener('open', function(event) { 
    console.log('Connection opened')
})
eventSource.addEventListener('message', function(event) { 
    console.log('Received message: ' + event.data); 
}) 

// 监听自定义事件

eventSource.addEventListener('xxx', function(event) {
    console.log('Received message: ' + event.data);
})
eventSource.addEventListener('error', function(event) {
    console.log('Error occurred: ' + event.event);
}) 

```


<p>当然，也可以采用属性监听（<code>onopen</code>、<code>onmessage</code>、<code>onerror</code>）的形式。</p>


```js
// 初始化 eventSource 等省略
eventSource.onopen = function(event) {
    console.log('Connection opened')
}
eventSource.onmessage = function(event) {
    console.log('Received message: ' + event.data);
}
eventSource.onerror = function(event) {
    console.log('Error occurred: ' + event.event)
}) 

```


<blockquote>
<p>📢注意：
<code>EventSource</code> 对象的属性监听只能监听预定义的事件类型（<code>open</code>、<code>message</code>、<code>error</code>）。不能用于监听自定义事件类型。如果要实现自定义事件类型的监听，可以使用 <code>addEventListener()</code> 方法。</p>
</blockquote>


## 5 实践

            


### 5.1 服务端

            
<p>使用 Node.js 实现 SSE 的简单示例：</p>


```js
const http = require('http');
const fs = require('fs');
http.createServer((req, res) =&gt; {
    if (req.url === '/') {
        // 如果请求根路径，返回 index.html 文件 
        fs.readFile('index.html', (err, data) =&gt; {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'}); 
                res.end(data);
            }
         });
     } else if (req.url === '/events') {
         // 如果请求 /events 路径，建立 SSE 连接 
         res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' }); 
         // 每隔 1 秒发送一条消息 
         let id = 0; 
         const intervalId = setInterval(() =&gt; { 
             res.write(`event: customEvent\n`)
             res.write(`id: ${id}\n`)
             res.write(`retry: 30000\n`)
             const data = { id, time: new Date().toISOString()}
             res.write(`data: ${JSON.stringify(data)}\n\n`); 
             id++
          }, 1000); 
          // 当客户端关闭连接时停止发送消息
          req.on('close', () =&gt; { 
              clearInterval(intervalId); 
              id = 0
              res.end();
          });
    } else { 
        // 如果请求的路径无效，返回 404 状态码 
        res.writeHead(404); 
        res.end();
    }
    
}).listen(3000); 

console.log('Server listening on port 3000'); 

```




### 5.2 浏览器

            


```html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;SSE Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;SSE Demo&lt;/h1&gt;
    &lt;button onclick="connectSSE()"&gt;建立 SSE 连接&lt;/button&gt;
    &lt;button onclick="closeSSE()"&gt;断开 SSE 连接&lt;/button&gt; &lt;br /&gt; &lt;br /&gt; 
    &lt;div id="message"&gt;&lt;/div&gt;
    &lt;script&gt; 
        const messageElement = document.getElementById('message') 
        let eventSource // 建立 SSE 连接 
        const connectSSE = () =&gt; {
            eventSource = new EventSource('/events') // 监听消息事件 
            eventSource.addEventListener('customEvent', (event) =&gt; { 
                const data = JSON.parse(event.data) 
                messageElement.innerHTML += `${data.id} --- ${data.time}` + '&lt;br /&gt;'
             }) 
            eventSource.onopen = () =&gt; {
                messageElement.innerHTML += `SSE 连接成功，状态${eventSource.readyState}&lt;br /&gt;` 
            }
            eventSource.onerror = () =&gt; {
                messageElement.innerHTML += `SSE 连接错误，状态${eventSource.readyState}&lt;br /&gt;`
             } 
         } 
         // 断开 SSE 连接 
         const closeSSE = () =&gt; {
             eventSource.close() 
             messageElement.innerHTML += `SSE 连接关闭，状态${eventSource.readyState}&lt;br /&gt;`
         }
      &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt; 

```


<p>将上面的两份代码保存为 <code>server.js</code> 和 <code>index.html</code>，并在命令行中执行 <code>node server.js</code> 启动服务端，然后在浏览器中打开 <code>http://localhost:3000</code> 即可看到 SSE 效果。</p>
<p><img src="https://yppphoto.hellobixin.com/yppphoto/32451fb2d29e4943bf09c00a9974bf68.gif" alt="" loading="lazy"></p>


## 6 兼容性

            
<p>发展至今，SSE 已具有广泛的的浏览器<a href="https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3DServer%2520-sent%2520events" target="_blank" title="https://caniuse.com/?search=Server%20-sent%20events" ref="nofollow noopener noreferrer">兼容性</a>，几乎除 IE 之外的浏览器均已支持。</p>
<p><img src="https://yppphoto.hellobixin.com/yppphoto/cd45f0b772534efbba3d95444aa57334.png" alt="" loading="lazy">
对于不支持 EventSource 的浏览器，可以使用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feventsource" target="_blank" title="https://www.npmjs.com/package/eventsource" ref="nofollow noopener noreferrer">polyfill</a> 实现。判断浏览器是否支持 EventSource：</p>


```js
if(typeof(EventSource) !== “undefined”) { 
// 支持
} else {
// 不支持，使用 polyfill
} 

```




## 7 总结

            
<p>SSE 技术是一种轻量级的实时通信技术，基于 HTTP 协议，具有服务端推送、断线重连、简单轻量等优点。但是，SSE 技术也有一些缺点，如不能进行双向通信、连接数受限等。</p>
<p>SSE 可以在 Web 应用程序中实现诸如股票在线数据、日志推送、聊天室实时人数等即时数据推送功能。需要注意的是，SSE 并不是适用于所有的实时推送场景。在需要高并发、高吞吐量和低延迟的场景下，WebSockets 可能更加适合。而在需要更轻量级的推送场景下，SSE 可能更加适合。因此，在选择即时更新方案时，需要根据具体的需求和场景进行选择。</p></div>
