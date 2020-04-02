let util = require('util'),
	Observer = require('./observer');

function SecondObserver () {
	Observer.call(this)
	util.inherits(SecondObserver, Observer)
	this.update = function () {
		console.log('second observer')
	}
}

module.exports = SecondObserver