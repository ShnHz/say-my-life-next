---
title: 微信都在用的开源动效方案【PAG动效】
date: 2023/04/19 10:26:50
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

###### 原文 [掘金](https://juejin.cn/post/7220698356775567417)

<img loading="eager" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3aed2707b94840d8b731576325970993~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?" alt="微信都在用的开源动效方案【PAG动效】" class="lazy article-hero" data-v-248050e4="" data-v-0083c6d0="">

### 1.&nbsp; PAG 是什么?

            
<p>在 web 中实现一个动画， css animation 声明一下各个时间点的样式就好了， 写起来并不麻烦。 但是当设计给的动画越来越复杂, 还原度要求越来越高的情况下, 单纯依赖 css 写动画就显得捉襟见肘了。 比如下面这些动画:</p>
<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3cb673b7f1d4aafae3870d3d65d4b81~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image.gif" loading="lazy"></p>
对于这些动画，通常都有一套完整的动效解决方案。设计师在 AE 中设计好动画的表现形式，导出一个文件，开发在 web 或者其它端 (安卓/iOS 等) 通过 sdk 加载这个文件。不需要自己写 css 代码，就能把动画渲染出来。
<p>而 PAG 就是这样一套解决方案。</p>
<p>它提供了从 AE 导出的插件，桌面端预览的 PAGViewer，以及各端跨平台的渲染 SDK，包括 Web，Andorid，macOS，Windows，Linux 和小程序。</p>
<p>当面对复杂的动效时，我们直接加载设计师给的动效文件，通过 sdk 就能把动画渲染出来，所见即所得，再也不用反复跟设计争论还原细节以及实现的难易程度。</p>
<p>我们来看一段基本的 demo：</p>


```html
<canvas class="canvas" id="pag"></canvas>
<script src="https://cdn.jsdelivr.net/npm/libpag@latest/lib/libpag.min.js"></script>
<script>
  window.onload = async () => {
    // 实例化 PAG
    const PAG = await window.libpag.PAGInit();
    // 获取 PAG 素材数据
    const buffer = await fetch('../assets/test.pag').then((response) => response.arrayBuffer());
    // 加载 PAG 素材为 PAGFile 对象
    const pagFile = await PAG.PAGFile.load(buffer);
    // 将画布尺寸设置为 PAGFile的尺寸
    const canvas = document.getElementById('pag');
    canvas.width = pagFile.width();
    canvas.height = pagFile.height();
    // 实例化 PAGView 对象
    const pagView = await PAG.PAGView.init(pagFile, canvas);
    // 播放 PAGView
    await pagView.play();
  };
</script>
```


<p>没错, 就是这么简单, 就能将一个复杂的动画渲染出来。（感兴趣的朋友可以到PAG的开源仓库下载Web Demo Code自己试一下：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flibpag%2Fpag-web" target="_blank" title="https://github.com/libpag/pag-web" ref="nofollow noopener noreferrer">github.com/libpag/pag-…</a>）</p>
<p>PAG 是腾讯开源的一款动效解决方案，已经接入了腾讯内外 600 多款应用，包括微信, 手机QQ，王者荣耀等等。如果你玩王者的话，这些你看到的动效，就是 PAG 渲染出来的：</p>
<p align="center"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/298c4d76836b46bcb083ec4896659b5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?" alt="image (1).gif" loading="lazy"></p>
接下来, 我们来看看 PAG 的工作流以及具体的使用方式。


### 2.&nbsp; PAG动效工作流简介

            


#### 整体流程

            
<p>PAG 动效工作流主要包含 AE 导出插件 PAGExporter、桌面端预览工具 PAGViewer和各平台端的 PAG SDK 三部分。 PAG 的工作流程图如下，设计师在 AE 中设计出动效后，通过导出插件导出 pag 文件，同时 PAG 提供了桌面端预览工具，支持实时预览效果，在确认效果后，通过运营配置上线，各平台终端可以通过 PAG SDK 加载渲染 pag 动效。<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4b357d726ef4ef9accf5c57b2bf4dca~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image" alt="" loading="lazy"></p>
<p>PAG动画工作流流程图</p>


#### PAG 的技术优势

            
<p>通过阅读 PAG 官方提供的资料，相对比 Lottie 和 SVGA， PAG 具有以下技术优势：</p>


##### 1）&nbsp; 文件更小

            
<p>PAG采用针对 AE 时间轴属性设计的二进制文件编码器，能够使用动态比特位紧凑存储，冗余信息极少，文件体积最小，解码速度最快，且支持单文件集成图片和音频等外部资源。</p>


##### 2）&nbsp; 全 AE 特性支持

            
<p>在纯矢量的导出模式下，无论是哪种实现方案，在众多的 AE 特性面前，都只支持将有限的 AE特性导出渲染，PAG 方案提供了 BMP 预合成的解决方案，支持将特定图层截图导出成透明视频，实现了对于所有 AE 特性导出的支持。</p>


##### 3）&nbsp; 运行时编辑

            
<p>PAG 不仅仅支持文本图层的文本编辑、图片图层的占位图替换，还支持图层级别的增加、删除及更改渲染位置，实现原子素材的自由组合，典型的应用场景就是视频模版和游戏战报，一个模版中由多个 pag 有机组合在一起。</p>


##### 4）&nbsp; 渲染架构

            
<p>相对于 Lottie 、SVGA 依赖于平台端相关的渲染接口，PAG 使用了跨平台一致的 C++ 架构，平台层面仅仅提供渲染环境，渲染的主体位于 C++ 层，可以实现跨平台的渲染一致性。</p>


##### 5）&nbsp; 支持的平台更多

            
<p>相比 Lottie 支持 Android、iOS、Web 和 macOS， SVGA 支持 Android、iOS、Web，PAG 实现了 Android、iOS、Web、macOS、Windows、Linux 和 微信小程序，支持的平台更多。</p>
<p>另外为了方便大家了解PAG的功能和场景，在这里放上一个官方的介绍视频，2分钟看懂PAG的全貌：
<a href="https://link.juejin.cn?target=http%3A%2F%2Fmpvideo.qpic.cn%2F0bc3g4aaeaaaqaadu7bq5jsfan6dai3qaaqa.f10002.mp4%3Fdis_k%3D23d104a835906bbb6c7dcf8dcb6e40b0%26dis_t%3D1681203904%26play_scene%3D10120%26auth_info%3DdsLs%2B4Z9J0oT3tLLyxl3KzgSEm5deDo%2BFBgrYU55PD5Qa2A%3D%26auth_key%3D9a834d6e7bbfe37ed547d5bc6e5f2f4d%26vid%3Dwxv_2873762220688621570%26format_id%3D10002%26support_redirect%3D0%26mmversion%3Dfalse" target="_blank" title="http://mpvideo.qpic.cn/0bc3g4aaeaaaqaadu7bq5jsfan6dai3qaaqa.f10002.mp4?dis_k=23d104a835906bbb6c7dcf8dcb6e40b0&amp;dis_t=1681203904&amp;play_scene=10120&amp;auth_info=dsLs+4Z9J0oT3tLLyxl3KzgSEm5deDo+FBgrYU55PD5Qa2A=&amp;auth_key=9a834d6e7bbfe37ed547d5bc6e5f2f4d&amp;vid=wxv_2873762220688621570&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" ref="nofollow noopener noreferrer">mpvideo.qpic.cn/0bc3g4aaeaa…</a></p>


### 3、PAG SDK 的使用

            


#### PAG SDK 接入

            
<p>在 Android、iOS、Web 和微信小程序平台，PAG 提供了制品库供接入使用。</p>
<p>具体接入方式可以参考：</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fpag.art%2Fdocs%2Fsdk.html" target="_blank" title="https://pag.art/docs/sdk.html" ref="nofollow noopener noreferrer">移动端接入指南 · PAG官网|PAG动效</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fpag.art%2Fdocs%2Fsdk-web.html" target="_blank" title="https://pag.art/docs/sdk-web.html" ref="nofollow noopener noreferrer">Web端接入指南 · PAG官网|PAG动效</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fpag.art%2Fdocs%2Fsdk-miniprogram.html" target="_blank" title="https://pag.art/docs/sdk-miniprogram.html" ref="nofollow noopener noreferrer">小程序端接入指南 · PAG官网|PAG动效</a></p>
<p>macOS 和 Windows 平台，由于不同业务使用的 UI 架构不一样，Linux 平台由于环境及 CPU 型号的差异，这些平台需要通过 PAG 的源码自己构建库文件，构建方法可以参考 README。</p>
<p>PAG 的开源地址：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FTencent%2Flibpag" target="_blank" title="https://github.com/Tencent/libpag" ref="nofollow noopener noreferrer">github.com/Tencent/lib…</a></p>


#### 如何让你的设计师同事快速使用

            
<p>下载安装PAG相关的插件：PAGViewer、PAG的AE导出插件。</p>
<p>花几分钟了解下PAG的导出规则，就可以开始使用了。</p>
<p>具体的下载指引和规则参考官网：<a href="https://link.juejin.cn?target=https%3A%2F%2Fpag.art%2Fdocs%2Finstall.html" target="_blank" title="https://pag.art/docs/install.html" ref="nofollow noopener noreferrer">pag.art/docs/instal…</a></p>
<p>里面同时还有非常易学详尽的进阶使用教程，真的可以说非常良心。</p>


#### PAG 常用方法解读

            
<p>这里整理好使用方法的代码，便于大家接入后能快速理解和上手使用：</p>


##### PAG 运行时编辑

            
<p>PAG 的运行时编辑主要分为两类： 1）修改文本图层的文本信息、替换图片图层中的占位图</p>


```ini
const pagFile = await PAG.PAGFile.load(buffer);
// Get TextDate by editableIndex.
const textData = pagFile.getTextData(0);
// Modify textData by editableIndex.
textData.text = 'Hello World';
pagFile.replaceText(0, textData);
// Ensure image is loaded.
const image = await new Promise((resolve) =&gt; {
  const img = new Image();
  img.onload = () =&gt; resolve(img);
  img.src = '../assets/cat.png';
});
// Replace Image by editableIndex.
const pagImage = await PAG.PAGImage.fromSource(image);
pagFile.replaceImage(0, pagImage);

```


<p>2）渲染树编辑</p>
<p>渲染树编辑指的是通过使用 PAGComposition 的相关接口，完成多个图层、多个 pag 文件的自由组合。具体如何使用可以参考下面的代码：</p>


```scss
// Fetch pag file.
const [buffer1, buffer2] = await Promise.all([
  fetch('../assets/like.pag').then((response) =&gt; response.arrayBuffer()),
  fetch('../assets/snowman.pag').then((response) =&gt; response.arrayBuffer()),
]);
// Load the PAGFile from file.
const [pagFile1, pagFile2] = await Promise.all([PAG.PAGFile.load(buffer1), PAG.PAGFile.load(buffer2)]);
// Make new PAGComposition.
const pagComposition = PAG.PAGComposition.make(1080, 1080);
// Add PAGFile as PAGLayer to PAGComposition.
pagComposition.addLayer(pagFile1);
// Make scale matrix
const matrix1 = PAG.Matrix.makeScale(2, 2);
pagFile1.setMatrix(matrix1);
// Add PAGFile as PAGLayer to PAGComposition.
pagComposition.addLayer(pagFile2);
// Make translate matrix
const matrix2 = PAG.Matrix.makeTrans(100, 100);
pagFile2.setMatrix(matrix2);
pagFile2.setStartTime(pagFile1.duration())
// Create PAGView.
const pagView = await PAG.PAGView.init(pagComposition, canvas);

```




##### PAG 字体注册

            
<p>PAG 除了支持修改文本图层的文本信息外，还支持修改字体。具体方法如下：</p>
<p>（1）通过 PAGFont 注册字体</p>


```javascript
const fontUrl = '../assets/SourceHanSerifCN-Regular.ttf';
const fontBlob = await fetch(fontUrl).then((response) =&gt; response.blob());
const fontFile = new window.File([fontBlob], fontUrl.replace(/(.*/)*([^.]+)/i, '$2'));
await PAG.PAGFont.registerFont('SourceHanSerifCN-Regular', fontFile);

```


<p>（2）fontFamlily 和 fontStyle 赋值给 TextData，再进行字体修改。</p>


```ini
const textData = pagFile.getTextData(0);
textData.fontFamily = 'SourceHanSerifCN-Regular';
pagFile.replaceText(0, textData);

```


<p>如果使用了特定字体而又没有注册或字体文件中没有包含该字符，PAG 内部有一个默认字体列表（同时支持外部设置字体回退列表，外部设置时会覆盖默认设置），会回退到 PAG 的默认字体列表中，此时使用那种字体对于业务方而言是不确定的。</p>


```arduino
class PAGFont {
    /**
     * Register fallback font names from pag.
     */
    static registerFallbackFontNames(fontNames?: String[]): void;
}

```




##### PAG 视频编辑场景

            
<p>在视频编辑场景，使用的不是 PAGView，而是 PAGPlayer、PAGSurface 和 PAGComposition。</p>
<p>PAGSurface 可以通过 Canvas 或纹理创建，方便快捷的与视频后编辑中的 Canvas 或 纹理进行整合。同时 PAGImage 也支持通过 Canvas 或 纹理创建，通过 PAGPlayer 控制播放进度，将视频内容填充进图片图层的占位图。</p>


```arduino
// PAGSurface interface
class PAGSurface {
    /**
     * Make a PAGSurface from canvas.
     */
    static fromCanvas(canvasID: string): PAGSurface;
    /**
     * Make a PAGSurface from texture.
     */
    static fromTexture(textureID: number, width: number, height: number, flipY: boolean): PAGSurface;
    /**
     * Make a PAGSurface from frameBuffer.
     */
    static fromRenderTarget(frameBufferID: number, width: number, height: number, flipY: boolean): PAGSurface;
}

// PAGImage interface
class PAGImage {
    /**
     * Create pag image from image file.
     */
    static fromFile(data: File): Promise&lt;PAGImage&gt;;
    /**
     * Create pag image from image source or video source.
     * Make sure the target pixel is shown on the screen.
     * Like
     * ``` javascript
     * Image.onload = async () =&gt; {
     *   return await PAGImage.fromSource(Image)
     * }
     * ```
     */
    static fromSource(source: TexImageSource): PAGImage;
    /**
     *  Creates a PAGImage object from an array of pixel data, return null if it's not valid pixels.
     */
    static fromPixels(pixels: Uint8Array, width: number, height: number, colorType: ColorType, alphaType: AlphaType): PAGImage;
    /**
     * Creates a PAGImage object from the specified backend texture, return null if the texture is
     * invalid.
     */
    static fromTexture(textureID: number, width: number, height: number, flipY: boolean): PAGImage;
}

```




##### PAG 软解注入

            
<p>为什么会有软解注入？PAG 的导出方式中支持 BMP 预合成导出，在 pag 文件中，如果含有 BMP 预合成，一个 BMP 预合成相当于一个视频，视频则需要解码。 在 PAG SDK 中默认使用硬件解码，但硬件解码在 Web 存在问题：</p>
<p>在部分移动端浏览器环境中存在“用户与页面交互之后才可以使用 Video 标签进行视频播放”的规则限制。而当业务宁愿牺牲性能也希望做到不需要用户交互而进行播放时，可以使用软件解码器 ffavc。</p>


```xml
&lt;script src="https://cdn.jsdelivr.net/npm/libpag@latest/lib/ffavc.min.js"&gt;&lt;/script&gt;

```


<p>通过如下方法完成软件解码器的注册：</p>


```ini
// Initialize ffavc webassembly module.
const FFAVC = await window.ffavc.FFAVCInit();
const ffavcDecoderFactory = new FFAVC.FFAVCDecoderFactory();
PAG.registerSoftwareDecoderFactory(ffavcDecoderFactory);

```




### 4、总结

            
<p>PAG对于经常还原动效的前端而言，是非常实用的，其SDK 的能力很全面，覆盖的业务场景从常用的UI动效、H5动效，到当下热门的短视频模板、直播礼物等，可以说非常广泛。</p>
<p>这里再总结下它解决的问题：</p>
<p>第一，去研发成本：素材生产环节无需研发介入，节省大量研发人力和调试返工成本。研发只需要接入一次SDK的成本，后续设计师可以独立完成素材的生产上线，也避免了最耗时的研发和设计的联调环节，最终将素材生产相关的研发成本大幅降低。</p>
<p>第二，工业化生产：由于不再受到研发人力瓶颈的限制，素材生产可以扩大到更多的设计师进行批量化生产。再加上桌面效率工具在效果预览和性能检测上的易用性，设计师可以所见即所得地生产素材，最终让视频模板平均生产耗时从一周降低到四个小时，实现快速响应运营热点。</p>
<p>第三，无限AE动效：PAG的SDK已经完全还原了AE的整个动效渲染系统，并支持矢量和序列帧混合导出，接入一次，设计师就可以复用PAG经过5年积累的AE动效原子能力，组合出无限的视觉动效，不用因为代码还原成本的问题而对效果打折扣。</p>
<p>业务中需要解决这些问题的朋友都可以尝试使用下，最后附上 PAG 相关的资源，大家感兴趣可以进一步了解：</p>
<p>官网: https:/pag.art/</p>
<p>Github：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FTencent%2Flibpag" target="_blank" title="https://github.com/Tencent/libpag" ref="nofollow noopener noreferrer">github.com/Tencent/lib…</a></p>