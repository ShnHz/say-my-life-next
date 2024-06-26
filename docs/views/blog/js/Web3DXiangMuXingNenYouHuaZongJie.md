---
title: Web3D项目性能优化总结
date: 2024/04/05 08:40:20
summary: 
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["info","js"],
    valine: true,
    valineId: 
}
password: false
outline: [3,5]
---

###### 原文 [掘金](https://juejin.cn/post/7220354212736450616)



# 一.工具

            


## 1.chrome插件

            
<p>babylon.js提供的Spector.js插件</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fspectorjs%2Fdenbgaamihkadbghdceggmchnflmhpmk" target="_blank" title="https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk" ref="nofollow noopener noreferrer">chrome.google.com/webstore/de…</a></p>
<p>点击会刷新页面，再点击结束，等一会会自动打开一个tab页，有数据分析结果。</p>


## 2.渲染库的性能面板

            
<p>以Layaair stat面板的性能指标为例，Threejs类似</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fldc2.layabox.com%2Fdoc%2F%3Fnav%3Dzh-ts-4-23-0" target="_blank" title="https://ldc2.layabox.com/doc/?nav=zh-ts-4-23-0" ref="nofollow noopener noreferrer">ldc2.layabox.com/doc/?nav=zh…</a></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf3a831317b745e58f9834ab9167038a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>参与统计的性能参数如下（所有参数都是每大约1秒进行更新），除去Fps都是越低~性能越高：</p>
<p>（1） <strong>FPS(WebGL)/FPS(3D)：</strong> Laya2D 模式或者 Laya3D 模式下的帧频，也就是每秒显示的帧数，值越高、越稳定，感觉越流畅；</p>
<p>（2）<strong>Sprite：</strong> 统计场景上所有状态为Active的精灵（包括容器）数量，它的大小会影响引擎进行节点遍历、数据组织和渲染的效率。</p>
<p>（3）<strong>RenderBatches：</strong> 渲染批次；</p>
<p>（4）<strong>SavedRenderBatches：</strong> 合并的渲染批次；</p>
<p>（5）<strong>CPUMemory：</strong> CPU内存;</p>
<p>（6）<strong>GPUMemory：</strong> GPU显存 ;</p>
<p>（7）<strong>Shader：</strong> Shader提交次数 ;</p>
<p>（8）<strong>TriFaces：</strong> 三角面 ;</p>
<p>（9）<strong>Frustumculling：</strong> 摄像机的视锥裁剪次数；</p>
<p>（10）<strong>OctreeNodeCulling：</strong> 八叉树节点裁剪次数；</p>


## 3.其他工具

            
<p>（1）texturepacker，把多个图拼成精灵图。合批可使用。</p>
<p>（2）shoebox，把合成的图拆成各种小图。<a href="https://link.juejin.cn?target=http%3A%2F%2Frenderhjs.net%2Fshoebox%2F" target="_blank" title="http://renderhjs.net/shoebox/" ref="nofollow noopener noreferrer">renderhjs.net/shoebox/</a></p>
<p>（3）xcode</p>
<p>senseCube遇到了ios小程序web-view很容易崩溃的问题</p>
<p>用x-code搞一个IOS的webview容器，查内存占用量；</p>
<p>发现ios微信小程序的web-view超过1G多久会崩溃；安卓的限制就高很多；</p>


# 二.webgl常规优化手段

            


# 【一.加载性能优化，6点】

            


## 1.模型的网格压缩、纹理贴图压缩

            
<p>（1）保证效果的前提，模型体积和面数尽量少。</p>
<p>（2）使用压缩率高的模型格式~fbx、gltf。</p>
<p>（3）具体细节可看下面第三点“3D资产体积的极致优化”。</p>


## 2.gzip

            
<p>（1）纯字符编码的模型，如 glb、obj、dae 等，在服务端开启 gzip 压缩，可以带来较好的压缩比。</p>
<p>（2）使用 gzip 压缩是服务器与浏览器直接默认完成的，无需任何额外操作，对开发者是无感知。</p>


## 3.分时、分包加载（大场景、大对象）

            
<p>1.适用场景</p>
<p>超大数据量模型渲染卡顿，渲染对象数量过多，顶点多数据量大，一次性渲染耗时超长，FPS小，卡顿严重。</p>
<p>BIM建筑信息模型（Building information modeling ）</p>
<p>GIS地理信息系统 (Geographic information system)</p>
<p>2.把大数据拆分成很多小份。</p>
<p>（1）BIM建筑模型，拆成各种小部分；GIS按照tile瓦片拆分。</p>
<p>（2）用settimeout延时加载，不会阻塞主线程交互。类似unity的分帧处理。</p>
<p>（3）开启多个worker处理。</p>
<p>（4）如果觉得小包渲染太突兀，可以用很低的低模，或者简单的占位模型。</p>


## 4.使用web workers开启多进程

            
<p>（1）比如tile分包、zip包等数据的处理，新开一个worker</p>
<p>（2）注意worker不要太多，会占用过多内存</p>
<p>ktxloader、dracoloader默认设置只开启一个worker，开启太多会占用过多内存。</p>


## 5.使用缓存

            


### 5-1.CDN

            


### 5-2.浏览器缓存

            
<p>强制缓存、协商缓存，常规前端知识不再赘述。</p>


### 5-3.浏览器数据库IndexedDB

            
<p>（1）indexedDB 具有良好的查询性能，超大的存储空间（理论上磁盘剩余空间的一半左右），以及支持二进制存储等优良特性，比较适合做前端模型以及贴图数据的缓存。</p>
<p>（2）很多Webgl 引擎(例如 <code>Babylon.js</code> )已经在引擎级别对 indexedDB 缓存做了支持。开发者只需要简单配置，即可打开缓存，优化加载体验。</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdoc.babylonjs.com%2Ffeatures%2FfeaturesDeepDive%2Fscene%2FoptimizeCached" target="_blank" title="https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeCached" ref="nofollow noopener noreferrer">doc.babylonjs.com/features/fe…</a></p>


## 6.复用资源

            
<p>复用material材质、geometry几何体、骨骼数据等</p>
<p>（1）模型资源制作时就复用，由美术同学处理</p>
<p>（2）使用缓存，texture贴图缓存。</p>
<p>（3）浅拷贝，比如threejs的clone</p>
<p>senseCube数字人的模型中，骨骼数据占用非常大，使用浅拷贝很多资源可以复用。</p>
<p>THEE.Object3D.clone，源码是threejs Object3D的copy，浅拷贝。</p>


# 【二.渲染帧率优化，6点】

            


## 1.适当降帧

            
<p>用settimeout设置帧率降到30就好，不用RAF的60帧。</p>
<p>window.setTimeout(mainTick, 1000 / 30);</p>


## 2.各种剔除Culling优化

            
<p>最快的渲染一个物体的方法就是：不渲染 <strong>“do nothing”</strong> <strong>。</strong></p>


### 2-1.视椎体剔除 Frustum-Culling

            
<p>（1）大部分的引擎都已经自带，且默认开启的。</p>
<p>threejs，obj.frustumCulled属性，默认开启的true，不在视线内就不渲染；</p>
<p>（2）自己实现，算法也比较简单，一般是遍历视椎体的 6 个面，算出物体的中心到面的最小距离（带正负方向的）与包围球的半径做比较，如果小于半径，就表示在外面。</p>


### 2-2.背面剔除Backface Culling

            
<p>（1）渲染引擎大多会默认开启背面剔除。</p>
<p>（2）原生 webgl 中使用 <code>gl.enable(gl.CULL_FACE);</code> 来开启背面剔除。</p>
<p>（3）在 threejs 中可以使用 material 的 side 属性指定 front 进行单面渲染。</p>
<p>背面就看不到，senseCube的广告塔碰过这个问题。</p>


### 2-3.遮挡剔除Occlusion-Culling，简称OC

            
<p>默认是不开启，需要特殊处理。</p>


#### 1.背景

            
<p>（0）提交GPU之前就处理</p>
<p>虽然 gpu 有深度测试，会将有遮挡的物体进行剔除，但是希望在提交 GPU 之前对遮挡关系进行判断，提前剔除掉一些东西，减少渲染压力。</p>
<p>（1）PVS(Precomputed Visibility System)预计算遮挡剔除，老一点的游戏引擎书籍叫PVS为“潜在可见集”Potential Visible Set。OC是PVS的一种实现，使用20多年的技术。</p>
<p>（2）相关文章：</p>
<p>nvidia开发文档两篇</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.nvidia.com%2Fgpugems%2Fgpugems%2Fpart-v-performance-and-practicalities%2Fchapter-29-efficient-occlusion-culling" target="_blank" title="https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-29-efficient-occlusion-culling" ref="nofollow noopener noreferrer">developer.nvidia.com/gpugems/gpu…</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.nvidia.com%2Fgpugems%2Fgpugems2%2Fpart-i-geometric-complexity%2Fchapter-6-hardware-occlusion-queries-made-useful" target="_blank" title="https://developer.nvidia.com/gpugems/gpugems2/part-i-geometric-complexity/chapter-6-hardware-occlusion-queries-made-useful" ref="nofollow noopener noreferrer">developer.nvidia.com/gpugems/gpu…</a></p>
<p>如何用八叉树和 zbuffer 配合做剔除</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.gamedeveloper.com%2Fprogramming%2Focclusion-culling-algorithms" target="_blank" title="https://www.gamedeveloper.com/programming/occlusion-culling-algorithms" ref="nofollow noopener noreferrer">www.gamedeveloper.com/programming…</a></p>
<p>webgl2 OcclusionQuery 遮挡查询</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftsherif%2Fwebgl2examples%2Fblob%2Fmaster%2Focclusion.html" target="_blank" title="https://github.com/tsherif/webgl2examples/blob/master/occlusion.html" ref="nofollow noopener noreferrer">github.com/tsherif/web…</a></p>


#### 2.分类

            
<p>（1）SOC，static-occlusion-culling，静态遮挡剔除/离线剔除。</p>
<p>仅仅是记录了空间中可见物体的 <strong>ID</strong>。</p>
<p>（2）POC，Portal-occlusion-culling，实时剔除，对可移动物体进行剔除。</p>
<p>存的不再是对象ID, 存的是另一个区块的可见性。</p>
<p>配合八叉树场景管理，移动的物体实时更新自己所处的区块位置，摄像机只需要拿到可见区块列表，并渲染可见区块中的动态物体即可。</p>


### 2-3-1.SOC静态剔除，Cocos Cyberpunk项目PVS-SOC原理

            


#### 0.概念：

            
<p>（1）适合静态模型密集的场景，比如吃鸡、原神等游戏中的主城区域。</p>
<p>（2）将可见关系预先存入空间格子，渲染时直接查表获得渲染列表，并隐藏不可见的模型，极大地提升效率，对建筑密集的场景最为实用。</p>


#### 1.源码

            
<p><strong>pipeline/components/occlusion-culling</strong></p>


#### 2.步骤

            
<p>1.标记出需要处理的区域。</p>
<p>2.将区域分成剔除区块（Block），烘焙可见性</p>
<p>（1）在每一个剔除区块（Block）中，使用射线查询的方式，向外发射足够多的射线</p>
<p>（2）射线射中的模型 ID ,会被加入到当前区块（Block）的可见列表renderers中</p>
<p>（3）两种射线</p>
<p>1）<code>球型随机射线</code>，快速烘焙模式，根据设置的Sphere Bake Count随机生成不同方向的射线，越多越精准，耗时越久</p>
<p>2）<code>模型顶点射线</code>，遍历场景中的所有顶点，每个顶点生成一根射线。</p>
<p>（4）使用gpu.js 加速。显卡越好烘焙效率越高。</p>
<p>3.渲染时，根据摄像机位置计算出处于哪一个剔除区块</p>
<p>（1）如果处于剔除区块，则取出对应区块中可见的对象列表，并标记为可见。</p>
<p><strong>StaticOcclusionCulling</strong> 类中， <strong>calcCulling</strong> 方法，计算当前摄像机处于哪一个区块，然后把区块的可见对象的渲染标记设置为 <strong>true</strong>。</p>
<p>（2）如果不处于剔除区块，则不做任何处理，按引擎默认流程执行</p>


### 2-3-2.补充知识，剔除Culling和裁剪Clipping的区别

            
<p><strong>1.剔除</strong>：是指将不符合条件的对象<strong>整个</strong>丢弃。</p>
<p><strong>2.裁剪</strong>：是指将超出边界的<strong>部分</strong>裁掉，只留边界内的<strong>部分</strong>。</p>
<p>（1）senseCube，其他玩家走出视野，人物模型原点出了视区，就把整个人物剔除了，有点突兀。</p>
<p>1）使用threejs的Clipping裁剪，细节和原理不再赘述。</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fthreejs.org%2Fexamples%2F%3Fq%3Dclipping%23webgl_clipping" target="_blank" title="https://threejs.org/examples/?q=clipping#webgl_clipping" ref="nofollow noopener noreferrer">threejs.org/examples/?q…</a></p>
<p>2）优化视椎体剔除，不用原点判断剔除，用包围盒判断，全部出去了才剔除。</p>


### 2-4.使用距离判断，让较远的小型物体不显示

            
<p>（1）大型游戏引擎自带实现。</p>
<p>（2）代码自己实现，senseCube中按距离+优先级。</p>


### 2-5.打标记提前过滤，如threejs对象layer属性

            
<p>（1）视椎体剔除。</p>
<p>该对象只有至少有一个与正在使用的相机的layer值相同时才可见。</p>
<p>（2）射线检测优化。</p>
<p>使用Raycaster 射线检测时，此属性还可用于在光线相交测试中过滤掉不需要（layer值不同）的对象。</p>


## 3.合批batch

            
<p>1.性能优化的思路</p>
<p>（1）优先是剔除不需要渲染的对象；</p>
<p>（2）在必须要渲染的对象中，再用合批来合并和减小drawcall。</p>
<p>2.详见下面第四点“DrawCall、合批”，主要是合并材质+合并网格。</p>


## 4.Instance/Instancing ~ GPU 实例化

            


### 1.适用场景

            
<p>特别适合那些外观一致大量重复的渲染。比如小树组成的森林，一个发布会场景中的大量椅子等等。</p>


### 2.原理

            
<p>（1）在 instance 渲染的时候，不需要传入大量的顶点数据</p>
<p>（2）只需要传入每个 instance 的 matrix 数据，<code>共享一份顶点数据</code>，可大大降低显存的使用率，降低显存带宽。</p>
<p>（3）但要注意下，instance 的使用所带来一些额外处理，比如单个物体的选择操作等问题。</p>


### 3.代码实现

            
<p>（1）在 webgl 中我们使用的是<code>ANGLE_instanced_arrays</code>扩展来实现 instance 渲染。</p>
<p>（2）threejs也有InstancedMesh InstancedBufferGeometry，来实现实例化。</p>
<p>参考这篇：<a href="https://link.juejin.cn?target=http%3A%2F%2Fevents.jianshu.io%2Fp%2F0c80ce973873" target="_blank" title="http://events.jianshu.io/p/0c80ce973873" ref="nofollow noopener noreferrer">events.jianshu.io/p/0c80ce973…</a></p>


## 5.LOD，Level of Detail多层级细节

            


### 1.分类：

            
<p>不只是mesh LOD，更重要的是材质material LOD，</p>


### 2.背景

            
<p>（1）复杂的材质给 GPU 带来的渲染负担，远远大于模型面数。</p>
<p>（2）对于很多项目来说，材质 LOD 就足够胜任了，不需要对 Mesh 进行处理，只需要编辑好不同级别使用的材质，就能提升很多性能。</p>


### 3.性能优化的解决方案

            
<p>（1）优先考虑Culling剔除，见上面的知识点。</p>
<p>（2）材质LOD。</p>
<p>（3）mesh LOD，前面两种方案还是不够，再考虑。</p>


### 4.材质material LOD

            
<p>（1）根据距离来分级，cocos引擎自带支持。</p>
<p>最近距离用pbr材质，中等距离关闭一些特性或者用phong材质，特别远直接用unlit/basic材质。</p>
<p>（2）根据机型把材质等效果分级，senseCube使用。</p>
<p>1）2种方案，一种自动给用户升或降级。另一种是提供弹窗让用户自己切换等级。</p>
<p>2）senseCube是第二种，检测fps低了，弹窗让用户选择降低效果，分三个档次</p>
<p>默认，高是pbr材质。中等是phong材质。低等是basic/unlit材质。</p>


### 5.Mesh LOD 如何生成多套不同精度的模型

            
<p>（1）建模软件中有减面工具，美术同学处理。</p>
<p>（2）开源的减面库，进行程序减面。一般选取一些 QEM 算法减面，但是这类算法都有一些局限，比如贴图问题，破面问题。需要程序不断调试，找到比较合适的参数。</p>
<p>（3）商业的 sdk 进行减面。一般用simplygon、instlod 等成熟的商用减面工具，也广泛的使用在游戏等行业。</p>
<p>（4）很多游戏引擎也自带一些减面工具，比如 u3d、ue4 等都支持 LOD 减面。</p>


## 6.动画优化

            
<p>1.原则</p>
<p>（1）当带动作的物体，位置超过整个屏幕时，不可见时，停止动画的更新渲染。</p>
<p>（2）动画合批，尽量少的drawcall。</p>
<p>2.实战碰到的问题~ Lottie 动画优化</p>
<p>（1）Lottie 动画自带图集合并，理论上它可以做到只占用一个 DrawCall ，但是遇到问题。</p>
<p>（2）原因：</p>
<p>它只能保证在单个 Lottie 中，渲染顺序是对的，但不能避免多个 Lottie 交叉不会出问题。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6b7efa9e5f04eca851e4192bbabe2e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>（3）解决方案</p>
<p>在项目初期就定义不同 Lottie 组件分属的层级，不同 Renderer 的 <code>priority</code> 应当井水不犯河水，在调整完渲染优先级后，DrawCall 就正常了。</p>


# 【三.内存管理优化，5点】

            


## 0.3D模型极限压缩

            
<p>可以大大节省内存。细节见下面第三点“3D自测体积的极致优化”</p>


## 1.避免在render()中进行实例化或者赋值等操作

            
<p>以免产生太多对象，占用大量内存。</p>


## 2.选择更优更合适的对象，减少内存占用

            
<p>（1）粒子系统代替许多单个粒子。</p>
<p>（2）BufferGeometry代替Geometry几何体，新版已经移除了Geometry类，默认使用更好的BufferGeometry。</p>
<p>旧版Geometry，通过vertices和faces来创建自定义几何体。</p>
<p>新版BufferGeometry，通过attributes和index来创建。</p>


## 3.及时释放内存

            
<p>（1）不使用对象时，及时销毁对象，释放 JS 内存</p>
<p>（2）js推送完数据给GPU之后，将这部分数据从内存中释放掉。</p>
<p>1）threejs <code>BufferAttribute</code>有一个<code>onUpload</code>回调函数，在数据推送到 GPU 之后调用，可在回调函数中释放掉 js 中的数据。</p>
<p>2）注意，这个回调函数只在第一次的时候有用，在 attribute 更新 update 的时候，并不会触发。应该算是个 bug，但 threejs 的作者<code>doob</code>并不十分感冒。</p>


## 4.V8堆内存，可以修改上限值

            
<p>（1）v8 引擎，默认32 位的JS heap(新生代很小) 最多能到 0.7G ，64位最多1.4G。如果不及时释放内存，很容易内存爆掉，导致浏览器 crash。</p>
<p>（2）比如webgl项目中，当模型特别大的时候，可调整老生代空间的大小</p>
<p>--max-old-space-size 老生代</p>
<p>--max-semi-space-size 新生代分为两个semispace半空间</p>


```arduino
# node在启动时可以传递参数来调整限制内存大小。
node --max-old-space-size=1700 // 单位是M
node --max_semi_space_size=1024 // 单位是KB

例子
node --max-old-space-size=1700 index.js

```




## 5.内存泄露问题处理

            
<p>（1）常规前端的内存泄露，细节不再赘述</p>


```javascript
1.addEventListener
2.setTimeout/setInterval
3.闭包
4.全局对象存储
5.各种监听器Observable，IntersectionObserver、 ResizeObserver、 MutationObserver 等。
6.未得到解决或拒绝的Promise
7.无限的DOM增长
8.保存了dom的引用，dom节点从文档删除后，需要把引用置为null
9.特殊语法中的变量不会被垃圾回收，比如with语句、try catch语句、new Function语句

```


<p>（2）webgl项目中的内存泄漏</p>
<p>senseCube项目中碰到的内存泄露问题，包括业务侧代码问题，第三方库源码问题。</p>
<p>具体细节后面单独写一篇文章。</p>


# 【四.交互优化~模型拾取，2点】

            


## 1.GPU 拾取

            
<p>1.原理</p>
<p>一般做法是给每个 mesh 一种颜色 然后渲染绘制一遍，在鼠标点所在的位置调用 readPixel 读取像素颜色，根据颜色与模型的对应关系，反推当前拾取到的颜色对应的 mesh。</p>
<p>2.对比射线拾取的优点</p>
<p>（1）精度更高。</p>
<p>（2）性能消耗从CPU转移到GPU。</p>
<p>（3）性能损耗，只发生在用户点击的瞬间，其他情况是不用做处理的。射线拾取是实时处理。</p>


## 2.BVH+八叉树结构

            
<p>Layaair 3.0大版本的优化点</p>
<p>（1）BVM，层次包围盒，详见游戏引擎学习笔记的文章。</p>
<p><a href="https://juejin.cn/post/7217295157706801210#heading-70" target="_blank" title="https://juejin.cn/post/7217295157706801210#heading-70">juejin.cn/post/721729…</a></p>
<p>（2）场景管理，使用八叉树的数据结构</p>
<p>将整个场景中的模型放入八叉树的不同 cell 中，由于八叉树类似空间范围内的二分查找（2^3=8），所以能够非常迅速将查找范围落在最终需要遍历的模型上。从而达到加速模型场景遍历的目的。</p>
<p>（3）对于八叉树的实现网上有很多的版本，可以参考，一般使用的是稀松八叉树。</p>


# 【五.效果优化，4点】

            


## 1.烘焙高模的各种细节效果，贴图给低模

            
<p>当移动端低端机型，受限于性能必须使用低模的效果，也能够焕然一新。</p>


## 2.FSR 超分~超级分辨率

            
<p>1.全称为“<strong>FidelityFX Super Resolution</strong>”。简单的说就是可<strong>将<strong><strong>低分辨率</strong></strong>画面渲染为高分辨率</strong>。</p>
<p>2.通过<strong>3个历史帧</strong>和<strong>当前帧数****对比</strong>，通过像素点的变化来计算画面边缘和像素细节可以获得更好的分辨率。</p>


## 3.三个核心效果优化，光照、材质、阴影。

            
<p>详见游戏引擎入门的笔记的五六七章。</p>
<p><a href="https://juejin.cn/post/7218774755781460027" target="_blank" title="https://juejin.cn/post/7218774755781460027">【游戏引擎入门到实践】五.求解渲染方程的最基础解决方案 - 掘金</a></p>
<p><a href="https://juejin.cn/post/7218873657325240381" target="_blank" title="https://juejin.cn/post/7218873657325240381">【游戏引擎入门到实践】六.渲染方程进一步优化的解决方案 - 掘金</a></p>
<p><a href="https://juejin.cn/post/7218916901593186360" target="_blank" title="https://juejin.cn/post/7218916901593186360">【游戏引擎入门到实践】七.渲染效果的前沿解决方案 - 掘金</a></p>


## 4.自定义渲染管线和后处理高级效果

            
<p>详见这一篇</p>
<p><a href="https://juejin.cn/post/7218926048243089468" target="_blank" title="https://juejin.cn/post/7218926048243089468">自定义渲染管线、延迟渲染、常见后处理效果 - 掘金</a></p>


# 三.3D资产体积的极致优化

            


## 1.贴图的图片压缩

            


### 1-1.压缩体积

            
<p>图片体积大小影响内存占用。</p>


### 1-2.减小尺寸

            
<p>（1）图片尺寸影响显存占用。相同尺寸图片，压缩体积前后，显存占用是一样的。</p>
<p>（2）尺寸不要太大，且是2的n次幂，可以后续纹理压缩。</p>
<p>（3）默认纹理贴图尺寸512，其他对效果影响不大的贴图比如~烘培贴图.可调小到256，一些对效果要求高的物体的贴图可以适当提高到1024这样。</p>


## 2.网格压缩，模型减面

            
<p>1.建议让美术同学处理</p>
<p>（1）低模、去掉一些多余的树等等</p>
<p>（2）手动压缩，建模工具的减面插件。</p>
<p>2.Draco</p>
<p>谷歌C++库draco可压缩gltf体积，且官方提供了编译好的wasm版本，three默认支持。</p>
<p>注意draco压缩的是mesh网格，纹理压缩是压缩纹理贴图。</p>
<p>3.gltf的扩展插件</p>
<p>KHR_mesh_quantization，quantization向量化</p>
<p>（1）顶点属性通常使用FLOAT类型存储，将原始32位浮点值转换为16位或8位存储以适应统一的3D或2D网格。</p>
<p>（2）例如，静态 PBR-ready 网格通常需要每个顶点POSITION（12 字节）、TEXCOORD（8 字节）、NORMAL（12 字节）和TANGENT（16 字节），总共 48 字节。</p>
<p>通过此扩展，可用于SHORT存储位置和纹理坐标数据（分别为 8 和 4 字节）以及BYTE存储法线和切线数据（各 4 字节），每个顶点总共 20 字节。</p>
<p>（3）可使用gltfpack工具进行压缩</p>


```css
gltfpack -i male.glb -o male-processed.glb

```




## 3.Combine合并mehs节点

            
<p>1.开源库进行自动处理。</p>
<p>比如threejs提供BufferGeometryUtils的mergeBufferGeometries方法</p>
<p>目录three/examples/jsm/utils/BufferGeometryUtils</p>


```ini
const combinedGeometry = BufferGeometryUtils.mergeBufferGeometries(bufferGeometries);

```


<p>2.建议让美术手动处理，注意要避开poi</p>
<p>POI之外的mesh进行合并。</p>


## 4.纹理贴图合并和复用

            
<p>美术同学处理，同样注意避开POI点位即可。</p>


## 5.纹理贴图压缩

            


### 1.Basis Universal纹理格式

            
<p>2019 五月份，Binomial 公司和 google 联合推出了 Basis Universal 压缩 GPU 纹理技术，Basis Universal 支持多种常用的压缩纹理格式，将 png 转换为 basis 文件后，大小与 jpg 格式差不多，但在 GPU 上比 png/jpg 小 6-8 倍。</p>
<p>在保持 GPU 性能效率的同时，提升 Web、桌面端和移动应用程序中图像传输的性能。</p>


### 2.senseCube中使用步骤

            
<p>转成通用压缩纹理格式~threejs支持，然后到具体平台比如安卓ios再转成各自平台的压缩纹理格式。比如ktx2格式；</p>
<p>参考这篇：<a href="https://link.juejin.cn?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Farticle%2F1453561" target="_blank" title="https://cloud.tencent.com/developer/article/1453561" ref="nofollow noopener noreferrer">cloud.tencent.com/developer/a…</a></p>
<p>使用的库：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBinomialLLC%2Fbasis_universal" target="_blank" title="https://github.com/BinomialLLC/basis_universal" ref="nofollow noopener noreferrer">github.com/BinomialLLC…</a></p>
<p>核心原理，写自动化的shell脚本，把glb转成gltf+各种图片，每个图片执行这个命令，最后合成glb</p>


## 6.包压缩

            
<p>（1）类似zip一样，客户端需要解压，文件体积并没有真正的减小。而且解压时内存会增加；</p>
<p>（2）可以使用下面的开源库；</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fzeux%2Fmeshoptimizer" target="_blank" title="https://github.com/zeux/meshoptimizer" ref="nofollow noopener noreferrer">github.com/zeux/meshop…</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fgltfpack" target="_blank" title="https://www.npmjs.com/package/gltfpack" ref="nofollow noopener noreferrer">www.npmjs.com/package/glt…</a></p>


## 7.效果记录

            
<p>（1）四步
六万平的场景模型</p>
<p>最开始100多M，美术初版优化到70多兆</p>
<p>经过第一步 贴图压缩+减模+mesh合并，美术手动合并后，大小为47.9M</p>
<p>经过第二步纹理压缩，大小为25.2M</p>
<p>再经过第三步包压缩，大小为6.1M</p>
<p>第四步网络请求再加个gzip可以压到5M以内；</p>
<p>（2）最终去掉了第三步，解压内存增长较大，防止ios webview崩溃。纹理压缩完就进行gizp传输了。</p>


# 四.DrawCall、合批

            


## 1.概念

            


### （1）drawcall，绘制命令

            
<p>简单理解一个 batch批处理 就是一个 drawcall。</p>


### （2）合批~批量渲染

            
<p>组织更多一致的渲染数据提交给 GPU 的过程，称之为“批量渲染”简称“合批”。</p>
<p>合批的前提是，渲染数据必须一致。</p>


### （3）drawcall过多

            
<p>1）GPU 渲染图像的速度非常非常快。</p>
<p>而CPU 的内存\显存读写、数据处理和渲染状态切换，相比 GPU 非常非常慢。</p>
<p><strong>Draw Call</strong> 过多会导致 <strong>CPU</strong> 需要组装很多渲染指令，出现瓶颈，GPU一直在等待。</p>
<p>2）通俗的来说就是，CPU过载，太慢了，而GPU却一直空闲等待；</p>
<p>3）<strong>Draw Call</strong> 过多，也一定程度上反映了需要渲染的内容过多，也会给 <strong>GPU</strong> 造成较大压力。</p>


## 2.DrawCall过多的解决方法

            
<p>（1）尽早剔除掉不需要渲染的对象。</p>
<p>既能减少 DrawCall，又能减少GPU渲染负担的方法。</p>
<p>毕竟：<strong>一个模型最快的渲染方式就是让它不渲染！</strong></p>
<p>剔除的细节上面内容有讲到。</p>
<p>（2）合批</p>
<p>将多个drawcall合并。</p>
<p>尽可能一次性将更多的渲染数据提交给 GPU，减少 CPU 的工作时间，从而提升游戏性能。</p>
<p>比如， <code>Static Batching静态合批</code>，<code>Dynamic Batching 动态合批</code>，<code>GPU Instancing 实例化</code>等。</p>


## 3.合批的具体做法

            


### 3-1.合并材质，相同材质进行合并图集

            
<p>（1）不同种材质效果，需要不同的 shader 实现，所以无法实现合批展示。</p>
<p>（2）2D游戏资源的图片，合并图集（sprites雪碧图），一次提交</p>
<p>（3）注意要合理的打包图集，图集过大会有如下问题</p>
<p>1）全部合成一张，GPU只是渲染某个界面却要拿出整个图集去操作。</p>
<p>2）热更新也会说我太难了,只是更新某个界面里的按钮图片样式却要替换整个图集。</p>


### 3-2.合并网格

            
<p>（1）美术处理，手动或者工具处理</p>
<p>适合静态的物体,比如不会动的地面、树和石头。对于这些静态物体我们合并一次即可；</p>
<p>（2）代码进行合并</p>
<p>threejs可以使用 BufferGeometryUtils 的 mergeBufferGeometries 方法进行合并 batch。</p>
<p>或手工进行顶点 loop 循环合并顶点，其实原理差不多。</p>


## 3.动态合批

            


### 1.例子cocos社区的98k合批插件

            
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F_P1H0yoYuX5XTZCDIA0S6A" target="_blank" title="https://mp.weixin.qq.com/s/_P1H0yoYuX5XTZCDIA0S6A" ref="nofollow noopener noreferrer">mp.weixin.qq.com/s/_P1H0yoYu…</a></p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f1d0b0ba17a41fa8830f1540e0ef6b2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>


### 2.原理

            
<p>（1）拦截引擎渲染开始事件，对节点树下的所有子节点按类型重新分层排序；</p>
<p>从而让相同材质同一个批次进行渲染。</p>
<p>（2）拦截引擎渲染结束事件，立即还原渲染前的节点树排序，从而实现无入侵式的合批优化。</p>
<p>（3）<code>BatchItem</code>组件，唯一的 Culling剔除 属性是可选的，它会拿 Culling 属性所指定的矩形区，与容器中 item 矩形做相交测试，将不在 Culling 区的元素从渲染队列中剔除掉。</p>


### 3.适用场景

            
<p>仅适用于 2D UI 界面的优化，特别是具有大量重复结构的 item 场景。</p>
<p>如：背包系统、滑动列表、技能栏、聊天界面等，以下应用场景供大家参考。</p>


### 4.动态合批和静态合批的区别

            
<p>（1）静态合批：模型提前处理好。</p>
<p>（2）动态合批：运行时，实时处理，比如上面的cocos合批插件。</p>


# 五.shader的优化

            


## 1.把GPU擅长的计算（比如矩阵）放到shader而不是js中

            
<p>1-1.gpu对矩阵的计算有专门的优化，非常快速。</p>
<p>1-2.注意不要滥用，比如webgl编程指南中有个demo</p>
<p>（1）vertexShader中</p>


```ini
 ……
attribute vec4 u_MvpMatrix;
……
void main() {
    gl_Position = u_MvpMatrix * a_Position;
}
……

```


<p>（2）JS中</p>


```ini
 ……
var mvpMatrix = new Matrix4();
mvpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
……

```


<p>把modelMatrix/viewMatrix/proMatrix MVP矩阵全部在 js 中计算好，然后传入到 shader 中去</p>
<p>vertexShader执行的次数是和顶点有关系的，而每个顶点都需要做对象坐标-&gt;世界坐标-&gt;眼睛坐标的变换</p>
<p>（3）如果传入三个顶点去shader，就代表 gpu 需要将 proMatrix * viewMatrix * modelMatrix <strong>计算三次</strong>，</p>
<p>（4）而如果在 js 中就计算好，当作一个矩阵传给 gpu，会更好。</p>
<p>js 中虽然计算起来相较 gpu 慢，但是胜在次数少。</p>


## 2.JS与shader交互的成本很高，避免频繁切换uniform

            


### （0）背景

            
<p>有些动画，需要每个tick去更新shader的attribute和uniform，很耗时，因为是JS和glsl交互；</p>


### （1）避免多次改变uniform

            
<p>uniform 变量来放置外部JS程序传递来的数据，会有JS和glsl的交互。</p>


### （2）用attribute代替uniform

            
<p>attribute只能在 vertex shader 中使用</p>
<p>这篇文章有demo</p>
<p><a href="https://link.juejin.cn?target=http%3A%2F%2Fwww.alloyteam.com%2F2017%2F05%2Fwebgl-performance-optimizations-first-taste%2F%23prettyPhoto" target="_blank" title="http://www.alloyteam.com/2017/05/webgl-performance-optimizations-first-taste/#prettyPhoto" ref="nofollow noopener noreferrer">www.alloyteam.com/2017/05/web…</a></p>


## 3.减少切换shader program

            
<p>（1）切换program，在webgl中开销算是非常大的；</p>
<p>理论上来说可以单个 shader program 是可以写完整个程序的。</p>
<p>（2）program的作用是代替if else，相当于把 if else 抽出来单独一个 program。</p>
<p>（3）总结，如果一个 shader 里面的 if else 多到开销超过 program 的开销，才选择用 program。</p>


# 六.多人的优化手段

            


## 1.同样的人物模型资源复用

            
<p>（1）使用缓存，资源尽量复用。</p>
<p>比如senseCube项目中，封装了cloneObject3D方法。</p>
<p>本质是threejs Object3D的copy浅拷贝方法，引用类型共一份内存，基础类型额外占一点内存</p>
<p>(2)优化效果</p>
<p>数字人模型，优化前，添加一个人增加50M内存；优化后，添加一个人增加5M左右。</p>


## 2.网络同步消息优化，节约流量带宽

            
<p>（1）websocket，消息的压缩~gzip</p>
<p>默认不执行压缩，可扩展支持压缩<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.jb51.cc%2Ffaq%2F975459.html" target="_blank" title="https://www.jb51.cc/faq/975459.html" ref="nofollow noopener noreferrer">www.jb51.cc/faq/975459.…</a></p>
<p>（2）人物状态，全同步的时间增大，比如从5秒增加到10秒</p>
<p>（3）naf的其他优化</p>
<p>requiresNetworkUpdate 精度调大。</p>
<p>默认坐标和缩放的阈值0.001，旋转的阈值是0.5。</p>


# 七.内存问题排查

            


## 1.内存问题排查

            
<p>（0）更多细节可以看chrome官方的教程</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fchromium.googlesource.com%2Fchromium%2Fsrc%2F%2B%2Frefs%2Fheads%2Fmain%2Fdocs%2Fmemory-infra%2FREADME.md" target="_blank" title="https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/memory-infra/README.md" ref="nofollow noopener noreferrer">chromium.googlesource.com/chromium/sr…</a></p>
<p>（1）浏览器任务管理器，右键打开JS使用内存</p>
<p>左边红框内存是浏览器原生总内存，加上了C、C++等，右边红框是JS的堆内存。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67e06622807a45be839920ecce85dbe0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>（2）chrome的内存tab，看到的133MB基本等于上图JS使用内存</p>
<p>（3）使用detatched关键词，搜索游离的对象，它们是造成内存泄露的主要原因</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0700211d2dd3467eaf12afbf8b2e7482~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>（4）找到相关的代码</p>
<p>比如点击某一项，然后可以看到提示的问题代码处</p>
<p>比如senseCube，游离的视频，指向的three源码；</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08ce7edc69dc4a1db005856a9e101050~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>（5）22年1026发现，Chrome浏览器自己的bug，Safari是正常</p>
<p>创建了一个测试页面，只是创建video元素，不添加到dom上，也不播放视频</p>
<p>创建前内存： 22.7M</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21790fc2b6c94752aff7ca5a3a7201c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>创建19个video元素并在js代码中释放后，内存为：61.9M</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eb185f8c9e7442888c32f80724b1aeb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>memory标签查看内存快照，Video元素还是可以看得到</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ddf5d0df8d146418834713c10a4c64e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="" loading="lazy"></p>
<p>看起来是chrome自身的bug，导致video的内存未能全部释放；</p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fbugs.chromium.org%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D969049" target="_blank" title="https://bugs.chromium.org/p/chromium/issues/detail?id=969049" ref="nofollow noopener noreferrer">bugs.chromium.org/p/chromium/…</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fbugs.chromium.org%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D1376851%26q%3Dvideo%2520memory%2520leak%26can%3D2" target="_blank" title="https://bugs.chromium.org/p/chromium/issues/detail?id=1376851&amp;q=video%20memory%20leak&amp;can=2" ref="nofollow noopener noreferrer">bugs.chromium.org/p/chromium/…</a></p>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fbugs.chromium.org%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D1364827%26q%3Dvideo%2520memory%2520leak%26can%3D2" target="_blank" title="https://bugs.chromium.org/p/chromium/issues/detail?id=1364827&amp;q=video%20memory%20leak&amp;can=2" ref="nofollow noopener noreferrer">bugs.chromium.org/p/chromium/…</a></p>
<p>看chrome的bug列表，视频确实有不少内存管理问题。官方都没有去处理。</p>


## 2.console日志会导致内存泄漏？

            


### 2-1.背景

            
<p>（1）打开chrome控制台时，发现cosole会导致很大的内存泄露。</p>
<p>（2）一般在开发环境，需要打开控制台，可以做如下处理。</p>
<p>info/debug/warn给它重写为空函数，只留下error错误的日志输出</p>


```ini
const nofunc = () =&gt; {};

const funcList = isLocalDevelopment ? [] : ["info", "debug", "warn"];
funcList.forEach(funcName =&gt; {
  console[funcName] = nofunc;
});


```




### 2-2.console真的会导致内存泄露么

            
<p>参考这篇：<a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F5a9hHVc024Pl3c3Lyp08eg" target="_blank" title="https://mp.weixin.qq.com/s/5a9hHVc024Pl3c3Lyp08eg" ref="nofollow noopener noreferrer">mp.weixin.qq.com/s/5a9hHVc02…</a></p>
<p>（1）console.log 在 devtools 打开的时候是有内存泄漏的，因为控制台打印的是对象引用。</p>
<p>但是不打开 devtools 是不会有内存泄漏的。通过打印内存占用大小的方式，可以证明这一点。</p>
<p>（2）string 因为常量池的存在，同样的字符串只会创建一次。</p>
<p>但是new String 会在堆中创建一个对象，然后指向常量池中的字符串字面量，会创建多个对象，devtools打开会有内存泄露；</p>
<p>（3）此外，nodejs 打印的是序列化以后的对象，本质是字符串，所以是没有内存泄漏的。</p>
<p>（4）总结，生产环境也是可以用 console.log 的，没有内存泄漏问题。</p>
