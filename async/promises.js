// a promise represents a value that will be available later: pending -> fulfilled | rejected

const wait = (ms, value, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms))

async function main() {
  // sequential: total ~300ms
  const a = await wait(100, 'a')
  const b = await wait(200, 'b')
  console.log('sequential:', a, b)

  // parallel: total ~200ms
  console.log('all:', await Promise.all([wait(100, 'x'), wait(200, 'y')]))

  // allSettled never rejects, reports every outcome
  const settled = await Promise.allSettled([wait(50, 'ok'), wait(50, 'boom', true)])
  console.log('allSettled:', settled.map(r => r.status))

  // race: first to settle wins (fulfilled or rejected)
  console.log('race:', await Promise.race([wait(50, 'fast'), wait(100, 'slow')]))

  // any: first to fulfill wins, rejections ignored unless all reject
  console.log('any:', await Promise.any([wait(10, 'nope', true), wait(60, 'first success')]))

  // error handling with try/catch
  try {
    await wait(10, 'something failed', true)
  } catch (err) {
    console.log('caught:', err.message)
  }
}

main()
