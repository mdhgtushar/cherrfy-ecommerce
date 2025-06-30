const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

/**
 * Generate JWT token for user authentication
 * @param {Object} payload - Token payload (userId, email, role, etc.)
 * @param {string} expiresIn - Token expiration time (default: 1d)
 * @returns {string} JWT token
 */
const generateToken = (payload, expiresIn = config.jwtExpiresIn) => {
  try {
    return jwt.sign(payload, config.jwtSecret, { expiresIn });
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

/**
 * Generate user token with standard payload
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateUserToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    username: user.name || user.username,
    role: user.role || 'user'
  };
  
  return generateToken(payload);
};

/**
 * Generate admin token with admin role
 * @param {Object} admin - Admin object
 * @returns {string} JWT token
 */
const generateAdminToken = (admin) => {
  const payload = {
    userId: admin._id,
    email: admin.email,
    username: admin.username,
    role: 'admin'
  };
  
  return generateToken(payload);
};

module.exports = {
  generateToken,
  verifyToken,
  generateUserToken,
  generateAdminToken
}; 