/**
 * Session 简单介绍
 *    session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 session 保存在服务器上。
 * Session 的工作流程
 *    当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，
 *    生成一个类似于 key,value 的键值对，然后将 key(cookie)返回到浏览器(客户)端，
 *    浏览器下次再访问时，携带 key(cookie)，找到对应的 session(value)。
 *    客户的信息都保存 在 session 中
 * koa-session 的使用:
 *    安装：cnpm install koa-session --save
 *    引入：let session = require('koa-session')
 *    配置：
 *      app.keys = ['some secret hurr'];
 *      const CONFIG = {
 *          key: 'koa:sess', //cookie key (default is koa:sess) 
 *          maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days) 
 *          overwrite: true, //是否可以 overwrite (默认 default true) 
 *          httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true) 
 *          signed: true, //签名默认 true 
 *          rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
 *          renew: false, //(boolean) 当session快过期的时候，重新初始化
 *      };
 *      app.use(session(CONFIG, app));
 * 
 *    使用：
 *      设置值 ctx.session.username = "张三";
 *      获取值 ctx.session.username
 * 
 * Cookie 和 Session 区别
 *    1、cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
 *    2、cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗考虑到安全应当使用 session。
 *    3、session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用 COOKIE。
 *    4、单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。
 */
let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    session = require('koa-session'),
    CONFIG = {
        key: 'koa:sess', /** 默认 */
        maxAge: 10000,  /*  cookie的过期时间        【需要修改】  */
        overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
        httpOnly: true, /**  true表示只有服务器端可以获取cookie */
        signed: true, /** 默认 签名 */
        rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
        renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
    };

render(app, {
    root: `${__dirname}/artViews`,
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
})
//配置session的中间件
app.keys = ['fremember_18769567910_'];   /*cookie的签名*/
router
    .get('/', async (ctx) => {
        ctx.session.userinfo = 'pxy'
        await ctx.render('index')
    })
    .get('/news', async (ctx) => {
        let userinfo = ctx.session.userinfo
        await ctx.render('cookie', { userinfo: userinfo })
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
    .use(session(CONFIG, app))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)
