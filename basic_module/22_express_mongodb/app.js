let express = require('express'),
    bodyParser = require('body-parser'),
    app = new express(),
    BaseMongodb = require('./base_mongodb'),
    baseMongodb = new BaseMongodb(),
    md5 = require('md5-node'),
    multiparty = require('multiparty'),
    util = require('util'),
    fs = require('fs'),
    session = require('express-session');

// 设置body-parser中间件获取post请求的参数，但是无法处理图片数据
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())



// 使用ejs模板引擎   默认找views这个目录
app.set('view engine', 'ejs')

// 配置public目录为我们的静态资源目录
app.use(express.static('public'))

// 配置图片存储的静态目录
app.use('/upload', express.static('upload'))

// 配置session中间件
app.use(session({
    secret: 'fremember',// 可以随便写，一个String类型的字符串，作为服务器端生成session的签名
    name: 'session_id',// 保存在本地cookie的一个名字，默认connect.sid可以不设置
    resave: false,// 强制保存session，即使它没有变化，默认为true，建议设置成false
    saveUninitialized: true,// 强制将未初始化的session存储，默认是true，建议设置成false
    cookie: {
        maxAge: 1000 * 60 * 30// 设置cookie过期时间为30分钟
    },
    rolling: true// session没有过期的时候，没操作一次，重新初始化cookie过期时间为30分钟
}))

// 自定义中间件，判断登录状态
app.use((req, res, next) => {
    if(req.url == '/' || req.url == '/login' || req.url == '/doLogin') {
        next()
    } else {
        if(req.session.userinfo && req.session.userinfo.username != '') {
            app.locals['userinfo'] = req.session.userinfo// ejs中设置全局数据 所有的页面模版都可以使用
            next()
        } else {
            res.redirect('/login')
        }
    }
})

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/login', (req, res) => {
    res.render('login')
})

// 获取登录提交的数据
app.post('/doLogin', (req, res) => {
    // console.log(req.body)// 获取post提交的数据
    // 使用body-parser获取post提交的数据
    // 1、获取数据
    // let whereJson = {
    //    username: req.body.username,
    //    password: md5(`author_fremember###email_18769567910@163.com###${req.body.password}`)
    // },
    // orderByJson = {},
    // limitJson = {
    //     pageNum: 1,// 下标从1开始
    //     pageSize: 2
    // },
    // fieldsJson = {};
    // // 2、连接数据库，查询数据
    // baseMongodb.find('user', whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
    //     // console.log(ret)
    //     if(ret.length > 0) {
    //         req.session.userinfo = ret[0]// 登录完成，存储session
    //         res.redirect('/product')// 登录成功，跳转到商品列表页面
    //     } else {
    //         res.send(`<script>alert('登录失败');location.href='/login'</script>`)
    //     }
    // })

    let form = new multiparty.Form(),
        whereJson = {},
        orderByJson = {},
        limitJson = {
            pageNum: 1,// 下标从1开始
            pageSize: 2
        },
        fieldsJson = {};
    form.parse(req, function(err, fields, files) {
        whereJson.username = fields.username[0]
        whereJson.password = md5(`author_fremember###email_18769567910@163.com###${fields.password[0]}`)
         // 2、连接数据库，查询数据
        baseMongodb.find('user', whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
            if(ret.length > 0) {
                req.session.userinfo = ret[0]// 登录完成，存储session
                res.redirect('/product')// 登录成功，跳转到商品列表页面
            } else {
                res.send(`<script>alert('登录失败');location.href='/login'</script>`)
            }
        })
    })
})
// 退出登录
app.get('/loginOut', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/login')
        }
    })
})

app.get('/product', (req, res) => {
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
            res.render('product', {
                list: ret
            })
        } else {
            res.render('product', {
                list: []
            })
        }
    })
    
})

app.get('/productadd', (req, res) => {
    res.render('productadd')
})
app.post('/doProductAdd', (req, res) => {
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
        rowInfo.pic = files.pic[0].path
        baseMongodb.insert('product', rowInfo, (ret) => {
            if(ret) {
                res.redirect('/product')
            }
        })
    })
})

app.get('/productedit', (req, res) => {
    let id = req.query.id
    baseMongodb.findOneById('product', id, (ret) => {
        res.render('productedit', {
            list: ret[0]
        })
    })
})
app.post('/doProductEdit', (req, res) => {
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
                res.redirect('/product')
            }
        })
    })
})

app.get('/productdelete', (req, res) => {
    baseMongodb.deleteOne('product', req.query.id, (ret) => {
        if(ret) {
            res.redirect('/product')
        }
    })
})

app.listen(3001, '127.0.0.1')