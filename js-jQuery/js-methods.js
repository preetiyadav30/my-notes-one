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