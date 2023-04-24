---
date: 2022/11/01 13:20:54 
config: {
    top: false,
    dir: false,
    tag: ['js'],
    valine: true,
    valineId: /blog/js/node-sassVersion.html
}
title : node版本与node-sass版本兼容问题
---

在安装node-sass时会遇到版本兼容问题，运行vue项目时就会出现错误

```
Syntax Error: Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime
```

这个错误可能是node-sass的版本与运行环境的node版本不兼容导致的

#### node版本与sass版本关系图

NodeJS | node-sass version | Node Module
:---: | --- | ---
Node 17 | 7.0+ | 102
Node 16 | 6.0+ | 93
Node 15 | 5.0+,<7.0 | 88
Node 14 | 4.14+ | 83
Node 13 | 4.13+,<5.0 | 79
Node 12 | 4.12+ | 72
Node 11 | 4.10+,<5.0 | 67
Node 10 | 4.9+,<6.0 | 64
Node 8 | 4.5.3+,<5.0 | 57
Node <8 | <5.0 | <53


