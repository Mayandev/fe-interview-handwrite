function isPromise(obj) {
  return !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then == 'function';
}

function myPromiseAll(arr) {
  let res = []
  let containPromise = false;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (isPromise(arr[i])) {
        containPromise = true;
        arr[i].then(data => {
          res[i] = data;
          if (res.length === arr.length) {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      } else {
        res[i] = arr[i];
      }
    }
    if(!containPromise) resolve(res);
  })
}
