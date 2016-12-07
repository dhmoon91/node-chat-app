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

 //socket.emit from: Admin, text: Welcome to the chat app
 socket.emit('newMessage',{
   from: 'Admin',
   text: 'Welcome to chat app',
   createdAt: new Date().getTime()
 });
 //socket.broadcast.emit from:Admin text: New user Joined.

 socket.broadcast.emit('newMessage',  {
    from: 'Admin',
    text:'New User Joined',
     createdAt: new Date().getTime()
 });

 socket.on('createMessage',(message) => {
    console.log('createMessage', message);
    //emits event to every connection

    io.emit('newMessage', {
      from: message.from,
      text:message.text,
      createdAt: new Date().getTime()
    });

    //send event to everyone else except this socket (myself)
    // socket.broadcast.emit('newMessage', {
    //   from:message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
 });

  socket.on ( 'disconnect', () =>{
  console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
