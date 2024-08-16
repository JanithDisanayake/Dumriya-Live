const express = require("express");
const router = express.Router();
const trainController = require("../controllers/TrainsController");

router.get("/live", trainController.getLive);
router.get("/live/:id", trainController.getLiveById);
router.post("/live", trainController.storeLive);

router.get("/live_log", trainController.getLiveLog);
router.post("/live_log", trainController.storeLiveLog);

router.get("/", trainController.getAll);
router.post("/", trainController.register);

module.exports = router;