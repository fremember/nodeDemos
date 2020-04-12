let Person = require('./person.js'),
	Student = require('./student.js'),
	Teacher = require('./teacher.js'),
	Coding = require('./coding.js'),
	
	person = new Person(),
	student = new Student(),
	teacher = new Teacher(),
	coding = new Coding();
console.log(`********** Person类 **********`)
console.log(person.name)
person.eat()
console.log(`********** Student类 **********`)
console.log(student.name)
student.eat()
student.study()
console.log(`********** Teacher类 **********`)
console.log(teacher.name)
teacher.eat()
teacher.teach()
console.log(`********** Coding类 **********`)
console.log(coding.name)
coding.eat()
coding.code()