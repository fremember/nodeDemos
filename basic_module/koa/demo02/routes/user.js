let router = require('koa-router')(),
    api = require('./user/api'),
    item = require('./user/item');

router.get('/', async (ctx) => {
    await ctx.render('user/index')
})
router.get('/pxy', async (ctx) => {
    await ctx.render('user/pxy')
})

router.use('/api', api.routes())
router.use('/item', item.routes())

module.exports = router.routes()