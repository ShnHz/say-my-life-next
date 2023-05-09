---
title: JavaScript
config : {
    dir : true
}
password: true
---

### 八股文

#### 1.说一说你对闭包的理解？

闭包就是js的一个语法特性,闭包就是一个<b>“背包”</b>，所有js的函数都有一个背包，这个背包里面装的就是一些<b>函数体内调用的外层作用域的变量</b>。

闭包的原理：作用域链，当前作用域可以访问上级作用域的变量。

闭包的作用：

+ 私有化变量，能够使函数外部访问函数内部的局部变量
+ 延长变量的生命周期
+ 封装一个类

带来的问题：造成内存泄漏，因为浏览器不会销毁这些闭包变量。

可以参考我的文章 [如何理解JS闭包？](https://www.sanghangning.cn/views/blog/js/Closure.html)

#### 2.说一说new会发生什么？

步骤如下：

+ 创建一个新对象
+ 将新对象的隐式原型<code>\__proto__</code>指向构造函数的原型对象<code>prototype</code>
+ 利用<code>apply</code>或者<code>call</code>方法将新对象以及参数传入，执行构造函数
+ 返回新对象

可以参考我的文章 [JS的new操作符](https://www.sanghangning.cn/views/blog/js/New.html)

#### 3.如何理解原型链？

在js中，所有对象都有一个隐式原型<code>__proto__</code>，而且js万物都是对象。所以就会有一条由<code>__proto__</code>组成的链条，这条链条就叫原型链。这个链条最终的值是<code>null</code>，因为<code>Object.prototype.__proto__</code>为<code>null</code>

一个实例的隐式原型<code>__proto__</code>指向构造函数的显式原型<code>prototype</code>

可以参考我的文章 [JS的原型/原型链](https://www.sanghangning.cn/views/blog/js/Prototype.html)

#### 4.如何理解this？

函数在调用的时候会创建一个执行环境，<code>this</code>对象基于这个执行环境绑定，所以<code>this</code>的指向其实就是基于函数的执行环境决定的。

可以参考我的文章 [JS的this指向问题](https://www.sanghangning.cn/views/blog/js/This.html)

#### 5.js中的继承有哪几种？

+ 构造函数继承
+ 原型链继承
+ 组合继承
+ 寄生继承
+ 寄生组合继承
+ Class继承<code>extend</code>

可以参考我的文章 [JS中常用的继承方式](https://www.sanghangning.cn/views/blog/js/Inherit.html)
#### 6.js有哪些数据类型？他们有什么不同？

基本数据类型：<code>String</code>、<code>Number</code>、<code>Boolean</code>、<code>Null</code>、<code>Undefined</code>，es6新增的<code>BigInt</code>、<code>Symbol</code>

引用数据类型：<code>Object</code>，<code>Array</code>、<code>Map</code>、<code>Set</code>、<code>Function</code>、<code>Date</code>、<code>RegExp</code>其实都是对象。

基本数据类型存储在内存栈中，占用空间小。

引用数据类型存储在内存堆中，占用空间大，而且存储了一个指针在内存栈中。

#### 7.为什么0.1+0.2!==0.3，如何让其相等？

因为进制转换对阶过程中会出现精度缺失问题。浮点数转成二进制时丢失了精度，因此在二进制转十进制过程中可能会出现结果不符的情况。

在计算前先将数字乘以一个10的幂次数。

```
(0.1*10+0.2*10)/10 //0.3
```

#### 8.let、const、var的区别？

+ 块级作用域：<code>let</code>、<code>const</code>有块级作用域的特性,<code>var</code>没有。
+ 变量提升：<code>let</code>、<code>const</code>不会变量提升，<code>var</code>会，其实<code>let</code>也是会的，只是由于暂时性死区的缘故，不能在声明前使用这个变量。
+ 常量：<code>const</code>声明后不可改变。
+ 全局属性：浏览器的全局是<code>windows</code>，nodejs的全局是<code>global</code><code>var</code>声明的变量为全局变量，并且会将该变量添加到全局属性上。
+ 重复声明： <code>var</code>是可以被重复声明的，会覆盖前一个声明的变量，<code>let</code>、<code>const</code>重复声明会报错。
+ 初始值：<code>let</code>、<code>val</code>可以声明时不赋值，<code>const</code>不赋值则会报错。
+ 暂时性死区：在使用<code>let</code>、<code>const</code>时，声明前都是不可以使用这个对象的。

#### 9.什么是变量提升？变量提升默认值为什么是undefined？

变量提升就是指将声明对象语句执行顺序提升到作用域最上方，<code>var</code>有变量提升的特性，<code>let</code>、<code>const</code>没有。

因为变量提升只提升变量的声明语句，不提升赋值语句，声明了变量没有赋值的话就是<code>undefined</code>。

#### 10.this的指向问题？

+ new调用（new Methods()）：绑定到<code>new</code>出来的对象上。
+ 普通函数调用（methods()）：严格模式下为<code>undefined</code>，混杂模式下为全局对象。
+ 对象调用（obj.methods()）：绑定到<code>obj</code>上，也就是调用的对象上。
+ call、apply、bind：由传入参数决定，因为这三个函数都是改变<code>this</code>指向的作用。
+ 箭头函数：箭头函数本身没有<code>this</code>，所以继承的是上级作用域的<code>this</code>。

可以参考我的文章 [JS的this指向问题](https://www.sanghangning.cn/views/blog/js/This.html)

#### 11.bind、call和apply的区别？

它们的功能完全一样，都是改变<code>this</code>的指向，唯一的区别是传入参数不同。

第一个参数是指定了函数体内的this指向，后面的参数有所不同。

<code>call</code>传入的是多个对象，以顺序依此传入对象。

<code>apply</code>传入的是一个对象数组。

<code>bind</code>与<code>call</code>、<code>apply</code>的使用方式不同，<code>call</code>、<code>apply</code>会直接执行函数，<code>bind</code>则会返回一个新的函数。

[JS手写bind、call、apply](https://www.sanghangning.cn/views/blog/js/BindCallApply.html)
#### 12.说一说js有什么判断变量类型的方法？

+ instandof:无法判断数组和对象
+ typeof:基本数据类型判断，无法判断引用类型
+ Object.prototype.tostring.call():所有类型都能够判断
+ Array.isArray():判断是否为数组

#### 13.说一说js实现异步的方法？

+ promise
+ await/async
+ 生成器函数 Generator/yield
+ 计时器
+ 回调函数

#### 14.说一下EventLoop（事件循环）？

由于js是单线程的，既要处理 DOM，又要计算样式，还要处理布局，同时还需要处理 JavaScript 任务以及各种输入事件，那么要让这些事件能够有条不紊的进行就需要一个统筹管理系统，其实就是<code>eventloop</code>（事件循环）。

js的任务分为同步任务以及异步任务，处理机制总结起来是这样的，先执行同步任务，再执行异步任务，异步任务又分为微任务以及宏任务，先执行微任务再执行宏任务。

常见宏任务：setTimeout，setInterval，DOM事件，script标签，ajax
常见微任务：Promise，async/await

#### 15.说一说 null 和 undefined 的区别?
+ <code>null</code>是定义了并赋值<code>null</code>
+ <code>undefined</code>定义未赋值

```js
console.log(null == undefined) //true
console.log(null === undefined) //false
console.log(!null === !undefined) //true

console.log(null + 1) //1
console.log(undefined + 1) //NAN

console.log(null + true) //1
console.log(undefined + true) //NAN

console.log(null + []) //null
console.log(undefined + []) //undefined

console.log(JSON.stringify({a: undefined, b: null}))  // '{b: null}')
```

#### 16.事件委托的原理？

**事件委托**也称为**事件代理**。就是利用**事件冒泡**，把子元素的事件都绑定到父元素上。如果子元素阻止了事件冒泡，那么委托就无法实现。

其实就是比如说有100个按钮，每个按钮都要绑定相同的单击事件，那么不如直接把事件绑定在包裹这100个按钮的容器上

优点：

+ 替代循环绑定事件的操作，减少内存消耗，提高性能。
+ 简化dom节点更新的时候，在新dom上再次绑定事件的性能消耗

缺点：

+ 对于不冒泡的事件无法委托
+ 层级过多时，可能会被某一级阻止
+ 理论上委托会导致浏览器频繁调用处理函数，虽然很可能不需要处理。所以建议就近委托

##### 事件委托的顺序？

dom元素中，既有冒泡，又有捕获的执行顺序：w3c规定，任何发生在w3c事件模型中的事件，**首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段**。
#### 17.深拷贝？浅拷贝？

深拷贝比如说一个对象想要拷贝，就是在内存堆中重新开辟一块空间出来进行拷贝对象的存储，而浅拷贝只是拷贝了原对象在内存堆中的一个指针，实际上存储的还是原对象。

#### 18.Object.assign()是深拷贝吗？

可以是深拷贝也可以是浅拷贝，当传递对象为基本类型时，是浅拷贝，传递对象为引用类型时，是深拷贝，当对象有二级属性时候，也是浅拷贝（对象内有对象）

#### 19.instandof 的原理？

就是对比左侧对象的原型链与右侧对象的显式原型prototype，看看是否存在右侧的这个显式原型，如果是则返回true，否则返回false

#### 20.说一说es6的箭头函数？

是创建函数的语法糖 没有this 继承上个作用域的this，没有argments，没有new，没有prototype

#### 21.['1','2','3','0x16'].map(parseInt)输出什么

->parseInt<-方法当str以->0x<-开头，则按照16进制处理，其余情况都以10进制处理

#### 22.ES6有哪些常用的功能

+ 箭头函数
+ 解构
+ set、map
+ let、const变量命名
+ promise、generator、await/async
+ 模板字符串
+ 新的变量类型bigint、symol
+ import\export模块化 ESM
+ 函数参数的默认值

#### 23.echarts部分有没有配置比较复杂的图

世界地图，鼠标hover显示自定义的html面板展示一些柱状图数据

#### 24.typeof NaN 的结果是什么

number

#### 25.isNaN 和 Number.isNaN 函数的区别？

isNaN函数会首先进行number函数转换，如果转换后为number类型，则返回false，否则返回true

Number.isNaN函数是严格等于NaN，不做任何转换，只有NaN返回true

#### 26.map和weakMap的区别

+ Map的键可以是任意类型，WeakMap只接受对象作为键，不接受其它类型的值作为键
+ Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键；WeakMap的键是弱引用，键所指向的对象是可以被垃圾回收，此时键是无效的。
+ Map可以被遍历，WeakMap不能被遍历

#### 27.for in 和for of 的区别

+ for in可以遍历对象，for of不能遍历对象
+ for of可以用来遍历map集合，for in不能遍历map集合
+ for in遍历数组得到的是数组的下标，for of遍历数组得到的是数组的元素
+ for in遍历键，for of遍历值

#### 28.为什么for of不能遍历对象

因为对象没有实现->Symbol.iterator<-这个方法，就是迭代器

#### 29.ES5和ES6的继承? 这两种方式除了写法, 还有其他区别吗?

es6的Class本质上是个语法糖,就是es5的寄生组合式继承的语法糖,所以其实没有什么区别
### Promise
#### 1.说一说promise是什么？

promise诞生是为了解决回调地狱的问题，优化代码结构。

这个单词的意思就是“承诺”，那么一个承诺肯定会有三种状态，等待实现承诺<b>pending</b>、成功<b>fulfilled</b>、失败<b>rejected</b>，且一个承诺是<b>不可逆</b>的

#### 2.promise有哪些方法？

+ <code>Promise.all</code>可以将多个<code>Promise</code>实例包装成一个新的<code>Promise</code>实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被<code>reject</code>失败状态的值。
+ <code>Promise.race</code>也是传入一个数组，但是是赛跑的意思，顾名思义，就是谁先获得结果，就返回那个结果，不管结果本身是成功状态还是失败状态。

#### 3.Promise、Generator、Async有什么区别？

这三个函数其实都是异步解决方案，从左至右逐渐发展。把异步问题写的越来越优雅。

->Generator<- 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

调用 ->Generator<- 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。下一步，必须调用遍历器对象的->next<-方法，使得指针移向下一个状态。

```js
function *fetch() {
    yield ajax('aaa')
    yield ajax('bbb')
    yield ajax('ccc')
}
let gen = fetch()
let res1 = gen.next() // { value: 'aaa', done: false }
let res2 = gen.next() // { value: 'bbb', done: false }
let res3 = gen.next() // { value: 'ccc', done: false }
let res4 = gen.next() // { value: undefined, done: true } done为true表示执行结束
```

三种方案都是为解决传统的回调函数而提出的，所以它们相对于回调函数的优势不言而喻。而->async/await<-又是->Generator<-函数的语法糖。

+ ->Promise<-的内部错误使用->try catch<-捕获不到，只能只用->then<-的第二个回调或->catch<-来捕获，而->async/await<-的错误可以用->try catch<-捕获
+ ->Promise<-一旦新建就会立即执行，不会阻塞后面的代码，而->async<-函数中->await<-后面是->Promise<-对象会阻塞后面的代码。
+ ->async<-函数会隐式地返回一个->promise<-，该->promise<-的->reosolve<-值就是函数->return<-的值。
+ ->async<-函数可以让代码更加简洁，不需要像->Promise<-一样需要调用then方法来获取返回值，不需要写匿名函数处理->Promise<-的->resolve<-值，也不需要定义多余的data变量，还避免了嵌套代码。

#### 4.promise.all 传入的数组内可以有不是promise对象的吗？

可以的，不会报错也不会进入catch，会将值直接放入返回值内

### http请求

#### 1.ajax的原理

就是通过<code>XMLHttpRequest</code>对象向服务器发送异步请求，从服务器获取数据，利用<code>js</code>来操作<code>DOM</code>更新页面。

#### 2.ajax发送请求的过程？

+ 1.创建<code>XMLHttpRequest</code>对象
+ 2.调用<code>open</code>方法初始化HTTP请求参数（请求方法，url）
+ + 如果是<code>post</code>请求，需要调用<code>setRequestHeader</code>方法设置请求头
+ 3.创建监听异步回调方法
+ 4.调用<code>send</code>方法发送请求
+ 5.获取请求返回值，根据返回状态执行相应操作

#### 3.ajax，fetch，axios有什么区别？

+ ajax：是对原生xhr的封装，在JQuery时代常用
+ fetch：是xhr的替代品，是ES规范里面全新的实现方式，全新的底层实现。
+ axios：本质上也是对xhr的封装，但是是利用Promise封装的版本，符合最新的ES规范

### 设计模式

#### 1.设计模式是什么？

模式是一种可服用的解决方案，用于解决软件设计中遇到的常见问题。说白了就是套路，一种写代码的攻略。遇到相应的场景能够快速找到最好的解决方案。

#### 2.前端有哪些常用的设计模式？

##### 策略模式

要实现某一个功能，有多种方案可以选择。我们定义策略，把它们一个个封装起来，并且使它们可以相互转换

使用场景：权限判断，表单验证等等

##### 发布-订阅者模式

EventEmit

就是发布订阅者模式的一个管理中心，订阅者把自己想订阅的事件注册到管理中心，当发布者发布该事件的时候，也就是该事件触发的时候，由管理中心统一调度订阅者的注册代码

使用场景：各模块独立，且存在一对多的关系
##### 装饰器模式、适配器模式

装饰器模式：就是指把一个原有的对象加上一些你想要加的功能，但并不改变原有的功能

适配器模式：就是解决不兼容的问题，比如一个苹果电脑没有usb接口，那么就要装上一个转接器来实现插u盘的功能

### 不常见的运算

#### 1.null==undefined

```js
console.log(null == undefined) // true
```

#### 2.+0==-0

```js
console.log(+0==-0) // true
```

#### 3.typeof NaN

```js
console.log(typeof NaN) // number
```

#### 4.typeof null

```js
console.log(typeof null) // object
```
