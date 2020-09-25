/**
 * 新建koa项目
 * 1、新建项目的文件夹
 * 2、生成package.json文件，命令行执行：npm init (或者npm init --yes)
 * 3、如下的配置
 * 4、执行文件：node app.js
 */
let koa = require('koa'),
    app = new koa(),
    router = require('koa-router')();// 引入和实例化路由，等同于下面两行
    // Router = require('koa-router'),
    // router = new Router();

router
    .get('/', async (ctx, next) => {
        ctx.body = 'hello koa-router'
    })
    .get('/news', async (ctx, next) => {
        ctx.body = 'hello news'
    })
    .get('/item', async (ctx, next) => {// 获取url中的参数
        // 第一种获取地址中参数的方式
        // console.log(ctx.request)
        // console.log(ctx.request.query)// 返回的是格式化好的参数对象
        // console.log(ctx.request.querystring)// 返回的是请求字符串
        // console.log(ctx.request.query.id)// 获取地址中的参数id
        // ctx.body = `query.id: ${ctx.request.query.id}, query.username: ${ctx.request.query.username}`

        // 第二种获取参数的方式
        ctx.body = `query.id: ${ctx.query.id}, query.username: ${ctx.query.username}`

        // 第三种获取参数的方式，这里ctx.req获取的是 Node 的 request 对象，所以需要使用Node里面的处理方式
        // ctx.body = `请求地址: ${ctx.req.url}`
    })
    .get('/item/:aid', async (ctx) => {// 动态路由
        // console.log(ctx.params)// { aid: '123' } // 获取动态路由的数据
        ctx.body = `item/${ctx.params.aid}`
    })

// 中间件
// app.use(async (ctx) => {
//     ctx.body = '你好 koa'
// })

app.use(router.routes())// 作用：启动路由
   .use(router.allowedMethods())// 作用：这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有路由中间件最后调用.此时根据 ctx.status 设置 response 响应头


app.listen(3000)