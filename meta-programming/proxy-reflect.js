// Proxy wraps an object and intercepts operations (get, set, has, deleteProperty...)
// Reflect provides the default behaviour for each of those operations

// validation
const user = new Proxy({}, {
  set(target, key, value, receiver) {
    if (key === 'age' && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError('age must be a positive integer')
    }
    return Reflect.set(target, key, value, receiver)
  },
})
user.age = 30
console.log(user.age) // 30
try { user.age = -1 } catch (e) { console.log(e.message) }

// default values and negative array indexes
const arr = new Proxy([10, 20, 30], {
  get(target, key, receiver) {
    const index = Number(key)
    if (Number.isInteger(index) && index < 0) key = String(target.length + index)
    return Reflect.get(target, key, receiver)
  },
})
console.log(arr[-1], arr[0]) // 30 10

// hiding "private" keys that start with _
const hidden = new Proxy({ id: 1, _secret: 'x' }, {
  has: (t, k) => !k.startsWith('_') && Reflect.has(t, k),
  ownKeys: t => Reflect.ownKeys(t).filter(k => !k.startsWith('_')),
  get: (t, k, r) => (typeof k === 'string' && k.startsWith('_') ? undefined : Reflect.get(t, k, r)),
})
console.log('_secret' in hidden, Object.keys(hidden), hidden._secret) // false [ 'id' ] undefined

// observing changes (the idea behind Vue 3 reactivity)
const observe = (obj, onChange) => new Proxy(obj, {
  set(t, k, v, r) {
    const old = t[k]
    const ok = Reflect.set(t, k, v, r)
    onChange(k, old, v)
    return ok
  },
})
const state = observe({ count: 0 }, (k, o, n) => console.log(`${k}: ${o} -> ${n}`))
state.count++ // count: 0 -> 1
