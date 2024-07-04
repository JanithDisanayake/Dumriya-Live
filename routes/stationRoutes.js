const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");

router.get("/", stationController.getAll);
router.get("/:id", stationController.getById);
router.post("/", stationController.register);
router.put("/:id", stationController.update);

module.exports = router;
