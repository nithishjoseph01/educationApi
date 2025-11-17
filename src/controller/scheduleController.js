const Schedule = require("../models/schedule");

exports.createSchedule = async (req, res) => {
  try {
    if (req.user.role !== "staff") {
      return res.status(403).json({ message: "Only staff can create schedules" });
    }

    const data = { ...req.body, createdBy: req.user._id };

    const schedule = await Schedule.create(data);

    res.status(201).json({
      message: "Schedule created successfully",
      schedule,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const {
      s,
      yearNo,
      semesterNo,
      batch,
      from,
      to,
      page = 1,
      limit = 20
    } = req.query;

    let filter = {};

    if (yearNo) filter.yearNo = Number(yearNo);
    if (semesterNo) filter.semesterNo = Number(semesterNo);
    if (batch) filter.batch = batch;

    if (from || to) {
      filter.startAt = {};
      if (from) filter.startAt.$gte = new Date(from);
      if (to) filter.startAt.$lte = new Date(to);
    }

    if (s) {
      filter.$or = [
        { title: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } }
      ];
    }

    if (req.user.role === "student") {
      filter.attendees = req.user._id;
    }

    const skip = (page - 1) * limit;

    const schedules = await Schedule.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ startAt: 1 });

    const total = await Schedule.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      schedules
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) return res.status(404).json({ message: "Not found" });

    if (req.user.role === "student" && !schedule.attendees.includes(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ schedule });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "admin" && schedule.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Schedule updated",
      schedule: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "admin" && schedule.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await schedule.deleteOne();

    res.json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

