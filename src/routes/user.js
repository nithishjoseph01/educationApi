const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authmiddleware");

// All endpoints require login
router.use(authMiddleware);

router.get("/", userController.getAllUsers);              
router.get("/:id", userController.getUserById);           
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
