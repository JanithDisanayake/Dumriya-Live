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

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
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
