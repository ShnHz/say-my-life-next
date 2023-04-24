---
date: 2020-04-04 14:36
config: {
    top: false,
    dir: false,
    tag: ['css'],
    valine: true,
    valineId: /blog/css/FilterBW.html
}
title : 整个网站网页变黑白的效果
---


因为今天是对抗击新冠肺炎疫情斗争牺牲烈士和逝世通报的全国哀悼日，很多网站都把页面变成了黑白色

那这个是怎么做的呢

其实很简单,只需要给html添加<code class="default">filter</code>滤镜即可

```css
html {
    filter: gray;
    -webkit-filter: grayscale(100%);
}
```

在此，向所有抗击新冠肺炎疫情斗争牺牲的烈士致敬 

👩‍⚕️ 👨‍⚕️ 👩‍🏭 👨‍🏭 👮‍♀️ 👮‍♂️
