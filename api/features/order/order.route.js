const express = require('express');
const orderController = require('./order.controller');
const { protect } = require('../../middleware/authMiddleware.js');

const router = express.Router();

// Create a new order
router.post('/', protect, orderController.createOrder);

// Get all orders
router.get('/', protect, orderController.getOrders);

// Get a single order by ID
router.get('/:id', protect, orderController.getOrderById);

// Update an order by ID
router.put('/:id', protect, orderController.updateOrder);

// Delete an order by ID
router.delete('/:id', protect, orderController.deleteOrder);

module.exports = router;