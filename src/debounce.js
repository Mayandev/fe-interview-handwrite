function debounce(fn, wait) {
  let timeout = null;
  
  return function() {
    const args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}

// 加leading版本
function debounce2(fn, wait, leading = true) {
  let timer = null;
  let led = leading;

  return function def() {
    const args = arguments;
    timer && clearTimeout(timer);
    led && fn.apply(this, args);

    timer = setTimeout(() => {
      timer = null;
      !led && fn.apply(this, args);
      led = false;
    }, wait);
  }
}

// 箭头函数版
const debounceSimple = (fn, wait, leading = true) => {
  let timer = null;
  let led = leading;

  const res = (...args) => {
    timer && clearTimeout(timer);
    led && fn(...args);

    timer = setTimeout(() => {
      timer = null;
      !led && fn(...args);;
      led = false;
    }, wait);
  };

  return res;
};