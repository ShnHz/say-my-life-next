---
title: element-plus源码学习后，我了解到多种多样的写法
date: 2023/07/17 10:21:17
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

###### 原文 [掘金](https://juejin.cn/post/7255955134131503164)

<div class="markdown-body cache"><p>文章封面来自于深圳湾桥，很漂亮！</p>
<p>本文是阅读源码之后，学习到一些新写法，平常业务开发也可以用起来。在我看来，阅读源码，不但能知道该框架的底层原理，出现bug时，可以快速排查和修复，更重要的是，阅读源码就像向优秀的人学习，掌握我们不曾了解的新知识点，看看别人是如何编写出漂亮的，可复用的代码。</p>


## 操作符!.

            


```js
onMounted(() =&gt; {
  // 组合在一起,!. 就是“强制执行方法,然后再访问它的返回值”。
  const items = breadcrumb.value!.querySelectorAll(`.${ns.e('item')}`)
  if (items.length) {
    items[items.length - 1].setAttribute('aria-current', 'page')
  }
})

```




## 取值和监听值变化，不使用watch

            


```js
const checkedValue = computed&lt;CascaderValue&gt;({
  get() {
    return cloneDeep(props.modelValue) as CascaderValue
  },
  set(val) {
    emit(UPDATE_MODEL_EVENT, val)
    emit(CHANGE_EVENT, val)
    if (props.validateEvent) {
      formItem?.validate('change').catch((err) =&gt; debugWarn(err))
    }
  },
})

```




## 透传使用symbol

            


```js
provide(
      CASCADER_PANEL_INJECTION_KEY, // 透传下去，使用Symbol作为唯一值
      reactive({
        config,
        expandingNode,
        checkedNodes,
        isHoverMenu,
        initialLoaded,
        renderLabelFn,
        lazyLoad,
        expandNode,
        handleCheckChange,
      })
    )


export const CASCADER_PANEL_INJECTION_KEY: InjectionKey&lt;ElCascaderPanelContext&gt; =
  Symbol()



```


<p>强制执行，会影响最终值</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41f650c11c524dca8e5b80882130e32a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>


## 获取组件实例，调用组件自定义事件

            


```js
const { emit } = getCurrentInstance()!

const model = computed({
    get() {
      return isGroup.value
        ? checkboxGroup?.modelValue?.value
        : props.modelValue ?? selfModel.value
    },

    set(val: unknown) {
      if (isGroup.value &amp;&amp; isArray(val)) {
        isLimitExceeded.value =
          checkboxGroup?.max?.value !== undefined &amp;&amp;
          val.length &gt; checkboxGroup?.max.value
        isLimitExceeded.value === false &amp;&amp; checkboxGroup?.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel.value = val
      }
    },
  })


```


<ol>
<li>
<p>getCurrentInstance() 函数可以在 setup() 中获取到当前组件实例。</p>
</li>
<li>
<p>但是直接调用 getCurrentInstance() 会返回一个可选型(maybe)的实例,可能为 null。</p>
</li>
<li>
<p>为了确保获取到实例,使用 ! 非空断言运算符,强制转换为非空实例。</p>
</li>
<li>
<p>所以 getCurrentInstance()! 确保了返回的实例不会是 null。</p>
</li>
<li>
<p>然后使用 ES6 解构赋值语法,从实例中取出 emit 方法。</p>
</li>
<li>
<p>emit 方法用于在组件内部触发自定义事件。</p>
</li>
<li>
<p>这种方式避免了代码中出现隐式的 this,使代码更清晰可读。</p>
</li>
<li>
<p>是 Vue 3 Composition API 中常用的一种实例访问模式,用于在 setup() 中获取实例属性和方法。</p>
</li>
</ol>


## unref与ref

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c79dc60324d044dfb39ad6482486bbaa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>unref 和 ref 都可以用来获取响应式对象的值,但是有以下几点关键区别:</p>
<ol>
<li>
<p>unref 是一个函数,ref 是创建ref对象的方法。unref直接返回值,ref会创建一个响应式的引用对象。</p>
</li>
<li>
<p>unref 获取值,ref 创建值的引用。unref目的是获取值,ref是创建一个值的响应式引用。</p>
</li>
<li>
<p>unref 参数可以是基础值或响应式对象,ref只接受基础值创建引用。unref的参数可以是基础类型的值,也可以是ref或reactive对象,它会返回对象的值或对象本身。ref只接受基础类型的值来创建一个响应式的引用对象。</p>
</li>
<li>
<p>unref 使用场景是在组件逻辑中获取值,ref创建应用于模板的响应式引用。unref常用于组件逻辑中,需要获取响应式对象的原始值时使用。ref更多地在模板中使用,创建一个可以响应式跟踪的引用。</p>
</li>
</ol>
<p>unref直接返回的值，不需要用.value访问</p>


## rAF &amp; cAF

            
<p>requestAnimationFrame 和 cancelAnimationFrame 是浏览器用来实现高性能动画的 API。它可以把每一帧的代码编排到浏览器的一次重绘中,避免频繁的重绘导致性能问题。</p>
<p>这两个函数在频繁重绘调用，可以减轻浏览器负担</p>
<p>比如：定时器</p>


```js
const isClient = typeof window !== "undefined";

export const rAF = (fn: () =&gt; void) =&gt;
  isClient
    ? window.requestAnimationFrame(fn)
    : (setTimeout(fn, 16) as unknown as number)

export const cAF = (handle: number) =&gt;
  isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle)


```




## (event.target as HTMLElement).closest

            


```js
const handleMouseDown = (event: MouseEvent) =&gt; {
  const target = (event.target as HTMLElement).closest('td')
  if (!target) return
  focusWithClick = true
}

const handleMouseUp = (event: MouseEvent) =&gt; {
  const target = (event.target as HTMLElement).closest('td')
  if (!target) return
  focusWithClick = false
}

```


<p>closest() 方法会沿着 DOM 树向上寻找匹配的选择器的第一个祖先元素,在这里是查找最近的  元素。所以整个代码的作用就是: 获取点击事件的目标元素</p>
<ul>
<li>将其转化为 HTMLElement 类型</li>
<li>在其祖先元素中查找最近的 td 元素</li>
<li>并返回这个 td 元素这样可以方便地通过点击事件获取到对应的 td 元素进行后续操作。</li>
</ul></div>
