const express = require("express");
const userRoutes = require("./routes/userRoutes");
const path = require('path');

const app = express();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/users", userRoutes);

module.exports = app;
