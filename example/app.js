const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	console.log("/ endpoint is reached");
	res.send('Hello World!');
});

app.get('/hello', (req, res) => {
	console.log("/ endpoint is reached");
	res.send('Hello from Lambda!');
});

module.exports.handler = serverless(app);
