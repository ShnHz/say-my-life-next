---
date: 2022/11/11 14:14:03 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/BindCallApply.html
}
title : JS手写bind、call、apply
---
### 作用

<code class="default">bind</code>、<code class="default">call</code>、<code class="default">apply</code>这三个函数在js中其实作用都是一样的

那就是改变<code class="default">this</code>指向

### 区别

那他们不同在哪里呢？

首先<code class="default">bind</code>与<code class="default">call</code>、<code class="default">apply</code>的用法不同，<code class="default">call</code>、<code class="default">apply</code>是直接调用函数，而<code class="default">bind</code>则是会返回一个新函数。

而<code class="default">call</code>、<code class="default">apply</code>的传入参数又有所不同。

+ <code class="default">call</code>，接受的参数是若干个参数，<code class="default">fn.call(this,[arg1,[arg2,[arg3,[...]]]])</code>
+ <code class="default">apply</code>，接受的参数是一个参数列表，<code class="default">fn.apply(this,[arg1,arg2,arg3,...])</code>

### 手写函数

#### call

实现思路很简单

+ 1.将函数设置为传入对象的属性；<code>obj.fnc = this</code>
+ 执行该函数；<code>obj.fnc()</code>
+ 删除该属性；<code>delete obj.func;</code>

有了思路那我们就着手开始做

```js
Function.prototype.myCall = function (context,...args) {
    // 首先确认传入的对象，如果没传则绑定window
    var context = context || window
    // 设置一个fn属性，将this赋值给它，其实就是把原函数赋值给了context.fn
    context.fn = this
    // 执行context.fn，获取返回值res，利用...解构传入参数
    let res = context.fn(...args)
    // 删除context.fn属性
    delete context.fn   
    // 返回执行结果
    return res
}
```

#### apply

之前讲过，<code class="default">call</code>、<code class="default">apply</code> 的唯一区别就是传递参数的不同，所以我们只需要改一下对参数的处理，其它的和 <code class="default">call</code> 一致就可以了。

```js
Function.prototype.myApply = function (context, args = []) {
    // 需要判断第二个传参是否为数组
    if(Object.prototype.toString.call(args) != '[object Array]'){
        throw new TypeError(`args is not an array!`)
    }
    // 首先确认传入的对象，如果没传则绑定window
    var context = context || window
    // 设置一个fn属性，将this赋值给它，其实就是把原函数赋值给了context.fn
    context.fn = this
    // 执行context.fn，获取返回值res，利用...解构传入参数
    let res = context.fn(...args)
    // 删除context.fn属性
    delete context.fn
    // 返回执行结果
    return res
}
```

#### bind

在上文说到，<code class="default">bind</code>是不会立即执行函数的，会返回一个函数，而且执行之后还可以继续传入参数。

那我们可以利用闭包来写。

##### 版本1

```js
Function.prototype.myBind = function (context, ...args) {
    // 首先确认传入的对象，如果没传则绑定window
    var context = context || window
    // 将原函数保存，设置变量fn
    let fn = this

    return function (...fnArgs) {
        // 将闭包内的fn用call方法改变this指向，将context与解构后的参数传入
        return fn.call(context, ...args, ...fnArgs)
    }
}
```

##### 版本2

那我们知道函数既可以被调用，也可以作为构造函数使用，如何保证构造函数的this是正确的呢，我们稍微修改一下版本1的代码

```js
Function.prototype.myBind = function (context, ...args) {
    // 首先确认传入的对象，如果没传则绑定window
    var context = context || window
    // 将原函数保存，设置变量fn
    let fn = this

    return function newFn(...fnArgs) {
        let res = null
        if (this instanceof newFn) {
            // 如果是构造函数则调用new 并且合并参数args，fnArgs
            // 那么其实context是毫无用处的
            res = new fn(...args, ...fnArgs)
        } else {
            // 当作普通函数调用，那就可以用call方法改变this指向
            res = fn.call(context, ...args, ...fnArgs)
        }

        // 返回结果
        return res
    }
}
```

### 参考资料

###### [【手写系列】自己手写实现apply、call、bind](https://juejin.cn/post/7155713320254144519)
###### [JS手写bind函数](https://juejin.cn/post/6844904056431837197)
