---
title: 轻松手写防抖和节流
date: 2022/12/12 16:02:15
summary: 这两个函数非常非常常用，但是一般我们都是直接用的第三方库，那么自己该如何实现呢？
config: {
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

### 防抖

顾名思义，我们可以将防抖理解为是防止抖动。当我们在频繁地触发一个事件时，会引起不必要的性能损失，那么我们需要做的是让事件在停止触发后再触发，以此减少性能损失。

防抖就是要延迟执行，我们一直操作触发事件并且不执行，只有当停止操作后等才会执行。

**防抖函数的作用**是控制函数在一定时间内的执行次数。简单点说就是通过防抖函数让某个触发事件在 ->n<- 秒内只会被执行一次。

#### 应用场景

防抖适合多次事件一次响应的情况。

+ 搜索事件，用户在不断输入值时，用防抖来节约请求资源，在最后一次输入才会返回结果。
+ 按钮点击事件，为了防止用户多次重复提交也会使用防抖函数。
+ 输入验证，要等停止输入后才会进行一次验证。

#### 手写代码

```js
function debounce(fn, delay) {
    let timer;
    
    return function(){
     // 如果之前就存在定时器，就要把之前那个定时器删除
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
        
    }
}
```

#### 利用ES6优化代码

实现函数剩余参数传参以及优化代码

```js
function debounce(fn,delay = 1000,...args1) {
    let timer;
    return (...args2) =>{
        // 如果之前就存在定时器，就要把之前那个定时器删除
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn(...args1,...args2)
        }, delay)
        
    }
}

let newFn = debounce(
    function(a,b,c,d){
        console.log(a,b,c,d)
    },
    2000,
    1,
    2,
)

newFn(3,4)
newFn(5,6)
newFn(7,8)
// 测试，会在两秒后输出 1,2,7,8
```

### 节流

节流是指绑定事件后，通过动作触发事件，在这段时间内，如果动作又发生，忽略该动作，一直到事件执行完后才能重新触发。通俗的说就是控制高频执行的次数。

**节流函数的作用**是在一个单位时间内最多只能触发一次函数执行，如果这个单位时间内多次触发函数，只能有一次生效。

#### 应用场景

节流适合大量事件按时间做平均分配触发。

+ 监听滚动，是否滑到底部自动加载更多。
+ 监听resize，调整窗口大小。

#### 手写代码

```js
function throttle(fn,delay){
  let t1=0 //初始时间
  return function(){
    let t2=new Date() //当前时间
    if(t2-t1>delay){
      fn.apply(this,arguments)
      t1=t2
    }
  }
}
```

#### 利用ES6优化代码

```js
function throttle(fn, delay = 1000, ...args1) {
    let timeStart = 0 //初始时间
    return (...args2) => {
        let timeNext = new Date() //当前时间
        if (timeNext - timeStart > delay) {
            fn(...args1, ...args2)
            timeStart = timeNext
        }
    }
}

let newFn = throttle(
    function (a, b, c, d) {
        console.log(a, b, c, d)
    },
    2000,
    1,
    2,
)

newFn(3, 4)
newFn(5, 6)
newFn(7, 8)
// 只会输出 1,2,3,4
```
