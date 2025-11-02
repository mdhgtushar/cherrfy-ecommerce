const userRoutes = require('./user.routes');
const wishlistRoutes = require('../userWishlist/wishlist.routes');
const followedStoreRoutes = require('./followedStore.routes');
const userController = require('./user.controller');
const userModel = require('./user.model');

module.exports = {
  userRoutes,
  wishlistRoutes,
  followedStoreRoutes,
  userController,
  userModel
}; 