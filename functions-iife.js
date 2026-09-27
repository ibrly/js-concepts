// IIFE: Immediately Invoked Function Expression
// wrapping a function in parentheses makes it an expression, so it can be invoked right away
// it creates its own execution context, keeping variables out of the global object

(function () {
  var secret = 'hidden'
  console.log('inside IIFE:', secret)
})()

console.log(typeof secret) // undefined -> did not leak into global scope

// passing arguments in
const result = (function (a, b) {
  return a + b
})(2, 3)
console.log(result) // 5

// module pattern: expose a public API, keep the rest private
const bank = (function () {
  let balance = 0
  return {
    deposit(amount) { balance += amount; return balance },
    getBalance() { return balance },
  }
})()

bank.deposit(100)
console.log(bank.getBalance()) // 100
console.log(bank.balance) // undefined

// arrow IIFE, handy for top-level async before top-level await existed
;(async () => {
  const value = await Promise.resolve('async IIFE done')
  console.log(value)
})()
