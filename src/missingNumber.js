const missingNumber = (arr) => {
  console.log('原数组：', arr);
  let index = 1;
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (index !== arr[i]) {
      ans.push(index);
      arr.splice(i, 0, 0);
    }
    index++;
  }
  return ans;
};


const generateArray = limit => {
  let arr = [];
  for (let i = 1; i <= limit; i++) {
    arr.push(i);
  }
  // 随机删除两个数
  for (let i = 1; i <= 2; i++) {
    const rand = Math.round(Math.random() * limit);
    arr.splice(rand, 1);
  }
  return arr;
};

const arr = generateArray(10);
console.log('缺失的数：', missingNumber(arr))
