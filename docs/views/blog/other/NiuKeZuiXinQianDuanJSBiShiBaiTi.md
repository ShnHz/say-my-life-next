---
title: 牛客最新前端JS笔试百题
date: 2023/03/02 14:16:12
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
outline: [3, 5]
---

###### 原文 [掘金](https://juejin.cn/post/7023271065392513038)

## 前言

            
<blockquote>
<p>大家好，我是小包，如果喜欢小包，可以在&nbsp;<strong><a href="https://juejin.cn/user/4424090519078430" title="https://juejin.cn/user/4424090519078430" target="_blank">掘金</a></strong>&nbsp;关注我，同样也可以关注我的小小公众号——<strong><a href="https://link.juejin.cn?target=https%3A%2F%2Fzcxiaobao.gitee.io%2Fwx-demo%2Fwx.png" target="_blank" title="https://zcxiaobao.gitee.io/wx-demo/wx.png" ref="nofollow noopener noreferrer">小包学前端</a></strong>。</p>
</blockquote>
<p>面经部分题目传送门: <a href="https://juejin.cn/post/7028478428680552456" target="_blank" title="https://juejin.cn/post/7028478428680552456">牛客最新前端面经面试题汇总(含解析)</a></p>
<p>前几天空闲时间抓取了牛客最新的笔试题和面试题，想做一下数据统计，展望一下面试中JavaScript的平凡考点和火爆考点，给未来自己的学习指引一下方向。</p>
<p>但当统计完数据后，准备分析时，我才发现：我找不到特别好的切入点来进行分析，同时我只能想到使用饼图和柱状图展示各个题型或考点的出现频次，这为我上一篇的文章失败埋下了巨大的伏笔。</p>
<p>详情文章：<a href="https://juejin.cn/post/7022799579087110181" target="_blank" title="https://juejin.cn/post/7022799579087110181">抓取牛客最新前端面试题五百道 数据分析JS面试热点
</a></p>
<p>虽然文章反响有些不尽人意，我也感觉有几分挫败，但往好处想，这篇文章并非一无是处，还是有几分可取之处的。通过简单的数据统计与分析，我们还是可以从中收获些东西，就比如三大爆点: JavaScript 深入、promise、手撕代码等。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf3f22dc21f545c78c92d507ad21be58~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="emo1.jpg" loading="lazy"></p>
<p>通过这篇文章，我还收到了很多大佬的留言：大家对题目的渴望度很高。于是我就快马加鞭，终于把笔试题部分的题目全部分类和整理完毕，希望能帮到需要面试的大佬们。</p>
<p>不多说了，进入题海吧。</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7741e9142ccc40f8a7ee13ede9c82fed~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="emo3.jpg" loading="lazy"></p>


## 单选题

            


### JS基础

            


#### js概念与类型检测

            
<ol>
<li>以下不属于 typeof 运算符返回值的是？</li>
</ol>


```js
A. "string"
B. "function"
C. "object"
D. "null"

```


<ol start="2">
<li>执行以下代码，错误的输出结果是</li>
</ol>


```js
A. 输入：typeof {"x":1} 输出："object" 
B. 输入：typeof 1 输出："number" 
C. 输入：typeof [{x:1}] 输出："array" 
D. 输入：typeof NaN 输出："number"

```


<ol start="3">
<li>可以用typeof来判断的基本类型有</li>
</ol>


```js
A. undefined
B. null
C. array
D. object

```


<ol start="4">
<li>以下不属于JavaScript基本数据类型的是：</li>
</ol>


```js
A. Boolean
B. undefined
C. Symbol
D. Array

```


<ol start="5">
<li>以下关于JavaScript中数据类型的说法错误的是()</li>
</ol>


```js
A. 数据类型分为基本数据类型和引用数据类型
B. JavaScript一共有8种数据类型
C. Object是引用数据类型，且只存储于堆(heap)中
D. BigInt是可以表示任意精度整数的基本数据类型，存储于栈(stack)中

```


<p><strong>答案</strong></p>


```js
DCADC

```




#### 逻辑判断

            
<ol>
<li>请选择结果为ture的表达式？</li>
</ol>


```js
A. null instanceof Object
B. null === undefined
C. null == undefined
D. NaN == NaN

```


<ol start="2">
<li>下列代码结果为 true 的是？</li>
</ol>


```js
A. Symbol.for('a') === Symbol.for('a')
B. Symbol('a') === Symbol('a')
C. NaN === NaN
D. {} === {}

```


<ol start="3">
<li>根据如下变量，下列表达式中返回值为true的是</li>
</ol>


```js
var a = 1;
var b = [];
var c = '';
var d = true;

```




```js
A. (a || b) === true
B. (b &amp;&amp; c) === true
C. (c &amp;&amp; d) === true
D. (d || a) === true

```


<ol start="4">
<li>1==true的返回值是true，这句话是否正确？</li>
</ol>


```js
A. T
B. F

```


<ol start="5">
<li>下面代码输出为true的是?</li>
</ol>


```js
A. console.log([] === []);
B. console.log(undefined == 0);
C. console.log(undefined == false);
D. console.log(false == '');

```


<ol start="6">
<li>浏览器环境下，以下打印结果为true的是</li>
</ol>


```js
A. console.log("12" === 12)
B. console.log (NaN === NaN)
C. console.log (typeof(null) === typeof(window))
D. console.log ([1,2,3] === [1,2,3])

```


<p><strong>注意浏览器环境与node环境的差别，比如C选项</strong></p>
<ol start="7">
<li>以下表达式，正确的是</li>
</ol>


```js
A. Number('a') == Number('a')
B. -1 == true
C. 3 + '2' === 5
D. ![] == ''

```


<p><strong>答案</strong></p>


```js
CADADCD

```




#### Math

            
<ol>
<li>如何把 7.25 四舍五入为最接近的整数</li>
</ol>


```js
A. Math.round(7.25)
B. Math.ceil(7.25)
C. round(7.25)
D. Math.rnd(7.25)

```


<ol start="2">
<li>下面哪个选项可以产生0&lt;=num&lt;=10的随机整数</li>
</ol>


```js
A. Math.floor(Math.random()*6)
B. Math.floor(Math.random()*10)
C. Math.floor(Math.random()*11)
D. Math.ceil(Math.random()*10)

```


<ol start="3">
<li>以下( )表达式产生一个0~7之间(含0,7)的随机整数</li>
</ol>


```js
A. Math.floor(Math.random()*6)
B. Math.floor(Math.random()*7)
C. Math. floor(Math.random()*8)

```


<p><strong>答案</strong></p>


```js
A CD(注意D) C

```




#### 字符串

            
<ol>
<li>split() 方法用于把一个字符串分割成字符串数组。</li>
</ol>


```js
A. T
B. F

```


<ol start="2">
<li>String对象的哪个方法可以寻找子字符串并返回该子字符串位置</li>
</ol>


```js
A. match()
B. indexOf()
C. search()
D. concat()

```


<p><strong>答案</strong></p>


```js
A BC

```




#### JSON

            
<ol>
<li>下面哪一个是JSON数据？</li>
</ol>


```js
A. ｛name:"xiaoming",age,"student"｝
B. ｛"name":"xiaoming","age":"student"｝
C. ｛"xiaoming","student"｝
D. ["xiaoming","student"]

```


<ol start="2">
<li>下面分别使用 JSON.stringify 方法，返回值 res 分别是</li>
</ol>


```js
const fn = function(){}
const res = JSON.stringify(fn)
const num = 123
const res = JSON.stringify(num)
const res = JSON.stringify(NaN)
const b = true
const res = JSON.stringify(b)

```




```js
A. 'function'、'123'、'NaN'、'true'
B. undefined、'123'、undefined、'true'
C. undefined、'123'、'null'、'true'
D. undefined、'123'、'null'、undefined

```


<p><strong>答案</strong></p>


```js
BC

```




#### 数组

            
<ol>
<li>js数组中不会改变原有数组的方法是()</li>
</ol>


```js
A. push
B. concat
C. sort
D. shift

```


<ol start="2">
<li>下列哪种数组的方法不会修改数组本身</li>
</ol>


```js
A. slice
B. splice
C. sort
D. unshift

```


<ol start="3">
<li>JavaScript中需要往数组末尾处添加一个元素，应该使用以下哪个方法：</li>
</ol>


```js
A. push
B. pop
C. shift
D. unshift

```


<ol start="4">
<li>以下js操作Array的方法中不能添加元素的是：</li>
</ol>


```js
A. push
B. pop
C. unshift
D. splice

```


<ol start="5">
<li>数组以下哪个方法会影响原数组？</li>
</ol>


```js
A. concat
B. splice
C. slice
D. join

```


<ol start="6">
<li>JavaScript中，下列哪一个Array的方法的返回值类型和其他不同</li>
</ol>


```js
A. concat
B. shift
C. filter
D. map

```


<ol start="7">
<li>如下的Array.prototype上的方法中，那个方法不会改变原有的数组？</li>
</ol>


```js
A. push
B. slice
C. splice
D. sort

```


<ol start="8">
<li>对于一个数字组成的数组 nums，现在需要执行在不改动 nums 的基础上去重操作，返回一个新的无重复元素的数组，以下几段代码能完成这一操作的是()</li>
</ol>


```js
// (1)
const newNums = Array.from(new Set(nums))

```




```js
// (2)
const newNums = nums.filter((n, i) =&gt; {
    return nums.indexOf(n) === i
})

```




```js
// (3)
const newNums = nums.forEach((n, i) =&gt; {
    return nums.indexOf(n) === i
})

```




```js
// (4)
const newNums = nums.reduce((acc, n, i) =&gt; {
    return [].concat(acc, nums.indexOf(n) === i ? n : []
)
})

```




```js
A. (1)、(2)、(3)、(4)
B. (1)、(3)、(4)
C. (1)、(2)、(4)
D. (1)、(4)

```


<p><strong>答案</strong></p>


```js
BAABB
BBC

```




#### 正则

            
<ol>
<li>正则表达式 ^d+[^d]+ 能匹配下列哪个字符串？</li>
</ol>


```js
A. 123
B. 123a
C. d123
D. 123def

```


<ol start="2">
<li>下面哪个不是RegExp对象的方法</li>
</ol>


```js
A. test
B. match
C. exec
D. compile

```


<ol start="3">
<li>以下哪项可以去除变量str中的所有空格</li>
</ol>


```js
A. str.replace(`/\s*/g,""`)
B. str.replace(`/^\s|\s$/g,""`)
C. str.replace(`/^\s*/, ""`)
D. str.replace(`/(\s*$)/g, ""`)

```


<p><strong>答案</strong></p>


```js
CBA

```




#### 其他

            
<ol>
<li>下列函数哪个不是JavaScript的全局函数</li>
</ol>


```js
A. encodeURI
B. parseFloat
C. round
D. eval

```


<ol start="2">
<li>编写高性能JavaScript，以下描述错误的是</li>
</ol>


```js
A. 遵循严格模式："use strict"
B. 将js脚本放在页面顶部，加快渲染页面
C. 将js脚本成组打包，减少请求，尽量减少使用闭包
D. 使用非阻塞方式下载js脚本，最小化重绘(repaint)和回流(reflow)

```


<ol start="3">
<li>有关JavaScript中系统方法的描述，错误的是？</li>
</ol>


```js
A. parseFloat方法：该方法将一个字符串转换成对应的小数
B. isNaN方法：该方法用于检测参数是否为数值型，如果是，返回true，否则，返回false。
C. escape方法： 该方法返回对一个字符串编码后的结果字符串
D. eval方法：该方法将某个参数字符串作为一个JavaScript执行题

```


<ol start="4">
<li>下面列出的浏览器，无webkit内核的是()</li>
</ol>


```js
A. chrome
B. Safari
C. 搜狗浏览器
D. Firefox

```


<ol start="5">
<li>下列代码哪个能够实现获取形式为 2017-08-01 形式的日期( )？</li>
</ol>


```js
// A
var formatDate=getDate()
// B
var formatDate = new Date()
// C
var formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    
    var d = date.getDate();
    return y + '-' + m + '-' + d;
};
// D
var formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m &lt; 10 ? '0' + m : m;
    var d = date.getDate();
    d = d &lt; 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

```


<ol start="6">
<li>下面哪一项不能最小化重绘(repaint)和回流(reflow)</li>
</ol>


```js
A. 需要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
B. 需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document
C. 尽量避免用table布局(table元素一旦触发回流就会导致table里所有的其它元素回流)
D. 尽量不要使用 css 属性简写，如：用border-width, border-style, border-color代替border

```


<p><strong>答案</strong></p>


```js
CBBDDD

```




### JS深入

            


#### this

            
<ol>
<li>下列哪种方法不能改变this指向()</li>
</ol>


```js
A. eval
B. apply
C. bind
D. call

```


<ol start="2">
<li>在JavaScript中下面选项关于this描述正确的是</li>
</ol>


```js
A. 在使用new实例化对象时, this指向这个实例对象
B. 将对象的方法赋值给变量A。执行A()时 该方法中的this指向这个对象。 
C. 在函数定义时,this指向全局变量
D. 在浏览器下的全局范围内，this指向全局对象

```


<ol start="3">
<li>下面有关JavaScript中call和apply方法的描述，错误的是？</li>
</ol>


```js
A. call与apply都属于Function.prototype的一个方法，所以每个function实例都有call、apply属性
B. 两者传递的参数不同，call函数第一个参数都是要传入给当前对象的对象，apply不是
C. apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入
D. call传入的则是直接的参数列表。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。

```


<p><strong>答案</strong></p>


```js
AAB

```




#### 作用域(闭包)

            
<ol>
<li>内存泄漏是 javascript 代码中必须尽量避免的，以下几段代码可能会引起内存泄漏的有()</li>
</ol>


```js
// (1)
function getName() {
    name = 'javascript'
}
getName()

```




```js
// (2)
const elements = {
    button: document.getElementById('button')
};
function removeButton() {
    document.body.removeChild(elements.button);
}
removeButton()

```




```js
// (3)
let timer = setInterval(() =&gt; {
    const node = document.querySelector('#node') 
    if(node) {
        clearInterval(timer)
    }
}, 1000);

```




```js
A. (1)、(2)、(3)
B. (2)、(3)
C. (1)、(3)
D. (1)、(2)

```


<ol start="2">
<li>那个操作不会造成内存泄露</li>
</ol>


```js
A. 没有清理的DOM元素引用
B. 被遗忘的定时器
C. 事件侦听没有移除
D. 局部变量不用时，没有设为null

```


<ol start="3">
<li>下列关于闭包理解错误的是</li>
</ol>


```js
A. 增加一定的内存消耗
B. 使用不当可能会导致内存泄漏
C. 可以使用闭包模拟私有方法
D. 闭包会改动对象的原型链

```


<p><strong>答案</strong></p>


```js
DDD

```




#### 原型与继承

            
<ol>
<li>JavaScript实现继承的方式，不正确的是：</li>
</ol>


```js
A. 原型链继承
B. 构造函数继承
C. 组合继承
D. 关联继承

```


<ol start="2">
<li>所有对象都有原型</li>
</ol>


```js
A. T
B. F

```


<ol start="3">
<li>以下关于原型链的描述正确的是:</li>
</ol>


```js
A. 通过原型链继承的属性和对象自己定义的属性等效
B. 通过原型链可以模拟对象的私有属性
C. 在对象上访问不存在的属性时,会依次遍历整条原型链
D. 所有 JavaScript 中的对象都是位于原型链顶端的 `Object` 的实例

```


<p><strong>答案</strong></p>


```js
DBC

```




#### 其他

            
<ol>
<li>以下不属于前端数据存储方式的是？</li>
</ol>


```js
A. jsonp
B. cookie
C. localStorage
D. sessionStorage

```


<p><strong>答案</strong></p>


```js
A

```




### DOM题

            


#### 事件流

            
<ol>
<li>将A元素拖拽并放置到B元素中，B元素需要做哪项操作()？</li>
</ol>


```js
A. event.preventDefault()
B. event.prevent()
C. event.drag()
D. event.drop()

```


<ol start="2">
<li>以下不支持冒泡的鼠标事件为(      )？</li>
</ol>


```js
A. mouseover
B. click
C. mouseleave
D. mousemove

```


<ol start="3">
<li>在javascript中，用于阻止默认事件的默认操作的方法是</li>
</ol>


```js
A. stopDeafault()
B. stopPropagation()
C. preventDefault()
D. preventDefaultEven()

```


<ol start="4">
<li>事件传播的三个阶段是什么</li>
</ol>


```js
目标 -&gt; 捕获 -&gt; 冒泡
冒泡 -&gt; 目标 -&gt; 捕获
目标 -&gt; 冒泡 -&gt; 捕获
捕获 -&gt; 目标 -&gt; 冒泡

```


<ol start="5">
<li>下面有关 javascript 常见事件的触发情况，描述错误的是？</li>
</ol>


```js
A. onchange：用户改变域的内容
B. onkeypress：某个键盘的键被按下或按住
C. onmousedown：某个鼠标按键被按下
D. onblur：元素获得焦点

```


<p><strong>答案</strong></p>


```js
ACCDD

```




#### DOM遍历

            
<ol>
<li>下列哪项不属于DOM查找节点的属性()？</li>
</ol>


```js
A. parentObj.firstChild
B. parentObj.children
C. neborNode.previousSibling
D. neborNode.siblings

```


<ol start="2">
<li>DOM中，给父节点添加子节点的正确方法为()？</li>
</ol>


```js
A. appendChild(parentNode,newNode);
B. append(parentNode,newNode);
C. parentNode.append(newNode);
D. parentNode.appendChild(newNode);

```


<ol start="3">
<li>JavaScript中document.getElementById()返回值的类型为？</li>
</ol>


```js
A. Array
B. Object
C. String
D. Function

```


<ol start="4">
<li>DOM中，给父节点添加子节点的正确方法为()？</li>
</ol>


```js
A. appendChild(parentNode,newNode);
B. append(parentNode,newNode);
C. parentNode.append(newNode);
D. parentNode.appendChild(newNode);

```


<p><strong>答案</strong></p>


```js
DDBD

```




#### 其他

            
<ol>
<li>DOM元素的以下属性改变会导致重排(reflows)的是</li>
</ol>


```js
outline
visiblity
font-size
background-color

```


<p><strong>答案</strong></p>


```js
C

```




### BOM题

            
<ol>
<li>setInterval(updateClock,60)的含义是(      )？</li>
</ol>


```js
A. 每隔60秒调用一次updateClock()
B. 每隔60毫秒调用一次updateClock()
C. 每隔60分钟调用一次updateClock()
D. 每分钟调用60次updateClock()

```


<ol start="2">
<li>使用方法(      )可以获取到地理位置所在的经纬度？</li>
</ol>


```js
A. Geolocation.watchPosition()
B. Geolocation.getCurrentPosition()
C. Geolocation.getPosition()
D. Geolocation.Position()

```


<ol start="3">
<li>setInterval("alert('welcome');",1000);这段代码的意思是</li>
</ol>


```js
A. 等待1000秒后，再弹出一个对话框
B. 等待1秒钟后弹出一个对话框
C. 每隔一秒钟弹出一个对话框
D. 语句报错,语法有问题

```


<p><strong>答案</strong></p>


```js
BBC

```




### ES6题

            


#### 箭头函数

            
<ol>
<li>下列对js箭头函数描述错误的是()</li>
</ol>


```js
A. 箭头函数没有原型属性
B. 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
C. 箭头函数可以作为构造函数，使用new
D. 箭头函数不绑定arguments，取而代之用rest参数解决

```


<ol start="2">
<li>关于箭头函数下列说法错误的一项是：</li>
</ol>


```js
A. 函数体内this的指向是定义时所在的对象，而不是使用时所在的对象
B. 箭头函数内不能使用arguments对象
C. 箭头函数不能使用yield命令
D. 可以使用new创建一个箭头函数的实例

```


<p><strong>答案</strong></p>


```js
CD

```




#### promise

            
<ol>
<li>关于将 Promise.all 和 Promise.race 传入空数组的两段代码的输出结果说法正确的是：</li>
</ol>


```js
Promise.all([]).then((res) =&gt; {
    console.log('all');
});
Promise.race([]).then((res) =&gt; {
    console.log('race');
});

```




```js
A. all 和 race 都会被输出
B. all 和 race 都不会被输出
C. all 会被输出，而 race 不会被输出
D. all 不会被输出，race 会被输出

```


<ol start="2">
<li>以下方案中，不是用于解决回调陷阱的的是：</li>
</ol>


```js
A. Promise
B. Generator
C. async
D. Proxy

```


<ol start="3">
<li>在 ECMAScript6 中，不属于promise的状态是:</li>
</ol>


```js
A. Pending
B. Pause
C. Fulfilled
D. Rejected

```


<p><strong>答案</strong></p>


```js
CDB

```




#### 解构赋值

            
<ol>
<li>关于ES6解构表达式,描述正确的是()</li>
</ol>


```js
let [a,b, c,d, e] = "hello"; 

```




```js
A. e = "hello";
B. 其它都为undefined
C. 当中 a = "h", b = "e";
D. 语法报错

```


<p><strong>答案</strong></p>


```js
C

```




## 多选题

            


### JS基础

            
<ol>
<li>下面哪些数组方法会改变原数组</li>
</ol>


```js
A. push 
B. concat 
C. splice 
D. map

```


<ol start="2">
<li>下面可以声明数字的js代码是</li>
</ol>


```js
A. const a = 0xa1
B. const a = 076
C. const a = 0b21
D. const a = 7e2

```


<ol start="3">
<li>以下属于操作符 typeof 的返回值的是：</li>
</ol>


```js
(1)function
(2) object
(3) null
(4) array
(5) NaN
(6) bigint
(7) regexp
(8) undefined

```




```js
A. (1)、(2)、(3)、(4)、(5)、(6)、(7)、(8)
B. (1)、(2)、(3)、(8)
C. (1)、(2)、(8)
D. (1)、(2)、(6)、(8)

```


<ol start="4">
<li>以下()结果等于字符串string</li>
</ol>


```js
A. typeof 'string'
B. String('string').toString()
C. 'string'.split('').sort().join('')
D. (function(string){return string})('string')
E. JSON.parse('{"string":"string"}').string

```


<ol start="5">
<li>下面的等式成立的是?</li>
</ol>


```js
A. parseInt(46.8) `==` parseFloat(46.8)
B. NaN `!==` NaN
C. isNaN('abc') `==` NaN
D. typeof NaN `===` 'number'

```


<ol start="6">
<li>以下哪些选项可以将集合A转化为数组？</li>
</ol>


```js
A. Array.from(A)
B. [].slice.apply(A)
C. [...A]
D. [].map.call(A, o =&gt; o)

```


<ol start="7">
<li>下列结果返回 true 的是</li>
</ol>


```js
A. null == undefined
B. null === undefined
C. null === null
D. NaN == null
E. NaN === NaN
F. Infinity + 1 !== Infinity

```


<p><strong>答案</strong></p>


```js
AC ABD D ABDE BD ABCD AC

```




### JS深入

            
<ol>
<li>关于以下代码，说法正确的有哪些？
function Person() { }
var person = new Person();</li>
</ol>


```js
A. 每一个原型都有一个constructor属性指向关联的构造函数。
B. 每一个对象都有一个prototype属性。
C. Object.getPrototypeOf(person) === Person.prototype
D. person.constructor === Person

```


<ol start="2">
<li>下列在 JS 时间循环机制中属于微任务(microTask)的是？</li>
</ol>


```js
A. process.nextTick
B. promise
C. setTimeout
D. setInterval

```


<p><strong>答案</strong></p>


```js
ACD AB

```




### ES6

            
<ol>
<li>以下关于let和const的说法中正确的是:</li>
</ol>


```js
A. let声明的变量值和类型都可以改变
B. const声明的常量不可以改变
C. 两者都不存在变量提升，同时存在暂时性死区，只能在声明的位置后面使用
D. const可以先声明再初始化，可以后赋值

```


<ol start="2">
<li>下面关于Promise说法正确的是(注意“返回结果”的意思包含成功或者失败)</li>
</ol>


```js
A. Promise.all在所有给定的promise都fulfilled后才返回结果
B. Promise.race在给定的promise中，某个fulfilled后才返回结果
C. promise.then的回调函数中，可以返回一个新的promise
D. 对于一个向后台获取数据已经产生结果的promise:p1，再次调用p1.then，不会去重新发起请求获取数据

```


<p><strong>答案</strong></p>


```js
ABC CD

```




### DOM

            
<ol>
<li>下列关于使用 JS 修改元素样式的代码，正确的有哪些？</li>
</ol>


```js
document.body.style.['background-color'] = '#fff'
document.body.style.setProperty('background-color', '#fff')
document.body.style = 'background-color: #fff'
document.body.style.fontSize = '14px'

```


<ol start="2">
<li>下列方法可用于阻止事件冒泡的有</li>
</ol>


```js
A. event.cancelBubble = true;
B. event.stopPropagation();
C. event.preventDefault();
D. return false;

```


<p><strong>答案</strong></p>


```js
BCD ABD

```




## 填空题

            


### 类型检测

            
<ol>
<li>在JavaScript中，有var arr = []; typeof arr的结果为</li>
<li>以下使用 typeof 操作符的代码的输出结果为</li>
</ol>


```js
var x = typeof x
var res = typeof typeof x;
console.log(x, res)

```


<ol start="3">
<li>[typeof null, null instanceof Object]的结果是什么</li>
<li>typeof typeof 0</li>
<li>JavaScript的typeof运算符的可能结果为array？解释为什么</li>
<li>下面代码的输出结果是多少？</li>
</ol>


```js
var arr = [];
console.log(typeof arr, Object.prototype.toString.call(arr));

```


<ol start="7">
<li>console.log(Object.prototype.toString.call(undefined))</li>
</ol>


#### 类型转换

            
<ol>
<li>表达式 "2"+3+4 的值为</li>
<li>console.log('5' + 3, 5 + '3')</li>
<li>var a=parseInt(“111办公室”);alert(a);</li>
<li>["0x1", "0x2", "0x3"].map(parseInt) 的结果</li>
<li>在js中执行 1+'1'的结果是？</li>
<li>在js中执行 parseInt('77',40)的结果是?</li>
</ol>


#### 逻辑判断

            
<ol>
<li>请给出 [5&lt;6&lt;3,3&lt;2&lt;4] 代码的运行结果</li>
<li>(2&lt;3)||(3&lt;2) 表达式将返回值为</li>
<li>console.log(true||false&amp;&amp;false, true&amp;&amp;false||true)的输出结果是？</li>
</ol>


### 其他

            
<ol>
<li>1 + - + + + - + 1 的结果是</li>
<li>[ 'a', ,'b', ,].length 的结果是</li>
</ol>


## 程序题

            


### JS基础

            
<ol>
<li>下面两个程序的输出结果分别是？</li>
</ol>


```js
// case 1
function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('Case undefined');
        break;
    default:
        console.log('Case default');
    }
}
showCase(new String('A'));

```




```js
// case 2
function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('Case undefined');
        break;
    default:
        console.log('Case default');
    }
}
showCase(String('A'));

```


<ol start="2">
<li>p标签的的内容会显示什么？</li>
</ol>


```html
&lt;html&gt;
    &lt;body&gt;
        &lt;p id="demo"&gt;&lt;/p&gt;
        &lt;script type="text/javascript"&gt;
            var x = 10;
            var y = "10";
            document.getElementById("demo").innerHTML = Boolean(x == y);
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;

```


<ol start="3">
<li>document.write的结果会是什么？</li>
</ol>


```js
function funcA(x){
    var temp = 4;

    function funcB(y){
        document.write( ++x + y + (temp--));
    }

    funcB(5);
}

funcA(6)

```


<ol start="4">
<li>alert的结果会是多少</li>
</ol>


```js
var varArr = function(i,j,str) {  
    return j == 0 ? str : varArr(i,--j,(str+= " " + i[j]));
}
var arr = new Array('apple','orange','peach','lime');
var str = varArr(arr,arr.length,"");
alert(str);

```


<ol start="5">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
function greetingMaker(greeting) { 
    function addName(name) {    
        greeting  = greeting.split(' ').reverse().join("-");
        return greeting + " " + name;
    }
    
    return addName;
}

var daytimeGreeting = greetingMaker("Good Day to you");
alert(daytimeGreeting(name)); 

```


<ol start="6">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
String.prototype.GetNum = function() { 
    var regEx = /[^\d]/g; 
    return this.replace(regEx, ''); 
};

var str = "a1b2c3";
str = str.GetNum();
alert(str);

```


<ol start="7">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
function sum(a, b) {
  return a + b;
}
sum(1, "2");

```


<ol start="8">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
var str = "我非常喜欢编程";
str.length = 3;
console.log(str);

```


<ol start="9">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);

```


<ol start="10">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
function nums(a, b) {
    if (a &gt; b)
        console.log('a is bigger')
    else 
        console.log('b is bigger')
    return a + b
}
console.log(nums(4, 2))
console.log(nums(1, 2))

```


<ol start="11">
<li>下面程序输出结果是多少？</li>
</ol>


```js
function side(arr) {
    arr[0] = arr[2];
}
function func1(a, b, c = 3) {
    c = 10;
    side(arguments);
    console.log(a + b + c);
}
function func2(a, b, c) {
    c = 10;
    side(arguments);
    console.log(a + b + c);
}
func1(1, 1, 1);
func2(1, 1, 1);

```


<ol start="12">
<li>下面代码的输出结果是什么？</li>
</ol>


```js
var a = 3;
var b = new Number(3);
var c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);


```


<ol start="13">
<li>执行下列语句后，a.length的值为？</li>
</ol>


```js
var a = [];
a.push(1, 2);
a.shift(3, 4);
a.concat([5, 6]);
a.splice(0, 1, 2);

```


<ol start="14">
<li>下面这几段代码分别输出结果是多少？为什么？</li>
</ol>


```js
var a = {}, b = '123', c = 123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
// example 2
var a = {}, b = Symbol('123'), c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
// example 3
var a = {}, b = {key:'123'}, c = {key:'456'};
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);

```


<ol start="15">
<li>下面每项的返回值是什么？为什么？</li>
</ol>


```js
null == undefined
0.1 + 0.2 == 0.3
typeof NaN
typeof Function
typeof Object
typeof {}
'a' + 1
'a' - 1
Function instanceof Object
Object instanceof Function

```


<ol start="16">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
var array = []
for(var i = 0; i &lt; 3; i++) {
    array.push(() =&gt; i)
}
var newArray = array.map(el =&gt; el())
console.log(newArray)

```


<ol start="17">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
 function a(m, n) {
        var b = function (l) {
            return l &lt;= m ? l * b(l + 1) : 1;
        }

        return b(m - n + 1);
    }

console.log(a(4, 2));

```


<ol start="18">
<li>下面程序的输出结果是多少？</li>
</ol>


```js
console.log(typeof undefined == typeof NULL);
console.log(typeof function () {} == typeof class {});

```


<ol start="19">
<li>执行后a和b.age的值分别为</li>
</ol>


```js
var a = 10
var b = {
    age: 11
}
function fn(x,y) {
    --y.age;
    return --x;
}
fn(a,b)

```


<ol start="20">
<li>下面程序的执行结果是：</li>
</ol>


```js
var number = 4;
var numberFactorial = (function (number){
    return (number === 0)? 1: number* factorial(number-1)
})(number)
console.log(numberFactorial)

```


<ol start="21">
<li>下面程序的输出结果是：</li>
</ol>


```js
var array = []
for(var i = 0; i &lt; 3; i++) {
    array.push(() =&gt; i)
}
var newArray = array.map(el =&gt; el())
console.log(newArray)

```


<ol start="22">
<li>下面程序的输出结果是：</li>
</ol>


```js
function addToList(item, list) {
    return list.push(item)
}
const result = addToList("nowcoder", ["hello"])
console.log(result)


```


<ol start="23">
<li>下面程序的输出结果是：</li>
</ol>


```js
const first = () =&gt; { console.log('first'); return false; }
const second = () =&gt; { console.log('second'); return true; }
console.log( first() &amp;&amp; second() );
console.log( second() || first() );

```


<ol start="24">
<li>下面代码的输出结果是：</li>
</ol>


```js
var s='12ab3cd', arr=s.split(/\d/);
console.log(arr[3],arr[4])

```


<ol start="25">
<li>下面程序的输出结果是：</li>
</ol>


```js
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);

```


<ol start="26">
<li>下面程序的输出结果是:</li>
</ol>


```js
var arr=[1,2,3];
arr.push(arr.shift())
console.log(arr[1],arr[2])

```




### JS深入

            


#### this指向

            
<p>题目解析：<a href="https://juejin.cn/post/7023944134561890318" target="_blank" title="https://juejin.cn/post/7023944134561890318">this指向题目解析及扩展</a></p>
<ol>
<li>下列程序的输出结果是多少？为什么？</li>
</ol>


```js
var x = 1;

var obj = {
    x: 3,
    fun:function () {
        var x = 5;
        return this.x;
    }
};

var fun = obj.fun;
console.log( obj.fun(), fun() );


```


<ol start="2">
<li>下列程序的输出结果是多少？你能理清楚test函数的this指向吗？</li>
</ol>


```js
var a = 5;
 function test() { 
    a = 0; 
    alert(a); 
    alert(this.a); 
    var a;
    alert(a); 
}
new test();


```


<ol start="3">
<li>下列程序的输出结果是多少？为什么？</li>
</ol>


```js
function fun () {
    return () =&gt; {
        return () =&gt; {
            return () =&gt; {
                console.log(this.name)
            }
        }
    }
}
var f = fun.call({name: 'foo'})
var t1 = f.call({name: 'bar'})()()
var t2 = f().call({name: 'baz'})()
var t3 = f()().call({name: 'qux'})


```


<ol start="4">
<li>执行以下代码，输出结果分别是多少？</li>
</ol>


```js
let obj1 = {
    a: 1,
    foo: () =&gt; {
        console.log(this.a)
    }
}
// log1
obj1.foo()
const obj2 = obj1.foo
// log2
obj2()

```


<ol start="5">
<li>下面程序的输出结果是什么？为什么？</li>
</ol>


```js
const Person = (name="wang",age=10) =&gt; {
this.name = name;
this.age = age;
return this.name +' is '+ this.age + 'years old'
}
let result = new Person('zhang',11)
console.log(result)

```


<ol start="6">
<li>请表述以下代码的执行结果和原因</li>
</ol>


```js
var person = {
  age: 18,
  getAge: function() {
    return this.age;
  }
};
var getAge = person.getAge
getAge()

```


<ol start="7">
<li>请按顺序写出打印结果，并说明原因。</li>
</ol>


```js
var name = 'global';
var obj = {
    name: 'local',
    foo: function(){
        this.name = 'foo';
    }.bind(window)
};
var bar = new obj.foo();
setTimeout(function() {
    console.log(window.name);
}, 0);
console.log(bar.name);
 
var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name);


```


<ol start="8">
<li>下面程序的执行结果是：</li>
</ol>


```js
var obj = {
    name:"zhangsan",
    sayName:function(){
        console.info(this.name);
    }
}

var wfunc = obj.sayName;
obj.sayName();
wfunc();
var name = "lisi";
obj.sayName();
wfunc();

```


<ol start="9">
<li>下面程序的输出结果是：</li>
</ol>


```js
var name='test' 
var a = {    
    name: 'ass',    
    getName: function() {    
        return this.name;   
    } 
} 
var b = a.getName; 
b();

```




#### 事件循环

            
<ol>
<li>下列程序的输出结果分别是多少？为什么？</li>
</ol>


```js
const promiseA = Promise.resolve('a')
promiseA. then((res) =&gt; {
    console.log(res)
}).then((res) =&gt; {
    console.log(res)
})
const promiseB = Promise.resolve('b')
promiseB. then((res) =&gt; {
    console.log(res)
})
promiseB. then((res) =&gt; {
    console.log(res)
})


```


<ol start="2">
<li>下面程序的输出结果依次是多少？</li>
</ol>


```js
setTimeout(() =&gt; {
    console.log(1)
}, 0)

const P = new Promise((resolve, reject) =&gt; {
    console.log(2)
    setTimeout(() =&gt; {
        resolve()
        console.log(3)
    }, 0)
})

P.then(() =&gt; {
    console.log(4)
})
console.log(5)

```


<ol start="3">
<li>下面程序的输出结果是</li>
</ol>


```js
setTimeout(function(){
    console.log(1);
}, 0)
new Promise(function(resolve){
    console.log(2);
    resolve();
    console.log(3);
}).then(function(){
    console.log(4);
})
console.log(5);


```


<ol start="4">
<li>下面程序的输出结果是？</li>
</ol>


```js
(async () =&gt; {
    console.log(1);
    setTimeout(() =&gt; {
        console.log(2);
}, 0);
await new Promise((resolve, reject) =&gt; {
    console.log(3);
}).then(() =&gt; {
    console.log(4);
});
    console.log(5);
})();


```


<ol start="5">
<li>下面程序的输出结果是:</li>
</ol>


```js
new Promise((resolve) =&gt; {
    console.log('1')
    resolve()
    console.log('2')
}).then(() =&gt; {
    console.log('3')
})
setTimeout(() =&gt; {
    console.log('4')
})
console.log('5')

```


<ol start="6">
<li>下面程序的输出结果是:</li>
</ol>


```js
var p1 = new Promise(function(resolve, reject){
    resolve("2")
})
setTimeout(function(){
    console.log("1")
},10)
p1.then(function(value){
    console.log(value)
})
setTimeout(function(){
    console.log("3")
},0)


```


<ol start="7">
<li>下面程序的输出结果是：</li>
</ol>


```js
setTimeout(function() {
  console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

```


<ol start="8">
<li>请表述以下代码的执行结果和原因</li>
</ol>


```js
setTimeout(function() {
    console.log(1)
},0)
new Promise(function executor(resolve){
    console.log(2)
    for (var i = 0; i&lt;10000; i++) {
        i - 9999 &amp;&amp; resolve()
    }
    console.log(3)
}).then(function() {
    console.log(4)
})
console.log(5)

```


<ol start="9">
<li>在网页中有两个div块，html代码如下</li>
</ol>


```html
&lt;div class="outer"&gt;
 &lt;div class="inner"&gt;&lt;/div&gt;
&lt;/div&gt;

```


<p>对应的js代码如下：</p>


```js
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

function onClick() {
    console.log('click');

    setTimeout(function() {
        console.log('timeout');
    }, 0);

    Promise.resolve().then(function() {
        console.log('promise');
    });

    outer.setAttribute('data-random', Math.random());
}

inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);

```


<p>当点击class为inner的div块时，控制台依次输出结果是什么？
10. 下面程序的输出结果是？</p>


```js
(async () =&gt; {
    console.log(1);
    setTimeout(() =&gt; {
        console.log(2);
}, 0);
await new Promise((resolve, reject) =&gt; {
    console.log(3);
}).then(() =&gt; {
    console.log(4);
});
    console.log(5);
})();

```


<ol start="11">
<li>下面程序的输出结果是：</li>
</ol>


```js
setTimeout(() =&gt; console.log('a'));
Promise.resolve().then(
   () =&gt; console.log('b’);
 ).then(
   () =&gt; Promise.resolve('c').then(
     (data) =&gt; {
       setTimeout(() =&gt; console.log('d'));
       console.log('f');
       return data;
     }
   )
 ).then(data =&gt; console.log(data));


```


<ol start="12">
<li>下面程序的输出结果是：</li>
</ol>


```js
console.log('one'); 
setTimeout(function() { console.log('two'); }, 0); 
Promise.resolve()
       .then(function() { console.log('three'); })
 console.log('four');


```


<ol start="13">
<li>下面程序的执行结果是：</li>
</ol>


```js
setTimeout(function () {
    console.log(C)
},0)
console.log('D')
new Promise(function(resolve){
    console.log('E')
    resolve()
    console.log('F')
}).then(function() {
    console.log('G')
})
console.log('H')

```


<ol start="14">
<li>有一个输出函数定义如下：</li>
</ol>


```js
function log(msg, time) {
  return new Promise((resolve) =&gt; {
    setTimeout(() =&gt; {
      console.log(msg);
      resolve();
    }, time);
  });
}

```


<p>则下面三段代码输出的结果是：</p>


```js
// 第一段代码：
(async () =&gt; {
  for (let i = 0; i &lt; 5; i++) {
    await log(i, 1000);
  }
})();

```




```js
// 第二段代码：
(async () =&gt; {
  [ 1, 2, 3, 4 ].forEach(async (i) =&gt; {
    await log(i, 1000);
  });
})();

```




```js
// 第三段代码：
(async () =&gt; {
  for (const i of [ 1, 2, 3, 4 ]) {
    await log(i, 1000);
  }
})();

```




#### 原型与原型链

            
<p>传送门: <a href="https://juejin.cn/post/7025939091560611848" target="_blank" title="https://juejin.cn/post/7025939091560611848">原型与原型链题目解析</a></p>
<ol>
<li>下面程序的输出结果依次是？</li>
</ol>


```js
function Fn1(name) {
    if(name){
    this.name = name;
    }
}
Fn1.prototype.name="jack"
let a = new Fn1();
console.log('a:', a.name);

function Fn2(name) {
    this.name = name;
}
Fn2.prototype.name="jack"
let b = new Fn2();
console.log('b:', b.name);

```


<ol start="2">
<li>下面程序的输出结果是？</li>
</ol>


```js
var Foo = (function() {
    var x = 0;
    function Foo() {}
    Foo.prototype.increment = function() {
        ++x;
        console.log(x);
    };
    return Foo;
})();
 
var a = new Foo();
a.increment();
a.increment();
var b = new Foo();
a.increment();

```


<ol start="3">
<li>下面程序的输出结果是？</li>
</ol>


```js
var name = 'Jay'
function Person(name){
    this.name = name;
    console.log(this.name)
}
var a = Person('Tom')
console.log(name)
console.log(a)
var b = new Person('Michael')
console.log(b)

```


<ol start="4">
<li>请表述以下代码的执行结果和原因</li>
</ol>


```js
class A{}
class B extends A{}
const a = new A()
const b = new B()
a.__proto__
b.__proto__
B. __proto__
B. prototype.__proto__
b.__proto__.__proto__

```


<ol start="5">
<li>请表述以下代码的执行结果和原因</li>
</ol>


```js
function test() {           
    getName = function() { 
        Promise.resolve().then(() =&gt; console.log(0)); 
        console.log(1);               
    };

    return this; 
}
test.getName = function() { 
     setTimeout(() =&gt; console.log(2), 0); 
     console.log(3);               
};
test.prototype.getName = function() {    

     console.log(4); 
};       
var getName = function() { 
     console.log(5);             
};
function getName() {

     console.log(6); 
}      
      
test.getName(); 
getName(); 
test().getName(); 
getName();  
new test.getName();
new test().getName();
new new test().getName();


```


<ol start="6">
<li>请表述以下代码的执行结果和原因</li>
</ol>


```js
var tmp = {};
var A = function() {};
A. prototype = tmp;

var a = new A();
A. prototype = {};

var b = Object.create(tmp);
b.constructor = A. constructor;

console.log(a instanceof A);
console.log(b instanceof A);


```


<ol start="7">
<li>下面程序的执行结果是：</li>
</ol>


```js
function Foo(){}
Foo.prototype.z = 3;
var obj = new Foo();
console.info(obj.z)
obj.z = 10;
console.info(obj.z);
delete obj.z;
console.info(obj.z);

```


<ol start="8">
<li>下面程序的执行结果是：</li>
</ol>


```js
const Book = {
  price: 32
}
const book = Object.create(Book);
book.type = 'Math';
delete book.price;
delete book.type;
console.log(book.price);
console.log(book.type);

```




#### 作用域与预编译

            
<ol>
<li>下面的程序会报错吗？如果不会，输出结果分别是多少？</li>
</ol>


```js
function sayHello() {
    console.log(name);
    console.log(age);
    var name = "Tom";
    let age = 18;
} 
sayHello();

```


<ol start="2">
<li>下面的程序i的打印结果分别是多少？</li>
</ol>


```js
for (var i = 0; i &lt; 3; i++) {
    setTimeout(_ =&gt; {
        console.log(i)
    })
}

for (let i = 0; i &lt; 3; i++) {
    setTimeout(_ =&gt; {
        console.log(i)
    })
}

```


<ol start="3">
<li>下面程序的输出结果是：</li>
</ol>


```js
console.log(a);
var a = 'a';
console.log(b);
let b = 'b';

```


<ol start="4">
<li>下面程序的输出结果是：</li>
</ol>


```js
var foo = "Hello";
(function(){
    var bar = " World";
    alert(foo + bar);
})();
alert(foo + bar);

```


<ol start="5">
<li>下面程序的输出结果是：</li>
</ol>


```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()

```


<ol start="6">
<li>下面代码的输出结果是:</li>
</ol>


```js
const a = 10
function runFunction() {
    const a = 20
    console.log('inside', a)
}
runFunction()
console.log('outside', a)

```


<ol start="7">
<li>请描述打印结果并说明原因</li>
</ol>


```js
"use strict"
var name = 'Jay'
var person = {
    name: 'Wang',
    pro: {
        name: 'Michael',
        getName: function () {
            return this.name
        }
    }
}
console.log(person.pro.getName)
var people = person.pro.getName
console.log(people())

```


<ol start="8">
<li>下面程序的结果是：</li>
</ol>


```html
&lt;ul&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
    &lt;li&gt;4&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
var elements = document.getElementsByTagName("li");
for (var i=0;i&lt;elements.length;i++){
    elements[i].onclick =function( ){
    alert(i); 
    };
}

```


<ol start="9">
<li>下面程序的输出结果是</li>
</ol>


```js
compute(10,100);
var compute = function(A,B) {
    console.info(A * B) ;
};
function compute(A,B){
    console.info(A + B);
}
function compute(A,B){
    console.info((A + B)*2);
}
compute(2,10);


```


<ol start="10">
<li>下面程序的执行结果是：</li>
</ol>


```js
meili()
function meili() {
    console.log("meili")
}
mogu()
var mogu = function() {
    console.log("mogu")
}

```


<ol start="11">
<li>下面两个代码片段输出结果有什么区别？为什么？</li>
</ol>


```js
// 片段1
check('first');
function check(ars){
    console.log(ars);
}
// 片段2
check('second');
var check= function(ars){
    console.log(ars);
}

```




### ES6

            


#### 对象

            
<ol>
<li>下面代码的输出结果是？</li>
</ol>


```js
const student = {name: 'ZhangSan'}
Object.defineProperty(student, 'age', {value: 22})
console.log(student)
console.log(Object.keys(student))

```




#### generator

            
<ol>
<li>下列程序的输出结果是多少？为什么？</li>
</ol>


```js
function * cb(x, y) {
    for(let i = Math.ceil(x); i &lt;= y; i++) {
        yield i;
    }
}

var a = cb(6, 9);
console.log(a.next());
console.log(a.next());

```




#### 扩展运算符

            
<ol>
<li>下面程序的输出结果是：</li>
</ol>


```js
function fn(...args) {
  console.log(typeof args);
}
fn(21);

```




#### promise

            


```js
Promise.reject(0)
       .catch(e =&gt; e)
       .catch(e =&gt; console.log(e))

```




#### class

            
<ol>
<li>请写出下面ES6代码编译后所生成的ES5代码</li>
</ol>


```js
class Person {
     constructor (name) {
          this.name = name;
     }
     greet () {
          console.log(`Hi, my name is ${this.name}`);
     }
     greetDelay (time) {
          setTimeout(() =&gt; {
               console.log(`Hi, my name is ${this.name}`);
          }, time);
     }
}


```




#### 标签模板

            
<ol>
<li>下面程序的输出结果是多少？</li>
</ol>


```js
function getPersonInfo (one, two, three) {
    console.log(one)
    console.log(two)
    console.log(three)
}
const person = 'Lydia'
const age = 21
getPersonInfo `${person} is ${age} years old`

```




#### module

            
<ol>
<li>请写出index里面的输出结果</li>
</ol>


```js
// module.js
export default () =&gt; "Hello world"
export const name = "nowcoder"
// index.js
import * as data from "./module"
console.log(data)


```


<ol start="2">
<li>有a.js和b.js两个文件，请写出b文件中代码的输出</li>
</ol>


```js
// a.js
let a = 1
let b = {}
setTimeout(() =&gt; {    
a = 2    
b.b = 2
}, 100)
module.exports = { a, b }

// b.js
const a = require('./a')
console.log(a.a)
console.log(a.b)
setTimeout(() =&gt; {    
    console.log(a.a)    
    console.log(a.b)
}, 500)


```




### 其他

            
<ol>
<li>输出结果是：</li>
</ol>


```html
&lt;div id="box1"&gt;
    &lt;div id="box2"&gt;
        content
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
const $ = document.querySelector.bind(document);
const box1 = $('#box1');
const box2 = $('#box2');

box1.addEventListener('click', () =&gt;{
    console.log('box1 true');
}, true);

box1.addEventListener('click', () =&gt;{
    console.log('box1 false');
}, false);

box2.addEventListener('click', () =&gt;{
    console.log('box2 true');
}, true);

box2.addEventListener('click', () =&gt;{
    console.log('box2 false');
}, false);
&lt;/script&gt;

```


<ol start="2">
<li>输出结果是：</li>
</ol>


```js
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    function fn2( value ) {
        fn1("A");
        return false;
    }
    var callbacks = $.Callbacks();
    callbacks.add( fn1 ); 
    callbacks.fire( "B" );
    callbacks.add( fn2 ); 
    callbacks.fire( "C" );
})

```


<ol start="3">
<li>实现在p元素后添加“Hello World!”，则横线处应使用的方法为(      )？</li>
</ol>


```html

&lt;html&gt;
    &lt;head&gt;
        &lt;script type="text/javascript" src="/jquery/jquery.js"&gt;&lt;/script&gt;
        &lt;script type="text/javascript"&gt;
            $(document).ready(function(){
                $("button").click(function(){
                    $("&lt;b&gt;Hello World!&lt;/b&gt;").______("p");
                });
            });
        &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;This is a paragraph.&lt;/p&gt;
        &lt;p&gt;This is another paragraph.&lt;/p&gt;
        &lt;button&gt;在每个p元素的结尾添加内容&lt;/button&gt;
    &lt;/body&gt;
&lt;/html&gt;

```


<ol start="4">
<li>输出结果是：</li>
</ol>


```html
&lt;div id="box1"&gt;
  &lt;div id="box2"&gt;
    content
  &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
const $ = document.querySelector.bind(document);
const box1 = $('#box1');
const box2 = $('#box2');
box1.addEventListener('click', () =&gt; {
  console.log('box1 true');
}, true);
box1.addEventListener('click', () =&gt; {
  console.log('box1 false');
}, false);
box2.addEventListener('click', () =&gt; {
  console.log('box2 true');
}, true);
box2.addEventListener('click', () =&gt; {
  console.log('box2 false');
}, false);
&lt;/script&gt;

```


<ol start="5">
<li>请选择下面代码输出1的次数</li>
</ol>


```js
var vm = new Vue({  
el: '#example',  
data: {    
    message: 'Hello'  
},  
computed: {    
    test: function () {      
        console.log(1)      
        return this.message    
    }  
},  
created: function (){    
        this.message = 'World'    
        for (var i = 0; i &lt; 5; i++) {        
            console.log(this.test)    
        }  
    }
})


```




### JavaScript进阶系列

            
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fsourl.cn%2FgYuMtS" target="_blank" title="https://sourl.cn/gYuMtS" ref="nofollow noopener noreferrer">JavaScript进阶之彻底理解原型与原型链</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fsourl.cn%2F4MBadZ" target="_blank" title="https://sourl.cn/4MBadZ" ref="nofollow noopener noreferrer">JavaScript进阶之预编译学习</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fsourl.cn%2FgxesRk" target="_blank" title="https://sourl.cn/gxesRk" ref="nofollow noopener noreferrer">JavaScript进阶之彻底理清JS中this指向问题 |《2w字大章 38道面试题》</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fsourl.cn%2FichQyc" target="_blank" title="https://sourl.cn/ichQyc" ref="nofollow noopener noreferrer">JavaScript进阶之彻底理解EventLoop</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fsourl.cn%2FciUnrS" target="_blank" title="https://sourl.cn/ciUnrS" ref="nofollow noopener noreferrer">JavaScript进阶之作用域与作用域链</a></li>
</ul>


### 面试部分

            
<ul>
<li><a href="https://juejin.cn/post/7028478428680552456" target="_blank" title="https://juejin.cn/post/7028478428680552456">牛客最新前端面经面试题汇总(含解析)</a></li>
<li><a href="https://juejin.cn/post/7023271065392513038" title="https://juejin.cn/post/7023271065392513038" target="_blank">牛客最新前端JS笔试百题</a></li>
<li><a href="https://juejin.cn/post/7033275515880341512" target="_blank" title="https://juejin.cn/post/7033275515880341512">2021年前端各大公司都考了那些手写题</a></li>
<li><a href="https://juejin.cn/post/7021750693262262308" target="_blank" title="https://juejin.cn/post/7021750693262262308">原生JavaScript灵魂拷问(一)，你能答上多少？</a></li>
</ul>