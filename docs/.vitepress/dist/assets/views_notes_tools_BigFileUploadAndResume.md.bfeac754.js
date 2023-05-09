import{_ as e,c as a,I as l,V as n,o as t,J as o}from"./chunks/framework.f518e559.js";const y=JSON.parse('{"title":"大文件上传和断点续存","description":"","frontmatter":{"title":"大文件上传和断点续存","date":"2022/12/20 13:07:15","summary":null,"config":{"top":false,"dir":false,"dirTag":["h3","h4","h5"],"tag":["js","tool"],"valine":false,"valineId":null},"password":false},"headers":[],"relativePath":"views/notes/tools/BigFileUploadAndResume.md"}'),i={name:"views/notes/tools/BigFileUploadAndResume.md"},p=n(`<details class="details custom-block"><summary>需要开启本地服务</summary><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm run serves</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接口1 分片上传接口</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// http://localhost:3000/other/bigFileUploadAndResume/upload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接口2 分片合并接口</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// http://localhost:3000/other/bigFileUploadAndResume/merge</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接口3 获取服务器已存在文件接口</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// http://localhost:3000/other/bigFileUploadAndResume/hasfile</span></span></code></pre></div></details>`,1);function c(r,d,m,_,h,u){const s=o("views-other-TheBigFileUploadAndResume");return t(),a("div",null,[p,l(s)])}const g=e(i,[["render",c]]);export{y as __pageData,g as default};
