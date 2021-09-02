/**
 * 快手面试手写
 * 计算圆周率，割圆迭代
 * 圆的半径为 1，从 6 边形状开始迭代，则六边形的边长也为 1
 * 6 -> 12 -> 24 -> 48
 */
function pi(iteration) {
  let side = 6;
  let length = 1;
  for (let i = 1; i <= iteration; i++) {
    side *= 2;
    length = Math.sqrt(2 - 2 * Math.sqrt(1 - Math.pow(length / 2, 2)));
  }
  return (side * length) / 2;
}

console.log(pi(12));  // 迭代12 次: 3.1415926453212157
