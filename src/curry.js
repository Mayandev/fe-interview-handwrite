/**
 * 通用的 curry 化
 * @param {*} targetfn 
 * @returns 
 */
function curry(targetfn) {
  var numOfArgs = targetfn.length;
  return function fn() {
    if (arguments.length < numOfArgs) {
      return fn.bind(null, ...arguments);
    } else {
      return targetfn.apply(null, arguments);
    }
  }
}

function sum(a, b, c) {
  return a + b + c;
}

const curried = curry(sum);
console.log(curried(1)(2)(3)) // 6
console.log(curried(1,2)(3)) // 6

function sum2(...args1) {
  let x = args1.reduce((prev, next) => {return prev+next;})
  return function(...args2) {
    if (args2.length == 0) return x;
    let y = args2.reduce((prev, next) => {return prev+next;})
    return sum2(x+y)
  }
}

console.log(sum2(1,2,2,5)(7)()) // 17
