const Route = require("../models/Route");

exports.getAll = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    console.error("Error fetching routes:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while fetching routes" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const route = await Route.findById(id);

    if (!route) {
      return res.status(404).json({ message: "Route not found." });
    }

    res.status(200).json(route);
  } catch (error) {
    console.error("Error fetching route by ID:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while fetching the route." });
  }
};

exports.register = async (req, res) => {
  try {
    const { start, end, distance } = req.body;

    if (!start || !end || isNaN(distance)) {
      return res.status(400).json({
        message: "Invalid input. 'start', 'end' are required, and 'distance' must be a number.",
      });
    }

    const route = new Route({
      start,
      end,
      distance,
    });

    await route.save();
    res.status(201).json(route);

  } catch (error) {
    console.error("Error registering route:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed.",
        details: error.errors,
      });
    }

    res.status(500).json({
      message: "An error occurred while registering the route.",
    });
  }
};

exports.update = async (req, res) => {};
