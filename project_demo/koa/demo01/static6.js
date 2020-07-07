/**
 * koa-static静态资源中间件的使用
 *     1、安装：cnpm install koa-static --save
 *     2、引入：static = require('koa-static')
 *     3、配置中间件：app.use(static( path.join( __dirname, 'static') ))
 * 
 * 可以配置多个静态资源地址，查找资源的时候会以此从这些地址中查找
 */
let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    views = require('koa-views'),
    static = require('koa-static'),
    path = require('path');

router
    .get('/static', async (ctx, next) => {
        await ctx.render('static')
    })
app
    .use(views(`${__dirname}/views`, { extension: 'ejs' }))
    .use(async (ctx, next) => {
        ctx.state = {
            username: 'fremember'
        }
        await next()
    })
    .use(async (ctx, next) => {
        await next()
        if(ctx.status == 404) {
            ctx.status = 404
            await ctx.render('404')
        }
    })
    // 下面三行都可以配置
    // .use(static( path.join( __dirname, 'static' ) ) )
    // .use(static(`${__dirname}/static`))
    .use(static('static'))// 配置第一个静态资源
    .use(static('public'))// 配置第二个静态资源
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)