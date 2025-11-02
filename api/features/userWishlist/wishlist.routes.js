const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const { addToWishlist, removeFromWishlist, getWishlist } = require('./wishlist.controller');

router.post('/add', protect, addToWishlist);
router.post('/remove', protect, removeFromWishlist);
router.get('/', protect, getWishlist);

module.exports = router; 