import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Eye, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  Activity,
  BarChart3,
  Target,
  Award,
  Clock,
  ArrowUp,
  ArrowDown,
  Package,
  Globe,
  Smartphone,
  Monitor,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  RefreshCw
} from 'lucide-react';

const ProductManagementDashboard = ({ products, onFilterChange, onAction }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedView, setSelectedView] = useState('overview');

  // Mock data for charts
  const chartData = [
    { name: 'Jan', views: 1200, orders: 45, revenue: 4500 },
    { name: 'Feb', views: 1400, orders: 52, revenue: 5200 },
    { name: 'Mar', views: 1100, orders: 38, revenue: 3800 },
    { name: 'Apr', views: 1600, orders: 65, revenue: 6500 },
    { name: 'May', views: 1800, orders: 72, revenue: 7200 },
    { name: 'Jun', views: 1500, orders: 58, revenue: 5800 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Clothing', value: 25, color: '#10B981' },
    { name: 'Home & Garden', value: 20, color: '#F59E0B' },
    { name: 'Sports', value: 15, color: '#EF4444' },
    { name: 'Books', value: 5, color: '#8B5CF6' }
  ];

  const statusData = [
    { name: 'Published', value: 65, color: '#10B981' },
    { name: 'Draft', value: 25, color: '#F59E0B' },
    { name: 'Out of Stock', value: 10, color: '#EF4444' }
  ];

  // Calculate statistics
  const stats = {
    totalProducts: products.length,
    published: products.filter(p => p.status === 'published').length,
    draft: products.filter(p => p.status === 'draft').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
    totalViews: products.reduce((sum, p) => sum + (Math.floor(Math.random() * 1000) + 100), 0),
    totalOrders: products.reduce((sum, p) => sum + (Math.floor(Math.random() * 50) + 1), 0),
    totalRevenue: products.reduce((sum, p) => sum + (Math.floor(Math.random() * 5000) + 500), 0),
    avgRating: (Math.random() * 2 + 3).toFixed(1),
    conversionRate: (Math.random() * 10 + 8).toFixed(1)
  };

  const topProducts = products.slice(0, 5).map(product => ({
    ...product,
    views: Math.floor(Math.random() * 1000) + 100,
    orders: Math.floor(Math.random() * 50) + 1,
    revenue: Math.floor(Math.random() * 5000) + 500,
    rating: (Math.random() * 2 + 3).toFixed(1)
  }));

  const recentActivity = [
    { action: 'New product added', time: '2 hours ago', type: 'add' },
    { action: 'Product updated', time: '4 hours ago', type: 'update' },
    { action: 'Order received', time: '6 hours ago', type: 'order' },
    { action: 'Review added', time: '1 day ago', type: 'review' },
    { action: 'Price changed', time: '2 days ago', type: 'price' }
  ];

  const views = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">+8%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Total Views</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">+15%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">+23%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1"
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.1}
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stackId="2"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name || 'Product Name'}</p>
                  <p className="text-sm text-gray-600">SKU: {product.productId}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.revenue}</p>
                  <p className="text-xs text-gray-600">{product.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.avgRating}</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-5 h-5 ${star <= stats.avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.conversionRate}%</div>
            <div className="flex items-center justify-center gap-1 text-green-600 mb-2">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">+2.1%</span>
            </div>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">${(stats.totalRevenue / stats.totalOrders).toFixed(0)}</div>
            <div className="flex items-center justify-center gap-1 text-green-600 mb-2">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">+8.3%</span>
            </div>
            <p className="text-sm text-gray-600">Average Order Value</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3B82F6" />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'add' ? 'bg-green-600' :
                activity.type === 'update' ? 'bg-blue-600' :
                activity.type === 'order' ? 'bg-purple-600' :
                activity.type === 'review' ? 'bg-yellow-600' :
                'bg-gray-600'
              }`}></div>
              <span className="text-sm text-gray-700">{activity.action}</span>
              <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Product Management Actions */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
            <p className="text-sm text-gray-600">Manage your product catalog and inventory</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              Import Products
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Product Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management Dashboard</h2>
          <p className="text-gray-600">Comprehensive overview of your product performance and analytics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* View Selector */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex gap-2">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <view.icon className="w-4 h-4" />
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {selectedView === 'overview' && renderOverview()}
      {selectedView === 'analytics' && renderAnalytics()}
      {selectedView === 'performance' && renderPerformance()}
      {selectedView === 'products' && renderProducts()}
    </div>
  );
};

export default ProductManagementDashboard; 