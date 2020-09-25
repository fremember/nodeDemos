let router = require('koa-router')()

router.get('/', async (ctx) => {
    ctx.body = '新闻首页'
})
router.get('/:id', async (ctx) => {
    ctx.body = `第${ctx.params.id}条新闻页`
})

module.exports = router