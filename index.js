// Module
const crypto = require('crypto');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Object
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// Root
const root = __dirname + '/public';

// Route
app.get('/', function(req, res) {
  res.sendFile(root + '/index.html');
});

// Route
app.get('/:file', function(req, res) {
  res.sendFile(root + '/' + req.params.file);
});

// User connected
io.on('connection', function(socket) {
  console.log('User Connected.');

  // Token is Generated and send 'token' message
  (function() {
    io.to(socket.id).emit('token', { token: makeToken(socket.id) });
  })();
  
  // Receive 'post' message
  socket.on('post', function(msg) {
    io.emit('member-post', msg);
  });
});

// Listening
server.listen(3000, function() {
  console.log('Listening on 3000 port.')
});

// Function for generating token
const makeToken = function(id) {
  return crypto.createHash("sha1").update('abcd' + id).digest('hex');
}