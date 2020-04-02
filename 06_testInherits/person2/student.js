let util = require('util'),
	Person = require('./person.js');

function Student () {
	Person.call(this)
	util.inherits(Student, Person)
	this.name = 'pxy'
	this.study = function() {
		console.log(`${this.name} is studying!`)
	}
}
// 返回Student类的实例，可以静态调用Student中的属性和方法
module.exports = new Student()