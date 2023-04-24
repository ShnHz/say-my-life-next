---
date: 2022/11/14 22:19:52 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/ObjectCreate.html
}
title : Object.create()、new Object()和{}的区别
---
###### 原文 [掘金](https://juejin.cn/post/6844903917835436045)

平时代码中必定会使用对象，通常是用最直接的字面量方法创建<code class="default">var obj = {}</code>，最近在整理<code class="default">JS</code>继承方式时遇到<code class="default">Object.create()</code>也可以创建对象，另外，也可以用<code class="default">new Object()</code>关键字创建。 那这三种方式有差别吗？

### 直接字面量创建

```js
var objA = {};
objA.name = 'a';
objA.sayName = function() {
    console.log(`My name is ${this.name} !`);
}
// var objA = {
//     name: 'a',
//     sayName: function() {
//         console.log(`My name is ${this.name} !`);
//     }
// }
```

### new关键字创建

```js
var objB = new Object();
// var objB = Object();
objB.name = 'b';
objB.sayName = function() {
    console.log(`My name is ${this.name} !`);
}
objB.sayName();
console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true
```

其实字面量创建和<code class="default">new</code>关键字创建并没有区别，创建的新对象的<code class="default">\__proto__</code>都指向<code class="default">Object.prototype</code>，只是字面量创建更高效一些，少了<code class="default">\__proto__</code>指向赋值和<code class="default">this</code>。

### Object.create()

> <code class="default">Object.create()</code>方法创建一个新对象，使用现有的对象来提供新创建的对象的<code class="default">\__proto__</code>。 [MDN]('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create')

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person); // me.__proto__ === person
me.name = "Matthew"; // name属性被设置在新对象me上，而不是现有对象person上
me.isHuman = true; // 继承的属性可以被重写
me.printIntroduction(); // My name is Matthew. Am I human? true
```

> Object.create(proto[, propertiesObject])

+ <code class="default">proto</code>必填参数，是新对象的原型对象，如上面代码里新对象<code class="default">me</code>的<code class="default">\__proto__</code>指向<code class="default">person</code>。注意，如果这个参数是<code class="default">null</code>，那新对象就彻彻底底是个空对象，没有继承<code class="default">Object.prototype</code>上的任何属性和方法，如<code class="default">hasOwnProperty()</code>、<code class="default">toString()</code>等。

```js
var a = Object.create(null);
console.dir(a); // {}
console.log(a.__proto__); // undefined
console.log(a.__proto__ === Object.prototype); // false
console.log(a instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object
```

+ <code class="default">propertiesObject</code>是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用<code class="default">hasOwnProperty()</code>获取的，而不是原型对象上的）的描述符及相应的属性名称。

```js
var bb = Object.create(null, {
    a: {
        value: 2,
        writable: true,
        configurable: true
    }
});
console.dir(bb); // {a: 2}
console.log(bb.__proto__); // undefined
console.log(bb.__proto__ === Object.prototype); // false
console.log(bb instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object

// ----------------------------------------------------------

var cc = Object.create({b: 1}, {
    a: {
        value: 3,
        writable: true,
        configurable: true
    }
});
console.log(cc); // {a: 3}
console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b')); // true false 说明第二个参数设置的是新对象自身可枚举的属性
console.log(cc.__proto__); // {b: 1} 新对象cc的__proto__指向{b: 1}
console.log(cc.__proto__ === Object.protorype); // false
console.log(cc instanceof Object); // true cc是对象，原型链上肯定会出现Object
```

<code class="default">Object.create()</code>创建的对象的原型指向传入的对象。跟字面量和<code class="default">new</code>关键字创建有区别。

#### 自己实现一个Object.create()

```js
Object.mycreate = function(proto, properties) {
    function F() {};
    F.prototype = proto;
    if(properties) {
        Object.defineProperties(F, properties);
    }
    return new F();
}
var hh = Object.mycreate({a: 11}, {mm: {value: 10}});
console.dir(hh);
```

### 总结

+ 字面量和<code class="default">new</code>关键字创建的对象是<code class="default">Object</code>的实例，原型指向<code class="default">Object.prototype</code>，继承内置对象<code class="default">Object</code>
+ <code class="default">Object.create(arg, pro)</code>创建的对象的原型取决于<code class="default">arg</code>，<code class="default">arg</code>为<code class="default">null</code>，新对象是空对象，没有原型，不继承任何对象；<code class="default">arg</code>为指定对象，新对象的原型指向指定对象，继承指定对象


