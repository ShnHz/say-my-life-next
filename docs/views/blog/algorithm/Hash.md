---
date: 2022/11/11 15:57:47 
config: {
    top: false,
    dir: true,
    tag: ['js','algorithm'],
    valine: true,
    valineId: /blog/algorithm/Hash.html
}
title : 哈希表
---
### 原理

哈希表是一种非常重要的数据结构，几乎所有的编程语言都直接或者间接应用这种数据结构。

哈希表通常是基于数组实现的，但是相对于数组，它存在更多优势：

+ 哈希表可以提供非常快速的插入-删除-查找操作。
+ 无论多少数据，插入和删除值都只需接近常量的时间，即 O(1) 的时- 间复杂度。实际上，只需要几个机器指令即可完成。
+ 哈希表的速度比树还要快，基本可以瞬间查找到想要的元素。
+ 哈希表相对于树来说编码要简单得多。

哈希表同样存在不足之处：

+ 哈希表中的数据是没有顺序的，所以不能以一种固定的方式（比如从小到大 ）来遍历其中的元素。
+ 通常情况下，哈希表中的 key 是不允许重复的，不能放置相同的 key，用于保存不同的元素。

### Set 对象 和 Map 对象

具体的原理也不阐述了，可以看[阮一峰]('https://es6.ruanyifeng.com/#docs/set-map')这篇文章来仔细了解。

那么如果要在js里使用哈希表刷题，其实用<code class="default">Set</code>对象以及<code class="default">Map</code>对象就足够用了

#### Map

<code class="default">Map</code> 是一组键值对的结构，和 <code class="default">JSON</code> 对象类似。

属性：
+ <code class="default">size</code>：返回字典所包含的元素个数

操作方法：

+ <code class="default">set(key, val)</code>: 向字典中添加新元素
+ <code class="default">get(key)</code>:通过键值查找特定的数值并返回
+ <code class="default">has(key)</code>:如果键存在字典中返回true,否则false
+ <code class="default">delete(key)</code>: 通过键值从字典中移除对应的数据
+ <code class="default">clear()</code>:将这个字典中的所有元素删除

遍历方法：

+ <code class="default">keys()</code>:将字典中包含的所有键名以数组形式返回
+ <code class="default">values()</code>:将字典中包含的所有数值以数组形式返回
+ <code class="default">forEach()</code>：遍历字典的所有成员

#### Set

<code class="default">Set</code> 对象类似于数组，且成员的值都是唯一的

属性：
+ <code class="default">size</code>：返回字典所包含的元素个数

操作方法：

+ <code class="default">add(value)</code>: 向集合添加一个新的项
+ <code class="default">delete(value)</code>:从集合中移除一个值
+ <code class="default">has(value)</code>:如果值在集合中存在，返回true,否则false
+ <code class="default">clear()</code>:移除集合里所有的项

遍历方法：

+ <code class="default">keys()</code>:返回一个包含集合中所有键的数组
+ <code class="default">values()</code>:返回一个包含集合中所有值的数组
+ <code class="default">forEach()</code>用于对集合成员执行某种操作，没有返回值
+ <code class="default">entries()</code>：返回一个包含集合中所有键值对的数组

### leetcode简单题

#### [217.存在重复元素](https://leetcode.cn/problems/contains-duplicate/description/)

给你一个整数数组 <code>nums</code> 。如果任一值在数组中出现 至少两次 ，返回 <code>true</code> ；如果数组中每个元素互不相同，返回 <code>false</code> 。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,2,3,1]<br>
输出：true
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = nums = [1,2,3,4]<br>
输出: false
</blockquote>

```js
var containsDuplicate = function(nums) {
    // 因为Set对象是不会有重复值的，所以可以判断长度来确定是否存在重复元素，当然不知道面试官会不会把自己赶出去
    return new Set(nums).size != nums.length
};
```

#### [219.存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/description/)

给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，判断数组中是否存在两个 不同的索引 <code>i</code> 和 <code>j</code> ，满足 <code>nums[i] == nums[j]</code> 且 <code>abs(i - j) <= k</code> 。如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,2,3,1], k = 3<br>
输出：true
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [1,0,1,1], k = 1<br>
输出：true
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入: nums = [1,2,3,1,2,3], k = 2<br>
输出：false
</blockquote>

```js
var containsNearbyDuplicate = function(nums, k) {
    let map = new Map()

    for(let i = 0,len = nums.length;i<len;i++){
        if(!map.has(nums[i])){
            // 如果map对象内没有，则写入一个新的键值对
            map.set(nums[i],i)
        }else{
            // 如果i - 存储的i值小于等于k则直接返回true
            if(i - map.get(nums[i]) <= k) return true
            // 否则重新存一个较大的i值
            map.set(nums[i],i)
        }
    }

    return false
};
```

#### [409.最长回文串](https://leetcode.cn/problems/longest-palindrome/)

给定一个包含大写字母和小写字母的字符串 <code>s</code> ，返回 \通过这些字母构造成的 <b>最长的回文串</b> 。

在构造过程中，请注意 <b>区分大小写</b> 。比如 <code>"Aa"</code> 不能当做一个回文字符串。

 
<b>示例1：</b>
<blockquote class="small">
输入: s = "abccccdd"<br>
输出: 7<br>
解释: 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: s = "a"<br>
输出: 1
</blockquote>

```js
var longestPalindrome = function (s) {
    let map = new Map()
    // 先拿到这个字符串的键值对，键：字母；值：数量
    for (let i = 0, len = s.length; i < len; i++) {
        map.set(s[i], map.has(s[i]) ? map.get(s[i]) + 1 : 1)
    }
    let count = 0
    let add = false
    map.forEach((value, key) => {
        let val = value % 2
        // 奇数去掉1拿偶数部分
        count += value - val
        if (val == 1) add = true
    })

    // 如果存在奇数，那么最大值肯定+1
    return add ? count + 1 : count
};
```

#### [448.找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/description/)

给你一个含 <code>n</code> 个整数的数组 <code>nums</code> ，其中 <code>nums[i]</code> 在区间 <code>[1, n]</code> 内。请你找出所有在 <code>[1, n]</code> 范围内但没有出现在 <code>nums</code> 中的数字，并以数组的形式返回结果。
 
<b>示例1：</b>
<blockquote class="small">
输入: nums = [4,3,2,7,8,2,3,1]<br>
输出: [5,6]<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [1,1]<br>
输出: [2]
</blockquote>

```js
var findDisappearedNumbers = function(nums) {
    // 先将nums存入set，再循环1-n，如果set内不存在就push到res数组内
    let set = new Set(nums);
    let res = []
    for(let i = 1,len = nums.length;i<=len;i++){
        if(!set.has(i)) res.push(i)
    }

    return res
}
```

### leetcode中等题

#### [451.根据字符出现频率排序](https://leetcode.cn/problems/sort-characters-by-frequency/description/)

给定一个字符串 <code>s</code> ，根据字符出现的 <b>频率</b> 对其进行 <b>降序排序</b> 。一个字符出现的 <b>频率</b> 是它出现在字符串中的次数。

返回 <b>已排序的字符串</b> 。如果有多个答案，返回其中任何一个。
 
<b>示例1：</b>
<blockquote class="small">
输入: s = "tree"<br>
输出:  "eert"<br>
解释: 'e'出现两次，'r'和't'都只出现一次。<br>
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: s = "cccaaa"<br>
输出: "cccaaa"<br>
解释: 'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。<br>
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入: s = "Aabb"<br>
输出: "bbAa"<br>
解释: 此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。<br>
注意'A'和'a'被认为是两种不同的字符。
</blockquote>

```js
var frequencySort = function(s) {
    // 思路是先将字符串存储到map内
    // 存储的格式是，比如字符串为aabbbc
    // 那么map = {a:aa,b:bbb,c:c}
    let map = new Map()

    for (let i = 0, len = s.length; i < len; i++) {
        map.set(s[i], map.has(s[i]) ? map.get(s[i]) + s[i] : s[i])
    }

    // 将map的value值取出，并且按照字符串长度排序最后组合起来
    return [...map.values()].sort((a, b) => {
        return b.length - a.length
    }).join('')
};
```