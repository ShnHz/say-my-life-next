---
title: 别再说你不会WebGPU了
date: 2023/04/17 09:44:50
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","css","info"],
    valine: true,
    valineId: 
}
password: false
---

###### 原文 [掘金](https://juejin.cn/post/7222079859711311909)

<div class="markdown-body cache">

# 前言

            
<p>2023年了，还是抛弃webGL吧，学一学新时代的webGPU，本文将几分钟让你快速掌握核心原理、流程、以及快速开发WebGPU。</p>


# WebGPU

            
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a334cbcab2444593243af10c84ec7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>


## 为什么要用WebGPU

            
<p>webgpu是面向现代的web处理gpu的图形API，由于之前的webgl的2.0对应的opengl的是2010版本，gpu显卡的迅猛发展让厂商开始慢慢抛弃openGL的老旧存在缺陷的api，为了适应新的时代发展，才有了最新的webgpu的发展，底层抛弃了opengl，D3D12（D3D12 [Direct3D 12]是Microsoft开发的图形API）、Metal(Apple)、Vulkan(Khronos Group开发的跨平台的图形API)所实现。在编译阶段处理大量的cpu的损耗。</p>


```js
device.queue.submit([commandEncoder.finish()]);

```


<p>同时在webgpu可以通过多线程处理，在web worker中可以单独引入device的队列，submit你的指令集。</p>


## WebGPU 和 WebGL 区别

            
<ol>
<li><code>上下文区分</code>，首先webGPU的上下文是区分多个，而不是webgl只有一个上下文。每块单独负责一个区域的工作, 所以你再也不用像之前返回的webgl的gl上下文，从这个gl中处理所有工作。</li>
<li><code>模块导入方便</code>,之前我们导入glsl文件是很麻烦的，但是现在我们用esm导入我们的wgsl的顶点着色器、图元着色器。</li>
<li><code>性能好</code>，与现有用于浏览器图形加速的WebGL相比，WebGPU将底层接口从老旧的OpenGL升级到了最新的Direct3D 12、Vulkan和Metal，所以这也使得它既拥有了比过去高得多的执行效率。</li>
<li><code>更高效的api</code>，webgl开发绘制多个图形，你要做循环大量的初始gl定义，而webgpu可以保存之前buffer设置等</li>
<li>......</li>
</ol>


## 渲染流程

            
<ul>
<li>GPUDevice创建资源，例如纹理和缓冲区。</li>
<li>GPUCommandEncoder允许对单个命令进行编码，包括渲染和计算过程。</li>
<li>完成后，它变成GPUCommandBuffer对象，可以提交给GPUQueueGPU 执行。</li>
<li>可以将渲染结果呈现给 HTML 画布</li>
</ul>


## 上下文

            
<p>之前我们获取webgl的上下文使用<code>canvas.getContext('webgl')</code>,那么同样在webGPU如何获取上下文呢？</p>


```js
// 获取 webgpu 上下文
const context = canvas.getContext('webgpu') as GPUCanvasContext;

```




## 初始化

            


```JS
  const adapter = await navigator.gpu.requestAdapter(); // 物理设备
  const device = await adapter.requestDevice(); // 逻辑设备
  const context = canvas.getContext('webgpu') as GPUCanvasContext;

  // 移动端dpr适配
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  // 得到当前环境适配的图形数据类型
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  context.configure({
    device,
    format: presentationFormat,
    alphaMode: 'premultiplied',  
  });

```


<p>在context.configure为<code>alphaMode</code>指定字符串 ‘opaque’。<code>alphaMode</code>设置的是 Canvas 和 HTML 元素背景的混合方式。如果设置为’opaque’，则用 WebGPU 绘图内容完全覆盖。也可以为<code>alphaMode</code>&nbsp;设置为 ‘premultiplied’ （相当于alpha预乘），在这种情况下，作为 WebGPU 绘图的结果，如果画布像素的 alpha 小于 1，则该像素将是画布和 HTML 元素背景混合的颜色。</p>


## 兼容性

            
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c88d59fe217f4df4b522c5b121640b38~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36f46cd085ea4988a406a8be3aa69829~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>所以你要开发WebGPU，你的浏览器必须使用edge或chrome，并升级到113版本以上的开发者版本</p>


## 插件

            
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af539003d684a438fff957b455c719e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>vscode提供wgsl文件更好的高亮支持的插件</p>


# 绘制一个三角形

            


```js
import { makeSample, SampleInit } from '../../components/SampleLayout';

import triangleVertWGSL from '../../shaders/triangle.vert.wgsl';
import redFragWGSL from '../../shaders/red.frag.wgsl';

const init: SampleInit = async ({ canvas, pageState }) =&gt; {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  if (!pageState.active) return;
  const context = canvas.getContext('webgpu') as GPUCanvasContext;

  // 移动端dpr适配
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  // 得到数据类型
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  context.configure({
    device,
    format: presentationFormat,
    alphaMode: 'premultiplied',
  });

  // 渲染管线
  const pipeline = device.createRenderPipeline({
    layout: 'auto', // 控制gpu如何执行渲染管线
    vertex: {
      module: device.createShaderModule({
        code: triangleVertWGSL,
      }),
      entryPoint: 'main',
    },
    fragment: {
      module: device.createShaderModule({
        code: redFragWGSL,
      }),
      entryPoint: 'main',
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    // 绘制图元的结构配置
    primitive: {
      topology: 'triangle-list', // 定义的基本图元类型
    },
  });

  // 绘制
  function frame() {
    if (!pageState.active) return;

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    // 这里可以理解为webgl的program 程序对象
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();

    // 由 GPUCommandEncoder 编码的命令使用 GPUCommandEncoder.finish（） 方法重新编码为 GPUCommandBuffer。然后，命令缓冲区通过 submit（） 调用传递到队列中，准备由 GPU 处理。
    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
};

/**
 * 渲染入口，将init、以及其他web页面配置传入渲染页面
 */
const HelloTriangle: () =&gt; JSX.Element = () =&gt; {
  /**
   * nextjs在运行时编译配置存在的全局变量
   *
   * __filename 文件路径
   *
   * __dirname 目录路径
   *
   * __filename.substring(__dirname.length + 1) 文件名
   */
  return makeSample({
    name: 'Hello Triangle',
    description: 'Shows rendering a basic triangle.',
    init,
    sources: [
      {
        name: __filename.substring(__dirname.length + 1),
        contents: __SOURCE__,
      },
      {
        name: '../../shaders/triangle.vert.wgsl',
        contents: triangleVertWGSL,
        editable: true,
      },
      {
        name: '../../shaders/red.frag.wgsl',
        contents: redFragWGSL,
        editable: true,
      },
    ],
    filename: __filename,
  });
};

export default HelloTriangle;


```


<p>这里用的是webgpu-samples的源码，是一个不错入门的开源项目，该项目用nextjs构建并同构渲染，服务端渲染页面、客户端监听路由传参请求服务端更新渲染页面。</p>
<p>简单的执行流程:</p>
<ol>
<li>将device挂载到webgpu上下文，初始化gpu</li>
<li>开始写入我的着色器的执行方式，将着色器源码等传入生成渲染管线</li>
<li>生成程序对象，传入渲染管线并定义buffer绘制方式</li>
<li>requestAnimationFrame绘制帧</li>
</ol>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/053fe284ee3e462fbddfa2aa3b6b8755~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>


## CommandEncoder 编码器

            


```js
    // ...
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      // 配置图元指令
      colorAttachments: [ 
        {
          view: textureView, //加载纹理
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }, //默认画布颜色
          loadOp: 'clear', //是否清空缓冲区
          storeOp: 'store', //是否保存之前的缓冲区设置
        },
      ],
    };
    
    // 指令
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor); 
    passEncoder.setPipeline(pipeline);
    // 一个打包指令要绘制3个点，0偏移缓冲区，0偏移打包指令的实例
    passEncoder.draw(3, 1, 0, 0);
    // 保存
    passEncoder.end();
    
    // 发送到gpu
    device.queue.submit([commandEncoder.finish()]);
    // ...

```


<p>其实就是将缓冲区的指令打包给gpu，类似一个webgl的程序对象。所以为什么更高效，因为gl配置都可以缓存。</p>


## 着色器

            
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b6aeb98cd07430c8d3107b8281193cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.png" loading="lazy"></p>
<p>这里注解对应是顶点着色器和图元着色器， @builtin注入对应的全局变量，这里之前定义了draw绘制3个点，所以这里会返回3个点， -&gt; 符号代表返回对应的全局位置信息。vec4 代表4维向量，每个向量存储浮点数32位。
在@fragment这里@location（0）对应<code>fragment.targets</code>数组中的第0个格式。</p>


# 总结

            
<p>在webgpu在未来替代webgl的可能性是很大的，相比之前的webgl更方便了我们的开发，并提供了极大的灵活性，对于复杂图形渲染带来了更好的性能提升。在Babylon已经完全支持WebGPU的支持，同时Threejs也逐步在支持。卷一卷还是有必要的。</p>