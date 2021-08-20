function longestPrefix(arr) {
  if (arr.length === 0) {
    return '';
  }
  let prefix = arr[0];
  for (let i = 1; i < arr.length; i++) {
    while (arr[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix.length === 0) {
        return '';
      }
    }
  }
  return prefix;
}

// test
let strs = ['helly', 'hellow', 'hell'];

console.log(longestPrefix(strs)); // hell
