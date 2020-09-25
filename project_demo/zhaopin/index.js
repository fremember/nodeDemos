let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    JwtUtil = require('./utils/jwt'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    userRouter = require('./routers/user/index');

// 全局校验接口的token
app.use((req, res, next) => {
    if (req.url.indexOf('/user/login') < 0 && req.url.indexOf('/user/register') < 0 && req.url.indexOf('/user/checkUser') < 0) {// 排除不需要校验token的接口
        let token = req.headers.token
        jwt = new JwtUtil(token)
        result = jwt.verifyToken()
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            return res.send({ code: 200, message: '登录已过期,请重新登录' })
        } else {
            next();
        }
    } else {
        next();
    }
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(1314, () => {
    console.log('Node app start at port 1413')
})