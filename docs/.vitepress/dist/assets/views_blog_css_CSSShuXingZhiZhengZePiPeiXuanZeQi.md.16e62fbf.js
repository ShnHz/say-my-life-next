import{_ as s,c as a,o as t,V as l}from"./chunks/framework.f518e559.js";const q=JSON.parse('{"title":"CSS属性值正则匹配选择器","description":"","frontmatter":{"title":"CSS属性值正则匹配选择器","date":"2022/12/01 20:54:02","summary":"原来css选择器也能正则，一直不知道，一看全找到","config":{"top":false,"dir":true,"dirTag":["h3","h4","h5"],"tag":["css"],"valine":true,"valineId":null},"password":false,"outline":[3,5]},"headers":[],"relativePath":"views/blog/css/CSSShuXingZhiZhengZePiPeiXuanZeQi.md"}'),n={name:"views/blog/css/CSSShuXingZhiZhengZePiPeiXuanZeQi.md"},o=l(`<h3 id="css选择器" tabindex="-1">css选择器 <a class="header-anchor" href="#css选择器" aria-label="Permalink to &quot;css选择器&quot;">​</a></h3><p>先来复习一下CSS选择器都有哪些吧，简单列个表格，选择器也是有优先级的</p><table><thead><tr><th>选择器</th><th>权重</th><th>示例</th></tr></thead><tbody><tr><td>!important</td><td>10000</td><td></td></tr><tr><td>行内样式</td><td>1000</td><td></td></tr><tr><td>id选择器</td><td>100</td><td>#id</td></tr><tr><td>类选择器</td><td>10</td><td>.class</td></tr><tr><td>属性选择器</td><td>10</td><td>div[shuxing]</td></tr><tr><td>伪类选择器</td><td>10</td><td>:hover</td></tr><tr><td>标签选择器</td><td>1</td><td>div</td></tr><tr><td>伪元素选择器</td><td>1</td><td>:before</td></tr><tr><td>兄弟选择器</td><td>0</td><td>~</td></tr><tr><td>子选择器</td><td>0</td><td>&gt;</td></tr><tr><td>后代选择器</td><td>0</td><td>div p</td></tr><tr><td>相邻选择器</td><td>0</td><td>+</td></tr><tr><td>通配符</td><td>0</td><td>*</td></tr></tbody></table><h4 id="伪类选择器" tabindex="-1">伪类选择器 <a class="header-anchor" href="#伪类选择器" aria-label="Permalink to &quot;伪类选择器&quot;">​</a></h4><h5 id="标记状态的伪类" tabindex="-1">标记状态的伪类 <a class="header-anchor" href="#标记状态的伪类" aria-label="Permalink to &quot;标记状态的伪类&quot;">​</a></h5><ul><li>-&gt;:link&lt;- 选取未访问过的超链接</li><li>-&gt;:visited&lt;- 选取访问过的连接</li><li>-&gt;:hover&lt;- 选取鼠标悬浮的元素</li><li>-&gt;:active&lt;- 选取点中的元素</li><li>-&gt;:focus&lt;- 选取获取焦点的元素</li></ul><h5 id="筛选功能的伪类" tabindex="-1">筛选功能的伪类 <a class="header-anchor" href="#筛选功能的伪类" aria-label="Permalink to &quot;筛选功能的伪类&quot;">​</a></h5><ul><li>-&gt;:empty&lt;- 选取没有子元素的元素</li><li>-&gt;:checked&lt;- 选取勾选状态下的input 元素 只对 radio 和checkbox 有效</li><li>-&gt;:disabled&lt;- 选取禁用的表单元素</li><li>-&gt;:first-child&lt;- 选取当前选择器下的第一个元素</li><li>-&gt;:last-child&lt;- 选取当前选择器下的最后一个元素</li><li>-&gt;:nth-child(an+b)&lt;- 选取指定位置的元素,参数支持an+b的形势.比如 li:nth(2n+1),就可以选取li元素序号是2的整数倍+1的所有元素,也就是1,3,5,7,9序号的li元素</li><li>-&gt;:nth-last-child(an+b)&lt;- 和上面类似,不过从后面选取.</li><li>-&gt;:only-child&lt;- 选取元素唯一的子元素,如果元素的父元素只有它一个子元素就会生效,如果还有其他的兄弟元素,则不生效</li><li>-&gt;:only-of-type&lt;- 选取唯一的某个元素类型。如果元素的父元素只有它一个当前类型的子元素就会生效。</li></ul><h4 id="伪元素选择器" tabindex="-1">伪元素选择器 <a class="header-anchor" href="#伪元素选择器" aria-label="Permalink to &quot;伪元素选择器&quot;">​</a></h4><p>伪元素选择器是用来香元素设置某种特殊效果，伪元素选择器并不是真实的DOM元素，所以称之伪元素，常用的如下:</p><ul><li>-&gt;::first-line&lt;- 为元素的第一行使用样式</li><li>-&gt;::first-letter&lt;- 为某个元素的首字母或第一个文字使用样式</li><li>-&gt;::before&lt;- 在某个元素之前插入内容</li><li>-&gt;::after&lt;- 在某个元素之后插入内容</li><li>-&gt;::selection&lt;- 对光标选中的元素添加样式</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>1.伪元素构造的元素是虚拟的,所以不能使用js去操作</p><p>2.first-line和first-letter不使用于内联样式,在内联样式中都会失效</p><p>3.如果同时使用了 before 和 first-letter. 第一个内容要从 before 中算起,如果 before 中第一个为非文本内容,那 first-letter 也会作用到这个非文本内容上,但不会生效。</p><p>4.在CSS3 中规定, 伪类用一个冒号 -&gt;:&lt;- 表示, 伪元素用两个冒号 -&gt;::&lt;- 来表示</p></div><h3 id="css选择器的正则" tabindex="-1">css选择器的正则 <a class="header-anchor" href="#css选择器的正则" aria-label="Permalink to &quot;css选择器的正则&quot;">​</a></h3><p>好了，接下来进入主题，讲一讲css选择器的正则是如何使用的</p><div class="tip custom-block"><p class="custom-block-title">CSS属性选择器的发展目前分为3个阶段</p><p>CSS2.1属性选择器</p><ul><li>直接匹配：-&gt;[attr], [attr=&quot;val&quot;], [attr~=&quot;val&quot;], [attr|=&quot;bar&quot;]&lt;-</li></ul><p>CSS3属性选择器</p><ul><li>正则匹配：-&gt;[foo^=&quot;bar&quot;], [foo$=&quot;bar&quot;], [foo*=&quot;bar&quot;]&lt;-</li></ul><p>CSS4属性选择器</p><ul><li>忽略大小写匹配：-&gt;[attr=&quot;val&quot; i]&lt;-</li></ul><p>其中，后面两个阶段都属于正则匹配阶段，随着CSS的发展，更复杂的正则匹配应该会出现，我们可以拭目以待。</p></div><h4 id="css2-1属性选择器" tabindex="-1">CSS2.1属性选择器 <a class="header-anchor" href="#css2-1属性选择器" aria-label="Permalink to &quot;CSS2.1属性选择器&quot;">​</a></h4><h6 id="attr" tabindex="-1">[attr] <a class="header-anchor" href="#attr" aria-label="Permalink to &quot;[attr]&quot;">​</a></h6><p>只要元素有&#39;attr&#39;这个属性就可以</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* 只要有class属性 */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h6 id="attr-val" tabindex="-1">[attr=&quot;val&quot;] <a class="header-anchor" href="#attr-val" aria-label="Permalink to &quot;[attr=&quot;val&quot;]&quot;">​</a></h6><p>元素的属性名是&#39;attr&#39;值必须是&#39;val&#39;</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">this-class</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* 有class属性且class=this-class */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h6 id="attr-val-1" tabindex="-1">[attr~=&quot;val&quot;] <a class="header-anchor" href="#attr-val-1" aria-label="Permalink to &quot;[attr~=&quot;val&quot;]&quot;">​</a></h6><p>&#39;attr&#39;值需含有单词&#39;val&#39;，注意这里的措辞是“单词”而不是字符，CSS是老外发明的，老外的的母语是English, English的句子都是一个单词+空格+一个单词实现的</p><p>在CSS2.1的时候，CSS对其他国家的语言的考量还没有那么深入。因此，像这里这种匹配“单词”的用法只对ASCII范围的字符有用。对于中文，哪怕你在中文中间打个空格，假装成“单词”，也是没用的</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">~=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        有class属性且包含单词btn，例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn error&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn success&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-warning&quot; × 这样子匹配不到</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">~=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">中文</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;中文 btn&quot; × 这样子匹配不到</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h6 id="attr-val-2" tabindex="-1">[attr|=&quot;val&quot;] <a class="header-anchor" href="#attr-val-2" aria-label="Permalink to &quot;[attr|=&quot;val&quot;]&quot;">​</a></h6><p>&#39;attr&#39;属性值开头必须是&#39;val&#39;的单词，或者开头是&#39;val-&#39;。同样的，是“单词”，不是“字符”</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">|=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        有class属性且单词btn开头，例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-error&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-success&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-warning&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="css3属性选择器" tabindex="-1">CSS3属性选择器 <a class="header-anchor" href="#css3属性选择器" aria-label="Permalink to &quot;CSS3属性选择器&quot;">​</a></h4><h6 id="attr-val-3" tabindex="-1">[attr^=&quot;val&quot;] <a class="header-anchor" href="#attr-val-3" aria-label="Permalink to &quot;[attr^=&quot;val&quot;]&quot;">​</a></h6><p>值开头三个字符需要是&#39;val&#39;</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">^=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        有class属性且字符btn开头，例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-error&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-success&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;btn-warning&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h6 id="attr-val-4" tabindex="-1">[attr$=&quot;val&quot;] <a class="header-anchor" href="#attr-val-4" aria-label="Permalink to &quot;[attr$=&quot;val&quot;]&quot;">​</a></h6><p>值结尾三个字符需要是&#39;val&#39;</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">$=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        有class属性且字符btn结尾，例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;error-btn&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;success-btn&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;warning-btn&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;a-btn b c&quot; × 这样子匹配不到</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h6 id="attr-val-5" tabindex="-1">[attr*=&quot;val&quot;] <a class="header-anchor" href="#attr-val-5" aria-label="Permalink to &quot;[attr*=&quot;val&quot;]&quot;">​</a></h6><p>值任意位置包含&#39;val&#39;</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">*=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        有class属性且包含字符btn，例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;success-btn&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;a btn b&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;a-btn b c&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        class=&quot;b t n&quot; × 这样子匹配不到</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="css4属性选择器" tabindex="-1">CSS4属性选择器 <a class="header-anchor" href="#css4属性选择器" aria-label="Permalink to &quot;CSS4属性选择器&quot;">​</a></h4><h6 id="attr-operator-value-i" tabindex="-1">[attr operator value i] <a class="header-anchor" href="#attr-operator-value-i" aria-label="Permalink to &quot;[attr operator value i]&quot;">​</a></h6><p>例如：-&gt;[attr~=&quot;val&quot; i], [attr*=&quot;val&quot; I]&lt;- 等都是合法的写法。其中，i也可以使用大写I。</p><p>就和正则表达式中的i作用一样，忽略大小写，由于类似中文这样的语言并没有大小写的概念，因此，此特性也只对ASCII范围的字符。</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">data-index</span><span style="color:#89DDFF;">*=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        有data-index（大小写都行）属性且包含字符btn（大小写都行），例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        data-index=&quot;btn-error&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        data-index=&quot;BTN-success&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        data-index=&quot;BTn-warning&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        dAtA-INDEX=&quot;BTN&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,44),e=[o];function p(c,i,r,d,u,y){return t(),a("div",null,e)}const D=s(n,[["render",p]]);export{q as __pageData,D as default};