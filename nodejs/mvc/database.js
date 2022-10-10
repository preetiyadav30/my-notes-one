const sql = require("mysql");
require("dotenv").config();

const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATBASE
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database connected")
    }
});
module.exports = db