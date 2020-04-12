let Component = require('./component'),
	component = new Component(),
	ConcreteComponent = require('./concreteComponent'),
	concreteComponent = new ConcreteComponent(),
	Decorator = require('./decorator'),
	decorator = new Decorator(),
	ConcreteDecoratorA = require('./concreteDecoratorA'),
	concreteDecoratorA = new ConcreteDecoratorA(),
	ConcreteDecoratorB = require('./concreteDecoratorB'),
	concreteDecoratorB = new ConcreteDecoratorB();

console.log(component)
component.operation()

console.log(concreteComponent)
concreteComponent.operation()

console.log(decorator)
decorator.operation()

console.log(concreteDecoratorA)
concreteDecoratorA.operation()

console.log(concreteDecoratorB)
concreteDecoratorB.operation()
concreteDecoratorB.addedBehavior()