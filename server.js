const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); // ต้องติดตั้ง: npm install cors
const PORT = process.env.PORT || 10000;

const app = express();

// 1. เปิดใช้งาน CORS เพื่อให้หน้าเว็บ Netlify ส่งคำขอมาได้
app.use(cors({
  origin: '*', // หรือเปลี่ยนเป็น 'https://classy-choux-22e7aa.netlify.app' เพื่อความปลอดภัย
  methods: ['GET', 'POST']
}));

app.use(express.json());

// สร้าง HTTP Server จาก Express
const server = http.createServer(app);

// 2. WebSocket Server ทำงานบน Server เดียวกัน
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', msg => {
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) c.send(msg.toString());
    });
  });
});

// สร้าง Route สำหรับเช็คสถานะ
app.get('/', (req, res) => {
  res.send('WebSocket Server Running');
});

server.listen(PORT, () => console.log('Running on port', PORT));
