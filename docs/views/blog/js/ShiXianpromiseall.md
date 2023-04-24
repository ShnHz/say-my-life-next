---
title: 实现promise.all
date: 2022/12/21 13:30:18
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","algorithm","info"],
    valine: true,
    valineId: 
}
password: false
---

###### 原文 [掘金](https://juejin.cn/post/7069805387490263047)

### 何为Promise.all？

->Promise.all<- 是 es6 ->Promise<- 对象上的一个方法，它的功能就是将多个->Promise<-实例包装成一个->promise<-实例。以下是 MDN 对 ->Promise.all<- 的描述：

:::tip MDN
 Promise.all() 方法接收一个 promise 的 iterable 类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有 promise 的 resolve 回调的结果是一个数组。这个Promise的 resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了的时候。它的 reject 回调执行是，只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且reject的是第一个抛出的错误信息。
:::

我戴上我的300度近视眼镜，仔细地提取出这段描述中的**关键字**：

+ ->Promise.all<- 的返回值是一个新的 ->Promise<- 实例。
+ ->Promise.all<- 接受一个可遍历的数据容器，容器中每个元素都应是 ->Promise<- 实例。咱就是说，假设这个容器就是数组。
+ 数组中每个 ->Promise<- 实例都成功时（由->pendding<-状态转化为->fulfilled<-状态），->Promise.all<- 才成功。这些 ->Promise<- 实例所有的 ->resolve<- 结果会按照原来的顺序集合在一个数组中作为 ->Promise.all<- 的 ->resolve<- 的结果。
+ 数组中只要有一个 ->Promise<- 实例失败（由->pendding<-状态转化为->rejected<-状态），->Promise.all<- 就失败。->Promise.all<- 的 ->.catch()<- 会捕获到这个 ->reject<-。

#### 原生 Promise.all 测试

咱先看看原生的->Promise.all<-的是啥效果。

```js
const p1 = Promise.resolve('p1')

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 延时两秒')
  }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 rejected 延时1.5秒')
  }, 1500)
})

// 所有Promise实例都成功
Promise.all([p1, p2, p3])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // 2秒后打印 [ 'p1', 'p2 延时一秒', 'p3 延时两秒' ]
  
// 一个Promise实例失败
Promise.all([p1, p2, p4])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // p4 rejected
  
// 一个延时失败的Promise
 Promise.all([p1, p2, p5])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // 1.5秒后打印 p5 rejected
  
// 两个Promise实例失败
Promise.all([p1, p4, p5])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // p4 rejected
```

:::warning 注意
上面 p4 和 p5 在未传入 Promise.all 时需要注释掉，因为一个调用了 reject 的 Promise 实例如果没有使用 .catch() 方法去捕获错误会报错。但如果 Promise 实例定义了自己的 .catch，就不会触发 Promise.all 的 .catch() 方法。
:::

#### 手动实现Promise.all

->Promise.all<- 接受一个数组，返回值是一个新的 ->Promise<- 实例

```js
Promise.MyAll = function (promises) {
  return new Promise((resolve, reject) => {

  })
}
```

数组中所有 ->Promise<- 实例都成功，->Promise.all<- 才成功。不难想到，咱得需要一个数组来收集这些 ->Promise<- 实例的 ->resolve<- 结果。但有句俗话说得好：“不怕一万，就怕万一”，万一数组里面有元素不是 ->Promise<- 咋办 —— 那就得用 ->Promise.resolve()<- 把它办了。这里还有一个问题，->Promise<- 实例是不能直接调用 ->resolve<- 方法的，咱得在 ->.then()<- 中去收集结果。注意要保持结果的顺序。

```js
Promise.MyAll = function (promises) {
  let arr = []
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = res
      })
    }) 
  })
}
```

将收集到的结果（数组->arr<-）作为参数传给外层的 ->resolve<- 方法。这里咱们肯定是有一个判断条件的，如何判断所有 ->Promise<- 实例都成功了呢？新手容易写出这句代码（没错就是我本人了😭）

```js
if (arr.length === promises.length) resolve(arr)
```

咱仔细想想 ->Promise<- 使用来干嘛的 —— 处理异步任务。对呀，异步任务很多都需要花时间呀，如果这些 ->Promise<- 中最后一个先完成呢？那 ->arr<- 数组不就只有最后一项了，前面的所有项都是 ->empty<-。所以这里咱们应该创建一个计数器，每有一个 ->Promise<- 实例成功，计数器加一：

```js
Promise.MyAll = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = res
        count += 1
        if (count === promises.length) resolve(arr)
      })
    })
  })
}
```

最后就是处理失败的情况了，这里有两种写法，第一种是用 ->.catch()<- 方法捕获失败：

```js
Promise.MyAll = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = res
        count += 1
        if (count === promises.length) resolve(arr)
      }).catch(reject)
    })
  })
}
```

第二种写法就是给 ->.then()<- 方法传入第二个参数，这个函数是处理错误的回调函数：

```js
Promise.MyAll = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = res
        count += 1
        if (count === promises.length) resolve(arr)
      }, reject)
    })
  })
}
```

#### 并发限制

当然有时候面试官还会问，我不想同时请求那么多接口该怎么办呢？

这个时候我们就可以对->Promise.all<-做并发限制，保证同时只有n个请求在处理。

```js
Promise.myAll = function (promises, limit = 10) {
    let arr = new Array(promises.length)
    let count = 0
    let index = 0
    return new Promise((resolve, reject) => {
        function step(i) {
            if (count === promises.length) {
                resolve(arr)
            }
            if (promises[index]) {
                Promise.resolve(promises[index]).then(res => {
                    arr[i] = res
                    count++
                    step(index)
                }).catch(reject)
                index++
            }
        }
        for (let i = 0; i < limit; i++) {
            step(i)
        }
    })
}
```

我们也可以利用->Promise.race<-来实现并发限制

```js
function asyncPool(promises, limit = 10) {
    // 如果limit大于等于promises的长度，直接使用Promise.all即可
    if (limit >= promises.length) return Promise.all(promises)

    return new Promise(async (resolve, reject) => {
        const arr = []; // 存储所有的异步任务
        const pool = []; // 存储正在执行的异步任务
        const resArr = [];
        let count = 0

        for (const item of promises) {
            let p = Promise.resolve().then(() => item);
            arr.push(p)

            // 当poolLimit值小于或等于总任务个数时，进行并发控制
            if (limit <= promises.length) {
                // 当任务完成后，从正在执行的任务数组中移除已完成的任务
                const e = p.then((res) => {
                    pool.splice(pool.indexOf(e), 1)
                    count++
                    resArr.push(res)

                    if (count == promises.length) {
                        resolve(resArr)
                    }
                });
                pool.push(e); // 保存正在执行的异步任务
                if (pool.length >= limit) {
                    await Promise.race(pool).then().catch(reject); // 等待较快的任务执行完成
                }
            }
        }
    })
}
```

趁热打铁——正在火候上。我打开某个学习网站（MDN Web Docs (mozilla.org)），了解到 ->Promise<- 对象用于同时处理多个 ->Promise<- 的方法还有 ->Promise.race、Promise.any、Promise.allSettle<-。从小老师就教会了咱们举一反三，仔细看了这三个方法的描述之后，我还真给反出来了😄。

### Promise.race

->Promise.race<- 从字面意思理解就是赛跑，以状态变化最快的那个 ->Promise<- 实例为准，最快的 ->Promise<- 成功 ->Promise.race<- 就成功，最快的 ->Promise<- 失败 ->Promise.race<- 就失败。

```js
Promise.myRace = function (promises) {
    return new Promise((resole, reject) => {
        for (let i = 0, len = promises.length; i < len; i++) {
            Promise.resolve(promises[i]).then(resole,reject)
        }
    })
}
```

### Promise.any

->Promise.any<- 与 ->Promise.all<- 可以看做是相反的。->Promise.any<- 中只要有一个 ->Promise<- 实例成功就成功，只有当所有的 ->Promise<- 实例失败时 ->Promise.any<- 才失败，此时->Promise.any<- 会把所有的失败/错误集合在一起，返回一个失败的 ->promise<- 和->AggregateError<-类型的实例。

```js
Promise.MyAny = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(resolve, err => {
        arr[i] = { status: 'rejected', val: err }
        count += 1
        if (count === promises.length) reject(new Error('没有promise成功'))
      })
    })
  })
}
```

### Promise.allSettled

有时候，咱代码人总是会有点特殊的需求：如果咱希望一组 ->Promise<- 实例无论成功与否，都等它们异步操作结束了在继续执行下一步操作，这可如何是好？于是就出现了 ->Promise.allSettled<-。

```js
Promise.allSettled = function (promises) {
 let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    const processResult = (res, index, status) => {
      arr[index] = { status: status, val: res }
      count += 1
      if (count === promises.length) resolve(arr)
    }

    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        processResult(res, i, 'fulfilled')
      }, err => {
        processResult(err, i, 'rejected')
      })
    })
  })
}
```