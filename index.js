const socket = require('./socket')
const { Select } = require('enquirer');
const login = require("./auth/login")
const register = require("./auth/register")


const main = ()=>{
    
 
    const prompt = new Select({
    name: 'main',
    message: 'Select Option',
    choices: ['Login', 'Register']
    });
    
    prompt.run()
    .then(item => {
        switch (item) {
            case 'Login':
                login()
                break;
            case 'Register':
                register()
                break;

            case 'Exit':
                process.exit()
                break;
            default:
                break;
        }
    })
    .catch(console.error);
}

main()
