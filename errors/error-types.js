// built-in error types and how to create your own

const attempts = [
  () => null.prop, // TypeError: reading a property of null
  () => undefinedVariable, // ReferenceError: variable does not exist
  () => new Array(-1), // RangeError: invalid array length
  () => JSON.parse('{bad json}'), // SyntaxError: thrown at runtime by JSON.parse
  () => decodeURIComponent('%'), // URIError: malformed URI sequence
]
for (const attempt of attempts) {
  try { attempt() } catch (err) { console.log(err.constructor.name, '-', err.message) }
}

// custom errors: extend Error, set name, attach useful data
class ValidationError extends Error {
  constructor(field, message) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}
class NotFoundError extends Error {
  name = 'NotFoundError'
  status = 404
}

function handle(fn) {
  try {
    fn()
  } catch (err) {
    if (err instanceof ValidationError) return `400 ${err.field}: ${err.message}`
    if (err instanceof NotFoundError) return `${err.status} ${err.message}`
    throw err // unknown errors keep propagating
  }
}
console.log(handle(() => { throw new ValidationError('email', 'is required') })) // 400 email: is required
console.log(handle(() => { throw new NotFoundError('user 7 not found') })) // 404 user 7 not found

// cause: wrap a low-level error without losing it
try {
  try { JSON.parse('nope') } catch (err) { throw new Error('config could not be loaded', { cause: err }) }
} catch (err) {
  console.log(err.message, '<-', err.cause.name) // config could not be loaded <- SyntaxError
}

// AggregateError groups several failures, e.g. from Promise.any
Promise.any([Promise.reject(new Error('a')), Promise.reject(new Error('b'))])
  .catch(err => console.log(err.name, err.errors.map(e => e.message))) // AggregateError [ 'a', 'b' ]
