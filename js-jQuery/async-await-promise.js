// here we are learn about async await and promise 
// if we add async before any function then the function will return a promise
// async function ko jo bhi call krega usko badle me ek promise milega lekin promise to milega ga hi
// par uske phle jo async function ke andr h vo excute hoga firr promise return hoga
// per async function ke andr jaaha pr await aajata h to vo baki ka code excute krta h jb tk promise resolve nhi hota
// Promise {pendding} 
// await - key word wait krne ko bolta h ki abhi kaam pura nahi hua h app apna kaam pura kr lo jbtk firr baad me aana


// this normal function 

// console.log("this is normal function")
// function fun(){        //  this function will return string-preeti
//     console.log("indide fun function")
//     return "preeti"
// }
// console.log("before calling fun function");
// let p = fun();
// console.log("after calling fun function")
// console.log(p);  

// this async function 
console.log("this is async function")
async function fun1(){      //  this function will return a promise - promise {<resolved> :"preeti"}
    console.log("indide fun1 function")
    return  {
        "login": "mojombo",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/mojombo",
        "html_url": "https://github.com/mojombo",
        "followers_url": "https://api.github.com/users/mojombo/followers",
        "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
        "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
        "organizations_url": "https://api.github.com/users/mojombo/orgs",
        "repos_url": "https://api.github.com/users/mojombo/repos",
        "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
        "received_events_url": "https://api.github.com/users/mojombo/received_events",
        "type": "User",
        "site_admin": false
      }
}
console.log("before calling  async fun1 function");
let pr = fun1();
console.log("after calling async fun1 function")
console.log(pr);
// promise {<resolved> :"preeti"}
 {/* //   flow of this function how they are excute
// this is normal function
// before calling fun function
// indide fun function
// after calling fun function
// preeti
// this is async function
// before calling  async fun1 function
// indide fun1 function
// after calling async fun1 function
// Promise { 'preeti' } */}

//async and await 

async function shaily (){
    console.log("inside shaily function");
    const response = await fun1
    console.log("before response");       // await tells that wait for promise 
    // const users = await response.json()   // response.json() always return a promise
    console.log("users/promise resolved");
    return response
    
}
//   1 async vali promise "return users" pr resolved ho jyegi 
console.log("before calling shaily function");
let s = shaily()
console.log("after calling shaily function");
console.log(s)
s.then(response =>console.log(response));
//   2 jese hi async vali promise resolved hogi , then method ye bol rhi h ki jab bhi s vala promise resolve 
// hoga tab users ko console krva do  

