/**
 * @author Yueb
 * @description Promise A+实现。源码详见: https://www.talkinghightech.com/en/implementing-a-javascript-promise/
 * 
 * 这个版本可直接背
 */

const PEND = Symbol.for("pending");
const RES = Symbol.for("resolved");
const REJ = Symbol.for("rejected");

class Prom {
  status = PEND;
  value = null;
  reason = null;
  onResolvedFns = [];
  onRejectedFns = [];

  constructor(executor) {
    executor(this.__resolve.bind(this), this.__reject.bind(this));
  }

  __helperFunc(stateSymbol, tmpValue) {
    if (this.status !== PEND) {
      return this.value;
    }

    if ([REJ, RES].includes(stateSymbol)) {
      // 核心
      queueMicrotask(() => {
        this.status = stateSymbol;
        if (stateSymbol === REJ) {
          this.reason = tmpValue;
          this.onRejectedFns.forEach((cb) => cb(tmpValue));
          this.onResolvedFns = [];
        } else {
          this.value = tmpValue;
          this.onResolvedFns.forEach((cb) => cb(tmpValue));
          this.onResolvedFns = [];
        }
      });
    }
  }

  __resolve(value) {
    this.__helperFunc(RES, value);
  }

  __reject(reason) {
    this.__helperFunc(REJ, reason);
  }

  then(onFulfil, onRej) {
    return new Prom((resolve, reject) => {
      if (this.status === PEND) {
        this.onResolvedFns.push((value) => { resolve(onFulfil(value)) });
        if (reject) {
          this.onRejectedFns.push(onRej);
        }
      } 
      if (this.status === RES) {
        resolve(onFulfil(this.value));
      } 
      
      if (this.status === REJ) {
        reject(this.reason);
      }
    });
  }

  catch(onRej) {
    if (this.status === REJ) {
      onRej(this.reason);
    }

    if (this.status === PEND) {
      this.onRejectedFns.push(onRej);
    }
  }
}
