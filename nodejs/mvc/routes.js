const express = require("express");
const router = express.Router();
const verifyToken = require("./auth");
const multer = require("multer");
const db = require("./database");
const path = require("path");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
    destination:"./public/images",
    filename: (req,file,cd)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
});
router.post("/signup",(req,res)=>{

});
router.post("/signin",verifyToken,(req,res)=>{

})
module.exports=router;