const express = require('express');
const router = express.Router();

const {
  register,
  login,
  profileInfo,
  updateUserProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserSettings,
  deleteUserById
} = require('./user.controller');

const { protect, admin, authorize } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');

// Public routes
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

// Protected routes
router.get('/profile', protect, asyncHandler(profileInfo));
router.put('/profile', protect, asyncHandler(updateUserProfile));
router.put('/password', protect, asyncHandler(changePassword));
router.put('/settings', protect, asyncHandler(updateUserSettings));

// Admin routes
// router.get('list', protect, admin, asyncHandler())
router.get('/', protect, admin, asyncHandler(getAllUsers));
router.get('/:id', protect, admin, asyncHandler(getUserById));
router.put('/:id', protect, admin, asyncHandler(updateUserById));
router.delete('/:id', protect, admin, asyncHandler(deleteUserById));

module.exports = router; 