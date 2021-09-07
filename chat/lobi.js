const socket = require("../socket")
const { prompt } = require('enquirer');
var Jetty = require("jetty");
const figlet = require('figlet');
const chalk = require('chalk');

var jetty = new Jetty(process.stdout);

var onlineList = [""]
var msgs = ["-","-","-","-","-","-","-","-","-","-"]

const showLobi = (name)=>{
    jetty.moveTo([0,0]);
    console.log(
          chalk.yellow(
                figlet.textSync("TMWG-Lobi", { horizontalLayout: 'full' })
          )
    );
    process.stdout.clearLine();
    console.log(chalk.red("Online List: ")+onlineList[0])
    jetty.moveTo([7,0]);
    console.log("--------------------------------------------")
    process.stdout.clearLine();
    msgs.forEach((item,index)=>{
          jetty.moveTo([(index + 8),0]);
          process.stdout.clearLine();
          console.log(item)
    })
    jetty.moveTo([18,0]);
    process.stdout.clearLine();
    console.log("--------------------------------------------")
}

const sendMsg = (name)=>{
    jetty.moveTo([19,0]);
    process.stdout.clearLine();
    const msg = {
        type: 'input',
        name: 'msg',
        message: name
      };
       
      prompt(msg)
        .then(i=>{
            if(i.msg === "/exit"){
                console.clear()
                process.exit()
            }
            socket.emit('sendMsg',i.msg)
            sendMsg(name)
        })
        .catch(console.error);
}

const lobi = (name)=>{
    console.clear()
    showLobi(name)
    sendMsg(name)
    socket.emit("online")
    socket.on('getMsg',(data)=>{
        var temp = ["-","-","-","-","-","-","-","-","-","-"]
        msgs.forEach((item,index)=>{
            if(index === 0){
                temp[9] = item
            }
            else{
                temp[index-1] = item
            }
        })
        temp[9] = data
        msgs = temp
        showLobi(name)
    })

    socket.on('online',(data)=>{
        onlineList[0] = data
        showLobi(name)
    })


}

module.exports = lobi