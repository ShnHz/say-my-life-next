import{_ as s,c as a,o as l,V as n}from"./chunks/framework.f518e559.js";const i=JSON.parse('{"title":"简单实现ES6的数组flat算法","description":"","frontmatter":{"date":"2022/11/01 13:56:31","config":{"top":false,"dir":true,"tag":["js","algorithm"],"valine":true,"valineId":"/blog/algorithm/ArrayFlat.html"},"title":"简单实现ES6的数组flat算法"},"headers":[],"relativePath":"views/blog/algorithm/ArrayFlat.md"}'),p={name:"views/blog/algorithm/ArrayFlat.md"},o=n(`<h3 id="flat" tabindex="-1">flat() <a class="header-anchor" href="#flat" aria-label="Permalink to &quot;flat()&quot;">​</a></h3><p>先用<code class="default">es6</code>的语法看看<code class="default">flat</code>函数的功能是什么</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]]]]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flat</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]]]]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flat</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr) </span><span style="color:#676E95;font-style:italic;">//[1,2,3,4,5,6,7,8,9]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr2) </span><span style="color:#676E95;font-style:italic;">//[1, 2, 3, 4, Array(2), Array(1), Array(2)]</span></span></code></pre></div><p>所以很明显，<code class="default">flat</code>函数的功能就是降维（“拉平”数组维度），且默认值为1</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">,null,</span><span style="color:#F78C6C;">7</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,undefined,</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flat</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr3) </span><span style="color:#676E95;font-style:italic;">//[1, 2, 3, 4, 5, 6, null, 7, 8, undefined, 9]</span></span></code></pre></div><p>接下来看<code class="default">arr3</code>数组的值以及输出内容,可以看到4和5之间有一个空位，但是输出却没有这个空位。</p><p>所以<code class="default">flat</code>函数有一个特性是可以跳过空位，但是<code class="default">null</code>和<code class="default">undefined</code>还是会被保留。</p><p>当然如果不知道数组深度是多少，也可以传<code class="default">Infinity</code>值</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]]]]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">Infinity</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr) </span><span style="color:#676E95;font-style:italic;">//[1,2,3,4,5,6,7,8,9]</span></span></code></pre></div><h3 id="简单实现" tabindex="-1">简单实现 <a class="header-anchor" href="#简单实现" aria-label="Permalink to &quot;简单实现&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">myFlat</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">depth</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 用reduce方法获取结果，传入默认值空数组[]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">reduce</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">result</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">depth</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">tostring</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[object Array]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// 如果depth大于0（为有效值）且下个数组项为数组则进入递归</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">myFlat</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">depth</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            ]</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// 如果该数组项不为数组，则直接push</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> [])</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 测试一下</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]]]]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flat</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> arr2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]]]]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flat</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr) </span><span style="color:#676E95;font-style:italic;">//[1,2,3,4,5,6,7,8,9]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(arr2) </span><span style="color:#676E95;font-style:italic;">//[1, 2, 3, 4, Array(2), Array(1), Array(2)]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 和原生的结果是一样的</span></span></code></pre></div><h3 id="flatmap" tabindex="-1">flatMap() <a class="header-anchor" href="#flatmap" aria-label="Permalink to &quot;flatMap()&quot;">​</a></h3><p><code class="default">es6</code>还有一个<code class="default">flatMap()</code>方法，这边可以了解一下。</p><p><code class="default">flatMap()</code>方法会对原数组的每个成员执行一个函数（相当于执行<code class="default">Array.prototype.map()</code>），然后对返回值组成的数组执行<code class="default">flat()</code>方法。该方法返回一个新数组，不改变原数组。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 相当于 [[2, 4], [3, 6], [4, 8]].flat()</span></span>
<span class="line"><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flatMap</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> [x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">])</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// [2, 4, 3, 6, 4, 8]</span></span></code></pre></div><p><code class="default">flatMap()</code>只能展开一层数组。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()</span></span>
<span class="line"><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flatMap</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> [[x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">]])</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// [[2], [4], [6], [8]]</span></span></code></pre></div><p>上面代码中，遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此<code class="default">flatMap()</code>返回的还是一个嵌套数组。</p><p><code class="default">flatMap()</code>方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flatMap</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">currentValue</span><span style="color:#89DDFF;">[,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">index</span><span style="color:#89DDFF;">[,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">array</span><span style="color:#89DDFF;">]])</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> thisArg])</span></span></code></pre></div><p><code class="default">flatMap()</code>方法还可以有第二个参数，用来绑定遍历函数里面的<code class="default">this</code></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">flatMap</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">index</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> obj))</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// [0, 2, 1, 3, 2, 4, 3, 5]</span></span></code></pre></div><p>参考资料</p><h6 id="mdn" tabindex="-1"><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat" target="_blank" rel="noreferrer">MDN</a> <a class="header-anchor" href="#mdn" aria-label="Permalink to &quot;[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)&quot;">​</a></h6><h6 id="阮一峰" tabindex="-1"><a href="https://es6.ruanyifeng.com/?search=flat&amp;x=0&amp;y=0#docs/array#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Aflat%EF%BC%8CflatMap" target="_blank" rel="noreferrer">阮一峰</a> <a class="header-anchor" href="#阮一峰" aria-label="Permalink to &quot;[阮一峰](https://es6.ruanyifeng.com/?search=flat&amp;x=0&amp;y=0#docs/array#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Aflat%EF%BC%8CflatMap)&quot;">​</a></h6><h6 id="发布于掘金" tabindex="-1">发布于<a href="https://juejin.cn/post/7160945999018803237/" target="_blank" rel="noreferrer">掘金</a> <a class="header-anchor" href="#发布于掘金" aria-label="Permalink to &quot;发布于[掘金](https://juejin.cn/post/7160945999018803237/)&quot;">​</a></h6>`,26),e=[o];function t(c,r,y,C,F,D){return l(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};