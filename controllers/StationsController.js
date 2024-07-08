const Station = require("../models/Station");

exports.getAll = async (req, res) => {
  const stations = await Station.find();
  res.status(200).json(stations);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  const station = new Station({
    name: req.body.name,
    location: req.body.location,
  });
  await station.save();
  res.status(201).json(station);
};

exports.update = async (req, res) => {};
