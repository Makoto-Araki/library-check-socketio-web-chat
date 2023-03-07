// Module
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Object
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// Route
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Connected
io.on('connection', function(socket) {
  console.log('User Connected.');

  // Receive 'post' message
  socket.on('post', function(msg) {
    io.emit('member-post', msg);
  });
});

// Listening
server.listen(3000, function() {
  console.log('Listening on 3000 port.')
});