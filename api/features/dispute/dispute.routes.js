const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware.js');
const { admin } = require('../../middleware/auth.middleware.js');
const asyncHandler = require('express-async-handler');

const {
  createDispute,
  getUserDisputes,
  getDisputeById,
  addMessage,
  updateDisputeStatus,
  escalateDispute,
  getDisputeStats,
  getAllDisputes
} = require('./dispute.controller.js');

// User routes
router.post('/', protect, asyncHandler(createDispute));
router.get('/user', protect, asyncHandler(getUserDisputes));
router.get('/stats', protect, asyncHandler(getDisputeStats));
router.get('/:id', protect, asyncHandler(getDisputeById));
router.post('/:id/messages', protect, asyncHandler(addMessage));
router.post('/:id/escalate', protect, asyncHandler(escalateDispute));

// Admin routes
router.get('/admin/all', protect, admin, asyncHandler(getAllDisputes));
router.put('/:id/status', protect, admin, asyncHandler(updateDisputeStatus));

module.exports = router; 