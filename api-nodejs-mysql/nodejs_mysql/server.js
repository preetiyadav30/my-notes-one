const express = require("express");
const bodyParser = require("body-parser");
// step 4
const userRaouter = require("./users/user.raoute");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use("/",userRaouter);
// app.get("/",(req,res)=>{
//     res.json({
//         success:1, 
//         massage:"hello"
//     });
// });
// this is 1 way 
// app.all("*",(req,res)=>{
//     const err = new Error(`Request url ${req.path} not found`);
//     res.status(404).json({
//         success:0,
//         message: err.message,
//         stack: err.stack
//     });
// });
// in this we call middleware
app.all("*",(req,res,next)=>{
    const err = new Error(`Request url ${req.path} not found`);
    err.statusCode = 404;
    next(err);

});
// this is the middleware to handle global error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success:0,
        message:err.message,
        stack:err.stack
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on the port 3333`);
});