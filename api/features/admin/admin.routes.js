const express = require('express');
const router = express.Router();

const {
  login,
  register,
  protectedRoute,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getOverviewStats,
  getAdminAlerts,
  getPendingActions
} = require('./admin.controller');

const { protect, admin } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/errorHandler');

// Public routes
router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));

// Protected admin routes
router.get('/protected', protect, admin, asyncHandler(protectedRoute));
router.get('/', protect, admin, asyncHandler(getAllAdmins));
router.get('/:id', protect, admin, asyncHandler(getAdminById));
router.put('/:id', protect, admin, asyncHandler(updateAdmin));
router.delete('/:id', protect, admin, asyncHandler(deleteAdmin));

// Dashboard routes
router.get('/alerts', protect, admin, getAdminAlerts);
router.get('/pending-actions', protect, admin, getPendingActions);

// Stats overview (can be public or protected as needed)
router.get('/stats/overview', protect, admin, getOverviewStats);

module.exports = router; 