---
date: 2022/11/04 13:49:17 
config: {
    top: false,
    dir: true,
    tag: ['js','algorithm'],
    valine: true,
    valineId: /blog/algorithm/DounblePointer.html
}
title : 双指针
---
### 原理

双指针的技巧分为两类：

快慢指针：
+ 主要解决<b>链表</b>中的问题
+ 比如判断链表中是否包含环

左右指针：
+ 主要解决<b>数组</b>、<b>字符串</b>问题
+ 比如二分查找

#### 快慢指针

快指针：
+ 初始化指向链表的头节点<code class="default">head</code>
+ 前进时快指针<code class="default">fast</code>在前，慢指针<code class="default">slow</code>在后
+ 可以巧妙解决链表中的相关问题

#### 左右指针

+ 左右指针在数组中实际是指两个索引值
+ 初始化<code class="default">left=0,right=length - 1</code>

### leetcode简单题

#### [26.删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

给你一个 <b>升序排列</b> 的数组 <code>nums</code> ，请你 <b>原地</b> 删除重复出现的元素，使每个元素 <b>只出现一次</b> ，返回删除后数组的新长度。元素的 <b>相对顺序</b> 应该保持一致 。

由于在某些语言中不能改变数组的长度，所以必须将结果放在数组<code>nums</code>的第一部分。更规范地说，如果在删除重复项之后有 <code>k</code> 个元素，那么 <code>nums</code> 的前 <code>k</code> 个元素应该保存最终结果。

将最终结果插入 <code>nums</code> 的前 <code>k</code> 个位置后返回 <code>k</code> 。

不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 <code class="log">O(1) </code>额外空间的条件下完成。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,1,2]<br>
输出：2, nums = [1,2,_]<br>
解释: 函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [0,0,1,1,1,2,2,3,3,4]<br>
输出: 5, nums = [0,1,2,3,4]<br>
解释: 函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。<br>
</blockquote>

```js
var removeDuplicates = function(nums) {
    // 利用快慢指针
    let n = nums.length
    let i = 0 //慢指针
    let j = 1 //快指针
    
    // 这边的想法就是把i当作最终想要获得的结果，j去后面匹配数字，拿到正确的数字填充到前方
    // 当快指针超过数组长度时，跳出循环
    while(j < n){
        // 当两个指针指向的值不同时，意味着拿到了需要的数字，那么慢指针就得前进一步并且拿到快指针的值
        if(nums[i] != nums[j]){
            nums[++i] = nums[j]
        }
        // 不管任何判断条件，快指针永远在向后走
        j++
    }

    return i+1
};
```

#### [202.快乐数](https://leetcode.cn/problems/happy-number/description/)

编写一个算法来判断一个数 <code>n</code> 是不是快乐数。

<b>「快乐数」</b> 定义为：

+ 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
+ 然后重复这个过程直到这个数变为 1，也可能是 <b>无限循环</b> 但始终变不到 1。
+ 如果这个过程 <b>结果为</b> 1，那么这个数就是快乐数。
如果 <code>n</code> 是 快乐数 就返回 <code>true</code> ；不是，则返回 <code>false</code> 。

<b>示例1：</b>
<blockquote class="small">
输入：n = 19<br>
输出：true<br>
解释:<br>
12 + 92 = 82<br>
82 + 22 = 68<br>
62 + 82 = 100<br>
12 + 02 + 02 = 1<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: n = 2<br>
输出: false<br>
</blockquote>

```js
var isHappy = function(n) {
    // 利用快慢指针

    // 先写一个平方和函数
    function getSum(num) {
        let sum = 0
        while (num >= 10) {
            let x = num % 10
            sum += x * x
            num = Math.floor(num / 10)
        }

        return sum + (num * num)
    }

    let i = n //慢指针
    let j = getSum(n) //快指针，如果初始值设定的和慢指针一样是不能进入循环的

    // 判定条件就是当快指针值找到1或慢指针与快指针相同则跳出循环
    while (j != 1 && i != j) {
        i = getSum(i)
        j = getSum(getSum(j))
    }

    // 快指针找到1的话肯定返回true
    // 慢指针与快指针相同跳出循环时，不为1肯定返回false
    // 因为当快慢指针相遇时代表已经走过一遍循环了，接下去继续循环都会是重复值
    return j == 1
};
```

#### [680.验证回文串 II](https://leetcode.cn/problems/valid-palindrome-ii/)

给你一个字符串 <code>s</code>，<b>最多</b> 可以从中删除一个字符。

请你判断 <code>s</code> 是否能成为回文字符串：如果能，返回 <code>true</code> ；否则，返回 <code>false</code> 。



<b>示例1：</b>
<blockquote class="small">
输入：s = "aba"<br>
输出：true<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: s = "abca"<br>
输出: true<br>
解释：你可以删除字符 'c' 。
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入: s = "abc"<br>
输出: false<br>
</blockquote>

```js
var validPalindrome = function(s) {
    // 利用左右指针
    let n = s.length
    let i = 0
    let j = n - 1
    let count = 0 //题目允许一次删除的机会，那么记录一个删除的次数

    while (i < j) {
        if (s[i] == s[j]) {
            // 验证为回文数没问题，继续左右指针移动
            i++
            j--
        } else {
            // 当删除的机会用光后，直接返回false
            if (count > 0) return false
            if (s[i + 1] == s[j] && s[i] == s[j - 1]) {
                // 当左边指针删除，回文数成立，右边指针删除，回文数也成立的情况，进入递归
                return validPalindrome(s.slice(i + 1, j)) || validPalindrome(s.slice(i, j - 1))
            } else if (s[i + 1] == s[j]) {
                // 当只有左边指针删除才构成回文数时，左指针右移，删除次数+1
                i++
                count++
            } else if (s[i] == s[j - 1]) {
                // 当只有右边指针删除才构成回文数时，右指针左移，删除次数+1
                j--
                count++
            } else {
                // 任何情况都不构成回文数，返回false
                return false
            }
        }
    }

    return true
};
```

#### [1332.删除回文子序列](https://leetcode.cn/problems/remove-palindromic-subsequences/)

给你一个字符串 <code>s</code>，它仅由字母 <code>'a'</code> 和 <code>'b'</code> 组成。每一次删除操作都可以从 <code>s</code> 中删除一个回文 <b>子序列</b>。

返回删除给定字符串中所有字符（字符串为空）的最小删除次数。

「子序列」定义：如果一个字符串可以通过删除原字符串某些字符而不改变原字符顺序得到，那么这个字符串就是原字符串的一个子序列。

「回文」定义：如果一个字符串向后和向前读是一致的，那么这个字符串就是一个回文。

<b>示例1：</b>
<blockquote class="small">
输入：s = "ababa"<br>
输出：1<br>
解释:字符串本身就是回文序列，只需要删除一次。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: s = "abb"<br>
输出: 2<br>
解释："abb" -> "bb" -> "". <br>
先删除回文子序列 "a"，然后再删除 "bb"。
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入: s = "baabb"<br>
输出: 2<br>
解释："baabb" -> "b" -> "". <br>
先删除回文子序列 "baab"，然后再删除 "b"。
</blockquote>

```js
var removePalindromeSub = function(s) {
    // 这题乍一看好像是很难，但是仔细观察题意，不要被示例误导。
    // 划重点 ！！！ 只有两个字母a/b，且是子序列
    // 那么最多只要删除两次即可，先删除a，再删除b
    // 所以只需要判断是否是回文数，是回文数则返回1，否则返回2

    // 利用左右指针
    let n = s.length
    let i = 0
    let j = n - 1

    while (i < j) {
        if (s[i] == s[j]) {
            i++
            j--
        }else{
            return 2
        }
    }

    return 1
};
```

### leetcode中等题

#### [11.盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

给定一个长度为 <code>n</code> 的整数数组 <code>height</code> 。有 <code>n</code> 条垂线，第 <code>i</code> 条线的两个端点是 <code>(i, 0)</code> 和 <code>(i, height[i])</code> 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

<b>示例1：</b>
<blockquote class="small">
输入：[1,8,6,2,5,4,8,3,7]<br>
输出：49 <br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: [1,1]<br>
输出: 1<br>
</blockquote>

```js
var maxArea = function(height) {
    // 利用左右指针
    let n = height.length
    let l = 0 // 左指针
    let r = n - 1 // 右指针
    // 设置一个max，存放桶循环过程中能装的最多的水 
    let max = 0

    while(l < r){
        // 求当前木桶能装的水的量，宽(r-l) * 高(取两个指针较小的值，木桶原理)
        x = (r - l) * (height[l] > height[r] ? height[r] : height[l])
        // 设置最大值，与之前的最大值比较
        max = max > x ? max : x

        // 哪边的木桶端，那就往哪边移，确保能取到最大值
        if(height[l] > height[r]){
            r--
        }else{
            l++
        }
    }

    return max
};
```

#### [80.删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/)

给你一个 <b>升序排列</b> 的数组 <code>nums</code> ，请你 <b>原地</b> 删除重复出现的元素，使每个元素 <b>只出现两次</b> ，返回删除后数组的新长度。元素的 <b>相对顺序</b> 应该保持一致 。

不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 <code class="log">O(1) </code>额外空间的条件下完成。

<b>示例1：</b>
<blockquote class="small">
输入：nums = [1,1,1,2,2,3]<br>
输出：5, nums = [1,1,2,2,3]<br>
解释: 函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。 不需要考虑数组中超出新长度后面的元素。<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入: nums = [0,0,1,1,1,1,2,3,3]<br>
输出: 7, nums = [0,0,1,1,2,3,3]<br>
解释: 函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。 不需要考虑数组中超出新长度后面的元素。<br>
</blockquote>

```js
var removeDuplicates = function(nums) {
    let n = nums.length
    // 小于2的数组一定是满足条件的，不做任何操作直接返回即可
    if (n <= 2) return n

    // 初始化指针=2
    // 这边的想法就是把i当作最终想要获得的结果，j去后面匹配数字，拿到正确的数字填充到前方
    // 当快指针超过数组长度时，跳出循环
    let i = 2
    let j = 2

    while (j < n) {
        // 当快指针找到了与上上个值不同的情况，那么将停留下来的慢指针赋值，并且向前走一步
        if (nums[i - 2] != nums[j]) {
            nums[i] = nums[j];
            i++
        }
        // 不管任何判断都会让快指针前进
        // 当前指针的值与上上个值相等的时候，快指针就得先走一步，去找到与上上个值不同的情况
        j++
    }

    return i
};
```
