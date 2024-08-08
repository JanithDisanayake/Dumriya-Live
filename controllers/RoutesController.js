const Route = require("../models/Route");

exports.getAll = async (req, res) => {
  const routes = await Route.find();
  res.status(200).json(routes);
};

exports.getById = async (req, res) => {
  const route = await Route.findById(req.params.id);
  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }
  res.status(200).json(route);
};

exports.register = async (req, res) => {
  const route = new Route({
    start: req.body.start,
    end: req.body.end,
    distance: req.body.distance,
  });
  await route.save();
  res.status(201).json(route);
};

exports.update = async (req, res) => {};
