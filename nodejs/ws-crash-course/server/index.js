const WebSocket = require("ws");
// syntax -- new WebSocket.server(options[,callback])
// options -- host , port , backlog , server , verifyClient , handleprotocols , path , noserver 
// , clientTracking , perMessageDeflate , maxPayload 
// callback {function} -- callback function will be added as a listner for the listing event on the http server
// when not opreating in "noserver mode"
// 
const wss = new WebSocket.Server({
    port:9876

},function(){
    console.log("websocket ready")
});
// 1--- in this connection i have only display the msg of client on console.log and send a msg to the client 
// wss.on("connection",function(ws){
//     ws.send("hello client this message is from server ");
//     ws.on("message",function(data){
//         console.log(data);
//     })
// });
// 2--- in this now we are send data back to the client , same data that client send to the server 
// server send it back to the client 
wss.on("connection",function(ws){
    ws.on("message",function(data){   // this will recive the message from client
        // data = message that client send  
        ws.send(data);  // and this will send data back to the client 
    })
});