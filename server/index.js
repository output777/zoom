const express = require('express');
const http = require('http');
const WebSocket = require('ws')
const path = require('path');
const { parse } = require('path');

const app = express();

app.get('/', (res, req) => req.send('test'));


const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'anonymous'
  console.log('Connected to Browser ✅');
  socket.on('close', () => console.log('Disconnected from Brower ❌'))
  socket.on('message', (msg) => {
    const message = JSON.parse(msg.toString('utf8'));
    console.log(message);

    // nickname을 설정해줘야 하는데 재실행이 계속 되서 그러는지 nickname이 반영이 안됨
    if(message.type === 'new_message') {
      console.log(socket.nickname);
      sockets.forEach(aSocket => aSocket.send(`${socket['nickname']}: ${message.payload}`));
    }else if (message.type ==='nickname') {
      socket['nickname'] = message.payload;
      console.log(socket.nickname)
    }
    // switch(message.type) {
    //   case 'new_message':
    //     sockets.forEach(aSocket => aSocket.send(`${socket['nickname']}: ${message.payload}`));
    //   case 'nickname':
    //     socket['nickname'] = message.payload;
    //   }
  })
})

const handleListen = () => console.log(`Listening on ws://localhost:5000`)
server.listen(5000, handleListen);
