const express = require('express');
const router = express.Router();

// Import product controller functions
const {
  getAliExpressProduct,
  createAliExpressProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require('./product.controller');

const { protect, admin, optionalAuth } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');

// Public routes
router.get('/', optionalAuth, asyncHandler(getAllProducts));
router.get('/:id', optionalAuth, asyncHandler(getProductById));

// AliExpress integration routes
router.get('/aliexpress/:id', asyncHandler(getAliExpressProduct));
router.post('/aliexpress/:id', asyncHandler(createAliExpressProduct));

// Admin routes
router.post('/', protect, admin, asyncHandler(createAliExpressProduct));
router.put('/:id', protect, admin, asyncHandler(updateProduct));
router.delete('/:id', protect, admin, asyncHandler(deleteProduct));

module.exports = router; 