/**
 * koa中body-bodyparser的使用
 *     1、安装：cnpm install koa-bodyparser --save
 *     2、引入：bodyParser = require('koa-bodyparser')
 *     3、启用中间件：app.use(bodyParser())
 *     4、使用：let data = ctx.request.body
 */
let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser');

router
    .get('/', async (ctx) => {
        await ctx.render('form')
    })
    .post('/doAdd', async (ctx) => {
        ctx.body = ctx.request.body
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
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)