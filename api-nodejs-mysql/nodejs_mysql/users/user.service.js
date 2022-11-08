// step 1st -- the service.js file is responsible for all database oprations
const { resolve } = require("path/win32");
const db = require("../dbconn");

module.exports ={
    // with promise 
    create:(data)=>{
        return new Promise((reslove,reject)=>{
            db.query(`insert into register (firstName,lastName,gender,email,password,phone) values (?,?,?,?,?,?)`,
            [data.firstName,
             data.lastName,
             data.gender,
             data.email,
             data.password,
             data.phone
            ],
            (error,results,fields)=>{
                if(error){
                    return reject(error);
                }else{
                    return reslove(results)
                }
        });
      });
    },
    // with callback function
    // create:(data,callback)=>{
    //     db.query(`insert into register (firstName,lastName,gender,email,password,phone) values (?,?,?,?,?,?)`,
    //     [data.firstName,
    //      data.lastName,
    //      data.gender,
    //      data.email,
    //      data.password,
    //      data.phone
    //     ],
    //     (error,results,fields)=>{
    //         try {
    //             if(error){
    //                 return callback(error);
    //             }else{
    //                 return callback(null,results);
    //             }
    //         } catch (error) {
    //             res.send(error);
    //         }
    //     }
         
    //     )
    // },
    // this will return promise
    getuser:()=>{
        return new Promise((resolve,reject)=>{
            db.query(`select id,firstName,lastName,gender,email,password,phone from register`,
        [],
        (error,results,fields)=>{
                if(error){
                    return reject(error);
                }else{
                    return resolve(results);
                }
        });
        });
    },
    // in the callback form
    // getuser:callback=>{
    //     db.query(`select id,firstName,lastName,gender,email,password,phone from register`,
    //     [],
    //     (error,results,fields)=>{
    //         try {
    //             if(error){
    //                 return callback(error);
    //             }else{
    //                 return callback(null,results);
    //             }
    //         } catch (error) {
    //             res.send(error);
    //         }
    //     }
    //     )
    // },
       getUserById:(id)=>{
        return new Promise((reslove,reject)=>{
           db.query(`select id,firstName,lastName,gender,email,password,phone from register where id=?`,
           [id],
           (error,results,fields)=>{
            if(error){
                return reject(error);
            }else {
                return reslove(results);
            }
           });
        });
       },
       // with callback
    // getUserById:(id,callback)=>{
    //     db.query(`select id,firstName,lastName,gender,email,password,phone from register where id =?`,
    //     [id],
    //     (error,results,fields)=>{
    //         try {
    //             if(error){
    //                 return callback(error);
    //             }
    //             else{
    //                 return callback(null,results[0]);
    //             }
    //         } catch (error) {
    //             res.send(error);
    //         }
    //     }
    //     )
    // },
    updateUser:(data)=>{
        return new Promise((reslove,reject)=>{
        db.query(`update register set firstName=?,lastName=?,gender=?,email=?,password=?,phone=? where id=?`,
        [data.firstName,
         data.lastName,
         data.gender,
         data.email,
         data.password,
         data.phone,
         data.id
        ],
        (error,results,fields)=>{
          if(error){
            return reject(error);
          }else{
            return reslove(results);
          }
        });
       });
    },
    // with callback function
    // updateUser:(data,callback)=>{
    //     db.query(`update register set firstName=?,lastName=?,gender=?,email=?,password=?,phone=? where id=?`,
    //     [data.firstName,
    //      data.lastName,
    //      data.gender,
    //      data.email,
    //      data.password,
    //      data.phone,
    //      data.id
    //     ],
    //     (error,results,fields)=>{
    //             if(error){
    //                 return callback(error);
    //             }else{
    //                 return callback(null,results);
    //             }
    //         }
    //     )
    // },
    
    // with promise

    deleteUser:(data)=>{
        return new Promise((reslove,reject)=>{
            db.query(`delete from register where id=?`,
            [data.id],
            // console.log
            (error,results,fields)=>{
               if(error){
                return reject(error);
               }else if(results){
                return reslove(results)
               }
            });
        });
    },
    // with callback function
    // deleteUser:(data,callback)=>{
    //     db.query(`delete from register where id=?`,
    //     [data.id],
       
    //     (error,results,fields)=>{
    //         try {
    //             if(error){
    //                 return callback(error)
    //             }else{
    //                 return callback(null,results);
    //             }
    //         } catch (error) {
    //             res.send(error);
    //         }
    //     }
    //     )
    // },
    loginByEmail:(email)=>{
        return new Promise((resolve,reject)=>{
            db.query(`select*from register where email=?`,
            [email],
            (error,results,fields)=>{
                if(error){
                    return reject(error);
                }else{
                    return resolve(results[0]);
                }
            }
            )
        })  
    }
    //  with callback
    // loginByEmail:(email,callback)=>{
    //     db.query(`select*from register where email=?`,
    //     [email],
    //     (error,results,fields)=>{
    //         if(error){
    //             return callback(error);
    //         }else{
    //             return callback( null,results[0]);
    //         }
    //     }
    //     )
    // }
}
