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
});

socket.emit('createMessage', {
  from:'Frank',
  text: 'hi'
}, function (data) {
  console.log('Got it', data);
});

jQuery('#message-form').on ('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
