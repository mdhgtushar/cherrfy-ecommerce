const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import configurations and utilities
const config = require('./config/app.config');
const corsOptions = require('./config/cors.config');
const connectDB = require('./utils/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Create Express app
const app = express();

// Connect to database
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.'
    }
  }
});

// Middleware
app.use(limiter);

// CORS setup - must come before other middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use(config.apiPrefix, require('./features/routes'));

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}${config.apiPrefix}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app;
 