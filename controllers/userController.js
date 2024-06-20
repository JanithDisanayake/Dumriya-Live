const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];
const secretKey = process.env.SECRET_KEY;

exports.getAll = async (req, res) => {
  try {
    res.status(200).json({ message: "Hi from GET users" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "1h",
  });

  res.json({ token });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });

  res.status(201).send("User registered successfully");
};
