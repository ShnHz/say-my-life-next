---
title: 前端编程之道7-3：高级前端必须要懂的SOLID原则
date: 2024/08/01 17:18:59
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7283434831961260068)

<div class="article-viewer markdown-body cache result"><p>SOLID原则是由美国软件工程师Robert C. Martin（也被称为鲍勃大叔）提出的，包括以下五个原则：</p>
<ul>
<li>单一职责</li>
<li>开放封闭</li>
<li>里氏替换</li>
<li>接口隔离</li>
<li>依赖倒置</li>
</ul>
<p>遵循这5个原则，可以帮助开发人员设计出更加可维护、可扩展和可重用的软件系统。</p>
<p>由于这五个原则主要是针对面向对象提出的，对于前端开发人员并不好理解，相关示例基本都是关于类的，对前端开发的指导作用很有限，因此根据我对这5个原则的理解，结合前端实际开发中封装组件、函数的实例，让前端人员更好地理解这5个原则的内涵。</p>


## 单一职责原则SRP

            
<blockquote>
<p>单一职责原则（Single Responsibility Principle）指出一个类或模块应该有且只有一个引起它变化的原因。简而言之，单一职责原则要求一个类或模块只负责一项职责或功能。</p>
</blockquote>
<p>单一职责原则的核心思想是将一个类或模块的功能划分为独立的、高内聚的部分，每个部分只负责一个明确的职责，在我们前端领域可以将类或模块替换为组件、模块、函数等概念，也就是一个组件、模块或者函数应该只有一个明确的职责，在维护时只有一个引起它变化的原因。</p>
<p>听起来单一职责很简单，但是实际使用时却是一个十分不好掌握的一个原则，一个模块的职责并不是那么容易划分。</p>
<p>我们通过一个实际的例子先来看下什么是单一职责。</p>


### 函数开发示例

            
<p>假设我们现在想要实现这样一个功能，通过元素id获取页面上的某个Dom元素，然后为它添加class类名。很自然地我们想到要实现一个名为addClass函数，仅仅实现这个需求非常简单，可能的实现如下：</p>


```html
&lt;div id="test"&gt;测试内容&lt;/div&gt;

&lt;script&gt;
    function addClass(id, className){
        let dom = document.getElementById(id)

        dom.classList.add(className)
    }

    addClass('test', 'red')
&lt;/script&gt;

```


<p>我们来分析下这个addClass函数，实际它做了两件事，首先根据id获取元素，然后修改Dom元素的类名，现在看起来一切正常，并没有什么不妥。</p>
<p>接着需求发生了变化，不光要支持根据元素id修改类名，还要支持class选择器和元素选择器，这时必须要修改addClass函数的实现了（假装不知道有document.querySelector方法）</p>


```javascript
function addClass(selector, className){
        let dom
        if(selector.startsWith('#')){
            //id选择器
            dom = document.getElementById(selector.substr(1));
        }else if(selector.startsWith('.')){
            //类选择器
            dom = document.getElementsByClassName(selector.substr(1));
        }else {
            //tag选择器
            dom = document.getElementsByTagName(selector)
        }


        dom.classList.add(className)
}
addClass('#test', 'red')

```


<p>没过多久，需求又发生了变化，上面的实现每次只能添加一个class类名，我们想要一次添加多个类名，传递的类名要支持数组和字符串两种格式，继续修改addClass方法。</p>


```javascript
function addClass(selector, className){
        let dom
        if(selector.startsWith('#')){
            //id选择器
            dom = document.getElementById(selector.substr(1));
        }else if(selector.startsWith('.')){
            //类选择器
            dom = document.getElementsByClassName(selector.substr(1));
        }else {
            //tag选择器
            dom = document.getElementsByTagName(selector)
        }

        //增加对className格式的判断
        if(Array.isArray(className)){
            className.forEach(name =&gt; dom.classList.add(name))
        }else{
            dom.classList.add(className)
        }

    }

    addClass('#test', ['red', 'blue'])

```


<p>通过上面的示例我们可以看出，修改addClass函数有两个原因</p>
<ul>
<li>如何选择要修改的元素</li>
<li>如何修改元素的类名</li>
</ul>
<p>很明显这样设计不符合单一职责原则，但是不符合原则会怎样呢，目前来看仿佛一切正常，别急，那就继续变更需求。</p>
<p>现在有了新需求，想要通过id、类、元素选择器选中元素，然后删除元素的某个类名，也就是要增加一个removeClass方法，其中选中元素的逻辑和addClass是一样的。</p>


```javascript
function removeClass(selector, className){
        let dom
        if(selector.startsWith('#')){
            //id选择器
            dom = document.getElementById(selector.substr(1));
        }else if(selector.startsWith('.')){
            //类选择器
            dom = document.getElementsByClassName(selector.substr(1));
        }else {
            //tag选择器
            dom = document.getElementsByTagName(selector)
        }

        dom.classList.remove(className)
}

```


<p>可以看到addClass和removeClass在选择元素方面存在着重复代码，为后续的维护带来成本，之所以存在重复就是因为这两个方法职责并不单一，一个函数做了两件事，导致多个函数中的重复部分无法复用，原因找到了解决起来也就非常简单，我们只需封装三个职责单一的函数即可：</p>
<ul>
<li>selectDom：只负责选择Dom元素</li>
<li>addClass：只为Dom元素添加类名</li>
<li>removeClass：只为Dom元素移除类名</li>
</ul>


```javascript
    function selectDom(selector){
        let dom;
        if(selector.startsWith('#')){
            //id选择器
            dom = document.getElementById(selector.substr(1));
        }else if(selector.startsWith('.')){
            //类选择器
            dom = document.getElementsByClassName(selector.substr(1));
        }else {
            //tag选择器
            dom = document.getElementsByTagName(selector);
        }
        return dom;
    }
    
    function addClass(dom, className){
        if(Array.isArray(className)){
            className.forEach(name =&gt; dom.classList.add(name))
        }else{
            dom.classList.add(className)
        }

    }

    function removeClass(dom, className){
        dom.classList.remove(className)
    }

```


<p>经过这个修改之后，如果后续想要增加新的元素选择方式，则只需修改selectDom方法即可，不再会影响addClass和removeClass方法，同样的修改添加样式和删除样式需求，也只会影响各自对应的方法，而不影响其他方法。</p>


### 组件开发示例

            
<p>封装组件是现在前端开发中最主要的工作，在Vue和React项目开发中，一切皆组件，大到一个页面，小到一个按钮，都可以看作是一个组件。</p>
<p>框架虽然鼓励用户进行组件化开发，然而却不能强制控制组件化的粒度，所以每个人写出来的页面差别甚大，特别是一些前端新手写出来的页面，动辄2000行以上，所有的UI、逻辑、样式杂糅在一起，让后面维护的人甚是头大，就算是修改一个小功能，都要去阅读大量的代码，带来极大的维护成本，究其原因，就是没有按照单一职责原则进行组件设计。</p>
<p>下面这样一个用户列表，如果交给你开发，你会如何划分组件？</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2827a169cccb421da9927edb070c0e45~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=651&amp;h=233&amp;s=33420&amp;e=png&amp;b=fdfdfd" alt="07 用户列表.png" loading="lazy">
我们先来根据UI图梳理下需求：</p>
<ul>
<li>操作区：这里仅有1个添加用户按钮，点击之后一般会弹窗进行用户添加，或者跳转到添加用户界面</li>
<li>搜索区：根据用户角色进行筛选，用户角色下拉选项数据通过请求角色列表获取</li>
<li>表格展示区：
<ul>
<li>姓名：姓名可以点击，点击之后抽屉展示用户详细信息</li>
<li>角色：不同角色有不同的颜色标识</li>
<li>手机：隐藏手机号中间4位</li>
</ul>
</li>
<li>表格操作区：
<ul>
<li>删除：点击删除后，二次确认是否确定删除，确定后删除数据，刷新表格</li>
<li>编辑：点击后弹窗进行用户信息修改</li>
</ul>
</li>
</ul>
<p>可以看到，这个用户列表是一个混合了多个功能的组件，至少包括了添加用户、搜索、用户信息展示（姓名展示、角色展示、手机号展示）、用户管理（删除、编辑）四个功能，如果所有功能杂糅到一个组件中，势必造成单个文件过大，难以复用的问题。</p>
<p>按照单一职责进行组件划分：</p>
<ul>
<li>操作按钮组件 UserOperate：
<ul>
<li>组件职责：实现用户添加操作</li>
<li>属性：无</li>
<li>事件：对外暴露添加成功事件，主组件接收后刷新表格</li>
</ul>
</li>
<li>搜索组件 UserSearch
<ul>
<li>组件职责：负责维护搜索表单</li>
<li>属性：默认筛选项的值</li>
<li>事件：对外暴露search事件，主组件接收后刷新表格</li>
</ul>
</li>
<li>表格展示组件，一般都有第三方UI组件，无需封装</li>
<li>用户姓名 UserName
<ul>
<li>组件职责：展示用户姓名</li>
<li>属性：用户姓名、用户id</li>
</ul>
</li>
<li>用户角色 UserRole
<ul>
<li>组件职责：根据不同角色类型展示不同icon和名称</li>
<li>属性：用户角色</li>
</ul>
</li>
<li>用户手机 UserMobile
<ul>
<li>组件职责：隐藏手机号中间4位</li>
</ul>
</li>
<li>用户管理 UserManager
<ul>
<li>组件职责：用户的管理，这里将删除和编辑混合到一起，虽然可能违反单一职责原则，但是太细的话也没有必要，如果操作很多，每个很复杂，可以酌情拆分</li>
<li>事件：对外暴露删除成功、编辑成功事件，主组件接收后刷新表格</li>
</ul>
</li>
<li>主组件 UserList
<ul>
<li>组件职责：负责整合各个组件，根据搜索条件请求数据，赋值给用户表格</li>
</ul>
</li>
</ul>
<p>按照单一职责拆分后，主组件结构清晰，需要修改哪一块需求，可以迅速定位到相关子组件，不再像之前一样需要阅读大量代码才能定位到要修改的内容。</p>


### 单一职责优缺点

            
<p>通过上面两个示例，我们可以看到，符合单一职责的代码有以下几个优点：</p>
<ul>
<li>增强代码的可维护性：
<ul>
<li>单一职责代码一般比较精简，减少了复杂性，可读性更强；</li>
<li>每个模块职责清晰，更加容易去除或者更换某个职责的模块，而不用担心影响其他职责的模块</li>
</ul>
</li>
<li>提升代码的复用性：单一职责原则使得每个模块的功能更加独立和自治，可以更容易地被其他部分引用和复用。这样可以减少代码的重复，提高代码的可重用性，从而提高开发效率</li>
<li>提高代码的可扩展性：当一个模块只负责一项职责时，新增功能或修改现有功能时只需要修改相关的模块，而不会影响到其他部分。这使得系统更加灵活和易于扩展，可以更容易地应对变化和需求的变更。</li>
<li>提高代码的可测试性：单一职责原则使得每个模块的职责明确，因此可以更容易地编写针对每个职责的单元测试，而不必Mock大量的测试数据</li>
</ul>
<p>虽然遵循单一职责会提升代码的可维护性、可复用性、可扩展性和可测试性，但是也存在以下几个问题，需要在编写代码时去平衡：</p>
<ul>
<li>
<p>模块的数量/层级会增加：遵循单一职责原则必然会导致模块的数量或层级增加，这可能会增加代码的复杂性和维护成本，取决于模块的粒度划分是否合理。</p>
</li>
<li>
<p>职责划分困难：有时候，将功能划分为独立的职责可能并不是一件容易的事情。在某些情况下，职责之间可能存在一些交叉和重叠，这可能导致职责的划分变得困难，比如上面的表格操作区域，是把删除按钮和编辑按钮封装到一起作为一个表格项管理组件，还是把他们拆开成两个组件，是比较难权衡的</p>
</li>
<li>
<p>跨职责的协调和通信：由于将一个大功能划分成不同的小模块，就必然会带来小模块之间通信的问题，这可能会增加代码的复杂性。</p>
</li>
</ul>
<p>所以说在软件开发领域，并不存在"银弹"，不能没有原则，也不能完全套用原则，就像咱们古人推崇的中庸之道，干啥都别过分，写代码就是平衡的艺术。</p>


## 开放封闭原则OCP

            
<blockquote>
<p>开闭原则（Open-Closed Principle，OCP）指出软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。</p>
</blockquote>
<p>这个定义很抽象，具体来说，开放封闭原则内核包含以下两个方面：</p>
<ul>
<li>
<p>对扩展开放：当需要添加新功能时，应该尽可能地开放类、模块、函数等的扩展点。这意味着您应该尽可能地将类、模块、函数等的行为封装在内部，并提供一些公共的接口来访问它们。</p>
</li>
<li>
<p>对修改关闭：当需要修改现有功能时，应该尽可能地关闭类、模块、函数等的修改点。这意味着您应该尽可能地将类、模块、函数等的实现封装在内部，并提供一些公共的接口来访问它们。</p>
</li>
</ul>
<p>在我们前端开发中，除了开发一些公共库之外，很少会用到类，我们先以Vue组件封装为例来体会下什么是开闭原则。</p>
<p>假设我们现在开发一个表单标题组件，需求就是在标题的左侧添加一个绿色的竖线，如下图所示。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b53c5a96f41b40d585af34396ea48475~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=493&amp;h=166&amp;s=11499&amp;e=png&amp;b=fefefe" alt="05-表单标题1.png" loading="lazy"></p>
<p>Vue实现如下</p>


```vue
&lt;template&gt;
    &lt;div class="form-title"&gt;
        &lt;div class="title"&gt;
            {{ title }}
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
    name: 'FormTitle',
    props: {
        title: {
            type: String
        }
    }

};
&lt;/script&gt;

&lt;style scoped lang="scss"&gt;
.form-title {
    .title {
        height: 16px;
        line-height: 16px;
        padding-left: 8px;
        border-left: green 4px solid;
        font-size: 16px;
    }
}
&lt;/style&gt;

```


<p>上述实现并没有考虑扩展性，现在开发中遇到以下两种场景，一个是标题右侧展示一个问号，鼠标移入后展示一段提示信息，另一种是标题右侧有个按钮，点击执行某个动作。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4453b0bf06d948cab975f7674abd2ff5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=407&amp;h=146&amp;s=17558&amp;e=png&amp;b=fefefe" alt="05-表单标题2.png" loading="lazy"></p>
<p>如何实现这两个场景呢，一种是我们继续修改上述FormTitle组件的实现，比如对外暴露一个icon属性，传递了icon则标题右侧展示icon；同时再暴露一个buttonLabel属性，传递button的文案。</p>
<p>虽然这样也可以实现，但是不满足开闭原则，首先这样的实现没有扩展性，假如后续标题右侧展示两个button按钮，又要如何处理呢？并没有提供一个统一的扩展方案，即不满足对扩展开放；同时为了满足需求，对原有的FormTitle代码进行了大量的修改，即不满足对修改关闭。</p>
<p>假如我们在FormTitle组件的标题右侧引入了一个插槽，则可以完美应对各种各样的需求。</p>


```vue
&lt;template&gt;
    &lt;div class="form-title"&gt;
        &lt;div class="title"&gt;
            {{ title }}
            &lt;slot&gt;&lt;/slot&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;

```


<p>引入插槽之后，上面两个新需求可以非常容易实现，而不需要修改原有的FormTitle组件。</p>


```vue
&lt;template&gt;
    &lt;div&gt;
        &lt;FormTitle title="表单标题"&gt;
            &lt;i class="icon-question"&gt;&lt;/i&gt;
        &lt;/FormTitle&gt;
        &lt;FormTitle title="表单标题"&gt;
            &lt;button&gt;按钮&lt;/button&gt;
        &lt;/FormTitle&gt;
    &lt;/div&gt;
&lt;/template&gt;

```


<p>通过这个例子可以看出，通过使用插槽机制，让组件FormTitle扩展性大大增强，为以后的新需求提供了扩展机制，而不必修改FormTitle的实现，我们说这样的设计是符合开闭原则的。</p>
<p>再来看一个纯js的例子，假设我们实现一个表单校验的工具，可以校验某个值是否是合法的手机号、邮箱等。</p>


```javascript
const formValidate = new FormValidate();
formValidate.validate('mobile', '111111'); //false
formValidate.validate('mobile', '13156678909'); //true
formValidate.validate('email', 'aaa'); //false
formValidate.validate('email', 'test@qq.com'); //true

```


<p>我们来试着实现这样一个FormValidate类，它有个validate方法，根据参数type类型进行正则校验。</p>


```javascript
class FormValidate {
    validate(type, value){
        if(type === 'mobile'){
            return /^1[3-9]\d{9}$/.test(value)
        }else if(type === 'email'){
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/.test(value)
        }else {
            return false;
        }
    }
}

```


<p>假如我们现在要增加对用户名的校验，如何实现呢？按照上面的实现方法，我们需要修改原有的FormValidate实现。</p>


```javascript
class FormValidate {
    validate(type, value){
        if(type === 'username'){
            if(!value) {
                return false;
            }else if(value.length &lt;=30){
                return true;
            } else{
                return false;
            }
        }
        //其他逻辑
    }
}

```


<p>这个实现方式就不符合开闭原则，没有对扩展开放，没有对修改关闭。我们重构下FormValidate类的实现方式，增加一个addValidateMethod方法，通过该方法添加自定义的校验方法。</p>


```javascript
class FormValidate {
    validateMethods = {};
    validate(type, value){
        if(this.validateMethods[type]){
            return this.validateMethods[type](value);
        }
        return false;
    }
    addValidateMethod(type, validateMethods){
        this.validateMethods[type] = validateMethods;
    }
}

const formValidate = new FormValidate();

formValidate.addValidateMethod('mobile', (value) =&gt; /^1[3-9]\d{9}$/.test(value));

formValidate.addValidateMethod('email', (value) =&gt; /^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/.test(value));

formValidate.addValidateMethod('username', (value) =&gt; {
    if(!value) {
        return false;
    }else if(value.length &lt;=30){
        return true;
    } else{
        return false;
    }
});

formValidate.validate('mobile', '111111'); //false
formValidate.validate('mobile', '13156678909'); //true
formValidate.validate('email', 'aaa'); //false
formValidate.validate('email', 'test@qq.com'); //true

```


<p>后续假如想再增加对ip地址的校验，只需要调用addValidateMethod方法添加ip的校验函数即可，无需修改原有FormValidate类，这样的实现方式满足对扩展开放对修改关闭的原则，符合开闭原则。</p>
<p>开闭原则是提升代码可扩展性的一个重要原则，特别是当你想要开源一些基础组件或者方法库时，这个原则的指导作用会更加明显，因为对于用户来说，第三方开源库大都通过引入使用，已经天然地关闭了源码修改通道，所以只有你的开源库对扩展开放，用户才能根据自己需求进行扩展，这会大大影响你的开源库的受众范围。</p>


## 里氏替换原则 LSP

            
<blockquote>
<p>里氏替换原则（Liskov Substitution Principle，LSP）是由Barbara Liskov提出。LSP的核心思想是，任何基类（父类）可以被其子类替换，而不会影响程序的正确性。</p>
</blockquote>
<p>简单点说如果S是T的子类，那么都可以将所有出现T的地方都换成它的子类S，而不出错。</p>


```javascript
class S extends T {
    
}

let instance = new T();
instance.method();

//符合里氏替换原则的情况下,可以将T换成S，程序一定可以正常运行
let instance = new S();
instance.method();

```


<p>这在前端并不好理解，因为前端很少有这种子类替换基类的情况，我们可以通过一个组件的继承来说明里氏替换原则。</p>
<p>在使用ElementUI组件库进行项目开发时，有时可能要改造部分组件，比如我对ElButton组件不太满意，我想给这个组件增加一个属性operate，当operate为add、edit、delete时分别设置不同的type，以此来规范项目中按钮的type类型。也就是我要开发一个基于ElButton组件的子组件MyButton（这里的子组件可以理解为继承的组件）。</p>
<p>如果我的MyButton这么实现，看看会有什么问题：</p>


```vue
&lt;template&gt;
    &lt;el-button :type="type"&gt;
        &lt;slot&gt;&lt;/slot&gt;
    &lt;/el-button&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: "MyButton",
    props:{
        operate:{
            type: String
        }
    },
    computed:{
        type(){
            let typeMap = {
                add: 'primary',
                edit: 'warning',
                delete: 'danger'
            }
            return typeMap[this.operate] || 'default'
        }
    }
};
&lt;/script&gt;

```


<p>显然，如果这么实现，页面中凡是用到ElButton的地方，是不能用MyButton替换的，因为MyButton支持的属性很少，没有兼容父组件的输入，也就是说子组件对于输入的要求比父组件严格。</p>


```html
&lt;ElButton type="primary" size="small"&gt;添加&lt;/ElButton&gt;

&lt;!--不能使用MyButton组件替换，不支持type和size属性--&gt;
&lt;MyButton type="primary" size="small"&gt;添加&lt;/MyButton&gt;

```


<p>也就是说MyButton的实现不符合里氏替换原则，我们可以经过简单改造，让MyButton支持ElButton的全部属性和事件，可以利用v-bind="<span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mi>t</mi><mi>t</mi><mi>r</mi><mi>s</mi><mi mathvariant="normal">"</mi><mtext>和</mtext><mi>v</mi><mo>−</mo><mi>o</mi><mi>n</mi><mo>=</mo><mi mathvariant="normal">"</mi></mrow><annotation encoding="application/x-tex">attrs" 和 v-on="</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal">tt</span><span class="mord mathnormal">rs</span><span class="mord">"</span><span class="mord cjk_fallback">和</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord">"</span></span></span></span></span>listeners"，将传递给MyButton的所有属性和事件监听，转移到ElButton组件上。</p>


```vue
&lt;template&gt;
    &lt;el-button v-bind="$attrs" :type="type" v-on="$listeners"&gt;
        &lt;slot&gt;&lt;/slot&gt;
    &lt;/el-button&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: "MyButton",
    props:{
        operate:{
            type: String
        }
    },
    computed:{
        type(){
            let typeMap = {
                add: 'primary',
                edit: 'warning',
                delete: 'danger'
            }
            return this.$attrs.type || typeMap[this.operate] || 'default'
        }
    }
};
&lt;/script&gt;

```


<p>通过这样的改造后，业务中凡是用到ElButton的地方都可以放心地替换为MyButton。</p>
<p>现在总结下，一个组件要想满足里氏替换原则，必须满足以下条件：</p>
<ul>
<li>子组件的输入不能比父组件严格：
<ul>
<li>子组件必须支持父组件所有属性，可以多，但不能少；</li>
<li>同一个属性子组件要允许更宽泛的格式，比如父组件某属性只支持String格式，子组件可以支持String、Number等多种情况，但不能反过来</li>
<li>同一个属性子组件允许更宽泛的校验，比如父组件要求某属性为1-10，子组件可以要求0-100，但是不能反过来</li>
</ul>
</li>
<li>子组件的输出不能比父组件宽松：
<ul>
<li>比如父组件的某个method返回值为String和Number，子组件可以只返回Number格式，但是不能返回Array格式</li>
<li>父组件某个method返回数据范围为1-9，子组件不能返回0-10的数据，但可以返回2-8的数据</li>
</ul>
</li>
</ul>
<p>这里将"组件"换成"类"等其他概念都是相通的，只是后端可能经常使用类的概念，前端更多使用组件这个概念。</p>


## 接口隔离原则 ISP

            
<blockquote>
<p>接口隔离原则（Interface Segregation Principle，ISP），客户端不应该依赖它不需要的接口; 类间的依赖关系应该建立在最小的接口上。</p>
</blockquote>
<p>这里说的接口不是API接口，而是面向对象中的接口Interface，比如有个学生接口Student，它包含了学习语文、学习数学、学习物理等方法，现在如果要开发一个文科生类来实现这个Interface，由于文科生不需要学习物理，但是也必须写一个空的学习物理方法。文科生类和理科生类由于都基于共同的Interface实现，无形之中产生了耦合，也许有一天理科生不再学习物理了，但这就对文科生类产生了影响，这就不符合接口隔离原则，接口隔离原则的目的是降低类之间的耦合性。</p>
<p>同样的，我们可以将这个思想应用到前端开发中，即在实现一个方法、组件时，不要依赖不需要的内容（数据、组件等），依赖关系应该尽可能小。</p>
<p>先来个非常简单的示例来说明下，假设现在需要实现一个获取阅读类用户详情的方法，如果用户是普通用户获取用户最近收藏的文章数，如果用户是签约作者获取用户最近发表文章数。</p>


```javascript
function getUserDetail(rowData){
    let type = rowData.row.type;
    let id = rowData.row.id;
    //根据id获取用户基本信息
    //根据type类型决定是获取收藏文章数还是发表文章数
}

```


<p>这个实现有什么问题呢？对于getUserDetail方法来说，只要拿到用户id和类型type两个数据即可，现在却依赖了一个庞大的对象rowData，这种没必要的依赖关系导致了getUserDetail方法和rowData结构的耦合，一旦rowData结构发生变化，getUserDetail方法也会收到影响，这本可以避免的。</p>


```javascript
//我不关心id和type怎么来，给我就行了
function getUserDetail(id, type){
    //根据id获取用户基本信息
    //根据type类型决定是获取收藏文章数还是发表文章数
}

```


<p>这个示例相信很好理解，现在我们再看一个组件封装的例子，看看怎么利用接口隔离原则来指导组件封装。</p>
<p>假设某个知识网站存在两种用户：普通读者和签约作者，现在需要在页面上展示用户的基本信息，要求是除了展示头像和姓名外，普通用户展示最近收藏文章数，签约作者展示新增粉丝数，如下图所示，想一下这个用户信息组件UserInfo应该怎么设计？</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/514ffcb7e2864f19a81b6f6cb3a6f4ff~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=517&amp;h=305&amp;s=22733&amp;e=png&amp;b=fefefe" alt="07 不同用户个人信息.png" loading="lazy"></p>
<p>一种思路是我们直接实现一个UserInfo组件，在内部根据type类型，请求不同的接口，渲染不同的UI，用vue简单实现如下：</p>


```vue
&lt;template&gt;
    &lt;div&gt;
        &lt;img :src="avatar"/&gt;
        &lt;div&gt;
            &lt;span&gt;{{ name }}&lt;/span&gt;
          
            &lt;span v-if="type === 'reader'"&gt;普通用户，最近收藏了 {{collectCount}} 篇文章&lt;/span&gt;
            &lt;span v-else&gt;签约作者，最近新增了 {{ fansCount }} 个粉丝&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: "UserInfo",
    props: ['userId', 'type'],
    data(){
        return {
            avatar: '',      //头像
            name: '',        //姓名
            collectCount: 0, //收藏数量
            fansCount: 0,    //粉丝数量
        }
    },
    mounted() {
        //根据userId获取用户基本信息
        //根据type获取用户收藏数量或粉丝数量
    }
};
&lt;/script&gt;

```


<p>这么实现看似没有什么问题，但是却隐藏了一个耦合逻辑，由于普通用户详情和签约作者详情都是基于这一个组件渲染，在展示普通用户详情时，有可能引发签约作者相关代码执行，这本是不必要的依赖。而且在修改签约作者相关需求时，稍有不慎就可能影响到普通用户详情的展示，当然了，现在这个示例很简单，元素、数据以及方法都很少，不太容易引入额外的bug，但如果这个页面足够复杂，谁也无法保证二者是否会互相影响。</p>
<p>普通用户详情应该基于普通用户详情组件ReaderUserInfo进行展示，签约作者详情基于签约作者组件 WriterUserInfo组件展示，ReaderUserInfo 和 WriterUserInfo 可以复用相同部分BaseUserInfo，不同部分各自处理各自的逻辑。</p>
<p>BaseUserInfo实现如下，展示用户头像和名称，并提供插槽用来扩展其他要展示的信息。</p>


```vue
&lt;template&gt;
    &lt;div&gt;
        &lt;img :src="avatar"/&gt;
        &lt;div&gt;
            &lt;span&gt;{{ name }}&lt;/span&gt;
            &lt;slot&gt;&lt;/slot&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: "BaseInfo",
    props: ['userId'],
    data(){
        return {
            avatar: '',      //头像
            name: '',        //姓名
        }
    },
    mounted() {
        //根据userId获取用户基本信息
    }
};
&lt;/script&gt;

```


<p>普通用户详情ReaderUserInfo实现如下：</p>


```vue
&lt;template&gt;
    &lt;BaseUserInfo&gt;
        &lt;span&gt;普通用户，最近收藏了 {{collectCount}} 篇文章&lt;/span&gt;
    &lt;/BaseUserInfo&gt;
&lt;/template&gt;

&lt;script&gt;
import BaseUserInfo from "@/BaseUserInfo";
export default {
    name: "ReaderUserInfo",
    components:{
        BaseUserInfo
    },
    props: ['userId'],
    data(){
        return {
          fansCount: 0
        }
    },
    mounted() {
        //获取用户收藏文章数量
    }
};
&lt;/script&gt;

```


<p>签约作者详情WriterUserInfo实现如下：</p>


```vue
&lt;template&gt;
    &lt;BaseUserInfo&gt;
      &lt;span&gt;签约作者，最近新增了 {{ fansCount }} 个粉丝&lt;/span&gt;
    &lt;/BaseUserInfo&gt;
&lt;/template&gt;

&lt;script&gt;
import BaseUserInfo from "@/BaseUserInfo";
export default {
    name: "WriterUserInfo",
    components:{
        BaseUserInfo
    },
    props: ['userId'],
    data(){
        return {
          fansCount: 0
        }
    },
    mounted() {
        //获取用户粉丝数量
    }
};
&lt;/script&gt;

```


<p>通过这种改造之后，普通用户详情组件和签约作者详情组件不再发生高度耦合，每个组件只包含应该包含的最少量代码，而且组件内部实现也不再有令人讨厌的各种if-else，增强了代码可读性。</p>
<p>通过遵守接口隔离原则，可以让我们写出更加解耦的函数、模块或组件，而且也肯定会更加符合单一职责原则，同时也降低各个模块的代码量，并增强代码可读性以及可维护性。</p>


## 依赖倒置原则 DIP

            
<blockquote>
<p>依赖倒置原则（Dependency Inversion Principle）是指高层模块不应该依赖于低层模块的具体实现，而应该依赖于抽象，抽象不应该依赖于具体实现，具体实现应该依赖于抽象。</p>
</blockquote>
<p>通过依赖倒置原则，可以改变高层（如业务层）与底层（如第三方底层库）之间的依赖关系的，将高层与底层实现解耦。</p>
<p>比如公司为福特和本田两家公司开发了一套自动驾驶系统，只要安装到两家汽车上就能实现自动驾驶功能。</p>
<p>我们定义了一个自动驾驶系统类AutoSystem，一个福特汽车类FordCar，一个本田汽车类HondaCar。</p>
<p>假设福特汽车和本田的启动方法不一样，一个是run、一个是driver，在自动驾驶系统里面要启动汽车就要区分二者。</p>


```javascript
class HondaCar{
    run(){
        console.log("本田开始启动了");
    }
}
class FordCar{
    driver(){
        console.log("福特开始启动了");
    }
}

class AutoSystem {
    run(car){
        if(car instanceof HondaCar){
            car.run()
        }else if(car instanceof FordCar){
            car.driver()
        }
    }
}

```


<p>现在公司业务壮大了，即将为宝马汽车安装自动驾驶系统，宝马汽车的启动汽车方法为startCar，那么自动驾驶系统又要进行修改，以支持宝马汽车。</p>


```javascript
class HondaCar{
    run(){
        console.log("本田开始启动了");
    }
}
class FordCar{
    driver(){
        console.log("福特开始启动了");
    }
}
class BmwCar {
    startCar(){
        console.log("宝马开始启动了");
    }
}

class AutoSystem {
    run(car){
        if(car instanceof HondaCar){
            car.run()
        }else if(car instanceof FordCar){
            car.driver()
        }else if(car instanceof BmwCar){
            car.startCar()
        }
    }
}

```


<p>随着后续业务的壮大，自动驾驶系统里面会充斥着各种if-else，这还是只存在启动汽车一个方法的示例，实际情况肯定更复杂，每次谈下合作方，自动驾驶系统都要做大量的适配，显然这是很不合理的，自动驾驶系统和具体车型存在严重耦合。这正是因为高层应用依赖了底层实现，假设我们要求所有的汽车都应该有固定的方法，也就是后端常说的接口interface，那么自动驾驶系统就不再需要频繁改动，每次增加新的车型，只要增加相应的汽车类接口。</p>


```javascript
class HondaCar{
    run(){
        console.log("本田开始启动了");
    }
}
class FordCar{
    run(){
        console.log("福特开始启动了");
    }
}
class BmwCar {
    run(){
        console.log("宝马开始启动了");
    }
}

class AutoSystem {
    run(car){
        car.run()
    }
}

```


<p>可以看到自动驾驶类AutoSystem大大简化了，而且后续也不再耦合具体车型了，这里自动驾驶系统类可以看做高层模块，每个汽车类可以看做底层模块，高层不应该依赖于底层的实现，而应该制定规范，让底层模块去实现，这样高层模块就不再依赖底层模块。</p>
<p>再举个前端项目中经常会遇到的示例。</p>
<p>在绝大部分前端项目中都会用到网络请求的第三方库，比如axios、fetch等，如果我们直接在页面中直接调用axios的方法进行网络请求，那么假如有一天我们要更换网络请求库，或者升级网络请求库的版本，如果新的请求库方法名称、传参顺序和之前的不一致了，就会带来大量的修改工作，也就是我们的系统和第三方库严重耦合在了一起。</p>
<p>再深入思考一下，我们其实需要的是网络请求，而不是axios，我们要怎么进行网络请求，不应该依赖于axios提供怎样的接口，而是我们想要定义怎样的网络请求接口，然后利用axios或者其他任意网络请求库去实现它。我们常犯的问题是市面上的第三方库怎么设计的我们就怎么用，而不是我们想要怎样的服务标准，然后用第三方库去实现它，记住，一流的程序员定标准。</p>
<p>回到正题，我们可以定义一个网络请求模块request，定义自己想要的方法和传参顺序，request内部调用axios的接口进行实现。</p>


```javascript
import axios from 'axios'
function request(url, options){
    return axios(url, options).then(res =&gt;{
        
    }).catch(e =&gt;{
        
    })
}

function get(url, params){
    return request(url, {
        method: 'GET',
        params
    })
}

function post(url, body, params){
    return request(url, {
        method: 'POST',
        body,
        params
    })
}
export default {
    get,
    post
}

```


<p>改造后的页面中的网络请求</p>


```javascript
import request from '@/utils/request'
function getData(url, params){
    request.get(url, params)
}

```


<p>通过这样的改造，即使以后axios的接口传参方式发生了变更，或者我们直接更换axios为fetch，也都非常容易进行，只需要修改request的实现即可，业务代码无需任何变更。因为我们通过这种依赖倒置的方式，已经完成了项目和第三方库的解耦。</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7dba5dd9e414e5b8bf0ad49c35314fd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1194&amp;h=884&amp;s=114442&amp;e=png&amp;b=fefefe" alt="04-网络请求解耦.png" loading="lazy"></p>
<p>后端也存在类似的问题，比如后端进行日志保存时，如果直接依赖Log4j这样的日志框架，则后续要更换日志框架就会带来大量的修改， 同样的，我们可以封装一个日志类，然后用第三方的Log4j去实现它，完成项目和具体日志框架的解耦。</p>


## 总结下SOLID原则：

            
<ul>
<li>
<p>单一职责原则强调一个函数、模块、组件要有自己明确的单一的职责，遵循单一职责会提升代码的可维护性、可复用性、可扩展性和可测试性</p>
</li>
<li>
<p>开放关闭原则强调函数、模块、组件应该对扩展开发，对修改关闭，遵循开闭原则可以提升代码的可扩展性</p>
</li>
<li>
<p>里氏替换原则强调任何父类可以被其子类替换，满足里氏替换原则可以增强代码的可扩展性</p>
</li>
<li>
<p>接口隔离原则强调模块之间的依赖关系应该尽可能的小，不要依赖不需要的内容，满足这个原则可以让模块之间解耦</p>
</li>
<li>
<p>依赖倒置原则强调高层不应该依赖底层，抽象不能依赖具体，这是实现高层业务和底层业务解耦的一个重要手段</p>
</li>
</ul>
</div> <!---->
