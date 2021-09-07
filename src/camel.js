const underline2Camel = str => str.replace(/_(\w)/g, (p1, p2) => p2.toUpperCase());

const camel2Underline = str => str.replace(/([A-Z])/g, p1 => `_${p1.toLowerCase()}`);

console.log(underline2Camel('hello_world'));
console.log(camel2Underline('HelloWorld'));
