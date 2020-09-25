let router = require('koa-router')(),
    svgCaptcha = require('svg-captcha'),
    DB = require('./../../module/db.js'),
    utility = require('utility');
router
    .get('/', async ctx => {
        ctx.redirect('/product/index')
    })
    .get('/index', async ctx => {
        ctx.render('product/index')
    })
module.exports = router.routes()