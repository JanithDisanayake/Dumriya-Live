let stations = [
  { id: 1, name: "Station A", location: "City A" },
  { id: 2, name: "Station B", location: "City B" },
];

exports.getAll = async (req, res) => {
  res.status(200).json(stations);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  const { name, location } = req.body;

  users.push({
    id: routes.length + 1,
    name,
    location,
  });
  res.status(201).json(newRoute);
};

exports.update = async (req, res) => {};
