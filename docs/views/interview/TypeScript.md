---
title: TypeScript
config : {
    dir : true
}
password: true
---

### TypeScript

#### 1.TS的原理？为什么会有TS？

ts就是js的超集，ts在js的基础上对数据类型进行约束产生的一种新语言，使得代码更加规范，相比于js来说，ts在攥写代码/编译过程中就能够发现错误，而防止在产品上线后发生一些莫名其妙的问题。

#### 2.interface和type的区别是什么？

两者的作用都是一样的，都是定义一个类型别名（接口），但是扩展接口的方式有所不同，->interface<-可以用->extends<-，->type<-用->&<-，如果定义同名的接口，->interface<-会合并两者，->type<-不允许定义同名的类型别名

