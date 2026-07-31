---
title: "别再裸用 Claude Code 了！32 个亲测Skills + 8 个 MCP，开发效率直接拉满！"
date: 2026/05/29 15:23:36
summary: "别再裸用 Claude Code 了！32 个亲测技能 + 8 个 MCP 服务器，开发效率直接拉满！ 先晒一下我装完的效果（见下图），所有技能均实测可用。"
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info", "ai", "tool"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7620060655607857178)

## 别再裸用 Claude Code 了！32 个亲测技能 + 8 个 MCP 服务器，开发效率直接拉满！

先晒一下我装完的效果（见下图），所有技能均为实测可用。

![image.png](http://cdn.sanghangning.cn/blog/hermes/20260529-152340-4f0c6f2c.webp)

**作者3月31号补充**：不好意思各位看官，文档中npm安装演示命令可能没加前缀仓， 建议先find一下 再指定全路径安装，比如先：`npx skills find technical-writer` 再 ：`npx skills add shubhamsaboo/awesome-llm-apps@technical-writer -y -g` 感谢提出宝贵意见！

---

你是不是也有这样的困扰：

- 用 Claude Code 写代码，总觉得它不够懂需求，生成的内容还要反复修改
- 想让它做个 Dashboard / 落地页，结果生成的界面丑到没法直接用
- 想让它读写本地文件、操作浏览器、联动设计工具，却完全不知道怎么配置
- 会话一清空，之前的调试经验、项目细节全忘了，每次都要重新铺垫上下文

这篇文章，我把自己踩了无数坑、亲测稳定可用的 **32 个精选技能 + 8 个 MCP 服务器** 全部分享给你。一键安装、自动触发，让你的 Claude Code 从「只会补代码的助手」，变成「能帮你搞定全流程的开发搭档」。

所有安装命令直接复制就能用，全程无坑，新手也能跟着一步步操作落地。

---

### 一、先搞懂核心：Skills vs MCP 到底有啥区别？

很多新手刚上手会搞混这两个扩展能力，先一句话讲透：

- **Skills**：是封装好的提示词 / 标准化工作流，让 Claude 变成特定领域的「专业人士」，本质是让 AI 「更懂怎么干」
- **MCP 服务器**：是真正的工具能力，能让 Claude 访问本地文件、浏览器、外部 API、第三方工具，本质是让 AI 「真的能去干」

**最香的点**：绝大多数能力都会自动触发，你不需要手动调用，当你说「帮我写个 README」「审查一下这段代码」的时候，Claude Code 会自动激活对应的能力。

#### 核心区别对照表

| 对比维度 | Skills 技能 | MCP 服务器 |
| --- | --- | --- |
| 核心本质 | 提示词 / 标准化工作流封装 | 本地运行的工具 / API 服务 |
| 安装方式 | `npx skills add` 一键安装 | 修改 `mcp.json` 配置文件 |
| 运行位置 | Claude 大模型内部 | 本地独立进程 |
| 访问外部资源 | 不支持 | 支持本地系统、浏览器、第三方服务 |
| 额外依赖 | 仅需 node 环境，无需 API Key | 部分对接外部服务的需要 API Key |
| 一句话总结：**Skills 让 Claude 更聪明，MCP 让 Claude 更能干**，两者搭配使用，才能把 Claude Code 的能力拉满。 |  |  |

---

### 二、第一部分：Skills 技能全指南（32 个精选）

技能是 Claude Code 最轻量化的扩展方式，通过 Skills CLI 即可一键安装，类似前端常用的 npm 包管理器，开箱即用。

#### 2.1 前置必看：技能安装与管理全命令

##### 2.1.1 核心安装命令

```
# 1. 搜索社区技能（关键词匹配）
npx skills find <关键词>

# 2. 安装技能（-y 跳过确认，-g 全局安装，必加！）
npx skills add <owner/repo@skill> -y -g

# 3. 查看已安装的全部技能
npx skills list -g

# 4. 检查技能更新
npx skills check

# 5. 更新所有已安装技能
npx skills update
```

关键提醒：安装技能必须加 `-g` 全局安装参数，否则 Claude Code 无法识别；安装完成后**必须重启 Claude Code** 才能生效。

##### 2.1.2 技能市场与查询方式

所有社区开源技能均可在官方市场查看，有完整的安装量排行榜，帮你快速筛选热门优质技能：

- 官方技能市场：[**https://skills.sh/**](https://link.juejin.cn?target=https%3A%2F%2Fskills.sh%2F "https://skills.sh/")
- 数据说明：本文精选的技能均来自该榜单，覆盖开发全场景，累计安装量均过万，稳定性有保障。

##### 2.1.3 已安装技能查看方式

1. 命令行查看：

```
# Mac/Linux 路径
ls ~/.claude/skills/
ls ~/.agents/skills/

# Windows 路径
dir C:\Users\你的用户名.claude\skills\
```

1. Claude Code 内直接查看：输入 `/` 即可唤起完整技能列表，点击即可手动触发。

---

#### 2.2 32 个精选技能分类清单

所有技能按开发场景分类，统一标注痛点、安装命令、核心能力、触发场景和实测感受，新手也能按需选择。

##### 🔧 必装入口类（1 个）

###### find-skills 技能发现神器

解决痛点：不知道有哪些可用技能，想找特定功能的技能无从下手

安装命令：

```
npx skills add find-skills -y -g
```

核心能力：技能市场的内置搜索引擎，支持关键词匹配、热门推荐、技能详情查询

触发场景：当你说「有没有处理 PDF 的技能」「推荐几个前端开发的技能」时自动激活

实测感受：所有新手第一个必装的技能，相当于给 Claude 装了个「应用商店」，后续找技能再也不用去网页翻了。

##### 🎨 前端开发全栈类（9 个）

###### frontend-design 前端界面设计神器

解决痛点：自己写 Dashboard / 落地页丑到没法用，折腾 1 天不如 AI 5 分钟生成的效果

安装命令：

```
npx skills add frontend-design -y -g
```

核心能力：网页、Dashboard、产品落地页设计；React/Vue 组件生成；暗黑、玻璃态等现代设计风格适配

触发场景：当你说「帮我做个后台界面」「设计一个产品落地页」时自动激活

实测感受：前端开发最高频使用的技能，生成的界面可直接落地，无需大幅修改，安装量超 52.7K，社区认可度拉满。

###### web-artifacts-builder 复杂前端应用构建

解决痛点：简单界面能生成，带路由、状态管理、组件库的复杂 SPA 搞不定

安装命令：

```
npx skills add web-artifacts-builder -y -g
```

核心能力：支持带路由的单页应用开发；完美适配 Tailwind、shadcn/ui 等主流组件库；复杂状态管理逻辑生成

触发场景：当你说「帮我做个带登录的管理系统」「用 React+Tailwind 写个完整项目」时自动激活

实测感受：frontend-design 的进阶补充，复杂前端项目必备，生成的代码结构清晰，可直接运行。

###### canvas-design 可视化绘图工具

解决痛点：写技术文档、做分享时，画架构图、流程图太费时间

安装命令：

```
npx skills add canvas-design -y -g
```

核心能力：架构图、流程图、技术示意图生成；海报、文章封面图设计；支持导出 PNG/PDF 格式

触发场景：当你说「帮我画个微服务架构图」「做个技术分享的封面图」时自动激活

实测感受：不用再开 Figma/ProcessOn 了，一句话就能生成规范的技术图表，效率提升巨大。

###### theme-factory 主题美化工具

解决痛点：生成的文档、PPT、界面风格不统一，视觉效果杂乱

安装命令：

```
npx skills add theme-factory -y -g
```

核心能力：10+ 预设主题（科技蓝、商务灰、暗黑风等）；一键统一文档、PPT、HTML 的视觉风格；支持自定义主题配置

触发场景：当你说「给这个文档加个商务风格」「统一一下 PPT 的视觉主题」时自动激活

实测感受：细节控必备，生成的内容质感直接提升一个档次，不用再手动调格式了。

###### vercel-react-best-practices React 最佳实践

解决痛点：写 React 代码不规范，性能差，不符合业界最佳实践

安装命令：

```
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -y -g
```

核心能力：React 代码规范检查；性能优化建议；组件设计模式指导；Hooks 最佳实践

触发场景：当你写 React 代码时自动激活，代码审查、重构时优先触发

实测感受：Vercel 官方出品，权威性拉满，安装量超 109.8K，新手写 React 必备，能帮你养成规范的编码习惯。

###### web-design-guidelines 网页设计规范

解决痛点：做出来的网页排版乱、配色丑、响应式适配差

安装命令：

```
npx skills add vercel-labs/agent-skills@web-design-guidelines -y -g
```

核心能力：设计系统规范指导；响应式布局适配；视觉一致性检查；交互体验优化建议

触发场景：当你做网页设计、UI 优化时自动激活

实测感受：Vercel 官方出品，安装量超 83.1K，哪怕你是设计小白，用它生成的界面也不会丑。

###### vercel-composition-patterns 组件组合模式

解决痛点：复杂组件拆分不合理，复用性差，状态管理混乱

安装命令：

```
npx skills add vercel-labs/agent-skills@vercel-composition-patterns -y -g
```

核心能力：组件复用策略设计；组合优于继承的实践指导；复杂组件状态管理方案

触发场景：当你做组件封装、复杂前端项目重构时自动激活

实测感受：中高级前端必备，能帮你写出更优雅、复用性更强的组件代码。

###### shadcn shadcn/ui 组件库专属技能

解决痛点：用 shadcn/ui 时，不知道怎么组合组件、自定义样式，反复查文档

安装命令：

```
npx skills add shadcn/ui@shadcn -y -g
```

核心能力：shadcn/ui 组件使用指导；样式主题定制；组件组合最佳实践；一键生成完整业务组件

触发场景：当你的项目里有 shadcn/ui 依赖，或提到 shadcn 相关需求时自动激活

实测感受：shadcn 重度用户必备，不用再反复翻官方文档了，一句话就能生成符合规范的组件代码。

###### vercel-react-native-skills React Native 开发指导

解决痛点：React Native 跨平台适配坑多，原生模块集成复杂

安装命令：

```
npx skills add vercel-labs/agent-skills@vercel-react-native-skills -y -g
```

核心能力：RN 开发最佳实践；跨平台适配指导；原生模块集成方案；性能优化建议

触发场景：当你做 React Native 相关开发时自动激活

实测感受：Vercel 官方出品，RN 开发必备，能帮你避开 90% 的跨平台适配坑。

##### 📄 文档与办公处理类（6 个）

###### technical-writer 技术文档专家

解决痛点：写完代码不想写文档，README、API 文档写得杂乱不规范

安装命令：

```
npx skills add technical-writer -y -g
```

核心能力：标准化 README 生成；API 接口文档编写；技术教程、用户指南创作；中英文文档翻译

触发场景：当你说「帮我写个项目 README」「给这个接口生成文档」时自动激活

实测感受：开发者必备，生成的文档结构规范、逻辑清晰，直接就能用。

###### doc-coauthoring 长文档协作助手

解决痛点：写技术提案、设计规范、RFC 文档时，逻辑不严谨，内容不完整

安装命令：

```
npx skills add doc-coauthoring -y -g
```

核心能力：技术提案（RFC）撰写；系统设计文档创作；团队规范文档打磨；支持多轮迭代优化

触发场景：当你说「帮我写个技术方案」「起草一份架构设计文档」时自动激活

实测感受：写正式技术文档必备，比通用的 AI 写作更懂技术文档的规范和逻辑。

###### docx Word 文档处理工具

解决痛点：需要频繁处理 Word 文档，格式转换、批量修改太费时间

安装命令：

```
npx skills add docx -y -g
```

核心能力：创建 / 读取 / 编辑 Word 文档；Markdown 转 Word 格式；批量查找替换内容；自动生成目录、页眉页脚

触发场景：当你说「把这个 Markdown 转成 Word」「帮我修改这份 Word 文档」时自动激活

实测感受：办公场景必备，不用再开 Word 软件了，一句话就能完成批量修改。

###### pptx PPT 演示文稿生成工具

解决痛点：做 PPT 太费时间，从文档转 PPT 要反复复制粘贴调格式

安装命令：

```
npx skills add pptx -y -g
```

核心能力：从技术文档 / Markdown 一键生成 PPT；编辑现有演示文稿；合并 / 拆分幻灯片；提取 PPT 内容

触发场景：当你说「帮我做个技术分享的 PPT」「把这份文档转成演示文稿」时自动激活

实测感受：技术分享、汇报必备，10 分钟就能搞定之前要做一下午的 PPT。

###### pdf PDF 万能工具

解决痛点：PDF 合并拆分、格式转换、OCR 识别要开会员，操作麻烦

安装命令：

```
npx skills add pdf -y -g
```

核心能力：PDF 合并 / 拆分；OCR 识别扫描件内容；添加水印 / 页码；PDF 表单填写；格式转换

触发场景：当你说「把这几个 PDF 合并」「识别这个扫描件里的文字」时自动激活

实测感受：完全免费的 PDF 工具，日常办公的高频需求都能覆盖，不用再找付费工具了。

###### xlsx Excel/CSV 处理工具

解决痛点：Excel 数据清洗、公式计算、图表生成太繁琐，重复操作费时间

安装命令：

```
npx skills add xlsx -y -g
```

核心能力：Excel/CSV 数据清洗；公式计算与数据统计；可视化图表生成；格式转换与批量处理

触发场景：当你说「帮我处理这份 Excel 数据」「给这个表格生成统计图表」时自动激活

实测感受：数据处理必备，比手动写 Excel 公式快太多，复杂的数据处理一句话就能搞定。

##### 🏗️ 架构设计与代码质量类（5 个）

###### planning-with-files 任务规划工具

解决痛点：做复杂项目时，任务拆解不清晰，会话中断后进度全丢

安装命令：

```
npx skills add planning-with-files -y -g
```

核心能力：自动拆解复杂开发任务；生成 [task\_plan.md](https://link.juejin.cn?target=task_plan.md "task_plan.md")、[progress.md](https://link.juejin.cn?target=progress.md "progress.md") 等进度追踪文件；支持会话中断后恢复执行

触发场景：当你说「帮我拆解这个项目的开发任务」「做一个项目开发计划」时自动激活

实测感受：复杂项目必备，哪怕你 `/clear` 清空会话，也能根据生成的进度文件接着干，完全不丢进度。

###### project-planner 项目规划专家

解决痛点：一上来就写代码，需求没想清楚，后期反复返工

安装命令：

```
npx skills add shubhamsaboo/awesome-llm-apps@project-planner -y -g
```

核心能力：生成标准化需求文档；输出系统架构设计方案；制定分阶段实现计划；评估技术风险

触发场景：当你说「帮我做个项目的整体规划」「梳理一下这个需求的实现方案」时自动激活

实测感受：能帮你养成「先想清楚再动手」的好习惯，大幅减少后期返工，新手做项目必备。

###### architecture-patterns 架构模式推荐

解决痛点：做系统设计时，不知道该选什么架构模式，踩了架构设计的坑

安装命令：

```
npx skills add wshobson/agents@architecture-patterns -y -g
```

核心能力：根据业务场景推荐合适的架构模式；讲解各类架构的优缺点与适用场景；给出架构设计的最佳实践

触发场景：当你说「这个场景用什么架构合适」「帮我设计微服务架构」时自动激活

实测感受：后端开发、系统架构师必备，覆盖主流的架构模式，能帮你避开很多架构设计的常见坑。

###### architecture-decision-records 架构决策记录

解决痛点：项目里的架构决策没记录，后期没人知道为什么这么选，出问题无从追溯

安装命令：

```
npx skills add wshobson/agents@architecture-decision-records -y -g
```

核心能力：生成标准化的 ADR 架构决策记录；记录决策背景、选型原因与备选方案；方便团队回溯与维护

触发场景：当你说「帮我记录这个架构决策」「生成一份 ADR 文档」时自动激活

实测感受：团队开发、长期维护的项目必备，是规范的研发流程里不可或缺的一环。

###### requesting-code-review 代码审查

解决痛点：想要更专业、更贴近团队真实场景的 code review

安装命令：

```
npx skills add obra/superpowers@requesting-code-review -y -g
```

核心能力：全维度代码质量审查；发现潜在的 bug 与安全风险；给出可落地的优化建议；符合业界代码审查规范

触发场景：当你说「帮我做个专业的代码审查」「review 一下这个模块的代码」时自动激活

实测感受：完全模拟资深开发的 code review 视角，能帮你发现很多自己看不到的问题。

##### 🧠 记忆与上下文管理类（3 个）

###### memory-intake 记忆录入

解决痛点：会话一清空，之前的调试经验、项目细节、踩坑记录全忘了

安装命令：

```
npx skills add memory-intake -y -g
```

核心能力：把调试经验、架构决策、踩坑记录、项目规范存入 Claude 记忆库；支持分类标签管理；跨会话调用

触发场景：当你说「把这个经验存到记忆里」「记住这个项目的规范」时自动激活

实测感受：彻底解决会话上下文丢失的问题，项目越用越顺手，不用每次都重新铺垫背景。

###### memory-audit 记忆健康检查

解决痛点：记忆库里存了太多过时、无效的内容，影响 Claude 的响应准确性

安装命令：

```
npx skills add memory-audit -y -g
```

核心能力：检查记忆库内容是否过时；发现无效、冲突的记忆；生成记忆库质量报告；给出清理优化建议

触发场景：当你说「帮我检查一下记忆库」「清理一下无效的记忆」时自动激活

实测感受：记忆库用久了必备，能帮你保持记忆库的干净准确，避免 Claude 调用过时的内容。

###### memory-evolution 记忆优化

解决痛点：记忆库内容杂乱，冗余信息多，调用效率低

安装命令：

```
npx skills add memory-evolution -y -g
```

核心能力：分析记忆使用模式；建议记忆整合策略；精简冗余记忆；优化记忆的关联结构

触发场景：当你说「帮我优化一下记忆库」「整理一下我的记忆内容」时自动激活

实测感受：深度使用记忆功能必备，能让 Claude 更精准地调用你的历史经验，响应更贴合你的需求。

##### 🧪 测试与自动化类（2 个）

###### webapp-testing E2E 测试

解决痛点：写 E2E 测试太费时间，手动测试覆盖不全

安装命令：

```
npx skills add webapp-testing -y -g
```

核心能力：基于 Playwright 生成 E2E 测试用例；页面导航、表单填写、点击操作自动化；截屏与日志记录；测试报告生成

触发场景：当你说「帮我给这个网页写 E2E 测试」「做个自动化测试用例」时自动激活

实测感受：前端测试必备，能快速生成可直接运行的测试用例，大幅提升测试效率。

###### test-driven-development TDD 测试驱动

解决痛点：想实践 TDD 开发模式，却不知道怎么落地，先写代码再补测试

安装命令：

```
npx skills add obra/superpowers@test-driven-development -y -g
```

核心能力：引导你遵循「红绿重构」循环；先写测试用例再写实现代码；保证代码的测试覆盖率；输出符合 TDD 规范的代码

触发场景：当你说「用 TDD 模式开发这个功能」「帮我实践测试驱动开发」时自动激活

实测感受：想养成 TDD 开发习惯的必备技能，能帮你规范开发流程，写出更健壮、bug 更少的代码。

##### ⚡ 开发提效类（4 个）

###### brainstorming 头脑风暴

解决痛点：遇到技术难题，想不出解决方案，陷入思维瓶颈

安装命令：

```
npx skills add obra/superpowers@brainstorming -y -g
```

核心能力：多角度分析技术问题；快速生成多套解决方案；拓展技术思路；帮助突破思维瓶颈

触发场景：当你说「帮我头脑风暴一下这个问题」「想想这个需求的实现方案」时自动激活

实测感受：遇到卡壳的问题时用它，能快速打开思路，很多时候能想到你完全没考虑到的方案。

###### systematic-debugging 系统化调试

解决痛点：遇到诡异的 bug，排查毫无头绪，东一榔头西一棒子

安装命令：

```
npx skills add obra/superpowers@systematic-debugging -y -g
```

核心能力：结构化的 bug 排查流程；逐步定位问题根因；覆盖所有可能的故障点；生成调试记录文档

触发场景：当你说「帮我排查这个 bug」「这个问题不知道怎么回事，帮我分析一下」时自动激活

实测感受：调试 bug 的神器，跟着它的流程走一遍，90% 的问题都能找到根因，再也不用瞎猜了。

###### writing-plans 写计划

解决痛点：拆解任务不清晰，开发没有节奏，不知道先做什么后做什么

安装命令：

```
npx skills add obra/superpowers@writing-plans -y -g
```

核心能力：拆解复杂开发任务；生成分步骤实施计划；明确任务依赖关系；评估每个步骤的工作量

触发场景：当你说「帮我拆解这个功能的开发步骤」「写一个详细的开发计划」时自动激活

实测感受：能帮你把模糊的需求变成清晰的执行步骤，开发节奏更可控，不会做到一半发现漏了东西。

###### executing-plans 执行计划

解决痛点：计划写得很好，执行的时候容易跑偏，进度跟不上

安装命令：

```
npx skills add obra/superpowers@executing-plans -y -g
```

核心能力：按计划分步执行开发任务；实时追踪开发进度；处理执行中的异常情况；生成执行记录

触发场景：当你说「按这个计划执行开发」「帮我跟进这个项目的开发进度」时自动激活

实测感受：和 writing-plans 搭配使用，从计划到执行全流程覆盖，复杂项目开发再也不会跑偏了。

##### 🔒 安全审计类（1 个）

###### audit-website 网站安全审计

解决痛点：网站上线前不知道有没有安全漏洞，被攻击了才发现问题

安装命令：

```
npx skills add squirrelscan/skills@audit-website -y -g
```

核心能力：网站常见安全漏洞扫描；安全配置检查；生成完整的安全审计报告；给出漏洞修复建议

触发场景：当你说「帮我审计一下这个网站的安全性」「扫描一下这个网站的漏洞」时自动激活

实测感受：网站上线前必跑一遍，能发现很多常见的安全隐患，提前修复避免线上出问题，安装量超 15.3K，社区认可度很高。

##### 🛠️ 自定义技能开发类（1 个）

###### skill-creator 创建自定义技能

解决痛点：通用技能满足不了个性化需求，想自己封装专属的工作流技能

安装命令：

```
npx skills add skill-creator -y -g
```

核心能力：引导你创建自定义技能；封装重复的工作流；生成标准化的技能包；支持发布到社区

触发场景：当你说「帮我创建一个自定义技能」「封装一个专属的工作流」时自动激活

实测感受：进阶玩家必备，能把你日常重复的工作流封装成技能，一劳永逸，大幅提升效率。

---

#### 2.3 拿来即用：分场景一键安装脚本

为了方便大家使用，我整理了 3 个不同场景的一键安装脚本，复制到终端直接运行即可。

##### 版本 1：新手入门包（10 个必装轻量技能，零冗余）

```
#!/bin/bash
set -e

# 必装入口
npx skills add find-skills -y -g

# 前端开发必备
npx skills add frontend-design -y -g

# 文档处理必备
npx skills add technical-writer -y -g
npx skills add docx -y -g
npx skills add pptx -y -g
npx skills add pdf -y -g

# 代码质量必备
npx skills add obra/superpowers@requesting-code-review -y -g

# 开发提效必备
npx skills add obra/superpowers@brainstorming -y -g
npx skills add obra/superpowers@systematic-debugging -y -g

echo "✅ 新手入门包安装完成！重启 Claude Code 即可生效，输入 / 查看技能列表"
```

##### 版本 2：前端开发者专属包

```
#!/bin/bash
set -e

# 必装入口
npx skills add find-skills -y -g

# 前端开发全量技能
npx skills add frontend-design -y -g
npx skills add web-artifacts-builder -y -g
npx skills add canvas-design -y -g
npx skills add theme-factory -y -g
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -y -g
npx skills add vercel-labs/agent-skills@web-design-guidelines -y -g
npx skills add vercel-labs/agent-skills@vercel-composition-patterns -y -g
npx skills add shadcn/ui@shadcn -y -g

# 测试与提效
npx skills add webapp-testing -y -g
npx skills add obra/superpowers@requesting-code-review -y -g
npx skills add obra/superpowers@systematic-debugging -y -g

# 文档处理
npx skills add technical-writer -y -g

echo "✅ 前端开发者专属包安装完成！重启 Claude Code 即可生效，输入 / 查看技能列表"
```

##### 版本 3：全栈开发全能包（本文全部 32 个技能）

```
#!/bin/bash
set -e

# 🔧 必装入口类
npx skills add find-skills -y -g

# 🎨 前端开发全栈类
npx skills add frontend-design -y -g
npx skills add web-artifacts-builder -y -g
npx skills add canvas-design -y -g
npx skills add theme-factory -y -g
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -y -g
npx skills add vercel-labs/agent-skills@web-design-guidelines -y -g
npx skills add vercel-labs/agent-skills@vercel-composition-patterns -y -g
npx skills add shadcn/ui@shadcn -y -g
npx skills add vercel-labs/agent-skills@vercel-react-native-skills -y -g

# 📄 文档与办公处理类
npx skills add technical-writer -y -g
npx skills add doc-coauthoring -y -g
npx skills add docx -y -g
npx skills add pptx -y -g
npx skills add pdf -y -g
npx skills add xlsx -y -g

# 🏗️ 架构设计与代码质量类
npx skills add planning-with-files -y -g
npx skills add shubhamsaboo/awesome-llm-apps@project-planner -y -g
npx skills add wshobson/agents@architecture-patterns -y -g
npx skills add wshobson/agents@architecture-decision-records -y -g
npx skills add obra/superpowers@requesting-code-review -y -g

# 🧠 记忆与上下文管理类
npx skills add memory-intake -y -g
npx skills add memory-audit -y -g
npx skills add memory-evolution -y -g

# 🧪 测试与自动化类
npx skills add webapp-testing -y -g
npx skills add obra/superpowers@test-driven-development -y -g

# ⚡ 开发提效类
npx skills add obra/superpowers@brainstorming -y -g
npx skills add obra/superpowers@systematic-debugging -y -g
npx skills add obra/superpowers@writing-plans -y -g
npx skills add obra/superpowers@executing-plans -y -g

# 🔒 安全审计类
npx skills add squirrelscan/skills@audit-website -y -g

# 🛠️ 自定义技能开发类
npx skills add skill-creator -y -g

echo "✅ 全栈开发全能包安装完成！重启 Claude Code 即可生效，输入 / 查看技能列表"
```

---

#### 2.4 技能速查表

为了方便大家快速查阅，我整理了所有 32 个技能的核心信息对照表，按需选择即可：

| 分类 | 技能名称 | 核心用途 | 安装量参考 |
| --- | --- | --- | --- |
| 必装入口 | find-skills | 社区技能搜索与发现 | 159.6K |
| 前端开发 | frontend-design | 网页、Dashboard、落地页设计 | 52.7K |
| 前端开发 | web-artifacts-builder | 复杂 SPA、带组件库的前端项目构建 | - |
| 前端开发 | canvas-design | 架构图、流程图、可视化绘图 | 6.1K |
| 前端开发 | theme-factory | 主题美化、视觉风格统一 | - |
| 前端开发 | vercel-react-best-practices | React 开发最佳实践 | 109.8K |
| 前端开发 | web-design-guidelines | 网页设计规范与 UI 优化 | 83.1K |
| 前端开发 | vercel-composition-patterns | 组件组合模式与复用策略 | 29.7K |
| 前端开发 | shadcn | shadcn/ui 组件库专属支持 | - |
| 前端开发 | vercel-react-native-skills | React Native 开发指导 | 21.6K |
| 文档办公 | technical-writer | 技术文档、README、API 文档生成 | - |
| 文档办公 | doc-coauthoring | 长文档、技术方案、RFC 文档撰写 | - |
| 文档办公 | docx | Word 文档创建、编辑、格式转换 | 8.6K |
| 文档办公 | pptx | PPT 演示文稿生成与编辑 | 9.2K |
| 文档办公 | pdf | PDF 合并、拆分、OCR、水印处理 | 11.1K |
| 文档办公 | xlsx | Excel 数据处理、公式计算、图表生成 | 8.6K |
| 架构质量 | planning-with-files | 复杂任务拆解、进度追踪、会话恢复 | - |
| 架构质量 | project-planner | 项目需求梳理、架构设计、开发计划 | - |
| 架构质量 | architecture-patterns | 架构模式推荐、架构设计指导 | - |
| 架构质量 | architecture-decision-records | ADR 架构决策记录生成 | - |
| 架构质量 | requesting-code-review | 专业代码审查、质量优化 | - |
| 记忆管理 | memory-intake | 经验、踩坑记录、项目规范记忆录入 | - |
| 记忆管理 | memory-audit | 记忆库健康检查、无效内容清理 | - |
| 记忆管理 | memory-evolution | 记忆库优化、关联结构整理 | - |
| 测试自动化 | webapp-testing | E2E 自动化测试用例生成 | 7.6K |
| 测试自动化 | test-driven-development | TDD 测试驱动开发模式引导 | 6.5K |
| 开发提效 | brainstorming | 技术问题头脑风暴、方案生成 | 13.4K |
| 开发提效 | systematic-debugging | 结构化 bug 排查、根因定位 | 7.5K |
| 开发提效 | writing-plans | 开发任务拆解、实施计划生成 | 6.4K |
| 开发提效 | executing-plans | 开发计划执行、进度追踪 | - |
| 安全审计 | audit-website | 网站安全漏洞扫描、审计报告生成 | 15.3K |
| 自定义开发 | skill-creator | 自定义技能创建、工作流封装 | 26.1K |
| 数据来源：官方技能市场 <[skills.sh/>](https://link.juejin.cn?target=https%3A%2F%2Fskills.sh%2F%253E "https://skills.sh/%3E") ，截至 2026 年 3 月最新数据 |  |  |  |

---

### 三、第二部分：MCP 服务器全指南（8 个亲测可用）

MCP（Model Context Protocol）是 Claude Code 更底层的扩展机制，能让 Claude 突破大模型的限制，真正访问本地文件系统、浏览器、数据库、第三方工具，实现真正的自动化操作。

#### 3.1 前置必看：MCP 配置全流程

##### 3.1.1 配置文件路径

MCP 服务器通过 JSON 配置文件管理，支持全局配置和项目级配置，全平台路径如下：

```
# 全局配置（所有项目生效，推荐）
# Mac/Linux
~/.claude/mcp.json
~/.claude/mcp.local.json

# Windows
C:\Users\你的用户名.claude\mcp.json

# 项目级配置（仅当前项目生效）
项目根目录/.mcp.json
```

##### 3.1.2 标准配置格式示例

```
{
  "mcpServers": {
    "服务器名称": {
      "command": "执行命令",
      "args": ["命令参数"],
      "env": {
        "环境变量名": "环境变量值"
      }
    }
  }
}
```

##### 3.1.3 配置生效与校验

1. 修改完配置文件后，**必须重启 Claude Code** 才能生效；
2. 生效后，在 Claude Code 输入框下方会显示「工具」图标，点击即可查看已连接的 MCP 服务器；
3. 配置前请先检查 JSON 格式是否正确，避免逗号、括号不闭合导致配置失效。

---

#### 3.2 8 个精选 MCP 服务器清单

所有 MCP 均为亲测可用，覆盖开发全场景，按核心用途分类整理，每个都包含完整的配置方式、核心能力和注意事项。

##### 🧠 必装核心：跨会话记忆系统

###### neural-memory 神经网络记忆系统

解决痛点：技能里的记忆功能是轻量版，想要更强大的跨会话、长周期、结构化的记忆能力

前置依赖安装：

```
# Python 安装方式（推荐）
pip install neural-memory

# Node 安装方式
npm install -g neural-memory
```

完整配置：

```
{
  "mcpServers": {
    "neural-memory": {
      "command": "neural-memory",
      "args": ["--mcp"]
    }
  }
}
```

核心能力：

1. 跨会话、跨项目的长期记忆存储，彻底告别上下文丢失
2. 模仿人脑结构的记忆模型，支持神经元、突触、纤维等结构化记忆
3. 自动关联相似记忆，智能匹配当前需求
4. 记忆整合与优化，类似人脑睡眠整理记忆的机制
5. 知识图谱可视化，清晰查看记忆关联
6. 注意事项：纯本地运行，数据存在本地 SQLite 数据库，无需任何 API Key，完全隐私安全。

##### 🌐 浏览器与网页能力（2 个）

###### playwright 浏览器自动化

解决痛点：需要做专业的 E2E 测试、页面自动化操作，需要更强大的浏览器控制能力

前置依赖：已安装 Node 环境

完整配置：

```
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

核心能力：

1. 全浏览器支持（Chrome、Firefox、Safari）
2. 专业的 E2E 测试用例生成与执行
3. 页面导航、表单提交、元素操作全自动化
4. 视频录制、网络请求拦截、性能监控
5. 支持复杂的用户场景模拟
6. 注意事项：纯本地运行，无需 API Key，首次运行会自动下载浏览器内核，需要等待片刻。

##### 📁 本地系统能力（1 个）

###### filesystem 文件系统访问

解决痛点：Claude 只能读取当前打开的文件，想要访问整个工作区的文件、批量修改、目录管理

前置依赖：已安装 Node 环境

完整配置：

```
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/你的用户名/开发工作区路径"]
    }
  }
}
```

核心能力：

1. 读写指定目录下的所有文件，支持批量操作
2. 创建、删除、重命名目录与文件
3. 按文件名、内容搜索工作区文件
4. 查看文件元信息、修改记录
5. 支持多目录同时授权
6. 注意事项：
7. 严禁开放系统根目录权限，仅授权你的开发工作区目录即可，避免误操作删除系统文件
8. 纯本地运行，无需 API Key，所有操作均在本地完成

##### 🤔 推理能力增强（1 个）

###### sequential-thinking 链式推理

解决痛点：Claude 处理复杂问题时容易跳步、逻辑不严谨、遗漏关键步骤

前置依赖：已安装 Node 环境

完整配置：

```
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

核心能力：

1. 把复杂问题拆成多步结构化推理，避免跳步出错
2. 每一步推理都有明确的思考、验证、调整过程
3. 推理链可视化，清晰查看整个思考过程
4. 支持多方案对比、可行性验证
5. 自动识别推理中的逻辑漏洞，及时修正
6. 注意事项：纯本地运行，无需 API Key，处理复杂算法、架构设计问题时效果拔群。

##### 🌐 网页内容抓取（1 个）

###### web\_reader 网页抓取

解决痛点：Claude 无法直接访问网页链接，需要手动复制内容，太麻烦

前置依赖：已安装 Node 环境

完整配置：

```
{
  "mcpServers": {
    "web_reader": {
      "command": "npx",
      "args": ["-y", "web-reader-mcp"]
    }
  }
}
```

核心能力：

1. 抓取任意公开网页的完整内容，自动转成 Markdown 格式
2. 提取网页中的标题、正文、链接、图片等核心信息
3. 支持分页内容抓取、动态渲染页面内容获取
4. 自动过滤广告、无关内容，只保留核心正文
5. 注意事项：纯本地运行，无需 API Key，仅能访问公开可访问的网页，无法访问需要登录的内容。

##### 🎨 设计工具联动（2 个）

###### figma-developer-mcp Figma 数据读取

解决痛点：开发还原设计稿时，需要反复切换 Figma 和编辑器，手动复制尺寸、颜色、样式

前置依赖：已安装 Node 环境，需要 Figma 账号

完整配置：

```
{
  "mcpServers": {
    "figma-developer-mcp": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "你的 Figma Personal Access Token"
      }
    }
  }
}
```

核心能力：

1. 读取 Figma 文件的完整结构，获取组件、图层、样式信息
2. 自动提取设计稿中的颜色、字体、尺寸、间距等设计规范
3. 导出设计稿中的图片、图标资源
4. 根据设计稿自动生成对应的 HTML/CSS 代码
5. 对比设计稿与实现代码的差异，给出还原优化建议
6. Token 获取方式：Figma → Settings → Personal Access Tokens → Generate new token
7. 注意事项：需要 Figma API Key，仅能访问你账号有权限的 Figma 文件。

###### supercharged-figma Figma 实时编辑

解决痛点：只能读取 Figma 设计稿，想要让 Claude 直接修改、编辑 Figma 画布内容

前置依赖：已安装 Node 环境，Figma 客户端

完整配置：

```
{
  "mcpServers": {
    "supercharged-figma": {
      "command": "npx",
      "args": ["-y", "supercharged-figma-mcp", "--local", "--relay-host", "127.0.0.1", "--relay-port", "8888"]
    }
  }
}
```

核心能力：

1. 实时编辑 Figma 画布，创建、删除、修改图层节点
2. 批量操作图层，自动生成组件、样式、自动布局
3. 原型连线、交互效果自动生成
4. 根据需求一键生成完整的设计稿页面
5. 设计稿批量规范化、统一设计规范
6. 使用方式：
7. 在 Figma 里安装 supercharged-figma 插件并启动
8. 插件会生成 Channel Code，在 Claude 里输入即可完成连接
9. 注意事项：无需 API Key，纯本地连接 Figma 客户端，支持实时编辑画布，比只读的 Figma MCP 功能强大很多。

##### 🖼️ AI 图片分析（1 个）

###### 4\_5v\_mcp AI 图片分析

解决痛点：需要让 Claude 分析图片内容、识别 UI 组件、描述图片场景

前置依赖：已安装 Node 环境

完整配置：

```
{
  "mcpServers": {
    "4_5v_mcp": {
      "command": "npx",
      "args": ["-y", "4_5v_mcp"]
    }
  }
}
```

核心能力：

1. 分析图片内容，识别图中的物体、场景、文字
2. 识别设计稿中的 UI 组件，自动生成对应代码
3. 详细描述图片场景，理解图片中的信息
4. 支持多种图片格式分析
5. 注意事项：可能需要配置对应的 AI 服务 API Key，具体取决于实现方式，部分版本为纯本地运行。

---

#### 3.3 API Key 汇总表

| MCP 服务器名称 | 是否需要 API Key | 所需 Key 类型 | 获取方式 |
| --- | --- | --- | --- |
| neural-memory | ❌ 不需要 | - | - |
| playwright | ❌ 不需要 | - | - |
| filesystem | ❌ 不需要 | - | - |
| sequential-thinking | ❌ 不需要 | - | - |
| web\_reader | ❌ 不需要 | - | - |
| figma-developer-mcp | ✅ 需要 | Figma Personal Access Token | Figma → Settings → Personal Access Tokens |
| supercharged-figma | ❌ 不需要 | - | Figma 插件配合使用 |
| 4\_5v\_mcp | ⚠️ 可能需要 | 取决于具体实现 | - |
| 注：本文推荐的 8 个 MCP 服务器中，仅 1 个明确需要 API Key，1 个可能需要，其余 6 个均为纯本地运行，无需任何外部服务，隐私安全有保障。 |  |  |  |

---

#### 3.4 MCP 服务器速查表

| MCP 服务器名称 | 核心功能 | 运行方式 | 额外依赖 |
| --- | --- | --- | --- |
| neural-memory | 神经网络跨会话记忆系统 | 本地运行 | Python/Node |
| playwright | 浏览器自动化测试、自动化控制 | 本地运行 | Node |
| filesystem | 本地文件系统访问、批量文件操作 | 本地运行 | Node |
| sequential-thinking | 链式思考、复杂问题推理增强 | 本地运行 | Node |
| web\_reader | 网页内容抓取、Markdown 转换 | 本地运行 | Node |
| figma-developer-mcp | Figma 设计稿读取、样式提取、代码生成 | 联网 API | Node、Figma Token |
| supercharged-figma | Figma 画布实时编辑、批量设计操作 | 本地连接 | Node、Figma 插件 |
| 4\_5v\_mcp | AI 图片分析、UI 组件识别 | 本地 / 联网 | Node |

---

### 四、亲测踩坑避坑指南（新手必看）

这部分是我踩了无数坑总结出来的经验，能帮你避开 90% 的问题，新手一定要先看完再操作。

#### 4.1 Skills 安装与使用高频坑

1. **安装超时 / 失败**：请确保你的网络环境稳定，可正常访问 npm 官方源，避免因网络波动导致安装中断；
2. 安装了不显示：必须加 `-g` 参数全局安装，局部安装 Claude Code 无法识别；安装完成后必须重启 Claude Code；
3. 技能不自动触发：检查提问的关键词是否匹配技能的触发场景，也可以手动输入 `/` + 技能名，手动唤起使用；
4. Claude 响应变慢：不要一次性安装超过 20 个冗余技能，会增加大模型的上下文负担，导致响应变慢、准确率下降，按需安装即可；
5. 技能更新失败：更新前先关闭 Claude Code，否则会出现文件占用导致更新失败的问题。

#### 4.2 MCP 配置与生效高频坑

1. 配置完不生效：先检查 JSON 格式是否正确，逗号、括号是否闭合，推荐用 JSON 校验工具先检查一遍；修改完必须重启 Claude Code；
2. 文件系统访问失败：不要开放系统根目录，仅指定你的开发工作区目录；检查目录的读写权限，确保当前用户有访问权限；
3. Figma MCP 连不上：确认 Token 开启了文件读写权限，网络可以正常访问 Figma；确保文件是你账号有权限访问的；
4. 工具调用报错：检查 MCP 服务的命令是否正确，依赖是否提前安装完成；比如 neural-memory 必须先 pip 安装，否则会提示命令不存在；
5. Windows 系统配置失败：Windows 系统的路径分隔符要用 `\`，不要用 `/`，否则会出现路径解析错误。

#### 4.3 安全红线提醒

1. 文件系统 MCP 严禁开放系统根目录，避免误操作删除系统文件，仅开放开发工作区即可；
2. 第三方技能 / MCP 优先选择官方、社区热门的开源项目，不要安装小众、未知来源的工具，防止恶意代码；
3. 涉及 API Key 的配置，不要泄露到公开场景，仅在本地配置文件中填写，不要提交到 Git 仓库；
4. 不要给 Claude 过高的系统权限，避免执行危险的系统命令，导致数据丢失。

---

### 五、新手高频 QA

#### Q1：npx 命令提示不存在怎么办？

A：需要先安装 Node.js 环境，去 Node.js 官网下载 LTS 版本安装即可，安装完成后重启终端，就能使用 npx 命令了。

#### Q2：安装完技能，输入 / 不显示怎么办？

A：按以下步骤排查：

1. 确认安装命令加了 `-g` 全局安装参数；
2. 重启 Claude Code，必须完全退出再重新打开；
3. 用 `npx skills list` 命令检查是否安装成功；
4. 确认安装过程没有出现超时、报错，网络环境正常。

#### Q3：MCP 配置完，工具里不显示怎么办？

A：按以下步骤排查：

1. 检查 JSON 格式是否正确，没有语法错误；
2. 确认配置文件放在了正确的路径，推荐用全局配置路径；
3. 完全重启 Claude Code；
4. 检查命令是否正确，依赖是否提前安装完成。

#### Q4：技能安装太多，会不会影响 Claude 的响应速度？

A：会的。安装过多的技能会增加大模型的上下文负担，导致响应变慢、准确率下降，建议按需安装，只装自己常用的，不要一次性全装。

#### Q5：Windows 系统可以用吗？

A：完全可以。本文的所有命令和配置都适配 Windows 系统，仅需要注意配置文件路径和路径分隔符的问题，文中已经标注了对应的注意事项。

---

### 六、进阶玩法：自定义专属技能与 MCP

如果你觉得社区的技能满足不了你的个性化需求，可以自己开发专属的技能和 MCP 服务器：

1. **自定义技能开发**：用本文推荐的 `skill-creator` 技能，它会引导你一步步创建自己的技能，把你日常重复的工作流封装成技能，一劳永逸；
2. **自定义 MCP 服务器开发**：MCP 协议是完全开源的，官方提供了多种语言的 SDK，你可以基于 SDK 开发自己的 MCP 服务器，对接任何你想要的工具和服务；
3. **社区分享**：开发完成的技能和 MCP，可以发布到社区，和其他开发者交流，提升自己的影响力。

---

### 七、总结与新手推荐安装顺序

Skills 和 MCP 是两套互补的扩展机制，搭配使用才能把 Claude Code 的能力发挥到极致：

- **Skills**：轻量化扩展，让 Claude 更懂你的需求，更聪明，零门槛上手；
- **MCP**：深度能力扩展，让 Claude 突破大模型的限制，真正能去执行操作，更能干。

**新手推荐安装顺序**：

1. 先装 `find-skills`，相当于装了应用商店，方便后续发现更多技能；
2. 安装新手入门包的 10 个必装技能，先上手体验，感受能力提升；
3. 配置 `neural-memory` MCP，解决跨会话记忆丢失的核心痛点；
4. 根据自己的开发场景，按需安装对应的技能和 MCP 服务器；
5. 慢慢探索进阶玩法，开发自己的专属技能和 MCP。

---

最后，以上就是我整理的 Claude Code 技能与 MCP 全指南，所有内容均为亲测可用，安装命令直接复制就能用。

如果你在安装或使用过程中遇到任何问题，都可以在评论区留言，我会一一回复。

如果这篇文章对你有帮助，别忘了**点赞 + 收藏**，后续我会更新更多 Claude Code 进阶玩法、自定义技能开发教程，我是蝎子莱莱，关注我不迷路！
