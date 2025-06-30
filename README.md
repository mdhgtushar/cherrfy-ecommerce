# Cherrfy E-commerce Platform

A comprehensive multi-role e-commerce platform with admin, user, and vendor interfaces, featuring AliExpress integration, order management, and advanced product cataloging.

## 🚀 Features

### Multi-Role System
- **Admin Panel**: Complete store management, user administration, product oversight
- **User Interface**: Shopping experience, order tracking, profile management
- **Vendor Portal**: Order fulfillment, inventory management, analytics

### Core E-commerce Features
- 🛍️ **Product Management**: Manual and AliExpress product integration
- 🛒 **Shopping Cart**: Real-time stock checking and cart management
- 📦 **Order System**: Complete order lifecycle management
- 💳 **Payment Integration**: Multiple payment methods support
- 🚚 **Logistics**: Shipping calculation and tracking
- 🔍 **Advanced Search**: User behavior-based search results
- 🌍 **Multi-Currency**: Dynamic currency conversion
- ⭐ **Review System**: Product reviews and ratings
- 📱 **Responsive Design**: Mobile-first approach

### Admin Features
- **Product Catalog**: Bulk import from AliExpress, manual creation
- **Order Management**: Order processing, status updates, dispute handling
- **User Management**: Customer accounts, admin user management
- **Analytics Dashboard**: Sales reports, user insights
- **Settings Management**: Store configuration, pricing rules
- **Marketing Tools**: Content management, promotional campaigns
- **Backup & Restore**: Data management utilities

### User Features
- **Personalized Shopping**: Wishlists, recommendations, search history
- **Order Tracking**: Real-time order status and shipping updates
- **Profile Management**: Account settings, preferences
- **Dispute Center**: Return and refund management
- **Review System**: Product feedback and ratings

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Axios** for API integrations
- **Puppeteer** for web scraping

### Frontend
- **React 19** with **React Router DOM**
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Slick** for carousels
- **Lucide React** for icons
- **React Toastify** for notifications

### Development Tools
- **PostCSS** and **Autoprefixer**
- **ESLint** for code quality
- **Jest** for testing

## 📁 Project Structure

```
cherrfy-ecommerce/
├── api/                          # Backend API
│   ├── features/                 # Feature modules
│   │   ├── admin/               # Admin authentication & management
│   │   │   ├── admin/           # Admin interface
│   │   │   ├── user/            # User interface
│   │   │   └── vendor/          # Vendor interface
│   │   ├── product/             # Product management
│   │   ├── order/               # Order processing
│   │   ├── logistic/            # Shipping & logistics
│   │   └── settings/            # System settings
│   ├── middleware/              # Authentication middleware
│   ├── util/                    # Utility functions
│   └── index.js                 # Server entry point
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── roles/               # Role-based components
│   │   └── features/            # Redux slices & store
│   │   ├── components/          # Shared components
│   │   └── util/                # Frontend utilities
│   └── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Backend Setup
```bash
cd api
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create `.env` files in both `api/` and `frontend/` directories:

**Backend (.env)**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:8080/api
```

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm start` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm test` - Run tests

## 📋 TODO Features

- [ ] Currency conversion system
- [ ] Shipping address API integration (with warnings)
- [ ] Enhanced review creation and viewing
- [ ] Order image and title saving
- [ ] Cart stock validation
- [ ] Behavioral search result improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Cherrfy E-commerce** - Building the future of online retail 🛍️  