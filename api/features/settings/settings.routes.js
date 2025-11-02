const express = require('express');
const router = express.Router();

// Import settings controller functions
const {
  getAllSettings,
  getSettingByKey,
  updateSetting,
  getSystemSettings,
  addSetting
} = require('./settings.controller');

const { protect, admin } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');

// Public routes
router.get('/system', asyncHandler(getSystemSettings));

// Admin routes
router.get('/all', protect, admin, asyncHandler(getAllSettings));
router.get('/key/:key', protect, admin, asyncHandler(getSettingByKey));
router.put('/', protect, admin, asyncHandler(updateSetting));
router.post('/', protect, admin, asyncHandler(addSetting));



module.exports = router; 