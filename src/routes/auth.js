const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/register", authMiddleware, authController.register);
router.post("/login", authController.login);

module.exports = router;
