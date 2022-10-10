const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const route = require("./routes");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use("/",express.static("public/images"));
app.use(express.json());
app.use(cors());
app.use(route);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port 5002 `);
});