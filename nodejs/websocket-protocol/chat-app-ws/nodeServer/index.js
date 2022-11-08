// we are using socket.io at the port 8000
// socket.io listen karega jitne bhi incoming events aayege
const io = require("socket.io")(8000);
// const users ={};
const users =("lksjdfkdw");
//io.on create new connection  - or io.on kya h ek socket.io ka ek instance hai jo ki bhot sare socket connection
// ko listen karega 
io.on("my-first-connection",Socket =>{  // jese hi socket me connection aaye to ek =>() function chala do
   // socket.io ager new-user-joined-the-chat event bhej raha h to kya kr raha h vo iss event me karege socket.on me
   // client se message recive krega server ki koon join hua h ---- socket.on
    Socket.on("new-user-joined-the-chat",name =>{ // socket.on me events banate h apn 1st event
        users[Socket.id]=name; // jab bhi new-user-joined-the-chat event socket me aayga to vo users = name
        // users ={} usme jis name se user joined hua h vo daal dega 
        
        // socket.broadcast - ye baki sab ko ye broadcast kr dega jo new user join hoga baki sbko message jyega
        // ki user joined (preeti joined) bus jiss user ne join kiya h usko chodkr baki sbko ko event emit kr dega 
        // socket.broadcast
        // isme client ko message send kiya mtlb emit kiya ki ye user join hua h 
        Socket.broadcast.emit("user-joined") 
    });
    // second event(send) in io.on connection ---- socket.on me send message event aayga to vo socket.broadcast sbko
    //message sbko message send krva dega or emit sbko message jo send hua h usko recive krva dega  
    //emit kr dega sbko message or naame 

    Socket.on("send",message=>{
        Socket.broadcast.emit("recived",{message:message,name:user[Socket.id]})
    })
})
// console.log(users);
// import { WebSocketServer } from "ws";
// const WebServer = require("socket.io")
// const server = new WebServer({port:3000});