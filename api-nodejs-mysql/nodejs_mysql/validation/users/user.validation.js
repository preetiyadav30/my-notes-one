const {user} = require("./user.schema");
module.exports={
    addUserValidation : async (req,res,next)=>{
        try {
            const value = await user.validate(req.body);
            if(value.error){
               res.json({
               success:0,
               message:value.error.details[0].message
               });
            }else{
               next();
            }
        } catch (error) {
            res.send(error);
        }
       
    }
}