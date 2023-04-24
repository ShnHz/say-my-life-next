---
title: Chrome
---
### 长页面截图
```
1.打开F12
2.按Ctrl + Shift + P
3.输入full size screenshot
4.回车
5.保存截图
```

### 常用插件
Vue.js devtools <br>
WEB前端助手(FeHelper) <br>
React Developer Tools <br>
Adblock Plus <br>
ColorPick Eyedropper <br>
Page Ruler <br>
Imagus(页面放大图片查看) <br>
project-naptha(图片提取文字) <br>
Octotree(在线资源管理器的方式阅读GitHub仓库的代码) <br>

### 调试动画
```
1.打开F12
2.找Animations选项卡
3.若没有，则点击右上角三点 -> More Tools -> Animations
```

### 调试Nodejs
```
1.运行js代码前加上“--inspect-brk”，例如“node --inspect-brk test.js”
2.打开chrome
3.打开F12
4.点击“显示/隐藏设备工具栏”右侧的“盒子按钮”
5.点击“源代码”选项卡，单击“开始脚本执行”
```

### 编辑页面上的任意文本
```
1.打开F12
2.在控制台输入 document.body.contentEditable="true" 或 document.designMode = 'on'
3.实现对网页的编辑
```