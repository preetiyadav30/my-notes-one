const url = `ws://localhost:9876/client`;
const clientServer = new WebSocket(url);
// get element from index.html by id
const message = document.getElementById('messages');
const input = document.getElementById('message');
const button = document.getElementById('send');
button.disabled = true;
button.addEventListener('click',sendMessage,false)
// .onopen will open the server 
clientServer .onopen = function(){
    // clientServer .send("hello");
    // clientServer .send("hyy");
    // clientServer .send("hiiii");
    // clientServer .send("hmmm");
    // jese hi server open hoga nutton ko enable kr dega
     button.disabled= false;
}
clientServer.onmessage = function(event){
    const {data} = event;
    const newMessage = document.createElement(div)
    newMessage.innerText = `server data ${data}`;
    message.appendChild(newMessage)
}

function sendMessage(){ // this is the function for sendmessage button
    const text = input.value  // input me jo bhi text enter hoga vo text me aajyega  
    clientServer.send(text);  // jese hi send button pr click hoga to vo text server ko send ho jyega 
} 