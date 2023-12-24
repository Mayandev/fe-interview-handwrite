function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "function" || typeof obj === "object") &&
    typeof obj.then == "function"
  );
}

function isPromise(object) {
  return (
    !!object &&
    (typeof obj === "function" || typeof obj === "object") &&
    object instanceof Promise
  );
}
function PromiseAll(arr) {
  return new Promise((resolve, reject) => {
    const len = arr.length,
      result = [];
    let succeed = 0;
    for (let i = 0; i < len; ++i) {
      const cur = arr[i];
      if (isPromise(cur)) {
        arr[i].then((res) => {
          process(i, res);
        }, reject);
      } else {
        process(i, cur);
      }
    }
    function process(index, value) {
      result[index] = value;
      if (++succeed === len) {
        resolve(result);
      }
    }
  });
}

function myPromiseAll(arr) {
  let res = [];
  let containPromise = false;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (isPromise(arr[i])) {
        containPromise = true;
        arr[i]
          .then((data) => {
            res[i] = data;
            if (res.length === arr.length) {
              resolve(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        res[i] = arr[i];
      }
    }
    if (!containPromise) resolve(res);
  });
}

// AI生成的版本
function promiseAllAI(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

function promiseAllAIFine(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    let completed = 0;
    promises.forEach(promise => {
      if (isPromise(promise)) {
        promise
          .then((result) => {
            results.push(result);
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        results.push(promise);
        completed++;
      }
    });
  });
}
