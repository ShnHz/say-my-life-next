---
title: 推荐一个基于 Spring Boot 4.0 + Java 21 + Spring AI 2.0 的大模型项目！
date: 2026/04/26 23:00:36
summary: 大家好，我是 Guide。今年元旦假期，我写了一个大模型项目并完全开源了出来。 短短一个月时间，这个项目目前就已经在 Github 收获了 450+ Star，吸引了多位社区爱好者共同参与完善！ 发布
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["后端", "Spring Boot"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7601374668961759282)

大家好，我是 Guide。今年元旦假期，我写了一个大模型项目并完全开源了出来。

短短一个月时间，这个项目目前就已经在 Github 收获了450+Star，吸引了多位社区爱好者共同参与完善！

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3a0d843b28034a7fa454db2fe6f17803~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=xc5e64pWpsMMkWbavwa5%2BZX%2Bkxg%3D)

发布之后，得益于大家的共同贡献，我们顺利完成了下面这些事情：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b7030274d4b14478a4f78912e129e3fd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=v1FuRKxdUqDtDw8j%2B2qbmIBU2wI%3D)

截止目前，我已经累计处理11个 issue 和6个 pr（完成率100%）。

并且，我还顺利发布了这个项目的配套教程，从简历写法、面试拷打和核心业务实现都有保姆级教程。

## 项目介绍

这是一个基于 Spring Boot 4.0 + Java 21 + Spring AI 2.0 的 AI 智能面试辅助平台。系统提供三大核心功能：

![效果展示](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/73cbb01452b64fef8b1bb832c6dd927d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=sInuxAsqLqrMgIoIvjlsvP5Rgas%3D)

项目地址：

完整代码完全免费开源，没有 Pro 版本或者付费版！

## 简历写法

如何将《SpringAI 智能面试平台+RAG知识库》实战项目写进简历？我一共提供了五大方向版本任选，精准匹配岗位需求：

![《SpringAI 智能面试平台+RAG知识库》简历写法](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/57177795d95c4ded9365773191222435~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=Jnn7LSEZVw9FY0V3Mg7jwXCUoas%3D)

每一条描述都紧扣项目真实逻辑，严格遵守项目介绍规范。不仅教你怎么写，更教你怎么补，例如针对本项目未涉及的“用户认证与鉴权”给出补充建议，教你如何基于 SpringSecurity/Sa-Token 包装主流的认证授权方案。

并且，我还补充了面试官可深挖的技术难点（如Redis Stream vs 传统消息队列**、**分布式限流的实现细节）以及项目难点与解决方案模板。

## 教程概览

带大家看看我写的配套教程，用心程度一切都在文字中！整个项目教程，我手绘了几十张技术配图帮助理解。

例如，RAG 面试题总结这篇，耗时一周终于完成了第一版，一共3.4 万字，包含35 道高频 RAG 面试题，光校对都进行了三次。而且，这还只是第一版，后续还会继续完善优化！

![RAG 面试题](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9c5daa99c3ea460a89af430b72500e08~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=76zEcCAuElQBhgHGW6YVB7IOqy0%3D)

这篇是对应的 RAG 知识库详细开发思路的介绍。

![RAG 知识库详细开发思路](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a6912cff67ba49b992197cf1c74efc6e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=Tw7M%2BLB6aO76B7TqUlTwOoife1A%3D)

不仅教你“如何写出代码”，更教你“为什么这么设计”以及“在企业真实场景中如何应对复杂挑战”。

刚刚发布一天就收到了好评：

![项目收到的好评](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/56790b20011a4f5983d1e0a6232b08a2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=cghIl8MyqhflleNi%2FyCDs6I1Lmk%3D)

## 配套教程内容安排

这个项目当前实现的功能比较简单，学习门槛极低，但涉及到的知识点比较丰富。通过保姆级教程，我们将从零构建一个融合了LLM 集成、RAG（检索增强生成）、向量数据库、分布式限流及异步处理的完整后端架构。

无论你是想学习Spring AI的前沿应用，还是需要一个高含金量的简历项目，本项目都将为你提供从基建搭建、业务攻坚到面试话术复盘的全方位指导。

配套项目教程需要付费（后文/文末有加入方法），但请大家理解，主要是想覆盖一些时间成本。而且，收费和提供的服务相比绝对是超级良心了。这辈子不可能干割韭菜的事！

内容安排如下（更新进度已过大半）：

### 环境搭建

### 核心功能开发

### 进阶优化

### 面试

## 加入学习

如果你想学习这个项目，或者希望把它作为个人项目经历 / 毕设选题，我整理的这一套教程非常细致：从基础设施搭建、核心业务实现，到最后如何在面试中讲清楚思路与亮点，尽量把容易卡住的地方讲透。

如果你确实需要更系统的辅导，可以点这里了解详情（教程为付费内容，主要是想覆盖一些时间成本，望理解，感谢支持）：《SpringAI 智能面试平台+RAG 知识库》。

## 系统架构

提示：架构图采用 draw.io 绘制，导出为 svg 格式，在 Dark 模式下的显示效果会有问题。

系统采用前后端分离架构，整体分为三层：前端展示层、后端服务层、数据存储层。

![系统架构](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d6bb9a26f3ec4b3b8717af3c0ca0fc26~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=3tPUyrAU98C0BaYt1w6V5KHnR%2Fo%3D)

后端层：

数据存储层：

PostgreSQL + pgvector：

Redis：

RustFS/MinIO (S3)：原始文件（简历 PDF、知识库文档）

异步处理流程：

简历分析、知识库向量化和面试报告生成采用 Redis Stream 异步处理，这里以简历分析和知识库向量化为例介绍一下整体流程：

```
上传请求 → 保存文件 → 发送消息到Stream→ 立即返回
                              ↓
                      Consumer 消费消息
                              ↓
                    执行分析/向量化任务
                              ↓
                      更新数据库状态
                              ↓
                   前端轮询获取最新状态
```

状态流转：PENDING→PROCESSING→COMPLETED/FAILED

`PENDING`
`PROCESSING`
`COMPLETED`
`FAILED`
知识库问答处理流程：

```
知识库问答 → 问题向量化 → pgvector 相似度搜索 → 检索相关文档↓
                                构建 Prompt → LLM 生成回答 → SSE 流式返回
```

## 技术栈概览

### 后端技术

### 前端技术

## 技术选型常见问题解答

这里只是简单介绍，后续我会分享文章详细拷打技术选型。

### 为什么选择 Spring AI？

Spring AI 是 Spring 官方推出的 AI 集成框架，提供了统一的 LLM 调用抽象。选择它的原因：

`BeanOutputConverter`
```
// 示例：Spring AI 结构化输出varconverter=newBeanOutputConverter<>(ResumeAnalysisDTO.class);Stringresult=chatClient.prompt()
    .system(systemPrompt)
    .user(userPrompt + converter.getFormat())
    .call()
    .content();returnconverter.convert(result);// 直接得到 Java 对象
```

### 数据存储为什么选择 PostgreSQL + pgvector？

本项目需要同时存储结构化数据（简历、面试记录）和向量数据（文档 Embedding）。方案对比：

选择 pgvector 的理由：

```
-- pgvector 相似度搜索示例SELECTcontent,1-(embedding<=>$1)assimilarityFROMvector_storeWHEREmetadata->>'category'='Java'ORDERBYembedding<=>$1LIMIT5;
```

为什么不选择 MySQL 搭配向量数据库呢？

PostgreSQL 最大的优势，也是它在 AI 时代甩开对手的“王牌”，就是其强大的可扩展性。开发者可以在不修改内核的情况下，像“即插即用”一样为数据库安装各种功能强大的插件，这让 PostgreSQL 变成了一个无所不能的“数据瑞士军刀”。

这种“一站式”解决能力，正是其魅力所在。它意味着许多项目不再需要依赖 Elasticsearch、Milvus 等大量外部中间件，仅凭一个增强版的 PostgreSQL 即可满足多样化需求，从而极大地简化了技术栈，降低了开发和运维的复杂度与成本。

关于 MySQL 和 PostgreSQL 的详细对比，可以参考我写的这篇文章：MySQL vs PostgreSQL，如何选择？。

### 为什么引入 Redis？

本项目主要有两个场景用到了 Redis：

`ConcurrentHashMap`
为什么引入 Redis Stream？为何不选择 Kafka、RabbitMQ 等更成熟的消息队列？

简历分析、知识库向量化等 AI 任务耗时较长（10-60 秒），不适合同步处理。需要消息队列实现异步解耦。

选择 Redis Stream 的理由：

### 构建工具为什么选择 Gradle？

SpringBoot 官方现在用的就是 Gradle，加上国内现在都是 Maven 更多，换个 Gradle 还更新颖一些。

个人也更喜欢用 Gradle，也写过相关的文章：Gradle 核心概念总结。

### 为什么使用 MapStruct？

项目中有大量 Entity ↔ DTO 转换需求，MapStruct 是编译时代码生成的对象映射框架：

### 为什么使用 Apache Tika？

系统需要解析多种格式的文档（PDF、Word、TXT），Apache Tika 是 Apache 基金会的文档解析库：

```
// Tika 解析示例Tikatika=newTika();Stringcontent=tika.parseToString(inputStream);// 自动识别格式并提取文本
```

### 为什么使用 SSE 而不是 WebSocket？

知识库问答需要流式输出（像 ChatGPT 那样逐字显示），有两种技术选择：

选择 SSE 的理由：

`Flux<ServerSentEvent<String>>`
### 前端为什么选择 React + TypeScript + Tailwind CSS？

## 效果展示

### 简历与面试

简历库：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b8913d62737e45d38c4debd53e54cd58~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=AVC46QDNznPrZzKbASuFGr5ZFOU%3D)

简历上传分析：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/23375c516825453ba9e6cb20b6b76135~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=iHq9RXTRoLBcSwII1TP9YTjh2ps%3D)

简历分析详情：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7ad63c510a454b37bd6a5b7616dc21ea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=zinD141sXwh%2FX3ycQxjpTwTD6A8%3D)

面试记录：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/80f94cd5656d4669a36c1e15ab26b169~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=Ia2jTH01jVE3P3UHC1ajAIokhdk%3D)

面试详情：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b87a4e2c3c904f388caa6a408d2c4e8f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=XPDKrOtRTHDVfXEX1G9G1WZsP%2Fk%3D)

模拟面试：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5e0cda819f3a450aa6a2e2fd279649ff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=velH3oYX%2FBwSJFt%2FGWPpM4Vq74M%3D)

### 知识库

知识库管理：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/edb4352fe9214eea873d1ca834e9302c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=ZI6ndMijyEM6lkAyrc%2BoQ%2FqzEHo%3D)

问答助手：

![](PLACEHOLDER_IMAGE:https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e17ec6c4bb85455dbc0cde7270a31f9f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSmF2YUd1aWRl:q75.awebp?rk3s=f64ab15b&x-expires=1777260646&x-signature=LTHlcZ0tG5pfv5F0dx0yzv6iaH4%3D)

## 学习本项目你将获得什么？

本项目采用行业最前沿的 Java 21 + Spring Boot 4.0 技术栈，是市面上首个深度集成 Spring AI 2.0 的全栈实战项目。我们不仅提供高质量的代码，更配套了详尽的架构解析教程。

项目整体设计遵循“由浅入深”原则。即使你的编程基础尚浅，只需跟随我们的保姆级教程，也能顺利从零搭建出一套生产级别的 AI 大模型应用。

### 深度掌握 AI 应用开发的核心范式

本项目是你从传统后端转型 AI 应用开发工程师的最佳敲门砖：

Spring AI 2.0 工业级实战：深入理解 Spring 官方的 AI 抽象层，掌握如何通过统一的声明式接口对接通义千问、OpenAI 等主流模型。

Prompt Engineering（提示词工程）深度应用：告别简单的字符串拼接。学习如何构建结构化的 System/User Prompt，并利用 BeanOutputConverter 实现 LLM 输出向 Java 对象的自动化映射，彻底终结繁琐的 JSON 手动解析。

RAG（检索增强生成）全链路闭环：深度拆解“文档解析 -> 文本分块 -> 向量化 (Embedding) -> 向量数据库存储 -> 相似度检索 -> 上下文增强生成”的完整技术链条。

### 现代化的 Java 后端架构思维

你可以学习到优秀的工程实践：

### 务实的数据存储与中间件选型

我们拒绝盲目堆砌中间件，而是教你如何基于业务场景做出“最理智”的选择：

### 标准化的工程化交付与部署

Gradle 现代构建体系：摆脱 Maven 的繁琐配置，掌握 Gradle 8.14 及其版本目录 (Version Catalog) 的灵活性，学习如何优雅地管理大型项目依赖。

生产级容器化部署：通过 Docker Compose 一键搭建包含数据库扩展、缓存、对象存储在内的全套运行环境，理解云原生时代下的基础设施配置规范。

### 丝滑的前端工程化与交互体验

对于后端开发者，这更是一次补齐“全栈视野”的绝佳机会：

SSE (Server-Sent Events) 流式渲染：掌握像 ChatGPT 一样逐字输出回答的底层技术，理解其在单向推送场景下相比 WebSocket 的架构优势。

响应式 UI 与动效设计：利用 Tailwind CSS 极简构建美观界面，结合 Framer Motion 实现高级交互动效。

AI 数据可视化：通过 Recharts 将 AI 分析后的简历评分、多维对比以直观的雷达图形式呈现，让数据“会说话”。

## 加入学习

如果你想学习这个项目，或者希望把它作为个人项目经历 / 毕设选题，我整理的这一套教程非常细致：从基础设施搭建、核心业务实现，到最后如何在面试中讲清楚思路与亮点，尽量把容易卡住的地方讲透。

如果你确实需要更系统的辅导，可以点这里了解详情（教程为付费内容，主要是想覆盖一些时间成本，望理解，感谢支持）：《SpringAI 智能面试平台+RAG 知识库》。

