const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const multer = require('multer'); // ต้องเพิ่มบรรทัดนี้
const PORT = process.env.PORT || 10000;

const app = express();
const upload = multer({ dest: 'uploads/' }); // ส่วนนี้ไว้รับไฟล์

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// อันนี้ส่วนรับสลิป (ต้องมีเพื่อไม่ให้ขึ้น 404)
app.post('/donate', upload.single('file'), (req, res) => {
  console.log("ได้รับข้อมูลโดเนตแล้ว");
  res.status(200).send({ message: "Success" });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

wss.on('connection', ws => {
  ws.on('message', msg => {
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) c.send(msg.toString());
    });
  });
});

server.listen(PORT, () => console.log('Running on port', PORT));
