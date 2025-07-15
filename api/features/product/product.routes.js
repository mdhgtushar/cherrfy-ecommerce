const express = require('express');
const router = express.Router();

// Import product controller functions
const {
  getAliExpressProduct,
  createAliExpressProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllCountriesData,
  updateAllCountriesData,
  refreshAllCountriesData
} = require('./product.controller');

const { protect, admin, optionalAuth } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');
const productModel = require('./product.model'); // Added this import for the test endpoint

// Public routes
router.get('/', optionalAuth, asyncHandler(getAllProducts));
router.get('/:id', optionalAuth, asyncHandler(getProductById));

// AliExpress integration routes
router.get('/aliexpress/:id', asyncHandler(getAliExpressProduct));
router.post('/aliexpress/:id', asyncHandler(createAliExpressProduct));

// Test endpoint to check if product exists
router.get('/test/:id', asyncHandler(async (req, res) => {
  const productId = req.params.id;
  console.log('Testing product existence for ID:', productId);
  
  // Try to find by productId first, then by _id
  let product = await productModel.findOne({ productId: productId });
  
  if (!product) {
    console.log('Product not found by productId, trying _id...');
    product = await productModel.findById(productId);
  }
  
  if (!product) {
    console.log('Product not found by either method');
    return res.status(404).json({ 
      message: 'Product not found.',
      searchedId: productId
    });
  }
  
  console.log('Product found:', {
    productId: product.productId,
    _id: product._id,
    hasAliData: !!product.ali_data
  });
  
  return res.status(200).json({
    message: 'Product found',
    data: {
      productId: product.productId,
      _id: product._id,
      hasAliData: !!product.ali_data,
      aliDataKeys: product.ali_data ? Object.keys(product.ali_data) : []
    }
  });
}));

// Admin routes
router.post('/', protect, admin, asyncHandler(createAliExpressProduct));
router.put('/:id', protect, admin, asyncHandler(updateProduct));
router.delete('/:id', protect, admin, asyncHandler(deleteProduct));

// New edit routes for all countries data
router.get('/edit/:id/all-countries', protect, admin, asyncHandler(getAllCountriesData));
router.put('/edit/:id/all-countries', protect, admin, asyncHandler(updateAllCountriesData));
router.post('/edit/:id/refresh', protect, admin, asyncHandler(refreshAllCountriesData));

module.exports = router; 