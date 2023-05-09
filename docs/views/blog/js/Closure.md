---
date: 2022/11/03 14:54:08 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/Closure.html
}
title : 如何理解JS闭包？
---

可以看看这篇文章，[我从来不理解JavaScript闭包，直到有人这样向我解释它](https://juejin.cn/post/6844903858636849159)，这篇文章讲的很好，从执行上下文讲到词法作用域讲到闭包，很细节。

### 闭包是什么？

我的理解是，<b>闭包就是一个“背包”</b>，所有js的函数都有一个背包，这个背包里面装的就是一些<b>函数体内调用的外层作用域的变量</b>。

```js
function grandFather() {
    const a = 1
    return function father() {
        const b = 2
        return function () {
            const c = 3
            // 下面这个语句打断点
            console.log(a, b, c)
        }
    }
}
const fn = grandFather()()
fn()
```

在调试工具内将这段代码的console语句打断点就能观察到闭包了。


### 闭包的作用

#### 私有化变量

所谓私有化变量就是说，函数外部是无法直接操作内部的变量。

如下面的示例，一个人的年纪是无法变小的，所以只向外暴露了“几岁”以及“成长”的函数，这限制了对年龄的其他操作，显得更安全了。

```js
function age() {
    let age = 1

    return {
        getAge: function () {
            return age;
        },
        growUp: function () {
            age++;
        }
    }
}

let person1Age = age()

person1Age.growUp()
person1Age.growUp()
console.log(person1Age.getAge()) //3
```

#### 封装类

可以用闭包模拟实现“类”

两个人的年龄都是独立的，所以<code>person1Age</code>中的<code>age</code>不会影响到<code>person2Age</code>中的<code>age</code>

```js
function age() {
    let age = 1

    return {
        getAge: function () {
            return age;
        },
        growUp: function () {
            age++;
        }
    }
}

let person1Age = age()

person1Age.growUp()
person1Age.growUp()
console.log(person1Age.getAge()) //3

let person2Age = age()

person2Age.growUp()
console.log(person2Age.getAge()) //2
```

### 闭包常见面试题

#### for循环和闭包

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0](); //3
data[1](); //3
data[2](); //3
```

很经典的一道题目，为什么会输出都为3呢？

因为<code class="default">var i = 0</code>的时候，<code>var</code>是有变量提升的，相等于<code>i</code>是个全局变量，所以循环中创建的匿名函数都指向同一个变量。

当<code>data[i]</code>函数执行的时候，<code>i</code>的值已经等于<code>3</code>了。

解决这个问题的方法就是每次循环创建一个新的作用域

```js
// 用立即执行函数以及闭包解决
var data = [];
for (var i = 0; i < 3; i++) {
    (function (j) {
        data[j] = function () {
            console.log(j);
        }
    })(i)
}

data[0](); //0
data[1](); //1
data[2](); //2
```

```js
// 运用let声明变量i，创建一个独立的块级作用域
var data = [];
for (let i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    }
}

data[0](); //0
data[1](); //1
data[2](); //2
```
-------

#### 闭包题2

```js
var x = 5;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
var e = fn(6);
e(7);   
console.log(x);
```

想想看控制台会输出什么？

答案是 <code>14 5</code>

```js
var x = 5;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
var e = fn(6); //此时x=6的闭包已经被保存了下来
e(7);//这个时候输出了14，因为7+(++6)=14，这边的6就取自e函数保存的闭包
console.log(x);//输出5，因为++x改变的是闭包的值，而不是全局变量x
```
-------

#### 闭包题3

```js
function fun(a, b) {
    console.log(a,b)
    return {
        fun: function (c) {
            a++
            return fun(c, a);
        }
    };
}
var d = fun(0); // 0 undefined
d.fun(1); // 1 1
d.fun(2); // 2 2
d.fun(3); // 3 3
```

函数<code>d()</code>保存了闭包变量<code>a</code>

所以后边的函数<code>d.fun()</code>内的变量<code>a</code>都是闭包内的值

-------
#### 哪个是闭包

思考以下哪个是闭包以及为什么？

```js
let countClicks = 0;
button.addEventListener('click', function clickHandler() {
  countClicks++;
});
```

```js
const result = (function immediate(number) {
  const message = `number is: ${number}`;
  return message;
})(100);
```

```js
setTimeout(function delayedReload() {
  location.reload();
}, 1000);
```

判断是否是闭包的简单规则就是，一个函数是否能访问外部函数的变量

+ <code>clickHandler</code>函数是闭包，因为它能访问外部的<code>countCLicks</code>。
+ <code>immediate</code>函数不是闭包，因为它没有访问到外部的任何一个变量。
+ <code>delayedReload</code>函数是闭包，因为它访问到全局变量<code>location</code>，也就是最顶层的函数域。

#### 闭包题5

```js
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1;
    console.log(count); // 1
  }
  console.log(count); // 0
})();
```

因为在全局变量声明了<code>count = 0</code>，然后在<code>immediaye</code>函数是一个闭包，因为它的<code>count</code>能访问到全局变量的<code>count</code>，所以此时<code>count</code>是<code>0</code>

因为满足<code>count === 0</code>的条件，所以进入条件块，然后声明一个块级作用域<code>count=1</code>，所以第一个<code>console.log(count）</code>打印出1

第二个<code>console.log(count）</code>打印为0，是因为访问的还是全局变量<code>count</code>
