---
title: 函数柯里化
date: 2022/12/16 14:43:59
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js"],
    valine: true,
    valineId: 
}
password: false
---

### 什么是函数柯里化（curry）

函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

简单点来说就是：每次调用函数时，它只接受一部分参数，并返回一个函数，直到传递所有参数为止。

### 柯里化有什么作用

主要有3个作用： **参数复用**、**提前返回**和 **延迟执行**

### 手写代码

假设存在一个原函数->fn<-，->fn<-接受三个参数->a, b, c<-，那么函数->fn<-最多被柯里化三次（有效地绑定参数算一次）。

```js
// 柯里化函数
function curry(fn, ...args1) {
    return (...args2) => {
        const args = [...args1, ...args2]
        // 将柯里化参数合并
        if (args.length < fn.length) {
            // 当柯里化参数还没有达到函数参数的数量时，则继续对当前函数进行柯里化，返回一个柯里化函数
            return curry(fn, ...args)
        } else {
            // 当柯里化参数大于等于函数参数的数量时，直接执行该函数
            return fn(...args)
        }
    }
}

function sum(a, b, c, d) {
    return a + b + c + d
}

console.log(curry(sum, 1, 2)(3)(4)) //10
console.log(curry(sum, 1, 2)(3, 4)) //10
```

也就是说，我们可以通过柯里化缓存的**参数数量**，来判断是否到达了执行时机。


当我们传入的函数参数数量不确定时呢，该怎么做，我们可以拿上面写好的例子来做实验

```js
console.log(curry(sum, 1, 2)(3)(4,5)(6)(7,8,9))
```

运行这段代码会报错：->Uncaught TypeError: curry(...)(...)(...) is not a function<-，这是因为执行到->(3)<-的时候，结果不是一个**函数**，而是一个**数值**，一个**数值**当然是不能继续执行的。

所以如果要支持参数不定长的场景，**已经柯里化的函数在执行完毕时不能返回一个值，只能返回一个函数；同时要让JS引擎在解析得到的这个结果时，能求出我们预期的值。**

```js
// 柯里化函数
function curry(fn, ...args1) {
    function curryed(...args2) {
        const args = [...args1, ...args2]
        return curry(fn, ...args)
    }

    curryed.toString = () => {
        return fn(...args1)
    }
    return curryed
}

function sum(...args) {
    return args.reduce((cur, total) => cur + total, 0)
}

console.log(curry(sum, 1, 2)(3)(4)) //10
console.log(curry(sum, 1, 2)(3)) //6
console.log(curry(sum, 1, 2)(3)(4,5)(6)(7,8,9)) //45
```

:::tip 
Chrome最新版本在使用 console.log 测试无限柯里化时，已经达不到预期效果，估计与 Chrome console.log 内部实现有关，大家测试时可以用 **alert** 试试。 
:::

为什么这样写就可以了呢，因为在解析一个函数的原始值时，会用到 ->valueOf<- 或者 ->toString<-。

```js
function test() {
    console.log('test')
}

test.toString = () => {
    console.log('test.toString')
}

console.log(test)
// 控制台会输出
// ƒ test() {
//   console.log('test')
// }
// test.toString
```

写个例子来理解一下

```js
let val = curry(sum, 1, 2)
console.log(val)
// 此时输出的其实是一个函数
// ƒ curryed(...args2) {
//     const args = [...args1, ...args2]
//     return curry(fn, ...args)
// }
```

当你想要利用这个返回值进行运算时，会触发函数的隐式转换，->object + number<- 会先调用->object<-的->valueOf<-，然后调用->object<-的->toString<-，此时就会调用我们重写的->toString<-，得到返回值，当然重写->valueOf<-也是可以达到同样的效果的

```js
let val = curry(sum, 1, 2)
console.log(val + 1) //4
```