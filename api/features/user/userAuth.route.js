const express = require('express');

const router = express.Router();

// Controllers (implement these in ../controllers/userAuth.controller.js)
const {
    register,
    login, 
} = require('./userAuth.controller');

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

 

module.exports = router;