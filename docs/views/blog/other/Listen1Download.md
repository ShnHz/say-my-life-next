---
date: 2022/11/15 10:52:46
config: {
    top: false,
    dir: true,
    tag: ['tool'],
    valine: true,
    valineId: /blog/other/Listen1Download.html
}
title : Listen1歌曲快速下载到本地小攻略

---

<code>Listen1</code>听歌非常方便，但是可能由于版权问题没有提供下载功能，那我们想要批量下载到本地就非常麻烦。

### 准备工作 

[chrome]('https://chrome.google.com/webstore/detail/listen-1/indecfegkejajpaipjipfkkbedgaodbp?hl=zh-CN')或者[edge]('https://microsoftedge.microsoft.com/addons/detail/%E5%9C%A8%E7%BA%BF%E9%9F%B3%E4%B9%90%E7%9B%92/olaohimdpfifjlhlinbpcomealcebinf')下载<code>Listen1</code>的插件

### 单独歌曲下载

+ 1.打开<code>Listen1</code>浏览器插件
+ 2.打开<code>F12 开发者控制台</code>，进入网络界面(network)
+ 3.播放歌曲
+ 4.在控制台内找到MP3文件，双击打开
+ 5.在新的选项卡<code>Ctrl+S</code>即可

<br>
<img src="https://cdn.chenyingshuang.cn/blog/other/Listen1Download/1.jpg" />

### 批量下载

+ 1.打开<code>Listen1</code>浏览器插件
+ 2.打开<code>F12 开发者控制台</code>，进入控制台界面(console)
+ 3.将想要下载的歌曲添加到播放列表
+ 4.复制下面的代码，在控制台粘贴之后回车

```js
let errMusic = []

// 下载函数
function download(url, title) {
    axios.get(url, {
            responseType: "blob"
        })
        .then(resp => {
            if (resp.status !== 200) console.log('get file failed.');
            else return resp.data;
        })
        .then(blob => {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = title;
            link.click();
            window.URL.revokeObjectURL(link.href);
        }).catch(err => {
            errMusic.push(title)
        })
}

//  设置文件名：歌手_歌曲名.mp3
function get_name(idx) {
    let obj = threadPlayer.playlist.filter(obj => obj.id == idx)[0]
    return `${obj.artist}_${obj.title}.mp3`;
}

// 修改原播放器获取歌曲链接函数，增加获取链接时下载歌曲
threadPlayer.setMediaURI = function setMediaURI(uri, url) {
    if (url) {
        this._media_uri_list[url] = uri;
        //  插入下载函数
        download(uri, get_name(url));
    }
}

// 循环播放列表，获得每首歌的地址同时触发下载
for (let i = 0; i < threadPlayer.playlist.length; i++) {
    threadPlayer.retrieveMediaUrl(i, false)
}
```

输入代码后会自动下载播放列表的所有歌曲，如果不刷新页面的话，脚本还是在运行的，这个时候去歌单内播放歌曲也会自动下载到本地。

这边我的插件版本是<code class="default">2.27.0</code>，如果碰到问题可以确认一下是否版本号不一致，然后按照我的思路重新改一下代码即可。


