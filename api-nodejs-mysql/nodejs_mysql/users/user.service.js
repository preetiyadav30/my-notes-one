// step 1st -- the service.js file is responsible for all database oprations
const db = require("../dbconn");

module.exports ={
    create:(data,callback)=>{
        db.query(`insert into register (firstName,lastName,gender,email,password,phone) values (?,?,?,?,?,?)`,
        [data.firstName,
         data.lastName,
         data.gender,
         data.email,
         data.password,
         data.phone
        ],
        (error,results,fields)=>{
            try {
                if(error){
                    return callback(error);
                }else{
                    return callback(null,results);
                }
            } catch (error) {
                res.send(error);
            }
        }
         
        )
    },
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
    getUserById:(id,callback)=>{
        db.query(`select id,firstName,lastName,gender,email,password,phone from register where id =?`,
        [id],
        (error,results,fields)=>{
            try {
                if(error){
                    return callback(error);
                }
                else{
                    return callback(null,results[0]);
                }
            } catch (error) {
                res.send(error);
            }
        }
        )
    },
    updateUser:(data,callback)=>{
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
                    return callback(error);
                }else{
                    return callback(null,results);
                }
            }
        )
    },
    deleteUser:(data,callback)=>{
        db.query(`delete from register where id=?`,
        [data.id],
       
        (error,results,fields)=>{
            try {
                if(error){
                    return callback(error)
                }else{
                    return callback(null,results);
                }
            } catch (error) {
                res.send(error);
            }
        }
        )
    },
    loginByEmail:(email,callback)=>{
        db.query(`select*from register where email=?`,
        [email],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }else{
                return callback( null,results[0]);
            }
        }
        )
    }
}
