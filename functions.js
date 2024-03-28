//function invocation and the execution stack

function func() {
    console.log("func");
}

//invoking the function
func();

//the execution stack
//creating the execution context for the global context
function a() {
    b();
    console.log("a");
}
//creating the execution context for the function a
function b() {
    console.log("b");
}

a();

//so every time a function is called a new execution context is created and pushed to the top of the execution stack
//also every new function in the execution stack will stop the execution of the previous function until the new function is executed and poped from the stack