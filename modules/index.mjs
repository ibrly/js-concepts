// Run: node modules/index.mjs
// .mjs / .cjs force the module system regardless of package.json "type"
import { createRequire } from 'node:module'
import { count, increment } from './counter.mjs'
import cjsDefault from './counter.cjs' // importing CJS gives module.exports as the default export
import loadEsm from './legacy.cjs'

// 1. ESM imports are live: the importer sees the exporter's updates
increment()
increment()
console.log('esm count:', count) // esm count: 2
// count = 5 // TypeError: Assignment to constant variable. -> imports are read-only views

// 2. CJS exports are copied values: `count` was copied when module.exports was built
cjsDefault.increment()
cjsDefault.increment()
console.log('cjs count:', cjsDefault.count, 'getCount():', cjsDefault.getCount()) // cjs count: 0 getCount(): 2

// 3. both systems cache: a second load returns the same instance and does not re-run the file
const require = createRequire(import.meta.url)
console.log('same cjs instance:', require('./counter.cjs') === cjsDefault) // same cjs instance: true
const again = await import('./counter.mjs') // top-level await is ESM only
console.log('same esm instance:', again.count === count, again.count) // same esm instance: true 2

// 4. CJS loading ESM through import() shares the same module instance
console.log('seen from cjs:', await loadEsm()) // seen from cjs: 2

// 5. no __dirname / __filename in ESM; use import.meta
console.log(typeof __dirname, import.meta.url.endsWith('/modules/index.mjs')) // undefined true
console.log(import.meta.dirname?.endsWith('modules')) // true on Node 20.11+
