let io = require('socket.io').listen(8080, { log: false })
io.sockets.on('connection', (socket) => {
	socket.on('msg', (data) => {
		console.log(data)
		if(data.state) {
			if(data.state == 'success') {
				socket.emit('msg', { 'me': 'every good' })
			} else {
				socket.emit('msg', { other: 'that is all' })
			}
		} else {
			socket.emit('msg', { other: 'that is all' })
		}
	})
})