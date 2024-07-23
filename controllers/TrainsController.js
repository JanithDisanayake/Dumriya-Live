const Train = require("../models/Train.js");
const TrainLive = require("../models/TrainLive.js");
const TrainLiveLog = require("../models/TrainLiveLog.js")

exports.getAll = async (req, res) => {
  const trains = await Train.find();
  res.status(200).json(trains);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  const train = new Train({ name: req.body.name, type: req.body.type });
  await train.save();
  res.status(201).json(train);
};

exports.update = async (req, res) => {};

exports.getLive = async (req, res) => {
  const trainLive = await TrainLive.find();
  res.status(200).json(trainLive);
};

exports.storeLive = async (req, res) => {
  const trainLive = new TrainLive({
    ...req.body
  });
  await trainLive.save();
  res.status(201).json(trainLive);
}

exports.getLiveLog = async (req, res) => {
  try {
    const log = await TrainLiveLog.find();
    res.status(200).json(log);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.storeLiveLog = async (req, res) => {
  const log = new TrainLiveLog({
    ...req.body,
  });
  await log.save();
  res.status(201).json(log);
};