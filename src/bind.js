Function.prototype.bindNew = function (context, ...args) {
  return (...newArgs) => this.apply(context, [...args, ...newArgs]);
};

// test
const test = {
  name: "fy",
  showName: function (last: string) {
    console.log(this.name + " is " + last);
  },
};
test.showName("handsome"); // fy is handsome
test.showName.bind({ name: "Mr.fy" })("handsome");
test.showName.bindNew({ name: "Mr.fy" })("handsome");
