/**
 * Input validation utilities for the e-commerce API
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result with isValid and missing fields
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate MongoDB ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid ObjectId
 */
const isValidObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeString = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate pagination parameters
 * @param {Object} query - Query parameters
 * @returns {Object} Validated pagination object
 */
const validatePagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    skip: (page - 1) * limit
  };
};

/**
 * Validate price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Object} Validation result
 */
const validatePriceRange = (minPrice, maxPrice) => {
  if (minPrice && maxPrice && minPrice > maxPrice) {
    return { isValid: false, message: 'Minimum price cannot be greater than maximum price' };
  }
  
  if (minPrice && minPrice < 0) {
    return { isValid: false, message: 'Minimum price cannot be negative' };
  }
  
  if (maxPrice && maxPrice < 0) {
    return { isValid: false, message: 'Maximum price cannot be negative' };
  }
  
  return { isValid: true };
};

/**
 * Validate user registration data
 * @param {Object} userData - User registration data
 * @returns {Object} Validation result
 */
const validateUserRegistration = (userData) => {
  const requiredFields = ['username', 'email', 'password'];
  const requiredValidation = validateRequiredFields(userData, requiredFields);
  
  if (!requiredValidation.isValid) {
    return {
      isValid: false,
      message: `Missing required fields: ${requiredValidation.missingFields.join(', ')}`
    };
  }
  
  if (!isValidEmail(userData.email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  const passwordValidation = validatePassword(userData.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }
  
  if (userData.username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  
  return { isValid: true };
};

module.exports = {
  isValidEmail,
  validatePassword,
  validateRequiredFields,
  isValidPhone,
  isValidObjectId,
  sanitizeString,
  validatePagination,
  validatePriceRange,
  validateUserRegistration
}; 