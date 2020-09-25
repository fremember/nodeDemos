/**
 * koa-art-template使用
 *  1、安装：
 *      cnpm install --save art-template
 *      cnpm install --save koa-art-template
 *  2、引入：render = require('koa-art-template')
 *  3、配置：
 *      render(app, {
 *          root: path.join(__dirname, 'artViews'),
 *          extname: '.art',
 *          debug: process.env.NODE_ENV !== 'production'
 *      });
 *  4、使用：await ctx.render('art')
 */
let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path');

render(app, {
    root: path.join(__dirname, 'artViews'),// 视图的位置
    extname: '.art',// 后缀名
    debug: process.env.NODE_ENV !== 'production'// 是否开启调试模式
})

router
    .get('/', async (ctx, next) => {
        await ctx.render('art', {
            list: ['aaa', 'bbb', 'ccc'],
            bol: false,
            htmlStr: '<strong>加粗字体</strong>'
        })
    })

app
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
            await ctx.render(404)
        }
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)