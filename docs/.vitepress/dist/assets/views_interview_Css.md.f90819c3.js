import{_ as a,c as s,o as l,V as t}from"./chunks/framework.f518e559.js";const F=JSON.parse('{"title":"CSS","description":"","frontmatter":{"title":"CSS","config":{"dir":true},"password":true},"headers":[],"relativePath":"views/interview/Css.md"}'),e={name:"views/interview/Css.md"},o=t(`<h3 id="css" tabindex="-1">CSS <a class="header-anchor" href="#css" aria-label="Permalink to &quot;CSS&quot;">​</a></h3><h4 id="_1-说一说样式优先级是怎么样的" tabindex="-1">1.说一说样式优先级是怎么样的？ <a class="header-anchor" href="#_1-说一说样式优先级是怎么样的" aria-label="Permalink to &quot;1.说一说样式优先级是怎么样的？&quot;">​</a></h4><p>!important -&gt; 行内样式 -&gt; id选择器 -&gt; 类选择器 -&gt; 属性选择器 -&gt; 伪类选择器 -&gt; 标签选择器 -&gt; 伪元素选择器 -&gt; 兄弟选择器 -&gt; 子选择器 -&gt; 后代选择器 -&gt; 通配符</p><table><thead><tr><th>选择器</th><th>权重</th><th>示例</th></tr></thead><tbody><tr><td>!important</td><td>10000</td><td></td></tr><tr><td>行内样式</td><td>1000</td><td></td></tr><tr><td>id选择器</td><td>100</td><td>#id</td></tr><tr><td>类选择器</td><td>10</td><td>.class</td></tr><tr><td>属性选择器</td><td>10</td><td>div[shuxing]</td></tr><tr><td>伪类选择器</td><td>10</td><td>:hover</td></tr><tr><td>标签选择器</td><td>1</td><td>div</td></tr><tr><td>伪元素选择器</td><td>1</td><td>:before</td></tr><tr><td>兄弟选择器</td><td>0</td><td>~</td></tr><tr><td>子选择器</td><td>0</td><td>&gt;</td></tr><tr><td>后代选择器</td><td>0</td><td>div p</td></tr><tr><td>相邻选择器</td><td>0</td><td>+</td></tr><tr><td>通配符</td><td>0</td><td>*</td></tr></tbody></table><h4 id="_2-垂直水平居中有几种方法" tabindex="-1">2.垂直水平居中有几种方法 <a class="header-anchor" href="#_2-垂直水平居中有几种方法" aria-label="Permalink to &quot;2.垂直水平居中有几种方法&quot;">​</a></h4><ul><li><code>display:flex;align-items:center;justify-content:center;</code>，不用知道元素宽高</li><li><code>display:grid;</code>，子元素<code>align-self:center;justify-self:center;</code>，不用知道元素宽高</li><li><code>left:50%;top:50%;transform: translate(-50%, -50%);</code>，不用知道元素宽高</li><li><code>left:50%;top:50%;margin-top:-元素高度/2;margin-left:-元素宽度/2;</code>，需要知道元素宽高</li><li><code>line-height:元素高度;text-align:center;</code>，需要知道元素高度，且只对行内元素/行内块元素/文字生效</li></ul><h4 id="_3-css-实现高度是宽度一半的盒子-可以等比例变化" tabindex="-1">3.css 实现高度是宽度一半的盒子，可以等比例变化 <a class="header-anchor" href="#_3-css-实现高度是宽度一半的盒子-可以等比例变化" aria-label="Permalink to &quot;3.css 实现高度是宽度一半的盒子，可以等比例变化&quot;">​</a></h4><p>利用<code>padding-bottom</code>我们就可以实现一个宽高比例固定的元素</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">wrapper</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">intrinsic-aspect-ratio-container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">wrapper</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">40vw</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">intrinsic-aspect-ratio-container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">padding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">padding-bottom</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">margin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> lightsalmon</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="_4-怪异盒模型和标准盒模型的区别" tabindex="-1">4.怪异盒模型和标准盒模型的区别? <a class="header-anchor" href="#_4-怪异盒模型和标准盒模型的区别" aria-label="Permalink to &quot;4.怪异盒模型和标准盒模型的区别?&quot;">​</a></h4><p>如何设置盒模型的类型呢，使用<code>box-sizing</code></p><p>w3c盒模型（标准盒模型）,当值为<code>border-box</code>时：</p><ul><li>元素的width包含了content/border/padding</li></ul><p>IE盒模型（怪异盒模型）,当值为<code>content-box</code>时：</p><ul><li>元素的width只包含content</li></ul><h4 id="_5-常见的css布局单位" tabindex="-1">5.常见的CSS布局单位？ <a class="header-anchor" href="#_5-常见的css布局单位" aria-label="Permalink to &quot;5.常见的CSS布局单位？&quot;">​</a></h4><ul><li>px 像素</li><li>% 百分比</li><li>vw vh 根据浏览器的宽度以及高度（0-100）</li><li>rem em，rem根据根元素的font-size来作为基准值，em根据父元素的font-size来作为基准值</li></ul><h4 id="_6-link和-import的区别" tabindex="-1">6.link和@import的区别？ <a class="header-anchor" href="#_6-link和-import的区别" aria-label="Permalink to &quot;6.link和@import的区别？&quot;">​</a></h4><ul><li>link是html标签，可以通过js来控制dom修改样式，@import是纯css的范畴</li><li>link在网页加载时同步进行加载，@import要在网页加载完成后开始加载</li><li>link没有兼容性问题，@import需要高版本的浏览器才可以兼容</li></ul><h4 id="_7-flex的属性有哪些" tabindex="-1">7.flex的属性有哪些？ <a class="header-anchor" href="#_7-flex的属性有哪些" aria-label="Permalink to &quot;7.flex的属性有哪些？&quot;">​</a></h4><p>此属性是以下 CSS 属性的简写：</p><ul><li>flex-grow 这个属性规定了该项在 flex 容器中分配剩余空间的相对比例</li><li>flex-shrink 属性指定了 flex 元素的收缩规则，在flex 元素的默认宽度之和大于容器的宽度时候，元素会发生收缩，其收缩的大小的依据是 flex-shrink 值</li><li>flex-basis 指定了 flex 元素在主轴方向上的初始大小</li></ul><h4 id="_8-如果flex-1-元素长度超出的话-会表现为什么样的状态" tabindex="-1">8.如果flex:1，元素长度超出的话，会表现为什么样的状态？ <a class="header-anchor" href="#_8-如果flex-1-元素长度超出的话-会表现为什么样的状态" aria-label="Permalink to &quot;8.如果flex:1，元素长度超出的话，会表现为什么样的状态？&quot;">​</a></h4><p>会将剩余的flex空间全部使用，收缩空间</p><h4 id="_9-如果三个flex-1-但是内容宽度都不一样-会呈现什么样的状态" tabindex="-1">9.如果三个flex:1，但是内容宽度都不一样，会呈现什么样的状态？ <a class="header-anchor" href="#_9-如果三个flex-1-但是内容宽度都不一样-会呈现什么样的状态" aria-label="Permalink to &quot;9.如果三个flex:1，但是内容宽度都不一样，会呈现什么样的状态？&quot;">​</a></h4><p>收缩空间</p><h4 id="_10-css是什么时候会开启硬件加速的" tabindex="-1">10.css是什么时候会开启硬件加速的？ <a class="header-anchor" href="#_10-css是什么时候会开启硬件加速的" aria-label="Permalink to &quot;10.css是什么时候会开启硬件加速的？&quot;">​</a></h4><p>检测到某个DOM元素可能会从中获益的时候才会应用硬件加速</p><ul><li>3D transform</li><li>opacity</li><li>video</li><li>canvas</li><li>will-change</li></ul><p>会增加内存消耗，消耗更多电量</p><h4 id="_11-css开启硬件加速的原理" tabindex="-1">11.css开启硬件加速的原理 <a class="header-anchor" href="#_11-css开启硬件加速的原理" aria-label="Permalink to &quot;11.css开启硬件加速的原理&quot;">​</a></h4><p>浏览器首先将页面解析成DOM树，DOM树和CSS让浏览器构建渲染树，渲染树包括渲染对象。每个渲染对象会被分配到一个图层中，每个图层会被更新到GPU中，</p><p>由于GPU中的transform等CSS属性不触发回流，单独处理，所以能大大提高网页的性能。</p><h4 id="_12-主题切换怎么实现" tabindex="-1">12.主题切换怎么实现 <a class="header-anchor" href="#_12-主题切换怎么实现" aria-label="Permalink to &quot;12.主题切换怎么实现&quot;">​</a></h4><ul><li>css变量</li><li>类名切换</li></ul><h3 id="bfc" tabindex="-1">BFC <a class="header-anchor" href="#bfc" aria-label="Permalink to &quot;BFC&quot;">​</a></h3><h4 id="_1-说一说bfc" tabindex="-1">1.说一说BFC？ <a class="header-anchor" href="#_1-说一说bfc" aria-label="Permalink to &quot;1.说一说BFC？&quot;">​</a></h4><p>BFC中文名叫块格式化上下文，通俗的理解就是一个布局容器，内部的样式不会影响到外部样式。</p><h4 id="_2-如何开启bfc" tabindex="-1">2.如何开启BFC？ <a class="header-anchor" href="#_2-如何开启bfc" aria-label="Permalink to &quot;2.如何开启BFC？&quot;">​</a></h4><ul><li>position:fixed|absoulte;</li><li>display:inline-block|flex|table-cell;</li><li>float:除了none;</li><li>overflow:除了none;</li></ul><h4 id="_3-bfc的作用" tabindex="-1">3.BFC的作用？ <a class="header-anchor" href="#_3-bfc的作用" aria-label="Permalink to &quot;3.BFC的作用？&quot;">​</a></h4><ul><li>解决margin的重叠问题</li><li>解决高度塌陷问题</li><li>创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。（原理是BFC的区域不会与浮动元素发生重叠）</li></ul><h3 id="浮动" tabindex="-1">浮动 <a class="header-anchor" href="#浮动" aria-label="Permalink to &quot;浮动&quot;">​</a></h3><h4 id="_1-浮动元素引起的问题" tabindex="-1">1.浮动元素引起的问题？ <a class="header-anchor" href="#_1-浮动元素引起的问题" aria-label="Permalink to &quot;1.浮动元素引起的问题？&quot;">​</a></h4><p>会造成高度塌陷，影响布局</p><h4 id="_2-如何清除浮动" tabindex="-1">2.如何清除浮动？ <a class="header-anchor" href="#_2-如何清除浮动" aria-label="Permalink to &quot;2.如何清除浮动？&quot;">​</a></h4><ul><li>利用<code>BFC</code>，设置父元素的<code>overflow</code>不为<code>none</code>，设置父元素的<code>position</code>为<code>absolute/fixed</code>，设置父元素的<code>display/float</code></li><li>设置父元素<code>after伪元素</code>清除浮动</li><li>添加一个块级兄弟元素放在最后面，设置<code>clear:both</code></li></ul><h4 id="_3-浮动的工作原理" tabindex="-1">3.浮动的工作原理 <a class="header-anchor" href="#_3-浮动的工作原理" aria-label="Permalink to &quot;3.浮动的工作原理&quot;">​</a></h4><p>浮动元素会脱离文档流，不占据空间，会根据<code>float</code>的值向左或向右移动，直到它的外边界碰到父元素的内边界或另一个元素的外边界为止。</p><h3 id="scss" tabindex="-1">scss <a class="header-anchor" href="#scss" aria-label="Permalink to &quot;scss&quot;">​</a></h3><h4 id="_1-scss用过哪些功能" tabindex="-1">1.scss用过哪些功能 <a class="header-anchor" href="#_1-scss用过哪些功能" aria-label="Permalink to &quot;1.scss用过哪些功能&quot;">​</a></h4><ul><li>嵌套语法</li><li>for循环</li><li>变量</li><li>&amp;父选择器</li><li>混合器</li></ul>`,53),n=[o];function r(i,c,p,d,h,D){return l(),s("div",null,n)}const u=a(e,[["render",r]]);export{F as __pageData,u as default};