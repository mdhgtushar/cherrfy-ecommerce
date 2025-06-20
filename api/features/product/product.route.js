// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const  productController  = require('./product.controller');

router.get('/ali/:id', productController.getAliExpressProduct); // Get AliExpress product by ID
router.get('/ali/create/:id', productController.createAliExpressProduct); // Create AliExpress product by ID
router.get('/', productController.getAllProducts); // Get all products
router.get('/:id', productController.getProductById); // Get product by ID 
router.delete('/:id', productController.deleteProduct); // Delete a product by ID

module.exports = router;
