const bcrypt = require('bcryptjs');
const User = require('./user.model');
const Order = require('../order/order.model');
const { generateUserToken } = require('../../utils/generateToken');
const { validateUserRegistration, isValidEmail } = require('../../utils/validateInput');
const { ApiError } = require('../../middleware/errorHandler');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  const validation = validateUserRegistration(req.body);
  if (!validation.isValid) {
    throw new ApiError(validation.message, 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError('Email already in use', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    name: username,
    username,
    email,
    password: hashedPassword,
  });

  // Generate token
  const token = generateUserToken(user);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email
      }
    }
  });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError('Email and password are required', 400);
  }

  if (!isValidEmail(email)) {
    throw new ApiError('Invalid email format', 400);
  }

  // Find user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Generate token
  const token = generateUserToken(user);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email
      }
    }
  });
};

// Get user profile
exports.profileInfo = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  // Get user statistics
  const totalOrders = await Order.countDocuments({ user: req.user._id });

  res.json({
    success: true,
    data: {
      ...user.toObject(),
      totalOrders
    }
  });
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  // Check if email is being changed and already exists
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      throw new ApiError('Email already in use by another account', 400);
    }
  }

  // Update allowed fields
  const allowedFields = ['name', 'phone', 'username', 'firstName', 'lastName', 'address'];
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
};

// Update user settings
exports.updateUserSettings = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  // Update user settings
  user.settings = { ...user.settings, ...req.body };
  await user.save();

  res.json({
    success: true,
    message: 'User settings updated successfully',
    data: { settings: user.settings }
  });
};

// Change user password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword) {
    throw new ApiError('Current password and new password are required', 400);
  }

  if (newPassword.length < 6) {
    throw new ApiError('New password must be at least 6 characters long', 400);
  }

  // Find user with password
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError('Current password is incorrect', 400);
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  
  res.json({
    success: true,
    count: users.length,
    data: users
  });
};

// Get user by ID (admin only)
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  res.json({
    success: true,
    data: user
  });
};

// Update user by ID (admin only)
exports.updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  // Update user
  Object.keys(req.body).forEach(key => {
    if (key !== 'password') { // Don't allow password update through this route
      user[key] = req.body[key];
    }
  });

  await user.save();

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user
  });
};

// Delete user by ID (admin only)
exports.deleteUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  await user.deleteOne();

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
}; 