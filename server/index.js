const express = require('express');
const http = require('http');
const SocketIO = require('socket.io')
// const WebSocket = require('ws')
// const path = require('path');

const app = express();

app.get('/', (res, req) => req.send('test'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000"
    // mathods: ["GET", "POST"]
  }
});

wsServer.on("connection", (socket) => {

  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      // done function을 실행시키면 back-end에서 이 코드를 실행시키지 않는다
      // 왜냐하면 보안문제가 생길 수 있기 때문에
      // 그래서 done 함수가 실행되면 front-end에서 실행 버튼을 눌러주는 거라고 보면 된다
      done('hello from backend');
    }, 3000)
  });
})

// const wss = new WebSocket.Server({server});
// const sockets = [];
// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = 'anonymous'
//   console.log('Connected to Browser ✅');
//   socket.on('close', () => console.log('Disconnected from Brower ❌'))
//   socket.on('message', (msg) => {
//     const message = JSON.parse(msg.toString('utf8'));
//     console.log(message);

    // nickname을 설정해줘야 하는데 재실행이 계속 되서 그러는지 nickname이 반영이 안됨
    // if(message.type === 'new_message') {
    //   console.log(socket.nickname);
    //   sockets.forEach(aSocket => aSocket.send(`${socket['nickname']}: ${message.payload}`));
    // }else if (message.type ==='nickname') {
    //   socket['nickname'] = message.payload;
    //   console.log(socket.nickname)
    // }
    // switch(message.type) {
    //   case 'new_message':
    //     sockets.forEach(aSocket => aSocket.send(`${socket['nickname']}: ${message.payload}`));
    //   case 'nickname':
    //     socket['nickname'] = message.payload;
    //   }
//   })
// })

const handleListen = () => console.log(`Listening on ws://localhost:5000`)
httpServer.listen(5000, handleListen);
