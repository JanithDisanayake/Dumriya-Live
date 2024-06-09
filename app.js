const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/users", userRoutes);

module.exports.handler = serverless(app);
