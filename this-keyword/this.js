// `this` is decided by HOW a function is called, not where it is written
// (arrow functions are the exception: they take `this` from the surrounding lexical scope)

const user = {
  name: 'Ibrahim',
  regular() { return this.name },
  arrow: () => typeof this, // module/global scope `this`, not user
}

console.log(user.regular()) // Ibrahim -> implicit binding: called as user.regular()
console.log(user.arrow()) // object -> `this` is module.exports in node, not user

const detached = user.regular
console.log(detached()) // undefined -> lost binding, called as a plain function

// explicit binding
const other = { name: 'Aly' }
console.log(user.regular.call(other)) // Aly
console.log(user.regular.apply(other)) // Aly
const bound = user.regular.bind(other)
console.log(bound()) // Aly -> bind returns a new function with `this` locked

// new binding: `this` is the freshly created object
function Person(name) {
  this.name = name
}
console.log(new Person('Sara').name) // Sara

// arrow functions fix the common callback problem
const timer = {
  seconds: 0,
  start() {
    [1, 2, 3].forEach(() => this.seconds++) // arrow keeps timer as `this`
    return this.seconds
  },
}
console.log(timer.start()) // 3
