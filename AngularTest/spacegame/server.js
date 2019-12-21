const path = require("path");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname, '/dist')));

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo.listen(server);


// const Message = require('./src/networkmodels/message.js');


server.listen(port, () => {
  console.log("Server started on", port);
});

app.get('/*.(css|js|ico|html)', (req, res) => {
  let p = path.join(__dirname, '/dist/spacegame', req.url);
  if (fs.existsSync(p)) {
    res.sendFile(p);
  } else {
    res.sendFile(path.join(__dirname, '/dist/spacegame/index.html'));
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/spacegame/index.html'));
});


const messages = [];
const sockets = [];


io.sockets.on('connection', function (socket) {
  console.log(`user ${socket.handshake.address} connected`);
  sockets.push(socket);

  socket.on('message', function (data) {
    messages.push(`${socket.handshake.address}: ${data}`);
    updateAll(data)
  });
  socket.on('disconnect', function () {
    console.log(`user ${socket.handshake.address} disconnected`);
  });
});

function updateAll(newMsg){
  for (let socket of sockets) {
    socket.emit('message', messages[messages.length-1])
  }
}


