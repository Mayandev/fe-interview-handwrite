/**
 * 希尔排序
 *
 * @param {(number | string)[]} array
 * @returns {(number | string)[]}
 */
function shellSort(array) {
  const len = array.length;
  let gap =  Math.floor(len / 2);
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
