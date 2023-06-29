---
title: macos trustd securityd CPU过高问题
date: 2023/06/29 17:56:20
summary: 终于找到锅在哪了，sourcetree！！
config:
  {
    show: true,
    top: false,
    dir: true,
    dirTag: ['h3', 'h4', 'h5'],
    tag: [],
    valine: true,
    valineId,
  }
password: false
outline: [3, 5]
---

每次电脑时间开机过长时都会出现卡顿，一看“活动监视器” <code class="default">trustd securityd</code> CPU 占用过高

<img src="https://cdn.chenyingshuang.cn/blog/other/macostrustdsecuritydCPUGuoGaoWenTi/1.jpg" />

之前没有仔细去找问题，每次重启都会恢复正常，今天实在受不了了，就去网上找资料，终于被我发现锅应该扣在哪了！

原因可能是部分仓库服务器无法访问导致的，查看 SourceTree 设置这里有个检查远端 default 的更新，可能是这个问题。把检查远端更新去掉，观察一段时间发现问题终于解决了。

<img src="https://cdn.chenyingshuang.cn/blog/other/macostrustdsecuritydCPUGuoGaoWenTi/2.jpg" />
