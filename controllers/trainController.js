let trains = [
  { id: 1, name: "Express 1", type: "Express" },
  { id: 2, name: "Local Train A", type: "Local" },
];

exports.getAll = async (req, res) => {
  res.status(200).json(trains);
};

exports.getById = async (req, res) => {};

exports.register = async (req, res) => {
  users.push({
    id: trains.length + 1,
    name: req.body.name,
    type: req.body.type,
  });
  res.status(201).json(newRoute);
};

exports.update = async (req, res) => {};
