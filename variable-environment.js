//where the variable lives in memory and how it is accessed are determined by where it is written in the code (lexical environment)
//lexical environment is where something sits physically in the code you write
//every execution context has its own lexical environment
//they are unique ,and they are not interfere with each other
function b() {
    let myVar;
    console.log(myVar);
}

function a() {
    let myVar = 2;
    console.log(myVar);
    b();
}

let myVar = 1;
console.log(myVar);
a();

//the output is:
// 1
// 2
// undefined