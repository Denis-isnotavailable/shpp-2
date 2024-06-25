const net = require('net');
const PORT = 3000;

const server = net.createServer((socket) => {
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;

    socket.on('data', (data) => {
        const timestamp = new Date().toISOString();

        console.log(`Time: ${timestamp}`);
        console.log(`Received text: ${data.toString()}`);
        console.log(`IP:${clientAddress}`);

        // Send back message
        socket.write(data.toString());
    });

    socket.on('end', () => {
        console.log(`Connection with client ${clientAddress} ended`);
    });

    socket.on('close', () => {
        console.log(`Connection with client ${clientAddress} closed`);
    });

    socket.on('error', (err) => {
        console.error(`Error with client ${clientAddress}: ${err.message}`);
    });
});

server.listen(PORT, () => {
    console.log(`TCP server listening on PORT ${PORT}`);
});