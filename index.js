const express = require('express')
const serverless = require('serverless-http')
const app = express()
// const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// app.listen(port, () => {
//	console.log(`Example app listening on port ${port}`)
// });

module.exports.handler = serverless(app);
