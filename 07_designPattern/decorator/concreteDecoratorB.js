let util = require('util'),
	Decorator = require('./decorator');

function ConcreteDecoratorB () {
	Decorator.call(this)
	this.operation = function () {
		Decorator.operation
		console.log('add some decorator by ConcreteDecoratorB')
	}
	this.addedBehavior = function () {
		console.log('add new method by ConcreteDecoratorB')
	}
}

util.inherits(ConcreteDecoratorB, Decorator)

module.exports = ConcreteDecoratorB