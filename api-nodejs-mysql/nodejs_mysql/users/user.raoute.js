// step 3 and the raoute.js will responsible for all raoutes 
const router = require("express").Router();
const {createUser,getUserDataById,getUserData,updateUserData,deleteUserData,login} = require("./user.contoller");
const {verifyToken} = require("../auth/token_validation");
const {addUserValidation}=require("../validation/users/user.validation");
const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//     destination:"./public/images",
//     filename: (req,file,cb)=>{
//         cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.filename)}`);
//     }
// });

// const upload = multer({
//     storage:storage,
//     limits:{fileSize:1000000}
// })

router.post("/addUser",verifyToken,addUserValidation,createUser);
router.get("/getUserData",getUserData);
router.get("/getUserData/:id",verifyToken,getUserDataById);
router.patch("/updateUserData",verifyToken,updateUserData);
router.delete("/deleteUserData",verifyToken,deleteUserData);
router.post("/login",login);

module.exports=router;