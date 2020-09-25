let router = require('koa-router')()

router.get('/c', async (ctx) => {
    await ctx.render('user/item/c')
})
router.get('/d', async (ctx) => {
    await ctx.render('user/item/d')
})

module.exports = router