---
title: 用GitHub Action + VuePress自动化部署自己的文档网站
date: 2023/05/15 22:13:53
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","tool","git"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/6937532951223599141)

<div class="markdown-body cache">

## 前言

            
<p>本文教你如何使用GitHub Action + vuepress自动化部署在GitHub Pages。最终的代码在我的<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprocess1024%2Farticle" target="_blank" title="https://github.com/process1024/article" ref="nofollow noopener noreferrer">GitHub</a>可以看，演示可以点<a href="https://link.juejin.cn?target=https%3A%2F%2Fprocess1024.github.io%2Farticle%2F" target="_blank" title="https://process1024.github.io/article/" ref="nofollow noopener noreferrer">这里</a>，演示访问不了的可以访问我的<a href="https://link.juejin.cn?target=https%3A%2F%2Fjunyi-chen.gitee.io%2Farticle%2F" target="_blank" title="https://junyi-chen.gitee.io/article/" ref="nofollow noopener noreferrer">gitee pages地址</a>，我在gitee也有同步代码部署gitee pages。</p>


## VuePress

            
<p>VuePress 是一个以 Markdown 为中心的静态网站生成器。在本文的示例里使用的是vue3版本的vuepress-next。VuePress还能在Markdown里使用Vue语法，并且每个页面都会预渲染生成静态的HTML，也就是说加载性能好还有非常好的SEO支持，非常适合用来写文档和博客。</p>


### 项目搭建

            


#### 1.创建项目

            


```bash
# 创建并进入一个目录
mkdir vuepress-starter
cd vuepress-starter

# 初始化项目
git init
yarn init

# 将 VuePress 安装为本地依赖
yarn add -D vuepress@next

```




#### 2.添加script命令

            


```package.json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}


```




#### 3.创建第一篇文章

            


```bash
mkdir docs
echo '# Hello VuePress' &gt; docs/README.md

```




#### 4.本地启动

            


```
yarn docs:dev

```


<p>然后就可以打开localhost:8080看到Hello Vuepress的文章了，并且是支持热更新，因为vuepress就是用webpack-dev-server驱动的。VuePress还有很多扩展的配置，在docs目录下加新建.vuepress/config.js，在这里可以配置标题、主题、语言、导航栏等等，在这里不展开描述。</p>
<p>最后部署的时候用yarn docs:build命令，会在docs/.vuepress生成dist目录，这个目录后面配置workflow会用到。</p>


## GitHub-Actions

            
<p>actions顾名思义就是一堆动作，是一个持续集成服务，持续集成包含了拉代码、运行测试、编译代码、登录远程服务器，发布到第三方服务等等的操作，GitHub将这些操作称为actions。</p>
<p>不同项目的很多操作可以是一样的，比如拉取分支代码、缓存依赖等，每个也就是一个action脚本是可以共用的，所以GitHub允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。</p>
<p>GitHub做了一个<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmarketplace%3Ftype%3Dactions" target="_blank" title="https://github.com/marketplace?type=actions" ref="nofollow noopener noreferrer">官方市场</a>，可以让开发者提交action供其他人使用，GitHub 官方的 actions 则都放在 <a href="https://link.juejin.cn?target=github.com%2Factions" target="_blank" title="github.com/actions" ref="nofollow noopener noreferrer">github.com/actions</a> 里面。接下来介绍写一个VuePress的action。</p>


### 建立仓库

            
<p>首先在github上创建仓库，如果建立的仓库名称是username.github.io，则最后访问的地址<a href="https://link.juejin.cn?target=https%3A%2F%2Fusername.github.io%2F%25E3%2580%2582" target="_blank" title="https://username.github.io/%E3%80%82" ref="nofollow noopener noreferrer">username.github.io/。</a> 如果不是这个名称，则最后访问的地址是<a href="https://link.juejin.cn?target=https%3A%2F%2Fusername.github.io%2Frepo%2F" target="_blank" title="https://username.github.io/repo/" ref="nofollow noopener noreferrer">username.github.io/repo/</a> ,repo就是仓库名字，此时还需要先修改.vuepress/config.js，该文件导出一个对象，增加base的配置项，值为“/repo/”。</p>


### 添加.github相关配置文件

            
<p>在项目的根目录下新建.github/workflows目录，workflow就是GitHub Actions 的配置文件。随便新建.yml文件就是一个flow，github会自动运行workflows目录下所有的yml文件。介绍下workflow最重要的几个配置和概念。</p>
<ol>
<li>name</li>
</ol>
<p>name字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名</p>
<ol start="2">
<li>on</li>
</ol>
<p>on字段指定触发 workflow 的条件，通常是某些事件。在本文实例里用的是push，指的就是当git  push事件发生时触发该workflow。</p>
<ol start="3">
<li>jobs</li>
</ol>
<p>jobs是workflow最重要的部分，表示workflow要执行的任务，可以是一个或者多个。</p>
<p>接下里开始就是本文示例的部署内容。</p>
<p>我们希望的流程是，本地改完代码，上传到github后能自动打包部署到gh-pages分支。先配置触发条件on：</p>


```yml
on: # 触发条件
  # 每当 push 到 master 分支时触发部署
  push:
    branches: [master]
  # 是否手动触发部署
  workflow_dispatch:

```


<p>接下来配置重头戏jobs:</p>


```yml
jobs:
  docs:
    runs-on: ubuntu-latest # 指定运行所需要的虚拟机环境（必填）

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: "14"

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        # 环境变量
        env:
          GITHUB_TOKEN: ${{ secrets.ACTION_SECRET }}
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist

```


<p>首先job里配置运行这个脚本需要的虚拟机环境，这个虚拟机环境由github提供，可用的包括windows、linux、macos等环境，具体看官方文档。在此示例中其实不论哪个系统都是可以的，因为我们需要的是node环境，而node本身就是跨平台的。</p>
<p>接下里设置获取源码、需要的node版本、增加缓存依赖，这里使用官方提供的actions/setup-node@v1、setup-node@v1、cache@v2。这里的@表示版本，使用别人的action时最好都加上版本，以防后面更新的action不兼容当前的脚本。这些前置条件配置好，接下来就是熟悉的yarn install、yarn build:docs，安装依赖使用--frozen-lockfile来锁定版本。最后一步就是将打包的目录更新到gh-pages分支。因为要更新github代码，所以还需要配置github-token。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61815fbd6adc4b10b5d60da9b49ab8b5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>在仓库的setting下找到secert，新建一个secert，文件名可以随便取，在workflow的环境变量里secerts指的就是这里secert，后面就是secert里文件的具体名称，在这里取为ACTION_SECERT，env配置secerts.ACTION_SECRET就行。</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74607c18da504d63a88894d9493d6dce~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>最后指定部署的分支名称，和部署到分支的默认输出目录就行。</p>
<p>尝试着推送代码，可以看到仓库的Actions开始自动运行了，并且能看到运行的日志。
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc2cd9e087804342978c671aec803489~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>运行完后访问 <a href="https://link.juejin.cn?target=https%3A%2F%2Fusername.github.io%2Frepo" target="_blank" title="https://username.github.io/repo" ref="nofollow noopener noreferrer">username.github.io/repo</a> 就能看到部署后的效果了。</p>


## 源码

            
<p>gitHub: <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprocess1024%2Farticle" target="_blank" title="https://github.com/process1024/article" ref="nofollow noopener noreferrer">github.com/process1024…</a></p>
<p>github pages: <a href="https://link.juejin.cn?target=https%3A%2F%2Fprocess1024.github.io%2Farticle%2F" target="_blank" title="https://process1024.github.io/article/" ref="nofollow noopener noreferrer">process1024.github.io/article/</a></p>
<p>gitee pages: <a href="https://link.juejin.cn?target=https%3A%2F%2Fjunyi-chen.gitee.io%2Farticle%2F" target="_blank" title="https://junyi-chen.gitee.io/article/" ref="nofollow noopener noreferrer">junyi-chen.gitee.io/article/</a></p>
<p>本人整理的开源文档项目，有兴趣的可以私聊我一起维护完善~</p>


## 结束语

            
<p>有什么说的不对或者有疑问的，欢迎在下面留言交流~~</p></div>
