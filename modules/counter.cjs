// CommonJS: module.exports is a plain object handed to whoever calls require()
let count = 0
function increment() { count++ }
console.log('counter.cjs evaluated') // runs once, then the module is cached
module.exports = { count, increment, getCount: () => count }
