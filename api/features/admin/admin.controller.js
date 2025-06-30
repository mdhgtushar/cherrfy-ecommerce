const bcrypt = require('bcryptjs');
const Admin = require('./admin.model');
const { generateAdminToken } = require('../../utils/generateToken');
const { validateUserRegistration, isValidEmail } = require('../../utils/validateInput');
const { ApiError } = require('../../middleware/errorHandler');

// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError('Email and password are required', 400);
  }

  if (!isValidEmail(email)) {
    throw new ApiError('Invalid email format', 400);
  }

  // Find admin
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Generate token
  const token = generateAdminToken(admin);

  res.json({
    success: true,
    message: 'Admin login successful',
    data: {
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: 'admin'
      }
    }
  });
};

// Admin registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  const validation = validateUserRegistration(req.body);
  if (!validation.isValid) {
    throw new ApiError(validation.message, 400);
  }

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError('Email already in use', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create admin
  const admin = await Admin.create({
    username,
    email,
    password: hashedPassword,
  });

  // Generate token
  const token = generateAdminToken(admin);

  res.status(201).json({
    success: true,
    message: 'Admin registered successfully',
    data: {
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: 'admin'
      }
    }
  });
};

// Protected admin route
exports.protectedRoute = async (req, res) => {
  res.json({
    success: true,
    message: 'Admin access granted',
    data: {
      admin: req.user
    }
  });
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  const admins = await Admin.find().select('-password');
  
  res.json({
    success: true,
    count: admins.length,
    data: admins
  });
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id).select('-password');
  if (!admin) {
    throw new ApiError('Admin not found', 404);
  }

  res.json({
    success: true,
    data: admin
  });
};

// Update admin
exports.updateAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    throw new ApiError('Admin not found', 404);
  }

  // Update allowed fields
  const allowedFields = ['username', 'email'];
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      admin[field] = req.body[field];
    }
  });

  await admin.save();

  res.json({
    success: true,
    message: 'Admin updated successfully',
    data: admin
  });
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    throw new ApiError('Admin not found', 404);
  }

  await admin.deleteOne();

  res.json({
    success: true,
    message: 'Admin deleted successfully'
  });
};

// Dashboard Overview Stats
exports.getOverviewStats = async (req, res) => {
  // TODO: Replace with real DB queries
  res.json({
    salesToday: 2345,
    salesWeek: 12456,
    salesMonth: 45678,
    orders: { b2c: 320, d2c: 120, b2b: 80 },
    traffic: { visitors: 12300, pageviews: 34500 },
    conversion: 4.2,
    topProducts: ["Smart Watch", "Headphones", "Fitness Tracker", "Laptop Sleeve", "Bluetooth Speaker"],
    revenueVsRefund: "[Graph Data]",
    geo: "[Map Data]"
  });
};

// Dashboard Alerts
exports.getAdminAlerts = async (req, res) => {
  // TODO: Replace with real DB queries
  res.json([
    { type: "warning", message: "Token Expiry Warning (AliExpress)" },
    { type: "error", message: "API Sync Failures" },
    { type: "warning", message: "Low Stock Notifications" },
    { type: "error", message: "Product Import Failures" },
    { type: "warning", message: "Manual Payment Match Pending" },
    { type: "info", message: "New Support Tickets Opened" }
  ]);
};

// Dashboard Pending Actions
exports.getPendingActions = async (req, res) => {
  // TODO: Replace with real DB queries
  res.json({
    products: 7,
    orders: 12,
    vendors: 3,
    support: 5
  });
}; 