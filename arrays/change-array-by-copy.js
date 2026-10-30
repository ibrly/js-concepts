// Change array by copy (ES2023, Node 20+): non-mutating versions of sort, reverse, splice
// and index assignment, so you no longer need [...arr] before calling them
const scores = [30, 10, 20]

// sort / reverse mutate the original
const copy = [...scores]
copy.sort((a, b) => a - b)
console.log(copy, scores) // [ 10, 20, 30 ] [ 30, 10, 20 ]

// toSorted / toReversed return a new array and leave the original alone
console.log(scores.toSorted((a, b) => a - b), scores) // [ 10, 20, 30 ] [ 30, 10, 20 ]
console.log(scores.toReversed()) // [ 20, 10, 30 ]

// toSpliced(start, deleteCount, ...items) returns the new array, not the removed items
console.log(scores.toSpliced(1, 1, 99, 100)) // [ 30, 99, 100, 20 ]

// with(index, value) replaces one element; negative indexes count from the end
console.log(scores.with(-1, 0)) // [ 30, 10, 0 ]
try {
  scores.with(5, 0) // unlike arr[5] = 0 it never grows the array
} catch (e) {
  console.log(e.constructor.name) // RangeError
}

// at(): negative indexing for reads
console.log(scores.at(-1), scores[scores.length - 1]) // 20 20

// findLast / findLastIndex: search from the end
const events = [{ type: 'login', at: 1 }, { type: 'click', at: 2 }, { type: 'login', at: 3 }]
console.log(events.findLast(e => e.type === 'login').at) // 3
console.log(events.findLastIndex(e => e.type === 'logout')) // -1

// handy for state updates that must not mutate (React, Vuex, reducers)
const state = Object.freeze(['a', 'b', 'c'])
console.log(state.with(1, 'B'), state.toSorted().toReversed()) // [ 'a', 'B', 'c' ] [ 'c', 'b', 'a' ]
try {
  state.sort()
} catch (e) {
  console.log(e.constructor.name) // TypeError (frozen array can't be sorted in place)
}
