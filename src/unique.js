/**
 * 数组去重
 *
 * @param {(number | string)[]} array
 * @returns {(number | string)[]}
 */
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

/**
 * 获取map的键
 * @param {Map<unknown, unknown>} hashMap 
 */
function getMapKeys(hashMap) {
  const res = [];

  const keys = hashMap.keys();
  while (true) {
    const cur = keys.next().value;
    if ([null, void 0].includes(cur)) {
      break;
    }
    res.push(cur);
  }

  return res;
}

/**
 * 数组去重
 * @param {unknown[]} arr 被去重数组
 * @returns 去重后的数组
 */
const uniqueArray = arr => {
  const hashMap = new Map();
  arr.forEach(item => {
    if (!hashMap.has(item)) {
      hashMap.set(item, 1);
    } else {
      hashMap.set(item, ++hashMap.get(item));
    }
  });

  return getMapKeys(hashMap);
};