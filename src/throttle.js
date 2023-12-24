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

// 箭头函数版
const throttleSimple = (cb, wait = 0) => {
  let lastTime = 0;

  const res = (...args) => {
    const now = +new Date();
    if (now - lastTime > wait) {
      cb(...args);
      lastTime = now;
    }
  };

  return res;
};