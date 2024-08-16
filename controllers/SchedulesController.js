const Schedule = require("../models/Schedule");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const schedules = await Schedule.find();

    if (schedules.length === 0) {
      return res.status(200).json({ message: "No schedules found.", schedules: [] });
    }

    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while fetching schedules." });
  }
};


exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const schedule = await Schedule.findById(id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule by ID:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while fetching the schedule." });
  }
};

exports.store = async (req, res) => {
  try {
    const schedule = new Schedule({
      ...req.body
    });

    if (!schedule) {
      return res.status(400).json({ error: "Error creating schedule" });
    }
    await schedule.save();
    res.status(201).json(schedule);

  } catch (error) {
    console.error("Error creating schedule:", error); // Log the error for debugging

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed.",
        details: error.errors,
      });
    }


    res.status(500).json({
      message: "An error occurred while creating the schedule.",
    });
  }
};

exports.update = async (req, res) => {};
