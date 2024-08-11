const Schedule = require("../models/Schedule.js");
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

exports.getLiveById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const trainLive = await TrainLive.findOne({ "train._id": id }); // Find the TrainLive document by ID)
    if (!trainLive) {
      return res.status(404).json({ message: 'TrainLive not found' }); // Handle case where document is not found
    }

    res.status(200).json(trainLive); // Send the found document as a response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' }); // Handle any other errors
  }
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
    console.log("\n Live log stored:", log);
    updateLive(req.body);

    res.status(201).json(log);
  } catch (error) {
    console.error("Error storing live log:", error);
    res.status(500).json({ message: "Server error1" });
  }
};

const updateLive = async (trainLiveLog) => {
  try {
    const trainDocument = await TrainLive.findOne({
        "train.engines._id": trainLiveLog.device._id
    });

    if (trainDocument) {
        // Update the current location of the trainLive document
        console.log('\n Train found:', trainDocument);
        await TrainLive.updateOne(
            { "_id": trainDocument._id },
            { $set: { "current_location": trainLiveLog.current_location } }
        );
        console.log('\n Current location updated successfully.');
    }
    else {
      // No matching engine found, create a new TrainLive document
      const schedule = await Schedule.findOne({ "train.engines._id": trainLiveLog.device._id });
      const train = schedule.train
      if (train) {
        console.log("Train found:", train);
        const newTrainLive = new TrainLive({
          train: train, 
          current_location: trainLiveLog.current_location,
          previous_station: null,
          next_station: null, // Assuming next_station details are in trainLiveLog
        });
        await newTrainLive.save();
        console.log("\n New train live data created:");
      } else {
        console.log("\n No train found with the specified device ID.");
      }
    }
  } catch (error) {
    console.error("\n Error updating live log:", error);
  }
};
