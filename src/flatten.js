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

// 法二: 用栈
const flattenFunc = arr => {
  if (!arr.length) return [];

  const res = [];

  const stack = [...arr];
  while(stack.length) {
    const cur = stack.pop();
    if (Array.isArray(cur)) {
      stack.push(...cur);
    } else {
      res.push(cur);
    }
  }

  return res.reverse();
};

console.log(flatten([1,[1,2,[2,4]],3,5]));  // [1, 1, 2, 2, 4, 3, 5]