# JavaScript Concepts

Short, runnable notes on how JavaScript works under the hood. Run any file with `node <file>`.

| Topic | File |
|-------|------|
| Types | [types/index.js](types/index.js) |
| Operators | [operators/index.js](operators/index.js) |
| Coercion | [operators/coercion.js](operators/coercion.js) |
| Precedence and associativity | [operators/precedence-associativity.js](operators/precedence-associativity.js) |
| Global object | [global.js](global.js) |
| Variable environment | [variable-environment.js](variable-environment.js) |
| Scope chain | [scope-chain.js](scope-chain.js) |
| Hoisting | [hoisting/hoisting.js](hoisting/hoisting.js) |
| Functions | [functions.js](functions.js) |
| IIFE and module pattern | [functions-iife.js](functions-iife.js) |
| Objects | [objects.js](objects.js) |
| Closures | [closures/closures.js](closures/closures.js) |
| `this` keyword | [this-keyword/this.js](this-keyword/this.js) |
| Prototypes | [prototypes/prototypes.js](prototypes/prototypes.js) |
| Classes | [classes/classes.js](classes/classes.js) |
| call / apply / bind polyfills | [functional/bind-polyfill.js](functional/bind-polyfill.js) |
| Currying | [functional/currying.js](functional/currying.js) |
| Debounce and throttle | [functional/debounce-throttle.js](functional/debounce-throttle.js) |
| Destructuring, spread, rest | [syntax/destructuring-spread-rest.js](syntax/destructuring-spread-rest.js) |
| Iterators and generators | [iterators/generators.js](iterators/generators.js) |
| Proxy and Reflect | [meta-programming/proxy-reflect.js](meta-programming/proxy-reflect.js) |
| Weak references and GC | [memory/weak-references.js](memory/weak-references.js) |
| Event loop | [async/event-loop.js](async/event-loop.js) |
| Promises | [async/promises.js](async/promises.js) |
| async/await errors | [async/async-await-errors.js](async/async-await-errors.js) |

## Notes

Syntax parser 

lexical environment: where something sits physically in the code you write

lexical means something to do with words or grammar.
A lexical environment exists in programming languages in which where you write something is important. 


execution context: a wrapper to help manage the code that is running

so the lexical environments is currently running is managed via execution context 

single threaded synchronous execution: one command at a time and in order
