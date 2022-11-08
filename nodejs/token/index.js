//  link - https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/

const express = require("express");
const bodyParser= require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const config = require("./config");
const { resourceLimits } = require("worker_threads");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"practice"
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log("database connected");
});
//post method for inserting user data - register api
app.post("/register/with-token",(req,res)=>{
    let name = req.body.name
    let email = req.body.email 
   // let password = req.body.password 
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);
    db.query(`INSERT INTO token (name,email,password) VALUES (?,?,?)`,[name,email,hashedPassword],(err,result)=>{
        if(err){
            return res.status(500).send("there is a problem with this user");
        }else{
            let data = {
                // name:name,
                email:email,
                // password:password
            }
            const token = jwt.sign(data,config.secret ,{expiresIn:10000});
            res.json({token:token})
            
        }
        
    })

});
//get api in which we get the data of user

app.get("/get/token",(req,res,next)=>{
    // let secret_header_key = process.env.TOKEN_HEADER_KEY;
    var token = req.headers['x-access-token'];
    // console.log(token)
    if(!token){
        return res.status(400).send("token not provided")
    }else{
        // let secret_key = process.env.JWT_SECRET_KEY;
        
        jwt.verify(token,config.secret,(err,decode)=>{
            if(err){
                res.status(400).send("invalid authentication");
            }
            db.query(`SELECT*FROM token WHERE email=?`,[decode.email],(err,result)=>{
                if(err){
                    res.status(500).send("there was a problem");
                }else if(!result){
                    res.status(401).send("user not found with this email");
                }
                res.json({result})
                console.log(result)
            })
        })
    }
    next();
});
// lolgin api with token

app.post("/login-api-with-token",(req,res)=>{
    const email = req.body.email 
    const password = req.body.password
    db.query(`SELECT*FROM token WHERE email=?`,[email],(err,user)=>{
        // console.log(req.body.email);   done 
        if(err){
            res.status(500).send(err)
        }else if(!user){
            res.status(401).send("user with email is not found");
        }
        // const passwordEnteredbyuser = "tanay@1234"
        // const hashedPasswordString = "$2b$08$N6RcNRwHAYJcFg/g7tf84.1uilv6t4Ta9EgjiohNAbxSMDkwMbqCy"
        // let checkedPassword = bcrypt.compareSync(passwordEnteredbyuser,hashedPasswordString);
        console.log(user);
        let checkedPassword = bcrypt.compareSync(password,user[0].password,(err,h_password)=>{
             if(!checkedPassword){
            res.status(401).send("invalid password");
        }
        let token = jwt.sign({email:email},config.secret,{expiresIn:2000000});
        res.json({token:token});
        });
        console.log(checkedPassword);
       
       
    })
})

// login 2
app.post("/login2-api-with-token",async(req,res)=>{
    const email = req.body.email 
    // const password = req.body.password
    // console.log(password);
    db.query(`SELECT*FROM token WHERE email=?`,[email],async(error, results, fields)=>{
        // console.log(results);
        if(results.length){
            // console.log(results[0])
            let [hashedPassword] = results[0].password;
            console.log(hashedPassword);
            let checkedPassword = bcrypt.compare(req.body.password,hashedPassword);

            console.log(checkedPassword);
            if(!checkedPassword){
                console.log("invalid password");
            }else{
                
            let token = jwt.sign({email:email},config.secret,{expiresIn:2000000});
            res.json({token:token});
            console.log("password matched - login success")
            }
           
        } else{
            console.log("user not found")
        }  
    })
})

app.post("/matched-password",(req,res)=>{
   const email = req.body.email
   db.query(`SELECT*FROM token WHERE email=?`,[email],(err,result)=>{
    if(err){
        throw err
    }else{
        bcrypt.compare(req.body.password, result[0].password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
              console.log("Password doesn't match!")
            } else {
              console.log("Password matches!")
            }
          })
    }
   })
})

const adminLogin = async (req, res, next) => {
    try {
        const body = req.body;
        await db.query(`select*from admin where username=? and email=? and password=?`, [body.username, body.email, body.password], (err, result, feilds) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    err: err
                })
            }
            if (!result) {
                res.status(404).send({
                    success: false,
                    msg: "Admin not found with this email and password"
                });
            }
            else {
                const results = compareSync(body.password, result.password);
                if (results) {
                    result.password = undefined;
                    const token = req.headers.authorization;
                    if (!token) {
                        res.status(404).send({
                            success: false,
                            msg: "token not provided"
                        });
                    } else {
                        jwt.verify(token, process.env.JWT_SECRET_KEY, (jwterr, jwtresult) => {
                            if (jwterr) {
                                res.status(400).send({
                                    success: false,
                                    err: jwterr
                                });
                            } else {
                                res.status(200).send({
                                    success: true,
                                    result: jwtresult,
                                    msg: "login successully"
                                })
                            }
                        })
                    }
                } else {
                    res.status(401).send({
                        success: false,
                        msg: "invalid email or password"
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            err: error
        })
    }
}

app.listen(4040,()=>{
    console.log("server is running on 4040");
});


