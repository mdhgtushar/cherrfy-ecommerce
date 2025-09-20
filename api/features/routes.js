const express = require('express');
const router = express.Router();

// Import feature routes
const userRoutes = require('./user/user.routes');
const adminRoutes = require('./admin/admin.routes');
const productRoutes = require('./product/product.routes');
const orderRoutes = require('./order/order.routes');
const logisticRoutes = require('./logistic/logistic.routes');
const settingsRoutes = require('./settings/settings.routes');
const { disputeRoutes } = require('./dispute/index.js');
const  categoryRoutes  = require('./category/category.routes.js');
const { wishlistRoutes, followedStoreRoutes } = require('./user/index.js');

// Health check route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cherrfy E-commerce API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount feature routes
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/logistic', logisticRoutes);
router.use('/settings', settingsRoutes);
router.use('/dispute', disputeRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/followed-stores', followedStoreRoutes);
router.use('/category', categoryRoutes);

module.exports = router; 