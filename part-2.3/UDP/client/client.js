const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const serverPort = 3000;
const TEXT = 'Server use UDP protocol';
// const BASE_URL = 'http://localhost:3000';
const serverAddress = 'localhost';

const sendText = (text) => {
    const startTime = Date.now();

    // Send text to server
    const message = Buffer.from(text);
    client.send(message, 0, message.length, serverPort, serverAddress, (err) => {
        if (err) {
            console.error('Error sending message:', err);
            client.close();
            return;
        }

        console.log(`Sent text: ${text}`);
    });

    // Get answer from server
    client.on('message', (response) => {
        const endTime = Date.now();
        const reqTime = endTime - startTime;
        const receivedText = response.toString();

        console.log(`Received text: ${receivedText}`);
        console.log(`Texts match: ${text === receivedText}`);
        console.log(`Time: ${reqTime} ms`);

        client.close();
    });
};

sendText(TEXT);