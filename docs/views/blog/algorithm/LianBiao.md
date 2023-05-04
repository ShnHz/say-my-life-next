---
title: 链表
date: 2022/12/05 11:58:01
summary: 
config: {
    top: false,
    dir: true,
    dirTag: ["h3","h4","h5"],
    tag: ["js","algorithm"],
    valine: true,
    valineId: 
}
password: false
outline: [3, 5]
---

### 原理

之前看过这样一个问题 “ 既然已经有数组了,为什么还要链表？”

其实链表和数组各有千秋，都在不同的业务场景中发光发热，很多同学对链表可能是既熟悉又陌生。熟悉的是，我们在刷一些八股文的时候经常会看到 “链表” 这个字眼，陌生的是，我们在平时的开发中并不会太多的使用到链表。

链表结构其实是内存内部的一种存储方式，链表则是把一系列节点串联起来，每个节点上至少包含两个部分： ->数据域(val)<- 与 ->指针域(next)<-。

链表中的每个节点，通过指针域的值，形成一个线性结构。

#### 链表的优缺点

因为链表是一种**松散**的结构体，所以当你想要找到其中的某一个节点时，只能够从**头节点**一级一级的往下找，但也因为这种松散的结构使得其进行**插入**和**删除**时只需要改变其 ->指针域<- 的指向即可。

+ 优点：适合动态插入和删除的应用场景；
+ 缺点：不能快速的定位和随机访问数据。

### 代码实现链表

```js
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
// 测试工具类，为了声明链表用，好方便测试
class ListNodeClass {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    // 添加节点
    add(val) {
        let node = new ListNode(val);
        if (this.head === null) {
            this.head = node;
        } else {
            // 找到末尾，追加节点
            let end = this.find(this.length - 1);
            end.next = node
        }
        this.length++;
    }
    // 插入节点
    insert(val, position) {
        let node = new ListNode(val);
        let cur = this.head
        if (position <= 0) {
            node.next = cur
            this.head = node
        } else {
            if (position > this.length) {
                position = this.length
            }
            while (position > 1) {
                cur = cur.next
                position--
            }

            let t = cur.next
            cur.next = node
            node.next = t
        }
    }
    // 删除节点
    remove(position) {
        let node = new ListNode(0, this.head)
        let cur = node
        let index = 0
        while (position > 0) {
            cur = cur.next
            position--
        }
        cur.next = cur.next.next
        this.head = node.next
    }


    // 根据位置找节点
    find(position) {
        // 先边界判断，边界外直接返回null
        if (position < 0 || position >= this.length) {
            return null;
        } else {
            // 从头开始找
            let cur = this.head;

            for (let i = 0; i < position; i++) {
                cur = cur.next
            }

            return cur;
        }
    }

    // 将链表转为数组
    toArray() {
        if (this.length === 0) return [];

        let cur = this.head;
        let ans = [];

        while (cur) {
            ans.push(cur.val);
            cur = cur.next;
        }

        return ans;
    }

    // 获取链表的头
    getHead() {
        return this.head;
    }
}

const list = new ListNodeClass();

list.add(1)
list.add(3)
list.insert(2, 1)
list.remove(1)
console.log(list.toArray()) //[1,3]
console.log(list.getHead()) //ListNode {val: 1, next: ListNode}...
```

### leetcode 简单题

#### [876.链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)

给定一个头结点为 ->head<- 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。


<b>示例1：</b>
<blockquote class="small">
输入: [1,2,3,4,5]<br>
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：[1,2,3,4,5,6]<br>
输出: 此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。<br>
</blockquote>

```js
var middleNode = function (head) {
    // 利用快慢指针，慢指针走一步，快指针走两步
    let head2 = head
    while (head2.next && head2.next.next) {
        head = head.next
        head2 = head2.next.next
    }

    // 当快指针还存在next的时候，说明指针列表数量为单数，否则为偶数，为单数时输出中间节点的右侧
    if (head2.next) {
        return head.next
    }else{
        return head
    }
};
```

#### [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

<b>示例1：</b>
<blockquote class="small">
输入：l1 = [1,2,4], l2 = [1,3,4]<br>
输出：[1,1,2,3,4,4]<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：l1 = [], l2 = []<br>
输出：[]<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：l1 = [], l2 = [0]<br>
输出：[0]<br>
</blockquote>


```js
var mergeTwoLists = function(list1, list2) {
    let node = new ListNode(-1)
    let cur = node
    while(list1 != null && list2 != null){
        if(list1.val > list2.val){
            cur.next = list2
            list2 = list2.next
        }else{
            cur.next = list1
            list1 = list1.next
        }
        cur = cur.next
    }

    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    cur.next = list1 === null ? list2 : list1;

    return node.next
};
```

#### [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

给你两个单链表的头节点 ->headA<- 和 ->headB<- ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 ->null<- 。

<b>示例1：</b>
<blockquote class="small">
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3<br>
输出：Intersected at '8'<br>
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1<br>
输出：Intersected at '2'<br>
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2<br>
输出：null<br>
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。
</blockquote>

```js
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA,
        pB = headB;

    // 跳出循环的条件:要么全为null,要么相等
    while (pA !== pB) {
        pA = pA == null ? headB : pA.next
        pB = pB == null ? headA : pB.next
    }

    return pA
};
```

#### [剑指Offer22.链表中倒数第k个节点](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 ->6<- 个节点，从头节点开始，它们的值依次是 ->1、2、3、4、5、6<-。这个链表的倒数第 ->3<- 个节点是值为 ->4<- 的节点。

<b>示例1：</b>
<blockquote class="small">
输入: x = 4<br>
输出：2<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: 给定一个链表: 1->2->3->4->5, 和 k = 2.<br>
输出：4->5<br>
</blockquote>

```js
var getKthFromEnd = function(head, k) {
    let head2 = head
    while(k>0){
        head2 = head2.next
        k--
    }

    while(head2){
        head = head.next
        head2 = head2.next
    }

    return head
};
```

### leetcode 中等题

#### [19.删除链表的倒数第N个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)

给你一个链表，删除链表的倒数第 ->n<- 个结点，并且返回链表的头结点。

<b>示例1：</b>
<blockquote class="small">
输入：head = [1,2,3,4,5], n = 2<br>
输出：[1,2,3,5]<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：head = [1], n = 1<br>
输出: []<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：head = [1,2], n = 1<br>
输出: [1]<br>
</blockquote>

```js
var removeNthFromEnd = function(head, n) {
    // 利用快慢指针
    let dummy = new ListNode(0, head)
    let head1 = dummy
    let head2 = dummy
    while(n>0){
        // 快指针先走了n步
        head2 = head2.next
        n--
    }
    while(head2 && head2.next){
        // 慢指针和快指针同时走,但是快指针始终会领先n步
        head1 = head1.next
        head2 = head2.next
    }
    // 由于快指针走完了,所以慢指针的next就是需要找出的那个倒数n个的结点,跳过即可
    head1.next = head1.next.next

    return dummy.next
};
```

#### [82.删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)

给定一个已排序的链表的头 ->head<- ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 **已排序的链表** 。


<b>示例1：</b>
<blockquote class="small">
输入: head = [1,2,3,3,4,4,5]<br>
输出：[1,2,5]<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: head = [1,1,1,2,3]<br>
输出: [2,3]<br>
</blockquote>

```js
var deleteDuplicates = function(head) {
    if (!head) {
        return head
    }

    // 使用哑节点
    let dummy = new ListNode(0, head)
    let cur = dummy

    while (cur.next && cur.next.next) {
        // 如果下个值和下下个值相等，进入二次判断，判断是否与后面得值相等，如果相等则一直跳过
        if (cur.next.val == cur.next.next.val) {
            let x = cur.next.val
            while (cur.next && cur.next.val == x){
                cur.next = cur.next.next
            }
        }else{
            cur = cur.next
        }
    }

    return dummy.next
};
```