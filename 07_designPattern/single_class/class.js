let _instance = null// 定义初始化_instance，单例的关键

module.exports = function(time) {// 定义单例类
	function Class(time) {
		this.name = 'pxy'
		this.book = 'Node.js'
		this.time = time
	}
	Class.prototype = {
		constructor: Class,
		show: function() {
			console.log(`${this.book} is write by ${this.name} , time is ${this.time}`)
		}
	}
	this.getInstance = function(time) {// 执行这个方法的时候才会创建类的实例
		if(_instance === null) {
			_instance = new Class(time)
		}
		return _instance
	}
}