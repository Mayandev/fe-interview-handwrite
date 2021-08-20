/**
 * 传入任意一个函数，只能调用指定的次数
 * @param {*} count 调用次数
 * @param {*} func 传入函数
 * @returns 
 */
 function before(count, func) {
  var temp = count;
  return function() {
    if (temp > 1) {
      temp--;
      const args = [...arguments];
      func.apply(this, args);
    }
  }
}

const log = a => console.log(a);

const log3 = before(3, log);

log3(2);
log3(1);
log3(3);