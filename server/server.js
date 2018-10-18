const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express(); // Init Express
var server = http.createServer(app); // Creating the server
var io = socketIO(server);

// Add this folder to be loaded. 
// If go localhost:3000/help.html, the /public/help.html will be loaded without type /public/ at URL.
app.use(express.static(publicPath));

// Starting server
server.listen(port, () => {
	console.log(`Server is up at port ${port}`);
})

module.exports = {app};