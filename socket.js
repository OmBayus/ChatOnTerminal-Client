const io = require("socket.io-client");

const ENDPOINT = "https://chatombayus.herokuapp.com/"

const socket = io(ENDPOINT)

module.exports = socket