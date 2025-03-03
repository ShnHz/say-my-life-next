import{_ as a,H as l,o as n,c as t,S as o,J as i}from"./chunks/framework.7114eebe.js";const g=JSON.parse('{"title":"大文件上传和断点续存","description":"","frontmatter":{"title":"大文件上传和断点续存","date":"2022/12/20 13:07:15","summary":null,"config":{"top":false,"dir":false,"dirTag":["h3","h4","h5"],"tag":["js","tool"],"valine":false,"valineId":null},"password":false},"headers":[],"relativePath":"views/notes/tools/BigFileUploadAndResume.md","filePath":"views/notes/tools/BigFileUploadAndResume.md"}'),p={name:"views/notes/tools/BigFileUploadAndResume.md"};function c(r,s,d,m,u,h){const e=l("views-other-TheBigFileUploadAndResume");return n(),t("div",null,[s[0]||(s[0]=o(`<details class="details custom-block"><summary>需要开启本地服务</summary><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">npm run serves</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接口1 分片上传接口</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// http://localhost:3000/other/bigFileUploadAndResume/upload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接口2 分片合并接口</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// http://localhost:3000/other/bigFileUploadAndResume/merge</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接口3 获取服务器已存在文件接口</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// http://localhost:3000/other/bigFileUploadAndResume/hasfile</span></span></code></pre></div></details>`,1)),i(e)])}const y=a(p,[["render",c]]);export{g as __pageData,y as default};
