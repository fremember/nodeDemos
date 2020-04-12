let express = require('express'),
    router = express.Router(),
    login = require('./admin/login'),
    product = require('./admin/product'),
    user = require('./admin/user');

router.use((req, res, next) => {
    if(req.url == '/login' || req.url == '/login/doLogin') {
        next()
    } else {
        if(req.session.userinfo && req.session.userinfo.username != '') {
            req.app.locals['userinfo'] = req.session.userinfo// ejs中设置全局数据 所有的页面模版都可以使用
            next()
        } else {
            res.redirect('/admin/login')
        }
    }
})

router.use('/login', login)
router.use('/product', product)
router.use('/user', user)

module.exports = router
