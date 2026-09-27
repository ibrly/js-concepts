// a closure is a function bundled with references to its surrounding lexical environment
// even after the outer function's execution context is popped off the stack,
// the inner function still has access to the outer variables through the scope chain

function greet(greeting) {
  return function (name) {
    console.log(greeting + ' ' + name)
  }
}

const sayHi = greet('Hi') // greet's execution context is gone after this line
sayHi('Ibrahim') // Hi Ibrahim -> greeting is still reachable via the closure

// counter: private state that only the returned functions can touch
function createCounter() {
  let count = 0
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  }
}

const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value()) // 1
console.log(counter.count) // undefined -> count is not a property, it lives in the closure

// classic pitfall: var is function scoped, so all callbacks share the same i
var fns = []
for (var i = 0; i < 3; i++) {
  fns.push(function () { return i })
}
console.log(fns.map(fn => fn())) // [3, 3, 3]

// let creates a new binding per iteration, so each closure gets its own i
const fixed = []
for (let j = 0; j < 3; j++) {
  fixed.push(() => j)
}
console.log(fixed.map(fn => fn())) // [0, 1, 2]
