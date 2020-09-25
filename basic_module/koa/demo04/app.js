let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    static = require('koa-static'),
    bodyParser = require('koa-bodyparser'),
    session = require('koa-session'),
    CONFIG = {
        key: 'koa:sess', /** 默认 */
        maxAge: 1000 * 60 * 60,  /*  cookie的过期时间        【需要修改】  */
        overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
        httpOnly: true, /**  true表示只有服务器端可以获取cookie */
        signed: true, /** 默认 签名 */
        rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
        renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
    },
    home = require('./routes/home/index.js'),
    user = require('./routes/user/user.js'),
    product = require('./routes/product/index.js');

// 配置session的中间件
app.keys = ['fremember_18769567910_'];   /*cookie的签名*/

render(app, {
    root: `${__dirname}/views`,// 视图的位置
    extname: '.html',// 后缀名
    debug: process.env.NODE_ENV !== 'production'// 是否开启调试模式
})

router
    .get('/', async (ctx) => {
        await ctx.redirect('user/login')
    })
    .use('/home', home)
    .use('/user', user)
    .use('/product', product)

app
    .use(async (ctx, next) => {
        ctx.state = {
            title: '企业后台',
            __HOST__: `http://${ctx.request.header.host}`
        }
        await next()
    })
    .use(async (ctx, next) => {
        await next()
        if(ctx.status == 404) {
            ctx.status = 404
            ctx.render('404')
        }
    })
    .use(session(CONFIG, app))
    .use(bodyParser())
    .use(static('static'))// 配置第一个静态资源
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)