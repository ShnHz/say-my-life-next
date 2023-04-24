---
title: 常用正则表达式工具
date: 2022/11/29 16:22:15
summary: 
config: {
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","tool"],
    valine: true,
    valineId: 
}
password: false
---

### 正则语法参照表

#### 表示位置

| Code          | Explain       | Example|
| ------------- |:------------- | :------|
| ^             | 匹配开头       | ->'123'.replace(/^/, '0') //0123<- |
| $             | 匹配结尾       | ->'123'.replace(/$/, '0') //1230<- |
| \b            | 单词的边界     | ->'1234.5'.replace(/\b/g, '0') //012340.050<- |
| \B            | !(单词的边界)  | ->'1234.5'.replace(/\B/g, '0') //1020304.5<- |
| (?=x)         | 正向先行断言，x前  | ->'123'.replace(/(?=2)/g, '0') //1023<- |
| (?!x)         | 负向先行断言，除了x前  | ->'123'.replace(/(?!2)/g, '0') //012030<- |
| (?<=x)        | 正向后行断言，x后  | ->'123'.replace(/(?<=2)/g, '0') //1203<- |
| (?<!x)        | 负向后行断言，除了x后  | ->'123'.replace(/(?<!2)/g, '0') //010230<- |

#### 元字符

| Code          | Explain       | Example|
| ------------- |:------------- | :------|
| .             | 匹配任意单个字符除了换行符| ->'a a0 a1'.match(/a./g) //[a0,a1]<- |
| {m,n}         | 匹配num个大括号之前的字符或字符集（n<=num<=m） | ->'123 1223 12223 122223'.match(/12{2,3}3/g) //[1223,12223]<- |
| [xyz]         | 匹配方括号内的任意字符| ->'a0b a1b a2b'.match(/a[12345]b/g) //[a1b,a2b]<- |
| [^]           | 匹配除了方括号里的任意字符| ->'a0 a1'.match(/a[^0]/g) //[a1]<- |
| *             | 匹配 >=0 个重复的在*号之前的符号| ->'a0 bb0 b1'.match(/b*0/g) //[0,bb0]<- |
| +             | 匹配 >=1 个重复的在+号之前的符号| ->'a0 bb0 b1'.match(/b+0/g) //[bb0]<- |
| ?             | 标记 0,1 个重复的在?号之前的符号| ->'a0 bb0 b1'.match(/b?0/g) //[0,b0]<- |
| (xyz)         | 字符集，匹配与 xyz 完全相等的字符串| ->'abc abbc abbbc'.match(/a(bb)c/g) //[abbc]<- |
| \|            | 或运算，匹配符号前或后的字符 | ->'abc aac acc'.match(/a(a\|b)c/g)) //[abc,aac]<- |
| \             | 转义字符，用于匹配一些保留的字符 | ->[ ] ( ) { } . * + ? ^ $ \ \|<- |

#### 简写字符集

| Code          | Explain       | Example|
| ------------- |:------------- | :------|
| .             | 除换行符外的所有字符|  |
| \w             | 匹配所有字母数字，等同于 [a-zA-Z0-9_]|  |
| \W             | 匹配所有非字母数字，即符号，等同于：[^\w]|  |
| \d             | 匹配数字：[0-9]|  |
| \D             | 匹配非数字：[^\d]|  |
| \s             | 匹配所有空格字符，等同于：[\t\n\f\r\p{Z}]|  |
| \S             | 匹配所有非空格字符：[^\s]：[^\d]|  |
| \f             | 匹配一个换页符|  |
| \n             | 匹配一个换行符|  |
| \r             | 匹配一个回车符|  |
| \t             | 匹配一个制表符|  |
| \v             | 匹配一个垂直制表符|  |
| \p             | 匹配 CR/LF (等同 \r\n)，用来匹配 DOS 行终止符|  |


### 下划线命名转驼峰命名

```JS
'hello_world'.replace(/_([a-zA-Z])/g, (p1,p2) =>{
    return p2.toUpperCase()
})
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return str.replace(/_([a-zA-Z])/g, (p1, p2) => {return p2.toUpperCase()})}" />

### 驼峰命名命名转下划线命名

```JS
'helloWorld'.replace(/([A-Z])/g, (p1) => {
  return '_' + p1.toLowerCase()
})
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return str.replace(/([A-Z])/g, (p1) => {return '_' + p1.toLowerCase()})}" default="helloWorld" />

### 是否是合法的十六进制颜色

```JS
/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test('#000000')
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return '' + /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(str)}" default="#000000" />

### 提取自定义规则内容

假设我的规则是"[]{}"，我需要提取中括号内以及大括号内的所有内容

```JS
'[Test]{Hello World}'.match(/\[(?<content>[^]*)\]\{(?<content2>[^]*)\}/)
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {let x = str ? str.match(/\[(?<content>[^]*)\]\{(?<content2>[^]*)\}/).groups : {};return `${x.content} ${x.content2}`}" default="[Test]{Hello World}" />

### 千分位分割

```JS
'123456789'.replace(/(?!^)(?=(\d{3})+$)/g,',')
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return str.replace(/(?!^)(?=(\d{3})+$)/g,',')}" default="123456789" />

### 手机号3-4-4分割

```JS
'12345678910'.slice(0,11)
    .replace(/(?<=\d{3})\d+/, (p1) => '-' + p1)
    .replace(/(?<=[\d-]{8})/, (p1) => '-' + p1)
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return str.slice(0,11).replace(/(?<=\d{3})\d+/, (p1) => '-' + p1).replace(/(?<=[\d-]{8})/, (p1) => '-' + p1)}" default="12345678910" />

### 弱密码验证

+ 密码长度是6-12位

+ 由数字、小写字符和大写字母组成

+ 必须至少包括2种字符

```JS
/(((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z]))^[a-zA-Z\d]{6,12}$/.test('Aa123456')
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return /(((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z]))^[a-zA-Z\d]{6,12}$/.test(str) + ''}" default="Aa123456" />

### 24小时制时间验证

```JS
/^(0?\d|1\d|2[0-3]):(0?|[1-5])\d/.test('23:59')
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return /^(0?\d|1\d|2[0-3]):(0?|[1-5])\d/.test(str) + ''}" default="23:59" />

### 日期格式验证

```JS
/\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/.test('2022-11-30')
```

<views-tools-ChangYongZhengZeBiaoDaShiGongJu :fn="function(str) {return /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/.test(str) + ''}" default="2022-11-30" />