Function.prototype.MyBind = function (context, ...args) {
  let self = this;
  return function() {
    return self.apply(context, args);
  }
}

