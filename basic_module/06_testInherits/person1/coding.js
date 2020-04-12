let util = require('util'),
	Person = require('./person.js');

function Coding () {
	Person.call(this)
}

util.inherits(Coding, Person)

Coding.prototype.code = function () {
	console.log('I an coding')
}

module.exports = Coding