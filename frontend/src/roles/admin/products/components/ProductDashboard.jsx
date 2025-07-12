import React, { useState, useEffect } from 'react';
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
  Monitor
} from 'lucide-react';

const ProductDashboard = ({ products }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data - replace with real API calls
  const mockData = {
    revenue: [
      { date: '2024-01-01', value: 1250 },
      { date: '2024-01-02', value: 1450 },
      { date: '2024-01-03', value: 980 },
      { date: '2024-01-04', value: 1670 },
      { date: '2024-01-05', value: 1890 },
      { date: '2024-01-06', value: 1560 },
      { date: '2024-01-07', value: 2340 },
    ],
    views: [
      { date: '2024-01-01', value: 1200 },
      { date: '2024-01-02', value: 1450 },
      { date: '2024-01-03', value: 980 },
      { date: '2024-01-04', value: 1670 },
      { date: '2024-01-05', value: 1890 },
      { date: '2024-01-06', value: 1560 },
      { date: '2024-01-07', value: 2340 },
    ],
    orders: [
      { date: '2024-01-01', value: 25 },
      { date: '2024-01-02', value: 38 },
      { date: '2024-01-03', value: 23 },
      { date: '2024-01-04', value: 42 },
      { date: '2024-01-05', value: 55 },
      { date: '2024-01-06', value: 39 },
      { date: '2024-01-07', value: 68 },
    ]
  };

  const metrics = [
    { key: 'revenue', label: 'Revenue', icon: DollarSign, color: '#8B5CF6', data: mockData.revenue },
    { key: 'views', label: 'Views', icon: Eye, color: '#3B82F6', data: mockData.views },
    { key: 'orders', label: 'Orders', icon: ShoppingCart, color: '#10B981', data: mockData.orders }
  ];

  const currentMetric = metrics.find(m => m.key === selectedMetric);

  // Calculate overall stats
  const stats = {
    totalProducts: products.length,
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

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Clothing', value: 25, color: '#10B981' },
    { name: 'Home & Garden', value: 20, color: '#F59E0B' },
    { name: 'Sports', value: 15, color: '#EF4444' },
    { name: 'Books', value: 5, color: '#8B5CF6' }
  ];

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#3B82F6' },
    { name: 'Desktop', value: 25, color: '#10B981' },
    { name: 'Tablet', value: 10, color: '#F59E0B' }
  ];

  const recentActivity = [
    { action: 'New product added', time: '2 hours ago', type: 'add' },
    { action: 'Product updated', time: '4 hours ago', type: 'update' },
    { action: 'Order received', time: '6 hours ago', type: 'order' },
    { action: 'Review added', time: '1 day ago', type: 'review' },
    { action: 'Price changed', time: '2 days ago', type: 'price' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Dashboard</h2>
          <p className="text-gray-600">Overview of your product performance and analytics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          <div className="flex gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === metric.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <metric.icon className="w-4 h-4" />
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentMetric.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [value, currentMetric.label]}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={currentMetric.color} 
                fill={currentMetric.color}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Products */}
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

        {/* Category Distribution */}
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

      {/* Device Usage and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Usage */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={device.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${device.color}20` }}>
                    {device.name === 'Mobile' ? (
                      <Smartphone className="w-4 h-4" style={{ color: device.color }} />
                    ) : device.name === 'Desktop' ? (
                      <Monitor className="w-4 h-4" style={{ color: device.color }} />
                    ) : (
                      <Globe className="w-4 h-4" style={{ color: device.color }} />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{device.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${device.value}%`, 
                        backgroundColor: device.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{device.value}%</span>
                </div>
              </div>
            ))}
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

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
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
};

export default ProductDashboard; 