let Koa = require('koa');
// let bodyparser = require('koa-bodyparser');
let bodyparser = require('./src/body-parser');
let app = new Koa();
// app.use(bodyparser());
app.use(async (ctx) => {
    console.log(ctx.path, ctx.method);
    console.log('**********', ctx.request.body);
    console.log('**********', ctx.req.body);
    let buff = [];
    ctx.req.on('data', function (trunk) {
        console.log('trunk:', trunk);
        buff.push(trunk);
    }).on('end', function () {
        let b = Buffer.concat(buff);
        console.log('b:', b);
        console.log('b.toString:', b.toString());
    });
    if (ctx.path === '/' && ctx.method === 'POST') {
        // ctx.body = ctx.request.body;
        ctx.body = 'ueryCollections';
    }
    else {
        ctx.body = 'get';
    }
}).listen(3000);
