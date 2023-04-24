---
date: 2020-04-02 10:54
config: {
    top: false,
    dir: false,
    tag: ['vue','js'],
    valine: true,
    valineId: /blog/js/SmoothScrollAnchor.html
}
title : 使用JS实现平滑滚动至锚点
---
#### HTML代码
```html
<a @click="scrollTo('anchor1')">anchor1</a>
<a @click="scrollTo('anchor2')">anchor2</a>
<a @click="scrollTo('anchor3')">anchor3</a>

<div id="anchor1">
  <!-- ... -->
</div>
<div id="anchor2">
  <!-- ... -->
</div>
<div id="anchor3">
  <!-- ... -->
</div>
```

#### JS代码
```js
methods: {
  scroll (id) {
      window.history.pushState({}, 0, window.location.href.split('#')[0] + '#' + id) //更新url

      window.scrollTo({
        // -100是为了避免它直接滑动到屏幕顶部，怪丑的
        top: document.getElementById(id).offsetTop - 100, 
        behavior: "smooth" // 平滑滚动
      })
    }
}
```


