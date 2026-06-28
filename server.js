const http=require('http');
const WebSocket=require('ws');
const PORT=process.env.PORT||10000;
const server=http.createServer((req,res)=>{res.writeHead(200);res.end('WebSocket Server Running');});
const wss=new WebSocket.Server({server});
wss.on('connection',ws=>{
 ws.on('message',msg=>{
  wss.clients.forEach(c=>{if(c.readyState===WebSocket.OPEN)c.send(msg.toString());});
 });
});
server.listen(PORT,()=>console.log('Running',PORT));
