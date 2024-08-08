const Station = require("../models/Station");

exports.getAll = async (req, res) => {
  const stations = await Station.find();

  if (!stations) {
    return res.status(404).json({ error: "Stations not found" });
  }
  res.status(200).json(stations);
};

exports.getById = async (req, res) => {
  const station = await Station.findById(req.params.id);

  if (!station) {
    return res.status(404).json({ error: "Station not found" });
  }
  res.status(200).json(station);
};

exports.register = async (req, res) => {
  const station = new Station({
    ...req.body,
  });

  if (!station) {
    return res.status(400).json({ error: "Error creating station" });
  }
  await station.save();
  res.status(201).json(station);
};

exports.update = async (req, res) => {};
