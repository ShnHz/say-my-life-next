---
date: 2021/01/26 11:32:59 
config: {
    top: false,
    dir: false,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/PdfDownLoad.html
}
title : PDF通过接口下载的坑
---

问题：通过接口获取的pdf文件流，想要实现下载或预览，结果每次打开的都是空的pdf

解决方法：MD原来是我一直开了mock把接口拦截了，难怪我设置成什么样都没有用！！！把mock给注释掉！！！

```js
let _this = this
this.$api.report.exportReport(form).then((res) => {
_this.download(res.data, type)
})

// 导出报告
exportReport(params = {}) {
    return axios.post(`${base.url}/report/export`, params, {
        nprogress: false,
        responseType: 'blob'
    });
},
```


