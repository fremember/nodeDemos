let util = require('util'),
	Person = require('./person.js');

function Teacher () {
	Person.call(this)
}

util.inherits(Teacher, Person)

Teacher.prototype.teach = function() {
	console.log('I am teaching')
}

module.exports = Teacher