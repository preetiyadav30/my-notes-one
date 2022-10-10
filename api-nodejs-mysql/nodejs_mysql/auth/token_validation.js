const {verify} =require("jsonwebtoken");
module.exports ={
    verifyToken:(req,res,next)=>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7) // remove bearer = bearer_ have 6 charcter and space .slice remove bearer from token
            verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
                if(err){
                   res.json({
                      success:0,
                      message:"invalid token"
                   })
                }else{
                      next();
                }
            })
        }else{
            res.status(404).json({
                success:0,
                message:"access denied ! unauthorize user"
            })
        }
    }
}