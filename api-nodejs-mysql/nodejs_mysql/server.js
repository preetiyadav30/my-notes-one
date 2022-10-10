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
app.get("/",(req,res)=>{
    res.json({
        success:1, 
        massage:"hello"
    });
});
app.all("*",(req,res)=>{
    const err = new Error(`Request url ${req.path} not found`);
    res.status(404).json({
        success:0,
        message: err.message,
        stack: err.stack
    });
});
app.listen(process.env.PORT,()=>{
    console.log(`server is running on the port 5000`);
});