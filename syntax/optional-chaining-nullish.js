// optional chaining (?.) stops and returns undefined when the left side is null or undefined
// nullish coalescing (??) falls back only for null or undefined, unlike || which falls back for any falsy value

const user = { profile: { name: 'Ibrahim', settings: { volume: 0 } }, greet() { return 'hi' } }

console.log(user.profile?.name) // Ibrahim
console.log(user.address?.city) // undefined instead of a TypeError
console.log(user.greet?.()) // hi -> call only if it is a function
console.log(user.wave?.()) // undefined
console.log(user.profile?.['settings']?.volume) // 0 -> bracket access works too

// || vs ??
const volume = user.profile.settings.volume
console.log(volume || 50) // 50 -> 0 is falsy, wrong default
console.log(volume ?? 50) // 0  -> 0 is a real value, kept

console.log('' || 'fallback', '' ?? 'fallback') // fallback ''
console.log(null ?? 'fallback', undefined ?? 'fallback') // fallback fallback

// logical assignment operators
const config = { retries: 0, timeout: null }
config.retries ||= 3 // assigns because 0 is falsy
config.timeout ??= 1000 // assigns because null is nullish
config.debug &&= true // only assigns if already truthy, stays undefined
console.log(config) // { retries: 3, timeout: 1000 }

// ?? cannot be mixed with || or && without parentheses
// console.log(null || undefined ?? 'x') // SyntaxError
console.log((null || undefined) ?? 'x') // x
