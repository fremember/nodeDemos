let express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    md5 = require('md5-node'),
    BaseMongodb = require('./../../base_mongodb'),
    baseMongodb = new BaseMongodb();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.post('/doLogin', (req, res) => {
    // 1、获取数据
    let whereJson = {
       username: req.body.username,
       password: md5(`author_fremember###email_18769567910@163.com###${req.body.password}`)
    },
    orderByJson = {},
    limitJson = {
        pageNum: 1,// 下标从1开始
        pageSize: 2
    },
    fieldsJson = {};
    // 2、连接数据库，查询数据
    baseMongodb.find('user', whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
        // console.log(ret)
        if(ret.length > 0) {
            req.session.userinfo = ret[0]// 登录完成，存储session
            res.redirect('/admin/product')// 登录成功，跳转到商品列表页面
        } else {
            res.send(`<script>alert('登录失败');location.href='/admin/login'</script>`)
        }
    })
})

router.get('/loginOut', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
        } else {
            res.render('admin/login')
        }
    })
})

module.exports = router