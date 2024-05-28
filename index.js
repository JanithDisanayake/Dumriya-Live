const express = require('express')
const serverless = require('serverless-http')
const app = express()
const port = 3003

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});



if(process.env.ENVIRONMENT === "lambda") {
	module.exports.handler = serverless(app);
} else {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	});
}
