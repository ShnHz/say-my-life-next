import{_ as s,c as a,o as n,V as l}from"./chunks/framework.79590ae5.js";const A=JSON.parse('{"title":"Vuex模块化","description":"","frontmatter":{"date":"2020/05/28 15:41:20","config":{"top":false,"dir":true,"tag":["vue"],"valine":true,"valineId":"/blog/vue/VuexModules.html"},"title":"Vuex模块化"},"headers":[],"relativePath":"views/blog/vue/VuexModules.md"}'),o={name:"views/blog/vue/VuexModules.md"},p=l(`<h6 id="原文-掘金" tabindex="-1">原文 <a href="https://juejin.im/post/5d688800f265da03a0498d75" target="_blank" rel="noreferrer">掘金</a> <a class="header-anchor" href="#原文-掘金" aria-label="Permalink to &quot;原文 [掘金](https://juejin.im/post/5d688800f265da03a0498d75)&quot;">​</a></h6><h3 id="_1-为什么使用模块" tabindex="-1">1.为什么使用模块 <a class="header-anchor" href="#_1-为什么使用模块" aria-label="Permalink to &quot;1.为什么使用模块&quot;">​</a></h3><p>由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。</p><p>为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。</p><div class="tip custom-block"><p class="custom-block-title">命名空间</p><p>默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应</p></div><p>如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。</p><h3 id="_2-下载vuex" tabindex="-1">2.下载vuex <a class="header-anchor" href="#_2-下载vuex" aria-label="Permalink to &quot;2.下载vuex&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vuex</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vuex</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">//</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yarn</span></span></code></pre></div><h3 id="_3-修改store-js" tabindex="-1">3.修改store.js <a class="header-anchor" href="#_3-修改store-js" aria-label="Permalink to &quot;3.修改store.js&quot;">​</a></h3><ul><li>在src文件夹中添加store文件夹</li><li>store.js放入store文件夹中，重命名store.js为index.js</li><li>在store文件夹中添加modules文件夹，来存储我们的模块js</li></ul><h3 id="_4-使用vuex-persistedstate状态持久化" tabindex="-1">4.使用vuex-persistedstate状态持久化 <a class="header-anchor" href="#_4-使用vuex-persistedstate状态持久化" aria-label="Permalink to &quot;4.使用vuex-persistedstate状态持久化&quot;">​</a></h3><p>我们可以使用状态持久化来实现缓存状态，方便我们进行存储我们的数据。使用方法如下：</p><h4 id="下载-vuex-persistedstate" tabindex="-1">下载 vuex-persistedstate <a class="header-anchor" href="#下载-vuex-persistedstate" aria-label="Permalink to &quot;下载 vuex-persistedstate&quot;">​</a></h4><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vuex-persistedstate</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vuex-persistedstate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">//</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yarn</span></span></code></pre></div><h4 id="使用-vuex-persistedstate" tabindex="-1">使用 vuex-persistedstate <a class="header-anchor" href="#使用-vuex-persistedstate" aria-label="Permalink to &quot;使用 vuex-persistedstate&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// store/index.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Vue </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Vuex </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vuex</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> createPersistedState </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vuex-persistedstate</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(Vuex)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> common </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./modules/common</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Vuex</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Store</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">modules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    common</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 公用</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">createPersistedState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">storage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sessionStorage </span><span style="color:#676E95;font-style:italic;">// 修改存储的状态</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  ] </span><span style="color:#676E95;font-style:italic;">// 状态持久化</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h3 id="_5-创建模块" tabindex="-1">5.创建模块 <a class="header-anchor" href="#_5-创建模块" aria-label="Permalink to &quot;5.创建模块&quot;">​</a></h3><ul><li>在module文件夹下创建 comomon.js</li><li>在store/index.js中引入common.js,并在modules注册</li><li>这里做了一个简单的实例，其他的都是一样的实现方式</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// state</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> state </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// mutations</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> mutations </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// getters</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> getters </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// actions</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> actions </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">namespaced</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  state</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  getters</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  actions</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  mutations</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="_6-取值" tabindex="-1">6.取值 <a class="header-anchor" href="#_6-取值" aria-label="Permalink to &quot;6.取值&quot;">​</a></h3><h4 id="state" tabindex="-1">state <a class="header-anchor" href="#state" aria-label="Permalink to &quot;state&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">computed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 方式1</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">token</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">,</span><span style="color:#676E95;font-style:italic;">//  映射为 \`this.$store.state.common.token\`</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 方式2</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">token</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">       </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">common</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">token</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="getter" tabindex="-1">getter <a class="header-anchor" href="#getter" aria-label="Permalink to &quot;getter&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">computed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 方式1</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapGetters</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">getToken</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//  映射为 \`this.$store.getters.common.getToken\`</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 方式2</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">getToken</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">       </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">getters</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">common</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">getToken</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="mutation" tabindex="-1">mutation <a class="header-anchor" href="#mutation" aria-label="Permalink to &quot;mutation&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 方式1</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapMutations</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">setTokenData</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 将 \`this.setTokenData()\` 映射为 \`this.$store.commit(&#39;common/setTokenData&#39;)\`</span></span>
<span class="line"><span style="color:#A6ACCD;">     ])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 方式2 可以用设置别名的方式</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapMutations</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">setToken</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">common/setTokenData</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 将 \`this.setToken(&#39;123&#39;)\` 映射为\`this.$store.commit(&#39;common/setTokenData&#39;,&#39;123&#39;)\`</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 方式3 直接调用  this.$store.commit(&#39;common/setTokenData&#39;,&#39;123&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h4 id="action" tabindex="-1">action <a class="header-anchor" href="#action" aria-label="Permalink to &quot;action&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 方式1</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapActions</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">getTokenData</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 将 \`this.getTokenData()\` 映射为 \`this.$store.dispatch(&#39;common/getTokenData&#39;)\`</span></span>
<span class="line"><span style="color:#A6ACCD;">     ])</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 方式2 可以用设置别名的方式</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapActions</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">getData</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">common/getTokenData</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 将 \`this.getData(&#39;123&#39;)\` 映射为\`this.$store.dispatch(&#39;common/getTokenData&#39;,&#39;123&#39;)\`</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 方式3 直接调用 this.$store.dispatch(&#39;common/getTokenData&#39;,&#39;123&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,28),e=[p];function t(c,r,D,y,i,F){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};