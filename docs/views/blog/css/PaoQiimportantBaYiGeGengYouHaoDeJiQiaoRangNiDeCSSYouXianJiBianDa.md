---
title: 抛弃 `!important` 吧，一个更友好的技巧让你的 CSS 优先级变大
date: 2025/03/04 11:51:52
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","css"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7411686792342618153)

<div class="article-viewer markdown-body cache result"><p><img src="https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/43e6962160aa4d7fb6adb03e850bcf03~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTGVnZW5kODBz:q75.awebp?rk3s=f64ab15b&amp;x-expires=1741319088&amp;x-signature=4oGcG%2BmXNoqAP0IUKWSGCJHFpQw%3D" alt="image.png" loading="lazy"></p>
<blockquote>
<p>作者：James Nash</p>
<p>译者：legend80s@JavaScript与编程艺术</p>
</blockquote>
<p>在一个理想的世界里，我们的 CSS 代码组织得井井有条，易于维护。然而，现实往往大相径庭。你的 CSS 代码是完美的，但其他人那些烦人的 CSS 可能会与你的风格冲突，或者应用了你不需要的样式。</p>
<p>此外，你可能也无法修改那些 CSS。也许它来自你正在使用的 UI 库，也许是一些第三方的小组件。</p>
<p>更糟糕的是，HTML 也不受你控制，添加一些额外的 <code>class</code> 或 <code>id</code> 属性来覆盖样式也并不可行。</p>
<p>不知不觉中，你被卷入了一场 CSS 优先级之战。你的选择器需要优先于他们的选择器。开发者很容易被『诱惑 😈』去使用 <code>!important</code>，但你知道这是不好的实践，我们能不能有一种更优雅的方式来实现我们覆盖的诉求？</p>
<p>本文将教给你一个技巧，可以用一种不是很 hacky 的方式应对这些情况 👩‍💻。</p>


## 示例 🔮

            
<p>假设你正在开发一个网站，该网站有一个新闻订阅表单。它包含一个复选框，但复选框的位置有点偏。你需要修正这个问题，但注册表单是一个嵌入到页面上的第三方组件，你无法直接修改它的 CSS。</p>
<p>通过浏览器检查复选框，确定只要改变它的 <code>top</code> 位置即可。当前的位置是通过选择器<code>.newsletter .newsletter__checkbox .checkbox__icon</code> 设置的，它的权重为 <code>(0,3,0)</code>。</p>
<p><img src="https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5be0bb1713944901afc4a1dfa25cb70b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTGVnZW5kODBz:q75.awebp?rk3s=f64ab15b&amp;x-expires=1741319088&amp;x-signature=0S0glQNBhfI3zewWyqToRWZxJPg%3D" alt="image.png" loading="lazy"></p>
<p>一开始你可能会使用相同的选择器来修改 <code>top</code> 值：</p>


```css
/* 覆盖新闻通讯复选框的顶部位置 */
.newsletter .newsletter__checkbox .checkbox__icon {
  top: 5px;
}

```


<p>当 CSS 的顺序是固定的，并且你可以保证你的 CSS 规则一定在他们的后面的情况下，这足够了。因为『<strong>后来居上</strong>』：<em>即如果有多个相同的 CSS 选择器选择了同一个DOM元素，那么最后出现的将“获胜”</em>。</p>
<p>然而，大多数时候你无法保证代码顺序。此时你需要增加选择器的优先级。你可以在 DOM 中寻找一些额外的类名，一般从父元素中添加：</p>


```css
/* 更多的类名！权重现在是(0,4,0) */
.parent-thing .newsletter .newsletter__checkbox .checkbox__icon {
  top: 5px;
}

```


<p>或者你发现这个元素恰好是一个 <code>&lt;span&gt;</code>，可以将其加入选择器提高优先级：</p>


```css
/* 权重现在是 (0,3,1) */
.newsletter .newsletter__checkbox span.checkbox__icon {
  top: 5px;
}

```


<p>但所有这些方法都有副作用，都会使你的代码变得脆弱。如果 <code>.parent-thing</code> 突然不见了呢，比如你升级了某个外部依赖（比如 antd 😅）？或者如果 <code>.checkbox__icon</code> 从 <code>span</code> 改成了不同的元素怎么办？突然间，你的高优先级选择器什么也选不到了！</p>
<p>当浏览器计算 CSS 选择器优先级时，它们本质上是在计算你组合了多少 <code>ID</code>、<code>类</code>、<code>元素</code>或等效选择器。<strong>实际上可以多次重复同一个选择器，每次重复都会增加权重</strong>。<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fselectors-4%2F%23specificity-rules" target="_blank" title="https://www.w3.org/TR/selectors-4/#specificity-rules" ref="nofollow noopener noreferrer">CSS 选择器 Level 4 规范</a> 写到：</p>
<blockquote>
<p>CSS 选择器<strong>允许多次出现相同</strong>的简单选择器，而且可以增加权重。</p>
</blockquote>
<p>因此，你可以通过重复（三次、四次……）相同的选择器提高权重：</p>


```css
/* 双重 .checkbox__icon！权重现在是 (0,4,0) */
.newsletter .newsletter__checkbox .checkbox__icon.checkbox__icon {
  top: 5px;
}

```


<blockquote>
<p>注意 <code>.checkbox__icon.checkbox__icon</code> 中没有空格！它是<strong>一个</strong>选择器，因为你针对的是具有那个类的<strong>单个</strong>元素</p>
</blockquote>
<p>现在你可以简单地重复几次选择器来提升优先级！</p>
<blockquote>
<p>译者注：该技巧其实在 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fimportant%23!important_and_specificity" target="_blank" title="https://developer.mozilla.org/en-US/docs/Web/CSS/important#!important_and_specificity" ref="nofollow noopener noreferrer">MDN !important 章节</a> 有示例（以下示例重复了3次<code>#myElement</code>）：</p>


```css
#myElement#myElement#myElement .myClass.myClass p:hover {
 color: blue;
}

p {
 color: red !important;
}

```


</blockquote>


## 在 HTML 中重复 🚫

            
<p>注意，这个技巧只在 CSS 中有效！在 HTML 中重复相同的类名对优先级没有任何影响。</p>


```css
&lt;div class="badger badger badger"&gt;
  Mushroom!
&lt;/div&gt;
&lt;style&gt;
  /* 权重仍然是 (0,1,0) 而非 (0,3,0)*/
  .badger {
    /* ... */
  }
&lt;/style&gt;

```




## 总结 🎯

            
<blockquote>
<p><strong>CSS 可以多次重复同一个选择器，每次重复都会增加权重 🏋️‍♂️</strong></p>
</blockquote>
<p>这种 CSS 技巧是否有点 hack？也许是。然而我认为它让我们：</p>
<ul>
<li>避免诉诸于 <code>!important</code></li>
<li>『就近原则』提高可读性：重复多次的选择器，这样代码的意图对读者来说更清晰</li>
<li>这种模式让你很容易在代码中找到其他人的 CSS 覆盖，如果不再需要我们可以放心删除</li>
</ul>
<p>只要你不过度使用它，我认为这是一个完全合法且 Robust 的技巧至少相比我们之前学会的所有技巧，下次处理棘手的覆盖三方样式情况时可以考虑用一用。</p>
<p>是否还有更好的解决办法？其实有，<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fimportant%23best_practices" target="_blank" title="https://developer.mozilla.org/en-US/docs/Web/CSS/important#best_practices" ref="nofollow noopener noreferrer">@layer</a> 是官方推荐的最佳实践但是兼容性不好 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2F%40layer%23browser_compatibility" target="_blank" title="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer#browser_compatibility" ref="nofollow noopener noreferrer">Chrome&gt;=99</a>，而且使用场景有限。</p>
</div>
