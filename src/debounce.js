function debounce(fn, wait) {
  let timeout = null;
  return function() {
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}