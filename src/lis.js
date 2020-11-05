/**
 * 最长递增子序列
 *
 * @param {number[]} array
 * @returns {number[]}
 */
function lis(array) {
  if (array.length === 0) return 0;
  const arr = new Array(array.length).fill(1);
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[i] > array[j]) {
        arr[i] = Math.max(arr[i], arr[j] + 1);
      }
    }
  }
  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    result = Math.max(result, arr[i]);
  }
  return result;
}
