---
date: 2020-04-16 11:30 
config: {
    top: false,
    dir: false,
    tag: ['vue'],
    valine: true,
    valineId: /blog/vue/VueDocumentWindowError.html
}
title : Vue打包抛出document/window报错
---

打包代码时遇到了这个报错


<blockquote>
<p>
window is not defined,document is not defined
</p>
</blockquote>

在本地测试时没有任何问题，打包却产生了这个错误。

原因是：在<code class="default">created</code>生命周期内，不能写关于<code class="default">window</code>和<code class="default">document</code>的操作，原理我还没找到。

建议写在<code class="default">mounted</code>生命周期内