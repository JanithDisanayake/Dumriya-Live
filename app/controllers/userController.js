exports.getAllUsers = async (req, res) => {
  try {
    res.status(200).json({ message: "Hi from GET users" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  };

  try {
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
