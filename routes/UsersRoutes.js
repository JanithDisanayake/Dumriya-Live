const express = require("express");
const router = express.Router();
const userController = require("../controllers/UsersController");
const authenticateJWT = require("../middleware/authenticate");
const checkRole = require("../middleware/authorize");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", authenticateJWT, checkRole(["admin"]), userController.getAll);

module.exports = router;
