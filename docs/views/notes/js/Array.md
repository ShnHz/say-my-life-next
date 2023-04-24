---
title: Array  数组
config: {
    dir: true
}
---

### 数组去重

#### reduce方法
``` js {10}
const distinct = arr => arr.sort().reduce( (init, current) => {
    
    if (init.length === 0 || init[init.length - 1] !== current) {
        init.push( current );
    }
    return init;
}, []);

let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
console.log(distinct(arr)); // 输出[1, 2, 3, 4, 5]
```
#### filter方法
``` js {6}
const distinct = arr => arr.filter( (element, index, self) => {
    return self.indexOf( element ) === index;
});

let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
console.log(distinct(arr)); // 输出[1, 2, 3, 4, 5]
```

#### filter方法，得到重复的元素
``` js {6}
const distinct = arr => arr.filter( (element, index, self) => {
    return self.indexOf( element ) !== index;
});

let arr = ['🐑', 1, 2, '🐑', '🐑', 3, '🐑', '🐑', 3]
console.log(distinct(arr)); // 输出["🐑", "🐑", "🐑", "🐑", 3]
```

#### 数组根据对象中的元素去重
``` js {6}
function arrayUniqueObject(arr,name){
    var hash = {};
        return arr.reduce(function (item, next) {
            hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
            return item;
    }, []);
}

let arr = [
    {id:1,name:'小明'},
    {id:1,name:'小红'},
    {id:2,name:'小智'}
]

console.log(arrayUniqueObject(arr,'id')) // 输出[{id:1,name:'小明'},{id:2,name:'小智'}]
```

### 多维数组降维

#### reduce方法
``` js {5}
const flattenDeep = arr => Array.isArray(arr)
  ? arr.reduce( (a, b) => [...a, ...flattenDeep(b)] , [])
  : [arr]

console.log(flattenDeep([1, [[2], [3, [4]], 5]])) // 输出[1, 2, 3, 4, 5]
```

#### flat方法

```js
console.log([1, [[2], [3, [4]], 5]].flat(3)) // 输出[1, 2, 3, 4, 5]
```