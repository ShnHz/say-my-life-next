---
title: 看了antfu大佬的v-lazy-show,我学会了怎么编译模板指令
date: 2023/05/09 11:44:52
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","vue","js"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7217836890119995450)

<div class="markdown-body cache">

### 前言

            
<p>一开始关注到 antfu 是他的一头长发，毕竟留长发的肯定是技术大佬。果不其然，antfu 是个很高产、很 creative 的大佬，我也很喜欢他写的工具，无论是<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fantfu%2Feslint-config" target="_blank" title="https://github.com/antfu/eslint-config" ref="nofollow noopener noreferrer">@antfu/eslint-config</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Funocss%2Funocss" target="_blank" title="https://github.com/unocss/unocss" ref="nofollow noopener noreferrer">unocss</a>、还是<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvitest-dev%2Fvitest" target="_blank" title="https://github.com/vitest-dev/vitest" ref="nofollow noopener noreferrer">vitest</a>等等。</p>
<p>而这篇文章故事的起源是，我今天中午逛 github 的时候发现大佬又又又又开了一个新的 repo（这是家常便饭的事），<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fantfu%2Fv-lazy-show" target="_blank" title="https://github.com/antfu/v-lazy-show" ref="nofollow noopener noreferrer">v-lazy-show</a></p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/012de87dc3e04510902615712a69725c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>看了下是两天前的，所以好奇点进去看看是什么东东。</p>
<p>介绍是：<strong>A compile-time directive to lazy initialize v-show for Vue. It makes components mount after first truthy value (v-if), and the DOM keep alive when toggling (v-show).</strong></p>
<p>简单的说，v-lazy-show 是一个编译时指令，就是对 v-show 的一种优化，因为我们知道，v-show 的原理只是基于简单的切换 display none，false则为none，true则移除</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7277ad30bbd4ec7906cb3574d5ea247~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="bite-me-i-dare-you.gif" loading="lazy"></p>
<p>但即使在第一次条件为 falsy 的时候，其依然会渲染对应的组件，那如果该组件很大，就会带来额外的渲染开销，比如我们有个 Tabs，默认初始显示第一个 tab，但后面的 tab 也都渲染了，只是没有显示罢了（实际上没有必要，因为可能你点都不会点开）。</p>
<p>那基于此种情况下，我们可以优化一下，即第一次条件为 falsy 的情况下，不渲染对应的组件，直到条件为 truthy 才渲染该组件。</p>
<p>将原本的 v-show 改为 v-lazy-show 或者 v-show.lazy</p>


```html
&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import ExpansiveComponent from './ExpansiveComponent.vue'

const enabled = ref(false)
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="enabled = !enabled"&gt;
    Toggle
  &lt;/button&gt;

  &lt;div class="hello-word-wrapper"&gt;
    &lt;ExpansiveComponent v-lazy-show="enabled" msg="v-lazy-show" /&gt;
    &lt;ExpansiveComponent v-show.lazy="enabled" msg="v-lazy.show" /&gt;

    &lt;ExpansiveComponent v-show="enabled" msg="v-show" /&gt;

    &lt;ExpansiveComponent v-if="enabled" msg="v-if" /&gt;
  &lt;/div&gt;
&lt;/template&gt;

```




```html
&lt;!-- ExpansiveComponent.vue --&gt;
&lt;script setup lang="ts"&gt;
import { onMounted } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
})

onMounted(() =&gt; {
  console.log(`${props.msg} mounted`)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;div v-for="i in 1000" :key="i"&gt;
      Hello {{ msg }}
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

```


<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fc4dc930fc54f65bbc52c63397c56cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="2023-04-03 15.55.15.gif" loading="lazy"></p>
<blockquote>
<p>ExpansiveComponent 渲染了 1000 行 div，在条件 enabled 初始为 false 的情况下，对应 v-show 来说，其依然会渲染，而对于 v-lazy-show 或 v-show.lazy 来说，只有第一次 enabled 为 true 才渲染，避免了不必要的初始渲染开销</p>
</blockquote>


### 如何使用？

            
<p>国际惯例，先装下依赖，这里强烈推荐 antfu 大佬的 <strong>ni</strong>。</p>


```shell
npm install v-lazy-show -D
yarn add v-lazy-show -D
pnpm add v-lazy-show -D
ni v-lazy-show -D

```


<p>既然是个编译时指令，且是处理 vue template 的，那么就应该在对应的构建工具中配置，如下：</p>
<p>如果你用的是 vite，那么配置如下</p>


```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { transformLazyShow } from 'v-lazy-show'

export default defineConfig({
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          nodeTransforms: [
            transformLazyShow, // &lt;--- 加在这里
          ],
        },
      },
    }),
  ]
})

```


<p>如果你用的是 Nuxt，那么应该这样配置：</p>


```ts
// nuxt.config.ts
import { transformLazyShow } from 'v-lazy-show'

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      nodeTransforms: [
        transformLazyShow, // &lt;--- 加上这行
      ],
    },
  },
})

```




### 那么，该指令是如何起作用的？

            
<p>上面的指令作用很好理解，那么其是如何实现的呢？我们看下大佬是怎么做的。具体可见<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fantfu%2Fv-lazy-show%2Fblob%2Fmain%2Fsrc%2Findex.ts" target="_blank" title="https://github.com/antfu/v-lazy-show/blob/main/src/index.ts" ref="nofollow noopener noreferrer">源码</a></p>
<p>源码不多，我这里直接贴出来，再一步步看如何实现（这里快速过一下即可，后面会一步步分析）：</p>


```ts
import {
  CREATE_COMMENT,
  FRAGMENT,
  createCallExpression,
  createCompoundExpression,
  createConditionalExpression,
  createSequenceExpression,
  createSimpleExpression,
  createStructuralDirectiveTransform,
  createVNodeCall,
  traverseNode,
} from '@vue/compiler-core'

const indexMap = new WeakMap()

// https://github.com/vuejs/core/blob/f5971468e53683d8a54d9cd11f73d0b95c0e0fb7/packages/compiler-core/src/ast.ts#L28
const NodeTypes = {
  SIMPLE_EXPRESSION: 4,
}

// https://github.com/vuejs/core/blob/f5971468e53683d8a54d9cd11f73d0b95c0e0fb7/packages/compiler-core/src/ast.ts#L62
const ElementTypes = {
  TEMPLATE: 3,
}

// https://github.com/vuejs/core/blob/f5971468e53683d8a54d9cd11f73d0b95c0e0fb7/packages/shared/src/patchFlags.ts#L19
const PatchFlags = {
  STABLE_FRAGMENT: 64,
}

export const transformLazyShow = createStructuralDirectiveTransform(
  /^(lazy-show|show)$/,
  (node, dir, context) =&gt; {
    // forward normal `v-show` as-is
    if (dir.name === 'show' &amp;&amp; !dir.modifiers.includes('lazy')) {
      return () =&gt; {
        node.props.push(dir)
      }
    }

    const directiveName = dir.name === 'show'
      ? 'v-show.lazy'
      : 'v-lazy-show'

    if (node.tagType === ElementTypes.TEMPLATE || node.tag === 'template')
      throw new Error(`${directiveName} can not be used on &lt;template&gt;`)

    if (context.ssr || context.inSSR) {
      // rename `v-lazy-show` to `v-if` in SSR, and let Vue handles it
      node.props.push({
        ...dir,
        exp: dir.exp
          ? createSimpleExpression(dir.exp.loc.source)
          : undefined,
        modifiers: dir.modifiers.filter(i =&gt; i !== 'lazy'),
        name: 'if',
      })
      return
    }

    const { helper } = context
    const keyIndex = (indexMap.get(context.root) || 0) + 1
    indexMap.set(context.root, keyIndex)

    const key = `_lazyshow${keyIndex}`

    const body = createVNodeCall(
      context,
      helper(FRAGMENT),
      undefined,
      [node],
      PatchFlags.STABLE_FRAGMENT.toString(),
      undefined,
      undefined,
      true,
      false,
      false /* isComponent */,
      node.loc,
    )

    const wrapNode = createConditionalExpression(
      createCompoundExpression([`_cache.${key}`, ' || ', dir.exp!]),
      createSequenceExpression([
        createCompoundExpression([`_cache.${key} = true`]),
        body,
      ]),
      createCallExpression(helper(CREATE_COMMENT), [
        '"v-show-if"',
        'true',
      ]),
    ) as any

    context.replaceNode(wrapNode)

    return () =&gt; {
      if (!node.codegenNode)
        traverseNode(node, context)

      // rename `v-lazy-show` to `v-show` and let Vue handles it
      node.props.push({
        ...dir,
        modifiers: dir.modifiers.filter(i =&gt; i !== 'lazy'),
        name: 'show',
      })
    }
  },
)

```




#### createStructuralDirectiveTransform

            
<p>因为是处理运行时的指令，那么自然用到了 createStructuralDirectiveTransform 这个函数，我们先简单看下其作用：</p>
<p>createStructuralDirectiveTransform 是一个工厂函数，用于创建一个自定义的 transform 函数，用于在编译过程中处理特定的结构性指令（例如 v-for, v-if, v-else-if, v-else 等）。</p>
<p>该函数有两个参数：</p>
<ul>
<li>
<p>nameMatcher：一个正则表达式或字符串，用于匹配需要被处理的指令名称。</p>
</li>
<li>
<p>fn：一个函数，用于处理结构性指令。该函数有三个参数：</p>
<ul>
<li>node：当前节点对象。</li>
<li>dir：当前节点上的指令对象。</li>
<li>context：编译上下文对象，包含编译期间的各种配置和数据。</li>
</ul>
</li>
</ul>
<p>createStructuralDirectiveTransform 函数会返回一个函数，该函数接收一个节点对象和编译上下文对象，用于根据指定的 nameMatcher 匹配到对应的指令后，调用用户自定义的 fn 函数进行处理。</p>
<p>在编译过程中，当遇到符合 nameMatcher 的结构性指令时，就会调用返回的处理函数进行处理，例如在本例中，当遇到 v-show 或 v-lazy-show 时，就会调用 transformLazyShow 处理函数进行处理。</p>


#### 不处理 v-show

            


```ts
if (dir.name === 'show' &amp;&amp; !dir.modifiers.includes('lazy')) {
    return () =&gt; {
      node.props.push(dir)
    }
  }

```


<p>因为 v-show.lazy 是可以生效的，所以 v-show 会进入该方法，但如果仅仅只是 v-show,而没有 lazy 修饰符，那么实际上不用处理</p>
<p>这里有个细节，为何要将指令对象 push 进 props，不 push 行不行？</p>
<p>原先的表现是 v-show 条件为 false 时 display 为 none，渲染了节点，只是不显示：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/587221d289ac43d299d2b2d5c2842243~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>而注释<code>node.props.push(dir)</code>后，看看页面表现咋样：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35a3b326c4374d8f8930aa64ae9da7fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>v-show 的功能没了，也就是说指令的功能会添加到 props 上，所以这里要特别注意，不是单纯的返回 node 即可。后来还有几处node.props.push，原理跟这里一样。</p>


#### 服务端渲染目前是转为 v-if

            


```ts
if (context.ssr || context.inSSR) {
      // rename `v-lazy-show` to `v-if` in SSR, and let Vue handles it
  node.props.push({
    ...dir,
    exp: dir.exp
      ? createSimpleExpression(dir.exp.loc.source)
      : undefined,
    modifiers: dir.modifiers.filter(i =&gt; i !== 'lazy'),
    name: 'if',
  })
  return
}

```


<p>将 v-lazy-show 改名为 v-if，且过滤掉修饰符</p>


#### createVNodeCall 给原先节点包一层 template

            
<p>顾名思义，createVNodeCall 是 用来创建一个 vnode 节点的函数：</p>


```ts
const body = createVNodeCall(
      /** 当前的上下文 (context) 对象，即 CodegenContext */
      context,
      /** helper 函数是 Vue 内部使用的帮助函数。FRAGMENT 表示创建 Fragment 节点的 helper 函数 */
      helper(FRAGMENT),
      /** 组件的 props */
      undefined,
      /** 当前节点的子节点数组，即包含有指令的节点本身 */
      [node],
      /** 表示该节点的 PatchFlag，指明了该节点是否稳定、是否具有一些特定的更新行为等。STABLE_FRAGMENT 表示该 Fragment 节点是一个稳定的节点，即其子节点不会发生改变 */
      PatchFlags.STABLE_FRAGMENT.toString(),
      /** 该节点的动态 keys */
      undefined,
      /** 该节点的模板引用 (ref) */
      undefined,
      /** 表示该节点是否需要开启 Block (块) 模式，即是否需要对其子节点进行优化 */
      true,
      /** 表示该节点是否是一个 Portal 节点 */
      false,
      /** 表示该节点是否是一个组件 */
      false /* isComponent */,
      /** 该节点在模板中的位置信息 */
      node.loc,
)

```


<p>参数含义如下，简单了解即可（反正看了就忘）</p>
<p>也就是说，其会生成如下模板：</p>


```html
&lt;template&gt;
  &lt;ExpansiveComponent v-lazy-show="enabled" msg="v-lazy-show" /&gt;
&lt;/template&gt;

```




#### 关键代码（重点）

            
<p>接下来这部分是主要原理，请打起十二分精神。</p>
<p>先在全局维护一个 map，代码中叫 indexMap，是一个 WeakMap（不知道 WeakMap 的可以去了解下）。然后为每一个带有 v-lazy-show 指令的生成一个唯一 key，这里叫做<code>_lazyshow${keyIndex}</code>，也就是第一个就是_lazyshow1，第二个是_lazyshow2...</p>


```ts
  const keyIndex = (indexMap.get(context.root) || 0) + 1
  indexMap.set(context.root, keyIndex)

  const key = `_lazyshow${keyIndex}`

```


<p>然后将生成的key放到渲染函数的_cache上（渲染函数的第二个参数，<code>function render(_ctx, _cache)</code>），即通过<code>_cache.${key}</code>作为辅助变量。之后会根据 createConditionalExpression 创建一个条件表达式</p>


```ts
const wrapNode = createConditionalExpression(
      createCompoundExpression([`_cache.${key}`, ' || ', dir.exp!]),
      createSequenceExpression([
        createCompoundExpression([`_cache.${key} = true`]),
        body,
      ]),
      // 生成一个注释节点 `&lt;!--v-show-if--&gt;`
      createCallExpression(helper(CREATE_COMMENT), [
        '"v-show-if"',
        'true',
      ]),
)

```


<p>也就是说， v-lazy-show 初始传入的条件为 false 时，那么会为你创建一个注释节点，用来占位：</p>


```ts
createCallExpression(helper(CREATE_COMMENT), [
  '"v-show-if"',
  'true',
])

```


<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9d60d57c5c441b9a15258c37c42ad2c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<blockquote>
<p>这个跟 v-if 一样</p>
</blockquote>
<p>直到第一次条件为真时，将 <code>_cache.${key}</code> 置为 true，那么以后的行为就跟 v-show 一致了，上面的 dir.exp 即指令中的条件，如</p>


```html
&lt;div v-show="enabled"/&gt;

```


<p>enabled 即 exp，表达式的意思。</p>
<p>readme给出的转换如下：</p>


```html
&lt;template&gt;
  &lt;div v-lazy-show="foo"&gt;
    Hello
  &lt;/div&gt;
&lt;/template&gt;

```


<p>会转换为：</p>


```ts
import { Fragment as _Fragment, createCommentVNode as _createCommentVNode, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, openBlock as _openBlock, vShow as _vShow, withDirectives as _withDirectives } from 'vue'

export function render(_ctx, _cache) {
  return (_cache._lazyshow1 || _ctx.foo)
    ? (_cache._lazyshow1 = true, (_openBlock(),
      _withDirectives(_createElementVNode('div', null, ' Hello ', 512 /* NEED_PATCH */), [
        [_vShow, _ctx.foo]
      ])))
    : _createCommentVNode('v-show-if', true)
}

```


<p>你可以简单理解为会将<code>&lt;ExpansiveComponent msg="v-lazy-show" v-lazy-show=""enabled"/&gt;</code>转为下面：</p>


```html
&lt;template v-if="_cache._lazyshow1 || enabled"&gt;
    &lt;!-- 为true时会把_cache._lazyshow1置为true，那么以后的v-if就用于为true了 --&gt;
    &lt;ExpansiveComponent msg="v-lazy-show" v-lazy-show="enabled"/&gt;
&lt;/template&gt;
&lt;template v-else&gt;
  &lt;!--v-show-if--&gt;
&lt;/template&gt;

&lt;template v-if="_cache._lazyshow2 || enabled"&gt;
    &lt;!-- 为true时会把_cache._lazyshow2置为true，那么以后的v-if就用于为true了 --&gt;
    &lt;ExpansiveComponent msg="v-lazy-show" v-show.lazy="enabled"/&gt;
&lt;/template&gt;
&lt;template v-else&gt;
  &lt;!--v-show-if--&gt;
&lt;/template&gt;

```


<p>然后将原先节点替换为处理后的 wrapperNode 即可</p>


```ts
context.replaceNode(wrapNode)

```




#### 最后将 v-lazy-show | v-shouw.lazy 处理为 v-show

            
<p>因为 vue 本身是没有 v-lazy-show 的，v-show 也没有 lazy 的的修饰符，那么要让指令生效，就要做到两个：</p>
<ol>
<li>将原先的 show-lazy 改名为 show</li>
<li>过滤掉 lazy 的修饰符</li>
</ol>


```ts
node.props.push({
   ...dir,
   modifiers: dir.modifiers.filter(i =&gt; i !== 'lazy'),
   name: 'show',
 })

```


<p>也就变成这样啦：</p>


```html
&lt;template v-if="_cache._lazyshow1 || enabled"&gt;
    &lt;!-- 为true时会把_cache._lazyshow1置为true，那么以后的v-if就用于为true了 --&gt;
    &lt;ExpansiveComponent msg="v-lazy-show" v-show="enabled"/&gt;
&lt;/template&gt;
&lt;template v-else&gt;
  &lt;!--v-show-if--&gt;
&lt;/template&gt;


&lt;template v-if="_cache._lazyshow2 || enabled"&gt;
    &lt;!-- 为true时会把_cache._lazyshow2置为true，那么以后的v-if就用于为true了 --&gt;
    &lt;ExpansiveComponent msg="v-show.lazy" v-show="enabled"/&gt;
&lt;/template&gt;
&lt;template v-else&gt;
  &lt;!--v-show-if--&gt;
&lt;/template&gt;

```


<p>小结一下：</p>
<ol>
<li>
<p>为每一个使用 v-lazy-show 分配唯一的 key，放到渲染函数内部的_cache上，即借助辅助变量<code>_cache.${key}</code></p>
<ul>
<li>当初始条件为 falsy 时不渲染节点，只渲染注释节点 <code>&lt;!--v-show-if--&gt;</code></li>
<li>直到条件为真时将其置为 true，之后的表现就跟 v-show 一致了</li>
</ul>
</li>
</ol>
<ol start="2">
<li>由于 vue 不认识 v-lazy-show，v-show.lazy，使用要将指令改回 v-show，且过滤掉 lazy 修饰符(如果使用 v-show.lazy 的话)</li>
</ol>


### 最后

            
<p>以上就是我对该运行时编译插件的认识了，可以将 repo 拉下来，上面有个 playground，可以自己调试调试，说不定有新的认识。</p>
<p>好了，文章到此为止，你今天学废了吗？</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5751104c3874261bbb00f92d7964c02~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
</div>
