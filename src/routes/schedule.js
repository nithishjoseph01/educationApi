const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const scheduleController = require("../controller/scheduleController");

router.post("/", auth, scheduleController.createSchedule);
router.get("/", auth, scheduleController.getSchedules);
router.get("/:id", auth, scheduleController.getScheduleById);
router.patch("/:id", auth, scheduleController.updateSchedule);
router.delete("/:id", auth, scheduleController.deleteSchedule);

module.exports = router;
