const permutation = arr => {
    const res = [];

    const helper = (list, m = []) => {
        if (!list.length) res.push(m);
        else {
            for (let i = 0; i < list.length; i++) {
                const curr = [...list];
                const next = curr.splice(i, 1);
                helper([...curr], m.concat(next));
            }
        }
    };

    helper(arr);

    return res;
};

// 代码随想录的回溯算法
const permutation2 = arr => {
    const res = [];
    const used = Array(arr.length).fill(false);

    // 记录节点数组
    const tmp = [];

    // 回溯算法
    const backtrackingFunc = ls => {
        if (tmp.length === ls.length) {
            // 必须copy一下才行
            res.push([...tmp]);
        } else {
            ls.forEach((num, i) => {
                // 回溯
                if (!used[i]) {
                    used[i] = true;
                    tmp.push(num);
                    backtrackingFunc(ls);
                    used[i] = false;
                    tmp.pop();
                }
            });
        }
    };

    backtrackingFunc(arr);

    return res;
};