/**
 * 堆排序
 *
 * @param {(number | string)[]} array
 * @returns {(number | string)[]}
 */
function heapSort(array) {
  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
    adjustHeap(array, i, array.length);
  }
  // 排序，每一次for循环找出一个当前最大值，数组长度减一
  for (let j = array.length - 1; j > 0; j--) {
    // 根节点与最后一个节点交换
    const temp = array[0];
    array[0] = array[j];
    array[j] = temp;
    adjustHeap(array, 0, j);
  }
  return array;
}

/**
 * 将 i 结点以下的堆整理为大顶堆
 *
 * @param {(number | string)[]} array
 * @param {number} i
 * @param {number} length
 */
function adjustHeap(array, i, length) {
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    const temp = array[i];
    // 找到两个孩子中较大的一个，再与父节点比较
    if (j + 1 < length && array[j] < array[j + 1]) {
      j++;
    }
    // 如果父节点小于子节点则交换；否则跳出
    if (temp < array[j]) {
      array[i] = array[j];
      array[j] = temp;
      // 交换后，temp 的下标变为 j
      i = j;
    } else break;
  }
}
