let util = require('util'),
	events = require('events');

function MyStream () {
	events.EventEmitter.call(this)
}

/* 应用 inherits 实现 MyStream 继承 events.EventEmitter */
util.inherits(MyStream, events.EventEmitter)

/* 注意这里不能使用箭头函数 */
MyStream.prototype.write = function(data) {
	this.emit('data', data)
}

let stream = new MyStream()

console.log(stream instanceof events.EventEmitter)// true
console.log(MyStream.super_ === events.EventEmitter)// true

stream.on('data', (data) => {
	console.log(`Receive data: "${data}"`)// Receive data: It works!
})

stream.write('It works!')