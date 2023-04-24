---
date: 2022/11/11 15:19:58 
config: {
    show: false,
    top: false,
    dir: true,
    tag: ['js','algorithm'],
    valine: true,
    valineId: /blog/algorithm/Heap.html
}
title : 堆
---
### 原理

堆：就是一棵<b>完全二叉树</b>，它如果满足以下条件，那么它就是一个堆。

+ 1.任意节点大于或小于它的所有子节点（大根堆、小根堆）
+ 2.总是一完全树，即除了最底层，其它层的节点都被元素填满

堆的操作主要有：

+ <b>大顶堆调整（Max-Heapify）</b>，将堆的末端子节点做调整，使得子节点永远小于父节点；
+ <b>创建大顶堆（Build-Max-Heap）</b>，将堆中所有数据调整位置，使其成为大顶堆；
+ <b>堆排序（Heap-Sort）</b>，移除在堆顶的根节点，并做大顶堆调整的迭代运算。


