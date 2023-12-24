/**
 * @description: https://juejin.cn/post/7197246543208071205
 */

/**
 * 并发控制Promise
 * @param {nunber} concur 并发数
 */
export const pLimit = concur => {
    // 用数组模拟队列, 作为请求池
    const queue = [];

    // 当前活跃数量
    let active = 0;

    const next = () => {
        active--;

        if (queue.length) {
            queue.shift()();
        }
    };

    const run = async (fn, resolve, ...args) => {
        active++;
        
        const res = (async () => fn(...args))();
        resolve(res);

        try {
            await res;
        } catch (err) {
            console.log(err);
        }

        next();
    };

    const enqueue = (fn, resolve, ...args) => {
        queue.push(run(fn, resolve, ...args));

        if (queue.length && active < concur) {
            queue.shift()();
        }
    };

    const generator = (fn, ...args) => new Promise((reso) => {
        enqueue(fn, reso, ...args);
    });

    Object.defineProperties(generator, {
        active: {
            get: () => active,
        },
        pendingCount: {
            get: () => queue.length,
        },
        clear: {
            value() {
                while(queue.length) {
                    queue.pop();
                }
            }
        }
    });

    return generator;
};