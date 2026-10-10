// Map: key/value pairs where keys can be ANY value, kept in insertion order
// Set: a collection of unique values, kept in insertion order

// object keys are always strings (or symbols), Map keys keep their type
const obj = {}
obj[1] = 'number one'
obj['1'] = 'string one'
console.log(Object.keys(obj)) // [ '1' ] -> both writes hit the same key

const map = new Map()
map.set(1, 'number one').set('1', 'string one')
console.log(map.size, map.get(1), map.get('1')) // 2 number one string one

// objects as keys: the reference is the key
const user = { name: 'Ibrahim' }
const visits = new Map([[user, 3]])
console.log(visits.get(user), visits.get({ name: 'Ibrahim' })) // 3 undefined

// iteration is in insertion order and gives entries directly
for (const [key, value] of map) console.log(typeof key, value)
console.log([...map.keys()], Object.fromEntries(map)) // [ 1, '1' ] { '1': 'string one' } <- converting back loses the type

// counting with a Map
const words = 'the cat and the hat and the bat'.split(' ')
const counts = new Map()
for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1)
console.log([...counts].sort((a, b) => b[1] - a[1])[0]) // [ 'the', 3 ]

// Set removes duplicates, using SameValueZero (NaN equals NaN, objects by reference)
const unique = new Set([1, 1, '1', NaN, NaN, {}, {}])
console.log(unique.size) // 5 -> 1, '1', NaN, {}, {}
console.log([...new Set(words)]) // dedupe an array, order kept

// set operations
const a = new Set([1, 2, 3, 4])
const b = new Set([3, 4, 5])
const union = new Set([...a, ...b])
const intersection = new Set([...a].filter(x => b.has(x)))
const difference = new Set([...a].filter(x => !b.has(x)))
console.log([...union], [...intersection], [...difference]) // [1,2,3,4,5] [3,4] [1,2]

// has() is O(1) on average, Array.includes is O(n)
console.log(a.has(3), [1, 2, 3, 4].includes(3)) // true true
