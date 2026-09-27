// iterators follow a protocol: an object with next() returning { value, done }
// generators (function*) create iterators and can pause at each yield

// custom iterable: anything with [Symbol.iterator]
const range = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let current = this.from
    const last = this.to
    return { next: () => (current <= last ? { value: current++, done: false } : { value: undefined, done: true }) }
  },
}
console.log([...range]) // [1, 2, 3, 4]

// the same thing with a generator
function* rangeGen(from, to) {
  for (let i = from; i <= to; i++) yield i
}
console.log([...rangeGen(1, 4)]) // [1, 2, 3, 4]

// infinite sequences are fine because values are produced lazily
function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}
function* take(n, iterable) {
  for (const x of iterable) {
    if (n-- <= 0) return
    yield x
  }
}
console.log([...take(8, fibonacci())]) // [0, 1, 1, 2, 3, 5, 8, 13]

// two-way communication: next(value) resumes the generator with a value
function* conversation() {
  const name = yield 'what is your name?'
  yield `hello ${name}`
}
const chat = conversation()
console.log(chat.next().value) // what is your name?
console.log(chat.next('Ibrahim').value) // hello Ibrahim

// async generators work with for await...of
async function* ticks() {
  for (let i = 1; i <= 3; i++) {
    await new Promise(r => setTimeout(r, 10))
    yield `tick ${i}`
  }
}
;(async () => {
  for await (const t of ticks()) console.log(t)
})()
