const { Password,prompt } = require('enquirer');
const lobi = require("../chat/lobi");
const socket = require('../socket');
 
socket.on('register',(data)=>{
    if(data.success){
        console.log('Success')
        lobi(data.username)
    }
    else{
        console.log("Username already exist")
        register()
    }
})

const register = async()=>{
 
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
        socket.emit("register",user)

    })
    .catch(console.error);
}

module.exports = register