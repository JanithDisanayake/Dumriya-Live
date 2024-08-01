const Train = require("../models/Train.js");
const TrainLive = require("../models/TrainLive.js");
const TrainLiveLog = require("../models/TrainLiveLog.js");

exports.getAll = async (req, res) => {
  const trains = await Train.find();
  res.status(200).json(trains);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  const train = new Train({
    ...req.body,
  });
  await train.save();
  res.status(201).json(train);
};

exports.update = async (req, res) => {};

exports.getLive = async (req, res) => {
  const trainLive = await TrainLive.find();
  res.status(200).json(trainLive);
};

exports.storeLive = async (req, res) => {
  try {
    // Extract engine ID from the request body
    const { train, ...liveData } = req.body;
    const engineId = req.body;

    // Find the train by engine ID
    const tr = await Train.exists({ ...train });

    // Validate if the train exists and the engine ID matches
    if (!tr) {
      return res
        .status(404)
        .json({ message: "Train with the given engine ID not found" });
    }

    // Create a new TrainLive instance with the live data
    const trainLive = new TrainLive({
      ...liveData,
      train: train._id, // Associate the live data with the train
    });

    // Save the live data
    await trainLive.save();

    // Respond with the created live data
    res.status(201).json(trainLive);
  } catch (error) {
    console.error("Error storing live data:", error);
    res.status(500).json({ message: "Server error" });
  }
  const trainLive = new TrainLive({
    ...req.body,
  });
  await trainLive.save();
  res.status(201).json(trainLive);
};

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
  try {
    const log = new TrainLiveLog({
      ...req.body,
    });

    await log.save();
    await updateLive(log);

    res.status(201).json(log);
  } catch (error) {
    console.error("Error storing live log:", error);
    res.status(500).json({ message: "Server error1" });
  }
};

const updateLive = (trainLiveLog) => {
  try {
    TrainLive.updateOne(
      { "engines.id": trainLiveLog.device.id }, // Query to find the document
      { $set: { current_location: trainLiveLog.current_location } }, // Fields to update
    );
  } catch (error) {
    console.error("Error storing live log:", error);
    res.status(500).json({ message: "Server error2" });
  }
};
