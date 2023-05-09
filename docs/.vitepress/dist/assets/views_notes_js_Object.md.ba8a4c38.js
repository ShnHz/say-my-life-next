import{_ as s,c as n,o as a,V as l}from"./chunks/framework.79590ae5.js";const A=JSON.parse('{"title":"Object 对象","description":"","frontmatter":{"title":"Object 对象","config":{"dir":true}},"headers":[],"relativePath":"views/notes/js/Object.md"}'),p={name:"views/notes/js/Object.md"},o=l(`<h3 id="剩余参数rest" tabindex="-1">剩余参数rest <a class="header-anchor" href="#剩余参数rest" aria-label="Permalink to &quot;剩余参数rest&quot;">​</a></h3><p>对象和数组都可以用这种方法</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> object </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">100</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> object_ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">object</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">d</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">数组元素1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">数组元素2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(object_) </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  a:&#39;1&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  b:true,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  c:100,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  d:[&#39;数组元素1&#39;,&#39;数组元素2&#39;]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> **/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> object </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">100</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> object_ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">object</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">我被覆盖了</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(object_) </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  a:&#39;我被覆盖了&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  b:true,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *  c:100</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> **/</span></span></code></pre></div><h3 id="对象序列化" tabindex="-1">对象序列化 <a class="header-anchor" href="#对象序列化" aria-label="Permalink to &quot;对象序列化&quot;">​</a></h3><p>对象序列化是指将对象的状态转换为字符串。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(o[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> filter][</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> indent])</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//序列化原始值、对象或数组</span></span>
<span class="line"><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#A6ACCD;">(s[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> reviver])</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//解析JSON格式的字符串</span></span></code></pre></div>`,6),e=[o];function t(c,r,y,i,D,F){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
