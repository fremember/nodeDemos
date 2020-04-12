let util = require('util'),
	Target = require('./target.js'),
	Adaptee = require('./adaptee.js');

function Adapter () {
	Target.call(this)
	this.request = function () {
		let adapteeObj = new Adaptee()
		adapteeObj.specialRequest()
	}
}

util.inherits(Adapter, Target)

module.exports = Adapter