var socket = io();

socket.on('connect', function () {
   console.log('Connected to the server');
});

socket.on('disconnect', function () {
   console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
   console.log('New message arrived:', message);
});

socket.on('userJoin', function (message) {
   console.log('userJoin', message);
});

socket.on('userJoined', function (message) {
   console.log('userJoined', message);
});