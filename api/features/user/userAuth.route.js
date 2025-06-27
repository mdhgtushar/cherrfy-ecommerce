const express = require('express');

const router = express.Router();

// Controllers (implement these in ../controllers/userAuth.js.js)
const {
    register,
    login,
    profileInfo,
    updateUserProfile, 
} = require('./userAuth.controller.js');
const { protect } = require('../../middleware/authMiddleware');

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);
router.get('/profile', protect, profileInfo);
router.put('/profileUpdate', protect, updateUserProfile)
 

module.exports = router;