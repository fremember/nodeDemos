let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    JwtUtil = require('./utils/jwt'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

let userRouter = require('./routes/user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(1413, function() {
	console.log('Node app start at port 1413')
})