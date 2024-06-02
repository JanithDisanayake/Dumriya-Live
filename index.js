const express = require("express");
const serverless = require("serverless-http");
const app = require("./app/app");
require("dotenv").config();

const PORT = process.env.PORT || 3003;

if (process.env.ENVIRONMENT === "lambda") {
  module.exports.handler = serverless(app);
} else {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
