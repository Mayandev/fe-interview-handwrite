function quicksort(arr) {
  if (arr.length <= 1) return arr;
  let pivotIndex = arr.length >> 1;
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot)  {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quicksort(left).concat(pivot, quicksort(right));

}

// 一行式写法
const quickSortOneLine = arr => arr.length <= 1 ? [...arr] : [...quickSortOneLine(arr.filter(num => num < arr[0])), ...arr.filter(num => num === arr[0]), ...quickSortOneLine(arr.filter(num => num > arr[0]))];

console.log(quickSortOneLine([4,3,5,2,1,6]));   //  [1, 2, 3, 4, 5, 6]