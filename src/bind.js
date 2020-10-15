Function.prototype.MyBind = function (context, ...args) {
  let self = this;
  return function() {
    return self.apply(context, args);
  }
}

// test
let a = {name: 'jack'} 
let test = function() {
  console.log(this.name); // jack
}
let rs = test.MyBind(a);
rs();