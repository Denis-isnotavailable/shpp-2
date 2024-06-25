const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const PORT = 3000;

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
    const timestamp = new Date().toISOString();

    console.log(`Time: ${timestamp}`);
    console.log(`Received text: ${message.toString()}`);
    console.log(`IP: ${remote.address}:${remote.port}`);

    // Send back message
    server.send(message, 0, message.length, remote.port, remote.address, (err) => {
        if (err) {
            console.error('Error:', err);
        }
    });
});

server.bind(PORT);
