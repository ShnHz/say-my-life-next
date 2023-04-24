---
title: 测试妹子提了个bug,为什么你多了个options请求？
date: 2023/03/13 09:21:02
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ['info'],
    valine: true,
    valineId: 
}
password: false
---

###### 原文 [掘金](https://juejin.cn/post/7206264862657445947)

<div class="markdown-body cache"><p>测试妹子给我提了个<code>bug</code>,说为什么一次操作，<code>network</code>里面两个请求。</p>
<p>我脸色一变”不可能，我写的代码明明是一次操作，怎么可能两个请求“。走过去一看，原来是多了个<code>options</code>请求。</p>
<p>”这个你不用管，这个是浏览器默认发送的一个预检请求“。可是妹子很执着”这可肯定不行啊，明明是一次请求，干嘛要两次呢？“。</p>
<p>”哟呵，挺固执啊，那我就给你讲个明白，到时候你可别说听不懂“。</p>
<p>HTTP的请求分为两种<strong>简单请求</strong>和<strong>非简单请求</strong></p>


## 简单请求

            
<p>简单请求要满足两个条件：</p>
<ol>
<li>请求方法为：<code>HEAD</code>、<code>GET</code>、<code>POST</code></li>
<li><code>header</code>中只能包含以下请求头字段：
<ul>
<li><code>Accept</code></li>
<li><code>Accept-Language</code></li>
<li><code>Content-Language</code></li>
<li><code>Content-Type</code>: 所指的媒体类型值仅仅限于下列三者之一
<ul>
<li><code>text/plain</code></li>
<li><code>multipart/form-data</code></li>
<li><code>application/x-www-form-urlencoded</code></li>
</ul>
</li>
</ul>
</li>
</ol>


### 浏览器的不同处理方式

            
<p>对于简单请求来说，如果请求跨域，那么浏览器会放行让请求发出。浏览器会发出<code>cors</code>请求，并携带<code>origin</code>。此时不管服务端返回的是什么，浏览器都会把返回拦截，并检查返回的<code>response</code>的<code>header</code>中有没有<code>Access-Control-Allow-Origin</code>是否为<code>true</code>，说明资源是共享的，可以拿到。如果没有这个头信息，说明服务端没有开启资源共享，浏览器会认为这次请求失败终止这次请求，并且报错。</p>


## 非简单请求

            
<p>只要不满足简单请求的条件，都认为是非简单请求。</p>
<p>发出非简单<code>cors</code>请求，浏览器会做一个<code>http</code>的查询请求（预检请求）也就是<code>options</code>。<code>options</code>请求会按照简单请求来处理。那么为什么会做一次<code>options</code>请求呢？</p>
<p>检查服务器是否支持跨域请求，并且确认实际请求的<strong>安全性</strong>。预检请求的目的是为了保护客户端的安全，防止不受信任的网站利用用户的浏览器向其他网站发送恶意请求。
预检请求头中除了携带了<code>origin</code>字段还包含了两个特殊字段：</p>
<ul>
<li><code>Access-Control-Request-Method</code>： 告知服务器实际请求使用的<code>HTTP</code>方法</li>
<li><code>Access-Control-Request-Headers</code>：告知服务器实际请求所携带的自定义首部字段。
比如：</li>
</ul>


```html
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

```


<p>以上报文中就可以看到，使用了<code>OPTIONS</code>请求，浏览器根据上面的使用的请求参数来决定是否需要发送，这样服务器就可以回应是否可以接受用实际的请求参数来发送请求。<code>Access-Control-Request-Method</code>告知服务器，实际请求将使用&nbsp;<code>POST</code>&nbsp;方法。<code>Access-Control-Request-Headers</code>告知服务器，实际请求将携带两个自定义请求标头字段：<code>X-PINGOTHER</code>&nbsp;与&nbsp;<code>Content-Type</code>。服务器据此决定，该实际请求是否被允许。</p>
<p>什么时候会触发预检请求呢？</p>
<ol>
<li>发送跨域请求时，请求头中包含了一些非简单请求的头信息，例如自定义头（custom header）等；</li>
<li>发送跨域请求时，使用了 PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH等请求方法。</li>
</ol>
<p>我得意的说“讲完了，老妹你听懂了吗？”</p>
<p>妹子说“似懂非懂”</p>
<p>那行吧，带你看下实际场景。（借鉴文章<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Famandakelake%2Fblog%2Fissues%2F62" target="_blank" title="https://github.com/amandakelake/blog/issues/62" ref="nofollow noopener noreferrer">CORS 简单请求+预检请求（彻底理解跨域）</a>的两张图）</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67cf1327ec8649ab94342441cf4295e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/758d19be3575467bb53ccd8fd225b174~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>妹子说“这样就明了很多”，满是崇拜的关闭了Bug。</p>
<p>兄弟们，妹子都懂了，你懂了吗？😄</p>
<p>参考：</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Famandakelake%2Fblog%2Fissues%2F62" target="_blank" title="https://github.com/amandakelake/blog/issues/62" ref="nofollow noopener noreferrer">CORS 简单请求+预检请求（彻底理解跨域）</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FOPTIONS" target="_blank" title="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS" ref="nofollow noopener noreferrer">OPTIONS | MDN</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FCORS" target="_blank" title="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS" ref="nofollow noopener noreferrer">跨源资源共享（CORS）| MDN</a></p>
<p>说明一下哈，以上事件是真实事件，只不过当时讲的时候没有那么的详细，😂</p></div>
