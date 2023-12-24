function myPromiseRace(arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      return arr[i].then(resolve, reject)
    }
  })
}

// AI生成版本
function promiseRaceAI(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve).catch(reject);
    });
  });
}
