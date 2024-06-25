const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/http-server', (req, res) => {
    const timestamp = new Date().toISOString();
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { text } = req.body;

    console.log(`Time: ${timestamp}`);
    console.log(`Received text: ${text}`);
    console.log(`IP: ${clientIp}`);

    res.json({ text });
});

app.listen(PORT, () => {
    console.log(`HTTP server listening on PORT ${PORT}`);
});
