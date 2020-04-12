let util = require('util'),
	Observer = require('./observer');

function FirstObserver () {
	Observer.call(this)
	util.inherits(FirstObserver, Observer)
	this.update = function () {
		console.log('first observer')
	}
}

module.exports = FirstObserver