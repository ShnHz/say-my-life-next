---
title: JS代码其实可以这样写
date: 2023/11/14 14:31:10
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

###### 原文 [掘金](https://juejin.cn/post/7300151966964613132)

<p>日常工作中，我确实经常去帮大家review代码，长期以来，我发现有些个功能函数，JS其实可以稍微调整一下，或者换个方式来处理，代码就会看起来更清晰，更简洁，甚至效率更高，主要是还更好理解。
下面我列举有5个案例，我们一起来看一下</p>


## 一、建议考虑使用FlatMap方法

            
<p>先来看一段同时使用<code>filter</code>和<code>map</code>方法遍历数组的代码。我相信这种场景大家一定碰到过。为了说明问题，这里我用简单的数字内容来举个例子。</p>


```js
const squaredOddNumbers = numbers
    .filter(num =&gt; num % 2 !== 0)
    .map(num =&gt; num * num)

console.log(squaredOddNumbers);
// 输出：[1, 9, 25, 49, 81]

```


<p>上面代码这样写，没什么问题，而且方法的连用也是比较推荐的处理方式， 但是，还是请多想想，其实我们有更好的方式来处理这一类问题。</p>
<p><strong>现在我们看使用FlatMap如何实现的</strong></p>


```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const squaredOddNumbers = numbers.flatMap(num =&gt; 
    num % 2 !== 0 ? [num * num] : []
);

console.log(squaredOddNumbers);
// 输出：[1, 9, 25, 49, 81]

```


<p><strong>使用FlatMap的好处是</strong></p>
<p>只要遍历一遍，而且不产生中间多余数组</p>


## 二、建议调整数组方法调用的顺序

            
<p>日常工作中写的比较多的数组方法有<code>filter()</code>，<code>find()</code>，<code>map()</code>，<code>reduce()</code>，在必要的场景下，我们也建议将这些个方法连起来一起调用。但是，一定要注意调用顺序，否则也会影响效率问题。
比如下面这样：</p>


```js
const numbers = [9, 3, 6, 4, 8, 1, 2, 5, 7];
numbers
  .sort((a, b) =&gt; a - b)
  .filter((n) =&gt; n % 2 !== 0)
  .map((n) =&gt; n ** 3);

```


<p>仔细看上面这段代码，你就会发现</p>
<p><strong>如果我们首先使用过滤器，然后在排序，这样执行就能提高效率</strong></p>


```js
numbers
  .filter((n) =&gt; n % 2 !== 0)
  .sort((a, b) =&gt; a - b)
  .map((n) =&gt; n ** 3);

```




## 三、建议这里使用reduce方法

            
<p>你写的代码一定要让大家看的懂，代码要简洁，然而，有些方法它就出于这个目的创造的，如果你又不用，那就太可惜了，比如<code>reduce</code>方法。
举个例子，我们先从接口中拉出一段数据，然后对数据内容进行分类处理，像下面代码这样</p>


```js
fetch("https://jsonplaceholder.typicode.com/todos/")
  .then(res=&gt;res.json())
  .then(todos=&gt;{

    // using Map
    const todosForUserMap = {};
    todos.forEach(todo=&gt;{
      if (todosForUserMap[todo.userId]){
        todosForUserMap[todo.userId].push(todo);  
      }else{
        todosForUserMap[todo.userId] = [todo];
      }  
    })

    console.log(todosForUserMap)
  })

```


<p>我看到大多数前端开发人员都会使用<code>forEach</code>方法或者错误的使用<code>map</code>方法去处理，相比之下，实际上这里特别适合使用<code>reduce</code>方法</p>
<p><strong>看起来会更清晰而且更容易理解</strong></p>


```js
fetch("https://jsonplaceholder.typicode.com/todos/")
  .then(res=&gt;res.json())
  .then(todos=&gt;{
  
    // using Map
    const todosForUserMap = todos.reduce((accumulator, todo)=&gt;{
      if (accumulator[todo.userId]) accumulator[todo.userId].push(todo);
      if (!accumulator[todo.userId]) accumulator[todo.userId] = [todo];
      return accumulator;
    },{})

    console.log(todosForUserMap)
  })

```




## 四、建议使用原生JavaScript类

            
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdc7010b00274288923d00677637cef0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?" width="600px" loading="lazy">
<p>上面这张很清晰明了的拆解了<code>URL</code>的每一部分</p>
<p>关于页面的<code>URL</code>我们可以组装也可以拆卸，这里说一下<code>URL</code>各部分的组装问题，你现在或者曾经肯定处理过<code>URL</code>拼接的问题，代码可能是这么写的</p>


```js
function getUrl(param){
  const { category, limit, userId } = param;
  const baseURL = "https://fakestoreapi.com/products";
  const limtParams = limit ? `limit=${Number(limit)}` : '';
  const userIdParams = limit ? `userId=${Number(userId)}` : '';
  return `${baseURL}${category ? `/category/${category}?` : ""}${limtParams}&amp;${userIdParams}`;    
}

```


<p>这样写虽然能够实现，但是代码看起来很混乱，很可能会被破坏，并且每次都需要你在最后添加一些规则，添加一些其他参数。
比如，你可能忘记添加<code>/</code>或者<code>&amp;</code>符号就会导致错误，下面看看原生类怎么实现的，可以对比一下两者区别</p>


```js
function constructURL(param) {
  const { category, limit, userId } = param;
  const baseURL = "https://fakestoreapi.com/products";
  const url = new URL(baseURL);
  const params = new URLSearchParams();

  if (category) url.pathname += `/category/${category}`;
  if (limit) params.append('limit', Number(limit).toString());
  if (userId) params.append('userId', Number(userId).toString());

  url.search = params.toString();
  return url.toString();
}

```


<p>这样看来，在处理URL组装问题上是不是可以考虑使用原生类了？</p>


## 五、建议使用生成器

            
<p>提到生成器，大家可能只是听过，或者知道怎么使用，而实际项目中很少去用。实际上它有很多使用场景。
使用生成器能够节省很多代码，代码也非常清晰。如，进行异步操作或者按需循环或者按需加载时。</p>
<p><strong>看这段代码：</strong></p>


```js
async function *fetchProducts(){
  while (true){
    const productUrl = "https://fakestoreapi.com/products?limit=2";
    const res = await fetch(productUrl)
    const data = await res.json()
    yield data;
  }
}

async function main() {
  const itr = fetchProducts();
  console.log( await itr.next() );
}

```


<p>上面代码中<code>main</code>函数，可以根据用户交互或者其它技巧来调用。因为这里不希望无限加载。</p>


## 总结

            
<p>好了，就说这几点，日常工作中，希望大家都写出高质量的代码。</p>
