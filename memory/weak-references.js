// WeakMap / WeakSet hold keys weakly: if nothing else references the key object,
// it can be garbage collected and the entry disappears. keys must be objects.
// run with: node --expose-gc memory/weak-references.js

// 1. private data per instance without leaking memory
const privateData = new WeakMap()
class Person {
  constructor(name) { privateData.set(this, { name }) }
  get name() { return privateData.get(this).name }
}
console.log(new Person('Ibrahim').name) // Ibrahim

// 2. caching computed results per object
const cache = new WeakMap()
function expensive(obj) {
  if (!cache.has(obj)) cache.set(obj, Object.keys(obj).length * 1000)
  return cache.get(obj)
}
const config = { a: 1, b: 2 }
console.log(expensive(config), cache.has(config)) // 2000 true

// 3. WeakSet to mark objects as visited without keeping them alive
const visited = new WeakSet()
const node = {}
visited.add(node)
console.log(visited.has(node)) // true

// 4. WeakRef + FinalizationRegistry (use sparingly: GC timing is not guaranteed)
const registry = new FinalizationRegistry(label => console.log(`${label} was collected`))
let big = { data: new Array(1e6).fill('x') }
const ref = new WeakRef(big)
registry.register(big, 'big object')
console.log('deref before:', ref.deref() !== undefined) // true

big = null // drop the only strong reference
if (global.gc) {
  setTimeout(() => {
    global.gc()
    console.log('deref after gc:', ref.deref()) // undefined once collected
  }, 0)
} else {
  console.log('run with --expose-gc to see collection')
}

// a Map would keep `big` alive forever, a WeakMap would not
