const express = require("express");
const router = express.Router();
const routeController = require("../controllers/RoutesController");
const authenticateJWT = require("../middleware/authenticate");

router.get("/", routeController.getAll);
router.get("/:id", routeController.getById);
router.post("/", authenticateJWT, routeController.register);
router.put("/:id", authenticateJWT, routeController.update);

module.exports = router;
