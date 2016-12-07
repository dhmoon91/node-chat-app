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
