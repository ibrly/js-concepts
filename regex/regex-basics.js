// regular expressions: patterns for matching text

// test / match / replace
const email = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
console.log(email.test('ibrahim@example.com'), email.test('no-at-sign.com')) // true false
console.log('2024-01-15'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)) // [ '2024', '01', '15' ]
console.log('a-b_c d'.replace(/[-_ ]/g, '')) // abcd -> without g only the first match is replaced

// named groups
const { year, month } = '2024-01-15'.match(/(?<year>\d{4})-(?<month>\d{2})/).groups
console.log(year, month) // 2024 01

// matchAll needs the g flag and returns every match with its groups
const prices = 'tea $2, cake $4.50, coffee $3'
console.log([...prices.matchAll(/\$(\d+(?:\.\d+)?)/g)].map(m => Number(m[1]))) // [ 2, 4.5, 3 ]

// greedy vs lazy quantifiers
const html = '<b>bold</b> and <i>italic</i>'
console.log(html.match(/<.+>/)[0]) // <b>bold</b> and <i>italic</i> -> .+ grabs as much as it can
console.log(html.match(/<.+?>/)[0]) // <b> -> .+? stops at the first >

// lookahead / lookbehind: match a position without consuming characters
console.log('1234567'.replace(/\B(?=(\d{3})+(?!\d))/g, ',')) // 1,234,567
console.log('price: $30, tax: $5'.match(/(?<=\$)\d+/g)) // [ '30', '5' ]

// pitfall: a regex with g or y keeps lastIndex between calls
const digit = /\d/g
console.log(digit.test('a1'), digit.test('a1'), digit.test('a1')) // true false true

// pitfall: escape user input before building a RegExp from it
const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
console.log(new RegExp(escape('1+1=2')).test('is 1+1=2?')) // true
console.log(new RegExp('1+1=2').test('is 1+1=2?')) // false -> + means "one or more 1s"

// replace with a function
console.log('hello world'.replace(/\b\w/g, c => c.toUpperCase())) // Hello World
