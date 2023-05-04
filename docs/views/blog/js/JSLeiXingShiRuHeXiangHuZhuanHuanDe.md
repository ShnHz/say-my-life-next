---
title: JS类型是如何相互转换的
date: 2022/12/07 19:44:45
summary: 
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

类型转换的过程分别有三步

+ 1.类型转换规则
+ 2.运算规则
+ 3.表达式

### 类型转换规则

#### 原始->数字

->true => 1<-

->false => 0<-

->null => 0<-

->undefined => NaN<-

->string:空字符串(空白字符) => 0<-

->string:包含非空白字符 => 去掉引号，不是数字就是NaN => 0<-

```js
Number('123') //123
Number('  123 ') //123
Number('123a') //NaN
Number('12 3') //NaN
```

#### 所有->布尔

->null => false<-

->undefined => false<-

->number:0 => false<-

->number:NaN => false<-

->number:其他 => true<-

->string:空字符串 => false<-

->string:其他 => true<-

->对象 => true<-

#### 原始->字符串

->null => "null"<-

->undefined => "undefined"<-

->number => "数字"<-

->boolean => "true/false"<-

对象->字符串？先转为原始类型再转为字符串

#### 对象->原始

+ 1.调用->valueOf<-
+ 2.返回值如果是对象，重新调用->toString<-
+ 3.返回值如果依旧是对象，则报错

```js
let obj = {}

console.log(Number(obj)) //NaN
// 来看一下过程
console.log(obj.valueOf()) //fn()，依旧是对象，重新调用toString
console.log(obj.toString()) //[object Object]，为字符串，所以不会报错
console.log(Number('[object Object]')) //NaN
```

### 运算规则

#### 算数运算

:::tip 运算符号
\+ \- \* / % ++ --
:::

第一步：转换为原始类型

第二步：三种情况

+ 非特殊情况：转换为**数字**，然后运算
+ 特殊情况：如果两边变量有一个是字符串，则转换为**字符串**，然后拼接
+ 特殊情况：**NaN**和任何类型运算得到的还是->NaN<-

```js
console.log(null+undefined) //NaN
// null -> 数字 = 0
// undefined -> 数字 = NaN
// 0 + NaN

console.log([]+{}) //[object Object]
// [] -> 原始类型 -> ''
// {} -> 原始类型 -> //[object Object]
// '' + [object Object]
```

#### 比较运算

:::tip 运算符号
\> < >= <= == != === !==
:::

> \> < >= <= 

第一步：转换为原始类型

第二步：三种情况

+ 非特殊情况：转换为**数字**，然后运算
+ 特殊情况：两边全是**字符串**，比较字典顺序
+ 特殊情况：两边存在**NaN**，一定为->false<-

> ==

+ 两端类型相同，比较值
+ 两端都是**原始类型**，转换为**数字**比较
+ 一端为**原始类型**,一端是**对象类型**,把**对象**转换为**原始类型**后比较
+ 特殊情况：->undefined<-和->null<-只有与自身比较,或者相互比较时才会返回->true<-
+ 特殊情况：两边存在**NaN**，一定为->false<-

> === 

+ 类型和值必须相等
+ 特殊情况:两边存在**NaN**，一定为->false<-

> != !==

+ 对相等值取反

#### 逻辑运算

:::tip 运算符号
\> || && ?:
:::

x && y 

+ 1.x为fakse,返回x
+ 2.x为true,返回y

x || y 

+ 1.x为true,返回x
+ 2.x为false,返回y

### 表达式

运算符与数据的结合成为表达式,表达式会有返回值,表达运算结果

表达式可以出现在任何数据能够书写的地方


###  练习题

```js
0 == ''
0 == '0'
2 == true
2 == false
false == 'false'
false == '0'
false == undefined
false == null
null == undefined
' \t\r\n ' == 0

null + '1' == null + 1
null + 1 == 1
null == 0
null + 1 == undefined + 1
null + null == undefined + undefined

var obj1 = {
    a:1,
    b:2,
    valueOf:function(){
        return this.a + this.b
    },
    toString:function(){
        return 1
    }
}

var obj2 = {
    toString:function(){
        return 0
    }
}

console.log(obj1 + !!obj2)
```