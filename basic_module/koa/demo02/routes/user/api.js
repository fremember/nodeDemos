let router = require('koa-router')()

router.get('/a', async (ctx) => {
    await ctx.render('user/api/a')
})
router.get('/b', async (ctx) => {
    await ctx.render('user/api/b')
})

module.exports = router