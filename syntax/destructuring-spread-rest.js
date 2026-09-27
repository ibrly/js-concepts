// destructuring pulls values out of arrays/objects, spread expands them, rest collects them

// array destructuring
const [first, , third = 'default', ...others] = ['a', 'b', undefined, 'd', 'e']
console.log(first, third, others) // a default [ 'd', 'e' ]

// swapping without a temp variable
let x = 1, y = 2
;[x, y] = [y, x]
console.log(x, y) // 2 1

// object destructuring with rename, default and nested values
const user = { id: 7, profile: { city: 'Cairo' }, roles: ['admin'] }
const { id: userId, name = 'anonymous', profile: { city }, ...restOfUser } = user
console.log(userId, name, city, restOfUser) // 7 anonymous Cairo { roles: [ 'admin' ] }

// destructuring in parameters
const greet = ({ name = 'guest', lang = 'en' } = {}) => `${lang}: hello ${name}`
console.log(greet({ name: 'Ibrahim' }), '|', greet()) // en: hello Ibrahim | en: hello guest

// rest parameters collect the remaining arguments into a real array
const sum = (...nums) => nums.reduce((a, b) => a + b, 0)
console.log(sum(1, 2, 3, 4)) // 10

// spread for arrays and function calls
const merged = [...[1, 2], ...new Set([2, 3])]
console.log(merged, Math.max(...merged)) // [ 1, 2, 2, 3 ] 3

// spread for objects: shallow copy and override (later keys win)
const defaults = { theme: 'light', lang: 'en' }
const settings = { ...defaults, theme: 'dark' }
console.log(settings) // { theme: 'dark', lang: 'en' }

// careful: spread copies are shallow
const copy = { ...user }
copy.profile.city = 'Alexandria'
console.log(user.profile.city) // Alexandria -> nested object is shared
console.log(structuredClone(user) !== user) // use structuredClone for deep copies
