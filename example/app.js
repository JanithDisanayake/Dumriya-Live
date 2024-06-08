const express = require("express");
const serverless = require("serverless-http");
const app = express();

const indexRoutes = require("./routes/indexRoutes");
const extraRoutes = require("./routes/extraRoutes");

app.use(express.json());

app.use("/", indexRoutes);
app.use("/api", extraRoutes);

module.exports.handler = serverless(app);
