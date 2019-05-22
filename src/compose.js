function compose (middleware) {
    // 传入的 middleware 必须是一个数组, 否则报错
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    // 循环遍历传入的 middleware， 每一个元素都必须是函数，否则报错
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
    // 正如我们前面说的， compose 函数会返回一个函数
    // 记住，compose 会返回一个函数，这个函数接受两个参数 context, next
    return function (context, next) {
        // last called middleware #
        let index = -1;
        // debugger
        return dispatch(0);
        function dispatch (i) {
            //   debugger
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middleware[i];
            // 已经取完了所有中间件
            // 这个时候还会进来一次，然后把 fn 变成 next
            // 在这里面 next 没有传，所以 fn = next = undefined
            // 直接 resolve 掉
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(context, function next () {
                    return dispatch(i + 1);
                }));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    };
}
module.exports = compose;
