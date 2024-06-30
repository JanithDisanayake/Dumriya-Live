let routes = [
  { id: 1, start: "Station A", end: "Station B", distance: 100 },
  { id: 2, start: "Station B", end: "Station C", distance: 150 },
];

exports.getAll = async (req, res) => {
  res.status(200).json(routes);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  const { start, end, distance } = req.body;

  users.push({
    id: routes.length + 1,
    start,
    end,
    distance,
  });
  res.status(201).json(newRoute);
};

exports.update = async (req, res) => {};
