# 前端面试手写题

整理前端面试常见的手写题，面试出现概率极高，建议每个都过自己过一遍。

你也可以提交 PR，提供你面试遇到的题目。

代码汇总请参照 [SUMMARY.md](./SUMMARY.md) 。

**高频**：🌟🌟🌟
**中频**：🌟🌟
**低频**：🌟

## JavaScript 原理

- [实现 bind()](./src/bind.js) 🌟🌟
- [实现 apply()](./src/apply.js) 🌟🌟
- [实现 call()](./src/call.js) 🌟🌟
- [实现 instanceof](./src/instanceof.js) 🌟
- [实现 new](./src/new.js) 🌟
- [实现 jsonp](./src/jsonp.js) 🌟🌟🌟
- [实现 Promise](./src/promise.js) 🌟🌟🌟
- [实现 Promise.all()](./src/promiseAll.js) 🌟🌟🌟
- [实现 Promise.race()](./src/promiseRace.js) 🌟
- [实现 EventEmitter 订阅监听模式](./src/subscribe.js) 🌟🌟
- [setTimout 实现 setInterval](./src/interval.js) 🌟
- [深拷贝](./src/deepclone.js)  🌟🌟🌟


### 函数

- [函数防抖](./src/debounce.js) 🌟🌟🌟
- [函数节流](./src/throttle.js) 🌟🌟🌟
- [函数柯里化（实现 `sum(1,2)(3)()`）](./src/curry.js) 🌟🌟


## 数组

- [数组拍平](./src/flatten.js) 🌟🌟
- [数组去重](./src/unique.js) 🌟🌟

## 字符串

- [去除字符串首尾空格](./src/trim.js) 🌟

## 算法

算法需要掌握基本的数据结构，例如栈、队列、链表、树、排序算法等等，建议去 [LeetCode](https://leetcode-cn.com/) 上刷题。不过不要为了刷题而刷题，最重要的是归纳与总结，**刷十道不如一道刷十遍。**

- [归并排序](./src/mergeSort.js) 🌟🌟
- [插入排序](./src/insertionSort.js) 🌟
- [快速排序](./src/quickSort.js) 🌟🌟🌟
- [选择排序](./src/selectionSort.js) 🌟
- [希尔排序](./src/shellSort.js) 🌟
- [堆排序](./src/heapSort.js) 🌟
- [二分查找](./src/binarySearch.js) 🌟
- [最长递增子序列](./src/lis.js) 🌟🌟🌟


分享一下自己整理的 LeetCode 上必刷的题，比较具有代表性。

- [ ] LeetCode 001 Two Sum
- [ ] LeetCode 015 3Sum(可能会问 LeetCode18.4Sum思路)
- [ ] LeetCode 020 Valid Parentheses
- [ ] LeetCode 021 Merge Two Sorted Lists
- [ ] LeetCode 025 Reverse Nodes in k-group
- [ ] LeetCode 053 Maximum Subarra
- [ ] LeetCode 066 Plus One(等介于:高精度加加法)
- [ ] LeetCode 098 Validate Binary Search Tree
- [ ] LeetCode 110 Balanced Binary Tree
- [ ] LeetCode 134 Gas Station
- [ ] LeetCode 136 Single Number
- [ ] LeetCode 137 Single Number II
- [ ] LeetCode 146 LRU Cache(变形题:带有过期时间的LRU缓存)（Map + 链表）
- [ ] LeetCode 206 Reverse Linked List（递归、迭代）
- [ ] LeetCode 215 Kth Largest Element in an Array(等价于:快速排序)
- [ ] LeetCode 232 Implement Queue using Stacks(每次将新来的元素放到栈底，stack.push())
- [ ] LeetCode 328 Odd Even Linked List
- [ ] LeetCode 415 Add Strings(等价于:大数加法)
- [ ] LeetCode 470 rand70rand100
- [ ] LeetCode 496 Next Greater Element I(时间复杂度O(n)(单调栈，使用 Map 映射 stack 的指定位置)
- [ ] LeetCode 716 Max Stack(两个栈实现最大栈,要求pop,push, get max都为0(1)
- [ ] LeetCode 860 Lemonade Change