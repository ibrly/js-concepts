// Symbol is a primitive whose every value is unique
// useful for property keys that can never clash with other keys

const id = Symbol('id')
const otherId = Symbol('id')
console.log(id === otherId) // false -> the description is only a label

const user = { name: 'Ibrahim', [id]: 42 }
console.log(user[id]) // 42
console.log(Object.keys(user)) // [ 'name' ] -> symbol keys are skipped
console.log(JSON.stringify(user)) // {"name":"Ibrahim"}
console.log(Object.getOwnPropertySymbols(user)) // [ Symbol(id) ]

// global registry: Symbol.for returns the same symbol for the same key
console.log(Symbol.for('app.token') === Symbol.for('app.token')) // true

// well-known symbols let objects plug into language features
class Temperature {
  constructor(celsius) { this.celsius = celsius }

  // controls conversion in `+obj`, `${obj}` and comparisons
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? `${this.celsius}°C` : this.celsius
  }

  // controls Object.prototype.toString output
  get [Symbol.toStringTag]() { return 'Temperature' }
}

const t = new Temperature(21)
console.log(`${t}`, t + 1, t > 20) // 21°C 22 true
console.log(Object.prototype.toString.call(t)) // [object Temperature]

// Symbol.iterator makes any object work with for...of and spread
const countdown = {
  *[Symbol.iterator]() { for (let i = 3; i > 0; i--) yield i },
}
console.log([...countdown]) // [ 3, 2, 1 ]
