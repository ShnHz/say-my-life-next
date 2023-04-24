---
title: Vue
config : {
    dir : true
}
password: true
---

### Vue2
#### 1.双向绑定的原理？

vue2是通过劫持数据和发布订阅者模式来实现响应式数据的，通过<code>Object.defineProperty</code>来监听数据的<code>getter</code>和<code>setter</code>，当数据改变后，会通知订阅者执行相应的操作。

但是这种方式也有一些缺陷：

通过下标修改数组数据或者给对象新增属性，这都不能被监听到，所以就无法触发组件的自动渲染。

+ 为什么监听不了对象？因为<code>vue</code>会在初始化的时候对<code>property</code>进行<code>getter</code>和<code>setter</code>的转换，所以在<code>data</code>对象内存在的属性<code>vue</code>才会转换为响应式数据，对于已经存在的实例，不会动态添加响应式<code>property</code>。

+ 为什么监听不了数组？可能是因为性能原因，如果数组特别长的话，监听数组消耗的性能太大，而且<code>vue</code>并不能确定你的数组最终的长度会是多少。

首先要对数据进行劫持监听，所以我们需要设置一个监听器->Observer<-，用来监听所有属性。如果属性发生变化了，就需要告诉订阅者->Watcher<-看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器->Dep<-来专门收集这些订阅者，然后在监听器->Observer<-和订阅者->Watcher<-之间进行统一管理。接着，我们还需要有一个指令解析器->Compile<-，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者->Watcher<-，并替换模板数据或者绑定相应的函数，此时当订阅者->Watcher<-接收到相应属性的变化，就会执行对应的更新函数，从而更新视图

observer：作用就是数据劫持，把data内的对象，传入并且利用<code>Object.defineProperty</code>来劫持数据get、set

dep：由于监听器和订阅者是一对多的关系,所以这里设计了一个管理中心,来管理某个监听器及其对应的订阅者的关系, 消息调度和依赖管理都靠它

watcher：当某个监听器监听到数据发生变化的时候，这个变化经过消息调度中心，最终会传递到所有该监听器对应的订阅者身上，然后这些订阅者分别执行自身的业务回调即可

compiler：编译模板，处理文本节点和元素节点

->v-model<-其实就是，->v-on<-和->v-bind<-的语法糖。

> 双向绑定的作用是：数据和视图相互驱动更新，是相互影响的关系

#### 2.vue2的生命周期是怎么样的？

beforeCreated => created => beforeMounted => mounted => beforeUpdated => updated => beforeDestroy => destroyed

如果该组件写了 keep-alive ，那么还会有 activated、deactivated生命周期

activated：在组件激活时调用，使用keep-alive进行缓存，又希望每次切换组件的时候更新数据，就可以使用这个生命周期
deactivated：keep-alive组件被停用时

#### 3.接口调用会放在哪个生命周期？为什么？

一般会放在<code>created</code>周期内，能更快的获取到数据渲染视图，
但是也可以放到<code>mounted</code>周期内，如果涉及到DOM操作，就需要放到<code>mounted</code>周期内，因为在<code>mounted</code>后，虚拟<code>DOM</code>才会被真实<code>DOM</code>替换，才能拿到真实的<code>DOM</code>树。

#### 4.v-model是怎么实现的

源码分为三步，首先将表达式指向的->value(例如data.a)<-绑定->Watcher<-，再获取这个表达式指向的值赋值给->DOM<-，然后绑定->input<-事件，当“输入框”值改变时改变表达式指向的->value(例如data.a)<-

#### 5.v-show和v-if的区别

作用其实是差不多的，展示效果是一样的，都是隐藏元素

->v-show<-是控制元素的->display:none<-，但是->dom<-元素依旧会渲染

->v-if<-是真正的会销毁元素，会完整的执行一个生命周期，在源码中其实就是给这个对象打上标记，生成->vnode<-时候会忽略此元素

#### 6.v-if和v-for为什么不能同时使用

因为v-for优先级比v-if高，这样就会判断很多次v-if造成性能浪费

#### 7.vue插槽有哪些类型

+ 默认插槽
+ 命名插槽
+ 作用域插槽，就是父组件可以使用插槽组件传过来的参数以及数据（el-table slot-scope）

#### 8.vue插槽的原理

vue组件实例化顺序为：父组件状态初始化(data、computed、watch...) --> 模板编译 --> 生成render方法 --> 实例化渲染watcher --> 调用render方法，生成VNode --> patch VNode，转换为真实DOM --> 实例化子组件 --> ......重复相同的流程 --> 子组件生成的真实DOM挂载到父组件生成的真实DOM上，挂载到页面中 --> 移除旧节点

因为vue的组件实例化的顺序是由父组件=>子组件，所以能够提前获得父组件的插槽内容，然后当实例化子组件时，就将这部分内容连接起来

#### 9.mixins遇到和组件内的函数相同名称会怎么样呢？

组件内的函数会覆盖mixins定义的函数

#### 10.如何优化项目？

（1）编码阶段

+ 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
+ v-if和v-for不能连用
+ 如果需要使用v-for给每项元素绑定事件时使用事件代理
+ SPA 页面采用keep-alive缓存组件
+ 在更多的情况下，使用v-if替代v-show
+ key保证唯一
+ 使用路由懒加载、异步组件
+ 防抖、节流
+ 第三方模块按需导入
+ 长列表滚动到可视区域动态加载
+ 图片懒加载

（2）SEO优化

+ 预渲染
+ 服务端渲染SSR

（3）打包优化

+ 压缩代码
+ Tree Shaking/Scope Hoisting
+ 使用cdn加载第三方模块
+ 多线程打包happypack
+ splitChunks抽离公共文件
+ sourceMap优化

（4）用户体验

+ 骨架屏
+ PWA
+ 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。
#### 11.说一说服务端渲染？

服务端渲染就是指再服务端完成dom结构与数据的拼接，发送给浏览器绑定事件和状态

#### 12.为什么data()是一个函数？

避免变量污染，防止多个组件实例对象之间共用一个data，那其实这个就是利用了闭包。

#### 13.scoped 原理？

scoped 会在 DOM 结构及 css 样式上加上唯一性的标记 ->data-v-xxx<- 属性，从而达到样式私有化，不污染全局的作用；

#### 14.大致讲一下vue的响应式思想？

就是利用track函数把被监听的对象以及对象改变后需要执行的操作函数，收集依赖到一个dep对象中，这个dep对象是个Set，因为可以自动去重，当监听的对象改变时，就执行trigger函数，通知所有依赖中的函数执行

存储的dep对象逻辑是这样的

<img src="https://cdn.chenyingshuang.cn/interview/vue/1.jpg" />

#### 15.vue mixin的原理？

原理就是根据不同策略来进行合并对象操作

### Vue3

#### 1.双向绑定的原理？

会采用->Proxy<-来实现数据劫持，->Proxy<-的监听是深层次的，监听整个对象，而不是某个属性。

优点是能规避Object.defineProperty的问题：

深度监听，性能更好，vue2是一次性递归遍历所有，vue3是在set属性时，才做递归处理
可监听对象 新增、删除 操作
可监听数组变化

#### 2.vue2与vue3的区别

+ 1.双向绑定原理变化
相比于vue2.x，使用proxy的优势如下

defineProperty只能监听某个属性，不能对全对象监听
可以省去for in、闭包等内容来提升效率（直接绑定整个对象即可）
可以监听数组，不用再去单独的对数组做特异性操作 vue3.x可以检测到数组内部数据的变化

+ 2.Composition API
+ 3.生命周期变化
+ 4.vue3 Teleport瞬移组件
+ 5.编程思想的变化，vue3是函数式编程，更符合一个程序员的习惯吧，而且函数也有着扩展性更强，复用性更强的优点

#### 3.vue3的diff算法对比vue2的优化

添加静态标记，就是把各类情况打上标记 比如说一个静态节点 = -1

那么在diff的时候就会跳过标记为-1的对比

算法优化，vue3利用了最长递增子序列的方法减少DOM移动

### Vuex/Pinia

#### 1.说一说Vuex是什么？有哪些属性？

<code>Vuex</code>是全局状态管理仓库

+ state:数据源
+ mutations:同步处理事件
+ actions:异步处理事件
+ getter:过滤器
+ module:模块

#### 2.Pinia是什么，和vuex有什么区别？

<code>Pinia</code>其实就是<code>Vuex</code>的升级版本，5.0版本

+ 简化了状态处理，没有了<code>mutations</code>，只保留了<code>actions</code>，所以说同步/异步处理事件都放在了<code>actions</code>里面
+ 代码简洁明了
+ 不再有<code>module</code>式嵌套结构，你可以在<code>store</code>中导入另一个<code>store</code>来隐式嵌套
+ 更加支持<code>ts</code>
+ 更加轻量化，包体才只有1kb左右

#### 3.vuex的原理？

利用了全局混入Mixin，将你所创建的store对象，混入到每一个Vue实例中

#### 怎么解决Pinia的持久化问题？

安装持久化插件 <code>pinia-plugin-persistedstate</code>

本质其实就是利用了<code>localStorage</code>来实现持有化

### vue-router

#### 1.vue-router路由守卫

其实就是路由跳转过程中的一些钩子函数，再直白点就是路由跳转是一个大的过程，这些大的过程分为路由前中后等等些小的过程，在这些小的过程中都有对应的函数，这些函数定义了做一些事情的时机，这就是导航守卫。

##### 全局守卫

+ 全局前置守卫beforeEach
+ 全局解析守卫beforeResolve
+ 全局后置钩子afterEach

##### 路由独享的守卫

指在单个路由配置的时候也可以设置的钩子函数

+ beforeEnter

##### 组件内的守卫

+ beforeRouteEnter 在渲染该组件的对应路由被 confirm 前调用
+ beforeRouteUpdate 在当前路由改变，但是该组件被复用时调用
+ beforeRouteLeave 导航离开该组件的对应路由时调用
### 其他

#### 1.说一说 Vue 列表为什么加 key？

便于<code>diff</code>，操作更准确，优化性能。

#### 2.谈一下MVVM？

<code>MVVM</code>其实是一种设计思想，模型-视图-视图模型

实现了<code>view</code>层和<code>model</code>层的自动同步，当<code>model</code>数据改变时，不需要自己手动去操作<code>DOM</code>

<code>react</code>不是<code>MVVM</code>，因为没有实现双向绑定，需要用户去手动提交数据，重新渲染<code>DOM</code>

#### 3.MVVM和MVC的区别

<code>MVVM</code>主要的特性其实就是双向绑定当<code>m</code>层数据修改，<code>vm</code>层会监听到数据变化，自动通知到<code>v</code>层进行相应操作

<code>MVC</code>的设计思想就是把数据与视图层分离，但是还是需要有大量的DOM操作，这会影响到页面的渲染性能，降低用户体验

#### 4.vue的$nextTick原理是什么？作用是什么？

由于<code>vue</code>的<code>DOM</code>更新是异步的，所以当数据发生变化时，<code>DOM</code>并不会立即更新，而是会等到事件循环后统一更新（微任务，但实际上不同vue版本是不同的）。其实<code>$nextTick</code>本质上就是一个<code>promise</code>

作用：在<code>$nextTick</code>函数体内的代码会在<code>DOM</code>更新后再执行，这样就可以拿到最新的<code>DOM</code>。

#### 4.组件库是如何维护的？

自己的组件库呢其实相当于对element-ui或者ant的二次封装。结合业务的使用场景来进行封装

升级后要确保向下兼容，意思就是说旧版本的不更新也能够正常使用。

那由于我其实是一个人在开发前端，所以说其实代码规范也完全是按照我个人习惯来制定了，当然我也是尽量去遵守自己制定的一些规则，这样起码自己看起来不会特别乱。

#### 5.团队开发？代码管理？

分支就是：
开发环境
测试环境
生产环境

利用gitlab的钩子实现自动打包，自动部署。这其实就是前端工程化的东西。

利用node去写接口测试，去监听页面报错等等，利用插件去打开浏览器页面，然后执行某些操作来看看可能会出现问题的元素会不会正常显示之类的。

#### 6.如何优化项目？

+ v-if和v-show区分使用场景
+ computed和watch区分使用场景，computed是有缓存的，所有依赖其他值进行计算的时候效率会比较高，我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch
+ v-for加key
+ 长列表优化（虚拟滚动）、懒加载
+ 图片资源懒加载
+ 路由懒加载
+ 插件按需引入

#### 7.比较引以为傲的组件

日期选择器,可以实现n种模式的切换,比如选择年月日周这几个周期