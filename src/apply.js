Funciton.prototype.myApply = function (context, args) {
  context.fn = this;
  let res;
  if (!args){
    res = context.fn();
  } else  {
    res = context.fn(...args)
  }
  return res;
}