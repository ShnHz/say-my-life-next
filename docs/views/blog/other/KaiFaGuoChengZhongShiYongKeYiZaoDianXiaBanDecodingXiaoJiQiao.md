---
title: 开发过程中使用，可以早点下班的coding小技巧
date: 2023/03/01 12:15:35
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","css","info"],
    valine: true,
    valineId: 
}
password: false
---

###### 原文 [掘金](https://juejin.cn/post/7172088772257906725)

<div class="markdown-body cache"><p><em><strong>本文正在参加<a href="https://juejin.cn/post/7162096952883019783" title="https://juejin.cn/post/7162096952883019783" target="_blank">「金石计划 . 瓜分6万现金大奖」</a></strong></em></p>


# 前言

            
<p>在实际开发过程中，通过时间的沉淀，一些老人常常能写出一些让小白大吃一惊“骚操作”，那些“骚操作”通常简单的离谱，却能做很多事，属实是让很多新人摸不着头脑。</p>
<blockquote>
<p>做一件事时间长了，技巧也就有了。</p>
</blockquote>
<p>下面来个情景小剧场：</p>
<p>初入职场小鱼仔：这傻逼是不是写错了，~~ str？？（一看提交记录老大，捂住小嘴）</p>
<p>......尝试尝试尝试.......（大写的吃惊浮现在脸上）</p>
<p>初入职场小鱼仔：“卧槽，卧槽，卧槽，这都可以？有点离谱！牛逼！牛逼！属实牛逼！”（窃喜，嘻嘻，我学会了，可以去和小布仔装逼了！迫不及待的想找小布仔装逼的心情谁懂？）</p>
<p>这样的场景至今历历在目，一次又一次之后，小鱼仔长大了，变成了老油条。下面为大家分享一下“骚操作”合集。</p>
<blockquote>
<p>程序员的信仰是：最少的代码，做最多的事。</p>
</blockquote>


# 应用场景

            


## 场景一：将一个字符串变成数字

            
<p>常规操作</p>


```js
let str = '2'
console.log(Number(str))   //2

```




### 骚操作一

            


```js
let str = '2'
console.log(~~str)    //2

```




### 解析：

            
<p><strong>js中有~是按位取反运算,~~ 用来作双非按位取反运算</strong></p>
<p>~~ 的作用是去掉小数部分,对于正数，向下取整；对于负数，向上取整；与Math.floor()不同的是，它只是单纯的去掉小数部分，不论正负都不会改变整数部分</p>
<p>非数字取值为0，它具体为</p>


```js
~~null;      // =&gt; 0
~~undefined; // =&gt; 0
--NaN;       // =&gt; 0
~~0;         // =&gt; 0
~~{};        // =&gt; 0
~~[];        // =&gt; 0
~~(1/0);     // =&gt; 0
~~false;     // =&gt; 0
~~true;      // =&gt; 1
~~1.9;       // =&gt; 1
~~-1.9;      // =&gt; -1

```




### 骚操作二

            


```js
let str = '2'
console.log(+str)    //2

```




### 解析：

            
<p><strong>JS中的 '+' 号</strong></p>
<p>当用作单目操作符的时候，+操作符不会对Number类型产生影响。但如果应用在字符串类型上，会将其转换为数字：</p>


```js
let&nbsp;a = 25;
a =+ a;
console.log(a); //25
let b = '50';
console.log(typeof&nbsp;b);&nbsp;&nbsp;&nbsp;&nbsp;//String
b=+b;
console.log(typeof&nbsp;b);&nbsp;&nbsp;&nbsp;&nbsp;//Number

```


<p>通常使用+操作符可以快速地将字符串转换为数字。但是如果字符串字面量无法转化为数字的话，结果会出人意料：</p>


```js
let&nbsp;a = 'kangkang';
a =+ a;
console.log(a) //NaN
console.log(typeof&nbsp;a);&nbsp;&nbsp;&nbsp;&nbsp;//Number
let b = '';
b=+b;
console.log(b); //0
console.log(typeof&nbsp;b);&nbsp;&nbsp;&nbsp;&nbsp;//Number

```




## 场景二：数组扁平化

            
<p>常规操作</p>


```js
let arr = [1, [2, [3, 4，5]]];
function flatten(arr) {
    while (arr.some(item =&gt; Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten(arr))// [1, 2, 3, 4，5]

```




### 骚操作

            


```js
let arr = [1, [2, [3, 4]]]; 
console.log(arr.flat(Infinity)); // [1, 2, 3, 4，5]

```




### 解析

            
<p><strong>ES6中的flat</strong>
我们还可以直接调用 <code>ES6 </code>中的<code>flat</code>方法来实现数组扁平化。<code>flat </code>方法的语法：<code>arr.flat ( [depth] )</code>
其中<code>depth</code>是<code>flat</code>的参数，<code>depth </code>是可以传递数组的展开深度（默认不填、数值是 <code>1</code>），即展开一层数组。如果层数不确定，参数可以传进 <code>Infinity</code>，代表不论多少层都要展开：</p>


## 场景三：扩展运算符的应用

            


### 1.数组去重

            


```js
let arr = [3, 5, 2, 2, 5, 5]; 
let setArr = new Set(arr)            // 返回set数据结构Set(3) {3, 5, 2} 
//方法一 es6的...解构 
let unique1 = [...setArr ];          //去重转数组后 [3,5,2] 
//方法二 Array.from()解析类数组为数组 
let unique2 = Array.from(setArr )    //去重转数组后 [3,5,2]

```




### 2.字符串去重

            


```js
let str = "352255"; 
let unique = [...new Set(str)].join(""); // 352

```




### 3.实现并集、交集、和差集

            


```js
let a = new Set([1, 2, 3]); 
let b = new Set([4, 3, 2]); 
// 并集 
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4} 
// 交集 
let intersect = new Set([...a].filter(x =&gt; b.has(x))); // set {2, 3} 
// （a 相对于 b 的）差集 
let difference = new Set([...a].filter(x =&gt; !b.has(x))); // Set {1}

```




### 4.将伪数组转化为数组

            


```js
//伪数组转换为数组
var nodeList = document.querySelectorAll('div');
console.log([...nodeList]);  // [div, div, div ... ]

```




### 5.配合rest 运算符应用

            


```js
function sumRest (...m) {
    var total = 0; 
    for(var i of m){
        total += i;
    }
    return total;
}
console.log(sumRest(1,2,3));//6

```




### 6.数组排序

            


```js
const sortNumbers = (...numbers) =&gt; numbers.sort();

```




## 场景四：网站置灰

            
<p><strong>CSS滤镜 -webkit-filter</strong></p>
<p>一行代码足以</p>


```css
html.gray-mode { filter: grayscale(.95); -webkit-filter: grayscale(.95); }

```




```css
blur 模糊-webkit-filter:blur(2px);

brightness 亮度-webkit-filter:brightness(25%);

contrast 对比度-webkit-filter: contrast(50%);

drop-shadow 阴影-webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));

opacity 透明度-webkit-filter: opacity(50%);

grayscale 灰度-webkit-filter: grayscale(80%);

sepia 褐色-webkit-filter: sepia(100%);

invert 反色-webkit-filter: invert(100%);

hue-rotate 色相旋转-webkit-filter:hue-rotate(180deg);

saturate 饱和度-webkit-filter: saturate(1000%);

```




## 场景五：如何写出好函数

            


### 1.默认参数-在你的函数中使用默认参数

            
<p>避免在你的函数中使用短路或条件来保持更清洁。 更重要的是，请记住，你的函数只会为未定义的参数提供值，&nbsp;默认值不会替换任何其他虚假值。</p>


```js
// BAD
function createMicrobrewery(name) {  
    const breweryName = name || "KangKang";  
    // ...
}
// GOOD
function createMicrobrewery(name = "KangKang") { 
    // ...
}

```




### 2.参数不宜过多-明智地使用函数参数

            
<p>尽量将函数参数的数量限制在<code>2</code>个或最多 <code>3 </code>个。如果它需要这么多参数，则可能是你的函数做的太多了。 但是，如果仍然需要它，请使用 <code>JavaScript</code> 对象作为参数。 为了使函数期望的属性变得明显，可以使用<code>ES6</code>解构语法。</p>


```js
// BAD
function createMenu(title, body, buttonText, cancellable) {  
    // ...
}
createMenu("Foo", "Bar", "Baz", true);
// GOOD 
function createMenu({ title, body, buttonText, cancellable }) {
    // ...
}
createMenu({  title: "Foo",  body: "Bar",  buttonText: "Baz",  cancellable: true});

```




### 3.单一职责原则-函数应该做一件事

            
<p>不要忘记函数的作用——为你的代码添加模块化。 每个只执行一项任务的较小函数将确保你的代码易于编写、测试和理解。 永远不要为单个功能设置多个目标。</p>


```js
// BAD
function emailClients(clients) {
    clients.forEach(client =&gt; {    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {      email(client);    }  });
}
// GOOD 
function emailActiveClients(clients) { 
    clients.filter(isActiveClient).forEach(email);
}
function isActiveClient(client) {
    const clientRecord = database.lookup(client);  return clientRecord.isActive();
}

```

</div>
