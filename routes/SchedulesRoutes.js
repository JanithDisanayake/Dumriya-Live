const express = require("express");
const router = express.Router();
const schedulesController = require("../controllers/SchedulesController");
const authenticateJWT = require("../middleware/authenticate");

router.get("/", schedulesController.getAll);
router.get("/:id", schedulesController.getById);
router.post("/", authenticateJWT, schedulesController.store);
router.put("/:id",authenticateJWT, schedulesController.update);

module.exports = router;
