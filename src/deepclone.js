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
// console.log(deepClone({name: 'jack', birth: {year: '1997', month: '10'}})) // {name: 'jack', birth: {…}}

module.exports = deepClone;