let util = require('util'),
	Decorator = require('./decorator');

function ConcreteComponentA () {
	Decorator.call(this)
	this.operation = function () {
		Decorator.operation
		console.log('add some decorator by ConcreteComponentA')
	}
}

util.inherits(ConcreteComponentA, Decorator)

module.exports = ConcreteComponentA