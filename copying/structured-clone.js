// copying objects: shallow copies share nested references, deep copies don't

const original = {
  name: 'meetup',
  date: new Date('2024-01-15T10:00:00Z'),
  tags: new Set(['js', 'node']),
  venue: { city: 'Cairo' }
}

// spread / Object.assign are shallow: nested objects are shared
const shallow = { ...original }
shallow.venue.city = 'Alexandria'
console.log(original.venue.city) // Alexandria -> the original changed too
original.venue.city = 'Cairo'

// JSON round-trip is deep but lossy
const viaJson = JSON.parse(JSON.stringify(original))
console.log(typeof viaJson.date, viaJson.tags) // string {} -> Date became a string, Set became {}

// structuredClone is deep and keeps Date, Map, Set, RegExp, typed arrays...
const deep = structuredClone(original)
deep.venue.city = 'Giza'
console.log(original.venue.city, deep.venue.city) // Cairo Giza
console.log(deep.date instanceof Date, deep.tags instanceof Set) // true true

// it also handles circular references (JSON.stringify throws on them)
const node = { id: 1 }
node.self = node
const copy = structuredClone(node)
console.log(copy.self === copy, copy === node) // true false

// what it can't clone
try {
  structuredClone({ fn: () => {} })
} catch (e) {
  console.log(e.name) // DataCloneError
}

// class instances lose their prototype: you get a plain object back
class Point {
  constructor(x, y) { this.x = x; this.y = y }
  length() { return Math.hypot(this.x, this.y) }
}
const p = structuredClone(new Point(3, 4))
console.log(p instanceof Point, p) // false { x: 3, y: 4 }
