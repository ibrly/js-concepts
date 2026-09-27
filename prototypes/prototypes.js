// every object has a hidden [[Prototype]] link; property lookups walk up this prototype chain

const animal = {
  eats: true,
  describe() { return `${this.name} eats: ${this.eats}` },
}

const rabbit = Object.create(animal) // rabbit.[[Prototype]] === animal
rabbit.name = 'rabbit'
console.log(rabbit.describe()) // rabbit eats: true -> found on animal
console.log(Object.getPrototypeOf(rabbit) === animal) // true
console.log(rabbit.hasOwnProperty('eats')) // false -> inherited

// shadowing: writing creates an own property, the prototype is untouched
rabbit.eats = false
console.log(rabbit.eats, animal.eats) // false true

// constructor functions share methods through .prototype
function Dog(name) {
  this.name = name
}
Dog.prototype.bark = function () { return `${this.name}: woof` }

const rex = new Dog('rex')
console.log(rex.bark()) // rex: woof
console.log(rex.__proto__ === Dog.prototype) // true
console.log(Dog.prototype.constructor === Dog) // true

// inheritance between constructors
function Puppy(name) {
  Dog.call(this, name)
}
Puppy.prototype = Object.create(Dog.prototype)
Puppy.prototype.constructor = Puppy
Puppy.prototype.play = function () { return `${this.name} plays` }

const bit = new Puppy('bit')
console.log(bit.bark(), '|', bit.play()) // bit: woof | bit plays
console.log(bit instanceof Dog) // true

// the chain ends at Object.prototype, whose prototype is null
console.log(Object.getPrototypeOf(Object.prototype)) // null
