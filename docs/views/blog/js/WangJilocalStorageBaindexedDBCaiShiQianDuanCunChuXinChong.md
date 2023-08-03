---
title: 忘记 localStorage 吧，indexedDB 才是前端存储新宠！
date: 2023/08/03 11:57:47
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7239259798267904059)

<div class="markdown-body cache"><blockquote>
<p><code>原创</code> 冯希才 / 叫叫技术团队</p>
</blockquote>


# 前言

            
<p>在项目开发过程中，前端需要存储大量的数据。cookie, localstorage 都有存储长度限制。<br><strong>表格一览</strong></p>








































<table><thead><tr><th>特性</th><th>cookie</th><th>localStorage</th><th>sessionStorage</th><th>indexedDB</th></tr></thead><tbody><tr><td>数据生命周期</td><td>一般由服务器生成，可以设置过期时间；前端采用和js-cookie等组件也可以生成</td><td>除非被清理，否则一直存在；浏览器关闭还会保存在本地，但是不支持跨浏览器</td><td>页面关闭就清理刷新依然存在，不支持跨页面交互</td><td>除非被清理，否则一直存在</td></tr><tr><td>数据存储大小</td><td>4K</td><td>5M</td><td>5M</td><td>不限制大小</td></tr><tr><td>与服务端通信</td><td>每次都会携带在请求的header 中，对于请求性能有影响；同时由于请求中都带有，所以也容易出现安全问题</td><td>不参与</td><td>不参与</td><td>不参与</td></tr><tr><td>特点</td><td>字符串键值对在本地存储数据</td><td>字符串键值对在本地存储数据</td><td>字符串键值对在本地存储数据</td><td>IndexedDB 是一个非关系型数据库（不支持通过 SQL 语句操作）。可以存储大量数据，提供接口来查询，还可以建立索引，这些都是其他存储方案无法提供的能力。</td></tr></tbody></table>
<p>需要一个存储容量大，支持搜索和自定义索引的前端存储方案，就选用了 。<br>caniuse上查看 indexedDB 支持情况，目前浏览器支持情况良好。<br><a href="https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3DindexedDB" target="_blank" title="https://caniuse.com/?search=indexedDB" ref="nofollow noopener noreferrer">caniuse.com/?search=ind…</a><br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fca33e3026f4594a03403453cecd1d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"> <a name="user-content-ATMCY" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


# IndexedDB介绍

            
<p>IndexedDB 属于非关系型数据库。（不支持SQL查询） <a name="user-content-JaGXR" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


## 特点：

            
<ul>
<li>键值对储存 IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。</li>
<li>异步 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。</li>
<li>支持事务 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。</li>
<li>同源限制 IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。</li>
<li>支持二进制储存 IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象。</li>
<li>储存空间大 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。<strong>储 存 在 电 脑 上 中 的 位 置 为 C:\Users\当 前 的 登 录 用 户\AppData\Local\Google\Chrome\User Data\Default\IndexedDB</strong> <a name="user-content-N3oQ2" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></li>
</ul>


## 核心概念

            
<ul>
<li>数据库：IDBDatabase 对象，数据库有版本概念，同一时刻只能有一个版本，每个域名可以建多个数据库</li>
<li>对象仓库：IDBObjectStore 对象，类似于关系型数据库的表格</li>
<li>索引： IDBIndex 对象，可以在对象仓库中，为不同的属性建立索引，主键建立默认索引</li>
<li>事务： IDBTransaction 对象，增删改查都需要通过事务来完成，事务对象提供了error,abord,complete三个回调方法，监听操作结果</li>
<li>操作请求：IDBRequest 对象</li>
<li>指针： IDBCursor 对象</li>
<li>主键集合：IDBKeyRange 对象，主键是默认建立索引的属性，可以取当前层级的某个属性，也可以指定下一层对象的属性，还可以是一个递增的整数</li>
</ul>


# indexedDB使用

            


## 基础操作

            


### 1. 创建数据库 &amp; 新建表和索引

            


```typescript
/*
 *@databaseName 数据仓库的名字
 *@version 数据仓库的版本
 *@databaseName 数据仓库的名字
 */

var request = window.indexedDB.open('group', 1);

/*
 *数据仓库打开失败
 */
request.onerror = function(error) {
  console.log('IndexedDB 打开失败', error);
};

/*
 *数据仓库打开成功
 */
request.onsuccess = function(res) {
  console.log('IndexedDB 打开成功', res);
  db = res.target.result;
};

/*
 *数据仓库升级事件(第一次新建库是也会触发，因为数据仓库从无到有算是升级了一次)
 */
request.onupgradeneeded = function(res) {
  console.log('IndexedDB 升级成功', res);
  db = res.target.result;
  db_table = db.createObjectStore('group', { keyPath: 'id' });
  db_table.createIndex('indexName', 'name', { unique: false });
};

```




### 

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81fea5fff40c4cba8dfc95a5876c6c34~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"> <a name="user-content-rRGST" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 2.  新增数据

            


```typescript
/*
 *新建事务
 *@params 数据仓库的数组
 *@params 写入模式
 */
var store = db.transaction(['group'], 'readwrite').objectStore('group');

/*
 *add方法添加数据
 *@params 需要添加的数据信息
 */
var request = store.add({
  id: new Date().getTime(),
  name: '王二',
  age: 12,
  email: 'XXXX@xxx.com',
});

/*
 *添加成功
 */
request.onsuccess = function(event) {
  console.log('数据添加成功', event);
};

/*
 *添加失败
 */
request.onerror = function(event) {
  console.log('数据添加失败', event);
};

```




### 

            


### 

            


### 3.  读取数据

            


```typescript

/*
 *新建事务
 *@params 数据仓库的数组
 */
var store = db.transaction(['group']).objectStore('group');

/*
 *get方法获取数据
 *@params 数据的主键
 */
var request = store.get(1678664831491);

/*
 *获取成功
 */
request.onsuccess = function(event) {
  if (event.target.result) {
    console.log('数据获取成功', event.target.result);
  } else {
    console.log('未获取到数据');
  }
};

/*
 *获取失败
 */
request.onerror = function(event) {
  console.log('数据获取失败', event);
};


```




### 

            


### 4.  更新数据

            


```typescript
/*
 *新建事务
 *@params 数据仓库的数组
 *@params 写入模式
 */
var store = db.transaction(['group'], 'readwrite').objectStore('group');

/*
 *put方法根据主键更新数据
 *@params 数据的主键
 */
var request = store.put({
  id: 1678664831491,
  name: '张一' + Math.random(),
  age: 24,
  email: 'zhangsan@example.com',
});

/*
 *更新成功
 */
request.onsuccess = function(event) {
  console.log('数据更新成功', event);
};

/*
 *更新失败
 */
request.onerror = function(event) {
  console.log('数据更新失败', event);
};



```




#### 未加 readwrite, 会抛错，修改数据失败

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f18772e033041cfaa61d26c92039bf8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b26fcbc3d447466f8b6d07d14892d69a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>


### 

            


### 

            


### 5.  删除数据

            


```typescript
/*
*新建事务
*@params 数据仓库的数组
*/
var store = db.transaction(['group'], 'readwrite').objectStore('group');

/*
*delete方法删除数据
*@params 数据的主键
*/
var request = store.delete(1678664831491); 

/*
*删除成功
*/
request.onsuccess = function (event) {
    console.log('数据删除成功',event);
};

/*
*删除失败
*/
request.onerror = function (event) {
    console.log('数据删除失败',event);
};

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89e3d6abbcca4efe888505747c90a3ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"><br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14f700d7bec24159b214762dd3184baa~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"> <a name="user-content-EFczR" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 6.  使用索引

            


```typescript
/*
*新建事务
*@params 数据仓库的数组
*/
var store = db.transaction(['group']).objectStore('group');

/*
*index方法获取索引对象
*get方法获取数据
*@params 数据的索引
*/
var request = store.index('indexName').get('张四'); 

/*
*获取成功
*/
request.onsuccess = function (event) {
     console.log('通过索引获取数据成功',event.target.result);
};

/*
*获取失败
*/
request.onerror = function (event) {
    console.log('通过索引获取数据失败',event);
};


```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e19b48f9aefc4033b2d905af3ea8f7a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"> <a name="user-content-Xqb2n" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 

            


### 7.  获取整张表所有的data

            


```typescript

var store = db.transaction(['group']).objectStore('group');
var request = store.getAll();

/*
 *更新成功
 */
request.onsuccess = function(event) {
  console.log('indexedDB getAll:', event.target.result);
};

/*
 *更新失败
 */
request.onerror = function(event) {
  console.log('indexedDB getAll:', event);
};

```




### 

            


### 8.  根据指定条件获取data

            
<p>首先让我们 来了解  <code>IDBKeyRange</code> 的API<br><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3cschool.cn%2Fjavascript_guide%2Fjavascript_guide-rcfy26a4.html%23toc9" target="_blank" title="https://www.w3cschool.cn/javascript_guide/javascript_guide-rcfy26a4.html#toc9" ref="nofollow noopener noreferrer">www.w3cschool.cn/javascript_…</a><br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9325c60d4a7740a785f87cc924a89084~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>


```typescript

var store = db.transaction(['group']).objectStore('group');
// 获取id名称小于当前时间的所有data
var request = store.getAll(IDBKeyRange.upperBound(+new Date()));

/*
 *更新成功
 */
request.onsuccess = function(event) {
  console.log('indexedDB getAll:', event.target.result);
};

/*
 *更新失败
 */
request.onerror = function(event) {
  console.log('indexedDB getAll:', event);
};


```




# 

            


## 业务中优雅使用

            
<blockquote>
<p>indexedDB 并非无底洞，可以无限存储。要考虑做定期删除等功能</p>
</blockquote>


### 1. 定期删除失效数据

            


#### 1. 首先我们创建数据的时候就以时间戳+失效时间来约定id规则

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c18e9e642a8944c4b784a3c2af451622~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"> <a name="user-content-b8pGR" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


#### 2. 再通过上面基础操作的getAll方法，获取指定条件的data，再遍历data，调用删除数据API

            


```javascript
var store = db.transaction(['group'], 'readwrite').objectStore('group');
var request = store.getAll(IDBKeyRange.upperBound(+new Date()));

/*
 *更新成功
 */
request.onsuccess = function(event) {
  console.log('indexedDB getAll:', event);
  console.log('indexedDB getAll:', event.target.result);
  const data = event.target.result;
  data.forEach(item =&gt; {
    console.log('删除数据', item);
    const deletRequest = store.delete(item.id);
    /*
     *删除成功
     */
    deletRequest.onsuccess = function(event) {
      console.log('数据删除成功', event);
    };


    /*
     *删除失败
     */
    deletRequest.onerror = function(event) {
      console.log('数据删除失败', event);
    };
  });
};


/*
 *更新失败
 */
request.onerror = function(event) {};

```


<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1fe08aa09fd4b54ac8aa09683bbef34~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"> <a name="user-content-kBrV3" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


#### 3. 我们把上述方法包装下每次打开页面，清空下失效数据。就可以实现一个定期删除失效数据的方法啦

            


### 2. 批量添加数据

            


```typescript

const TestData = [
    {
      event: 'NE-TEST1',
      level: 'warning',
      errorCode: 200,
      url: 'http://www.example.com',
      time: '2017/11/8 下午4:53:039',
      isUploaded: false
    },
    {
      event: 'NE-TEST2',
      msg: '测试2',
      level: 'error',
      errorCode: 1000,
      url: 'http://www.example.com',
      time: '2017/11/8 下午4:53:042',
      isUploaded: false
    },
    {
      event: 'NE-TEST3',
      msg: '测试3',
      level: 'info',
      errorCode: 3000,
      url: 'http://www.example.com',
      time: '2017/11/8 下午4:53:043',
      isUploaded: false
    },
    {
      event: 'NE-TEST4',
      mgs: '测试4',
      level: 'info',
      url: 'http://www.example.com',
      time: '2017/11/8 下午4:53:0423',
      isUploaded: false
    }
  ]

/**
* 添加数据
* @param {array} docs 要添加数据
* @param {string} objName 仓库名称
*/
function addData (docs, objName) {
    if (!(docs &amp;&amp; docs.length)) {
      throw new Error('docs must be a array!')
    }
    return openIndexedDB().then(db =&gt; {
      const tx = db.transaction([objName], 'readwrite')
      tx.oncomplete = e =&gt; {
        console.log('tx:addData onsuccess', e)
        return Promise.resolve(docs)
      }
      tx.onerror = e =&gt; {
        e.stopPropagation()
        console.error('tx:addData onerror', e.target.error)
        return Promise.reject(e.target.error)
      }
      tx.onabort = e =&gt; {
        console.warn('tx:addData abort', e.target)
        return Promise.reject(e.target.error)
      }
      const obj = tx.objectStore(objName)
      docs.forEach(doc =&gt; {
        const req = obj.add(doc)
        /**
         * NOTE:
         * request
         * 两个事件：
         * 1. success
         * 2. error
         */
        // req.onsuccess = e =&gt; console.log('obj:addData onsuccess', e.target)
        req.onerror = e =&gt; {
          console.error('obj:addData onerror', e.target.error)
        }
      })
    })
  }

  addData(TestData, OB_NAMES.UseKeyGenerator)
.then(() =&gt; addData(TestData, OB_NAMES.UseKeyPath))


```




# 结尾

            


## 一些封装好的库

            


### localforage  推荐 ⭐️⭐️⭐️⭐️⭐️ （我们当前业务就用的这个~）

            
<p>和<code>localsotrage</code>使用保持一致，更适合前端使用<br><a href="https://juejin.cn/post/6907615220517208078" target="_blank" title="https://juejin.cn/post/6907615220517208078">还在用localStorage?快来试试localForage吧！ - 掘金</a> <a name="user-content-D8jXS" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### IndexedDBWrapper 推荐  ⭐️⭐️⭐️

            


## 思考我们还可以用indexedDB做什么

            


### 1.  用户使用日志收集

            


#### 在做一些前端electron应用，webApp,我们可以定义一个log日志库，来收集用户日志，遇到问题时，可以让用户，打包上传到日志库，排查跟进解决用户反馈问题。

            


##### 定义日志上报结构

            


```javascript
// 定义log基本结构
const LogItem = {
	level: 'log' | 'info' | 'error' ...,
  tag: 'request' | 'system' | ‘video’ | 'audio' | 'domClick' ... ,
	msg: ...,  // any
  date: +new Date(),
	...
}

```




##### 导出所有数据，并上传

            
<p>此处就可以用上面的 <code>getAll </code>方法，获取该表所有数据，生成<code>json</code>打包上传到自己公司的日志库。</p>


### 2. request层封装，对不长更新接口缓存

            
<p>封装request方法，缓存请求接口，物理缓存数据~让页面接口数据加载飞起来 <a name="user-content-DbRcr" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


### 3. 大文件上传，分片，避免网络失败，刷新页面等导致中断问题

            
<p>文件切片后先存储到<code>indexedDB</code>库，动态更新上传状态，异常状况可取出再继续定位到未上传的切片继续上传 <a name="user-content-sUXlc" title="" ref="nofollow noopener noreferrer" href="https://link.juejin.cn?target="></a></p>


# 附言

            


## 参考文档

            
<blockquote>
<ul>
<li><a href="https://juejin.cn/post/6844903872067026951" target="_blank" title="https://juejin.cn/post/6844903872067026951">juejin.cn/post/684490…</a></li>
<li><a href="https://juejin.cn/post/6844903540213678093" target="_blank" title="https://juejin.cn/post/6844903540213678093">juejin.cn/post/684490…</a></li>
<li><a href="https://juejin.cn/post/6844903570005835789" target="_blank" title="https://juejin.cn/post/6844903570005835789">juejin.cn/post/684490…</a></li>
<li><a href="https://juejin.cn/post/6907615220517208078" target="_blank" title="https://juejin.cn/post/6907615220517208078">juejin.cn/post/690761…</a></li>
<li><a href="https://juejin.cn/post/7025911892056997924" target="_blank" title="https://juejin.cn/post/7025911892056997924">juejin.cn/post/702591…</a></li>
<li><a href="https://juejin.cn/post/6844904180616822797" target="_blank" title="https://juejin.cn/post/6844904180616822797">juejin.cn/post/684490…</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3DindexedDB" target="_blank" title="https://caniuse.com/?search=indexedDB" ref="nofollow noopener noreferrer">caniuse.com/?search=ind…</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3cschool.cn%2Fjavascript_guide%2Fjavascript_guide-rcfy26a4.html" target="_blank" title="https://www.w3cschool.cn/javascript_guide/javascript_guide-rcfy26a4.html" ref="nofollow noopener noreferrer">www.w3cschool.cn/javascript_…</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3cschool.cn%2Fjavascript_guide%2Fjavascript_guide-rcfy26a4.html%23toc9" target="_blank" title="https://www.w3cschool.cn/javascript_guide/javascript_guide-rcfy26a4.html#toc9" ref="nofollow noopener noreferrer">www.w3cschool.cn/javascript_…</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FIDBObjectStore%2Ftransaction" target="_blank" title="https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/transaction" ref="nofollow noopener noreferrer">developer.mozilla.org/en-US/docs/…</a></li>
</ul>
</blockquote></div>
