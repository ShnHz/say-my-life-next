import{_ as p,c as l,C as s,a,V as n,o}from"./chunks/framework.f518e559.js";const O=JSON.parse('{"title":"三分钟 ChatGPT 接入钉钉机器人","description":"","frontmatter":{"title":"三分钟 ChatGPT 接入钉钉机器人","date":"2023/04/22 15:21:15","summary":null,"config":{"show":true,"top":false,"dir":true,"dirTag":["h3","h4","h5"],"tag":["tool","info"],"valine":true,"valineId":null},"password":false,"outline":[3,5]},"headers":[],"relativePath":"views/blog/other/SanFenZhongChatGPTJieRuDingDingJiQiRen.md"}'),e={name:"views/blog/other/SanFenZhongChatGPTJieRuDingDingJiQiRen.md"},t=n("",2),c={class:"markdown-body cache"},r=n("",7),y={href:"https://link.juejin.cn?target=https%3A%2F%2Fchat.openai.com%2F",target:"_blank",title:"https://chat.openai.com/",ref:"nofollow noopener noreferrer"},F=n("",2),D={href:"https://link.juejin.cn?target=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys",target:"_blank",title:"https://platform.openai.com/account/api-keys",ref:"nofollow noopener noreferrer"},i=s("p",null,[s("img",{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4898ce71bf2a4940813336fb6e6c906f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?",alt:"复制 OPENAI API_KEY",loading:"lazy"})],-1),C=s("p",null,"接下来我们需要准备一个可以直接访问 OpenAi API 的 Node.js 环境。",-1),A=s("p",null,"有没有一种简单快捷的方法来调用 ChatGPT API 呢？",-1),d=s("p",null,"那当然是用 Laf 了。",-1),h=s("p",null,"Laf 是一个完全开源的一站式云开发平台，提供了开箱即用的云函数，云数据库，对象存储等能力，让你可以像写博客一样写代码。",-1),f={href:"https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flabring%2Flaf",target:"_blank",title:"https://github.com/labring/laf",ref:"nofollow noopener noreferrer"},u=n("",37),m={href:"https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FZ4dFYECnicvvTOWhuL8F-Q",target:"_blank",title:"https://mp.weixin.qq.com/s/Z4dFYECnicvvTOWhuL8F-Q",ref:"nofollow noopener noreferrer"},g=s("h3",{id:"补充",tabindex:"-1"},[a("补充 "),s("a",{class:"header-anchor",href:"#补充","aria-label":'Permalink to "补充"'},"​")],-1),b=s("p",null,"有些同学问： 钉钉机器人没有 post 设置的该怎么办？",-1),_=s("p",null,"首先登录自己的账号创建一个机器人",-1),k={href:"https://link.juejin.cn?target=https%3A%2F%2Fopen-dev.dingtalk.com%2Ffe%2Fapp%23%2Fcorp%2Frobot",target:"_blank",title:"https://open-dev.dingtalk.com/fe/app#/corp/robot",ref:"nofollow noopener noreferrer"},P=s("p",null,[s("img",{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/769188ad80cf4ba4ac392aff75c1d4b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?",alt:"image.png",loading:"lazy"})],-1),E=s("p",null,"选择继续使用旧版创建机器人，",-1),j=s("p",null,"创建完成后， 在消息接收地址中填写post地址即可。 这个地址可以通过@群机器人，将消息发送到指定外部服务，还可以将外部服务的响应结果返回到群组。这里填写一个公网可访问的HTTPS/HTTP地址，用于接收POST过来的消息。",-1),T=s("p",null,[s("img",{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac908416497048b89b824a784fccb5db~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?",alt:"image.png",loading:"lazy"})],-1),q=s("p",null,"此时在钉钉中，你会自动加入一个群聊，你可以在这个群中和机器人对话测试",-1),v=s("hr",null,null,-1);function I(x,z,w,S,G,M){return o(),l("div",null,[t,s("div",c,[r,s("p",null,[s("a",y,"chat.openai.com/",512),a(" 这个网站必须是国外节点才可以访问，而我们使用官方的 api，就可以使用香港节点访问。")]),F,s("p",null,[a("上述代码中 OPENAI_API_KEY 需要"),s("a",D,"登录自己账号",512),a("，自己创建一个。")]),i,C,A,d,h,s("blockquote",null,[s("p",null,[a("GitHub："),s("a",f,"github.com/labring/laf",512)])]),u,s("p",null,[a("参考 "),s("a",m,"《 三分钟拥有自己的 ChatGPT (从开发到上线)》",512)]),g,b,_,s("p",null,[s("a",k,"open-dev.dingtalk.com/fe/app#/cor…",512)]),P,E,j,T,q,v])])}const V=p(e,[["render",I]]);export{O as __pageData,V as default};