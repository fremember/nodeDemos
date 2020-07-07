/**
 * ejs模版引擎的使用
 *  1、安装koa-views    cnpm install koa-views --save
 *  2、安装ejs          cnpm install ejs --save
 *  3、views = require('koa-views')
 *  4、使用模版
 *      app.use(views(`${__dirname}/views`, { extension: 'ejs' }))// 使用模版的第一种方式，这样配置的时候，模版必须是.ejs文件
 *      app.use(views(`${__dirname}/views`, { map: { html: 'ejs' } }))// 使用模版的第二种方式，这样配置的时候，模版必须是.html文件
 *  5、await ctx.render('index')
 * 
 * 公共数据放在 ctx.state这个对象里面，这样模块的任何地方都可以使用了
 */
let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    views = require('koa-views');

app
    .use(views(`${__dirname}/views`, { extension: 'ejs' }))// 配置第三方中间件， 模版引擎
    .use(async (ctx, next) => {
        console.log(new Date().getTime())
        // 配置公共信息
        ctx.state = {
            userinfo: 'fremember'
        }
        await next()
    })
    .use(async (ctx, next) => {
        await next()
        if(ctx.status == 404) {
            ctx.status = 404
            await ctx.render('404')
        }
    });
router
    .get('/', async (ctx, next) => {
        await ctx.render('index', { msg: 'abcd', menu: [ 'aaaa', 'bbbb', 'cccc' ], num: 24 })
    })
    .get('/news', async (ctx, next) => {
        console.log('这是路由中间件')
        await next()
    })
    .get('/news', async (ctx, next) => {
        await ctx.render('news')
    });

app.use(router.routes())
   .use(router.allowedMethods())
   .listen(3000)