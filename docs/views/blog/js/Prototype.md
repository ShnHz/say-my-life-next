---
date: 2022/11/09 14:10:25 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/Prototype.html
}
title : JS的原型/原型链
---
### 原型

简单的概括一下，原型分为：

+ <code class="default">显式原型（prototype）</code>：是函数才有的属性，<code>Object</code>、<code>Function</code>等等都是js内置的函数。
+ <code class="default">隐式原型（\__proto__）</code>：是每个对象都有的属性，指向的是构造函数的显式原型。

#### 这两个东西有什么关系呢？

##### 构造函数

首先来看构造函数,构造函数是什么？

俗话说就是通过<code class="default">new</code>关键字调用的函数就是构造函数，通常构造函数的<b>首字母大写</b>（约定俗成），且箭头函数不能作为构造函数。

##### 实例

既然有了构造函数，那么构造函数<code class="default">new</code>出来的对象就叫做实例。如下图，<code class="default">person1、person2</code>就是构造函数<code class="default">Person</code>的实例。

```js
function Person(name, age) { // 这个就是构造函数
  this.name = name
  this.age = age
}

const person1 = new Person('小明', 20) // 这个是Person构造函数的实例
const person2 = new Person('小红', 30) // 这个也是Person构造函数的实例
```

##### prototype和__proto__的关系

接下来我们回到正题，这两个原型到底有什么关系呢？

<code>实例</code>的<code class="default">\__proto__</code>就是指向它的<code>构造函数</code>的<code class="default">prototype</code>

所以说<code class="default">person1.\__proto__ === Person.prototype</code>

我们可以来验证一下

```js
function Person(name, age) {
  this.name = name
}
Person.prototype.sayName = function() {
  console.log(this.name)
}
console.log(Person.prototype) // { sayName: [Function] }

const person1 = new Person('小明')
console.log(person1.__proto__) // { sayName: [Function] }

const person2 = new Person('小红')
console.log(person2.__proto__) // { sayName: [Function] }

console.log(Person.prototype === person1.__proto__) // true
console.log(Person.prototype === person2.__proto__) // true
```

##### Function和Object
<br>

+ <code class="default">函数其实就是Function构造函数的实例</code>
+ <code class="default">对象其实就是Object构造函数的实例</code>

那<code class="default">Function</code>构造函数和<code class="default">Object</code>构造函数他们两个又是谁的实例呢？

+ <code class="default">function Object()</code>其实也是个函数，所以他是<code class="default">Function</code>构造函数的实例
+ <code class="default">function Function()</code>其实也是个函数，所以他也是<code class="default">Function</code>构造函数的实例，没错，他是他自己本身的实例

```js
console.log(Function.prototype === Object.__proto__) // true
console.log(Function.prototype === Function.__proto__) // true
```

所有函数的显式原型对象<code class="default">prototype</code>的隐式原型<code class="default">\__proto__</code>其实都指向Object的显式原型对象<code class="default">prototype</code>

```js
function Person(){}

console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
```

##### constructor

<code class="default">constructor</code>指向构造函数

<code class="default">constructor</code>和<code class="default">prototype</code>是成对的，你指向我，我指向你。举个例子，如果你是我老婆，那我肯定是你的老公。

```js
function fn() {}

console.log(fn.prototype) // {constructor: fn}
console.log(fn.prototype.constructor === fn) // true 它的显式原型对象的构造函数指向它本身
console.log(fn.constructor.prototype == fn.__proto__) //true 它的构造函数的显式原型对象指向它的隐式原型对象
```

### 原型链

一张图来解释原型链

<img src="https://cdn.chenyingshuang.cn/blog/js/prototype/%E5%8E%9F%E5%9E%8B%E9%93%BE.jpg" />

总结来看，在js中，所有对象都有一个隐式原型<code>\__proto__</code>，而且js万物都是对象。所以就会有一条由<code>\__proto__</code>组成的链条，这条链条就叫原型链。这个链条最终的值是<code>null</code>，因为<code>Object.prototype.\__proto__</code>为<code>null</code>。

### 原型链常见面试题

#### 第一题

```js
var F = function() {};

Object.prototype.a = function() {
  console.log('a');
};

Function.prototype.b = function() {
  console.log('b');
}

var f = new F();

f.a();
f.b();

F.a();
F.b();
```

::: details 答案
```js
f.a(); //a
f.b(); //f.b is not a function //因为自定义构造函数new出来的是一个对象

F.a(); //a
F.b(); //b
```
:::

#### 第二题

```js
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

console.log(b.n);
console.log(b.m);

console.log(c.n);
console.log(c.m);
```

::: details 答案
```js
console.log(b.n); //1
console.log(b.m); //undefined

console.log(c.n); //2
console.log(c.m); //3
```
:::
#### 第三题

```js
var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);
console.log(foo.b);

console.log(F.a);
console.log(F.b);
```

::: details 答案
```js
console.log(foo.a); //value a
console.log(foo.b); //undefined

console.log(F.a); //value a
console.log(F.b); //value b
```
:::

#### 第四题

```js
function A() {}
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A().a); 
console.log(new B().a);
console.log(new C(2).a);
```

::: details 答案
```js
console.log(new A().a); //1
console.log(new B().a); //undefined
console.log(new C(2).a); //2
```
:::

#### 第五题

```js
console.log(123['toString'].length + 123)
```

::: details 答案
123是数字，数字本质是<code class="default">new Number()</code>，数字本身没有<code class="default">toString</code>方法，则沿着<code class="default">\__proto_</code>去<code class="default">function Number()</code>的<code class="default">prototype</code>上找，找到<code class="default">toString</code>方法，<code class="default">toString</code>方法的<code class="default">length</code>是<code class="default">1，1 + 123 = 124</code>。
:::

#### 第六题

```js
function C1(name) {
        if (name) {
            this.name = name;
        }
    }

function C2(name) {
        this.name = name;
    }

function C3(name) {
        this.name = name || 'join';
    }
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';

console.log(new C1().name) 
console.log(new C2().name)
console.log(new C3().name)
```

::: details 答案
```js
console.log(new C1().name) //Tom
console.log(new C2().name) //undefined
console.log(new C3().name) //join
```
:::

#### 第七题

```js
function Fn(num) {
    this.x = this.y = num;
}
Fn.prototype = {
    x: 20,
    sum: function () {
        console.log(this.x + this.y);
    }
};
let f = new Fn(10);

console.log(f.sum === Fn.prototype.sum);
f.sum();
Fn.prototype.sum();
console.log(f.constructor);
```

::: details 答案
```js
console.log(f.sum === Fn.prototype.sum); //true
f.sum(); //20
Fn.prototype.sum();//NAN(20+undefined) 
console.log(f.constructor);//ƒ Object() { [native code] }
```
:::

#### 第八题

```js
function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype = {
    y: 400,
    getX: function () {
        console.log(this.x);
    },
    getY: function () {
        console.log(this.y);
    },
    sum: function () {
        console.log(this.x + this.y);
    }
};
var f1 = new Fn;
var f2 = new Fn;

console.log(f1.getX === f2.getX);
console.log(f1.getY === f2.getY);
console.log(f1.__proto__.getY === Fn.prototype.getY);
console.log(f1.__proto__.getX === f2.getX);
console.log(f1.getX === Fn.prototype.getX); 
console.log(Fn.prototype.__proto__.constructor);
```

::: details 答案
```js
console.log(f1.getX === f2.getX);//false
console.log(f1.getY === f2.getY);//true
console.log(f1.__proto__.getY === Fn.prototype.getY); //true
console.log(f1.__proto__.getX === f2.getX);//false
console.log(f1.getX === Fn.prototype.getX);//false
console.log(Fn.prototype.__proto__.constructor);// ƒ Object() { [native code] }
```
:::

#### 第九题

```js
var print = function () {
    alert(1);
}

function Fn() {
    print = function () {
        alert(2);
    }
    return this;
}

function print() {
    alert(3);
}
Fn.prototype.print = function () {
    alert(4);
}
Fn.print = function () {
    alert(5);
}

print();
Fn.print();
Fn().print();
new Fn.print();
new Fn().print();
```

::: details 答案
```js
print(); //1
Fn.print(); //5
Fn().print(); //2 Fn执行把全局的print改为2
new Fn.print(); //5
new Fn().print(); //4
```
:::

### 参考资料

###### [这可能是掘金讲「原型链」，讲的最好最通俗易懂的了，附练习题！](https://juejin.cn/post/7007416743215759373)
###### [轻松理解JS 原型原型链](https://juejin.cn/post/6844903989088092174)
###### [面不面试的，你都得懂原型和原型链](https://juejin.cn/post/6934498361475072014)
###### [Javascript中原型链练习题及解析](https://juejin.cn/post/6844903928451219470)


