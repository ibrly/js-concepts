// Labels and blocks: a label names a statement so break/continue can target it

// break with a label leaves BOTH loops; a plain break would only leave the inner one
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
let found = null
outer: for (const [r, row] of grid.entries()) {
  for (const [c, value] of row.entries()) {
    if (value === 5) {
      found = [r, c]
      break outer
    }
  }
}
console.log(found) // [ 1, 1 ]

// continue with a label skips to the next iteration of the outer loop
const small = []
nextRow: for (const row of grid) {
  for (const value of row) {
    if (value > 5) continue nextRow // drop any row with a value above 5
  }
  small.push(row)
}
console.log(small) // [ [ 1, 2, 3 ] ]

// a labelled block can be exited early with break (continue only works on loops)
validate: {
  const input = ''
  if (!input) {
    console.log('empty input, skipping the rest of the block')
    break validate
  }
  console.log('never printed')
}

// blocks create a scope for let/const (not for var)
{
  let scoped = 'inside'
  var leaked = 'var ignores blocks'
  console.log(scoped) // inside
}
console.log(typeof scoped, leaked) // undefined var ignores blocks

// pitfall: a label at the start of an arrow body, not an object literal
const notAnObject = () => { name: 'ali' }
const anObject = () => ({ name: 'ali' })
console.log(notAnObject(), anObject()) // undefined { name: 'ali' }
