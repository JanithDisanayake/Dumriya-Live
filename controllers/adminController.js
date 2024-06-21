const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admins = [{
    username: "admin",
    password: "asdf"
}];
const secretKey = process.env.SECRET_KEY;


exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  const admin = admins.find((a) => a.username === username);
  if (!admin) {
    return res.status(400).send("User not found");
  }

  const isPasswordValid = (password === admin.password)
  console.log(await bcrypt.compare(password, admin.password))
  if (!isPasswordValid) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ username: admin.username }, secretKey, {
    expiresIn: "1h",
  });

  res.json({ token });
};