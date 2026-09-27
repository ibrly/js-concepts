// debounce: run only after calls stop for `wait` ms (search inputs, resize end)
// throttle: run at most once every `wait` ms (scroll, mousemove)

function debounce(fn, wait) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
}

function throttle(fn, wait) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn.apply(this, args)
    }
  }
}

const start = Date.now()
const stamp = label => `${label} @${Math.round((Date.now() - start) / 10) * 10}ms`

const search = debounce(q => console.log(stamp(`debounced search "${q}"`)), 100)
search('j'); search('ja'); search('jav'); search('java') // only "java" runs, ~100ms later

const onScroll = throttle(i => console.log(stamp(`throttled scroll #${i}`)), 50)
let i = 0
const interval = setInterval(() => {
  onScroll(++i) // fires every 10ms, handled at most every 50ms
  if (i === 20) clearInterval(interval)
}, 10)
