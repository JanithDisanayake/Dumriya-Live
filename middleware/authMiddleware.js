require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        console.log('No Authorization header');
        return res.status(401).send('Access denied');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log('No token in header');
        return res.status(401).send('Access denied');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Token verification failed', err.message);
        res.status(400).send('Invalid token');
    }
};

module.exports = authenticateJWT