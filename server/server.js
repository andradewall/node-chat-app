const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express(); // Init Express
var server = http.createServer(app); // Creating the server
var io = socketIO(server);

// Add this folder to be loaded. 
// If go localhost:3000/help.html, the /public/help.html will be loaded without type /public/ at URL.
app.use(express.static(publicPath));

// On connect with socket
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Secret Sea'));
	
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	// Listening an event
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server.');
	});

	// On disconnect with socket
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// Starting server
server.listen(port, () => {
	console.log(`Server is up at port ${port}`);
})

module.exports = {app};