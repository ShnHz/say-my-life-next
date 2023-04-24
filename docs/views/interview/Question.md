---
title: 练习题
config: { 
  dir: true
}
---

###### 常规题目

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```

::: details 答案
```js
data[0](); //3
data[1](); //3
data[2](); //3
```
[解析](https://www.sanghangning.cn/views/blog/js/Closure.html#for循环和闭包)
:::

----------------------------------------------------

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

::: details 答案
```js
var e = fn(6);
e(7); //14
console.log(x); //5
```
[解析](https://www.sanghangning.cn/views/blog/js/Closure.html#闭包题2)
:::

----------------------------------------------------

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
var d = fun(0);
d.fun(1)
d.fun(2)
d.fun(3)
```

::: details 答案
```js
var d = fun(0); //0 undefined
d.fun(1) //1 1
d.fun(2) //2 2
d.fun(3) //3 3
```
[解析](https://www.sanghangning.cn/views/blog/js/Closure.html#闭包题3)
:::

----------------------------------------------------

```js
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
})();
```

::: details 答案
```js
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1;
    console.log(count); //1
  }
  console.log(count); //0
})();
```
[解析](https://www.sanghangning.cn/views/blog/js/Closure.html#闭包题5)
:::

----------------------------------------------------

```js
"use strict";
var a = 10;
function foo () {
  console.log('this1', this)
  console.log(window.a)
  console.log(this.a)
}
console.log(window.foo)
console.log('this2', this)
foo();
```

::: details 答案
```js
"use strict";
var a = 10;
function foo () {
  console.log('this1', this) //严格模式下,函数内的this指向undefined
  console.log(window.a) //10
  console.log(this.a) //报错,因为找不到this
}
console.log(window.foo) //fn
console.log('this2', this) //window
foo();
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)
:::

----------------------------------------------------

```js
let a = 10
const b = 20

function foo () {
  console.log(this.a)
  console.log(this.b)
}
foo();
console.log(window.a)
```

::: details 答案
```js
let a = 10
const b = 20

function foo () {
  console.log(this.a) //undefined
  console.log(this.b) // undefined
}
foo();
console.log(window.a) //undefined
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#let-const)
:::

----------------------------------------------------

```js
var a = 1
function foo () {
  var a = 2
  console.log(this)
  console.log(this.a)
}

foo()
```

::: details 答案
```js
var a = 1
function foo () {
  var a = 2
  console.log(this) //window
  console.log(this.a) //1
}

foo()
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#this题3)
:::

----------------------------------------------------

```js
function foo () {
  console.log(this.a)
};
var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;

obj.foo();
foo2();
```

::: details 答案
```js
function foo () {
  console.log(this.a)
};
var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;

obj.foo(); //1
foo2(); //2
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#隐式绑定的隐式丢失问题)
:::

----------------------------------------------------

```js
function foo () {
  console.log(this.a)
}
function doFoo (fn) {
  console.log(this)
  fn()
}
var obj = { a: 1, foo }
var a = 2
var obj2 = { a: 3, doFoo }

obj2.doFoo(obj.foo)
```

::: details 答案
```js
function foo () {
  console.log(this.a) //2
}
function doFoo (fn) {
  console.log(this) //obj2
  fn()
}
var obj = { a: 1, foo }
var a = 2
var obj2 = { a: 3, doFoo }

obj2.doFoo(obj.foo)
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#隐式绑定的隐式丢失问题2)
:::

----------------------------------------------------

```js
var obj2 = {
  a: 2,
  foo1: function () {
    setTimeout(function () {
      console.log(this)
      console.log(this.a)
    }, 0)
  }
}
var a = 3

obj2.foo1()
```

::: details 答案
```js
var obj2 = {
  a: 2,
  foo1: function () {
    setTimeout(function () {
      console.log(this) //window
      console.log(this.a) //3
    }, 0)
  }
}
var a = 3

obj2.foo1()
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#隐式绑定的隐式丢失问题3)
:::

----------------------------------------------------

```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() 
foo.call(obj) 
foo.apply(obj)
foo.bind(obj) 
```

::: details 答案
```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() //2
foo.call(obj) //1 
foo.apply(obj) //1
foo.bind(obj)  //没用输出,因为bind不会立即执行
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#显式绑定题1)
:::

----------------------------------------------------

```js
function foo () {
  console.log(this.a)
}
var a = 2
foo.call() 
foo.call(null) 
foo.call(undefined)
```

::: details 答案
```js
function foo () {
  console.log(this.a)
}
var a = 2
foo.call() //2
foo.call(null) //2 
foo.call(undefined) //2
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#显式绑定空值)
:::

----------------------------------------------------

```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo()
foo.call(obj)
foo().call(obj)
```

::: details 答案
```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() //2
foo.call(obj) //1
foo().call(obj) //2 报错
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#显式绑定题3)
:::

----------------------------------------------------

```js
function foo () {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo.call(obj)()
```

::: details 答案
```js
function foo () {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo.call(obj)() //1 2
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#显式绑定题4)
:::

----------------------------------------------------

```js
var obj = {
  a: 'obj',
  foo: function () {
    console.log('foo:', this.a)
    return function () {
      console.log('inner:', this.a)
    }
  }
}
var a = 'window'
var obj2 = { a: 'obj2' }

obj.foo()()
obj.foo.call(obj2)() 
obj.foo().call(obj2)
```

::: details 答案
```js
var obj = {
  a: 'obj',
  foo: function () {
    console.log('foo:', this.a)
    return function () {
      console.log('inner:', this.a)
    }
  }
}
var a = 'window'
var obj2 = { a: 'obj2' }

obj.foo()() //foo:obj inner:window 
obj.foo.call(obj2)() //foo:obj2 inner:window
obj.foo().call(obj2) //foo:obj inner:obj2
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#显式绑定题5)
:::

----------------------------------------------------

```js
var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a
    return function (c) {
      console.log(this.a + b + c)
    }
  }
}
var a = 2
var obj2 = { a: 3 }

obj.foo(a).call(obj2, 1)
obj.foo.call(obj2)(1)
```

::: details 答案
```js
var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a
    return function (c) {
      console.log(this.a + b + c)
    }
  }
}
var a = 2
var obj2 = { a: 3 }

obj.foo(a).call(obj2, 1) //3 + 2 + 1
obj.foo.call(obj2)(1) //2 + 3 + 1
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#显式绑定综合题)
:::

----------------------------------------------------

```js
function Person (name) {
  this.name = name
}
var name = 'window'
var person1 = new Person('LinDaiDai')
console.log(person1.name)
```

::: details 答案
```js
function Person (name) {
  this.name = name
}
var name = 'window'
var person1 = new Person('LinDaiDai')
console.log(person1.name) //LinDaiDai
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#new绑定题1)
:::

----------------------------------------------------

```js
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = function () {
    return function () {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
person1.foo1()
person1.foo2()()
```

::: details 答案
```js
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = function () {
    return function () {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
person1.foo1() //person1
person1.foo2()() //window.name
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#new绑定题2)
:::

----------------------------------------------------

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo = function () {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo.call(person2)() 
person1.foo().call(person2) 
```

::: details 答案
```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo = function () {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo.call(person2)() //person2 window.name
person1.foo().call(person2) //person1 person2
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#new绑定题3)
:::

----------------------------------------------------

```js
var obj = {
  name: 'obj',
  foo1: () => {
    console.log(this.name)
  },
  foo2: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
var name = 'window'
obj.foo1()
obj.foo2()()
```

::: details 答案
```js
var obj = {
  name: 'obj',
  foo1: () => {
    console.log(this.name)
  },
  foo2: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
var name = 'window'
obj.foo1() //window
obj.foo2()() //obj obj
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#箭头函数题1)
:::

----------------------------------------------------

```js
var name = 'window'
var obj1 = {
    name: 'obj1',
    foo: function () {
        console.log(this.name)
        return function () {
            console.log(this.name)
        }
    }
}
var obj2 = {
    name: 'obj2',
    foo: function () {
        console.log(this.name)
        return () => {
            console.log(this.name)
        }
    }
}
var obj3 = {
    name: 'obj3',
    foo: () => {
        console.log(this.name)
        return function () {
            console.log(this.name)
        }
    }
}
var obj4 = {
    name: 'obj4',
    foo: () => {
        console.log(this.name)
        return () => {
            console.log(this.name)
        }
    }
}

obj1.foo()()
obj2.foo()() 
obj3.foo()()
obj4.foo()() 
```

::: details 答案
```js
obj1.foo()() //obj1 window
obj2.foo()() //obj2 obj2
obj3.foo()() //window window
obj4.foo()() //window window
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#箭头函数题2)
:::

----------------------------------------------------

```js
var name = 'window'

function Person(name) {
    this.name = name
    this.foo1 = function () {
        console.log(this.name)
    }
    this.foo2 = () => {
        console.log(this.name)
    }
}
var person2 = {
    name: 'person2',
    foo2: () => {
        console.log(this.name)
    }
}
var person1 = new Person('person1')
person1.foo1()
person1.foo2()
person2.foo2()
```

::: details 答案
```js
person1.foo1() //person1
person1.foo2() //person1
person2.foo2() //window
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#箭头函数题3)
:::

----------------------------------------------------

```js
var name = 'window'
var obj1 = {
  name: 'obj1',
  foo1: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  },
  foo2: () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var obj2 = {
  name: 'obj2'
}
obj1.foo1.call(obj2)()
obj1.foo1().call(obj2)
obj1.foo2.call(obj2)() 
obj1.foo2().call(obj2) 
```

::: details 答案
```js
obj1.foo1.call(obj2)() //obj2 obj2
obj1.foo1().call(obj2) //obj1 obj1
obj1.foo2.call(obj2)() //window window
obj1.foo2().call(obj2) //window obj2
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#箭头函数题4)
:::

----------------------------------------------------

```js
var name = 'window'
var person1 = {
    name: 'person1',
    foo1: function () {
        console.log(this.name)
    },
    foo2: () => console.log(this.name),
    foo3: function () {
        return function () {
            console.log(this.name)
        }
    },
    foo4: function () {
        return () => {
            console.log(this.name)
        }
    }
}
var person2 = {
    name: 'person2'
}

person1.foo1()
person1.foo1.call(person2)

person1.foo2()
person1.foo2.call(person2)

person1.foo3()()
person1.foo3.call(person2)()
person1.foo3().call(person2) 

person1.foo4()()
person1.foo4.call(person2)()
person1.foo4().call(person2)
```

::: details 答案
```js
person1.foo1() //person1
person1.foo1.call(person2) //person2

person1.foo2() //window
person1.foo2.call(person2) //window

person1.foo3()() //window
person1.foo3.call(person2)() //window
person1.foo3().call(person2)  //person2

person1.foo4()() //person1
person1.foo4.call(person2)() //person2
person1.foo4().call(person2) //person1
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#综合题1)
:::

----------------------------------------------------

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => console.log(this.name)
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1()
person1.foo1.call(person2)

person1.foo2()
person1.foo2.call(person2)

person1.foo3()()
person1.foo3.call(person2)()
person1.foo3().call(person2)

person1.foo4()()
person1.foo4.call(person2)()
person1.foo4().call(person2)
```

::: details 答案
```js
person1.foo1() //person1
person1.foo1.call(person2) //person2

person1.foo2() //person1
person1.foo2.call(person2) //person1

person1.foo3()() //window
person1.foo3.call(person2)() //window
person1.foo3().call(person2) //person2

person1.foo4()() //person1
person1.foo4.call(person2)() //person2
person1.foo4().call(person2) //person1
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#综合题2)
:::

----------------------------------------------------

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()
person1.obj.foo1.call(person2)()
person1.obj.foo1().call(person2)

person1.obj.foo2()()
person1.obj.foo2.call(person2)()
person1.obj.foo2().call(person2)
```

::: details 答案
```js
person1.obj.foo1()() //window
person1.obj.foo1.call(person2)() //window
person1.obj.foo1().call(person2) //person2

person1.obj.foo2()() //obj
person1.obj.foo2.call(person2)() //person2
person1.obj.foo2().call(person2) //obj
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#综合题3)
:::

----------------------------------------------------

```js
function foo() {
    console.log(this.a);
}
var a = 2;
(function () {
    "use strict";
    foo();
})();
```

::: details 答案
```js
function foo() {
    console.log(this.a);
}
var a = 2;
(function () {
    "use strict";
    foo(); //2
})();
```
[解析](https://www.sanghangning.cn/views/blog/js/This.html#综合题4)
:::

----------------------------------------------------

```js
var F = function() {};

Object.prototype.a = function() {
  console.log('a');
};

Function.prototype.b = function() {
  console.log('b');
}

var f = new F();

f.a();
f.b();

F.a();
F.b();
```

::: details 答案
```js
f.a(); //a
f.b(); //f.b is not a function

F.a(); //a
F.b(); //b
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第一题)
:::

----------------------------------------------------

```js
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

console.log(b.n);
console.log(b.m);

console.log(c.n);
console.log(c.m);
```

::: details 答案
```js
console.log(b.n); //1
console.log(b.m); //undefined

console.log(c.n); //2
console.log(c.m); //3
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第二题)
:::

----------------------------------------------------

```js
var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);
console.log(foo.b);

console.log(F.a);
console.log(F.b);
```

::: details 答案
```js
console.log(foo.a); //value a
console.log(foo.b); //undefined 

console.log(F.a); //value a
console.log(F.b); //value b
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第三题)
:::

----------------------------------------------------

```js
function A() {}
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A().a); 
console.log(new B().a);
console.log(new C(2).a);
```

::: details 答案
```js
console.log(new A().a); //1
console.log(new B().a); //undefined
console.log(new C(2).a); //2
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第四题)
:::

----------------------------------------------------

```js
console.log(123['toString'].length + 123)
```

::: details 答案
```js
console.log(123['toString'].length + 123) //124
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第五题)
:::

----------------------------------------------------

```js
function C1(name) {
        if (name) {
            this.name = name;
        }
    }

function C2(name) {
        this.name = name;
    }

function C3(name) {
        this.name = name || 'join';
    }
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';

console.log(new C1().name) 
console.log(new C2().name)
console.log(new C3().name)
```

::: details 答案
```js
console.log(new C1().name) //Tom
console.log(new C2().name) //undefined
console.log(new C3().name) //join
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第六题)
:::

----------------------------------------------------

```js
function Fn(num) {
    this.x = this.y = num;
}
Fn.prototype = {
    x: 20,
    sum: function () {
        console.log(this.x + this.y);
    }
};
let f = new Fn(10);

console.log(f.sum === Fn.prototype.sum);
f.sum();
Fn.prototype.sum();
console.log(f.constructor);
```

::: details 答案
```js
console.log(f.sum === Fn.prototype.sum); //true
f.sum(); //20
Fn.prototype.sum(); //NaN
console.log(f.constructor); //fn
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第七题)
:::

----------------------------------------------------

```js
function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype = {
    y: 400,
    getX: function () {
        console.log(this.x);
    },
    getY: function () {
        console.log(this.y);
    },
    sum: function () {
        console.log(this.x + this.y);
    }
};
var f1 = new Fn;
var f2 = new Fn;

console.log(f1.getX === f2.getX); //false
console.log(f1.getY === f2.getY); //true
console.log(f1.__proto__.getY === Fn.prototype.getY); //true
console.log(f1.__proto__.getX === f2.getX); //false
console.log(f1.getX === Fn.prototype.getX); //false
console.log(Fn.prototype.__proto__.constructor); //ƒ Object() { [native code] }
```

::: details 答案
```js
console.log(f1.getX === f2.getX);
console.log(f1.getY === f2.getY);
console.log(f1.__proto__.getY === Fn.prototype.getY);
console.log(f1.__proto__.getX === f2.getX);
console.log(f1.getX === Fn.prototype.getX); 
console.log(Fn.prototype.__proto__.constructor);
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第八题)
:::

----------------------------------------------------

```js
var print = function () {
    alert(1);
}

function Fn() {
    print = function () {
        alert(2);
    }
    return this;
}

function print() {
    alert(3);
}
Fn.prototype.print = function () {
    alert(4);
}
Fn.print = function () {
    alert(5);
}

print();
Fn.print();
Fn().print();
new Fn.print();
new Fn().print();
```

::: details 答案
```js
print(); //1
Fn.print(); //5
Fn().print(); //2
new Fn.print(); //5
new Fn().print(); //4
```

[解析](https://www.sanghangning.cn/views/blog/js/Prototype.html#第九题)
:::

----------------------------------------------------

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

::: details 答案
```js
0 == '' //true
0 == '0' //ture
2 == true //false
2 == false //false
false == 'false' //false
false == '0' //true
false == undefined //false
false == null //false
null == undefined //true
' \t\r\n ' == 0 //true

null + '1' == null + 1 //false
null + 1 == 1 //true
null == 0 //false
null + 1 == undefined + 1 //false
null + null == undefined + undefined //false

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

console.log(obj1 + !!obj2) //3 + true = 3 + 1 = 4 
```

[解析](https://www.sanghangning.cn/views/blog/js/JSLeiXingShiRuHeXiangHuZhuanHuanDe.html)
:::

----------------------------------------------------

```js
var a = ?

console.log(a==1 && a== 2 && a==3) //true
```

::: details 答案
```js
var a = {
  n:0,
  valueOf:function(){
    return ++this.n
  }
}

console.log(a==1 && a== 2 && a==3) //true
```
:::

----------------------------------------------------

```js
console.log(([][[]] + [])[+!![]] + ([] + {})[+!![] + +!![]])
```

::: details 答案
```js
console.log(([][[]] + [])[+!![]] + ([] + {})[+!![] + +!![]]) //nb

// 解析
([][[]] + [])[+!![]] + ([] + {})[+!![] + +!![]]
([][[]] + [])[+!![]] => ([][''] + [])[+!![]] => (undefined + '')[+!![]] => ('undefined')[+!![]] => ('undefined')[+true] => ('undefined')[1] => 'n'
([] + {})[+!![] + +!![]] => ('' + '[object Object]')[1 + 1] => ('[object Object]')[2] => 'b'
'n' + 'b' = 'nb'
```
:::

----------------------------------------------------

```js
console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
console.log('script end')
```

::: details 答案
```js
console.log('script start')          //1
async function async1() {
    await async2()
    console.log('async1 end')        //5
}
async function async2() {
    console.log('async2 end')        //2
}
async1()

setTimeout(function() {
    console.log('setTimeout')        //8
}, 0)

new Promise(resolve => {
    console.log('Promise')           //3
    resolve()
})
.then(function() {
    console.log('promise1')          //6
})
.then(function() {
    console.log('promise2')          //7
})
console.log('script end')            //4
```

老规矩，全局代码自上而下执行，先打印出->script start<-，然后执行async1(),里面先遇到await async2(),执行async2,打印出->async2 end<-，然后await后面的代码放入微任务队列，接着往下执行new Promise，打印出->Promise<-,遇见了resolve，将第一个then方法放入微任务队列，接着往下执行打印出->script end<-，全局代码执行完了，然后从微任务队列中取出第一个微任务执行，打印出->async1 end<-,再取出第二个微任务执行，打印出->promise1<-,然后这个then方法执行完了，当前Promise的状态为fulfilled,它也可以出发then的回调，所以第二个then这时候又被加进了微任务队列，然后再出微任务队列中取出这个微任务执行，打印出->promise2<-,此时微任务队列为空，接着执行宏任务队列，打印出->setTimeout<-。
:::

----------------------------------------------------

###### 请手写节流防抖函数

::: details 答案
[解析](https://www.sanghangning.cn/views/blog/js/QingSongShouXieFangDouHeJieLiu.html)
:::

----------------------------------------------------

###### 请手写Promise

::: details 答案
```js
class myPromise {
    constructor(excutor) {
        let _this = this
        this.status = 'pending'

        // 成功的值
        this.value = null
        // 失败的值
        this.reason = null

        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        // 成功的回调
        this.resolve = ((value) => {
            if (this.status == 'pending') {
                this.value = value
                this.status = 'fulfilled'
                this.onFulfilledCallbacks.forEach(item => item(value))
            }
        })

        // 失败的回调
        this.reject = ((reason) => {
            if (this.status == 'pending') {
                this.reason = reason
                this.status = 'rejected'
                this.onRejectedCallbacks.forEach(item => item(reason))
            }
        })

        try {
            excutor(this.resolve, this.reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => this.resolve(value)
        onRejected = typeof onRejected == 'function' ? onRejected : (reason) => {
            throw reason
        }

        if (this.status == 'fulfilled') {
            onFulfilled(this.value)
        } else if (this.status == 'rejected') {
            onRejected(this.reason)
        } else {
            this.onFulfilledCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        }
    }
}
// 三种状态 
// pending resolev reject
let fn = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 1000)
})

fn.then((res) => {
    console.log(res)
})
```
:::

----------------------------------------------------

###### 请手写bind、call、apply

::: details 答案
[解析](https://www.sanghangning.cn/views/blog/js/BindCallApply.html)
:::

----------------------------------------------------

###### 请手写new

::: details 答案
[解析](https://www.sanghangning.cn/views/blog/js/New.html)
:::

###### 请手写函数重载

::: details 答案

重载函数

```js
function addMethod(object,name,fn){
  const old = object[name]
  object[name] = function(...args){
    if(args.length === fn.length){
      return fn.apply(this,args)
    }else if(typeof old === 'function'){
      return old.apply(this,args)
    }
  }
}
```

调用方法

```js
let searcher = {}

addMethod(searcher,'find',()=>{
  console.log('查询0参数')
})

addMethod(searcher,'find',(name)=>{
  console.log('查询1参数')
})

addMethod(searcher,'find',(name1,name2)=>{
  console.log('查询2参数')
})
```
:::

###### 大整数求和

```js
console.log(sum('156000000000000000000','549498489498498'))
```

::: details 答案

```js
function sum(a,b){
  // 利用类型BigInt
  return BigInt(a) + BigInt(b)
}

function sum2(a,b){
  // 字符串相加
  let res = ''
  let maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen, '0')
  b = b.padStart(maxLen, '0')

  let carry = 0
  for (let i = maxLen - 1; i >= 0; i--) {
      let sum = Number(a[i]) + Number(b[i]) + carry
      carry = Math.floor(sum / 10)
      res = (sum % 10) + res
  }

  if (carry) {
      res = '1' + res
  }
  return res
}

console.log(sum('156000000000000000000','549498489498498'))
```
:::

###### 实现深拷贝

::: details 答案
简单版本，有缺陷

+ 无法拷贝对象中存在的->Function<-
+ 无法拷贝循环引用的对象
  
```js
JSON.parse(JSON.stringify(obj))
```

普通手写版本
```js
function deepClone(obj) {
    const objMap = new Map()
    const _deepClone = (value) => {
        const type = typeof value
        if (type !== 'object' || type === null) {
            return value
        }

        if (objMap.has(value)) {
            return objMap.get(value)
        }

        const res = Array.isArray(value) ? [] : {}
        objMap.set(value, res)

        for (let key in value) {
            res[key] = _deepClone(value[key])
        }

        return res
    }

    return _deepClone(obj)
}

console.log(deepClone(obj))
```

奇淫技巧

->MessageChanner<-是如何实现深拷贝的？因为->MessageChanner<-是解决线程通信问题的，所以消息的载体是会被进程重新分配到公共内存，内存块都不是一个了。

但是还是有缺陷的，依旧没有办法拷贝对象中存在->Function<-的情况
```js
function deepClone(obj) {
    return new Promise((resolve, reject) => {
        let {
            port1,
            port2
        } = new MessageChannel()

        port1.postMessage(obj)
        port2.onmessage = (mes) => {
            resolve(mes.data)
        }
    })
}

deepClone(obj).then(res =>{
  console.log(res)
})
```
:::

###### 解析URL提取params参数

::: details 答案
```js
let httpUrlStr = 'https://www.whatever.com?name=zhangsan&age=18';

function urlToObj(url) {
    let regx = /([^&?=]+)=([^&?=]+)/g;
    let obj = {};

    url.replace(regx, (...args) => {
        if (args[1] && args[2]) {
            obj[args[1]] = args[2];
        }
    });

    return obj
}

console.log(urlToObj(httpUrlStr))
// {name: 'zhangsan', age: '18'}
```
:::

###### 数组去重

::: details 答案
```js
// ES6 Set去重解构
function uniqueArray(arr){
    return [...new Set(arr)]
}

// 双重循环，判断新数组是否已存在元素
function uniqueArray(arr) {
    let _arr = []

    for(let i=0;i<arr.length;i++){
        if(!_arr.includes(arr[i])){
            _arr.push(arr[i])
        }
    }

    return _arr
}

// 先排序，比较新数组最后一项与旧数组当前项是否相同
function uniqueArray(arr) {
    let _arr = []
    arr.sort()

    for(let i=0;i<arr.length;i++){
        if(_arr[_arr.length - 1] !== arr[i]){
            _arr.push(arr[i])
        }
    }

    return _arr
}
```
:::