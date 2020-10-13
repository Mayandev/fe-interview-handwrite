function sum(...args1) {
  let x = args1.reduce((prev, next) => {return prev+next;})
  return function(...args2) {
    if (args2.length == 0) return x;
    let y = args2.reduce((prev, next) => {return prev+next;})
    return sum(x+y)
  }
}

console.log(sum(1,2,2,5)(7)()) // 17