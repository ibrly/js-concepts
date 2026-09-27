// currying turns f(a, b, c) into f(a)(b)(c)
// partial application fixes some arguments now and takes the rest later

const add3 = (a, b, c) => a + b + c

// generic curry: collects arguments until it has as many as the function expects
const curry = fn =>
  function curried(...args) {
    return args.length >= fn.length
      ? fn.apply(this, args)
      : (...more) => curried.apply(this, [...args, ...more])
  }

const curriedAdd = curry(add3)
console.log(curriedAdd(1)(2)(3)) // 6
console.log(curriedAdd(1, 2)(3)) // 6
console.log(curriedAdd(1)(2, 3)) // 6

// partial application with bind
const add10 = add3.bind(null, 4, 6)
console.log(add10(5)) // 15

// practical use: building specialised functions
const log = curry((level, scope, message) => `[${level}] ${scope}: ${message}`)
const error = log('ERROR')
const authError = error('auth')
console.log(authError('token expired')) // [ERROR] auth: token expired

// composing curried helpers
const map = curry((fn, list) => list.map(fn))
const filter = curry((pred, list) => list.filter(pred))
const double = map(x => x * 2)
const evens = filter(x => x % 2 === 0)
console.log(double(evens([1, 2, 3, 4]))) // [4, 8]
