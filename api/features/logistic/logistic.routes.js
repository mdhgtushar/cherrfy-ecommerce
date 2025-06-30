const express = require('express');
const router = express.Router();

// Import logistic controller functions
const { freightQuery } = require('./logistic.controller');

const { protect, admin } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');

// Public routes
router.post('/', asyncHandler(freightQuery));

// Health check route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Logistic API is running',
    endpoints: {
      'POST /': 'Query freight/shipping rates',
      'GET /': 'Health check'
    }
  });
});

module.exports = router; 