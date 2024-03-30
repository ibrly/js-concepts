// operators precedence and associativity
// precedence is which operator will be executed first and which operator will be executed next higher precedence wins
// associativity is what order the operator will be executed in when the precedence is the same left to right or right to left

let a = 3 + 4 * 5; // * is higher precedence than + so it will be executed first then + will be executed
// the result is 23
let b = 4 * 3 ** 2 // ** is higher precedence than * so it will be executed first then * will be executed
// the result is 36
let c = 4 * 3 / 2 // * and / have the same precedence, so it will be executed from left to right
// the result is 6
let d = 4 * 3 % 2 // * and % have the same precedence, so it will be executed from left to right
// the result is 0
let e = 4 * 3 + 2 // * and + have not the same precedence, so * will be executed first then + will be executed
// the result is 14
let f = 4 + 3 % 2 // % is higher precedence than + so it will be executed first then + will be executed
// 1- grouping ()
console.log((3 + 4) * 5); //35
let a = 2, b = 3, c = 4;
console.log(a = b = c); //4 because the assignment operator associativity is right to left
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence