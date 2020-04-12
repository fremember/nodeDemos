let express = require('express'),
    app = new express(),
    session = require('express-session');

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

// 使用ejs模板引擎   默认找views这个目录
app.set('view engine', 'ejs')

// 配置public目录为我们的静态资源目录
app.use(express.static('public'))

// 配置图片存储的静态目录
app.use('/upload', express.static('upload'))

// 引入路由模块
var admin = require('./routes/admin');
// app.use('/', index)
app.use('/admin', admin)

app.listen(3000, '127.0.0.1')