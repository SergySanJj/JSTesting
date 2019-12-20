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

  updateAll()

  socket.on('message', function (data) {
    console.log('got message', data);
    messages.push(data.message)
    updateAll()
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
    updateAll()
  });
});

function updateAll(){
  console.log('updating')
  for (let socket of sockets) {
    socket.emit('messages', { messages: messages })
  }
}