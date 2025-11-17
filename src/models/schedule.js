const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    yearNo: {
      type: Number,
      required: true,
    },
    semesterNo: {
      type: Number,
      required: true,
    },
    batch: {
      type: String,
      required: true,
      trim: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
