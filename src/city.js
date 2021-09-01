const cityData = [
  {
    id: '1',
    name: '广东省',
    children: [
      {
        id: '11',
        name: '深圳市',
        children: [
          {
            id: '111',
            name: '南山区',
          },
          {
            id: '112',
            name: '福田区',
            children: [
              {
                id: '1121',
                name: 'A街道',
              },
            ],
          },
          {
            id: '113',
            name: '福田区',
            children: [
              {
                id: '1131',
                name: 'A街道',
              },
            ],
          },
        ],
      },
      {
        id: '12',
        name: '东莞市',
        children: [
          {
            id: '121',
            name: 'A区',
          },
          {
            id: '122',
            name: 'B区',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '湖北省',
    children: [
      {
        id: '21',
        name: '武汉市',
        children: [
          {
            id: '211',
            name: '洪山区',
          },
          {
            id: '212',
            name: '江夏区',
            children: [
              {
                id: '2121',
                name: 'A街道',
              },
            ],
          },
        ],
      },
      {
        id: '22',
        name: '鄂州市',
        children: [
          {
            id: '221',
            name: 'A区',
          },
          {
            id: '222',
            name: 'B区',
          },
        ],
      },
    ],
  },
];

function findFather(cities, id) {
  const stack = [];
  const findNode = (cities, id) => {
    let targetNode;
    for (let city of cities) {
      const { id: cityId, children } = city;
      stack.push(city);
      if (id === cityId) {
        return city;
      } else if (children) {
        targetNode = findNode(children, id);
      }
      stack.pop();
    }
    return targetNode;
  };
  findNode(cities, id);
  console.log(stack);
}

findFather(cityData, '2');
