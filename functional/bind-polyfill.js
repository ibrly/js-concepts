// re-implementing call, apply and bind shows how `this` binding works under the hood

Function.prototype.myCall = function (context = globalThis, ...args) {
  const key = Symbol('fn') // unique key so we never overwrite an existing property
  context[key] = this // `this` is the function myCall was invoked on
  const result = context[key](...args) // calling it as a method sets `this` to context
  delete context[key]
  return result
}

Function.prototype.myApply = function (context, args = []) {
  return this.myCall(context, ...args)
}

Function.prototype.myBind = function (context, ...preset) {
  const fn = this
  return function (...later) {
    return fn.myApply(context, [...preset, ...later])
  }
}

function introduce(greeting, punctuation) {
  return `${greeting}, I am ${this.name}${punctuation}`
}

const me = { name: 'Ibrahim' }
console.log(introduce.myCall(me, 'Hi', '!')) // Hi, I am Ibrahim!
console.log(introduce.myApply(me, ['Hello', '.'])) // Hello, I am Ibrahim.
const hey = introduce.myBind(me, 'Hey')
console.log(hey('?')) // Hey, I am Ibrahim?
console.log(Object.keys(me)) // [ 'name' ] -> temporary key was cleaned up
