// the event loop: js runs one thing at a time on the call stack
// async work is handed off, and its callbacks wait in queues until the stack is empty
// microtasks (promises, queueMicrotask) always drain before the next macrotask (setTimeout, I/O)

console.log('1: sync start')

setTimeout(() => console.log('6: macrotask - setTimeout 0'), 0)

Promise.resolve()
  .then(() => console.log('4: microtask - promise then'))
  .then(() => console.log('5: microtask - chained then'))

queueMicrotask(() => console.log('4b: microtask - queueMicrotask'))

process.nextTick(() => console.log('3: nextTick - runs before promise microtasks in node'))

console.log('2: sync end')

// output order:
// 1: sync start
// 2: sync end
// 3: nextTick
// 4: promise then
// 4b: queueMicrotask
// 5: chained then
// 6: setTimeout 0
