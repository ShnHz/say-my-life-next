---
title: Vue Hooks让Vue开发更简单与高效
date: 2023/09/07 14:59:32
summary:
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ['h3', 'h4', 'h5'],
    tag: ['vue', 'js'],
    valine: true,
    valineId: /blog/vue/VueHooksRangVueKaiFaGengJianDanYuGaoXiao.html
}
password: false
outline: [3, 5]
---

###### 原文 [掘金](https://juejin.cn/post/7256471433893724218)

# 前言

<p>Hooks是React等函数式编程框架中非常受欢迎的工具，随着VUE3 Composition API 函数式编程风格的推出，现在也受到越来越多VUE3开发者的青睐，它让开发者的代码具有更高的复用度且更加清晰、易于维护。</p>
<p>本文将快速略过并了解Hooks的使用基础以及自定义HOOK开发相关的要点，快速入门。</p>
<p>本文含有参考自官方文档、他人文章的内容，侵删。</p>

# Hooks 简介

<p><strong>1. 什么是Hooks</strong></p>
<p>Hooks并不是VUE特有的概念，实际上它原本被用于指代一些特定时间点会触发的勾子。而在React16之后，它被赋予了新的意义：</p>
<blockquote>
<p>一系列以&nbsp;<code>use</code>&nbsp;作为开头的方法，它们提供了让你可以完全避开&nbsp;<code>class式写法</code>，在函数式组件中完成生命周期、状态管理、逻辑复用等几乎全部组件开发工作的能力</p>
<p><code>Hooks最核心的价值来自于内部的状态管理</code></p>
</blockquote>
<p>在VUE3中，<code>Hooks</code>的概念结合了VUE的响应式系统，被称为<code>组合函数</code>。组合函数是VUE3组合式API中提供的新的逻辑复用的方案，是一类利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数</p>
<p>简单来说，它就是一个<code>创建工具的工具</code></p>
<p><strong>2. Hooks与composition Api</strong></p>
<p>Hooks是一种<code>基于闭包</code>的函数式编程思维产物，所以通常我们会在<code>函数式风格</code>的框架或组件中使用Hook，比如VUE的组合式API(Composition Api)。Hooks在VUE2所使用的<code>选项式风格API</code>中也不是不可以使用，毕竟Hook本质只是一个函数，只要hook内部所使用的api能够得到支持，我们可以在任何地方使用它们，只是可能需要额外的支持以及效果没有函数式组件中那么好，因为仍会被选项分割。</p>
<p>VUE3推出时为开发者带来了全新的Composition API即组合式API。它是一种通过函数来描述组件逻辑的开发模式。组合式API为开发者带来了更好的逻辑复用能力，通过<code>组合函数</code>来实现更加简洁高效的逻辑复用。</p>

```js
&lt;script setup&gt;
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() =&gt; {
  console.log(`The initial count is ${count.value}.`)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="increment"&gt;Count is: {{ count }}&lt;/button&gt;
&lt;/template&gt;

```

# 为什么要使用 Hook

<p><strong>1. Mixin/Class的局限性</strong></p>
<p>在以往VUE2的选项式API中，主要通过Mixin或是Class继承来实现逻辑复用，但这种方式有三个明显的<code>短板</code>：</p>
<ul>
<li>
<p><strong>不清晰的数据来源</strong>：当使用了多个mixin/class时，哪个数据是哪个模块提供的将变得难以追寻，这将提高维护难度</p>
</li>
<li>
<p><strong>命名空间冲突</strong>：来自多个class/mixin的开发者可能会注册同样的属性名，造成冲突</p>
</li>
<li>
<p><strong>隐性的跨模块交流</strong>：不同的mixin/class之间可能存在某种相互作用，产生未知的后果</p>
</li>
</ul>
<p>以上三种主要的缺点导致在大型项目的开发中，多mixin/class的组合将导致逻辑的混乱以及维护难度的提升，因而在VUE3的官方文档中不再继续推荐使用，保留mixin也只是为了迁移的需求或方便VUE2用户熟悉。</p>
<p><strong>2. Hooks的优势</strong></p>
<p>其实Mixin/Class的缺点反过来就是Hooks的优点：</p>
<ul>
<li>
<p>清晰一目了然的源头：Hooks不是一个类，没有将状态、方法存放在对象中，然后通过导出对象的形式实现复用，也就不会有对象间过度<code>耦合</code>、<code>干扰</code>等问题。Hooks中的各类状态是封装在内部的，与外界隔离，仅暴露部分函数、变量，这使得其来源、功能<code>清晰可辨</code>且<code>不易被干扰</code></p>
</li>
<li>
<p>没有命名冲突的问题：Hooks本质是闭包函数，内部所导出的变量、方法支持重命名，因而同一个Hook在同一个组件中可以N次使用而不冲突</p>
</li>
<li>
<p>精简逻辑：一个Hook开发完成后，在使用Hook时不需要关心其内部逻辑，只需知道有什么效果、如何使用即可，专注于其他核心业务逻辑，可以节省大量重复代码</p>
</li>
</ul>

```TypeScript
&lt;script lang="ts" setup&gt;
import { useAutoRequest } from '/@/utils/hooks'
import m from '/@/utils/message'

// 使用Hook
const [loadingWithHook, newApiWithHook] = useAutoRequest(testApi, {
  onSuccess: xxxData =&gt; {
    xxxData // 做些什么
  },
  onCatch: err =&gt; {
    err // 做些什么
  },
  message: '调用成功',
})

newApiWithHook()

// 不使用Hook
const loading = ref(false)
const fetchData = async () =&gt; {
  try {
    loading.value = true
    const xxxData = await testApi()
    xxxData //做些什么
    m.success('调用成功')
  } catch (err) {
    err // 做些什么
  } finally {
    loading.value = false
  }
}

fetchData()

// 模拟接口

interface Response {
  name: string
  age: number
}

function testApi(): Promise&lt;Response&gt; {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      const result = { name: 'test', age: 18 }

      resolve(result)
    }, 1000)
  })
}
&lt;/script&gt;

```

<p>可以看到在不使用Hook时，实现一个loading功能需要创建一个变量并手动控制它，而且需要使用try catch或者promise链式调用处理原来的接口的各种情况，这将产生大量的重复代码且可能因粗心而产生不必要的BUG</p>
<p>而在使用了Hook的情况下，loading状态以及接口的状态区分已经在内部处理好，仅需添加对应的参数即可，规范了写法、节省代码量、便捷且不易出错</p>
<p><strong>3. 组合式API的优点</strong></p>
<p>组合式API有一个很重要的优点，在组合式API中可以实现<code>更灵活的代码组织</code>：
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b54e14a895874668b463d20df0c11440~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="b3680785b61c4af8befdbe2b9ca18c90~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp" loading="lazy">
在选项式API中，人为地将代码分为了多个模块，非常有益于开发者上手，但是在模块复杂、代码量多的情况下将带来一些问题：</p>
<p><code>模块复杂</code>的情况下，查阅相同逻辑的内容时，需要<code>反复翻阅</code>组件的内容，对于开发者特别是非原本组件开发者而言，这会极大地<code>加重负担</code>，而如果使用组合式API，因为整个组件都是基于响应式变量以及函数，我们可以把处理相同业务逻辑的内容放在同一个区域，这样可以方便阅读理解，并且在抽离、复用时提供了很大的便利，在大型项目维护中非常重要。</p>
<p>以下是使用组合式API组织代码的示例：</p>

```TypeScript
&lt;script lang="ts" setup&gt;
import { getAllForSelect, type UserInfo } from '/@/api'
import { useAutoRequest } from '/@/utils/hooks'

interface Option {
  label: string
  value: string | number
}

const emit = defineEmits(['update:modelValue'，'focus', 'clear', 'blur', 'change'])

const props = defineProps({...})
const { modelValue } = toRefs(props)

const selectedValue = ref&lt;string | number&gt;('')

watch(modelValue, val =&gt; (selectedValue.value = val), { immediate: true })

const options = ref&lt;Array&lt;Option&gt;&gt;([])

// 使用Hook创建自动loading的请求接口
const [loading, getOptions] = useAutoRequest(getAllForSelect, {
    onSuccess: res =&gt; options.value = res.map(...)
})

onBeforeMount(getOptions)

const onChange = (v: number | string) =&gt; (emit('update:modelValue', v), emit('change', v))
const onFocus = () =&gt; emit('focus')
const onBlur = () =&gt; emit('blur')
const onClear = () =&gt; emit('clear')

const selectRef = ref&lt;any&gt;(null)

const blur = () =&gt; selectRef.value.blur()
const focus = () =&gt; selectRef.value.focus()

defineExpose({ blur, focus })
&lt;/script&gt;

```

<p>使用选项式API写同样功能的代码则需要将各个变量、函数置于不同的模块中，在模块复杂时，将增加维护难度</p>

# 怎么开始玩 Hooks

<p><strong>1. Hooks的各类规范</strong></p>
<p>在开始使用/创建Hook之前，我们需要明白它的一些<code>规范</code>，以下是创建/使用hook时的一些要求：</p>
<ol>
<li>
<p>通常来讲，一个Hook的命名需要以use开头，比如useTimeOut，这是约定俗成的，开发者看到useXXX即可明白这是一个Hook。Hook的名称需要清楚地表明其功能。</p>
</li>
<li>
<p><del>只在组件生命周期中调用Hook，而不在普通函数中调用Hook</del> (React中规定，但在Hook概念扩大化后，其实并非绝对)</p>
</li>
<li>
<p>只在当前关注的最顶级作用域使用Hook，而不要在嵌套函数、循环中调用Hook</p>
</li>
</ol>
<p>补充：</p>
<ul>
<li>
<p>函数必须是纯函数，没有副作用</p>
</li>
<li>
<p>返回值是一个函数或数据，供外部使用</p>
</li>
<li>
<p>Hook内部可以使用其他的Hook，组合功能</p>
</li>
<li>
<p>数据必须依赖于输入，不依赖于外部状态，保持数据流的明确性</p>
</li>
<li>
<p>在Hook内部处理错误，不要把错误抛出到外部，否则会增加hook的使用成本</p>
</li>
<li>
<p>Hook是单一功能的，不要给一个Hook设计过多功能。单个Hook只负责做一件事，复杂的功能可以使用多个Hook互相组合实现，如果给单个Hook增加过多功能，又会陷入过于臃肿、使用成本高、难维护的问题中</p>
</li>
</ul>
<p>规范化使用Hook可以使得除了开发者本人之外的其他协作者也可以快速上手他人代码。</p>
<blockquote>
<p>Hooks虽然有很多规定，但它们并不是铁律，在充分理解了Hook的工作原理，特殊情况下可以打破部分规范，前提是清楚这么做不会有意料之外的后果，但大部分情况下还是遵守规范比较好</p>
</blockquote>
<p><strong>2. 如何使用Hooks</strong></p>
<p>在VUE中，使用Hooks时，需要使用组合式API，因而最好在VUE3中使用，VUE2想要使用组合式API则需要配合<code>@vue/composition-api</code>，并且版本需要<code>高于VUE2.6</code>。</p>
<p>Hooks的使用十分简单，这也是它们被设计的意义所在，只需引入并调用函数即可。</p>

```TypeScript
&lt;script lang="ts" setup&gt;
import { useScroll } from '@vueuse/core'

const el = ref&lt;HTMLElement | null&gt;(null)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
&lt;/script&gt;

&lt;template&gt;
  &lt;div ref="el"&gt;&lt;/div&gt;
&lt;/template&gt;

```

<p>VUE社区有很多优秀的Hooks库，比如VueUse，它是由部分VUE核心成员开发的VUE Hook库，提供了很多非常好用的hook，查看、学习它的源码也非常有助于开发自己的hook</p>
<p><strong>3. 如何创建自己的自定义Hook</strong></p>
<p>在设计一个定制的Hook之前，应当至少明白以下几点：</p>
<ul>
<li>明确自己想要的功能以及实现的效果</li>
<li>遵守Hook的命名规范以及其他注意事项</li>
<li>尽可能好的性能表现以及精简的代码</li>
<li>使用TypeScript</li>
</ul>
<p>我们在开发自己的Hook时应该明确它的设计目的，遵守各项规范，最好使用TypeScript，特别是复杂的Hook</p>
<blockquote>
<p>当一个Hook内部较为复杂，配置项较多时，为了避免被错误使用，也为了尽早地发现可能的BUG，使用TypeScript的类型检查是非常有必要的，甚至为了更好的使用体验，应该结合TS类型计算，约束输入以及做到对输出内容的更好的类型提示</p>
</blockquote>
<p>以下是一个简单的分页模块Hook示例：</p>

```TypeScript
interface UsePaginationResponse {
  currentPage: Ref&lt;number&gt;
  pageSize: Ref&lt;number&gt;
  totalCount: Ref&lt;number&gt;
  skipCount: Ref&lt;number&gt;
  reset: () =&gt; void
}

export function usePagination(defaultPageSize?: number): UsePaginationResponse {
  const pageSize = ref(defaultPageSize ?? 20)
  const currentPage = ref(1)
  const totalCount = ref(0)
  const skipCount = computed(() =&gt; (currentPage.value - 1) * pageSize.value)

  return { currentPage, pageSize, totalCount, skipCount, reset }

  function reset() {
    currentPage.value = 1
    totalCount.value = 0
  }
  // 根据实际需求增加更多功能，比如自动管理接口数据等
}

// 使用
const { currentPage, pageSize, totalCount, skipCount, reset } = usePagination()

```

<p>这样就可以创建一个简单的分页功能hook，只需在需要分页的VUE组件中引入调用usePagination，就可以轻松创建分页模块，高效且清晰。</p>
<p>创建复杂Hook时，需要尽可能地对各种情况做好预先的处理，以保证它代码的健壮性</p>
<p><code>Hooks在一定程度上可以取代传统的VUE组件</code></p>
<p><strong>4. 使用TypeScript类型计算的Hook</strong></p>
<p>以下是一个自动创建携带Loading状态的接口的Hook：</p>

```TypeScript
import m from '/@/utils/message'

type TApiFun&lt;TData, TParams extends Array&lt;any&gt;&gt; = (...params: TParams) =&gt; Promise&lt;TData&gt;
type AutoRequestResult&lt;TData, TParams extends Array&lt;any&gt;&gt; = [Ref&lt;boolean&gt;, TApiFun&lt;TData, TParams&gt;]
interface AutoRequestOptions&lt;T&gt; {
  /**
   * @description 默认的loading状态
   *
   * @default false
   */
  loading?: boolean
  /**
   * @description 成功时是否自动提示
   */
  message?: string
  /**
   * @description 接口调用成功时的回调
   */
  onSuccess?: (data: T) =&gt; unknown | Promise&lt;unknown&gt;
  /**
   * @description 接口调用失败时的回调
   */
  onCatch?: (err: Error) =&gt; unknown | Promise&lt;unknown&gt;
}

/**
 * @description loading状态hooks
 * @param fun 接口方法
 * @param options 配置选项:设置默认loading状态、接口回调与自动提示开关
 * @returns [loading，接口]
 */
export default function useAutoRequest&lt;TData, TParams extends any[] = any[]&gt;(
  fun: TApiFun&lt;TData, TParams&gt;,
  options?: AutoRequestOptions&lt;TData&gt;,
): AutoRequestResult&lt;TData, TParams&gt; {
  const { loading = false, onSuccess, onCatch, message } = options ?? { loading: false }

  const requestLoading = ref(loading)

  const run: TApiFun&lt;TData, TParams&gt; = (...params) =&gt; {
    requestLoading.value = true

    return fun(...params)
      .then(async res =&gt; {
        onSuccess &amp;&amp; (await onSuccess(res))
        message &amp;&amp; m.success(message)
        return res
      })
      .catch(async err =&gt; {
        onCatch &amp;&amp; (await onCatch(err))
        throw new Error(err)
      })
      .finally(() =&gt; {
        requestLoading.value = false
      })
  }

  return [requestLoading, run]
}

// 使用
const [loading,apiWithLoading] = useAutoRequest(originApi, { message:'success' })

```

<p>这是一个自动创建loading状态的Hook，在使用时只需传入原始接口以及一些配置项即可快捷创建自动loading状态，节省了大量重复的loading控制代码，使用该Hook后只需调用apiWithLoading即可实现loading变量的自动控制，且继承原接口的类型</p>
<p>如果不使用TS进行处理，那么新创建的apiWithLoading在使用时将会丢失类型，无法提供像原本接口originApi一样的类型支持，使得出错的风险增加，而经过处理后的useAutoRequest可以在外部使用时自动推断apiWithLoading的类型，也可以在填入onSuccess时提供更好的类型支持：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98c1bb95c1f24f3681da26c330515553~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png" loading="lazy"></p>
<p><strong>5. Hooks与普通工具函数的区别</strong></p>
<p>简单来讲，Hooks是<code>创建工具的工具</code>而普通工具函数则是纯粹的<code>工具</code>。实际上根据开发者的喜好，一个普通的工具函数也可以被创建成Hooks的形式，但并不是很有必要，因为作为工具本身它已经很好用了，一定要包装成Hook反而多饶了一层，而且可能没有利用到Hook的优势</p>
<p>什么情况下适合创建为Hooks呢？</p>
<ul>
<li>具有一定泛用性的功能</li>
<li>具有一定复杂度，需要外部提供初始条件，由模块内部进行状态管理的功能</li>
<li>若干相关的、共享状态的业务功能</li>
<li>等等</li>
</ul>
<p><code>当需要内部状态管理时，才需要创建Hook</code></p>

# 总结

<p>Hooks是VUE3中利用组合式API响应式的特性的，实现简单高效的逻辑复用、提高开发效率、提高VUE模块可维护性的工具。Hooks的组合可以让组件低代价、高效率地实现高复杂度业务，Hooks之间通常相互独立，没有过度耦合，降低后期陷入<code>维护地狱</code>的风险，而且可以使得功能模块更加<code>易于测试</code></p>
<p>使用开源的Hook将为开发带来很多方便，而开发自定义Hook则需要花费一些时间，但在实现后，高度的定制化将为项目开发带来巨大的便利</p>
<p>Hooks的出现不意味着抛弃Class，Hooks也有自己的缺点比如内存泄漏和可能的性能问题。Class更加易于上手，在经验丰富、技术深厚的开发者手中也可以一定程度上避开Class的缺点</p>

# 建议

<p><strong>1. 插件</strong></p>
<ul>
<li>
<p>项目中可以加入类似unplugin-auto-import的插件，配置后可以实现自动引入VUE函数、类型或一些指定的内容，可以节省反复引入VUE API的时间</p>
</li>
<li>
<p>Type Challenges插件，提供很多不同难度的类型体操题目，可以提升对TS类型运算的理解</p>
</li>
</ul>
<p><strong>2. TypeScript</strong></p>
<ul>
<li>
<p>TS严格模式：使用TS时，要开启tsconfig中的严格模式，如果关闭严格模式，类型检查的效果将大打折扣</p>
</li>
<li>
<p>避免AnyScript：使用TS时要进行严格的类型声明，避免过多的any，因为使用any将失去类型检查，如果实在难以描述类型，则可以考虑使用unknow。TS项目中如果存在很多的any，不如抛弃TypeScript</p>
</li>
<li>
<p>不要保留报错：各类报错通常是用来处理<code>边界情况</code>的，这正是此类报错存在的意义，需要重视并解决。有时候开发者会比TS更清楚数据的类型，此时一些不必要的类型报错可以通过<code>类型断言</code>解决。重视并解决所有报错可以为代码提供更好的<code>健壮性</code></p>
</li>
</ul>
<p><strong>3. 代码建议</strong></p>
<ul>
<li>
<p>规范、明确的命名： 在命名变量或函数时，名称应该尽可能的明确它的作用/功能，不要使用缩写特别是拼音缩写，这将导致代码可读性严重下降，复杂变量/方法使用注释进行注解</p>
</li>
<li>
<p>积极使用新的ES语法：包括可选链操作符(?.)、解构、剩余参数语法、空值合并运算符(??)等，合理地使用它们将有效地提高代码可读性</p>
</li>
<li>
<p>合理的代码组织：单个函数中，一些相关的函数内容写在一起可以有效的规范代码结构，在某个代码块比较复杂时，还可以提取为一个函数置于函数后部，前半部分仅<code>保留核心逻辑</code>，可以有效提升代码可读性。在VUE组件中也是类似的逻辑</p>
</li>
<li>
<p>语义化代码：在编写代码时，调用各类JSAPI时，应该注重<code>语义化</code>，比如要对数组进行某种批处理，就使用Array.map而不是使用Array.forEach或其他循环方式然后配合外部创建的另一个空数组进行处理。要实现什么效果就使用什么API，这样既可以让代码精简，也可以增强可读性，让代码<code>自己描述自己</code>，这是<code>增强代码可读性的关键</code></p>
</li>
<li>
<p>基础功能使用工具类：在进行一些基础判断等操作时，尽量使用一些封装好的工具类，这样可以<code>避免</code>判断时的<code>疏漏</code>而产生错误；使用某功能时也先查询是否已有相关工具，同一类功能使用同一个封装好的工具将更<code>方便管理</code>，但要注意的是此类工具<code>不能过于复杂</code>，否则大范围应用后将会导致<code>难以维护</code>、牵一发而动全身</p>
</li>
</ul>
<p>简单示例：</p>

```TypeScript
class Info {
  name: string = "";
  age: number = 0;
}
interface TestInfo extends Info {
  other: any;
}

const formState = ref&lt;Info&gt;({ name: "", age: 0 }); // new Info()

const updateFormState = (data?: TestInfo): void =&gt; {
  clear();

  const { other = "empty", ...stateInfo } = data ?? {};

  formState.value = isNull(stateInfo) ? &lt;Info&gt;stateInfo : new Info();
  other; // 使用other
};

const clear = () =&gt; {};

/////////////////////////////////////
/**
 * @description 判断对象，数组，字符串，数字是否为空，例如:  NaN , undefined , null , '' , '   ' , {}  , [] 全部判断为空
 */
export function isNull(value: any): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === "string" &amp;&amp; value.trim() === "") {
    return true;
  }
  if (Array.isArray(value) &amp;&amp; value.length === 0) {
    return true;
  }
  if (value.constructor === Object &amp;&amp; Reflect.ownKeys(value).length === 0) {
    return true;
  }
  if (typeof value === "number" &amp;&amp; isNaN(value)) {
    return true;
  }
  return false;
}


```
