---
title: 全栈之路- Nest入门
date: 2023/06/27 10:20:44
summary: 终于开始上手全栈了
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js","nodejs"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7247687957401305149)

<div class="markdown-body cache">

## 全栈之路- Nest入门

            
<p>Nest 是一款基于 TypeScript 的渐进式 Node.js 框架，它提供了一种结构清晰、可扩展且易于维护的方式来构建服务器端应用程序。对于前端工程师来说，学习 Nest 是进阶成为全栈开发者的重要一步。本文将为你提供一个简单的入门指南，帮助你开始学习 Nest，并展示一些基础使用和注意事项。</p>


### 安装 Nest

            
<p>首先，我们需要安装 Node.js 和 npm（或者使用 yarn）。打开终端并执行以下命令：</p>


```css
shellCopy code
npm install -g @nestjs/cli

```


<p>这将全局安装 Nest CLI，它将帮助我们创建和管理 Nest 项目。</p>


### 创建 Nest 项目

            
<p>在你选择的项目目录中，执行以下命令创建一个新的 Nest 项目：</p>


```arduino
shellCopy code
nest new my-nest-app

```


<p>这将创建一个名为 <code>my-nest-app</code> 的新项目，并自动安装所需的依赖项。</p>


### 第一个 CURD

            
<p>创建<code>curd</code>可以使用以下命令一步创建完毕</p>


```shell
nest g resource cats

```


<p>将直接生成如下一套<code>curd</code>文件
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dac84c56a8645ec847b717bee424b44~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>


### 分步创建 CURD

            


#### 创建第一个Controller

            
<p>在项目根目录下，执行以下命令创建一个控制器：</p>


```shell
nest generate controller cats

```


<p>这将在 <code>src</code> 目录下创建一个名为 <code>cats.controller.ts</code> 的文件。打开它并用以下代码替换：</p>


```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise&lt;Cat[]&gt; {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise&lt;Cat&gt; {
    return this.catsService.create(createCatDto);
  }
}

```




#### 创建 Service

            
<p>执行以下命令创建一个服务：</p>


```shell
nest generate service cats

```


<p>这将在 <code>src</code> 目录下创建一个名为 <code>cats.service.ts</code> 的文件。打开它并用以下代码替换：</p>


```typescript
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Promise&lt;Cat[]&gt; {
    return Promise.resolve(this.cats);
  }

  create(createCatDto: CreateCatDto): Promise&lt;Cat&gt; {
    const cat: Cat = {
      id: Date.now().toString(),
      name: createCatDto.name,
      age: createCatDto.age,
    };
    this.cats.push(cat);
    return Promise.resolve(cat);
  }
}

```




#### 创建 Module

            
<p>执行以下命令创建一个模块：</p>


```shell
nest generate module cats

```


<p>这将在 <code>src</code> 目录下创建一个名为 <code>cats.module.ts</code> 的文件。打开它并用以下代码替换：</p>


```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

```




#### 创建 DTO

            
<p>创建一个 DTO（数据传输对象）用于定义传入请求的数据结构。执行以下命令创建一个 DTO：</p>


```shell
touch src/cats/dto/create-cat.dto.ts

```


<p>打开 <code>create-cat.dto.ts</code> 文件并添加以下代码：</p>


```typescript
export class CreateCatDto {
  name: string;
  age: number;
}

```




### 创建 Entity

            
<p>执行以下命令创建一个实体：</p>


```shell
nest generate module cats/entities

```




### 注册 Module

            
<p>要使用我们创建的 <code>CatsModule</code>，我们需要将其注册到应用程序中。打开 <code>app.module.ts</code> 文件，修改代码如下：</p>


```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

```




### 启动应用程序

            
<p>现在，我们可以启动我们的 <code>Nest</code> 应用程序并查看结果了</p></div>
