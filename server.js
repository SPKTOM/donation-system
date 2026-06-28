const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket
wss.on('connection', ws => {
  ws.on('message', msg => {
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) c.send(msg.toString());
    });
  });
});

// Route สำหรับรับข้อมูลโดเนต
app.post('/donate', (req, res) => {
  res.status(200).send({ status: "ok" });
});

server.listen(PORT, () => console.log('Server running on port', PORT));
