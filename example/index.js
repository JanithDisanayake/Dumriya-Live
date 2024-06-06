const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	console.log("xxx");
	res.send('Hello World!');
});

module.exports.handler = serverless(app);
