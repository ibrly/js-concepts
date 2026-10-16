// ES module: exports are live bindings to the variables below
export let count = 0
export function increment() { count++ }
console.log('counter.mjs evaluated') // runs once, then the module is cached
