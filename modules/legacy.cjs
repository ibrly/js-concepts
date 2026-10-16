// a CommonJS file can't use static `import`, but it can load ESM with dynamic import()
const path = require('path')
console.log('legacy.cjs __dirname ends with', path.basename(__dirname)) // modules

module.exports = async function loadEsm() {
  const esm = await import('./counter.mjs')
  return esm.count
}
