const express = require("express");
const router = express.Router();
const stationController = require("../controllers/StationsController");
const authenticateJWT = require("../middleware/authenticate");

router.get("/", stationController.getAll);
router.get("/:id", stationController.getById);
router.post("/", authenticateJWT, stationController.register);
router.put("/:id", authenticateJWT, stationController.update);

module.exports = router;
