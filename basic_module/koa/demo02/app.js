let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    user = require('./routes/user.js'),
    news = require('./routes/news.js');

render(app, {
    root: `${__dirname}/views`,
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'// 是否开启调试模式
})

router.use('/user', user)
// 如果使用下面这种形式，则需要在路由中删除 /user ，否则路由匹配不到
// router.use(user)
router.use('/news', news.routes())

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)