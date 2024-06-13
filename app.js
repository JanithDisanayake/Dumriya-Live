require('dotenv').config();
const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/users", userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


if(process.env.ENVIRONMENT === "development") {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	});
} else {
	module.exports.handler = serverless(app);
}
