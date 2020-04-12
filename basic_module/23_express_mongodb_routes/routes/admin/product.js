let express = require('express'),
    router = express.Router(),
    BaseMongodb = require('./../../base_mongodb'),
    baseMongodb = new BaseMongodb(),
    multiparty = require('multiparty'),
    fs = require('fs');

// 商品列表
router.get('/', (req, res) => {
    // 连接数据库，查询商品列表
    let whereJson = {},
    orderByJson = {},
    limitJson = {
        pageNum: 1,// 下标从1开始
        pageSize: 10
    },
    fieldsJson = {};
    baseMongodb.find('product', whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
        if(ret.length > 0) {
            res.render('admin/product/index', {
                list: ret
            })
        } else {
            res.render('admin/product/index', {
                list: []
            })
        }
    })
})

// 展示添加商品列面
router.get('/add', (req, res) => {
    res.render('admin/product/add')
})

// 添加商品逻辑
router.post('/doAdd', (req, res) => {
    // 获取提交的数据以及图片上传成功返回的图片信息
    let form = new multiparty.Form()
    form.uploadDir = 'upload'// 上传图片保存的地址，目录必须存在
    form.parse(req, function(err, fields, files) {
        // console.log(fields)// 获取表单数据
        // console.log(files)// 图片上传成功返回的信息
        let rowInfo = {}
        rowInfo.title = fields.title[0]
        rowInfo.price = fields.price[0]
        rowInfo.fee = fields.fee[0]
        rowInfo.description = fields.description[0]
        rowInfo.pic = `/${files.pic[0].path}`
        // console.log(files.pic[0].path)
        baseMongodb.insert('product', rowInfo, (ret) => {
            if(ret) {
                res.redirect('/admin/product')
            }
        })
    })
})

// 展示编辑商品页面
router.get('/edit', (req, res) => {
    let id = req.query.id
    baseMongodb.findOneById('product', id, (ret) => {
        res.render('admin/product/edit', {
            list: ret[0]
        })
    })
})

// 编辑商品逻辑
router.post('/doEdit', (req, res) => {
    let form = new multiparty.Form()
    form.uploadDir = 'upload'// 上传图片保存的地址，目录必须存在
    form.parse(req, function(err, fields, files) {
        // console.log(fields)
        // console.log(files)
        let rowInfo = {}
        rowInfo.title = fields.title[0]
        rowInfo.price = fields.price[0]
        rowInfo.fee = fields.fee[0]
        rowInfo.description = fields.description[0]
        if(files.pic[0].originalFilename != '') {
            rowInfo.pic = files.pic[0].path
        } else {// 删除本地文件
            fs.unlink(`${files.pic[0].path}`, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(`成功的删除了文件: ${files.pic[0].path}`) 
                }
            })
        }
        baseMongodb.modify('product', fields._id[0], rowInfo, (bol) => {
            if(bol) {
                res.redirect('/admin/product')
            }
        })
    })
})

// 删除商品
router.get('/delete', (req, res) => {
    let id = req.query.id
    baseMongodb.deleteOne('product', req.query.id, (ret) => {
        if(ret) {
            res.redirect('/admin/product')
        }
    })
})

module.exports = router