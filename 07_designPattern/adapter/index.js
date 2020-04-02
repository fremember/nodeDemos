let Adapter = require('./adapter'),
	target = new Adapter(),
	util = require('util');
function Aa() {
	this.name = 'pxy'
	this.age = 29
}
function Bb() {}
Bb.prototype = {
	sex: 1,
	name: 'fremember',
	show: function() {
		console.log(123)
	}
} 

target.request()

util.inherits(Aa, Bb)
let aa = new Aa(),
	bb = new Bb();
console.log(aa)
aa.show()
 