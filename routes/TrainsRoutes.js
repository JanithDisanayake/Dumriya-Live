const express = require("express");
const router = express.Router();
const trainController = require("../controllers/TrainsController");

router.get("/", trainController.getAll);
router.get("/:id", trainController.getById);
router.post("/", trainController.register);
router.put("/:id", trainController.update);

router.get("/live", trainController.getLive);
router.post("/live", trainController.getLive);

router.get("/live_log", trainController.getLiveLog)
router.post("/live_log", trainController.storeLiveLog)

module.exports = router;
