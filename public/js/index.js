var socket = io();

socket.on('connect', function () {
   console.log('Connected to the server');
});

socket.on('disconnect', function () {
   console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
   console.log('New message arrived:', message);
   var li = $('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
   console.log('newLocationMessage');
   var li = $('<li></li>');
   var a = $('<a target="_blank">My current location</a>');

   li.text(`${message.from}: `);
   a.attr('href', message.url);
   li.append(a);
   $('#messages').append(li);
});

$('#message-form').on('submit', function (e){
   e.preventDefault();

   socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val()
   }, function () {

   });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
   if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
   }

   console.log('Button clicked');
   navigator.geolocation.getCurrentPosition(function (position) {
      console.log('getCurrentPosition');
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function (e) {
      alert('Unable to fetch location.');
      console.log(e);
   }, {
      enableHighAccuracy: true
   });
});