import fetch from 'node-fetch';

const TEXT = 'Server use HTTP protocol';
const BASE_URL = 'http://localhost:3000';

const sendText = async (text) => {
    const startTime = Date.now();

    try {
        const res = await fetch(`${BASE_URL}/http-server`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await res.json();

        const endTime = Date.now();
        const reqTime = endTime - startTime;

        console.log(`Sent text: ${text}`);
        console.log(`Received text: ${data.text}`);
        console.log(`Texts equals: ${text === data.text}`);
        console.log(`Time: ${reqTime} ms`);
    } catch (error) {
        console.error('Error:', error);
    }
};

sendText(TEXT);
