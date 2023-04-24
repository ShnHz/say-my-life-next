---
date: 2022/11/14 13:14:30 
config: {
    top: false,
    dir: true,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/Inherit.html
}
title : JS中常用的继承方式
---
### 原型链继承

#### 原理

本质是<b>「重写原型对象」</b>，代之以一个新类型的实例。下面代码中，原来存在于<code class="default">SuperType</code>的实例对象的属性和方法，现在也存在于<code class="default">SubType.prototype</code>中了。

```js
function Super(){
    this.value = true;
}
Super.prototype.getValue = function(){
    return this.value
}
function Sub(){};
// Sub继承了Super
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

const ins = new Sub();
console.log(ins.getValue()); // true
```

<code class="default">Sub</code>继承了<code class="default">Super</code>,而继承是通过创建<code class="default">Super</code>实例，并将实例赋给<code class="default">Sub.prototype</code>实现的。原来存在于<code class="default">Super</code>的实例中的所有属性和方法，现在也存在与<code class="default">Sub.prototype</code>中。

#### 缺点

+ 多个实例对引用类型的操作会被篡改。

```js
function Super(){
    this.colors = ['red','green','blue'];
}
Super.prototype.getValue = function(){
    return this.colors
}
function Sub(){};
//Sub继承了Super
Sub.prototype = new Super();
const ins1 = new Super();
ins1.colors.push('black');
console.log(ins1.colors);//['red','green','blue','black'];
const ins2 = new Sub();
console.log(ins2.colors);//['red','green','blue','black'];
```

+ 父类过早地被创建，导致无法接受子类的动态参数

### 构造函数继承

#### 原理

使用父类的构造函数来增强子类<b>实例</b>，等同于复制父类的实例给子类（不使用原型）

```js
function  SuperType(){
    this.color=["red","green","blue"];
}
function  SubType(){
    //继承自SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push("black");
alert(instance1.color);//"red,green,blue,black"

var instance2 = new SubType();
alert(instance2.color);//"red,green,blue"
```

核心代码是<code class="default">SuperType.call(this)</code>，创建子类实例时调用<code class="default">SuperType</code>构造函数，于是<code class="default">SubType</code>的每个实例都会将<code class="default">SuperType</code>中的属性复制一份。

#### 缺点

+ 只能继承父类的<b>实例</b>属性和方法，不能继承原型属性/方法

```js
function SuperType() {
    this.color = ["red", "green", "blue"];
    SuperType.prototype._color = ["yellow"]
}

function SubType() {
    //继承自SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
console.log(instance1.color) //["red", "green", "blue"]
console.log(instance1._color) //undefined
```

+ 无法实现复用，每个子类都有父类实例函数的副本，影响性能

### 组合继承

组合上述两种方式就是组合继承，用原型链实现对<b>原型</b>属性和方法的继承，用借用构造函数技术来实现<b>实例</b>属性的继承。

```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType(); 
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

#### 缺点

第一次调用<code class="default">SuperType()</code>：给<code class="default">SubType.prototype</code>写入两个属性name，color。

第二次调用<code class="default">SuperType()</code>：给<code class="default">instance1</code>写入两个属性name，color。

+ 组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

### 寄生式继承

#### 原理

利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

```js
function createAnother(original){
  var clone = Object.create(original); // 通过调用 Object.create() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

#### 缺点

+ 多个实例对引用类型的操作会被篡改。

### 寄生组合式继承
Child
我们将组合继承和寄生式继承结合起来，就是寄生组合式继承，这也是所有继承方式里面相对最优的继承方式

```js
function Parent() {
   this.name = 'parent';
   this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
   return this.name;
}
function Child() {
   Parent.call(this);
   this.friends = 'child';
}
​
function clone (parent, child) {
   // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
   child.prototype = Object.create(parent.prototype);
   child.prototype.constructor = child;
}
​
clone(Parent, Child);
 Child.prototype.getFriends = function () {
   return this.friends;
}
​
let person = new Child();
console.log(person);
console.log(person.getName());
console.log(person.getFriends());
```

### ES6类继承extends

<code class="default">extends</code>关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。其中<code class="default">constructor</code>表示构造函数，一个类中只能有一个构造函数，有多个会报出<code class="default">SyntaxError</code>错误,如果没有显式指定构造方法，则会添加默认的 <code class="default">constructor</code>方法。

```js
class Parent {
    // constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Getter
    get info() {
        return this.getInfo()
    }

    // Method
    getInfo() {
        return {
            name: this.name,
            age: this.age
        };
    }
}

const parent = new Parent('父亲', 32);
console.log(parent.info); // {name: '父亲', age: 32}

// 继承
class Child extends Parent {

    constructor(name, age) {
        // 调用父类的构造函数
        super(name, age);
        // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
        this.type = 'Child';
    }
}

const child = new Child('孩子', 5);
console.log(child.info); // {name: '孩子', age: 5}
```

<code class="default">extends</code>继承的核心代码如下，其实现和上述的寄生组合式继承方式一样

```js
function _inherits(subType, superType) {
    // 创建对象，创建父类原型的一个副本
    // 增强对象，弥补因重写原型而失去的默认的constructor属性
    // 指定对象，将新创建的对象赋值给子类的原型
    subType.prototype = Object.create(superType && superType.prototype, {
        constructor: {
            value: subType,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    if (superType) {
        Object.setPrototypeOf 
            ? Object.setPrototypeOf(subType, superType) 
            : subType.__proto__ = superType;
    }
}
```

### 参考资料

###### [JavaScript常用八种继承方案](https://juejin.cn/post/6844903696111763470)
###### [Javascript 6大继承 最优是寄生组合继承](https://juejin.cn/post/7017335994961625102)
###### [JavaScript 类(class) super 关键字](https://www.runoob.com/js/jsref-class-super.html)


