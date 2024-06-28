const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRole")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", authenticateJWT, checkRole(['admin']),userController.getAll);

module.exports = router;
