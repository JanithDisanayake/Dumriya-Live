require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("./db");
const path = require("path");
let cors = require('cors')
const app = express();
const port = process.env.PORT;
// Swagger
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger");
// Authentication
const bodyParser = require("body-parser");
// Routes
const userRoutes = require("./routes/UsersRoutes");
const trainRoutes = require("./routes/TrainsRoutes");
const stationRoutes = require("./routes/StationsRoutes");
const routeRoutes = require("./routes/RoutesRoutes");
const scheduleRoutes = require("./routes/SchedulesRoutes");
// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/users", userRoutes);
app.use("/trains", trainRoutes);
app.use("/stations", stationRoutes);
app.use("/routes", routeRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === "development") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} else {
  module.exports.handler = serverless(app);
}
