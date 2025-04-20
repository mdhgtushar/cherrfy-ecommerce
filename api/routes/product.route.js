// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const  productController  = require('../controllers/product.controller');

router.post('/:id', productController.getAliExpressProduct);
router.get('/', productController.getAllProducts); // Get all products
router.get('/:id', productController.getProductById); // Get product by ID

module.exports = router;
