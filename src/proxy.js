const deepClone = require('./deepclone');

function MyProxy(obj, handler) {
  console.log(handler);
  let _target = deepClone(obj);
  Object.keys(_target).forEach(key => {
    Object.defineProperty(_target, key, {
      get: () => handler.get && handler.get(obj, key),
      set: newVal => handler.set && handler.set(obj, key, newVal),
    });
  });
  return _target;
}

let person = {
  name: 'jack',
  city: 'Beijing',
};

let proxy = new MyProxy(person, {
  get: (target, propKey) => target[propKey],
  set: (target, propKey, value) => {
    target[propKey] = value;
  },
});

// test
console.log(proxy.name); // jack
proxy.city = 'Nanjing'; 
console.log(proxy.city);  // Nanjing
console.log(person); // { name: 'jack', city: 'Nanjing' }
