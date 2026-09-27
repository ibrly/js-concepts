// async/await error handling patterns

const fetchUser = async id => {
  if (id <= 0) throw new Error(`invalid id ${id}`)
  return { id, name: 'user' + id }
}

// 1. try/catch/finally: the most readable option
async function withTryCatch() {
  try {
    await fetchUser(-1)
  } catch (err) {
    console.log('try/catch:', err.message)
  } finally {
    console.log('finally always runs')
  }
}

// 2. go-style tuple helper: [error, data]
const to = promise => promise.then(data => [null, data]).catch(err => [err, null])

async function withTuple() {
  const [err, user] = await to(fetchUser(1))
  console.log('tuple:', err, user)
  const [err2] = await to(fetchUser(0))
  console.log('tuple error:', err2.message)
}

// 3. .catch on the awaited promise for a fallback value
async function withFallback() {
  const user = await fetchUser(-5).catch(() => ({ id: 0, name: 'guest' }))
  console.log('fallback:', user.name)
}

// 4. forgetting await: the error escapes try/catch
async function forgotAwait() {
  try {
    return fetchUser(-1) // returned without await -> rejection is not caught here
  } catch {
    console.log('never printed')
  }
}

// 5. error.cause (ES2022) to wrap low-level errors with context
async function withCause() {
  try {
    await fetchUser(-2)
  } catch (err) {
    throw new Error('loading profile failed', { cause: err })
  }
}

;(async () => {
  await withTryCatch()
  await withTuple()
  await withFallback()
  await forgotAwait().catch(err => console.log('escaped:', err.message))
  await withCause().catch(err => console.log(err.message, '<-', err.cause.message))
})()
