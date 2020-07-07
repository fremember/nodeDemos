/**
 * Cookie 简介
 * 1、cookie 是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。
 * 2、HTTP 是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。
 * 
 * Koa Cookie 的使用
 *      1、Koa 中设置 Cookie 的值
 *          ctx.cookies.set(name, value, [options])
 *          通过 options 设置 cookie name 的 value :
 *          maxAge: 一个数字表示从 Date.now() 得到的毫秒数
 *          expires: cookie 过期的 Date
 *          path: 配置可以访问的页面, 默认是'/'
 *          domain: 默认就是当前域下面的所有页面都可以方法
 *          secure: 安全 cookie 默认 false，设置成 true 表示 只有 https 可以访问
 *          httpOnly: true表示这个cookie只有服务器端可以访问，false表示客户端（js），服务器端都可以访问，默认是true
 *          overwrite: 一个布尔值，表示是否覆盖以前设置的同名 的 cookie (默认是 false). 如果是 true,
 *          在同一个请求中设置相同名称的所有 Cookie（不 管路径或域）是否在设置此 Cookie 时从Set-Cookie 标头中过滤掉。
 *      2、Koa 中获取 Cookie 的值
 *          ctx.cookies.get('name');
 * 
 * cookie的作用：
 *  1、保存用户信息
 *  2、浏览器历史记录
 *  3、猜你喜欢的功能
 *  4、10天免登陆
 *  5、多个页面之间的数据传递
 *  6、cookie实现购物车功能
 * 
 * 设置：
 *      ctx.cookies.set('userinfo','zhangsan',{
 *          maxAge:60*1000*60
 *      });
 * 获取：
 *      var userinfo=ctx.cookies.get('userinfo');
 */

 let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    render = require('koa-art-template');

render(app, {
    root: `${__dirname}/artViews`,
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
})
router
    .get('/', async (ctx) => {
        /* cookies设置 */
        // ctx.cookies.set('userinfo', '18769567910@163.com', {
        //     maxAge: 60 * 60 * 1000,
        //     httpOnly: false
        // })
        /* cookies设置中文 */
        let userinfo = new Buffer('彭向阳').toString('base64')
        ctx.cookies.set('userinfo', userinfo, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        })
        await ctx.render('index')
    })
    .get('/news', async (ctx) => {
        /* cookies获取 */
        // let userinfo = ctx.cookies.get('userinfo')
        /* cookies获取中文 */
        let userinfo = new Buffer(ctx.cookies.get('userinfo'), 'base64').toString()
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
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)