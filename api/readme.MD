# Cherrfy E-commerce API

A robust and scalable REST API for the Cherrfy e-commerce platform, built with Node.js, Express, and MongoDB.

## 🏗️ Architecture

The API follows a modular, feature-based architecture with clear separation of concerns:

```
api/
├── config/                 # Configuration files
│   ├── app.config.js      # Global application settings
│   └── cors.config.js     # CORS configuration
├── features/              # Feature modules
│   ├── user/             # User management
│   ├── admin/            # Admin management
│   ├── product/          # Product catalog
│   ├── order/            # Order management
│   ├── logistic/         # Shipping & logistics
│   ├── settings/         # System settings
│   └── routes.js         # Combined feature routes
├── middleware/           # Custom middleware
│   ├── auth.middleware.js # Authentication & authorization
│   └── errorHandler.js   # Global error handling
├── utils/                # Utility functions
│   ├── db.js            # Database connection
│   ├── generateToken.js # JWT utilities
│   └── validateInput.js # Input validation
└── index.js             # Server entry point
```

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (User, Admin, Vendor)
- Secure password hashing with bcrypt
- Token generation and verification utilities

### Error Handling
- Global error handler with proper logging
- Custom API error class
- Async error wrapper for controllers
- 404 handler for undefined routes

### Security
- Rate limiting to prevent abuse
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Secure headers and middleware

### Database
- MongoDB with Mongoose ODM
- Connection pooling and error handling
- Graceful shutdown handling

## 📋 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register new admin

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/settings` - Update user settings

### Admin Management
- `GET /api/admin/` - Get all admins (admin only)
- `GET /api/admin/:id` - Get admin by ID (admin only)
- `PUT /api/admin/:id` - Update admin (admin only)
- `DELETE /api/admin/:id` - Delete admin (admin only)

### Products (To be implemented)
- `GET /api/product/` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product/` - Create product (admin only)
- `PUT /api/product/:id` - Update product (admin only)
- `DELETE /api/product/:id` - Delete product (admin only)

### Orders (To be implemented)
- `GET /api/order/` - Get user orders
- `GET /api/order/:id` - Get order by ID
- `POST /api/order/` - Create new order
- `PUT /api/order/:id` - Update order (admin only)

## 🔧 Development

### Code Structure

Each feature follows this structure:
```
feature/
├── feature.controller.js  # Business logic
├── feature.model.js       # Database model
├── feature.routes.js      # Route definitions
└── index.js              # Feature exports
```

### Adding New Features

1. Create feature directory in `features/`
2. Create controller, model, and routes files
3. Add routes to `features/routes.js`
4. Update this README with new endpoints

### Middleware Usage

```javascript
const { protect, admin, authorize } = require('../middleware/auth.middleware');
const { asyncHandler } = require('../middleware/errorHandler');

// Protected route
router.get('/profile', protect, asyncHandler(controller.getProfile));

// Admin only route
router.post('/admin', protect, admin, asyncHandler(controller.adminAction));

// Resource ownership check
router.put('/:id', protect, authorize('user'), asyncHandler(controller.update));
```

### Error Handling

```javascript
const { ApiError } = require('../middleware/errorHandler');

// Throw custom errors
throw new ApiError('Resource not found', 404);

// Use async handler for automatic error catching
const controller = asyncHandler(async (req, res) => {
  // Your controller logic
});
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set strong JWT secret
4. Configure CORS for production domains
5. Set up proper logging
6. Use PM2 or similar process manager

## 🔒 Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens have expiration times
- Rate limiting prevents abuse
- Input validation prevents injection attacks
- CORS is properly configured
- Error messages don't expose sensitive information

## 🤝 Contributing

1. Follow the existing code structure
2. Use the provided middleware and utilities
3. Add proper error handling
4. Update documentation for new features
5. Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License.