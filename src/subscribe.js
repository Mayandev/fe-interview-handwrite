class EventEmitter {
  constructor() {
    this.events = {};
  }
  on (eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach(fn => fn.apply(this, args));
  }

  once(eventName, callback) {
    const fn = () => {
      callback();
      this.remove(eventName, fn);
    }
    this.on(eventName, fn)
  }

  remove(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(fn => fn != callback);
  }
}