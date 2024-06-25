const net = require('net');
const port = 3000;
const serverAddress = 'localhost';
const TEXT = 'Server use TCP protocol';

const sendText = (text) => {
    const client = new net.Socket();
    const startTime = Date.now();

    client.connect(port, serverAddress, () => {
        console.log(`Connected to server at ${serverAddress}:${port}`);
        client.write(text);
    });

    client.on('data', (data) => {
        const endTime = Date.now();
        const roundTripTime = endTime - startTime;
        const receivedText = data.toString();

        console.log(`Sent text: ${text}`);
        console.log(`Received text: ${receivedText}`);
        console.log(`Texts match: ${text === receivedText}`);
        console.log(`Time: ${roundTripTime} ms`);

        client.destroy(); // Close connection
    });

    client.on('end', () => {
        console.log('Connection ended by server');
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (err) => {
        console.error(`Connection error: ${err.message}`);
    });
};

sendText(TEXT);
