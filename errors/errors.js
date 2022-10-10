//Error 1 : data and salt arguments required = this error means that can not find data, data req.body me nhi aa raha h
// 1. you need to check once that body-parser is imported or not in your app
// 2. you need to check you pass data in urlencoded in postman

//Error 2 : secretOrPrivateKey must have a value = require("dotenv").config();  this occure when you use .env
//file but did not import dotenv module - need to solve this module if you use .env file

// Error3 : [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
// this error occure when we send res greater then 1 , in a controller we can send only one l response at a time