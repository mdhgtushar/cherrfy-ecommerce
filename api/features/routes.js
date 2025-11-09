const express = require('express');
const router = express.Router();

// Import feature routes
const userRoutes = require('./user/user.routes');
const adminRoutes = require('./admin/admin.routes');
const productRoutes = require('./product/product.routes');
const orderRoutes = require('./order/order.routes');
const logisticRoutes = require('./logistic/logistic.routes');
const settingsRoutes = require('./settings/settings.routes');
const mediaRoutes = require("./media/media.router")
const { disputeRoutes } = require('./dispute/index.js');
const  categoryRoutes  = require('./category/category.routes.js');
const followedStoreRoutes = require('./followedStore/followedStore.routes.js');
const extraRoutes = require('./extra/extra.routes');
const googleAuth = require("./user/google.auth.js")
const facebookAuth = require("./user/facebook.auth.js")
const wishlistRoutes = require('./userWishlist/wishlist.routes');
const returnRefundRoutes = require('./returnRefund/returnRefund.router.js');

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
router.use("/media", mediaRoutes)
router.use('/extra', extraRoutes);
router.use("/auth", googleAuth)
router.use("/auth", facebookAuth)
router.use("/return-refund", returnRefundRoutes); 
router.use("/shipping-address", require("./shippingAddress/shippingAddress.router.js"));
router.use("/payment-methods", require("./paymentMethod/paymentMethod.router.js"));

module.exports = router; 