const http = require('http');
const WebSocket = require('ws')
const  express = require('express');
const app = express();

app.get('/', (req, res) => res.send('test'));

const handleListen = () => console.log(`Listening on ws://localhost:3000`)

const server = http.createServer(app)
const wss = new WebSocket.Server({server})
server.listen(3000, handleListen);
