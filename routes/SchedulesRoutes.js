const express = require("express");
const router = express.Router();
const schedulesController = require("../controllers/SchedulesController");

router.get("/", schedulesController.getAll);
router.get("/:id", schedulesController.getById);
router.post("/", schedulesController.store);
router.put("/:id", schedulesController.update);

module.exports = router;
