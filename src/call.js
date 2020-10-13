Function.prototype.myCall = function (context, ...rest) {
  context.fn = this;
  var result = context.fn(...rest);
  delete context.fn;
  return result;
}