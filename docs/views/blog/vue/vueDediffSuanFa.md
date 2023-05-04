---
title: 虚拟DOM以及vue的diff算法
date: 2022/12/19 14:42:17
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["vue","js"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

### 虚拟DOM

#### 虚拟DOM是什么？

虚拟->DOM<- - ->Virtual DOM<- 就是利用**js对象**模拟的一个->DOM<-结构

```js
// 这就是一个虚拟DOM

{
    data:{},
    elm:undefined,
    key:undefined,
    sel:"div",
    text:"我是一个div",
    children:[
        {
            data:{},
            elm:undefined,
            key:undefined,
            sel:"span",
            text:"我是一个span",
        }
    ]
}
```

#### 为什么要用虚拟DOM

+ 当然是前端优化方面，避免频繁操作->DOM<-，频繁操作->DOM<-会可能让浏览器回流和重绘，性能也会非常低，还有就是手动操作 ->DOM<- 还是比较麻烦的，要考虑浏览器兼容性问题，当前->jQuery<-等库简化了 ->DOM<-操作，但是项目复杂了，->DOM<-操作还是会变得复杂，数据操作也变得复杂

+ 并不是所有情况使用->虚拟DOM<- 都提高性能，是针对在复杂的的项目使用。如果简单的操作，使用->虚拟DOM<-,要创建->虚拟DOM<-对象等等一系列操作，还不如普通的->DOM<-操作

+ ->虚拟DOM<- 可以实现跨平台渲染，服务器渲染 、小程序、原生应用都使用了->虚拟DOM<-

+ 使用->虚拟DOM<-改变了当前的状态不需要立即的去更新->DOM<- ，对于没有改变的内容不做任何操作，通过前后两次差异（->diff<-）进行比较

+ ->虚拟DOM<- 可以维护程序的状态，跟踪上一次的状态

#### snabbdom介绍

> snabbdom是虚拟DOM的鼻祖

->snabbdom<- 是一个开源的项目，->Vue<- 里面的 ->虚拟DOM<- 当初是借鉴了->snabbdom<-,我们可以通过了解->snabbdom<-的->虚拟DOM<- 来理解 ->Vue<- 的->虚拟DOM<-,->Vue<- 的源码太多，->snabbdom<- 比较简洁，所以可以用它来展开 ->虚拟DOM<- 的研究

[https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)

#### h 函数

可以看到在 ->snabbdom<- 会用到很多次的 ->h 函数<-，主要作用是**创建 虚拟节点（VNode）**

比如这样调用->h 函数<-

```js
h('a',{props:{href:'https:www.baidu.com'}},'百度')
```

就会得到这样的->VNode<-

```js
{
    sel:'a',
    data:{
        props:{
            href:'https:www.baidu.com'
        }
    },
    text:'百度',
    elm:undefined,
    key:undefined,
    children:undefined
}
```

##### h 函数的各种用法

```js
// 普通用法
h('a',{props:{href:'https:www.baidu.com'}},'百度')

// 可以省略第二个参数
h('a','百度')

// 有子节点
h('ul',[
    h('li','项目1'),
    h('li','项目2'),
    h('li','项目3')
])

// 子节点嵌套
h('ul',{
    class:{
        'ul-wrap':true
    }
},[
    h('li','项目1'),
    h('li',[
        h('div',[
            h('p','1'),
            h('p','2')
        ])
    ]),
    h('li',h('span','项目3'))
])
```

##### 手写 h 函数

```js
function vnode(sel,data,children,text,elm){
    // vnode的函数功能非常简单，就是把传入的参数组成对象返回
    return {
        sel,data,children,text,elm
    }
}

function h(sel, data, c) {
    // 写一个低配弱智版的h函数，没有实现函数重载的功能
    // 也就是说，调用的时候形态必须是这样的
    // 1. h('div',{},'text')
    // 2. h('div',{}, [])
    // 3. h('div',{}, h())

    if (typeof c == 'string' || typeof c == 'number') {
        // 形态1
        return vnode(sel, data, undefined, c, undefined)
    } else if (Object.prototype.toString.call(c) == '[array Object]') {
        // 形态2
        let children = []
        for (let i = 0, len = c.length; i < len; i++) {
            if (!Object.prototype.toString.call(c[i]) == '[object Object]' && c[i].hasOwnProperty('sel')) {
                throw Error('传入的数组不是有效项目（不是一个合法的对象）')
            }
            children.push(c[i])
        }

        return vnode(sel, data, children, undefined, undefined)
    } else if (Object.prototype.toString.call(c) == '[object Object]' && c.hasOwnProperty('sel')) {
        // 形态3
        return vnode(sel, data, [c], undefined, undefined)
    } else {
        throw Error('调用函数错误')
    }
}
```

### diff算法

#### 感受diff算法

用->snabbdom<-来测试一下diff算法

```js
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "./snabbdom/build/index.js";

const patch = init([
    // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");
const btn = document.getElementById("btn");

let vnode1 = h('ul', [
    h('li', 'A'),
    h('li', 'B'),
    h('li', 'C'),
])

patch(container, vnode1)

let vnode2 = h('ul', [
    h('li', 'A'),
    h('li', 'B'),
    h('li', 'C'),
    h('li', 'D'),
])

btn.onclick = () => {
    patch(vnode1, vnode2)
}
```

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/1.gif"/>

单击按钮后成功的在元素最后增加了一个元素->D<-

----

我们可以验证一下到底是不是真的是**最小量更新**

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/2.gif"/>

可以看到确实没有改变->A<-的内容，单纯的在列表最后加上了一个->D<-

----

那么如果我们把->vnode2<-改成这样子，在->A<-前面插入一个->D<-

```js
let vnode2 = h('ul', [
    h('li', 'D'),
    h('li', 'A'),
    h('li', 'B'),
    h('li', 'C'),
])
```

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/3.gif"/>

神奇的事情发生了，为什么会将->A<-也改变了呢？

这是因为->diff<-算法会在最后插入一个元素->D<-，再将->A<-改为->D<-，->B<-改为->A<-，->C<-改为->B<-，->D<-改为->C<-

这个时候就需要用到我们的->key<-值了，->key<-表示->vnode<-唯一标识符，就是用来优化->diff<-算法的

```js
let vnode1 = h('ul', [
    h('li', {
        key: 'A'
    }, 'A'),
    h('li', {
        key: 'B'
    }, 'B'),
    h('li', {
        key: 'C'
    }, 'C'),
])

let vnode2 = h('ul', [
    h('li', {
        key: 'D'
    }, 'D'),
    h('li', {
        key: 'A'
    }, 'A'),
    h('li', {
        key: 'B'
    }, 'B'),
    h('li', {
        key: 'C'
    }, 'C'),
])
```

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/4.gif"/>

再来验证一下，没有问题！

----

如果两个->vnode<-不是同一->sel<-会怎么样？我们来验证一下

```js
let vnode1 = h('ul', [
    h('li', {
        key: 'A'
    }, 'A'),
    h('li', {
        key: 'B'
    }, 'B'),
    h('li', {
        key: 'C'
    }, 'C'),
])

let vnode2 = h('ol', [
    h('li', {
        key: 'A'
    }, 'A'),
    h('li', {
        key: 'B'
    }, 'B'),
    h('li', {
        key: 'C'
    }, 'C'),
])
```

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/5.gif"/>

可以看到，->diff<-是会暴力删除旧节点，添加一个新的节点，不会最小量更新

----

如果两个->vnode<-层级不一样？我们来验证一下

```js
let vnode1 = h('div', [
    h('p', {
        key: 'A'
    }, 'A'),
    h('p', {
        key: 'B'
    }, 'B'),
    h('p', {
        key: 'C'
    }, 'C'),
])

let vnode2 = h('div', h('section', [
    h('p', {
        key: 'A'
    }, 'A'),
    h('p', {
        key: 'B'
    }, 'B'),
    h('p', {
        key: 'C'
    }, 'C'),
]))
```

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/6.gif"/>

可以看到，->diff<-也是会暴力删除旧节点，添加一个新的节点，不会最小量更新

##### 感受心得

+ 1. 最小量更新真的是最小量更新。<b>当然->key<-很重要，->key<-是->vnode<-的唯一标识，告诉->diff<-算法，在更改前后它们是同一个节点。</b>
+ 2. **只有同一个节点，才进行精细化比较**。否则就是暴力删除旧的，插入新的。什么是同一个节点？选择器相同且->key<-相同。
+ 3. **只进行同层比较，不会跨层比较**。即使是同一片虚拟节点，但是跨层了，对不起，精细化比较不->diff<-你。而是暴力删除旧的，然后插入新的。

#### patch函数的执行流程

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/7.jpg"/>

我们一步一步按照流程来写我们的->patch<-

#### 第一步，判断oldVnode是否为虚拟节点

```js
export default function (oldVnode, newVnode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点
    if (isElement(oldVnode)) {

    }
}

function isElement(node) {
    return node.sel == '' || oldVnode.sel == undefined
}
```

如果**不是**则将->oldVnode<-包装为虚拟节点

```js
import {
    vnode,
} from "../snabbdom/build/index.js";

export default function (oldVnode, newVnode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点
    if (isElement(oldVnode)) {
        // 是DOM节点，则包装为虚拟节点
        oldVnode = emptyNodeAt(oldVnode)
    }
}

function isElement(node) {
    return node.sel == '' || node.sel == undefined
}

function emptyNodeAt(elm) {
    // 获取DOM ID
    const id = elm.id ? "#" + elm.id : "";

    // 获取DOM class，并且拼接为相应格式
    const classes = elm.getAttribute("class");
    const c = classes ? "." + classes.split(" ").join(".") : "";

    // 利用vnode方法，返回一个虚拟节点
    // vnode方法传参
    // sel,
    // data,
    // children,
    // text,
    // elm
    return vnode(
        elm.tagName.toLowerCase() + id + c, {},
        [],
        undefined,
        elm
    );
}
```

#### 第二步，判断oldVnode和newVnode是否是同一个节点

如果是同一个节点，则进行精细化比较

如果不是同一个节点，则删除旧节点，添加新节点

```js
export default function (oldVnode, newVnode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点
    if (isElement(oldVnode)) {
        // 是DOM节点，则包装为虚拟节点
        oldVnode = emptyNodeAt(oldVnode)
    }

    // 判断是否是同一个节点
    if (sameVnode(oldVnode, newVnode)) {
        // 是则进行精细化比较
    } else {
        // 不是则删除旧的添加新的节点
    }
}

function sameVnode(oldVnode, newVnode) {
    //当key和sel都相同，我们可以将两个虚拟节点称为是同一个节点
    return oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel
}
```

#### 第三步，精细化比较或暴力插入

##### 暴力插入

我们首先来看暴力插入，这个比较简单一些

```js
// 创建DOM并插入到oldVnode之前
createElm(newVnode, oldVnode.elm);
oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)

// 删除老节点
oldVnode.elm.parentNode.removeChild(oldVnode.elm)

function createElm(vnode) {
    let dom = document.createElement(vnode.sel)
    if (vnode.text != '' && (vnode.children == undefined || vnode.children && vnode.children.length == 0)) {
        // 如果是一个普通节点，则直接创建
        dom.innerText = vnode.text
    } else if (Object.prototype.toString.call(vnode.children) == '[object Array]' && vnode.children && vnode.children.length > 0) {
        // 如果有子节点，则递归创建
        for (let i = 0, len = vnode.children.length; i < len; i++) {
            dom.append(createElm(vnode.children[i]))
        }
    }

    vnode.elm = dom

    return vnode.elm;
}
```

##### 精细化比较

这边也可以看一下精细化比较的流程图，因为之前写的h函数是低配版的，所以忽略->text<-属性和->children<-属性再虚拟节点下共同存在的情况（说明下文写的精细化比较也是阉割版的）

<img src="https://cdn.chenyingshuang.cn/blog/vue/vueDediffSuanFa/8.jpg"/>

我们先来解决比较简单的情况

```js
// 精细化比较
// 判断新旧节点是否是同一个对象
if (oldVnode === newVnode) return

// 判断新节点有没有text属性，如果有则直接替换旧节点
if (newVnode.text != undefined) {
    // 有text
    if (newVnode.text !== oldVnode.text) {
        oldVnode.elm.innerText = newVnode.text
    }
} else {
    // 没有text
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
        // 老节点有子节点，且新节点也有子节点，此时是最复杂的情况，需要diff算法
        .........
    } else {
        // 老节点没有子节点，新节点有子节点，直接根据新节点创建DOM然后插入老节点的位置即可
        let newVnodeElm = createElm(newVnode)
        oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}
```

##### diff算法策略

当新旧节点都有->children<-时，此时会进入最复杂的情况吗，这个时候就需要->diff<-算法了，也就是最核心的内容
###### 四种命中查找

+ 1.新前与旧前
+ 2.新后与旧后
+ 3.新后与旧前
+ 4.新前与旧后

命中一种则不再继续命中判断，如果以上逻辑都匹配不到，再把所有旧子节点的 ->key<- 做一个映射到旧节点下标的 ->key - index<- 表，然后用新 ->vnode<- 的 ->key<- 去找出在旧节点中可以复用的位置。

```js
// 完整代码
import sameVnode from "./sameVnode.js";
import patchVNode from "./patchVNode.js";
import createElm from "./createElm.js";

export default function updateChildren(parentElm, oldCh, newCh) {
    // 旧前
    let oldStartIdx = 0
    let oldStartVnode = oldCh[0]
    // 新前
    let newStartIdx = 0
    let newStartVnode = newCh[0]
    // 旧后
    let oldEndIdx = oldCh.length - 1
    let oldEndVnode = oldCh[oldEndIdx]
    // 新后
    let newEndIdx = newCh.length - 1
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            console.log('①1')
            // 新前-旧前命中
            patchVNode(oldStartVnode, newStartVnode)

            // 指针向后移动
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            console.log('②2')
            // 新后-旧后命中
            patchVNode(oldEndVnode, newEndVnode)

            // 指针向前移动
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            console.log('③3')
            // 新后-旧前命中
            patchVNode(oldStartVnode, newEndVnode)
            // 移动节点，移动“旧前Vnode”到“旧后Vnode”后面
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            // old指针向后移动 new指针向前移动
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            console.log('④4')
            // 新前-旧后命中
            patchVNode(newStartVnode, oldEndVnode)

            // 移动节点，移动“新前Vnode”到“旧前Vnode”前面
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            // old指针向前移动 new指针向后移动
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[--newStartIdx]
        } else {
            // 都没有命中的情况

            if (!keyMap) {
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    let key = oldCh[i].key
                    if (key) {
                        keyMap[key] = i
                    }
                }
            }

            const idxInOld = keyMap[newStartVnode.key];
            if (idxInOld) {
                // 如果旧节点内有这个新节点
                const elmToMove = oldCh[idxInOld];
                patchVnode(elmToMove, newStartVnode);
                oldCh[idxInOld] = undefined;
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
            } else {
                // 没有，则创建新节点
                parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
            }
        }
    }

    if (newStartIdx <= newEndIdx) {
        // 说明新节点还没有循环完，需要新增节点
        const before = newCh[newEndIdx + 1] == undefined ? null : newCh[newEndIdx + 1].elm;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElm(newCh[i]), before)
            // insertBefore第二个参数如果为null，则会插入到队尾
            // newCh[i]是Vnode，不是真实DOM，所以需要创建一个真实DOM并插入
        }
    } else if (oldStartIdx <= oldEndIdx) {
        // 说明旧节点还没有循环完，需要删除节点
        // const before = newCh[newEndIdx + 1] == undefined ? null : newCh[newEndIdx + 1].elm;
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}
```

#### Vue2与Snabbdom

> 判定节点类型是否相等的函数不同

在 ->Snabbdom<- 中有一个 ->sameVnode<- 函数，它是用来判别两个节点是否属于同一类型的，判别的条件就是看两个节点的 ->key<- 和 ->sel<- 是否相等，简单来说就是比对了添加到元素上的属性 ->key、标签名 tag、选择器名 class、id<-
->Vue2<- 不变的是其仍将 ->key<- 作为首要的判定对象，但并没有判定选择器的名称，也就是说类名不同的元素在 ->Vue2<- 中也是可能复用的，

举个例子：

```html
<div class='nav'>
<div class='title'>
```

在 ->Snabbdom<- 中会认为是类型不同的两个节点，因为它们对应的类名不同，但是在 ->React<- 和 ->Vue<- 中，会认为它们是类型一致的节点，会对旧节点进行更新复用
在此基础上，->Vue2<- 还增加了对标签名 tag 的单独判断、是否为注释节点、是否为异步节点、元素为 input 时候 type 是否相同等等条件

```js
// Vue2 中 sameVnode 源码
function sameVnode (a, b) {
  return (
    a.key === b.key && // key 值的判断
    a.asyncFactory === b.asyncFactory && (
      (
        a.tag === b.tag && // 标签名的判断
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b) // input 标签 type 的判断
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

#### Vue2与Vue3

> ->updateChildren<-中使用的核心算法不同

->vue2<- 中的 ->diff<- 算法采用了双端比较法，通过给子元素数组设置首尾指针从数组两端开始比较，然后一步步控制指针向中间移动，当指针指向的节点类型均不相同时，还会将剩余老孩子 ->key<- 和索引 ->index<- 映射到一个 ->JS<- 对象中，借助 ->key<- 寻找能够复用的节点

->vue3<-对diff过程进行了大升级，去掉了针对下标 ->key<- 的查找，而是变成了计算可以最少移动 ->DOM<- 的方案，然后再进行 ->DOM<- 更新，而要想看懂->vue3.0<-中->diff<-算法，首先需要先对最长递增子序列的求解有一个基本的了解，因为 ->vue<- 就是在它的基础上来不断打磨、完善的diff算法。具体可以看看这篇文章：[最长递增子序列及vue3.0中diff算法](https://juejin.cn/post/7134499769803603999)