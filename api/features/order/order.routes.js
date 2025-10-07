const express = require('express');
const router = express.Router();

// Import order controller functions
const {
  getAllOrders,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('./order.controller');

const { protect, admin, authorize } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');


// Admin routes
router.get('/admin', protect, admin, asyncHandler(getAllOrders));
router.put('/:id', protect, admin, asyncHandler(updateOrder));
router.delete('/:id', protect, admin, asyncHandler(deleteOrder));

// User routes
router.get('/', protect, asyncHandler(getOrders));
router.get('/:id', protect, asyncHandler(getOrderById));
router.post('/', protect, asyncHandler(createOrder));

module.exports = router; 