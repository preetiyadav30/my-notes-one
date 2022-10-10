// express-middleware - http://expressjs.com/en/guide/using-middleware.html

// what is middleware in nodejs and expressjs framwork 
// all the requests are coming from clients to the server that all requests are handled by middleware
// Middleware has access to request and response object
// Middleware has access to next function of request-response life cycle
//we have http request methods  --syntax of a hattp methods- app.post(path,(req,res,next)) - (req,res,next) is the middlewar
//path: It is the path for which the middleware function is being called.
// It can be a string representing a path or path pattern or a regular expression pattern to match the paths.
//callback: It is the callback function that contains the request object, response object, and next() function 
//to call the next middleware function if the response of the current middleware is not terminated. 
//In the second parameter, we can also pass the function name of the middleware.
const express = require("express");
const app = express();
const port = 4000;
// Creating First Middleware  - 
// app.use middleware handle client's requests 
// app.use("/",(req,res,next)=>{
//     console.log("hello"); // there is no call for next function
// }) 
// // Creating second Middleware - called 3rd middleware by calling next() function in 2st middleware
// app.use("/with-next-function-calling",(req,res,next)=>{
//     console.log("hello"); // there is  call for next function
//     next();
// })
// // Creating third Middleware -  this middleware is called in 1st middleware 
// app.get("/",(req,res,next)=>{
//     console.log("GetRequest");
   
// })
// 2nd example
app.get("/", (req, res) => res.send("hi"));

app.use((req, res, next) => {
  console.log("check user");
  next();
});

app.get("/checkedAPI", (req, res) => res.send("checkUser called"));
app.listen(port,()=>{
    console.log("server is running on port 4000")
})