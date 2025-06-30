const { verifyToken } = require('../utils/generateToken');
const { isValidObjectId } = require('../utils/validateInput');
const { ApiError, asyncHandler } = require('./errorHandler');
const User = require('../features/user/user.model');
const Admin = require('../features/admin/admin.model');

/**
 * Protect routes - verify user authentication
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError('Not authorized, no token provided', 401);
  }

  try {
    // Verify token
    const decoded = verifyToken(token);
    
    // Check if user exists
    if (!isValidObjectId(decoded.userId)) {
      throw new ApiError('Invalid user ID in token', 401);
    }

    // Get user based on role
    let user;
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.userId).select('-password');
    } else {
      user = await User.findById(decoded.userId).select('-password');
    }

    if (!user) {
      throw new ApiError('User not found', 401);
    }

    // Add user to request
    req.user = user;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    throw new ApiError('Not authorized, token failed', 401);
  }
});

/**
 * Admin authorization middleware
 */
const admin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError('Authentication required', 401);
  }

  if (req.userRole !== 'admin' && !req.user.isAdmin) {
    throw new ApiError('Admin access required', 403);
  }

  next();
});

/**
 * Vendor authorization middleware
 */
const vendor = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError('Authentication required', 401);
  }

  if (req.userRole !== 'vendor' && !req.user.isVendor) {
    throw new ApiError('Vendor access required', 403);
  }

  next();
});

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = verifyToken(token);
      
      if (isValidObjectId(decoded.userId)) {
        let user;
        if (decoded.role === 'admin') {
          user = await Admin.findById(decoded.userId).select('-password');
        } else {
          user = await User.findById(decoded.userId).select('-password');
        }

        if (user) {
          req.user = user;
          req.userRole = decoded.role;
        }
      }
    } catch (error) {
      // Token is invalid, but we don't throw error for optional auth
      console.log('Optional auth failed:', error.message);
    }
  }

  next();
});

/**
 * Check if user owns the resource or is admin
 */
const authorize = (resourceUserIdField = 'user') => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError('Authentication required', 401);
    }

    // Admin can access everything
    if (req.userRole === 'admin' || req.user.isAdmin) {
      return next();
    }

    // Check if user owns the resource
    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (!resourceUserId) {
      throw new ApiError('Resource user ID not found', 400);
    }

    if (resourceUserId.toString() !== req.user._id.toString()) {
      throw new ApiError('Not authorized to access this resource', 403);
    }

    next();
  });
};

module.exports = {
  protect,
  admin,
  vendor,
  optionalAuth,
  authorize
}; 