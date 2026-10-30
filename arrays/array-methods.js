// Array methods: most take a callback (element, index, array) and never mutate the array
const orders = [
  { id: 1, customer: 'ali', total: 120, items: ['tea', 'cake'] },
  { id: 2, customer: 'mona', total: 45, items: ['coffee'] },
  { id: 3, customer: 'ali', total: 80, items: ['juice', 'cake'] },
]

// map: one output per input
console.log(orders.map(o => o.total)) // [ 120, 45, 80 ]

// filter: keep the elements whose callback is truthy
console.log(orders.filter(o => o.total > 50).map(o => o.id)) // [ 1, 3 ]

// find / findIndex: stop at the first match, undefined / -1 if none
console.log(orders.find(o => o.customer === 'mona').id) // 2
console.log(orders.findIndex(o => o.total > 1000)) // -1

// some / every: short-circuit booleans (every on [] is true, some on [] is false)
console.log(orders.some(o => o.total < 50), orders.every(o => o.total < 50)) // true false
console.log([].every(() => false), [].some(() => true)) // true false

// reduce: fold into any shape; always pass the initial value
const totalByCustomer = orders.reduce((acc, o) => {
  acc[o.customer] = (acc[o.customer] ?? 0) + o.total
  return acc
}, {})
console.log(totalByCustomer) // { ali: 200, mona: 45 }
try {
  [].reduce((a, b) => a + b) // no initial value on an empty array
} catch (e) {
  console.log(e.constructor.name) // TypeError
}

// flatMap: map then flatten one level
console.log(orders.flatMap(o => o.items)) // [ 'tea', 'cake', 'coffee', 'juice', 'cake' ]
console.log([[1, [2]], [3]].flat(), [[1, [2]], [3]].flat(Infinity)) // [ 1, [ 2 ], 3 ] [ 1, 2, 3 ]

// includes vs indexOf: includes uses SameValueZero, so it finds NaN
console.log([NaN].includes(NaN), [NaN].indexOf(NaN)) // true -1

// sort MUTATES and compares as strings by default
const nums = [10, 1, 5, 100]
nums.sort()
console.log(nums) // [ 1, 10, 100, 5 ]
nums.sort((a, b) => a - b)
console.log(nums) // [ 1, 5, 10, 100 ]

// map + parseInt pitfall: map passes the index as parseInt's radix
console.log(['1', '2', '3'].map(parseInt)) // [ 1, NaN, NaN ]
console.log(['1', '2', '3'].map(Number)) // [ 1, 2, 3 ]

// Array.from: build arrays from iterables or array-likes, with an optional map
console.log(Array.from({ length: 3 }, (_, i) => i * 2)) // [ 0, 2, 4 ]
console.log(Array.from(new Set('hello')).join('')) // helo

// holes: forEach/map skip them, for...of and Array.from don't
const sparse = [1, , 3]
let visited = 0
sparse.forEach(() => visited++)
console.log(visited, [...sparse]) // 2 [ 1, undefined, 3 ]
