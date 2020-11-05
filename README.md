# 前端面试手写题

整理前端面试常见的手写题，面试出现概率极高，建议每个都过自己过一遍。

你也可以提交 PR，提供你面试遇到的题目。

- [实现 bind()](./src/bind.js)
- [实现 apply()](./src/apply.js)
- [实现 call()](./src/call.js)
- [实现 instanceof](./src/instanceof.js)
- [实现 new](./src/new.js)
- [实现 jsonp](./src/jsonp.js)
- [实现 Promise](./src/promise.js)
- [实现 Promise.all()](./src/promiseAll.js)
- [实现 Promise.race()](./src/promiseRace.js)
- [实现 EventEmitter 订阅监听模式](./src/subscribe.js)
- [setTimout 实现 setInterval](./src/interval.js)
- [深拷贝](./src/deepclone.js)
- [数组拍平](./src/flatten.js)
- [函数防抖](./src/debounce.js)
- [函数节流](./src/throttle.js)
- [函数柯里化（实现 `sum(1,2)(3)()`）](./src/curry.js)
- [快速排序](./src/quickSort.js)
- [归并排序](./src/mergeSort.js)
- [插入排序](./src/insertionSort.js)
- [选择排序](./src/selectionSort.js)
- [希尔排序](./src/shellSort.js)
- [堆排序](./src/heapSort.js)
- [二分查找](./src/binarySearch.js)
- [数组去重](./src/unique.js)
- [去除字符串首尾空格](./src/trim.js)
- [最长递增子序列](./src/lis.js)

### 实现 bind()

```javascript
Function.prototype.bindNew = function (context, ...args) {
  return (...newArgs) => this.apply(context, [...args, ...newArgs]);
};

// test
const test = {
  name: "fy",
  showName: function (last: string) {
    console.log(this.name + " is " + last);
  },
};
test.showName("handsome"); // fy is handsome
test.showName.bind({ name: "Mr.fy" })("handsome");
test.showName.bindNew({ name: "Mr.fy" })("handsome");
```

### 实现 apply()

```javascript
Function.prototype.myApply = function (context, args) {
  context.fn = this;
  let res;
  if (!args){
    res = context.fn();
  } else  {
    res = context.fn(...args)
  }
  return res;
}

// test
let obj = {
  name: 'jack'
}
function test(arg1, arg2, arg3) {
  console.log(this.name)   // jack
  console.log(arg1, arg2, arg3);  // 1 2 3
}
test.myApply(obj, [1,2,3]);
```

### 实现 call()

```javascript
Function.prototype.myCall = function (context, ...rest) {
  context.fn = this;
  var result = context.fn(...rest);
  delete context.fn;
  return result;
}

// test
let obj = {
  name: 'jack'
}
function test(arg1, arg2, arg3) {
  console.log(this.name)   // jack
  console.log(arg1, arg2, arg3);  // 1 2 3
}
test.myCall(obj, 1,2,3);
```

### 实现 instanceof

```javascript
function myInstanceOf(left, right) {
  let prototype = right.prototype;
  left = left.__proto__;
  while(true) {
    if (!left) return false;
    if (left == prototype) return true;
    left = left.__proto__;
  }
}

console.log(myInstanceOf([], Array));  // true
```

### 实现 new

```javascript
function myNew (fun, ...args) {
  let obj = {};
  obj.__proto__ = fun.prototype;
  let res = fun.apply(obj, args);
  return res instanceof Object ? res : obj;
}

function Animal(name) {
  this.name = name;
}
let animal = myNew(Animal, 'dog');
console.log(animal.name)  // dog
```

### 实现 jsonp

```javascript
var newscript = document.createElement('script');
newscript.src = 'https://www.adb.com?callback=fn'
document.body.appendChild(newscript);
function fn(data) {
  console.log(data);
}
```

### 实现 Promise

```javascript
const PENDING = Symbol();
const REJECTED = Symbol();
const FULLFILLED = Symbol();

const MyPromise = function(fn) {
  this.state = PENDING;
  this.value = '';

  const resolve = (value) => {
    this.state = FULLFILLED;
    this.value = value;
  }

  const reject = (error) => {
    this.state = REJECTED;
    this.value = error;
  }

  this.then = (onFullFill, onReject) => {
    if (this.state == FULLFILLED) {
      onFullFill(this.value);
    } else {
      onReject(this.value);
    }
  }

  try {
    fn(resolve, reject);
  } catch(error) {
    reject(error);
  }
}

// test
let p = new MyPromise((resolve, reject) => {
  resolve('hello');
})
p.then(res => {
  console.log(res);  // hello
})
```

### 实现 Promise.all()

```javascript
function isPromise(obj) {
  return !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then == 'function';
}

function myPromiseAll(arr) {
  let res = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (isPromise(arr[i])) {
        arr[i].then(data => {
          res[i] = data;
          if (res.length === arr.length) {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      } else {
        res[i] = arr[i];
      }
    }
  })
}
```

### 实现 Promise.race()

```javascript
function myPromiseRace(arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      return arr[i].then(resolve, reject)
    }
  })
}
```

### 实现 EventEmitter 订阅监听模式

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on (eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach(fn => fn.apply(this, args));
  }

  once(eventName, callback) {
    const fn = () => {
      callback();
      this.remove(eventName, fn);
    }
    this.on(eventName, fn)
  }

  remove(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(fn => fn != callback);
  }
}
```

### setTimout 实现 setInterval

```javascript
function myInterval(fn, time) {
  let context = this;
  setTimeout(() => {
    fn.call(context);
    myInterval(fn, time);
  }, time);
}
```

### 深拷贝

```javascript
function deepClone(obj) {
  // 先判断是对象还是数组
  let copy = obj instanceof Array ? [] : {};
  for (let key in obj) {
    // 判断是否是对象上的属性，而不是原型上的属性
    if (obj.hasOwnProperty(key)) {
      // obj[key] 是否是对象，如果是对象，递归遍历
      copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return copy;
}

// test
console.log(deepClone({name: 'jack', birth: {year: '1997', month: '10'}})) // {name: 'jack', birth: {…}}
```

### 数组拍平

```javascript
var flatten = function(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res;
}

console.log(flatten([1,[1,2,[2,4]],3,5]));  // [1, 1, 2, 2, 4, 3, 5]
```

### 函数防抖

```javascript
function debounce(fn, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}
```

### 函数节流

```javascript
function throttle(fn, wait) {
  let  pre = new Date();
  return function() {
    let context = this;
    let args = arguments;
    let now = new  Date();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = now;
    }
  }
}
```

### 函数柯里化（实现 sum(1,2)(3)()）

```javascript
function sum(...args1) {
  let x = args1.reduce((prev, next) => {return prev+next;})
  return function(...args2) {
    if (args2.length == 0) return x;
    let y = args2.reduce((prev, next) => {return prev+next;})
    return sum(x+y)
  }
}

console.log(sum(1,2,2,5)(7)()) // 17
```

### 快速排序 

```javascript
function quicksort(arr) {
  if (arr.length <= 1) return arr;
  let pivotIndex = arr.length >> 1;
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot)  {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quicksort(left).concat(pivot, quicksort(right));

}

console.log(quicksort([4,3,5,2,1,6]));   //  [1, 2, 3, 4, 5, 6]
```

### 归并排序

```javascript
function merge(left, right) {
  let res = [];
  while(left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  return res.concat(left).concat(right);
}

function mergeSort(arr) {
  if (arr.length == 1) return arr;
  var middle = Math.floor(arr.length / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([3,2,4,5,1,6]));  // [1, 2, 3, 4, 5, 6]
```

### 插入排序

```javascript
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    const temp = array[i];
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
  return array;
}
```

### 选择排序

```javascript
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}
```

### 希尔排序

```javascript
function shellSort(array) {
  const len = array.length;
  let gap = Math.floor(len / 2);
  for (gap; gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let j = i - gap;
      const temp = array[i];
      while (j >= 0 && array[j] > temp) {
        array[j + gap] = array[j];
        j -= gap;
      }
      array[j + gap] = temp;
    }
  }
  return array;
}
```

### 堆排序

```javascript
function heapSort(array) {
  for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
    adjustHeap(array, i, array.length);
  }
  for (let j = array.length - 1; j > 0; j--) {
    const temp = array[0];
    array[0] = array[j];
    array[j] = temp;
    adjustHeap(array, 0, j);
  }
  return array;
}

function adjustHeap(array, i, length) {
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    const temp = array[i];
    if (j + 1 < length && array[j] < array[j + 1]) {
      j++;
    }
    if (temp < array[j]) {
      array[i] = array[j];
      array[j] = temp;
      i = j;
    } else break;
  }
}
```

### 二分查找

```javascript
function binarySearch(array, target) {
  let low = 0;
  let height = array.length - 1;
  while (low <= height) {
    const middle = Math.floor((low + height) / 2);
    if (target === array[middle]) return middle;
    else if (target > array[middle]) low = middle + 1;
    else height = middle - 1;
  }
  return -1;
}
```

### 数组去重

```javascript
function unique(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] === array[i]) {
        array.splice(j, 1);
        j--;
      }
    }
  }
  return array;
}
```

### 去除字符串首尾空格

```javascript
//正则表达式
function myTrim1(str){
    return str.replace(/^\s+|\s+$/g,'')
}

//不使用正则表达式
function myTrim2(str){
    let head = 0
        foot = str.length
    for(let i =0;i<str.length;i++){
        if(str[i]===' ')head++
        else break
    }
    for(let j =str.length-1;j>0;j--){
        if(str[j]===' ')foot--
        else break
    }
    return str.substr(head,foot-head)
} 
```

### 最长递增子序列

```javascript
function lis(array) {
  if (array.length === 0) return 0;
  const arr = new Array(array.length).fill(1);
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[i] > array[j]) {
        arr[i] = Math.max(arr[i], arr[j] + 1);
      }
    }
  }
  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    result = Math.max(result, arr[i]);
  }
  return result;
}
```
