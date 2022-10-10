const {req,res}= require("express"); // imprt express
require("dotenv").config(); // this is for jwt secret key
const jwt = require("jsonwebtoken"); // jwt 
const verifyToken = (req,res,next)=>{  // verifyToken middleware
const authorizayion = req.header.authorizayion;
try {
    if(authorizayion){
        const theToken = authorizayion.split('')[1];
        jwt.verify(theToken,process.env.JWT_SECRET_KEY,(err,payload)=>{
            if(err){
                res.status(401).send({
                    sucess:0,
                    err:err
                })
            }else{
                next();
            }
        })
    }else{
        res.status(401).send({
            sucess:0,
            msg:"please enter valid token",

        })
    }
    
} catch (error) {
    res.status(401).send({
        sucess:0,
        msg:"invalid token"
    })
}
}
module.exports= verifyToken;