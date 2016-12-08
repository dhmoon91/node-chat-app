var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server');

  //Clientside script connects to server, creates newemail event
//   socket.emit('createEmail', {
//     to: 'jen@example.com',
//     text: 'Hey This is Andrew'
//   });
});

socket.on( ('disconnect'), function ()  {
  console.log('Disconnected from server');
});

/*
socket.on('newEmail', function (email) {
  console.log('New Email', email);
});*/


socket.on('newMessage', function (message) {
  console.log('New message', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

/*
socket.emit('createMessage', {
  from:'Frank',
  text: 'hi'
}, function (data) {
  console.log('Got it', data);
});*/

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target= "_blank">My current location </a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on ('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

//Location click event listener
var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');
  //2 arguments, 1) success function
  navigator.geolocation.getCurrentPosition( function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
      locationButton.removeATtr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
