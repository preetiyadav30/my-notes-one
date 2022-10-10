const sql = require("mysql");
require("dotenv").config();
const db = sql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("database connected !");
    }
});
module.exports = db;