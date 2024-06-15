require('dotenv').config();
const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const app = express();

const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger'); 
const userRoutes = require("./routes/userRoutes");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const port = process.env.PORT

app.use(express.json());
app.use(bodyParser.json());


const users = [];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    res.status(201).send('User registered successfully');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
});

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

app.get('/protected', authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/users", userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


if(process.env.ENVIRONMENT && process.env.ENVIRONMENT === "development") {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	});
} else {
	module.exports.handler = serverless(app);
}
