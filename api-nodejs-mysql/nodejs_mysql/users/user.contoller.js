// step 2nd the contoller.js file will responsible for all call oprations
const {create,getuser,getUserById,updateUser,deleteUser,loginByEmail} = require("./user.service");
const {genSaltSync,hashSync,compareSync}= require("bcrypt");
const {sign} = require("jsonwebtoken");
const AppError = require("../utils/appError");
module.exports ={
    createUser:async(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        try {
            const result = await create(body);
            res.status(200).json({
                success:1,
                message:"user added succesfuly"
            });
        } catch (error) {
            res.status(500).json({
                success:0,
                message:"database connection error"
            });
        }
    },
    // with callback 
    // createUser:(req,res)=>{
    //     const body = req.body;
    //     const salt = genSaltSync(10);
    //     body.password = hashSync(body.password , salt);
    //     create(body,(error,results)=>{
    //         if(error){
    //             console.log(error);
    //             return res.status(500).json({
    //                 success:0,
    //                 massage:"database connection error"
    //             })
    //         }
    //             return res.status(200).json({
    //                 success:1,
    //                 data:results,
    //                 message:"user added !"
    //         })
    //     })
    // },
    // with async await and try catch 
    getUserDataById:async(req,res)=>{
        const id = req.params.id;
        try {
           const result = await getUserById(id);
           console.log(result);
           if(result){
            return res.status(200).json({
                success:1,
                data:result
                }) 
           }else{
            return res.status(404).json({
                success:0,
                message:"user not found"
            });
           }
        } catch (error) {
            return res.status(500).json({
                success:0,
                message:error
            })
        }
    },
    // with callback function
    
    // getUserDataById:(req,res)=>{
    //     const id = req.params.id;
    //     getUserById(id,(error,results)=>{
    //         try {
    //             if(error){
    //                 console.log(error);
    //                 return res.status(500).json({
    //                     success:0,
    //                     message:"database connection error",
    //                 });
    //             }
    //             if(!results){
    //                 return res.status(404).json({
    //                     success:0,
    //                     message:"user not found"
    //                 });
    //             }
    //             return res.status(200).json({
    //                     success:1,
    //                     message:"all records of user",
    //                     data:results
    //                 });
    //         } catch (error) {
    //             res.send(error);
    //         } 
    //     })
    // },
    // using async await , promise in 
    getUserData:async(req,res,next)=>{
        try {
            const result = await getuser(); 
            return res.status(200).send(result);
                // success:1,
                // data:result

        } catch (error) {
            // return res.status(500).json({
            //     success:0,
            //     massage:"database connection error"
            // });
            next(error)
        }
    },
    // in callback from 
    // getUserData:(req,res)=>{
    //     getuser((error,results)=>{
    //         try {
    //             if(error){
    //                 return res.status(500).json({
    //                     success:0,
    //                     massage:"database connection error"
    //                 });
    //             }else{
    //                 return res.status(200).json({
    //                     success:1,
    //                     data:results
    //                 });
    //             }
    //         } catch (error) {
                
    //         }
    //     })
    // },
    
    // with async await 
    updateUserData:async(req,res,next)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        try {
            const result = await updateUser(body);
            if(!result){
                res.status(404).json({
                    success:0,
                    message:"user not found"
                });
            }else{
                res.status(200).json({
                    success:1,
                    data:result,
                    message:"update user succsefully"
                });
            }
        } catch (error) {
            // res.status(500).json({
            //     success:0,
            //     message:"database connection error"
            // }); 
            next(error)  
        }
    },
    // with callback
    // updateUserData:async(req,res)=>{
    //     const body = req.body;
    //     const salt = genSaltSync(10);
    //     body.password = hashSync(body.password,salt);
    //     updateUser(body,(error,results)=>{
    //         if(error){
    //            console.log(error)
    //         }
    //         if(!results){
    //             console.log("user not found");
    //         }
    //         return res.status(200).json({
    //             success:1,
    //             message:"update succesfully"
    //         });
    //        })
    // },
    
    // with async await 

    deleteUserData:async(req,res)=>{
        const body = req.body; 
        console.log(body);
        try {
            const result = await  deleteUser(body)
            console.log(result);
            if(!result){
               res.status(404).json({
                success:0,
                message:"user with this id is not find in db"
               }); 
            }else{
                res.status(200).json({
                    success:1,
                    message:"user delete successfully"
                });
            }
        } catch (error) {
            res.status(500).json({
                success:0,
                message:"database connection error"
            });
        }    
    },
        
                

    // with callback-
    // deleteUserData:(req,res)=>{
    //     const body = req.body;
    //     deleteUser(body,(error,results)=>{
    //         console.log(results);
    //         try {
    //             if(error){
    //                 return res.status(500).json({
    //                     success:0,
    //                     message:"database connection error"
    //                 });
    //             }
    //             if(!results){
    //                 return res.status(404).json({
    //                     success:0,
    //                     message:"user not found"
    //                 });
    //             }
    //             return res.status(200).json({
    //                 success:1,
    //                 message:"user deleted succesfully"
    //             });
    //         } catch ({error}) {
    //             res.send(error);      
    //         }
    //     })
    // },
    
    // with async await
    login:async(req,res)=>{
        const body = req.body;
        try {
            const results = await loginByEmail(body.email);
        
            if(!results){
                res.status(404).json({
                    success:0,
                    message:"user not found"
                });
            }
            const result = compareSync(body.password , results.password);  // true or false
            if(result){
                results.password= undefined;
                const token = sign({result:results},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
                return res.status(200).json({
                    success:1,
                    Token: token,
                    Data:results,
                    message:"login successfully"
                });
            }else{
                return res.status(401).json({
                    success:0,
                    message:"invalid email or password"
                });
            }
        } catch (error) {
            res.status(500).json({
                success:0,
                message:error.message
            });
        }
    }
    // with callback
    // login:(req,res)=>{
    //     const body = req.body;
    //     loginByEmail(body.email,(error,results)=>{
    //         if(error){
    //             res.status(500).json({
    //                 success:0,
    //                 message:"database connection error"
    //             });
    //         }
    //         if(!results){
    //             res.status(404).json({
    //                 success:0,
    //                 message:"user not found"
    //             });
    //         }
    //         const result = compareSync(body.password , results.password);  // true or false
    //         if(result){
    //             results.password= undefined;
    //             const token = sign({result:results},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
    //             return res.status(200).json({
    //                 success:1,
    //                 Token: token,
    //                 Data:results,
    //                 message:"login successfully"
    //             });
    //         }else{
    //             return res.status(401).json({
    //                 success:0,
    //                 message:"invalid email or password"
    //             });
    //         }
            
    //     })

    // }
    
}