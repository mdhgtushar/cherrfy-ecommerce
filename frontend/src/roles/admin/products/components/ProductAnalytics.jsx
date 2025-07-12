import React, { useState } from 'react';
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
  Award
} from 'lucide-react';

const ProductAnalytics = ({ productId, analytics }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('views');

  // Mock data - replace with real API calls
  const mockData = {
    views: [
      { date: '2024-01-01', value: 120 },
      { date: '2024-01-02', value: 145 },
      { date: '2024-01-03', value: 98 },
      { date: '2024-01-04', value: 167 },
      { date: '2024-01-05', value: 189 },
      { date: '2024-01-06', value: 156 },
      { date: '2024-01-07', value: 234 },
    ],
    orders: [
      { date: '2024-01-01', value: 5 },
      { date: '2024-01-02', value: 8 },
      { date: '2024-01-03', value: 3 },
      { date: '2024-01-04', value: 12 },
      { date: '2024-01-05', value: 15 },
      { date: '2024-01-06', value: 9 },
      { date: '2024-01-07', value: 18 },
    ],
    revenue: [
      { date: '2024-01-01', value: 250 },
      { date: '2024-01-02', value: 400 },
      { date: '2024-01-03', value: 150 },
      { date: '2024-01-04', value: 600 },
      { date: '2024-01-05', value: 750 },
      { date: '2024-01-06', value: 450 },
      { date: '2024-01-07', value: 900 },
    ]
  };

  const metrics = [
    { key: 'views', label: 'Views', icon: Eye, color: '#3B82F6', data: mockData.views },
    { key: 'orders', label: 'Orders', icon: ShoppingCart, color: '#10B981', data: mockData.orders },
    { key: 'revenue', label: 'Revenue', icon: DollarSign, color: '#8B5CF6', data: mockData.revenue }
  ];

  const currentMetric = metrics.find(m => m.key === activeMetric);

  const performanceStats = [
    {
      label: 'Conversion Rate',
      value: '13.5%',
      change: '+2.1%',
      positive: true,
      icon: TrendingUp
    },
    {
      label: 'Avg Order Value',
      value: '$156.78',
      change: '+8.3%',
      positive: true,
      icon: DollarSign
    },
    {
      label: 'Customer Rating',
      value: '4.2/5',
      change: '+0.3',
      positive: true,
      icon: Star
    },
    {
      label: 'Return Rate',
      value: '2.1%',
      change: '-0.5%',
      positive: true,
      icon: Award
    }
  ];

  const demographicData = [
    { name: '18-24', value: 25, color: '#3B82F6' },
    { name: '25-34', value: 35, color: '#10B981' },
    { name: '35-44', value: 20, color: '#F59E0B' },
    { name: '45+', value: 20, color: '#EF4444' }
  ];

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#3B82F6' },
    { name: 'Desktop', value: 25, color: '#10B981' },
    { name: 'Tablet', value: 10, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Analytics</h2>
          <p className="text-gray-600">Performance insights and customer behavior</p>
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

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                <stat.icon className={`w-6 h-6 ${stat.positive ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Metric Selector */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex gap-4 mb-6">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeMetric === metric.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <metric.icon className="w-4 h-4" />
              {metric.label}
            </button>
          ))}
        </div>

        {/* Chart */}
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

      {/* Demographics and Device Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Demographics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Usage */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-900">Total Views</span>
              <span className="font-semibold text-blue-900">1,247</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-900">Unique Views</span>
              <span className="font-semibold text-green-900">892</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-900">Bounce Rate</span>
              <span className="font-semibold text-purple-900">23.4%</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-900">Total Orders</span>
              <span className="font-semibold text-blue-900">89</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-900">Conversion Rate</span>
              <span className="font-semibold text-green-900">13.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-900">Avg Order Value</span>
              <span className="font-semibold text-purple-900">$156.78</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-900">Total Revenue</span>
              <span className="font-semibold text-blue-900">$13,953</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-900">Profit Margin</span>
              <span className="font-semibold text-green-900">32.4%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-900">Return Rate</span>
              <span className="font-semibold text-purple-900">2.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New order received', time: '2 hours ago', type: 'order' },
            { action: 'Product viewed 15 times', time: '4 hours ago', type: 'view' },
            { action: 'New review added', time: '1 day ago', type: 'review' },
            { action: 'Price updated', time: '2 days ago', type: 'update' },
            { action: 'Stock level changed', time: '3 days ago', type: 'stock' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'order' ? 'bg-green-600' :
                activity.type === 'view' ? 'bg-blue-600' :
                activity.type === 'review' ? 'bg-purple-600' :
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
};

export default ProductAnalytics; 