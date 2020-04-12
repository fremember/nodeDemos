module.exports = function () {
	this.name = 'person'
	this.sleep = function () {
		console.log(`${this.name} is sleeping!`)
	}
	this.eat = function () {
		console.log(`${this.name} is eatting!`)
	}
}