const Route = require("../models/routeModel");

exports.getAll = async (req, res) => {
  const routes = await Route.find();
  res.status(200).json(routes);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  console.log("Hello");
  const route = new Route({
    start: req.body.start,
    end: req.body.end,
    distance: req.body.distance,
  });
  await route.save();
  res.status(201).json(route);
};

exports.update = async (req, res) => {};
