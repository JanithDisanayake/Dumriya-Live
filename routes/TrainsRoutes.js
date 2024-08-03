const express = require("express");
const router = express.Router();
const trainController = require("../controllers/TrainsController");

router.get("/live_log", trainController.getLiveLog);
router.post("/live_log", trainController.storeLiveLog);

router.get("/live", trainController.getLive);
router.get("/live/:id", trainController.getLiveById);
router.post("/live", trainController.storeLive);

router.get("/", trainController.getAll);
router.get("/:id", trainController.getById);
router.post("/", trainController.register);
router.put("/:id", trainController.update);

module.exports = router;
