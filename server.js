// ปรับปรุงส่วน app.post('/donate')
app.post('/donate', (req, res) => {
    const { name, amount, message } = req.body;
    
    // สร้าง object ข้อมูล
    const donationData = { 
        type: 'donation', 
        name, 
        amount, 
        message, 
        time: Date.now() 
    };

    // กระจายข้อมูลให้ทุกคนที่เชื่อมต่อ WebSocket อยู่
    wss.clients.forEach(c => {
        if (c.readyState === WebSocket.OPEN) {
            c.send(JSON.stringify(donationData));
        }
    });

    res.status(200).send({ status: "success" });
});
