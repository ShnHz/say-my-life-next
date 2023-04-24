---
title: 前端的绝对路径和相对路径
date: 2022/12/08 16:33:25
summary: 
config: {
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: [],
    valine: true,
    valineId: 
}
password: false
---

WEB中的绝对路径和相对路径是跟你的**所在文件目录没有关系**，而是跟当前资源的->URL<-有关

### 绝对路径

与当前资源的->path<-无关

例如：当前资源：<code>http://a.com/news/detail?id=1</code>

+ ->http://a.com/1<-  =>  ->http://a.com/1<-
+ ->//a.com/1<- => ->http://a.com/1<- （省略了协议的绝对路径，会使用当前资源的协议）
+ ->/1<- => ->http://a.com/1<- （省略了协议、域名、端口的绝对路径，会使用当前资源的协议、域名、端口）
+ ->/<- => ->http://a.com/<- （省略了协议、域名、端口的绝对路径，会使用当前资源的协议、域名、端口，其实就是根域名）

#### 使用场景

+ 1.**站外资源**只能使用绝对路径
    ->iconfont的css、站外图片、站外链接等<-

+ 2.当前资源和目标资源的**相对位置不稳定或不明确**，且目标资源的path是稳定的，推荐绝对路径，->用户上传的图片地址、多地址的页面引入同一资源等<-

### 相对路径

相对于当前资源->path<-路径

例如：当前资源：<code>http://a.com/news/detail?id=1</code>

+ ->./list<-  =>  ->http://a.com/news/list<-
+ ->../list<- => ->http://a.com/list<- （../表示当前资源上一段path）
+ ->list<- => ->http://a.com/news/list<- （与./一样，表示当前资源path）
+ ->?id=2<- => ->http://a.com/news/detail?id=2<- （以?前的path为起始，拼接）
+ ->#css<- => ->http://a.com/news/detail?id=1#css<- （以全部path为起始，拼接）