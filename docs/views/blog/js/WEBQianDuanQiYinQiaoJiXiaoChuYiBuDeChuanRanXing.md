---
title: WEB前端奇淫巧计-消除异步的传染性
date: 2023/04/24 09:53:48
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","info"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

###### 原文 [掘金](https://juejin.cn/post/7223937161707716669)

<div class="markdown-body cache"><p><a name="user-content-b0KzU" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 简介

            
<p>大家好<br>今天给大家介绍一个关于异步的比较恶心的东西<br>也许大家在开发中也曾遇到过<br>只不过解决起来比较棘手<br>废话不多说直接上代码</p>


```javascript
async function getUser() {
  return await fetch('https://my-json-server.typicode.com/typicode/demo/profile').then((resp) =&gt; resp.json())
}

async function m1(){
  //other  works
  return await getUser()
}

async function m2(){
  //other  works
  return await m1()
}

async function m3(){
  //other  works
  return await m2()
}

async function main() {
  const res = await m3()
  console.log('res', res)
}
main()

```


<p>经过观察上述代码有没有发现<br>一旦一个函数使用 async await<br>其他函数调用这个函数进行异步操作时，也要加上async await<br>突然有没有觉得有那么一丝丝小恶心<br>我们今天的目的就是把以上的async await去掉也能达到同样的效果</p>


```javascript
function getUser() {
  return fetch('https://my-json-server.typicode.com/typicode/demo/profile')
}

function m1() {
  //other  works
  return getUser()
}

function m2() {
  //other  works
  return m1()
}

function m3() {
  //other  works
  return m2()
}

function main() {
  const res = m3()
  console.log('res', res)
}
main()

```


<p>就像以上代码调用，也能实现同样的效果<br>是不是一下子有点懵懵的<br>这其实是一个大厂的内部晋升题，还是有点小难度的<br>这个问题在一些框架的底层也会常遇到<br>我来带你逐步探讨
<a name="user-content-f05fH" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 解决问题

            
<p>不难发现通过以上直接去掉async await是无法得到原来的结果的<br>因为它会返回一个promise 对象，无法使res得到真实的数据<br>这里我先说一下大概思路<br>首先fetch会返回一个promise，但是在请求时就想对结果进行操作，显然是不可能的<br>这时候我们需要在fetch没返回我们想要的数据前先终止函数运行，等拿到正确的数据后我们再运行函数<br>是不是听到这个过程也是一头雾水呀<br>先别着急<br>继续往下看<br>如果想要函数终止运行有个办法那就是抛出异常 throw error<br>然后等fetch返回数据data后，对数据进行缓存<br>缓存后开始函数的运行，<br>最后交付data<br>看一下流程图<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c3f87d04cf4488f879f6f91fdf56154~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br>整体流程大概就是这样<br>为了方便理解，我化简一下上述代码</p>


```javascript
function main() {
  const res = fetch('https://my-json-server.typicode.com/typicode/demo/profile')
  console.log('res', res)//res要得到一个data数据而不是一个promise对象
}
main()

```


<p>我们都知道fetch实际返回一个promise对象<br>此时返回的是一个promise<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f156a6f511b54d7f9b73d289286539bd~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br>在不改变main函数体的情况下使得res是我们想要的数据而不是promise<br>下面是我们想要的数据<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18b391bd71714e619b135c2d4929b803~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br>那我们就得想办法更改main的调用方式</p>


```javascript
function main() {
  const res = fetch('https://my-json-server.typicode.com/typicode/demo/profile')
  console.log('res', res)//res要得到一个data数据而不是一个promise对象
}
function run(func){
  //瓜瓜一顿操作，使得fetch返回真实的数据而不是promise
}
run(main)

```


<p>根据上述讲的流程，我们来看一下run函数的具体过程<br>注释我已经写的很详细了<br>大家认真看哦</p>


```javascript
function run(func) {
  let cache = []//缓存的列表，由于可能不止一个fetch，所以要用一个list
  let i = 0;//缓存列表的下标
  const _originalFetch = window.fetch//储存原先的fetch
  window.fetch = (...args) =&gt; {//重写fetch函数，这个fetch要么抛出异常，要么返回真实的数据
    if (cache[i]) {//判断一下缓存是否存在，如果存在就返回真实的数据或抛出异常
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    cache[i++] = result//添加缓存
    //发送请求
    //真实的fetch调用
    const prom = _originalFetch(...args).then(resp =&gt; resp.json()).then(resp =&gt; {
      //等待返回结果，然后修改缓存
      result.status = 'fulfilled'
      result.data = resp
    }, err =&gt; {
      result.status = 'rejected'
      result.data = err
    })
    //如果没有缓存，就添加缓存和抛出异常
    throw prom
    //这里为什么会抛出真实fetch返回的promise，主要是因为外面会用到这个promise然后等待拿到最终结果
  }
  try {
    //在try里调用func也就是上述的main函数
    //由于main里面有fetch，且第一次没有缓存，所以会抛出一个异常
    func()

  } catch (err) {
    //从这里捕获到异常
    //这里的err就是上述fetch返回的promise

    if (err instanceof Promise) {//验证一下是不是promise
      const reRun = () =&gt; {
        i = 0//重置一下下标
        func()
      }
      err.then(reRun, reRun)//待promise返回结果后重新执行func，也就是重新执行main
      //这次执行已经有缓存了，并且返回中有了正确的结果，所以重写的fetch会返回真实的数据
    }
  }
}

```


<p>通过这么一个函数调用main，就可以使得在不改变main函数体的情况下使得fetch返回真实的数据而不是promise对象<br>是不是感到很神奇<br>我们来看下完整代码</p>


```javascript
function getUser() {
  return fetch('https://my-json-server.typicode.com/typicode/demo/profile')
}

function m1() {
  //other  works
  return getUser()
}

function m2() {
  //other  works
  return m1()
}

function m3() {
  //other  works
  return m2()
}

function main() {
  const res = m3()
  console.log('res', res)
}

function run(func) {
  let cache = []//缓存的列表
  let i = 0;//缓存下标
  const _originalFetch = window.fetch//储存原先的fetch
  window.fetch = (...args) =&gt; {//重写fetch函数
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    cache[i++] = result
    //发送请求
    const prom = _originalFetch(...args).then(resp =&gt; resp.json()).then(resp =&gt; {
      result.status = 'fulfilled'
      result.data = resp
    }, err =&gt; {
      result.status = 'rejected'
      result.data = err
    })
    throw prom
  }
  try {
    func()
  } catch (err) {
    //什么时候引发重新执行function
    if (err instanceof Promise) {
      const reRun = () =&gt; {
        i = 0
        func()
      }
      err.then(reRun, reRun)
    }
  }
}
run(main)

```


<p>此时执行的结果，就是我们想要的结果<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fb8136f0eef4677abc5628a5ea573b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br>没错就是这样，nice</p>
<p><a name="user-content-Pda2O" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 在框架中的应用

            
<p>其实在react这个应用很常见<br>我们先来看一段代码</p>


```jsx
const userResource = getUserResource()
function ProfilePage() {
  return (
    &lt;Suspense fallback={&lt;h1&gt;Loading profile...&lt;/h1&gt;}&gt;
      &lt;ProfileDetails /&gt;
    &lt;/Suspense&gt;
  )
}
function ProfileDetails(){
  const user = userResource.read();
  return &lt;h1&gt;{user.name}&lt;/h1&gt;
}
ReactDOM.render(&lt;ProfilePage/&gt;, document.getElementById("root"));

```


<p>别急别急我来稍微翻译下<br>这段代码的意思是在ProfileDetails没加载到数据前先显示Loading profile...<br>待ProfileDetails加载到数据就渲染 {user.name}<br>他是怎么实现的呢<br>如果放在vue里面ProfileDetails必须为一个异步函数<br>而在这里的实现方案与我上述讲述的类似<br>我们来验证一下<br>在ProfileDetails打印1</p>


```jsx
function ProfileDetails(){
  console.log(1)//在这里输出一个1
  const user = userResource.read();
  return &lt;h1&gt;{user.name}&lt;/h1&gt;
}

```


<p>输出结果是这样的<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e2a9a113a2d4e8db749389db86c43e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br>为什么会输出两个1呢<br>原因就和我们上述代码类似<br>在userResource.read()第一次执行它会抛出一个错误<br>第二次是已经拿到数据<br>所以它执行了两遍，最终拿到了数据<br>我们在函数里手动抛出一个promise</p>


```jsx
function ProfileDetails(){
  throw new Promise((resolve)=&gt;{})//我们在这里抛出一个promise，且函数体里没有执行resolve()
  const user = userResource.read();
  return &lt;h1&gt;{user.name}&lt;/h1&gt;
}

```


<p>你会发现页面一直展示Loading profile...<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69d2b640d87d49618a25130e697308e7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br>因为我们抛出的promise，一直没有resolve，也就是等待不了结果返回，所以它只会渲染Loading profile...保持不变<br>肿么样，神奇吧，你学费了嘛<br></p></div>
