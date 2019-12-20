const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const app = express()
const port = process.env.PORT || 3000

const interval = require('rxjs').interval

const server = http.createServer(app)

let io = socketio.listen(server)
server.listen(port)


const messages = []
const sockets = []

io.sockets.on('connection', function (socket) {
  sockets.push(socket)

  socket.emit('messages', { messages: messages });

  socket.on('message', function (data) {
    console.log('got message', data);
    messages.push(data.message)
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // sockets = sockets.filter(function (value, index, arr) {
    //   return value !== socket
    // });
  });
});

const meassageUpdater = interval(1000)

const subscribe = meassageUpdater.subscribe(val => {
  console.log('updating')
  for (let socket of sockets) {
    socket.emit('messages', { messages: messages })
  }
})