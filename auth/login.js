const { Password,prompt } = require('enquirer');
const lobi = require("../chat/lobi");
const socket = require('../socket');
 
socket.on('login',(data)=>{
    if(data.success === 1){
        lobi(data.username)
    }
    else if(data.success === 2){
        console.log("Hesap Zaten Bagli")
        login()
    }
    else{
        console.log("Username or Password is incorrect")
        login()
    }
})

const login = async()=>{
 
    const question = {
      type: 'input',
      name: 'username',
      message: 'Username'
    };
     
    var user = await prompt(question)

    const getPass = new Password({
        name: 'password',
        message: 'Password'
    });
    
    getPass.run()
    .then(pass => {
        user = {...user,password:pass}
        socket.emit("login",user)

    })
    .catch(console.error);
}

module.exports = login