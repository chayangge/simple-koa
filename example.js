let Koa = require('./src/application');
let app = new Koa();
app.use(async (ctx) => {
    // console.log('req,res', req, res);
    console.log('statusCode:', ctx.res.statusCode);
    // ctx.writeHead(201);
    // console.log('statusCode:', ctx.statusCode);
    // ctx.end();
    ctx.body = 'hello ' + ctx.query.name;
});
app.listen(3000);
