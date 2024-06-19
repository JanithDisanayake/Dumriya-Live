const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];
const secretKey = process.env.SECRET_KEY;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns a list of users
 *     description: Optional extended description in Markdown.
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *       500:
 *         description: Internal server error
 */
exports.getAllUsers = async (req, res) => {
  try {
    res.status(200).json({ message: "Hi from GET users" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
      return res.status(400).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               age:
 *                 type: integer
 *                 description: The user's age
 *               email:
 *                 type: string
 *                 description: The user's email
 *             example:
 *               name: John Doe
 *               age: 30
 *               email: johndoe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).send('Username and password are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });

  res.status(201).send('User registered successfully');
};
