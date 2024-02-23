---
title: 不要再滥用可选链运算符(?.)啦！
date: 2024/02/23 16:37:06
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7280747572707999799)



## 前言

            
<p>之前整理过 <a href="https://juejin.cn/post/7235109911780311101" target="_blank" title="https://juejin.cn/post/7235109911780311101">整理下最近做的产品里 比较典型的代码规范问题</a>，里面有一个关于<code>可选链运算符(?.)</code>的规范，当时只是提了一下，今天详细说下想法，欢迎大佬参与讨论。</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FOptional_chaining" target="_blank" title="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining" ref="nofollow noopener noreferrer">可选链运算符(?.)</a>，大家都很熟悉了，直接看个例子：</p>


```js
const result = obj?.a?.b?.c?.d

```


<p>很简单例子，上面代码?前面的属性如果是空值（null或undefined），则result值是undefined，反之如果都不是空值，则会返回最后一个d属性值。</p>
<p>本文不是讲解这种语法的用法，主要是想分析下日常开发中，这种语法 <strong>滥用、乱用</strong> 的问题。</p>


## 滥用、乱用

            
<p>最近在code review一个公司项目代码，发现代码里用到的<code>可选链运算符</code>，很多滥用，用的很无脑，经常遇到这种代码：</p>


```js
const userName = data?.items?.[0]?.user?.name

```


<p>↑ 不管对象以及属性有没有可能是空值，无脑加上<code>?.</code>就完了。</p>


```js
// react class component
const name = this.state?.name

// react hooks
const [items, setItems] = useState([])
items?.map(...)
setItems?.([]) // 真有这么写的

```


<p>↑ React框架下，this.state 值不可能是空值，初始化以及set的值都是数组，都无脑加上<code>?.</code></p>


```js
const item1 = obj?.item1
console.log(item1.name)

```


<p>↑ 第一行代码说明obj或item1可能是空值，但第二行也明显说明不可能是空值，否则依然会抛错，第一行的<code>?.</code>也就没意义了。</p>


```js
if (obj?.item1?.item2) {
    const item2 = obj?.item1?.item2
    const name = obj?.item1?.item2?.name
}

```


<p>↑ if 里已经判断了非空了，内部就没必要判断非空了。</p>


## 问题、缺点

            
<p>如果不考虑 <code>?.</code> 使用的<code>必要性</code>，无脑滥用其实也没问题，不会影响功能，优点也很多：</p>
<ol>
<li>不用考虑是不是非空，每个变量或属性后面加 <code>?.</code> 就完了。</li>
<li>由于不用思考，开发效率高。</li>
<li>不会有空引用错误，不会有页面点点就没反应或弹错问题。</li>
</ol>
<p>但是问题和缺点也很明显，而且也会很严重。分两点分析下：</p>
<ol>
<li><strong>可读性、维护性：给代码维护人员带来了很多分析代码的干扰，代码可读性和维护性都很差。</strong></li>
<li><strong>隐式过滤了异常：把异常给隐式过滤掉了，导致不能快速定位问题。</strong></li>
<li><strong>编译后代码冗余。</strong></li>
<li><strong>护眼：一串?.看着难受，特别是以一个code reviewer 角度看。</strong></li>
</ol>


### 1. 可读性、维护性

            
<p>可读性和维护性其实是一回事，都是指不是源代码作者的开发维护人员，在捋这块代码逻辑、修改bug等情况时，处理问题的效率，代码写的好处理就快，写的烂就处理慢，很简单道理。</p>


```js
const onClick = () =&gt; {
    const user = props.data?.items?.[0]?.user
    if (user) {
        // use user to do something
    }
}

```


<p>已这行代码为例，有个bug现象是点击按钮没反应，维护开发看到这块代码，就会想这一串链式属性里，是不是有可能有空值，所以导致了user是空值，没走进if里导致没反应。然后就继续分析上层组件props传输代码，看data值从哪儿传来的，看是不是哪块代码导致data或items空值了。。。</p>
<p>其实呢？从外部传过来的这一串属性里不会有空值的情况，导致bug问题根本不在这儿。</p>


```js
const user = props.data.items[0].user

```


<p>那把<code>?.</code>都去掉呢？维护开发追踪问题看到这行代码，data items 这些属性肯定不能是空值，不然console就抛错了，但是bug现象里并没有抛错，所以只需要检查user能不能是空值就行了，很容易就排除了很多情况。</p>
<p>总结就是：<strong>给代码维护人员带来了很多分析代码的干扰，代码可读性和维护性都很差。</strong></p>


### 2. 隐式过滤了异常

            


```js
api.get(...).then(result =&gt; {
    const id = result?.id
    // use id to do something
})

```


<p>比如有个需求，从后台api获取数据时，需要把结果里id属性获取到，然后进行数据处理，从业务流程上看，这个api返回的result以及id必须有值，如果没值的话后续的流程就会走不通。</p>
<p>然后后台逻辑由于写的有问题，导致个别情况返回的 result=null，但是由于前端这里加了<code>?.</code>，导致页面没有任何反应，js不抛错，console也没有log，后续流程出错了，这时候如果想找原因就会很困难，对代码熟悉还行，如果不是自己写的就只能看代码捋逻辑，如果是生产环境压缩混淆了就更难排查了。</p>


```js
api.get(...).then(result =&gt; {
    const id = result.id
    // use id to do something
})

```


<p>把<code>?.</code>去掉呢？如果api返回值有问题，这里会立即抛错，后面的流程也就不能进行下去了，无论开发还是生产环境都能在console里快速定位问题，即使是压缩混淆的也能从error看出一二，或者在一些前端监控程序里也能监听到。</p>
<p>其实这种现象跟 try catch 里不加 throw 类似，把隐式异常错误完全给过滤掉了，比如下面例子：</p>


```js
// 这个try本意是处理api请求异常
try {
    const data = getSaveData() // 这段js逻辑也在try里，所以如果这个方法内部抛错了，页面上就没任何反应，很难追踪问题
    const result = await api.post(url, data)
    // result 逻辑处理
} catch (e) {
    // 好点的给弹个框，打个log，甚至有的啥都不处理
}

```


<p>总结就是：<strong>把异常给隐式过滤掉了，导致不能快速定位问题。</strong></p>


### 3. 编译后代码冗余

            
<p>如果代码是ts，并且编译目标是ES2016，编译后代码会很长。可以看下 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fplay" target="_blank" title="https://www.typescriptlang.org/play" ref="nofollow noopener noreferrer">www.typescriptlang.org/play</a> 效果。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b8663b437094022b0c075768131727b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1878&amp;h=257&amp;s=39964&amp;e=png&amp;b=fefdfd" alt="image.png" loading="lazy"></p>
<p>Babel在个别stage下，编译效果一样。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38fc44fcb9af4c328242f49d557041a9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1906&amp;h=630&amp;s=88477&amp;e=png&amp;b=fefefe" alt="image.png" loading="lazy"></p>
<p>但并不是说一点都不用，意思是尽量减少滥用，这样使用的频率会少很多，这种编译代码沉余也会少不少。</p>


## 应该怎么用？

            
<p>说了这么多，<code>.?</code> 应该怎么用呢？意思是不用吗？当然不是不能用，这个特性对于开发肯定好处很多的，但是得合理用，不能滥用。</p>
<ol>
<li><strong>避免盲目用，滥用，有个点儿就加问号，特别是在一个比较长的链式代码里每个属性后面都加。</strong></li>
<li><strong>只有可能是空值，而且业务逻辑中有空值的情况，就用；其它情况尽量不要用。</strong></li>
</ol>
<p>其实说白了就是：什么时候需要判断一个变量或属性非空，什么时候不需要。首先在使用的时候得想下，问号前面的变量或属性值，有没有可能是空值：</p>
<ol>
<li>很明显不可能是空值，比如 React类组件里的 <code>this.state</code> <code>this.props</code>，不要用；</li>
<li>自己定义的变量或属性，而且没有赋值为空值情况，不要用；</li>
<li>某些方法或者组件里，参数和属性不允许是空值，那方法和组件里就不需要判断非空。（对于比较common的，推荐写断言，或者判断空值情况throw error）</li>
<li>后台api请求结果里，要求result或其内部属性必须有值，那这些值就不需要判断非空。</li>
<li>按正常流程走，某个数据不会有空值情况，如果是空值说明前面的流程出问题了，这种情况就不需要在逻辑里判断非空。</li>
</ol>


```js
const userName = data?.items?.[0]?.user?.name // 不要滥用，如果某个属性有可能是空值，则需要?.
const userName = data.items[0].user?.name // 比如data.items数组肯定不是空数组

```




```js
const items2 = items1.filter(item =&gt; item.checked)
if (items2?.length) { } // 不需要?.

```




```js
// react class component
const name = this.state?.name // 不需要?.

// react hooks
const [items, setItems] = useState([])
items?.map(...) // 如果setItems没有赋值空值情况，则不需要?.
setItems?.([]) // 不需要?.

```




```js
const item1 = obj?.item1 // 不需要?.
console.log(item1.name)

```




```js
const id = obj?.id // 下面代码已经说明不能是空值了，不需要?.
const name = obj.name

```




```js
if (obj?.item1?.item2) {
    const item2 = obj?.item1?.item2 // 不需要?.
    const name = obj?.item1?.item2?.name // 不需要?.
}

```




```js
const id = obj?.item?.id // 不需要?.
api.get(id).then(...) // 这个api如果id是空值，则api会抛错

```


<p>当然，写代码时还得多想一下属性是否可能是空值，<strong>会一定程度的影响开发效率，也一定有开发会觉得很烦，不理解，无脑写<code>?.</code>多容易啊</strong>，但是我从另外两个角度分析下：</p>
<ol>
<li>我觉得一个合格的开发应该对自己的代码逻辑很熟悉，应该有责任知道哪些值可能是空值，哪些不可能是空值（并不是说所有，也有大部分了），否则就是对自己的代码了解很少，觉得代码能跑就行，代码质量自然就低。</li>
<li>想想在这个新特性出来之前大家是怎么写的，会对每个变量和属性都加<code>if非空判断</code>或者用<code>逻辑与(&amp;&amp;)</code>吗？不会吧。</li>
</ol>


## 总结

            
<p>本文以一个 code reviewer 角度，分析了 <code>可选链运算符(?.)</code> 特性的滥用情况，以及“正确使用方式”，只是代表我本人的看法，欢迎大佬参与讨论，无条件接受任何反驳。</p>
<p>滥用的缺点：</p>
<ol>
<li><strong>可读性、维护性：给代码维护人员带来了很多分析代码的干扰，代码可读性和维护性都很差。</strong></li>
<li><strong>隐式过滤了异常：把异常给隐式过滤掉了，导致不能快速定位问题。</strong></li>
<li><strong>编译后代码冗余。</strong></li>
<li><strong>护眼：一串?.看着难受，特别是以一个code reviewer 角度看。</strong></li>
</ol>
<p>“正确用法”：</p>
<ol>
<li><strong>避免盲目用，滥用，有个点儿就加问号，特别是在一个比较长的链式代码里每个属性后面都加。</strong></li>
<li><strong>只有可能是空值，而且业务逻辑中有空值的情况，就用；其它情况尽量不要用。</strong></li>
</ol>
<hr>