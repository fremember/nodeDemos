let express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    md5 = require('md5-node'),
    BaseMongodb = require('./../../base_mongodb'),
    baseMongodb = new BaseMongodb();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    let whereJson = {},
    orderByJson = {},
    limitJson = {
        pageNum: 1,// 下标从1开始
        pageSize: 10
    },
    fieldsJson = {};
    baseMongodb.find('user', whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
        res.render('admin/user/index', {
            list: ret
        })
    })
})

router.get('/add', (req, res) => {
    res.render('admin/user/add')
})

router.post('/doAdd', (req, res) => {
    let rowInfo = { ...req.body }
    if(rowInfo.password == rowInfo.checkpassword) {
        delete rowInfo.checkpassword
        rowInfo.password = md5(`author_fremember###email_18769567910@163.com###${rowInfo.password}`)
        baseMongodb.insert('user', rowInfo, (ret) => {
            if(ret) {
                res.redirect('/admin/user')
            }
        })
    } else {
        res.send(`<script>alert('两次密码输入不一致');location.href='/admin/user/add'</script>`)
    }
})

router.get('/edit', (req, res) => {
    let id = req.query.id
    baseMongodb.findOneById('user', id, (ret) => {
        res.render('admin/user/edit', {
            list: ret[0]
        })
    })
})

router.post('/doEdit', (req, res) => {
    let rowInfo = { ...req.body },
        id = rowInfo._id;
    if(rowInfo.password == rowInfo.checkpassword) {
        delete rowInfo.checkpassword
        delete rowInfo._id
        rowInfo.password = md5(`author_fremember###email_18769567910@163.com###${rowInfo.password}`)
        baseMongodb.modify('user', id, rowInfo, (bol) => {
            if(bol) {
                res.redirect('/admin/user')
            }
        })
    } else {
        res.send(`<script>alert('两次密码输入不一致');location.href='/admin/user/add'</script>`)
    }
})

module.exports = router