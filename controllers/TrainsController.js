const Schedule = require("../models/Schedule.js");
const mongoose = require("mongoose");
const Train = require("../models/Train.js");
const TrainLive = require("../models/TrainLive.js");
const TrainLiveLog = require("../models/TrainLiveLog.js");

exports.getAll = async (req, res) => {
  const trains = await Train.find();
  res.status(200).json(trains);
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const train = await Train.findById(id);

    if (!train) {
      return res.status(404).json({ message: "Train not found." });
    }
    res.status(200).json(train);
    
  } catch (error) {
    console.error("Error fetching train by ID:", error);
    res.status(500).json({ message: "An error occurred while fetching the train." });
  }
};


exports.register = async (req, res) => {
  try {
    const train = new Train({
      ...req.body,
    });
    
    await train.save();
    res.status(201).json(train);

  } catch (error) {
    res.status(500).json({ message: "An error occurred while registering the train", error: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Extract update data from request body

    const updatedTrain = await Train.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // Find and update the Train document

    if (!updatedTrain) {
      return res.status(404).json({ message: 'Train not found' }); // Handle case where document is not found
    }

    res.status(200).json(updatedTrain); // Send the updated document as a response
  } catch (error) {
    console.error("Error updating train:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while updating the train", error: error.message }); // Handle any other errors
  }
};

exports.getLive = async (req, res) => {
  try {
    const trainLive = await TrainLive.find();
    
    res.status(200).json(trainLive);
  } catch (error) {
    // Log the error and send a response with an appropriate status code and message
    res.status(500).json({ message: "An error occurred while retrieving live train data", error: error.message });
  }
};

exports.getLiveById = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: 'Train ID is required' });
    }
    
    const trainLive = await TrainLive.findOne({ "train._id": id });
    if (!trainLive) {
      return res.status(404).json({ message: 'TrainLive not found' });
    }
    res.status(200).json(trainLive);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the live train data', error: error.message });
  }
};

exports.storeLive = async (req, res) => {
  try {
    const { train, ...liveData } = req.body;
    const engineId = req.body;

    const tr = await Train.exists({ ...train });
    if (!tr) {
      return res
        .status(404)
        .json({ message: "Train with the given engine ID not found" });
    }

    const trainLive = new TrainLive({
      ...liveData,
      train: train._id,
    });
    
    await trainLive.save();
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
        await TrainLive.updateOne(
            { "_id": trainDocument._id },
            { $set: { "current_location": trainLiveLog.current_location } }
        );
        console.log(`\n location updated \n ${trainDocument.train.name} : http://maps.google.com/maps?q=${trainDocument.current_location.coordinates}`);
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
          next_station: null,
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
