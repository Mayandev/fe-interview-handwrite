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
