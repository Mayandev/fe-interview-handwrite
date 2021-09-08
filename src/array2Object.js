const data = [
  {
    id: 1,
    parent: 2,
  },
  {
    id: 2,
    parent: null,
  },
  {
    id: 3,
    parent: 2,
  },
  {
    id: 4,
    parent: 1,
  },
  {
    id: 5,
    parent: 2,
  },
  {
    id: 6,
    parent: 4,
  },
  {
    id: 7,
    parent: 3,
  },
  {
    id: 8,
    parent: 3,
  },
];

/**
 * 将上面的数组转换为对象
 * @param {*} arr
 * @returns Object
 */
const array2Object = arr => {
  const findParent = node => {
    const [parent] = arr.filter(item => item.id === node.parent);
    return parent;
  };
  const [root] = arr.filter(item => item.parent == null);
  const childNodes = arr.filter(item => item.parent != null);
  for (let item of childNodes) {
    const parent = findParent(item);
    if (!parent.children) {
      parent.children = [item];
    } else {
      parent.children.push(item);
    }
  }
  return root;
};

/**
 * 用 Map 优化事件复杂度
 * @param {*} arr
 */
const array2Object2 = arr => {
  const map = arr.reduce((prev, next) => Object.assign(prev, { [next.id]: next }), {});
  const [root] = arr.filter(item => item.parent == null);
  const childNodes = arr.filter(item => item.parent != null);

  for (let item of childNodes) {
    const parent = map[item.parent];
    if (!parent.children) {
      parent.children = [item];
    } else {
      parent.children.push(item);
    }
  }
  return root;
};

console.log(array2Object2(data));
