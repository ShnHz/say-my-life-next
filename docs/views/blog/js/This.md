---
date: 2022/11/07 14:01:45 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/This.html
}
title : JS的this指向问题
---

函数在调用的时候会创建一个执行环境，<code class="default">this</code>对象基于这个执行环境绑定，所以<code class="default">this</code>的指向其实就是基于函数的执行环境决定的。

### this的绑定方式

+ 默认绑定（非严格模式下<code class="default">this</code>指向全局对象，严格模式<code class="default">this</code>会指向<code class="default">undefined</code>）
+ 隐式绑定（当函数引用有<b>上下文对象</b>时，如<code class="default">obj.method()</code>，<code class="default">method</code>内的<code class="default">this</code>指向<code class="default">obj</code>）
+ 显式绑定（通过<code class="default">call()</code>、<code class="default">apply()</code>或者<code class="default">bind()</code>方法直接指定<code class="default">this</code>的绑定对象），<code class="default">forEach</code>、<code class="default">map</code>、<code class="default">filter</code>的第二个参数也是可以绑定<code class="default">this</code>的。
+ new绑定
+ 箭头函数绑定（<code class="default">this</code>的指向由上层作用域决定）

### this常见面试题

#### 默认绑定

##### 严格模式

```js
"use strict";
var a = 10;
function foo () {
  console.log('this1', this) //3
  console.log(window.a) //4
  console.log(this.a) //5
}
console.log(window.foo) //1
console.log('this2', this) //2
foo();
```

首先会输出一个<code class="default">foo</code>函数，

然后输出<code class="default">window</code>对象（严格模式下不会改变全局中的<code class="default">this</code>指向），

接着执行函数，输出<code class="default">undefined</code>（严格模式下，函数内的<code class="default">this</code>指向为<code class="default">undefined</code>），

输出 <code class="default">10</code>（严格模式不会阻止<code class="default">a</code>被绑定到<code class="default">window</code>上），

最后是报错，因为找不到<code class="default">this</code>。

##### let/const
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

会输出3个<code class="default">undefined</code>，因为<code class="default">let</code>、<code class="default">const</code>声明的变量是不会绑定到<code class="default">window</code>上的。

##### this题3

```js
var a = 1
function foo () {
  var a = 2
  console.log(this)
  console.log(this.a)
}

foo()
```
第一个<code class="default">this</code>会输出<code class="default">windos</code>

那<code class="default">this.a</code>会输出<code class="default">1</code>，注意，是<code class="default">this.a</code>，不是<code class="default">a</code>，因此是<code class="default">window</code>下的变量<code class="default">a</code>。

#### 隐式绑定

##### 隐式绑定的隐式丢失问题

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

<code class="default">obj.foo()</code>肯定会输出<code class="default">1</code>，因为<code class="default">this</code>绑定在最后调用函数的对象，

那么<code class="default">foo2()</code>输出的是什么呢？

答案是<code class="default">2</code>，因为虽然foo2</code>指向的是<code class="default">obj.foo</code>函数，不过调用它的却是<code class="default">window</code>对象，所以它里面<code class="default">this</code>的指向是为<code class="default">window</code>。

##### 隐式绑定的隐式丢失问题2

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

<code class="default">doFoo</code>函数内输出的是<code class="default">obj2</code>,因为是<code class="default">obj2</code>调用的它，

但是<code class="default">obj.foo()</code>打印出来的是<code class="default">2</code>，<b>因为如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的this指向无关。在非严格模式下，会把该函数的this绑定到window上，严格模式下绑定到undefined。</b>

##### 隐式绑定的隐式丢失问题3

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

输出的是<code class="default">window</code>和<code class="default">3</code>，因为当我们将函数作为参数传递时会隐式丢失，所以此时非严格模式下的<code class="default">this</code>绑定的是<code class="default">window</code>

#### 显式绑定

##### 显式绑定题1

```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() // 2 ，默认绑定执行嘛，非严格模式this指向的是window
foo.call(obj) // 1 ，指向传入的obj
foo.apply(obj) // 1 ，指向传入的obj
foo.bind(obj) // 没有输出，因为bind是不会立即执行的，返回一个新的函数
```

##### 显式绑定空值

```js
function foo () {
  console.log(this.a)
}
var a = 2
foo.call() // 2
foo.call(null) //2 
foo.call(undefined) //2
```

如果<code class="default">call</code>、<code class="default">apply</code>、<code class="default">bind</code>接收到的第一个参数是<code class="default">空</code>或者<code class="default">null</code>、<code class="default">undefined</code>的话，则会忽略这个参数。

##### 显式绑定题3

```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() // 2
foo.call(obj) // 1
foo().call(obj) // 2 , 报错
```

前两个输出不用说了，最后一个输出为什么是<code class="default">2</code>然后报错呢？

因为先执行了<code class="default">foo()</code>，此时输出的是<code class="default">2</code>，然后针对该函数的返回值再去执行<code class="default">.call(obj)</code>，那么因为函数返回值是<code class="default">undefined</code>，所以会报错。

##### 显式绑定题4

```js
function foo () {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo.call(obj)() // 1 , 2
```
这道题，<code class="default">foo()</code>函数内的<code class="default">this</code>虽然指定了是为<code class="default">obj</code>，但是调用最后调用匿名函数的却是<code class="default">window</code>。所以最后输出<code class="default">1</code>、<code class="default">2</code>。

##### 显式绑定题5

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

obj.foo()() // foo:obj,inner:window
obj.foo.call(obj2)() //foo:obj2,inner:window
obj.foo().call(obj2) //foo:obj,inner:obj2
```

##### 显式绑定综合题

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

obj.foo(a).call(obj2, 1) // 3 + 2 + 1
obj.foo.call(obj2)(1) // 2 + 3 + 1
```

首先我们看第一个表达式，先执行<code class="default">obj.foo(a)</code>，此时<code class="default">a=2</code>被传入<code class="default">obj.foo</code>函数内，得到<code class="default">b=2</code>，再根据这个函数的执行结果返回值调用<code class="default">.call(obj2,1)</code>，此时匿名函数内的<code class="default">this.a</code>的<code class="default">this</code>指向是传入的<code class="default">obj2</code>，所以<code class="default">this.a=3</code>。<code class="default">b</code>由于闭包的关系所以得到了<code class="default">b=2</code>，<code class="default">c</code>为传入的值=<code class="default">1</code>，所以最终是<code class="default">3+2+1=6</code>。

再看第二个表达式，先执行<code class="default">obj.foo.call(obj2)</code>，得到<code class="default">b=3</code>，再根据这个函数的执行结果返回值调用<code class="default">(1)</code>，
此时匿名函数的调用者是<code class="default">window</code>，所以<code class="default">this.a=2</code>，<code class="default">b</code>由于闭包的关系所以得到了<code class="default">b=3</code>，<code class="default">c</code>为传入的值=<code class="default">1</code>，所以最终是<code class="default">2+3+1=6</code>。

#### new绑定

##### new绑定题1

使用<code class="default">new</code>来调用<code class="default">Person</code>，构造了一个新对象<code class="default">person1</code>并把它(<code class="default">person1</code>)绑定到<code class="default">Person</code>调用中的<code class="default">this</code>。

```js
function Person (name) {
  this.name = name
}
var name = 'window'
var person1 = new Person('LinDaiDai')
console.log(person1.name) //LinDaiDai
```

##### new绑定题2

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
person1.foo2()() //空
```

第一个输出肯定是毋庸置疑，那么第二个输出为什么是空呢？

因为第二个打印的其实是<code class="default">window</code>下的<code class="default">this.name</code>，但是这里<code class="default">window</code>对象的<code class="default">name</code>属性是空值，所以打印出的是空。

##### new绑定题3
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

person1.foo.call(person2)() //person2 空
person1.foo().call(person2) //person1 person2
```

这题结合显式绑定的例子即可得出答案，解起来其实也不难。


#### 箭头函数

##### 箭头函数题1

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
obj.foo2()() //obj,obj
```

这道题就非常有代表性，它明确了箭头函数内的<code class="default">this</code>是由外层作用域决定的。

+ 对于<code class="default">obj.foo1()</code>函数的调用，它的外层作用域是<code class="default">window</code>，对象<code class="default">obj</code>当然不属于作用域了(我们知道作用域只有全局作用域window和局部作用域函数)。所以会打印出<code class="default">window</code>。

+ <code class="default">obj.foo2()()</code>，首先会执行<code class="default">obj.foo2()</code>，这不是个箭头函数，所以它里面的<code class="default">this</code>是调用它的<code class="default">obj</code>对象，因此打印出<code class="default">obj</code>，而返回的匿名函数是一个箭头函数，它的<code class="default">this</code>由外层作用域决定，那也就是函数<code class="default">foo2</code>咯，那也就是它的<code class="default">this</code>会和<code class="default">foo2</code>函数里的<code class="default">this</code>一样，就也打印出了<code class="default">obj</code>。

##### 箭头函数题2
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

obj1.foo()() //obj1 window
obj2.foo()() //obj2 obj2
obj3.foo()() //window window
obj4.foo()() //window window
```
如果用普通函数和箭头函数来做一层嵌套关系的话，一共有四种情况，让我们把每种情况都考虑一遍：
+ <code class="default">obj1.foo()()</code>两层都是普通函数，分别打印出<code class="default">obj1</code>和<code class="default">window</code>。
+ <code class="default">obj2.foo()()</code>外层为普通函数，内层为箭头，都是打印出<code class="default">obj2</code>。
+ <code class="default">obj3.foo()()</code>外层为箭头函数，内层为普通函数，箭头函数的<code class="default">this</code>由外层作用域决定，因此为<code class="default">window</code>，内层普通函数由调用者决定，调用它的是<code class="default">window</code>，因此也为<code class="default">window</code>。
+ <code class="default">obj4.foo()()</code>两层都是箭头函数，第一个箭头函数的<code class="default">this</code>由外层作用域决定，因此为<code class="default">window</code>，第二个箭头函数的<code class="default">this</code>也由外层作用域决定，它的外层作用域是第一个箭头函数，而第一个箭头函数的<code class="default">this</code>是<code class="default">window</code>，因此内层的<code class="default">this</code>也是<code class="default">window</code>。

##### 箭头函数题3

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
person1.foo1() //person1
person1.foo2() //person1
person2.foo2() //window
```

第二个输出，因为箭头函数的<code class="default">this</code>是由上级作用域决定的，所以这个<code class="default">this</code>指向的就是<code>person1</code>。

第三个输出，<code class="default">this</code>指向为<code class="default">window</code>，因为对象没有作用域。

##### 箭头函数题4

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
obj1.foo1.call(obj2)() // 'obj2' 'obj2'
obj1.foo1().call(obj2) // 'obj1' 'obj1'
obj1.foo2.call(obj2)() // 'window' 'window'
obj1.foo2().call(obj2) // 'window' 'obj2'
```

<code class="default">call</code>、<code class="default">apply</code>、<code class="default">bind</code>不能改变箭头函数的指向，但是可以通过改变作用域中的<code class="default">this</code>指向来间接修改。

#### 综合题

##### 综合题1

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
<details>
    <summary>答案</summary>
    <pre>
        <code>
    person1.foo1() //person1
    person1.foo1.call(person2) //person2 <br>
    person1.foo2() //window
    person1.foo2.call(person2) //window<br>
    person1.foo3()() //window
    person1.foo3.call(person2)() //window
    person1.foo3().call(person2) //person2<br>
    person1.foo4()() //person1
    person1.foo4.call(person2)() //person2
    person1.foo4().call(person2) //person1
    </code>
    </pre>
</details>

##### 综合题2

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

<details>
    <summary>答案</summary>
    <pre>
        <code>
    person1.foo1() //person1
    person1.foo1.call(person2)  //person2<br>
    person1.foo2() //person1
    person1.foo2.call(person2)  //person1<br>
    person1.foo3()()  //window
    person1.foo3.call(person2)()  //window
    person1.foo3().call(person2)  //person2<br>
    person1.foo4()()  //person1
    person1.foo4.call(person2)()  //person2
    person1.foo4().call(person2) //person1
    </code>
    </pre>
</details>

##### 综合题3

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

<details>
    <summary>答案</summary>
    <pre>
        <code>
    person1.obj.foo1()() //window
    person1.obj.foo1.call(person2)() //window 
    person1.obj.foo1().call(person2) // person2 <br>
    person1.obj.foo2()() //obj
    person1.obj.foo2.call(person2)() //person2
    person1.obj.foo2().call(person2) //obj
    </code>
    </pre>
</details>

##### 综合题4

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

答案并不是<code class="default">undefined</code>，也不会报错，而是打印出了<code class="default">2</code>。

我们知道，使用了<code class="default">"use strict"</code>开启严格模式会使得<code class="default">"use strict"</code>以下代码的<code class="default">this</code>为<code class="default">undefined</code>，也就是这里的立即执行函数中的<code class="default">this</code>是<code class="default">undefined</code>。

但是调用<code class="default">foo()</code>函数的依然是<code class="default">window</code>，所以<code class="default">foo()</code>中的<code class="default">this</code>依旧是<code class="default">window</code>，所以会打印出2。

如果你是使用<code class="default">this.foo()</code>调用的话，就会报错了，因为现在立即执行函数中的<code class="default">this</code>是<code class="default">undefined</code>。

或者将<code class="default">"use strict"</code>放到<code class="default">foo()</code>函数里面，也会报错。

### 参考资料

###### [【建议👍】再来40道this面试题酸爽继续(1.2w字用手整理)](https://juejin.cn/post/6844904083707396109)


