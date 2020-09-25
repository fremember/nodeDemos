let router = require('koa-router')(),
    DB = require('./../../module/db.js');

router
    .get('/', async ctx => {
        ctx.redirect('/home/index')
    })
    .get('/index', async ctx => {
        ctx.render('home/index')
    })

module.exports = router.routes()