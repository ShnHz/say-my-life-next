---
title: 2022年CSS都有哪些更新？
date: 2023/04/18 22:06:29
summary:
config:
  {
    show: true,
    top: false,
    dir: true,
    dirTag: ['h3', 'h4', 'h5'],
    tag: ['css', 'info'],
    valine: true,
    valineId,
  }
password: false
outline: [3, 5]
---

###### 原文 [掘金](https://juejin.cn/post/7189080429293977658)

<div class="markdown-body cache"><p>2022 年 CSS 新增了很多特性，例如容器查询、父选择器、子网格、级联层、新视口单位等，多项期待已久的功能已集成到常青浏览器（自动升级到最新版本的浏览器，包括 Chrome、Edge、Firefox 和 Safari）中。下面就来看看 2022 年 CSS 新增的 10 个实用功能！</p>

### 1. 颜色相关

<p>下面来看看和 CSS 颜色相关的一些更新。CSS 工作组有两个新规范将改变我们在 Web 上使用颜色的方式：<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-color-4%2F" target="_blank" title="https://www.w3.org/TR/css-color-4/" ref="nofollow noopener noreferrer">CSS Color Module Level 4</a>（候选推荐）和 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-color-5%2F" target="_blank" title="https://www.w3.org/TR/css-color-5/" ref="nofollow noopener noreferrer">CSS Color Module Level 5</a>（工作草案）。两者仍处于实验阶段，截至 2022 年 12 月，只有 Safari 已实现。</p>

#### （1）新颜色函数语法

<p>CSS Color Module Level 4 引入了颜色函数的新语法，例如<code>rgb()</code>和<code>hsl()</code>。新语法省略了逗号，依靠空格来分隔颜色空间的每个通道。它还支持可选的 alpha 参数，从而不再需要额外的颜色函数，例如<code>rgba()</code>和<code>hsla()</code>。逗号分隔的形式现在被规范称为“遗留语法”。</p>

```css
/* 遗留语法 */
background-color: hsl(270, 50%, 40%);
color: hsla(0, 0%, 100%, 50%);

/* 新语法 */
background-color: hsl(270 50% 40%);
color: hsl(0 0% 100% / 50%);
```

#### （2）新色彩空间

<p>新的颜色规范为网络添加了大量新的颜色空间：</p>
<ul>
<li>HWB：色调、白度、黑度</li>
<li>LCH：亮度、色度、色调</li>
<li>CIE L * a * b*</li>
<li>Oklab</li>
<li>Oklch</li>
<li>Display P3</li>
</ul>
<p>这只是新增的颜色空间的一部分，其中一些色彩空间，比如 Display P3，提供了比 sRGB 空间更宽的色域，这意味着我们将可以使用更多颜色，并且这些颜色将比一直使用的颜色更鲜艳。</p>

#### （3）相对颜色语法

<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-color-5%2F" target="_blank" title="https://www.w3.org/TR/css-color-5/" ref="nofollow noopener noreferrer">CSS Color Module Level 5</a> 通过引入相对颜色语法进一步增强了颜色函数。。 此语法可以基于另一种颜色定义新颜色。可以通过首先使用 from 关键字定义原色，然后像往常一样在颜色函数中指定新颜色的通道来使用它。</p>
<p>当提供原始颜色时，可以访问“通道关键字”，允许引用颜色空间中的每个通道。 关键字根据使用的颜色函数而变化。 对于 rgb()，有 r、g 和 b 通道关键字； 对于 oklch()，将拥有 l、c 和 h 关键字。 对于每个颜色函数，还有一个 alpha 通道关键字，它是原始颜色的 alpha 通道。</p>
<p>可以在 <code>calc()</code> 表达式中使用这些通道关键字来修改原始颜色：</p>

```css
/* 去色处理 */
rgb(from tomato calc(r - 20) calc(g - 20) calc(b - 20));

/* 半透明处理 */
rgb(from tomato r g b / 50%)

/* 在 oklch 中使颜色变暗 */
oklch(from tomato calc(l - 0.1) c h);

```

<p>除此之外，还可以跨颜色空间定义相对颜色。当使用一个空间中最初定义的颜色并使用不同的颜色空间定义新颜色时，浏览器将首先将原始颜色转换为新的颜色空间。</p>
<p>下面使用 Oklch 通过将色调旋转 120°（⅓ 圈）来定义基于 sRGB 中定义的原色的二次色：</p>

```css
--primary: #005f73;
--secondary: oklch(from var(--primary) l c calc(h + 120));
```

#### （4）color-mix()

<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-color-5%2F" target="_blank" title="https://www.w3.org/TR/css-color-5/" ref="nofollow noopener noreferrer">CSS Color Module Level 5</a>  规范还引入了一个 <code>color-mix()</code> 函数，允许在不同的颜色空间中混合颜色。</p>

```css
color-mix(in lch, purple 50%, plum 50%)

```

<p>上面代码中，会产生 50-50 的紫色和紫红色混合。</p>

### 2. 全新动态视口单位

<p>新增的 CSS 视口单元用于处理带有动态工具栏的移动视口。</p>
<p>要想调整与视口一样大的尺寸，可以使用现有的视口单位 vw 和 vh：</p>
<ul>
<li>vw：视口大小宽度的 1%；</li>
<li>vh：视口大小高度的 1%；</li>
</ul>
<p>下面元素的宽度为 100vw，高度为 100vh，它将完全覆盖整个视口：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89771b999fd84613a6f8b334b5d7f912~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>除了 vh 和 vw，还有：</p>
<ul>
<li>vmin：vw或vh中的较小者。</li>
<li>vmax：vw或vh中的较大者。</li>
</ul>
<p>这些单位在浏览器中都得到了很好的支持。虽然这些单位在桌面浏览器上运行良好，但在移动浏览器上就会存在一些问题，视口大小受动态工具栏存在与否的影响。这些是用户界面，例如地址栏和标签栏等。尽管视口大小可以更改，但 vw 和 vh 大小不会。因此，尺寸为 100vh 高的元素会从视口中溢出。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e4cc3a67bd94bf2aba1d7e8cfe0db42~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>当向下滚动时，这些动态工具栏将缩回。在这种状态下，尺寸为 100vh 高的元素将覆盖整个视口。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fab695a42974fd1af1485c3c076a47f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>为了解决这个问题，CSS 工作组规定了视口的各种状态：</p>
<ul>
<li><strong>大视口</strong>：视口大小假设任何动态扩展和缩回的 UA 接口被缩回。</li>
<li><strong>小视口</strong>：视口大小假设任何动态扩展和缩回的 UA 接口都可以扩展。</li>
</ul>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/deea110285e347eca02320f62ca7c9a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>新视口也有指定的单位：</p>
<ul>
<li>大视口的单位带有 lv 前缀，单位为 lvw、lvh、lvi、lvb、lvmin 和 lvmax。</li>
<li>小视口的单位带有 sv 前缀，单位是 svw、svh、svi、svb、svmin 和 svmax。</li>
</ul>
<p>除非调整视口本身的大小，否则这些视口百分比单位的大小是固定的。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fba1f4f0d2d4159bf89c46ec0e0832c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>除了大视口和小视口之外，还有一个动态视口，动态考虑了浏览器 UI：</p>
<ul>
<li>当动态工具栏展开时，动态视口等于小视口的大小。</li>
<li>当动态工具栏缩回时，动态视口等于大视口的大小。</li>
</ul>
<p>它的单位带有 dv 前缀：dvw、dvh、dvi、dvb、dvmin 和 dvmax。它们的尺寸在对应的 lv* 和 sv* 之间。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59477b7c6adb44b8bca0a9559f7429b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>浏览器对这些单位的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9798abdcd93f405b8dd37395ba76b840~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<blockquote>
<p>参考：<a href="https://link.juejin.cn?target=https%3A%2F%2Fweb.dev%2Fviewport-units%2F" target="_blank" title="https://web.dev/viewport-units/" ref="nofollow noopener noreferrer">web.dev/viewport-un…</a></p>
</blockquote>

### 3. @container：容器查询

<p>CSS 容器查询是一种超越与视口相关的媒体查询的方法，而可以根据元素所在的容器修改元素的行为，不仅是依赖视口大小来更改元素的样式。</p>
<p>想要使用容器查询，首先需要在容器上定义 <code>container-type</code></p>

```css
main {
  container-type: inline-size;
}
```

<p>还可以使用 <code>container-name</code> 来命名容器，如果有多层容器，这将很有用，这样就可以更明确地了解哪些查询会影响元素。<code>type</code> 和 <code>name</code> 都可以使用简写的 <code>container</code> 属性来定义，其中 <code>name</code> 在前，并通过正斜杠与 <code>type</code> 分隔。</p>

```css
.main {
  container: main / inline-size;
}
```

<p>然后就可以使用<code>@container</code>开始查询了。一旦满足该条件，CSS 将应用于该容器内的元素。</p>
<p>最后来看一个实际的应用：</p>

```html
<main class="container">
  <article>...</article>
  <article>...</article>
  <article>...</article>
</main>
```

<p>现在就可以设置一个容器查询来更改文章样式及其任何后代的样式，这将基于 <code>main</code> 的宽度，因为它是容器元素。</p>

```css
article {
  padding: 1rem;
  font-size: 1rem;
}

@container (min-width: 60ch) {
  article {
    padding: 2rem;
    font-size: 1.25rem;
  }
}
```

<p>这样，当文章的宽度小于 60ch 时，就会采用更小的 <code>padding</code> 和 <code>font-size</code> 值。</p>
<p>浏览器对容器查询的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f3bc991cb684dd3ae477c87a4ddf97e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>

### 4. @layer：级联层

<p>在 2022 年 2 月/3 月，所有现代浏览器都发布了 Cascade Layers（级联层），可以用来控制选择器如何交互，而不管它们的特殊性或代码顺序。下面来看一个例子：</p>

```css
@layer default, theme, state;

@layer default {
  button {
    background: rebeccapurple;
    color: white;
  }
}

@layer state {
  :disabled {
    background: dimgray;
  }
}

@layer theme {
  button.danger {
    background: maroon;
  }

  button.info {
    background: darkslateblue;
  }

  #call-to-action {
    background: mediumvioletred;
  }
}
```

<p><code>@layer</code> 声明了一个_级联层_，同一层内的规则将级联在一起，这给予了开发者对层叠机制的更多控制。</p>
<p>上面例子中定义了多个级联层，当一个声明中具有多个级联层时，后定义的级联层具有更高的优先级。因此上面例子中，<code>state</code> 层具有更高的优先级，即使 theme 样式中具有更高的特定性（权重）并且在代码中出现得更晚。</p>
<p>我们还可以嵌套图层：</p>

```css
@layer reset, framework, components, utilities;

@layer components {
  @layer default, theme, state;

  @layer state {
    /* components.state 层 */
    :disabled {
      background: dimgray;
    }
  }
}

@layer components.state {
  /* components.state 层 */
  :focus-visible {
    outline: thin dashed hotpink;
  }
}
```

<p>层按照每个层名称首次出现在代码库中的顺序堆叠，后面的层名称优先于前面的层。这意味着可以允许它们隐式堆叠：</p>

```css
@layer low {
  /* 最低层 */
}
@layer medium {
  /* 中间层 */
}
@layer high {
  /* 最高层 */
}
```

<p>或者可以像上面例子一样，按顺序引入层名称来明确定义层顺序：</p>

```css
@layer low, medium, high;
```

<p>浏览器对级联层的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93e9baa46d66462dad5fd464ecffbe61~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>可以看到，目前主流浏览器都支持 CSS 级联层功能。</p>

### 5. :has：父选择器

<p><code>:has()</code>选择器可以检查父元素中是否存在特定的元素。例如，如果一个卡片组件中有图片，就给它添加一个<code>display:flex</code>。这以前在 CSS 中是无法实现的，但是新的 <code>:has()</code> 选择器就可以帮助我们选择包含特定元素的父元素。</p>
<p>在CSS中，我们无法根据元素中是否存在特定的元素来设置父元素的样式，要想实现这一点，就必须创建CSS类，并根据需要进行类的切换。来看下面的例子：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d32d15de540400495b475305c93c934~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>这里我们有两种卡片：包含图片和不包含图片。在CSS中需要这样做：</p>

```css
/* 有图片的卡片 */
.card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 没有图片的卡片 */
.card-plain {
  display: block;
  border-top: 3px solid #7c93e9;
}
```

```html
<!-- 有图片的卡片 -->
<div class="card">
  <div class="card-image">
    <img
      src="awameh.jpg"
      alt=""
    />
  </div>
  <div class="card-content">卡片内容</div>
</div>

<!-- 没有图片的卡片 -->
<div class="card card-plain">
  <div class="card-content">卡片内容</div>
</div>
```

<p>这里创建了一个类<code>card-plain</code>，专门用于没有图片的卡片，在没有图片时就不需要<code>flex</code>布局。如果使用 CSS 中的父选择器 <code>:has</code> 就不需要再写这个类，只需要使用它来检查卡片中是否包含<code>.card-image</code>即可：</p>

```css
.card:has(.card-image) {
  display: flex;
  align-items: center;
}
```

<p><strong>根据 CSS 规范，</strong><code>**:has()**</code>** 选择器可以检查父元素是否包含至少一个元素，或者一个条件，例如输入是否获取到焦点。**</p>
<p><code>:has()</code> 选择器不仅可以检查父元素是否包含特定的子元素，还可以检查一个元素后面是否跟有另一个元素：</p>

```css
.card h2:has(+ p) {
}
```

<p>这将检查 <code>&lt;h2&gt;</code> 元素是否直接跟在 <code>&lt;p&gt;</code> 元素之后。</p>
<p>我们也可以将它与表单元素一起使用来检查输入是否获取到了焦点：</p>

```css
form:has(input:focused) {
  background-color: lightgrey;
}
```

<p>浏览器对 <code>:has()</code> 的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7411d37cf1343429df58df7308c4586~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>可以看到，最新版的 Chrome、Edge、Safari 都已经支持了 <code>:has()</code> 选择器，而 Firfox 目前还不支持</p>

### 6. :focus-visible：更有针对性的焦点样式

<p><code>:focus-visible</code> 是一个现代CSS 焦点选择器。今年 3 月，Safari 15.4 发布了 <code>:focus-visible</code> 伪类，不久之后，它成为常青浏览器中使用的默认元素焦点行为。</p>
<p>当元素匹配<code>:focus</code>伪类并且客户端的启发式引擎决定焦点应当可见 (在这种情况下很多浏览器默认显示“焦点框”。) 时，:<code>focus-visible</code> 伪类将生效。</p>
<blockquote>
<p>注意：Firefox 需要通过较旧的前缀伪类 :-moz-focusring 来支持类似的功能。</p>
</blockquote>
<p>下面来看一个例子，<code>:focus-visible</code> 选择器利用客户端的行为决定是否匹配。当使用鼠标点击控件和用键盘 tab 切换控件时会有所不同。</p>

```html
<input value="默认样式s" /><br />
<button>默认样式</button><br />
<input
  class="focus-only"
  value=":focus"
/><br />
<button class="focus-only">:focus</button><br />
<input
  class="focus-visible-only"
  value=":focus-visible"
/><br />
<button class="focus-visible-only">:focus-visible</button>
```

```css
.focus-only:focus {
  outline: 2px solid black;
}

.focus-visible-only:focus-visible {
  outline: 4px dashed darkorange;
}
```

<p>效果如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4c90a7edbe340cdadd795fbcc198337~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>这段代码的表现如下：</p>
<ul>
<li><strong>默认样式</strong>：使用键盘控制时，input和button的边框都是细蓝色的；使用鼠标控制时，input的边框是细蓝色的，button的边框是细黑色的；</li>
<li><code>:focus</code>：无论使用鼠标控制还是键盘控制，input和button的边框都是粗黑色的；</li>
<li><code>:focus-visible</code>：使用键盘控制时，input和button的边框都是粗橙色的；使用鼠标控制时，input的边框是粗橙色的，button的边框是细黑色的；</li>
</ul>
<p>使用这个伪类，就可以有效地根据用户的输入方式 (鼠标 or 键盘) 来展示不同形式的焦点。</p>
<p>浏览器对 <code>:focus-visible</code> 的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e72d6eb68994bb5a23a8e015477836f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>可以看到，目前主流浏览器都已经支持 <code>:focus-visible</code>。</p>

### 7. color-scheme：适应操作系统暗/亮模式

<p><code>color-scheme</code> 是一个 CSS 属性，当用户选择系统配色方案时（系统配色方案的常见选择是“深色模式”和“浅色模式”），操作系统会对用户界面进行调整。这包括表单控件、滚动条和 CSS 系统颜色的使用值。</p>

```css
:root {
  color-scheme: light dark;
}
```

<p>当把上面的代码复制到样式表中，页面就会根据操作系统的设置的暗/亮模式来显示不同的样式：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fa200c26a434d5fba15a669587c0c3c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>可以看到，当切换系统配色模式时，文字颜色，背景颜色，以及表单（滚动条、选择下拉框、单选框、复选框、输入框等）样式都发生了变化，这样就省去了我们很多两种模式下的样式定义工作。</p>
<p>通常，属性的值是以下几种：</p>

```css
color-scheme: normal;
color-scheme: light;
color-scheme: dark;
color-scheme: light dark;
```

<p>其中：</p>
<ul>
<li><code>normal</code>：表示元素未指定任何配色方案，因此应使用浏览器的默认配色方案呈现。</li>
<li><code>light</code>：表示可以使用操作系统亮色配色方案渲染元素。</li>
<li><code>dark</code>：表示可以使用操作系统深色配色方案渲染元素。</li>
</ul>
<p>需要注意，当<code>light</code>和<code>right</code>都有时，需要<code>light</code>在前，<code>right</code>在后。要想将整个页面配置为用户的配色方案首选项，就可以像上面一样，在 <code>:root</code> 元素上指定 <code>color-scheme</code>。</p>
<p>我们甚至可以仅在 HTML 中就可以获得深色模式：</p>

```html
<head>
  <meta
    name="color-scheme"
    content="light dark"
  />
</head>
```

<p>浏览器对 <code>color-scheme</code> 的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7058f82c609b42879c89c58a05ebcbd8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>

### 8. accent-color：自定义表单控件颜色

<p><code>accent-color </code>属性可以在不改变浏览器默认表单组件基本样式的前提下重置组件的颜色。该属性目前支持以下 HTML 控件元素：</p>
<ul>
<li>复选框：<code>&lt;input type=”checkbox”&gt;</code></li>
<li>单选框：<code>&lt;input type=”radio”&gt;</code></li>
<li>范围选择框：<code>&lt;input type=”range”&gt;</code></li>
<li>进度条：<code>&lt;progress&gt;</code></li>
</ul>
<p>下面来看一个例子：</p>

```html
<form>
  <label>
    <input
      type="radio"
      name="radios"
      checked
    />
    单选选中
  </label>
  <label>
    <input
      type="radio"
      name="radios"
    />
    单选未选中
  </label>
  <label>
    <input
      type="checkbox"
      checked
    />
    多选选中
  </label>
  <label>
    <input type="checkbox" />
    多选未选中
  </label>
  <label>
    <input type="range" />
    范围
  </label>
  <label>
    <progress
      max="100"
      value="80"
    >
      80%
    </progress>
    进度条
  </label>
</form>
```

```css
:root {
  accent-color: firebrick;
}

[type='radio'],
[type='checkbox'] {
  font-size: inherit;
  width: 0.75em;
  height: 0.75em;
}

progress,
[type='range'] {
  font-size: inherit;
  width: 10ch;
}
```

<p>效果如下：
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd5517bfaaa4423980c81c69bce88051~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy">
可以看到，这些表单元素都变成我们定义的颜色。</p>
<p>需要注意，如果给表单元素设置了自定义样式，那 <code>accent-color</code> 就可能会失效。例如，将进度条的 border 设置为蓝色：</p>

```css
progress {
  border: blue;
}
```

<p>样式会是下面这样，其并不符合预期（进度条边框为蓝色），出现了意料之外的效果。所以，如果使用了 <code>accent-color</code> 定义表单样式，就要尽量避免再给表单元素自定义其他样式：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b680a8b9004042929c5291989c8f7396~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>浏览器对 <code>accent-color</code> 的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cffa0fee3b6d4745bc3ce289ef10dadc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>

### 9. scale、rotate、translate：更细粒度的变换控制

<p>2022 年 8 月，Chromium 完成了使用单个 <code>rotate</code>, <code>scale</code>, <code>translate</code> 属性来对 CSS 变换进行更细粒度的控制</p>
<p>要想在 CSS 中使用变换，需要使用 <code>transform</code> 属性，该属性接受一个或多个 <code>&lt;transform-function&gt;</code>：</p>

```css
.target {
  transform: translateX(50%) rotate(30deg) scale(1.2);
}
```

<p>在上面的代码中，目标元素会在 X 轴上平移 50%，旋转 30 度，最后放大到 120%。虽然这样 transform 属性可以正常工作，但当想要单独更改这些值中的任何一个时，就会比较麻烦。</p>
<p>比如，想要在鼠标悬浮时更改 <code>scale</code> 的大小，就需要将 <code>transform</code> 属性中的所有函数都复制一遍，即使它们的值保持不变。</p>

```css
.target:hover {
  transform: translateX(50%) rotate(30deg) scale(2);
}
```

<p>而在 Chrome 104 中，就可以使用<code>rotate</code>, <code>scale</code>, <code>translate</code> 属性来单独定义变换的这些部分。使用这些属性来重写前面的变换示例：</p>

```css
.target {
  translate: 50% 0;
  rotate: 30deg;
  scale: 1.2;
}
```

<p>这样，如果想在某些情况下单独修改每个属性时，就不需要再复制其他没有变化的属性。</p>
<p>原始的 CSS 变换属性和新属性之间的一个主要区别是应用声明的变换顺序：</p>
<ul>
<li>使用 <code>transform</code> 时，变换函数会按照它们编写的顺序，从左到右；</li>
<li>使用单独的变换属性时，顺序不是声明的顺序。而始终是：首先平移，然后旋转，最后缩放。</li>
</ul>
<p>这意味着以下两端代码的执行结果是一样的：</p>

```css
.transform-individual {
  translate: 50% 0;
  rotate: 30deg;
  scale: 1.2;
}

.transform-individual-alt {
  rotate: 30deg;
  translate: 50% 0;
  scale: 1.2;
}
```

<p>在这两种情况下，目标元素都会首先在 X 轴上平移 50%，然后旋转 30 度，最后缩放 1.2。</p>
<p>如果其中一个单独的变换属性与 <code>transform</code> 属性一起声明，则首先应用单独的变换（<code>rotate</code>, <code>scale</code>, <code>translate</code>），最后应用 <code>transform</code>。</p>
<p>浏览器对 <code>rotate</code>, <code>scale</code>, <code>translate</code> 的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c904baee7fa34297ab8e557f1af59127~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>

## 10. subgrid：子网格

<p>subgrid 允许元素在行轴或列轴上继承其父元素的网格，主要解决当网格嵌套网格时，子网格的位置和轨道不能和父网格对齐的问题。使用子网格时，需要让 <code>grid-template-columns</code> 和 <code>grid-template-rows</code> 属性的值使用 <code>subgrid</code> 关键字。</p>
<ul>
<li><code>grid-template-rows</code>：基于网格行维度，定义网格线的名称和网格轨道的尺寸大小。</li>
<li><code>grid-template-columns</code>：基于网格列维度，定义网格线的名称和网格轨道的尺寸大小。</li>
</ul>
<p>下面来看一个例子，有一个嵌套网格，它正在为行和列创建自己的轨道。这些轨道是独立的，因此不会与父网格上的轨道对齐。</p>

```html
<div class="grid">
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="subgrid">
    <div class="child"></div>
    <div class="child"></div>
  </div>
</div>
```

```css
.subgrid {
  grid-column: auto / span 3;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  max-width: 800px;
  margin: 2em auto;
  gap: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
}

.grid &gt;
div {
  background-color: #2b3745;
  padding: 10px;
}

.subgrid &gt;
div {
  background-color: #d9d9e5;
}
```

<p>上面代码的效果如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32434aa925b943c89e2f3d1ae99cd6ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>下面将 <code>grid-template-columns</code> 的轨道列表替换为 <code>subgrid</code> 关键字。嵌套网格的列轨道现在与父级上的列轨道对齐。</p>

```css
.subgrid {
  grid-template-columns: subgrid;
}
```

<p>更改完之后的效果如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d5f9a3abfae4d159d3858d8309a2939~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>只要父级本身就是一个网格，就可以继续将子网格继承到子级中。以下示例显示了三个网格，每个网格都嵌套在另一个网格中，并继承了其父级的轨道。子项指示哪个网格是它们的父项。</p>

```html
<div class="one">
  <div class="child">Parent one</div>
  <div class="two">
    <div class="child">Parent two</div>
    <div class="three">
      <div class="child">Parent three</div>
    </div>
  </div>
</div>
```

```css
.one {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  max-width: 800px;
  margin: 2em auto;
  gap: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
}

.two {
  grid-column: 2 / 8;
  grid-row: 2;
  display: grid;
  grid-template-columns: subgrid;
  border: 2px solid #96060a;
}

.three {
  display: grid;
  grid-column: 2 / 6;
  grid-row: 2;
  grid-template-columns: subgrid;
  border: 2px solid #1c2e01;
}

.child {
  background-color: #2b3745;
  padding: 10px;
  color: #fff;
}
```

<p>使用 Firefox DevTools 突出显示每个网格，突出显示外部网格显示子网格和网格项如何与该网格对齐：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71fc34e91ea94cd6a625c03c2bbe6696~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p>
<p>浏览器对子网格的支持情况如下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9afaae3a6b934727a4e43c109b194bea~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="image.png" loading="lazy"></p></div>
