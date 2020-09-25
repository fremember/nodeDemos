let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    views = require('koa-views'),
    common = require('./module/common.js');

router
    .get('/', async (ctx, next) => {
        await ctx.render('form')
    })
    .post('/doAdd', async (ctx, next) => {
        // 原生node.js在koa中获取post请求的数据
        let postData = await common.getData(ctx)
        ctx.body = postData
    })
app
    .use(views(`${__dirname}/views`, { extension: 'ejs' }))// 配置第三方中间件， 模版引擎
    .use(async (ctx, next) => {// 配置公共数据
        ctx.state = {
            username: 'fremember'
        }
        await next()
    })
    .use(async (ctx, next) => {// 配置为匹配路由，即404
        await next()
        if(ctx.status == 404) {
            ctx.status == 404
            await ctx.render('404')
        }
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)