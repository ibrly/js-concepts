// every JS number is an IEEE 754 double: 52 bits of fraction, 11 of exponent, 1 sign
// most decimal fractions can't be stored exactly, so arithmetic picks up tiny errors

console.log(0.1 + 0.2) // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false

// compare with a tolerance instead of ===
const nearlyEqual = (a, b, eps = Number.EPSILON) => Math.abs(a - b) < eps
console.log(nearlyEqual(0.1 + 0.2, 0.3)) // true

// money: work in integer cents, format at the edge
const priceCents = 1999
const totalCents = priceCents * 3
console.log((totalCents / 100).toFixed(2)) // 59.97

// toFixed rounds the stored binary value, not the decimal you typed
console.log((1.005).toFixed(2)) // 1.00 -> 1.005 is really 1.00499999999999989...
console.log(Math.round(1.005 * 100) / 100) // 1 -> same problem
console.log(Math.round((1.005 + Number.EPSILON) * 100) / 100) // 1.01

// integers are exact only up to 2^53 - 1
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
console.log(2 ** 53 === 2 ** 53 + 1) // true -> the +1 is lost
console.log(Number.isSafeInteger(2 ** 53)) // false

// BigInt for exact large integers (no mixing with Number)
console.log(2n ** 53n + 1n) // 9007199254740993n
try {
  1n + 1
} catch (e) {
  console.log(e.constructor.name) // TypeError
}

// NaN is the only value not equal to itself
console.log(NaN === NaN, Number.isNaN(NaN), Object.is(NaN, NaN)) // false true true
console.log(isNaN('abc'), Number.isNaN('abc')) // true false -> global isNaN coerces first

// signed zero
console.log(0 === -0, Object.is(0, -0), 1 / -0) // true false -Infinity

// parsing
console.log(parseInt('08'), parseInt('0x1f'), parseInt('12px')) // 8 31 12
console.log(Number('12px'), Number(''), Number(' 42 ')) // NaN 0 42
console.log(['1', '2', '3'].map(parseInt)) // [ 1, NaN, NaN ] -> map passes the index as the radix
