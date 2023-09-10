// 数组unique
const uniqueArray = (list: number[]) => Array.from(new Set(list));

/**
 * 多个数组取交集
 * @param args 数组
 * @returns 交集数组
 */
const getIntecsectionOfArrays = (...args: number[][]): number[] => {
    // 边界情况
    if (args.length <= 1) {
        return args.length ? [...args[0]] : [];
    }
    
    // 打平数组
    const flatterNums = args.map(ls => uniqueArray(ls)).flat(Number.MAX_SAFE_INTEGER) as number[];

    // 打表
    const hashMap = flatterNums.reduce((prev, num) => {
        prev.hasOwnProperty(num) ? prev[num]++ : prev[num] = 1;
        return prev;
    }, {} as Record<number, number>);

    return Object.keys(hashMap).filter(k => hashMap[k] === args.length).map(k => +k);
};
