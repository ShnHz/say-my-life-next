---
title: 三分钟 ChatGPT 接入钉钉机器人
date: 2023/04/22 15:21:15
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["tool","info"],
    valine: true,
    valineId: 
}
password: false
---

###### 原文 [掘金](https://juejin.cn/post/7211061398680305725)

###### [国内免费体验](https://chat.waixingyun.cn/)

<div class="markdown-body cache">

### 前言

            
<p>ChatGPT 大家应该都已经用了一段时间了，功能非常强大，作为开发人员，我用它写文档、写日报、润色 OKR，知识搜索等等，它给我带来了极大的帮助，但我在使用过程中最大的痛点就是网络。</p>


### 痛点

            
<p>由于国内不能访问的原因，我们必须使用代理，而且必须选择日本或美国较远的节点，香港跟台湾是不能访问的，而在工作的时候，需要访问内网，因此我每天要在切换代理这件事上花不少时间。</p>
<p>现在我们可以在钉钉中直接对接 ChatGPT，再也不必为了切换网络而烦恼了。</p>


### 原理

            
<p>首先来说一下原理：</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fchat.openai.com%2F" target="_blank" title="https://chat.openai.com/" ref="nofollow noopener noreferrer">chat.openai.com/</a> 这个网站必须是国外节点才可以访问，而我们使用官方的 api，就可以使用香港节点访问。</p>
<p>比如我们使用以下代码，这样就可以在 Nodejs 中调用 ChatGPT API 了。</p>


```js
 const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 800,
    n: 1,
  };

const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

```


<p>上述代码中 OPENAI_API_KEY 需要<a href="https://link.juejin.cn?target=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys" target="_blank" title="https://platform.openai.com/account/api-keys" ref="nofollow noopener noreferrer">登录自己账号</a>，自己创建一个。</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4898ce71bf2a4940813336fb6e6c906f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="复制 OPENAI API_KEY" loading="lazy"></p>
<p>接下来我们需要准备一个可以直接访问 OpenAi API 的 Node.js 环境。</p>
<p>有没有一种简单快捷的方法来调用 ChatGPT API 呢？</p>
<p>那当然是用 Laf 了。</p>
<p>Laf 是一个完全开源的一站式云开发平台，提供了开箱即用的云函数，云数据库，对象存储等能力，让你可以像写博客一样写代码。</p>
<blockquote>
<p>GitHub：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flabring%2Flaf" target="_blank" title="https://github.com/labring/laf" ref="nofollow noopener noreferrer">github.com/labring/laf</a></p>
</blockquote>
<p>最重要的是云服务可用区在香港，那么我们就可以搭建一个自己的 ChatGPT 了。</p>


### 实现步骤

            
<p>首先需要登录 &nbsp;laf.dev，然后新建一个应用。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2feda7251c64dd8b9fef305eebfdf1b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="创建应用" loading="lazy"></p>
<p>点击开发按钮进入开发页面。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f82c56a9411f42b9a8788d06fbe097b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="进入开发" loading="lazy"></p>
<p>在 NPM 依赖面板中点击右上角的 &nbsp;<code>+</code>，安装 npm 包 chatgpt，<strong>保存并重启：</strong></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9be1b689382a4e67bf4625a5ba331232~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="安装npm依赖" loading="lazy"></p>
<p>新建一个云函数，选 post，函数名称随便取</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ba2977af61845abb7c29ddc184f256f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="新建云函数" loading="lazy"></p>
<p>然后再贴入以下代码：</p>


```js
import cloud from '@lafjs/cloud'
import axios from 'axios'

const dingtalk_robot_url = 'https://oapi.dingtalk.com/robot/send?access_token=55c8f230c7cb6b18c51e182bc6a2ae41b84fa4e30c3d5d9dee4ae3a'
const sendDingDing = async (md) =&gt; {
  const sendMessage = {
    msgtype: "markdown",
    markdown: {
      title: "掘金消息",
      text: md,
    }
  };
  return await axios.post(dingtalk_robot_url, sendMessage);
};

export async function main(ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx;

  // 数据库操作
  // const db = cloud.database()
  // const r = await db.collection('admins').get()
  const { ChatGPTAPI } = await import('chatgpt')

  let api=cloud.shared.get('api')
  if(!api){
    api = new ChatGPTAPI({ apiKey: cloud.env.OPENAI_API_KEY })
    cloud.shared.set('api', api)
  }
  const prompt = body.text.content;

  const parentMessageId = cloud.shared.get('parentMessageId')

  let res
  // 这里前端如果传过来 parentMessageId 则代表需要追踪上下文
  if (!parentMessageId) {
    res = await api.sendMessage(prompt)
  } else {
    res = await api.sendMessage(prompt, { parentMessageId })
  }

  cloud.shared.set('parentMessageId', res.id)

  console.log(res.text)

  sendDingDing(res.text)
  return
}

```


<p>上面代码中，还有 2 步方需要修改下：</p>
<p>第一个是设置环境变量 <code>OPENAI_API_KEY</code></p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9701c4a6a8e4788914608b535b39457~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="设置环境变量" loading="lazy"></p>
<p>第二个是修改 <code>dingtalk_robot_url</code>， 这个钉钉机器人的回调地址。</p>


### 钉钉机器人对接

            
<p>新建一个只有你自己的个人群</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a9ef31bb1d447d9811e0535ca0e772a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="钉钉群助手" loading="lazy"></p>
<p>点击群助手创建一个自定义的 <code>webhook</code></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/563496725bde41f68b0c81651e385e8b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="添加机器人" loading="lazy"></p>
<p>安全设置选择自定义关键词，输入掘金消息
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdbddfadcb934987878f6a48f1fb9773~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="创建机器人" loading="lazy"></p>
<p>复制 <code>webhook</code> 地址，这个就是 <code>dingtalk_robot_url</code>, 更新到云函数中，保存并发布。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a84e5598570943e7bd0b7d5344314cf8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="复制云函数url" loading="lazy"></p>
<p>点击复制云函数 url，我们设置到钉钉机器人中</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad6ee865d4f644a59d75cae69cd1d62e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="设置钉钉机器人" loading="lazy"></p>
<p>填入你的云函数地址，这样我们就可以在钉钉中 <code>@机器人</code>,它每次会将消息内容推送给原函数，云函数处理消息后，将消息推送给钉钉。</p>
<p>接下来我们就可以在钉钉中愉快地和 ChatGPT 对话了。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67424a6f10954760accf7f43ee303cf0~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="对话演示" loading="lazy"></p>
<p>当然消息也会同步在手机中，我们也可以使用手机和机器人对话。</p>


### 小结

            
<p>缺点是这个机器人还不支持连续对话，因为钉钉机器人不支持消息 id 的记录，其实 ChatGPT 是支持理解上下文的。 只需要在 <code>ChatGPTAPI</code> 中传入 <code>parentMessageId</code> 就可以了。</p>


```js
res = await api.sendMessage('What were we talking about?', {
  parentMessageId: res.id
})

```


<p>如果这个群聊只有一个人使用的话，我们可以将 <code>parentMessageId</code> 存入云数据库中，或云函数的共享中。</p>


```js
cloud.shared.set('parentMessageId','id')
cloud.shared.get('parentMessageId')

```


<p>这样就可以实现连续对话了。</p>
<p>好了，以上就是本文全部内容，如果对你有帮助，随手点个赞吧</p>
<p>参考 <a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FZ4dFYECnicvvTOWhuL8F-Q" target="_blank" title="https://mp.weixin.qq.com/s/Z4dFYECnicvvTOWhuL8F-Q" ref="nofollow noopener noreferrer">《 三分钟拥有自己的 ChatGPT (从开发到上线)》</a></p>


### 补充

            
<p>有些同学问： 钉钉机器人没有 post 设置的该怎么办？</p>
<p>首先登录自己的账号创建一个机器人</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fopen-dev.dingtalk.com%2Ffe%2Fapp%23%2Fcorp%2Frobot" target="_blank" title="https://open-dev.dingtalk.com/fe/app#/corp/robot" ref="nofollow noopener noreferrer">open-dev.dingtalk.com/fe/app#/cor…</a></p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/769188ad80cf4ba4ac392aff75c1d4b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>选择继续使用旧版创建机器人，</p>
<p>创建完成后， 在消息接收地址中填写post地址即可。
这个地址可以通过@群机器人，将消息发送到指定外部服务，还可以将外部服务的响应结果返回到群组。这里填写一个公网可访问的HTTPS/HTTP地址，用于接收POST过来的消息。</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac908416497048b89b824a784fccb5db~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>此时在钉钉中，你会自动加入一个群聊，你可以在这个群中和机器人对话测试</p>
<hr>
</div>
