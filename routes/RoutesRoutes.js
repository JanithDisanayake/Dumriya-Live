const express = require("express");
const router = express.Router();
const routeController = require("../controllers/RoutesController");

router.get("/", routeController.getAll);
router.get("/:id", routeController.getById);
router.post("/", routeController.register);
router.put("/:id", routeController.update);

module.exports = router;
