---
date: 2022/11/08 16:24:57 
config: {
    top: false,
    dir: true,
    tag: ['js','algorithm'],
    valine: true,
    valineId: /blog/algorithm/Stack.html
}
title : 栈
---
### 原理

栈：就是一个<b>遵循后进先出 (LIFO / Last In First Out) 的原则的有序集合</b>，它的结构类似于如下。

<img src="https://cdn.chenyingshuang.cn/blog/algorithm/zhan/zhan.jpg" />

栈的操作主要有： <code class="default">push(e)</code> (进栈)、 <code class="default">pop()</code> (出栈)、 <code class="default">isEmpty()</code> (判断是否是空栈)、 <code class="default">size()</code> (栈大小)，以及 <code class="default">clear()</code> 清空栈，具体实现也很简单。

### 代码实现栈

```js
function Stack() {
  let items = []
  this.push = function(e) { 
    items.push(e) 
  }
  this.pop = function() { 
    return items.pop() 
  }
  this.isEmpty = function() { 
    return items.length === 0 
  }
  this.size = function() { 
    return items.length 
  }
  this.clear = function() { 
    items = [] 
  }
}
```

### leetcode简单题

#### [20.有效的括号](https://leetcode.cn/problems/valid-parentheses/description/)

一道非常经典的题，出现频率巨高

给定一个只包括 <code>'('</code>，<code>')'</code>，<code>'{'</code>，<code>'}'</code>，<code>'['</code>，<code>']'</code> 的字符串 <code>s</code> ，判断字符串是否有效。

有效字符串需满足：

+ 左括号必须用相同类型的右括号闭合。
+ 左括号必须以正确的顺序闭合。
+ 每个右括号都有一个对应的相同类型的左括号。

<b>示例1：</b>
<blockquote class="small">
输入：s = "()"<br>
输出：true<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：s = "()[]{}"<br>
输出：true<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：s = "(]"<br>
输出：false<br>
</blockquote>

```js
var isValid = function(s) {
    // 利用栈的思想，先入后出
    let n = s.length
    if(n%2 != 0) return false //当字符串长度是单数的时候肯定不为有效值

    let arr = []
    let map = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    for (let i = 0; i < n; i++) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') {
            arr.push(s[i])
        } else {
            if (map[s[i]] != arr.pop()) return false // 就跟消消乐一样，符合条件的消除，继续进行循环，不符合条件的直接宣布游戏失败
        }
    }

    return arr.length == 0 //当数组长度为0时说明括号都被有效消除
};
```

#### [面试题03.02.栈的最小值](https://leetcode.cn/problems/min-stack-lcci/)

请设计一个栈，除了常规栈支持的<code>pop</code>与<code>push</code>函数以外，还支持<code>min</code>函数，该函数返回栈元素中的最小值。执行操作的时间复杂度必须为<code class="log">O(1)</code>。

<b>示例1：</b>
<blockquote class="small">
MinStack minStack = new MinStack();<br>
minStack.push(-2);<br>
minStack.push(0);<br>
minStack.push(-3);<br>
minStack.getMin();   --> 返回 -3.<br>
minStack.pop();<br>
minStack.top();      --> 返回 0.<br>
minStack.getMin();   --> 返回 -2.
</blockquote>

```js
// 原理是利用一个辅助栈，在push的时候把当前栈的最小值也push到min栈中，那么每次getMin的时候辅助栈min栈顶元素一定是当前栈的最小值
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = []
    this.min = [Infinity] //一定要设置一个默认值，不然在push的时候无法比较新值与原栈顶元素谁大了
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    this.min.push(Math.min(this.min[this.min.length - 1],x)) //push一个新值与原栈顶元素的较大值
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop()
    this.min.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min[this.min.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

#### [1047.删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/)

给出由小写字母组成的字符串 <code>S</code>，<b>重复项删除操作</b>会选择两个相邻且相同的字母，并删除它们。

在 <code>S</code> 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

<b>示例1：</b>
<blockquote class="small">
输入："abbaca"<br>
输出："ca"<br>
解释：在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
</blockquote>

```js
var removeDuplicates = function(s) {
    // 利用栈，从左至右遍历，如果栈顶元素和循环的index重复，则出栈，否则就入栈
    let stack = []
    for(let str of s){
        if(stack.length != 0 && str == stack[stack.length - 1]){
            stack.pop()
        }else{
            stack.push(str)
        }
    }

    return stack.join('')
};
```

#### [844.比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)

给定 <code>s</code> 和 <code>t</code> 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 <code>true</code> 。<code>#</code> 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。

<b>示例1：</b>
<blockquote class="small">
输入：s = "ab#c", t = "ad#c"<br>
输出：true<br>
解释：s 和 t 都会变成 "ac"。
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：s = "ab##", t = "c#d#"<br>
输出：true<br>
解释：s 和 t 都会变成 ""。
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：s = "a#c", t = "b"<br>
输出：false<br>
解释：s 会变成 "c"，但 t 仍然是 "b"。
</blockquote>


```js
var backspaceCompare = function(s, t) {
    // 利用栈模拟出两个字符串处理后的值，比较
    let stackS = []
    let stackT = []

    for(let str of s){
        if(str == '#'){
            stackS.pop()
        }else{
            stackS.push(str)
        }
    }

    for(let str of t){
        if(str == '#'){
            stackT.pop()
        }else{
            stackT.push(str)
        }
    }

    return stackS.join('') == stackT.join('')
};
```

### leetcode中等题

#### [227.基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/)

给你一个字符串表达式 <code>s</code> ，请你实现一个基本计算器来计算并返回它的值。

整数除法仅保留整数部分。

你可以假设给定的表达式总是有效的。所有中间结果将在 <code>[-231, 231 - 1]</code> 的范围内。

注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 <code>eval()</code> 。

<b>示例1：</b>
<blockquote class="small">
输入：s = "3+2*2"<br>
输出：7<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：s = " 3/2 "<br>
输出：1<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：s = " 3+5 / 2 "<br>
输出：5<br>
</blockquote>


```js
var backspaceCompare = function(s, t) {
    let stack = [], n = 0, sign = '+'
    for (let i = 0; i <= s.length; i++) {
        const ch = s[i]
        if (ch === ' ') continue
        if (ch >= '0' && ch <= '9') {
            n = 10 * n + parseInt(ch)
            continue
        }
        // 先把乘除法给计算了，stack 中只要相加就是最终结果了 
        switch (sign) {
            case '+': stack.push(n); break
            case '-': stack.push(-n); break
            case '*': stack.push(n * stack.pop()); break
            case '/':
                let x = stack.pop()
                stack.push(x > 0 ? Math.floor(x / n) : Math.ceil(x / n));
                break
        }
        n = 0
        sign = ch
    }
    // 最后 stack 中的元素只要加起来就行了
    return stack.reduce((pre, cur) => pre + cur, 0)
};
```

#### [394.字符串解码](https://leetcode.cn/problems/decode-string/)

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: <code>k[encoded_string]</code>，表示其中方括号内部的 <code>encoded_string</code> 正好重复 <code>k</code> 次。注意 <code>k</code> 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 <code>k</code> ，例如不会出现像 <code>3a</code> 或 <code>2[4]</code> 的输入。

<b>示例1：</b>
<blockquote class="small">
输入：s = "3[a]2[bc]"<br>
输出："aaabcbc"<br>
</blockquote>

<b>示例2：</b>
<blockquote class="small">
输入：s = "3[a2[c]]"<br>
输出：accaccacc<br>
</blockquote>

<b>示例3：</b>
<blockquote class="small">
输入：s = "2[abc]3[cd]ef"<br>
输出："abcabccdcdcdef"<br>
</blockquote>

<b>示例4：</b>
<blockquote class="small">
输入：s = "abc3[cd]xyz"<br>
输出："abccdcdcdxyz"<br>
</blockquote>

```js
var decodeString = function(s) {
    let stackNum = [] //数字栈
    let stackStr = [] //字符串栈

    let n = 0 //入栈数字（重复次数）
    let resStr = '' //入栈字符串

    for (let str of s) {
        if (str >= '0' && str <= '9') {
            n = n * 10 + parseInt(str) //获取十位数，百位数的重复次数
            continue
        } else {
            if (str == '[') {
                // 当碰到左括号时
                // 数字、字符串同时入栈
                stackNum.push(n)
                n = 0

                stackStr.push(resStr)
                resStr = ''
            } else if (str == ']') {
                // 当碰到右括号时
                // 重复当前未入栈字符串并取出入栈字符串拼接
                let repetStr = ''
                let j = stackNum.pop()
                for (let i = 0; i < j; i++) {
                    repetStr += resStr
                }
                resStr = stackStr.pop() + repetStr
            } else {
                resStr += str
            }
        }
    }

    return resStr
};
```
