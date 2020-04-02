let util = require('util'),
	Person = require('./person.js');

function Student () {
	Person.call(this)// 如果需要重写父类的属性或者方法必须卸载这句代码下面
	this.name = 'student'// 重写父类的属性
	this.eat = function() {// 重写父类的方法
		console.log('student eatting!')
	}
}

/* 将Student继承Person */
util.inherits(Student, Person)

Student.prototype.study = function() {
	console.log('I am learning')
}

/* 暴露Student类 */
module.exports = Student