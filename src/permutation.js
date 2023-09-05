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