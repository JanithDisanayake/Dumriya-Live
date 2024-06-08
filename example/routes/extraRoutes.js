const express = require("express");
const router = express.Router();
const extraController = require("../controllers/extraController");

router.get("/extra", extraController.extra);

module.exports = router;
