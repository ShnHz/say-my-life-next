---
title: Object.keys返回是有序的还是无序的？
date: 2023/04/20 20:17:55
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","info"],
    valine: true,
    valineId: 
}
password: false
---

###### 原文 [掘金](https://juejin.cn/post/7223995981234700348)

<div class="markdown-body cache">

# 前言

            
<p>最近在负责Quill的项目，产品提出有个需求，需要在编辑器按<strong>enter键</strong>换行的时候发起请求，同时还要记录当前光标所在的行。</p>
<p>但是Quill一旦按<strong>enter键</strong>换行，光标就变了，就找不到换行前的那行。所以就得要求我们发请求必须在换行之前，然后把该行记录下来，后面就可以处理了。</p>


# 问题出现

            
<p>Quill可以添加键盘的处理函数，通过<code>quill.addBinding</code>函数或者在quill的<code>keyboard</code>配置中，比如监听<strong>enter</strong>键</p>


```js
new Quill('#editor', {
  modules: {
    keyboard: {
      bindings: {
        'enter':{
           key: 'enter',
           handler () {
             // todo
           }
         }
      }
    }
  }
})

```


<p>官方文档有说明</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e22abeb4a8c640948ebb3d1ea38fff9d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>这个添加自定义键盘事件是会插入到当前默认的键盘事件后面。</p>
<p><strong>如果想插入到当前默认的键盘事件前面执行，那么应该怎么做？</strong></p>
<p>看了官方文档，没有找到有说明。</p>
<p>于是，就去看看源码看看是怎么添加。</p>


```js
class Keyboard extends Module {
  constructor(quill, options) {
    super(quill, options);
    this.bindings = {};
    Object.keys(this.options.bindings).forEach((name) =&gt; {  // 重点
      if (name === 'list autofill' &amp;&amp;
          quill.scroll.whitelist != null &amp;&amp;
          !quill.scroll.whitelist['list']) {
        return;
      }
      if (this.options.bindings[name]) {
        this.addBinding(this.options.bindings[name]);
      }
    })
    // ...省略部分代码
   }
   addBinding(key, context = {}, handler = {}) {
    let binding = normalize(key);
    // ...省略部分代码
    binding = extend(binding, context, handler);
    this.bindings[binding.key] = this.bindings[binding.key] || [];
    this.bindings[binding.key].push(binding);
  }
 }   

```


<p>这里Quill是用<code>Object.keys</code>方法取到所有的键，然后再调用<code>addBinding</code>方法把<code>键值</code>push到<code>bindings</code>中。</p>
<p>所以我就在想</p>
<p><code>Object.keys</code>返回的数组的key是有顺序的么？</p>
<p>是按照定义的先后顺序返回的么？</p>
<p>能不能改变顺序以实现我的需求？</p>


# Object.keys

            
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fkeys" target="_blank" title="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys" ref="nofollow noopener noreferrer">mdn</a>上面的描述：</p>
<p><strong><code>Object.keys()</code></strong> 只会遍历<strong>自身可以枚举</strong>的属性，并返回数组。数组属性的顺序和正常循环遍历该对象时返回的顺序一致。</p>
<p>这个顺序一致让人更加疑惑？到底是以什么顺序返回？</p>
<p>继续查阅资料，我们打开ecma262标准的文档，找到<a href="https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2F%23sec-object.keys" target="_blank" title="https://tc39.es/ecma262/#sec-object.keys" ref="nofollow noopener noreferrer">Object.keys部分</a></p>


```js
Object.keys (&nbsp;`O`&nbsp;)

1. Let obj be ? ToObject(O).
2. Let keyList be ? EnumerableOwnProperties(obj, key).
3. Return CreateArrayFromList(keyList).

```


<p>首先尝试把参数转成对象，接着调用<code>EnumerableOwnProperties</code>方法把对象传入，返回keyList，这个应该是由key返回的list。</p>
<p>继续看<code>EnumerableOwnProperties</code>方法的定义</p>


```js
EnumerableOwnProperties ( O, kind )

1. Let ownKeys be ? O.[[OwnPropertyKeys]]().
2. 省略部分代码

```


<p><code>EnumerableOwnProperties</code>方法内部继续调用了对象的<code>O.[[OwnPropertyKeys]]</code>方法，返回<code>ownKeys</code>。</p>
<p>然后继续看<code>[[OwnPropertyKeys]]</code>的定义，内部又调用了<code>OrdinaryOwnPropertyKeys</code>方法。</p>
<p>真的是一层套一层，层层不止呀。</p>


```js
[[OwnPropertyKeys]] ( )

1. Return OrdinaryOwnPropertyKeys(O).

```


<p>最后我们看到<code>OrdinaryOwnPropertyKeys</code>的定义，找到了内部的逻辑。</p>


```js
OrdinaryOwnPropertyKeys ( O )

1. Let keys be a new empty List.
2. For each own property key P of O such that P is an array index, in ascending numeric index order, do
a. Append P to keys.
3. For each own property key P of O such that P is a String and P is not an array index, in ascending chronological order of property creation, do
a. Append P to keys.
4. For each own property key P of O such that P is a Symbol, in ascending chronological order of property creation, do
a. Append P to keys.
5. Return keys.

```


<p>我简单翻译一下：</p>
<p>流程大概是这样：</p>
<ol>
<li>先定义一个空数组,叫<code>keys</code>。</li>
<li>接着遍历对象，如果key是<strong>数组的索引</strong>，就<strong>升序</strong>把这些索引push到数组中(<strong>不是定义的顺序</strong>)</li>
<li>如果key是字符串且不是数组的索引，就按照创建时<strong>定义的顺序</strong>push到数组中</li>
<li>如果key是个<code>Symbol</code>，就按照创建时定义的顺序push到数组中</li>
<li>返回<code>keys</code>。</li>
</ol>
<p>可以看到文档如果key是数组的索引，也就是正整数，会优先排序，接着是字符串，Symbol。</p>
<p>因为<code>Object.keys</code>不会返回<code>Symbol</code>类型，这里就不做讨论了。</p>
<p>我们可以通过例子来看看</p>


```js
Object.keys({name: '答案cp3', age:18, gender: 'boy'})  // ['name', 'age', 'gender']
Object.keys({name: '答案cp3', 13:18, gender: 'boy'})  //  ['13', 'name', 'gender']
Object.keys({name: '答案cp3', 13:18, '6': 'boy'})  //  ['6', '13', 'name']

```


<p>如果你的key都是字符串，且不是数字,就按照定义的顺序返回，如果有数字，包括字符串数字，就优先返回数字，再返回定义的顺序。</p>
<p><strong>但是这里要注意一点：</strong> key要求是数组的索引，所以必须要是正整数，<strong>如果你是浮点数，则会当作字符串处理</strong>，会按照定义的顺序返回。</p>


```js
Object.keys({name: '答案cp3', 13:18, 6.1: 'boy'})  // ['13', 'name', '6.1']  

```


<p>13仍然排在前面，但是name和6.1是按照定义的顺序返回，这里要注意一下。</p>


# 问题解决

            
<p>所以我们想要自己定义的<code>enter</code>键函数在默认的键盘事件前面执行，把key改成<strong>正整数</strong>即可。</p>


```js
new Quill('#editor', {
  modules: {
    keyboard: {
      bindings: {
        13:{
           key: 'enter',
           handler () {
             // todo
           }
         }
      }
    }
  }
})

```




# 总结

            
<p>我之前一直认为<code>Object.keys</code>的返回是无序的，这次通过看Quill源码学到<code>Object.keys</code>返回的顺序，然后解决了需求问题，过程还行，继续加油。</p>
<p>最后总结一下<code>Object.keys</code>返回的顺序规则：</p>
<ol>
<li>如果有数字，且是正整数，则优先返回</li>
<li>其它字符串类型（包括浮点数）则按照定义的顺序返回</li>
<li>最后是<code>Symbol</code>类型，也是按照定义的顺序返回。但是<code>Object.keys</code>不返回<code>Symbol</code>类型，这里可以忽略。</li>
</ol>
<p>感谢你的阅读。</p></div>
