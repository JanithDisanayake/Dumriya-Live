const Train = require("../models/trainModel");

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
