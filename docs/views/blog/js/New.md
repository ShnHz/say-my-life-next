---
date: 2022/11/10 13:51:33 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/New.html
}
title : JS的new操作符
---
### new的作用

+ <code class="default">new</code>通过构造函数创建出来的实例可以访问到构造函数中的属性
+ <code class="default">new</code>通过构造函数创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过<code class="default">new</code>操作符，实例与构造函数通过原型链连接了起来

### 构造函数return

分为两种情况

+ 构造函数内<code class="default">return</code>了一个基本数据类型，那么这个<code class="default">return</code>将毫无用处，对实例不会造成变化。
+ 构造函数内<code class="default">return</code>了一个引用数据类型，那么所有实例都会被这个<code class="default">return</code>的引用数据所代替，这个返回值会被正常使用。

所以在构造函数中，我们尽量不要去<code class="default">return</code>任何东西。

### new的实现

首先我们再来回顾一下<code class="default">new</code>操作符的几个作用：

+ <code class="default">return</code>操作符回返回一个对象，所以我们需要在内部创建一个对象
+ 这个对象，也就是构造函数的<code class="default">this</code>，可以访问到挂载在<code class="default">this</code>上的任意属性
+ 这个对象，可以访问到构造函数原型上的属性，所以需要将对象和构造函数连接起来
+ 返回原始值需要忽略，返回对象需要正常处理

```js
function myNew(context, ...args) {
    // 定义一个新对象，将这个新对象的隐式原型指向构造函数的原型对象
    // 注意看这边，为什么不用Object.setPrototypeOf？
    // MDN原文是：Object.setPrototypeOf 不建议用，因为性能太差。最好用Objecr.create新建对象。
    let obj = Object.create(context.prototype)
    // 将新对象以及参数利用apply方法执行构造函数，得到返回值result
    let result = context.apply(obj, args)
    // 判断返回值是否是一个引用数据类型，如果不是则返回没有执行构造函数的新对象，如果是则返回result
    return typeof result == 'object' ? result : obj
}
```

简单的来说分为4步

+ 1.创建新对象
+ 2.将新对象的隐式原型<code class="default">\__proto__</code>指向构造函数的原型对象<code class="default">prototype</code>
+ 3.利用apply或者call方法将新对象以及参数传入，执行构造函数
+ 4.返回新对象

验证一下，我们手写的函数是否和<code class="default">new</code>操作符一致

```js
function Person(name) {
    this.name = name
    this.age = 1
}
Person.prototype.sayName = function(){
    console.log(this.name)
}

let person1 = new Person('张三')
let person2 = myNew(Person, '李四')

console.log(person1) // Person {name: '张三', age: 1}
console.log(person2) // Person {name: '李四', age: 1}

console.log(person1.name,person1.age) // 张三 1
console.log(person2.name,person2.age) // 李四 1

person1.sayName() // 张三
person2.sayName() // 李四

function Test1(name) {
    this.name = name
    return {
        name: '覆盖name'
    }
}

let person3 = new Test1('张三')
let person4 = myNew(Test1, '李四')

console.log(person3) // {name: '覆盖name'}
console.log(person4) // {name: '覆盖name'}

function Test2(name) {
    this.name = name
    return '覆盖name'
}

let person5 = new Test2('张三')
let person6 = myNew(Test2, '李四')

console.log(person5) // Test2 {name: '张三'}
console.log(person6) // Test2 {name: '李四'}
```

### 参考资料

###### [邂逅new，实现new](https://juejin.cn/post/6892033805143277575)
###### [重学 JS 系列：聊聊 new 操作符](https://juejin.cn/post/6844903789070123021)


