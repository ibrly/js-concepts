let a = "hello world";

function b() {
    console.log("Called b!");
}
b();
console.log(a);
//as you see the output is:
// Called b!
// hello world
//lets try to change the order of the code

c();
// you expect an error because c is not defined yet but the output is:
// Called c!
console.log(d);
// the output is: undefined
console.log(q)
// the output is: Uncaught ReferenceError: q is not defined

let d = "hello world";
function c() {
    console.log("Called c!");
}

// as you see js is detecting the declaration of the variables and functions before the code is executed
// this is called hoisting
// the js execution context is created in two phases: creation and execution
// in the creation phase js will hoist the variables and functions to the top of the code
// so the code will be like this:
// var a;
// var d;
// var c;
// function b() {
//     console.log("Called b!");
// }
// a = "hello world";
// d = "hello world";
// c = function() {
//     console.log("Called c!");
// }
// b();
// console.log(a);
// c();
// console.log(d);
// console.log(q)
// so the output will be:
// Called b!
// hello world
// Called c!
// undefined
// Uncaught ReferenceError: q is not defined
// this is why the code is working as expected

//so in abstract the hoisting is setting up memory space for variables and functions (the creation phase)
