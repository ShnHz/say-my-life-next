---
title: 视频抽帧及图像取色
date: 2023/04/13 10:14:22
summary: 视频抽帧功能以及图像取色功能实现的思路及关键代码
config: {
    show: true,
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["vue","js","tool"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

### 视频抽帧工具

#### 实现思路

+ 1.获取视频文件
+ 2.加载视频文件->video<-
+ 3.获取->video<-数据，拿到宽高
+ 4.监听视频播放位置->addEventListener('timeupdate',fn)<-
+ 5.根据定制化需求算出帧数数组/秒数数组，循环执行“前往视频指定位置”
+ 6.利用->canvas.toDataURL<-获取->base64图像数据<-
+ 7.生成图片文件
+ 8.分片压缩下载

#### 关键代码

##### 获取视频总帧数/帧率

->MediaInfo<-是一个能读取音频和视频文件并分析和输出音视频信息的工具，能输出的内容包括视频信息，音轨，字幕等。

->MediaInfo<-也可以在web端使用，需要使用到->mediainfo.js<-。->mediainfo.js<- 是->MediaInfoLib<-通过->WebAssembly<-技术封装来的，也是可以支持查看音视频的信息。

[WebAssembly技术](https://juejin.cn/post/7212444005065211961?share_token=1776334d-d47f-4967-9a29-62bea7f09453)

[mediainfo.js](https://github.com/buzz/mediainfo.js)


##### 前往视频指定位置

->currentTime<- 属性设置或返回音频/视频播放的当前位置（以秒计）。如果需要前往指定帧数，则需要求出视频总帧数/帧率，以获取帧数相对秒数的位置

```js
video.currentTime = n
```

#### 演示视频

<video src="https://cdn.chenyingshuang.cn/blog/js/ShiPinChouZhengJiTuXiangQuSe/spcz.mp4" controls="controls" />


### 图像取色工具

#### 实现思路

+ 1.获取图片文件
+ 2.加载图片文件->image<-
+ 3.获取->image<-数据，拿到宽高
+ 4.将图片绘制在->canvas<-上
+ 5.利用->canvas.getImageData<-获取图像每个像素点信息
+ 6.求出“灰度图数据”、”alpha通道“等等信息
+ 7.监听->canvas<-鼠标移动事件，同步获取当前鼠标指向像素点颜色信息
+ 8.求出当前鼠标指向像素点周围的颜色信息，实现放大镜功能

#### 关键代码

##### 获取图像每个像素点信息

```js
const imgData = ctx.getImageData(0, 0, width, height)
for (let i = 0, len = imgData.data.length; i < len; i += 4) {
    const r = imgData.data[i]
    const g = imgData.data[i + 1]
    const b = imgData.data[i + 2]
    const a = imgData.data[i + 3]
}
```

##### 如何判断灰度图

当所有像素点RGB三原色相同的时候，我们把这个图像称为灰度图

```js
if (r !== g || g !== b) {
    isHasGrayscale = false
}
```

##### 如何判断是否具有alpha通道

Alpha通道不是简单的指透明度，一张不透明的图片也可以携带Alpha通道。如果你只是想判断是否包含透明度，请参考：JS检测PNG图片是否有透明背景、头图等操作，想要校验Alpha，我们首先需要获取到图片的详细信息，这里我通过读取图片的二进制数据来获取详细信息。

通过阅读AlloyTeam的[png的故事](http://www.alloyteam.com/2017/03/the-story-of-png-get-images-and-pixel-content/)，对图片二进制数据有一些了解，得出一下结论：

+ [0, 8]位表示的是png图片的类型，可以通过这个判断图片类型，值为：[137, 80, 78, 71, 13, 10, 26, 10]；

+ [8, 12]位表示数据内容长度；

+ [12, 16]位表示数据块类型；

当[12, 16]的数据转成字节码为 IHDR 时，表示图片带有宽度、高度和深度数据：

+ [16, 20]16~19位表示图片的宽度

+ [20~24]位表示图片的高度

+ [25]位表示图片的深度

[25]就是我们所需要的数据，它有5种值：

+ 1：灰度图像，1、2、4、8、16

+ 2：真彩色图像，8、16

+ 3：索引彩色图像，1、2、4、8

+ 4：带有a通道数据的灰度图像，8、16

+ 6：带有a通道数据的真彩色图像，8、16

实现步骤

+ 读取图片缓冲区数据
+ 把缓存区数据转成二进制数据
+ 判断数据块类型
+ 根据[25]数值判断是否包含Alpha通道

```js
const readBuffer = (file: any) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});
};
 
export const isHasAlpha = async (file: any) => {
// 读取图片缓存区数据
const buffers = await readBuffer(file);
// 缓存区数据转成二进制数据，并获取0~25位数据
const uint8Array = new Uint8Array(buffers, 0, 26);
// 获取类型
let type = ''
uint8Array.slice(12, 16).forEach((number) => {
    type += String.fromCharCode(number)
})
// 判断类型和[25]的数值
if (type == 'IHDR' && (uint8Array[25] == 6 || uint8Array[25] == 4 || uint8Array[25] == 3)) {
    return true
} else {
    return false
}
```

#### 演示视频

<video src="https://cdn.chenyingshuang.cn/blog/js/ShiPinChouZhengJiTuXiangQuSe/txqs.mp4" controls="controls"/>