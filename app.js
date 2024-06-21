require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const app = express();
// Swagger
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger");
// Authentication
const bodyParser = require("body-parser");
// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const port = process.env.PORT;

const authenticateJWT = require("./middleware/authMiddleware");

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/admins", adminRoutes);
app.use("/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === "development") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} else {
  module.exports.handler = serverless(app);
}
