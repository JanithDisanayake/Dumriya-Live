const Schedule = require("../models/Schedule");

exports.getAll = async (req, res) => {
  const schedule = await Schedule.find();
  res.status(200).json(schedule);
};

exports.getById = async (req, res) => {};

exports.store = async (req, res) => {
  const schedule = new Schedule({
    ...req.body
  });
  await scheduleX.save();
  res.status(201).json(schedule);
};

exports.update = async (req, res) => {};
