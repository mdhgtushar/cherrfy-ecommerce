require('dotenv').config();

module.exports = {
  // Server Configuration
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://mdhgtushar:DTtZgDAU3i5Ujg6b@cluster0.0ba1y.mongodb.net/",
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  
  // API Configuration
  apiPrefix: '/api',
  
  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: 5000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  
  // File Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  },
  
  // AliExpress API Configuration
  appKey: process.env.ALIEXPRESS_APP_KEY || '510834',
  appSecret: process.env.ALIEXPRESS_APP_SECRET || 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad',
  accessToken: process.env.ALIEXPRESS_ACCESS_TOKEN || '50000100527WgXaoLfT6nAQZmqcddluFmxCRQEW15e978a0bDvCpV0jkGRVX8LtQ5Bsv'
}; 