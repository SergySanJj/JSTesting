const relativeURL = require('./urlmod').relativeURL;
const models = require('./models').models;
const Logger = require('./logger').Logger;

const User = require('./user').User;

const path = require("path");
const express = require('express');
const http = require('http');
const sha256 = require('sha256');
const socketIo = require('socket.io');
const fs = require('fs');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const firebase = require('firebase');
require('firebase/storage');
global.XMLHttpRequest = require("xhr2");

const logsPath = path.join(__dirname, '/logs');
const chatLogs = new Logger(logsPath, 'chat');
const authLogs = new Logger(logsPath, 'authentication');
const pipelineLogs = new Logger(logsPath, 'pipeline');
const adminLogs = new Logger(logsPath, 'admin');

const pathToApiKeys = '../keys/real/';

// DATABASE
pipelineLogs.log("Initializing database connection");
let serviceAccount = require(path.join(pathToApiKeys, 'DB_KEYS.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();
pipelineLogs.log("Database connected");

// STORAGE
pipelineLogs.log("Initializing file storage connection");
const firebaseConfig = require(path.join(pathToApiKeys, 'FIRESTORE_KEYS'));
firebase.initializeApp(firebaseConfig);
let storage = firebase.storage();
let storageRef = storage.ref();
let modelsRef = storageRef.child('models');
let imagesRef = storageRef.child('images');
pipelineLogs.log("File storage connected");


pipelineLogs.log("Initializing express app");
const app = express();
app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyParser.json());
pipelineLogs.log("Express app created");

pipelineLogs.log("Initializing http server");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo.listen(server);
pipelineLogs.log("Express app connected to http server");

const distFolder = path.join(__dirname, '..', '/dist/spacegame');


server.listen(port, () => {
  pipelineLogs.logp(`Server started on ${port}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/*.(css|js|ico|html)', (req, res) => {
  let p = path.join(distFolder, req.url);
  if (fs.existsSync(p)) {
    res.sendFile(p);
  } else {
    res.sendFile(path.join(distFolder, '/index.html'));
  }
});


const registeredUsers = [];

function findUserByUsername(username) {
  for (let user of registeredUsers) {
    if (user.username === username) {
      return user;
    }
  }
  return null;
}

function findUserByToken(token) {
  for (let user of registeredUsers) {
    if (user.token === token) {
      return user;
    }
  }
  return null;
}

app.post('/api/auth/*', (req, res) => {
  authLogs.log(`Auth request with: ${JSON.stringify(req.body)}`);
  let user = findUserByUsername(req.body.username);
  if (user) {
    if (user.password === req.body.password) {
      res.send({success: true, token: user.token});
      return;
    } else {
      res.send({success: false, message: "Incorrect login/password"});
      return;
    }
  } else {
    let token = sha256(req.body.username + req.body.password);
    registeredUsers.push({username: req.body.username, password: req.body.password, token: token});
    res.send({success: true, token: token});
  }
});

app.get('/api/models/*', (req, res) => {
  const reqUrl = relativeURL('/api/models/', req.url);
  const fileName = models[reqUrl];
  if (!fileName) {
    res.send('Unknown model name')
  }
  let fileRef = modelsRef.child(fileName);
  fileRef.getDownloadURL().then((url) => {
    fetch(url)
      .then(res => res.buffer())
      .then(buffer => res.send(buffer));
  });
});

app.get('/api/images/*', (req, res) => {
  const reqUrl = relativeURL('/api/images/', req.url);
  let fileRef = imagesRef.child(reqUrl);
  fileRef.getDownloadURL().then((url) => {
    fetch(url)
      .then(res => res.buffer())
      .then(buffer => res.send(buffer));
  });
});

app.get('/api/*/*', (req, res) => {
  res.send("No such api call");
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(distFolder, '/index.html'));
});


const messages = [];
const sockets = [];


io.sockets.on('connection', function (socket) {
  console.log(`user ${socket.handshake.address} connected`);
  sockets.push(socket);

  socket.on('message', function (data) {
    if (data !== '' && data !== null) {
      let user = findUserByToken(data.token);
      if (user) {
        let newMsg = `${user.username}: ${data.message}`;
        messages.push(newMsg);
        if (data.message.charAt(0) === '/') {
          if (user.username === 'admin') {
            adminLogs.logp(`Admin command request from ${socket.handshake.address} with ${data.message}`);

            let cmd = data.message.substring(1, data.message.length);
            try {
              updateSingle(newMsg, socket);
              let cmdRes = executeCommand(cmd);
              serverMessage(JSON.stringify(cmdRes), socket);
            } catch (e) {
              adminLogs.logp('Error during admin command execution');
              serverMessage(JSON.stringify("Error during command execution"), socket);
            }
          } else {
            serverMessage(JSON.stringify("You don't have admin rights"), socket);
          }
        } else {
          updateAll(newMsg)
        }
      }
    }
  });

  socket.on('disconnect', function () {
    console.log(`user ${socket.handshake.address} disconnected`);
    for (let i = 0; i < sockets.length; i++) {
      if (sockets[i] === socket) {
        sockets.splice(i, 1);
        break;
      }
    }

  });
});

function updateAll(newMsg) {
  for (let socket of sockets) {
    socket.emit('message', newMsg)
  }
}

function updateSingle(newMsg, socket) {
  socket.emit('message', newMsg)
}

function updateGroup(newMsg, socketArray) {
  for (let socket of socketArray) {
    socket.emit('message', newMsg)
  }
}

function serverMessage(newMsg, socket) {
  socket.emit('serverMessage', newMsg)
}

// Admin commands
const commands = {
  "getCurrentUsers": function getCurrentUsers() {
    let res = [];
    for (let s of sockets) {
      res.push(s.handshake.address);
    }
    return res;
  }
};

function executeCommand(commandName) {
  if (commands.hasOwnProperty(commandName)) {
    return commands[commandName]();
  } else {
    return `No such command ${commandName}`;
  }
}




