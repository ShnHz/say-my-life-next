import{_ as s,c as n,o as a,V as l}from"./chunks/framework.79590ae5.js";const C=JSON.parse('{"title":"Listen1歌曲快速下载到本地小攻略","description":"","frontmatter":{"date":"2022/11/15 10:52:46","config":{"top":false,"dir":true,"tag":["tool"],"valine":true,"valineId":"/blog/other/Listen1Download.html"},"title":"Listen1歌曲快速下载到本地小攻略"},"headers":[],"relativePath":"views/blog/other/Listen1Download.md"}'),o={name:"views/blog/other/Listen1Download.md"},p=l(`<p><code>Listen1</code>听歌非常方便，但是可能由于版权问题没有提供下载功能，那我们想要批量下载到本地就非常麻烦。</p><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p><a href="./&#39;https://chrome.google.com/webstore/detail/listen-1/indecfegkejajpaipjipfkkbedgaodbp.html?hl=zh-CN&#39;">chrome</a>或者<a href="./&#39;https://microsoftedge.microsoft.com/addons/detail/在线音乐盒/olaohimdpfifjlhlinbpcomealcebinf&#39;.html">edge</a>下载<code>Listen1</code>的插件</p><h3 id="单独歌曲下载" tabindex="-1">单独歌曲下载 <a class="header-anchor" href="#单独歌曲下载" aria-label="Permalink to &quot;单独歌曲下载&quot;">​</a></h3><ul><li>1.打开<code>Listen1</code>浏览器插件</li><li>2.打开<code>F12 开发者控制台</code>，进入网络界面(network)</li><li>3.播放歌曲</li><li>4.在控制台内找到MP3文件，双击打开</li><li>5.在新的选项卡<code>Ctrl+S</code>即可</li></ul><br><img src="https://cdn.chenyingshuang.cn/blog/other/Listen1Download/1.jpg"><h3 id="批量下载" tabindex="-1">批量下载 <a class="header-anchor" href="#批量下载" aria-label="Permalink to &quot;批量下载&quot;">​</a></h3><ul><li>1.打开<code>Listen1</code>浏览器插件</li><li>2.打开<code>F12 开发者控制台</code>，进入控制台界面(console)</li><li>3.将想要下载的歌曲添加到播放列表</li><li>4.复制下面的代码，在控制台粘贴之后回车</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> errMusic </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 下载函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">download</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">url</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">title</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            responseType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">blob</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">resp</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">resp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">200</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">get file failed.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">blob</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">link</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">link</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">URL</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createObjectURL</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">blob</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">link</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">download</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">title</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">link</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">click</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">URL</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">revokeObjectURL</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">link</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">err</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">errMusic</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">title</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//  设置文件名：歌手_歌曲名.mp3</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_name</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">idx</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">threadPlayer</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">playlist</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filter</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">idx</span><span style="color:#F07178;">)[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">artist</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">_</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">title</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">.mp3</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 修改原播放器获取歌曲链接函数，增加获取链接时下载歌曲</span></span>
<span class="line"><span style="color:#A6ACCD;">threadPlayer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setMediaURI</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">setMediaURI</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">uri</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">url</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">url</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_media_uri_list</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">url</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">uri</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//  插入下载函数</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">download</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">uri</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">get_name</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">url</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 循环播放列表，获得每首歌的地址同时触发下载</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> threadPlayer</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">playlist</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">threadPlayer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">retrieveMediaUrl</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>输入代码后会自动下载播放列表的所有歌曲，如果不刷新页面的话，脚本还是在运行的，这个时候去歌单内播放歌曲也会自动下载到本地。</p><p>这边我的插件版本是<code class="default">2.27.0</code>，如果碰到问题可以确认一下是否版本号不一致，然后按照我的思路重新改一下代码即可。</p>`,12),e=[p];function t(c,r,y,F,D,i){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};