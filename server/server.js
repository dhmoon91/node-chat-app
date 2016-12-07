const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use( express.static(publicPath));

//on: event listener
//io.on -> special event
io.on('connection', (socket) => {
  console.log('new User connected');
/*
 socket.emit('newEmail', {
   from: 'mike@example.com',
   text: 'Hey. what is going on ',
   createAt: 123
 });
*/

 // socket.on('createEmail', (newEmail) => {
 //   console.log('createEmail', newEmail);
 // });

 socket.on('createMessage',(message) => {
    console.log('createMessage', message);
    //emits event to every connection
    io.emit('newMessage', {
      from: message.from,
      text:message.text,
      createdAt: new Date().getTime()
    });
 });

  socket.on ( 'disconnect', () =>{
  console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
