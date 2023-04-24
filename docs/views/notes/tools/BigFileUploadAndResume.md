---
title: 大文件上传和断点续存
date: 2022/12/20 13:07:15
summary: 
config: {
    top: false,
    dir: false,
    dirTag: ["h3","h4","h5"],
    tag: ["js","tool"],
    valine: false,
    valineId: 
}
password: false
---

::: details 需要开启本地服务

```js
npm run serves

// 接口1 分片上传接口
// http://localhost:3000/other/bigFileUploadAndResume/upload

// 接口2 分片合并接口
// http://localhost:3000/other/bigFileUploadAndResume/merge

// 接口3 获取服务器已存在文件接口
// http://localhost:3000/other/bigFileUploadAndResume/hasfile
```
:::

<views-other-TheBigFileUploadAndResume />