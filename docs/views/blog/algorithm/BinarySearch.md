---
date: 2022/11/01 13:56:31 
config: {
    top: false,
    dir: true,
    tag: ['js','algorithm'],
    valine: true,
    valineId: /blog/algorithm/BinarySearch.html
}
title : 二分查找
---
### 原理

数组应为排序数组，定义查找的范围<code class="default">[left,right]</code>，初始查找范围是整个数组。

每次取查找范围的中点<code class="default">mid</code>，比较<code class="default">nums</code> 和 <code class="default">target</code> 的大小，如果相等则 <code class="default">mid</code>即为要寻找的下标，如果不相等则根据 <code class="default">nums</code> 和 <code class="default">target</code> 的大小关系将查找范围缩小一半。

由于每次查找都会将查找范围缩小一半，因此二分查找的时间复杂度是 <code class="log">O(log n)</code>，其中 n 是数组的长度。

二分查找的条件是查找范围不为空，即<code class="default">left<=right</code>，如果<code class="default">target</code>在数组中，二分查找可以保证找到<code class="default">target</code>，返回<code class="default">target</code>在数组中的下标。如果<code class="default">target</code>不在数组中，则当<code class="default">left<=right</code>的时候结束查找，返回-1。

其实央视《幸运 52》节目的「猜价格游戏」，就是「二分答案」。玩家猜一个数字，如果猜中，游戏结束，如果主持人说「猜高了」，应该猜一个更低的价格，如果主持人说「猜低了」，应该猜一个更高的价格。

:::tip 小技巧
循环结束条件为->left<=right<-时

如果没有找到对应的值，则右指针会指向最大小于->target<-的值，左指针指向最小大于->target<-的值，也就是说最终的指针会是这个顺序->right,target,left<-
:::

### leetcode原理题
#### [704.二分查找](https://leetcode.cn/problems/binary-search/)

给定一个 <code>n</code> 个元素有序的（升序）整型数组 <code>nums</code> 和一个目标值 <code>target</code>  ，写一个函数搜索 <code>nums</code> 中的 <code>target</code>，如果目标值存在返回下标，否则返回 <code>-1</code>。

<b>示例1：</b>
<blockquote class="small">
输入: nums = [-1,0,3,5,9,12], target = 9<br>
输出: 4<br>
解释: 9 出现在 nums 中并且下标为 4<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [-1,0,3,5,9,12], target = 2<br>
输出: -1<br>
解释: 2 不存在 nums 中因此返回 -1<br>
</blockquote>

```js
var search = function(nums, target) {
    // 定义二分查找初始范围[0,数组长度-1]
    let left = 0, right = nums.length - 1;
    // 终止循环条件，左指针在右指针右侧
    while (left <= right) {
        // 每次获取left与right的中指针mid
        const mid = Math.floor((right - left) / 2) + left;
        const num = nums[mid];
        if (num === target) {
            // 找到target返回下标
            return mid;
        } else if (num > target) {
            // 如果num的值大于target，右指针移动到中指针-1位置
            right = mid - 1;
        } else {
            // 如果num的值小于target，左指针移动到中指针+1位置
            left = mid + 1;
        }
    }
    // 没有找到则返回-1
    return -1;
};
```
### leetcode 简单题

#### [面试题10.05.稀疏数组搜索](https://leetcode.cn/problems/sparse-array-search-lcci/)

稀疏数组搜索。有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。

<b>示例1：</b>
<blockquote class="small">
输入: words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ta"<br>
输出：-1<br>
说明: 不存在返回-1。<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ball"<br>
输出: 4<br>
</blockquote>

```js
var findString = function(nums, target) {
    let l = 0
    let r = words.length - 1

    while(l<=r){
        let m = Math.floor((l+r)/2)
        let val = words[m]
        while(!val){
            // 处理空字符串，当val=空字符串时m+1或m-1都可
            m++
            val = words[m]
        }
        if(val == s){
            return m
        }else if(s<val){
            r = m - 1
        }else{
            l = m + 1
        }
    }

    return -1
};
```

#### [剑指Offer57.和为s的两个数字](https://leetcode.cn/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [2,7,11,15], target = 9<br>
输出：[2,7] 或者 [7,2]<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：nums = [10,26,30,31,47,60], target = 40<br>
输出：[10,30] 或者 [30,10]<br>
</blockquote>

```js
var twoSum = function(nums, target) {
    let len = nums.length
    for(let i = 0;i<len;i++){
        let l = 0
        let r = len - 1
        let findValue = target - nums[i] 
        while(l<=r){
            let m = Math.floor((l+r)/2)
            let val = nums[m]

            if(val == findValue){
                return [nums[i],val]
            }else if(findValue < val){
                r = m - 1
            }else{
                l = m + 1
            }
        }
    }

    return []
};
```

#### [剑指Offer2.006.排序数组中两个数字之和](https://leetcode.cn/problems/kLl5u1/)

给定一个已按照 <b>升序排列</b>  的整数数组 <code>numbers</code> ，请你从数组中找出两个数满足相加之和等于目标数 <code>target</code> 。

函数应该以长度为 <code>2</code> 的整数数组的形式返回这两个数的下标值。<code>numbers</code> 的下标 从 <code>0</code> 开始计数 ，所以答案数组应当满足 <code>0 <= answer[0] < answer[1] < numbers.length</code> 。

假设数组中存在且只存在一对符合条件的数字，同时一个数字不能使用两次。

<b>示例1：</b>
<blockquote class="small">
输入：numbers = [1,2,4,6,10], target = 8<br>
输出：[1,3]<br>
解释：2 与 6 之和等于目标数 8 。因此 index1 = 1, index2 = 3 。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：numbers = [2,3,4], target = 6<br>
输出：[0,2]<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：numbers = [-1,0], target = -1<br>
输出：[0,1]<br>
</blockquote>

```js
var twoSum = function(nums, target) {
    let len = numbers.length
    for(let i = 0;i<len;i++){
        let l = 0
        let r = len
        let findVal = target - numbers[i]

        while(l<=r){
            let m = Math.floor((l+r)/2)
            let val = numbers[m]
            if(findVal === val && i != m){
                return [i,m]
            }else if(val > findVal){
                r = m - 1
            }else {
                l = m + 1
            }
        }
    }

    return []
};
```

#### [剑指Offer2.072.求平方根](https://leetcode.cn/problems/jJ0w9p/)

给定一个非负整数 <code>x</code> ，计算并返回 <code>x</code> 的平方根，即实现 <code>int sqrt(int x)</code> 函数。

正数的平方根有两个，只输出其中的正数平方根。

如果平方根不是整数，输出只保留整数的部分，小数部分将被舍去。

<b>示例1：</b>
<blockquote class="small">
输入: x = 4<br>
输出：2<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: x = 8<br>
输出：2<br>
解释: 8 的平方根是 2.82842...，由于小数部分将被舍去，所以返回 2<br>
</blockquote>

```js
var mySqrt = function(x) {
    let l = 1
    let r = x
    
    while(l <= r){
        let m = Math.floor((l+r)/2)
        let val = m*m
        let val2 = (m+1)*(m+1)
        if(val == x || val<x&&x<val2){
            return m
        }else if(val>x){
            r = m - 1
        }else{
            l = m + 1
        }
    }

    return 0
};
```

### leetcode 中等题

#### [287.寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

给定一个包含 <code>n + 1</code> 个整数的数组 <code>nums</code> ，其数字都在 <code>[1, n]</code> 范围内（包括 <code>1</code> 和 <code>n</code>），可知至少存在一个重复的整数。

假设 <code>nums</code> 只有 <b>一个重复的整数</b> ，返回 这个重复的数 。

你设计的解决方案必须 <b>不修改</b> 数组 <code>nums</code> 且只用常量级 <code class="log">O(1)</code> 的额外空间以及小于<code class="log">O(n^2)</code>的时间复杂度。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,3,4,2,2]<br>
输出：2<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：nums = [3,1,3,4,2]<br>
输出: 3<br>
</blockquote>

```js
var findDuplicate = function(nums, target) {
    // 此解法二分的不是传入的nums，而是[1,nums.length]
    // 日常工作通常不用这种方式，以时间换空间。但是由于题目要求空间复杂度为O(1)，时间复杂度要求小于O(n^2)，所以才使用二分查找。
    // 日常遇到这种问题可以直接用set或map来做。

    let len = nums.length
    let l = 1
    let r = len

    while(l<r){
        let m = Math.floor((l+r)/2)

        // count是指传入的nums数组中小于等于m的个数，如果这个个数>m，那么重复值肯定在m的左侧。
        // 例如：
        // nums = [1,3,4,2,2]
        // 二分数组 = [1,nums.length] = [1,2,3,4,5]
        // m = 3，count = 4，那么重复值一定在[1,2,3]内，因为count比m大！
        let count = 0
        for(let i = 0;i<len;i++){
            if(nums[i]<=m) count++
        }

        if(count > m){
            r = m
        }else{
            l = m + 1
        }
    }

    return l
};
```

#### [剑指Offer.2.070.排序数组中只出现一次的数字](https://leetcode.cn/problems/skFtm2/)

给定一个只包含整数的有序数组 <code>nums</code> ，每个元素都会出现两次，唯有一个数只会出现一次，请找出这个唯一的数字。

你设计的解决方案必须满足 <code class="log">O(log n)</code> 时间复杂度和 <code class="log">O(1)</code> 空间复杂度。

<b>示例1：</b>
<blockquote class="small">
输入: nums = [1,1,2,3,3,4,4,8,8]<br>
输出：2<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums =  [3,3,7,7,10,11,11]<br>
输出: 10<br>
</blockquote>

```js
var singleNonDuplicate = function(nums, target) {
    let len = nums.length
    let l = 0
    let r = len - 1
    
    while(l<r){
        let m = Math.floor((l+r)/2)
        // 当m的值为偶数时，判断nums[m]和后一个nums[m+1]是否相同，相同就意味着查找的值在右边,否则就在左边。
        // 当m的值为奇数时，判断nums[m]和前一个nums[m-1]是否相同，相同就意味着查找的值在右边,否则就在左边。
        if(m%2==0 && nums[m] === nums[m+1] || m%2==1 && nums[m] === nums[m-1]){
            l = m + 1
        }else{
            r = m
        }
    }

    return nums[l]
};
```