const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
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
 socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

 //socket.broadcast.emit from:Admin text: New user Joined.
 socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined') );

 socket.on('createMessage',(message) => {
    console.log('createMessage', message);
    //emits event to every connection

    io.emit('newMessage', generateMessage(message.from, message.text ) );

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
