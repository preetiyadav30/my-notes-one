//forEach method - this method itrate each element of array , this is function for array 
//This function takes a function (which is to be executed) as a parameter. Return type: The function returns array element after iteration.
//in this function we have a function in the argument - this function excute and return the value
// syntax -- array_name.forEach(function) - The function returns array element after iteration.
// syntax ----
// Arrow function
forEach((element) => { /* … */ })
forEach((element, index) => { /* … */ })
forEach((element, index, array) => { /* … */ })

// Callback function
forEach(callbackFn)
forEach(callbackFn, thisArg)

// Inline callback function
forEach(function(element) { /* … */ })
forEach(function(element, index) { /* … */ })
forEach(function(element, index, array){ /* … */ })
forEach(function(element, index, array) { /* … */ }, thisArg)


let arr = [2,4,5,7,3,6,4,5,4,5,4,2,22,3444,];
arr.forEach(newfun=>{
    console.log(newfun);
})

let array = [2,3,3,4,5,5,6,6,7,6,5,4,4,5,55,3];
let m = array.length/2
console.log(m);

// ptomises in js 
//promises are the object in the js - promise means in node an action will be completed or rejected,
// if the action is compeleted then it kept otherwise promises are broken
//promise take call back function and that function take 2 more function inside - resolve,reject
// resolve function - call when promise resolve and reject function call when promise return
// promise has pendding state if the promise is in the working on the problem - promise has been pandding 
function fun(){
    return new Promise(function(resolve,reject){  // callback function - function()
        setTimeout(()=>{
            if(!error){
                console.log("your promise has been resolves");
                resolve(); // this function call becouse there is no error and promise reloved successfully
                // jese hi resolve() function call hoga to .then() method chalegi
            }else{
                console.log("your promise has been rejected");
                reject(); // this function call becouse there is an error and promise has been rejected
                // jese hi reject() function call hoga to .catch() method chalegi
            }
        },5000);
    });
};
fun().then(function(){   // agr promise resolve hoga to .then() method chalegi
    console.log("thanx for resolving");
}).catch(function(){     // or agr promise reject hoga to .catch() method chalegi 

    console.log("very bad bro")
});

// we 2 methods in promise - .then() and .catch() -- .then() jo resolve function h vo .then() ke andr jo bhi aayga 
// jo resolve() ke andr run hoga 
// or jo bhi .catch() method ke andr aayga vo reject() function ke andr run hoga 
// ! error = reslove() = .then() 
// error = reject() = .catch()

// function inside .then(function()) run as resolve()
// function inside .catch(function()) run as reject()



