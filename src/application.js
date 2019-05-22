let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
console.log('req:', typeof request, request);
console.log('req:', typeof Object.create(request), Object.create(request));
class Application {
    constructor () {
        this.callBackFun;
        this.middlewares = [];
        this.context = context;
        this.request = request;
        this.response = response;
    }
    listen (...args) {
        let server = http.createServer(this.callBack());
        server.listen(...args);
    }
    // use (fn) {
    //     this.callBackFun = fn;
    // };
    use (middleware) {
        this.middlewares.push(middleware);
    }
    compose () {
        // 将middlewares合并为一个函数，该函数接收一个ctx对象
        return async ctx => {
            function createNext (middleware, oldNext) {
                return async () => {
                    await middleware(ctx, oldNext);
                };
            }

            let len = this.middlewares.length;
            let next = async () => {
                return Promise.resolve();
            };
            for (let i = len - 1; i >= 0; i--) {
                let currentMiddleware = this.middlewares[i];
                next = createNext(currentMiddleware, next);
            }

            await next();
        };
    }
    callBack () {
        return (req, res) => {
            let ctx = this.createContext(req, res);
            let respond = () => this.responseBody(ctx);
            // this.callBackFun(req, res);
            // this.callBackFun(ctx).then(respond);
            let fn = this.compose();
            return fn(ctx).then(respond);
        };
    }
    createContext (req, res) {
        console.log('req111:', typeof Object.create(request), Object.create(request));

        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    responseBody (ctx) {
        let context = ctx.body;
        if (typeof context === 'string') {
            ctx.res.end(context);
        }
        else if (typeof context === 'object') {
            ctx.res.end(JSON.stringify(context));
        }
    }
};
module.exports = Application;
