const express = require('express');
const router = express.Router();

const {
    dashboard,
} = require('./extra.controller');

const { protect, admin, authorize } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');

router.get('/dashboard', protect, admin, asyncHandler(dashboard));

module.exports = router;