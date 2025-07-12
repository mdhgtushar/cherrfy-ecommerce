import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  UserCircle, 
  ChevronDown, 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Plus,
  RefreshCw,
  HelpCircle,
  Shield,
  Activity,
  Truck,
  ExternalLink,
  Database,
  Zap
} from 'lucide-react';
import ADMIN_PATHS from '../ADMIN_PATHS';

export default function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy user data
  const user = { 
    name: "Admin User", 
    role: "Super Admin",
    avatar: null,
    lastLogin: "2 hours ago"
  };

  // Dummy notifications
  const dummyNotifications = [
    { id: 1, type: 'order', message: 'New order #ORD-2024-001 received', time: '2 min ago', read: false },
    { id: 2, type: 'alert', message: '5 products running low on stock', time: '5 min ago', read: false },
    { id: 3, type: 'system', message: 'Daily backup completed successfully', time: '15 min ago', read: true },
    { id: 4, type: 'user', message: 'New user registration: john.doe@email.com', time: '1 hour ago', read: true }
  ];

  useEffect(() => {
    setNotifications(dummyNotifications);
  }, []);

  // Content-aware header based on current route
  const getHeaderContent = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      return {
        title: 'Dashboard',
        subtitle: 'Store Overview & Analytics',
        icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
        quickActions: [
          { label: 'Add Product', icon: Plus, action: () => navigate(ADMIN_PATHS.PRODUCTS.SOURCE) },
          { label: 'View Orders', icon: ShoppingCart, action: () => navigate(ADMIN_PATHS.ORDERS) },
          { label: 'Analytics', icon: TrendingUp, action: () => navigate(ADMIN_PATHS.ANALYTICS) }
        ]
      };
    }
    
    if (path.includes('/products')) {
      return {
        title: 'Product Management',
        subtitle: 'Manage your product catalog',
        icon: <Package className="w-6 h-6 text-green-600" />,
        quickActions: [
          { label: 'Add Product', icon: Plus, action: () => navigate(ADMIN_PATHS.PRODUCTS.SOURCE) },
          { label: 'Import Products', icon: RefreshCw, action: () => navigate(ADMIN_PATHS.PRODUCTS.IMPORT) },
          { label: 'View All', icon: Package, action: () => navigate(ADMIN_PATHS.PRODUCTS.BASE) }
        ]
      };
    }
    
    if (path.includes('/orders')) {
      return {
        title: 'Order Management',
        subtitle: 'Track and manage customer orders',
        icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
        quickActions: [
          { label: 'New Orders', icon: Plus, action: () => navigate(ADMIN_PATHS.ORDERS) },
          { label: 'Pending', icon: Clock, action: () => navigate(ADMIN_PATHS.ORDERS) },
          { label: 'Analytics', icon: BarChart3, action: () => navigate(ADMIN_PATHS.ANALYTICS) }
        ]
      };
    }
    
    if (path.includes('/users')) {
      return {
        title: 'User Management',
        subtitle: 'Manage customer accounts and permissions',
        icon: <Users className="w-6 h-6 text-indigo-600" />,
        quickActions: [
          { label: 'Add User', icon: Plus, action: () => navigate(ADMIN_PATHS.USERS) },
          { label: 'View All', icon: Users, action: () => navigate(ADMIN_PATHS.USERS) },
          { label: 'Analytics', icon: Activity, action: () => navigate(ADMIN_PATHS.ANALYTICS) }
        ]
      };
    }
    
    if (path.includes('/analytics')) {
      return {
        title: 'Analytics & Reports',
        subtitle: 'Business insights and performance metrics',
        icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
        quickActions: [
          { label: 'Sales Report', icon: DollarSign, action: () => navigate(ADMIN_PATHS.ANALYTICS) },
          { label: 'User Analytics', icon: Users, action: () => navigate(ADMIN_PATHS.ANALYTICS) },
          { label: 'Export Data', icon: BarChart3, action: () => navigate(ADMIN_PATHS.ANALYTICS) }
        ]
      };
    }
    
    if (path.includes('/aliexpress-integration') || path.includes('/aliexpress')) {
      return {
        title: 'AliExpress Integration',
        subtitle: 'Connect and manage your AliExpress integration',
        icon: <Package className="w-6 h-6 text-blue-600" />,
        quickActions: [
          { label: 'Refresh', icon: RefreshCw, action: () => window.location.reload() },
          { label: 'API Docs', icon: ExternalLink, action: () => window.open('https://developers.aliexpress.com/en/doc.htm', '_blank') },
          { label: 'Settings', icon: Settings, action: () => navigate(ADMIN_PATHS.SETTINGS) }
        ]
      };
    }
    
    if (path.includes('/courier-integration') || path.includes('/shipping')) {
      return {
        title: 'Courier Integration & API Logs',
        subtitle: 'Connect and manage your courier/shipping integrations',
        icon: <Truck className="w-6 h-6 text-purple-600" />,
        quickActions: [
          { label: 'Refresh', icon: RefreshCw, action: () => window.location.reload() },
          { label: 'API Docs', icon: ExternalLink, action: () => window.open('https://developers.courier.com', '_blank') },
          { label: 'Settings', icon: Settings, action: () => navigate(ADMIN_PATHS.SETTINGS) }
        ]
      };
    }
    
    if (path.includes('/settings')) {
      return {
        title: 'System Settings',
        subtitle: 'Configure platform settings and preferences',
        icon: <Settings className="w-6 h-6 text-gray-600" />,
        quickActions: [
          { label: 'General', icon: Settings, action: () => navigate(ADMIN_PATHS.SETTINGS) },
          { label: 'Security', icon: Shield, action: () => navigate(ADMIN_PATHS.ADMIN.SECURITY) },
          { label: 'Backup', icon: RefreshCw, action: () => navigate(ADMIN_PATHS.BACKUP) }
        ]
      };
    }
    
    // Default
    return {
      title: 'Admin Panel',
      subtitle: 'Manage your e-commerce platform',
      icon: <Home className="w-6 h-6 text-blue-600" />,
      quickActions: [
        { label: 'Dashboard', icon: Home, action: () => navigate(ADMIN_PATHS.DASHBOARD) },
        { label: 'Products', icon: Package, action: () => navigate(ADMIN_PATHS.PRODUCTS.BASE) },
        { label: 'Orders', icon: ShoppingCart, action: () => navigate(ADMIN_PATHS.ORDERS) }
      ]
    };
  };

  const headerContent = getHeaderContent();
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'system': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'user': return <Users className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    navigate(ADMIN_PATHS.AUTH.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        {/* Top Row - Title and User */}
        <div className="flex items-center justify-between mb-4">
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              {headerContent.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{headerContent.title}</h1>
              <p className="text-sm text-gray-600">{headerContent.subtitle}</p>
            </div>
          </div>

          {/* Right Side - Search, Notifications, User */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                ) : (
                  <UserCircle className="w-8 h-8 text-gray-400" />
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                    <p className="text-xs text-gray-400 mt-1">Last login: {user.lastLogin}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <UserCircle className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row - Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {headerContent.quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
          
          {/* System Status */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>API: 99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 