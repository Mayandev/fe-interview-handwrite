/* 
[
    {
        "id":"1",
        "childrens":[{
            "id":"12",
            "childrens":[]
        },{
            "id":"13",
            "childrens":[{
               "id":"123",
               "childrens":[]
          }]
        }]
    },
    {
        "id":"2",
        "childrens":[]
    }
]
*/

function maxDeep(list) {
    // boundary case
    if (!list.length) return 0;

    let res = 1;

    // 栈法获取
    list.forEach(item => {
        let tmp = 1;
        const { childrens } = item;
        if (childrens.length) {
            // 开栈
            const stack = [];

            childrens.forEach(child => {
                tmp = 1;
                stack.push(child);
                while (stack.length) {
                    tmp++;
                    const { childrens } = stack.pop();
                    if (childrens.length) {
                        stack.push(...childrens);
                    }
                }
            });

            if (tmp > res) {
                res = tmp;
            }
        }
    });

    return res;
}