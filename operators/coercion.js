// coercion is the process of converting a value from one type to another
// it is done implicitly by the js engine when values are compared because js is dynamically typed

console.log('hello'+ 'world') //helloworld no coercion here
console.log('1' + 2) //12 coercion here
console.log(1 + '2') //12 coercion here
console.log(1 + 2) //3 no coercion here
console.log('1' == 1) //true coercion here
console.log('1' === 1) //false no coercion here
console.log(1 * '2') //2 coercion here
console.log(1 * 'hello') //NaN coercion here
console.log(1 + '1' + 2) //112 coercion here
