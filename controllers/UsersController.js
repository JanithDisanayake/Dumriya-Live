const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretKey = process.env.SECRET_KEY;
const users = [
  {
    username: "admin",
    password: "$2a$04$mlIZVeXTclLzcQMs1IVsgeE3vmQXq.81FJpGZGiTa5qbYj8BD80L.",
    role: "admin",
  },
];

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    let result = [];
    users.forEach((u) => {
      if (u.role === "user") {
        u.password = "*".repeat(u.password.length);
        result.push(u);
      }
    });

    res.status(200).json({ message: "Hi from GET users", users: [...result] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid password");
  }

  if (!role) {
    return res.status(400).send("Role is missing");
  } else if (role !== user.role) {
    return res.status(400).send("Invalid role");
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    secretKey,
    {
      expiresIn: "1h",
    },
  );

  res.json({ token });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // users.push({ username, password: hashedPassword, role: "user" });
  const user = new User({ username, password: hashedPassword, role: "user" });
  await user.save();

  res.status(201).send("User registered successfully");
};
