function b() {
    console.log(myVar);

}

function a() {
    let myVar = 2;
    b();
}

let myVar = 1;
a();

//the output is:
// 1
// because the outer environment of the function b is the global environment
// so the myVar in the function b is the myVar in the global environment

function c() {
    const myVariable = 5;
    function d() {
        console.log(myVariable);
    }
    d()
}
c();
//the output is: 5
// because the outer environment of the function d is the function c
