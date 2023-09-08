---
title: 这个交互式个人博客能让你眼前一亮✨👀 ？
date: 2023/09/08 16:50:48
summary: 还挺有趣的一个博客形式
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7267408057163055139)

<p align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7082bf114e23416e9a14f2ef21796bf0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="2023-08-15 13.21.03.gif" loading="lazy"></p>
<p>从构思到上线的全过程，开发中遇到一些未知问题，也都通过查阅资料和源码一一解决，小记一下望对正在使用或即将使用<code>Nextjs</code>开发的你们有所帮助。</p>


### 那些年我开发过的博客

            
<p>就挺有意思，域名，技术栈和平台的折腾史</p>
<ul>
<li>2018年使用<code>hexo</code>搭建了个静态博客，部署在<code>github pages</code></li>
<li>2020年重新写了博客，<code>vue</code>，<code>nodejs</code>，<code>mongodb</code>三件套，使用<code>nginx</code>部署在云服务器上</li>
<li>2023年云服务器过期了，再一次重写了博客，<code>nextjs</code>为基础框架，部署在<code>vercel</code>上</li>
</ul>


### 背景

            
<p>因为日常开发离不开终端，正好也有重写博客的想法，打算开发一个不只是看的博客网站，所以模仿终端风格开发了<a href="https://link.juejin.cn?target=https%3A%2F%2Fyucihent.space%2F" target="_blank" title="https://yucihent.space/" ref="nofollow noopener noreferrer">Yucihent</a>。</p>


### 技术栈

            
<p><code>nextjs</code> <a href="https://link.juejin.cn?target=https%3A%2F%2Fyucihent.space%2Fabout" target="_blank" title="https://yucihent.space/about" ref="nofollow noopener noreferrer">更多技术栈</a></p>
<p>选用<code>nextjs</code>是因为<code>next13</code>更新且稳定了<code>App Router</code>和一些其他新特性。</p>


### 设计

            
<p>简约为主，首页为类终端风格，<code>prompt</code>样式参考了<code>starship</code>，也参考过<code>ohmyzsh themes</code>，选用<code>starship</code>因为觉得更好看。</p>


### 交互

            
<p>通过手动输入或点击列出的命令进行交互，目前可交互的命令有：</p>
<ul>
<li><code>help</code> 查看更多</li>
<li><code>list</code>和<code>ls</code> 列出可用命令</li>
<li><code>clear</code> 清空所有输出</li>
<li><code>posts</code> 列出所有文章</li>
<li><code>about</code> 关于我</li>
</ul>
<p>后续会新增一些命令，增加交互的趣味。</p>


### 暗黑模式

            
<blockquote>
<p>基于<code>tailwind</code>的<code>dark mode</code>和<code>next-themes</code></p>
</blockquote>
<p>首先将<code>tailwind</code>的<code>dark mode</code>设置为<code>class</code>，目的是将暗黑模式的切换设置为手动，而不是跟随系统。</p>


```js
// tailwind.config.js

module.exports = {
  darkMode: 'class'
}

```


<p>新建<code>ThemeProvider</code>组件，用到<code>next-themes</code>提供的<code>ThemeProvider</code>，需要在文件顶部使用<code>use client</code>，因为<code>createContext</code>只在客户端组件使用。</p>


```tsx
'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return &lt;NextThemeProvider {...props}&gt;{children}&lt;/NextThemeProvider&gt;
}

```


<p>在<code>app/layout.tsx</code>中使用<code>ThemeProvider</code>，设置<code>attribute</code>为<code>class</code>，这是必要的。</p>


```tsx
&lt;ThemeProvider attribute="class"&gt;{children}&lt;/ThemeProvider&gt;

```


<p><code>next-themes</code>提供了<code>useTheme</code>，解构出<code>theme</code>和<code>setTheme</code>用于手动设置主题。</p>
<p>综上基本实现暗黑模式切换，但你会在控制台看到此报错信息：<code>Warning: Extra attributes from the server: class,style</code>，虽然它并不影响功能，但终究是个报错。
作为第三方包，可能存在水合不匹配的问题，经查阅资料，禁用<code>ThemeProvider</code>组件预渲染消除报错。</p>
<p>资料：</p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Fdiscussions%2F22388" target="_blank" title="https://github.com/vercel/next.js/discussions/22388" ref="nofollow noopener noreferrer">Warning: Extra attributes from the server: style</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fmessages%2Freact-hydration-error%23solution-2-disabling-ssr-on-specific-components" target="_blank" title="https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components" ref="nofollow noopener noreferrer">Disabling SSR on specific components</a></li>
</ul>


```tsx
const NoSSRThemeProvider =
  dynamic(() =&gt; import('@/components/ThemeProvider'), {
    ssr: false
  })

&lt;NoSSRThemeProvider attribute="class"&gt;{children}&lt;/NoSSRThemeProvider&gt;

```




### 类终端

            
<blockquote>
<p>由输入和输出组件组成，输入的结果添加到输出list中</p>
</blockquote>


#### 命令输入的打字效果

            
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d14622a8447a46b9894ff128819ceaed~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="Alt Text" width="500" loading="lazy">
<p>定义打字间隔100ms，对键入的命令for处理，定时器中根据遍历的索引延迟赋值。</p>


```ts
const autoTyping = (cmd: string) =&gt; {
  const interval = 100 // ms
  for (let i = 0; i &lt; cmd.length; i++) {
    setTimeout(
      () =&gt; {
        setCmd((prev) =&gt; prev + cmd.charAt(i))
      },
      interval * (i + 1)
    )
  }
}

```




#### 滚动到底部

            
<p>定义外层容器<code>ref</code>为<code>containerRef</code>，键入命令后都自动滚动到页面底部，使用了<code>scrollIntoView</code>api，作用是让调用这个api的容器始终在页面可见，<code>block</code>参数设置为<code>end</code>表示垂直方向末端对其即最底端。</p>


```tsx
const containerRef = useRef&lt;HTMLDivElement&gt;(null)
useEffect(() =&gt; {
  containerRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  })
}, [typedCmds])

```




### MDX

            
<blockquote>
<p>何为<code>mdx</code>？即给<code>md</code>添加了<code>jsx</code>支持，功能更强大的md，在nextjs中通过<code>@next/mdx</code>解析<code>.mdx</code>文件，它会将<code>md</code>和<code>react components</code>转成<code>html</code></p>
</blockquote>
<p>安装相关包，后两者作为<code>@next/mdx</code>的<code>peerDependencies</code></p>
<ul>
<li><code>@next/mdx</code></li>
<li><code>@mdx-js/loader</code></li>
<li><code>@mdx-js/react</code></li>
</ul>
<p>在<code>next.config.js</code>新增<code>createMDX</code>配置</p>


```js
// next.config.js

import createMDX from '@next/mdx'

const nextConfig = {}

const withMDX = createMDX()
export default withMDX(nextConfig)

```


<p>接着在应用根目录下新建<code>mdx-components.tsx</code></p>


```ts
// mdx-components.tsx

import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components
  }
}

```


<p>在<code>app</code>目录下使用<code>.mdx</code>文件，<code>useMDXComponents</code>组件是必要的，</p>
<p>需要注意的是此文件命名上有一定规范只能命名为<code>mdx-components</code>，不能为其他名称，也不可为<code>MdxComponents</code>，从<code>@next/mdx</code>源码中可以看出会去应用根目录查找<code>mdx-components</code>。</p>


```js
// @next/mdx部分源码

config.resolve.alias['next-mdx-import-source-file'] = [
  'private-next-root-dir/src/mdx-components',
  'private-next-root-dir/mdx-components',
  '@mdx-js/react'
]

```


<p>至此就可以在app中使用<code>mdx</code>。</p>


### 排版

            
<blockquote>
<p>为mdx解析成的html添加样式</p>
</blockquote>
<p>解析mdx为html，但并没有样式，所以我们借助<code>@tailwindcss/typography</code>来为其添加样式，在<code>tailwind.config.js</code>使用该插件。</p>


```js
// tailwind.config.js

module.exports = {
  plugins: [require('@tailwindcss/typography')]
}

```


<p>在外层标签上添加<code>prose</code>的className，<code>prose-invert</code>用于暗黑模式。</p>


```tsx
&lt;article className="prose dark:prose-invert"&gt;{mdx}&lt;/article&gt;

```


<p>综上我们实现了对mdx的样式支持，然而有一点是<code>@tailwindcss/typography</code>并不会对mdx代码块中代码进行高亮。</p>


### 代码高亮

            
<blockquote>
<p>写文章或多或少都有代码，高亮是必不可少，那么<code>react-syntax-highlighter</code>该上场了</p>
</blockquote>
<p>定义一个<code>CodeHighligher</code>组件</p>


```tsx
// CodeHighligher.tsx

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  oneLight
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes'

export default function CodeHighligher({
  lang,
  code
}: {
  lang: string
  code: string
}) {
  const { theme } = useTheme()
  return (
    &lt;SyntaxHighlighter
      language={lang?.replace(/\language-/, '') || 'javascript'}
      style={theme === 'light' ? oneLight : oneDark}
      customStyle={{
        padding: 20,
        fontSize: 15,
        fontFamily: 'var(--font-family)'
      }}
    &gt;
      {code}
    &lt;/SyntaxHighlighter&gt;
  )
}

```


<p><code>react-syntax-highlighter</code>高亮代码可用<code>hljs</code>和<code>prism</code>，我在这使用的<code>prism</code>，两者都有众多代码高亮主题可供选择，lang如果没标注则默认设置为<code>javascript</code>也可以简写为<code>js</code>，值得注意的是如果是使用<code>hljs</code>，则必须写<code>javascript</code>，不可简写为<code>js</code>，否则代码高亮失败，这一点<code>prism</code>更加友好。</p>
<p>同时可通过<code>useTheme</code>实现亮色，暗色模式下使用不同代码高亮主题。</p>
<p>组件写好了，该如何使用？上面讲到过mdx的解析，在<code>useMDXComponents</code>重新渲染<code>pre</code>标签。</p>


```tsx
// mdx-components.tsx

import type { MDXComponents } from 'mdx/types'
import CodeHighligher from '@/components/CodeHighligher'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children }) =&gt; {
      const { className, children: code } = props
      return &lt;CodeHighligher lang={className} code={code} /&gt;
    }
  }
}

```


<p>mdx文件中代码块会被解析成<code>pre</code>标签，可以对<code>pre</code>标签返回值作进一步处理，即返回高亮组件，这样可实现对代码高亮，当然高亮主题很多，选自己喜欢的。</p>


### 文章

            


#### 元数据

            
<blockquote>
<p>文章一些信息如标题，描述，日期，作者等都作为文章的元数据，使用<code>yaml</code>语法定义</p>
</blockquote>


```yaml
---
title: '文章标题'
description: '文章描述'
date: '2020-01-01'
---

```


<p>@next/mdx默认不会按照<code>yaml</code>语法解析，这会被解析成<code>h2</code>标签，然而我们并不希望元数据被解析成h2标签作为内容展示，更希望拿这类数据做其他处理，
为了正确解析<code>yaml</code>，需要借助<code>remark-frontmatter</code>来实现。</p>
<p>使用该插件，注意需要修改next配置文件名为<code>next.config.mjs</code>，因为<code>remark-frontmatter</code>只支持<code>ESM</code>规范。</p>


```js
// next.config.mjs

import createMDX from '@next/mdx'
import frontmatter from 'remark-frontmatter'

const nextConfig = {}

const withMDX = createMDX({
  options: {
    remarkPlugins: [frontmatter]
  }
})
export default withMDX(nextConfig)

```


<p>yaml被正确解析了那么我们可以使用<code>gray-matter</code>来获取文章元数据</p>


#### 列表

            
<p>由于app目录是运行在<code>nodejs runtime</code>下，基本思路是用nodejs的<code>fs</code>模块去读取文章目录即<code>mdxs/posts</code>，读取该目录下的所有文章放在一个list中。</p>
<p>使用<code>fs.readdirSync</code>读取文章目录内容，但是这仅仅是拿到文章名称的集合。</p>


```ts
const POST_PATH = path.join(process.cwd(), 'mdxs/posts')

// 文章名称集合
export function getPostList() {
  return fs.readdirSync(POST_PATH).map((name) =&gt; name.replace(/\.mdx/, ''))
}

```


<p>文章列表中展示的是标题而不是名称，标题作为文章的元数据，通过<code>gray-matter</code>的<code>read</code>api读取文件可获取（也可以使用<code>fs.readFileSync</code>） read返回<code>data</code>和<code>content</code>的对象，
<code>data</code>是元数据信息，<code>content</code>则是文章内容。</p>


```ts
export function getPostMetaList() {
  const posts = getPostList()

  return posts.map((post) =&gt; {
    const {
      data: { title, description, date }
    } = matter.read(path.join(POST_PATH, `${post}.mdx`))

    // 使用fs.readFileSync
    // const post = fs.readFileSync(path.join(POST_PATH, `${post}.mdx`), 'utf-8')
    // const {
    //   data: { title, description, date }
    // } = matter(post)

    return {
      slug: post,
      title,
      description,
      date
    }
  })
}

```


<p>上述方法中我们拿到了所有文章标题，描述信息，日期的list，根据list渲染文章列表。</p>


#### 详情

            
<p>文章列表中使用<code>Link</code>跳转到详情，通过<code>dynamic</code>动态加载文章对应的<code>mdx</code>文件</p>


```tsx
export default function LoadMDX(props: Omit&lt;PostMetaType, 'description'&gt;) {
  const { slug, title, date } = props

  const DynamicMDX = dynamic(() =&gt; import(`@/mdxs/posts/${slug}.mdx`), {
    loading: () =&gt; &lt;p&gt;loading...&lt;/p&gt;
  })

  return (
    &lt;&gt;
      &lt;div className="mb-12"&gt;
        &lt;h1 className="mb-5 font-[600]"&gt;{title}&lt;/h1&gt;
        &lt;time className="my-0"&gt;{date}&lt;/time&gt;
      &lt;/div&gt;
      &lt;DynamicMDX /&gt;
    &lt;/&gt;
  )
}

```




### generateStaticParams

            
<blockquote>
<p>优化文章列表跳转详情的速度</p>
</blockquote>
<p>在文章详情组件导出<code>generateStaticParams</code>方法，这个方法在构建时静态生成路由，而不是在请求时按需生成路由，一定程度上提高了访问详情页速度</p>


```ts
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) =&gt; res.json())

  return posts.map((post) =&gt; ({
    slug: post.slug
  }))
}

```




### 部署

            
<p>项目是部署在vercel，使用github登录后我们新建一个项目，点进去后会看到<code>Import Git Repository</code>，导入对应仓库即可，也可使用vercel提供的模版新建一个，后续我们每次提交代码都会自动化部署。</p>
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85eefd4e825b4dee81460d5c263387c4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="Alt Text" width="900" loading="lazy">
<p>有自己域名的可以在Domains中添加，然后去到你买域名的地方添加对应DNS解析即可。</p>


### 总结

            
<p>开发中遇到了一些坑：</p>
<ol>
<li><code>next-themes</code>报错<code>Warning: Extra attributes from the server: class,style</code>，通过issues和看文档，最终找到了方案</li>
<li><code>mdx-components</code>组件的命名，经多次测试发现只能命名为<code>mdx-components</code>，阅读@next/mdx的源码也验证了</li>
<li>语法高亮，开始使用的<code>hljs</code>，mdx中的代码块写的<code>js</code>，部署到线上后发现代码并没有高亮，然后改用了<code>prism</code>正常高亮，
又是阅读了<code>react-syntax-highlighter</code>源码发现hljs的语言集合中并没有<code>js</code>，所以无法正确解析，只能写成<code>javascript</code>，而<code>prism</code>两者写法都支持</li>
<li>首页的<code>posts</code>命令是运行在客户端组件中，fs无法使用，因此获取文章的方案使用fetch请求api</li>
<li>使用<code>remark-frontmatter</code>解析yaml无法和<code>mdxRs: true</code>同时使用，否则解析失败。添加此配置项表示使用基于<code>rust</code>的解析器来解析<code>mdx</code>，可能是还未支持的缘故</li>
</ol>


```js
module.exports = withMDX({
  experimental: {
    mdxRs: true
  }
})

```


<p>后续更新：</p>
<ol>
<li>会新增<code>Weekly</code>周刊模块，关注前端技术的更新</li>
<li>文章详情页添加上一篇和下一篇，更方便的阅读文章</li>
</ol>


### 试一试 👉Yucihent

            


### 博客源码 👉github

            
