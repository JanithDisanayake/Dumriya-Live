const Schedule = require("../models/Schedule");

exports.getAll = async (req, res) => {
  const schedule = await Schedule.find();

  if (!schedule) {
    return res.status(404).json({ error: "Schedules not found" });
  }
  res.status(200).json(schedule);
};

exports.getById = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  
  if (!schedule) {
    return res.status(404).json({ error: "Schedule not found" });
  }
  res.status(200).json(schedule);
};

exports.store = async (req, res) => {
  const schedule = new Schedule({
    ...req.body
  });
  
  if (!schedule) {
    return res.status(400).json({ error: "Error creating schedule"});
  }
  await schedule.save();
  res.status(201).json(schedule);
};

exports.update = async (req, res) => {};
