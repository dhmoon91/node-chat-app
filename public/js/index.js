var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server');

  //Clientside script connects to server, creates newemail event
//   socket.emit('createEmail', {
//     to: 'jen@example.com',
//     text: 'Hey This is Andrew'
//   });

  socket.emit('createMessage', {
    from: 'Andrew',
    text:'Yup works for me'
  });
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
