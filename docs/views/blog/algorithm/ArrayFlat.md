---
date: 2022/11/01 13:56:31 
config: {
    top: false,
    dir: true,
    tag: ['js','algorithm'],
    valine: true,
    valineId: /blog/algorithm/ArrayFlat.html
}
title : 简单实现ES6的数组flat算法
---
### flat()
先用<code class="default">es6</code>的语法看看<code class="default">flat</code>函数的功能是什么

```js
let arr = [1,2,[3,4,[5,6],[7],[8,[9]]]].flat(5)
let arr2 = [1,2,[3,4,[5,6],[7],[8,[9]]]].flat()

console.log(arr) //[1,2,3,4,5,6,7,8,9]
console.log(arr2) //[1, 2, 3, 4, Array(2), Array(1), Array(2)]
```

所以很明显，<code class="default">flat</code>函数的功能就是降维（“拉平”数组维度），且默认值为1

```js
let arr3 = [1,2,[3,4, ,5,6,null,7,8,undefined,9]].flat()
console.log(arr3) //[1, 2, 3, 4, 5, 6, null, 7, 8, undefined, 9]
```

接下来看<code class="default">arr3</code>数组的值以及输出内容,可以看到4和5之间有一个空位，但是输出却没有这个空位。

所以<code class="default">flat</code>函数有一个特性是可以跳过空位，但是<code class="default">null</code>和<code class="default">undefined</code>还是会被保留。

当然如果不知道数组深度是多少，也可以传<code class="default">Infinity</code>值

```js
let arr = [1,2,[3,4,[5,6],[7],[8,[9]]]].flat(Infinity)
console.log(arr) //[1,2,3,4,5,6,7,8,9]
```

### 简单实现

```js
Array.prototype.myFlat = function (depth = 1) {
    // 用reduce方法获取结果，传入默认值空数组[]
    return this.reduce((result, item) => {
        if (depth > 0 && Object.prototype.tostring.call(item) == '[object Array]') {
            // 如果depth大于0（为有效值）且下个数组项为数组则进入递归
            result = [
                ...result,
                ...item.myFlat(depth - 1)
            ]
        } else {
            // 如果该数组项不为数组，则直接push
            result.push(item)
        }
        return result
    }, [])
}

// 测试一下
let arr = [1,2,[3,4,[5,6],[7],[8,[9]]]].flat(5)
let arr2 = [1,2,[3,4,[5,6],[7],[8,[9]]]].flat()

console.log(arr) //[1,2,3,4,5,6,7,8,9]
console.log(arr2) //[1, 2, 3, 4, Array(2), Array(1), Array(2)]

// 和原生的结果是一样的
```

### flatMap()

<code class="default">es6</code>还有一个<code class="default">flatMap()</code>方法，这边可以了解一下。

<code class="default">flatMap()</code>方法会对原数组的每个成员执行一个函数（相当于执行<code class="default">Array.prototype.map()</code>），然后对返回值组成的数组执行<code class="default">flat()</code>方法。该方法返回一个新数组，不改变原数组。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

<code class="default">flatMap()</code>只能展开一层数组。

```js
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
```

上面代码中，遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此<code class="default">flatMap()</code>返回的还是一个嵌套数组。

<code class="default">flatMap()</code>方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

```js
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```

<code class="default">flatMap()</code>方法还可以有第二个参数，用来绑定遍历函数里面的<code class="default">this</code>

```js
let obj = {
    a: 1
}


console.log([1, 2, 3, 4].flatMap(function (x, index) {
    return [index, x + this.a]
}, obj))
// [0, 2, 1, 3, 2, 4, 3, 5]
```

参考资料

###### [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
###### [阮一峰](https://es6.ruanyifeng.com/?search=flat&x=0&y=0#docs/array#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Aflat%EF%BC%8CflatMap)
###### 发布于[掘金](https://juejin.cn/post/7160945999018803237/)


