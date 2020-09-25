/**
 * 什么是 Koa 的中间件
 *  中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以 把它叫做中间件
 *  在 express 中 中间件（Middleware）是一个函数，
 *  它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 
 *  和 web 应用中处理请求-响应循环流程中的中间件，一般被命名为 next 的变量。在 Koa 中中间件和 express 有点类似
 * 
 * 中间件的功能包括： 执行任何代码。 修改请求和响应对象。 终结请求-响应循环。 调用堆栈中的下一个中间件。
 * 
 * 如果我的 get、post 回调函数中，没有 next 参数，那么就匹配上第一个路由，就不会往下匹 配了。如果想往下匹配的话，那么需要写 next()
 * 
 * Koa 应用可使用如下几种中间件
 *     应用级中间件
 *     路由级中间件
 *     错误处理中间件
 *     第三方中间件
 * 
 * koa中的中间件的匹配流程是：不管app.use写在哪儿，都先做匹配，然后才做其他路由的匹配
 */
let koa = require('koa'),
    app = new koa(),
    router = require('koa-router')();

// 应用级中间件
app.use(async (ctx, next) => {
    console.log(new Date().getTime())// 匹配到路由之前，打印当前时间
    await next()// 当前路由匹配完成以后继续向下匹配，如果没有这句话，这个路由被匹配到了就不会继续向下匹配
})

// 错误处理中间件
app.use(async (ctx, next) => {
    /**
     * 这里面的内容顺序执行，所以先执行next()去匹配路由，
     * 匹配到了路由，则执行路由相关的逻辑，然后代码回到这里
     * 开始执行if语句判断ctx的status的逻辑
     */
    next()
    if(ctx.status == 404) {// 如果页面找不到，则设置状态码，并设置内容
        ctx.status = 404
        ctx.body = '这是一个404页面'
    }
})

router
    .get('/', async (ctx) => {
        ctx.body = 'home'
    })
    // 路由级中间件
    .get('/news', async (ctx, next) => {
        console.log('这是路由中间件')
        await next()
    })
    .get('/news', async (ctx) => {
        ctx.body = 'news'
    })
    .get('/login', async (ctx) => {
        ctx.body = 'login'
    })

app.use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)