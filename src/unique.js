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
