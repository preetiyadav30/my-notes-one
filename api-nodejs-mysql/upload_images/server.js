// {
//     fieldname: 'profile',
//     originalname: 'hand-painted-background-violet-orange-colours_23-2148427578.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './upload/images',
//     filename: '819daa4f8df81ee26b923f1489e66893',   -- currently this filename is in the binary we can not open it directly
                                                       //if we to open we have to do read and write file 
//     path: 'upload\\images\\819daa4f8df81ee26b923f1489e66893',
//     size: 14920   --- image size in byte
//   }

// {
//     fieldname: 'profile',
//     originalname: '518097-background-hd.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './upload/images',
//     filename: 'profile_1665382213440_.jpg',  ---- now this is filename
//     filename : feildname_date.now(milisecond)_path extname  --- we can open this image 
//                 
//     path: 'upload\\images\\profile_1665382213440_.jpg',
//     size: 207292
//   }


// in multer we have so many thing releted to the file ----
// 1.. we can add filter if we want that user upload only png file or ... we can use filter
// 2.. we have anthor one option in multer is limit we can add the limit - we can set the size of image  
const { profile } = require("console");
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
// now we are changin the filename of the image we are giving unique filename to each file that users upload
const storage = multer.diskStorage({
    destination:"./upload/images",
    filename: (req,file,cb)=>{
       cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);  
    }
});
const upload = multer({
    //dest:"./upload/images",  // by this we get binary image 
    storage:storage,          // by this we get unique filename
    //fileFilter              // this is the filter option we can use thisn
    limits:{fileSize:1000000} // this is the limit maximum size of file is 10 byte rather then it will send error to the user
});

app.use("/profile",express.static("upload/images")); // this will serve the static file from upload/images folder using profile feild to user
app.use(errHandler);
app.post("/upload",upload.single("profile"),(req,res)=>{
    console.log(req.file);
    res.json({
        success:1,
        profile_url:`http://localhost:6060/profile/${req.file.filename}`
    })

});
// now we have function in express for hendling error on global way errHandler(err,req,res,next) it will take 4 argguments

function errHandler(err,req,res,next){
if(err instanceof multer.MulterError){
    res.json({
        success:0,
        message:err.message
    });
}
}

app.listen(6060,()=>{
    console.log("server is running on port 6060");
});