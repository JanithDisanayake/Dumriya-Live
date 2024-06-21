const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admins = [{
    username: "admin",
    password: "$2a$04$mlIZVeXTclLzcQMs1IVsgeE3vmQXq.81FJpGZGiTa5qbYj8BD80L."
}];
const secretKey = process.env.SECRET_KEY;


exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  const admin = admins.find((a) => a.username === username);
  if (!admin) {
    return res.status(400).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    console.log(await bcrypt.hash(password, 1))
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ username: admin.username }, secretKey, {
    expiresIn: "1h",
  });

  res.json({ token });
};