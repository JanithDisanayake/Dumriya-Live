const Station = require("../models/Station");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const stations = await Station.find();

    if (stations.length === 0) {
      return res.status(200).json({ message: "No stations found.", stations: [] });
    }
    res.status(200).json(stations);

  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ message: "An error occurred while fetching stations." });
  }
};


exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const station = await Station.findById(id);

    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }
    res.status(200).json(station);
    
  } catch (error) {
    console.error("Error fetching station by ID:", error);
    res.status(500).json({ message: "An error occurred while fetching the station." });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        message: "Invalid input. 'name' and 'location' are required.",
      });
    }

    const station = new Station({
      ...req.body,
    });

    await station.save();
    res.status(201).json(station);

  } catch (error) {
    console.error("Error creating station:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed.",
        details: error.errors,
      });
    }
    res.status(500).json({
      message: "An error occurred while creating the station.",
    });
  }
};


exports.update = async (req, res) => {};
