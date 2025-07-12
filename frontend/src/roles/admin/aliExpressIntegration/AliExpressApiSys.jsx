import React, { useState } from "react";
import { 
  Link, 
  Package, 
  RefreshCw, 
  Settings, 
  Truck, 
  Key, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  Edit,
  Trash,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Search,
  Plus,
  Minus,
  Zap,
  Globe,
  Shield,
  Database,
  Cpu,
  Wifi,
  WifiOff,
  Play,
  Pause,
  Stop,
  RotateCcw,
  ExternalLink,
  Copy,
  Lock,
  Unlock
} from "lucide-react";

const mockLogs = [
  { type: 'success', message: 'Product #123456 Synced', time: '2024-05-07 10:00 AM', productId: '123456', details: 'Product data updated successfully' },
  { type: 'error', message: 'Invalid Signature for Product #789', time: '2024-05-07 09:55 AM', productId: '789', details: 'API signature verification failed' },
  { type: 'success', message: 'Product #654321 Synced', time: '2024-05-07 09:30 AM', productId: '654321', details: 'Product data updated successfully' },
  { type: 'error', message: 'Timeout for Product #111', time: '2024-05-07 09:10 AM', productId: '111', details: 'API request timed out after 30s' },
  { type: 'success', message: 'Product #222333 Synced', time: '2024-05-07 08:50 AM', productId: '222333', details: 'Product data updated successfully' },
  { type: 'success', message: 'Product #444555 Synced', time: '2024-05-07 08:30 AM', productId: '444555', details: 'Product data updated successfully' },
  { type: 'error', message: 'API Rate Limit', time: '2024-05-07 08:10 AM', productId: 'N/A', details: 'Rate limit exceeded, retry in 60s' },
  { type: 'success', message: 'Product #999888 Synced', time: '2024-05-07 07:50 AM', productId: '999888', details: 'Product data updated successfully' },
  { type: 'success', message: 'Product #777666 Synced', time: '2024-05-07 07:30 AM', productId: '777666', details: 'Product data updated successfully' },
  { type: 'error', message: 'Invalid Product ID #555', time: '2024-05-07 07:10 AM', productId: '555', details: 'Product ID not found in AliExpress' },
  { type: 'success', message: 'Product #333222 Synced', time: '2024-05-07 06:50 AM', productId: '333222', details: 'Product data updated successfully' },
  { type: 'success', message: 'Product #111000 Synced', time: '2024-05-07 06:30 AM', productId: '111000', details: 'Product data updated successfully' },
];

const mockProducts = [
  { id: '123456', name: 'Wireless Earbuds Pro', status: 'Active', lastSync: '2024-05-07 10:00 AM', price: '$45.99', stock: 150 },
  { id: '654321', name: 'Smart Watch Series 5', status: 'Active', lastSync: '2024-05-07 09:30 AM', price: '$89.99', stock: 75 },
  { id: '222333', name: 'Bluetooth Speaker', status: 'Active', lastSync: '2024-05-07 08:50 AM', price: '$29.99', stock: 200 },
  { id: '444555', name: 'Phone Case Premium', status: 'Inactive', lastSync: '2024-05-06 15:30 PM', price: '$12.99', stock: 0 },
  { id: '999888', name: 'USB-C Cable Pack', status: 'Active', lastSync: '2024-05-07 07:50 AM', price: '$8.99', stock: 300 },
];

export default function AliExpressApiSys() {
  const [productId, setProductId] = useState("");
  const [bulkIds, setBulkIds] = useState("");
  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("daily");
  const [token, setToken] = useState("abc123def456ghi789");
  const [logsPage, setLogsPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const logsPerPage = 5;
  const totalPages = Math.ceil(mockLogs.length / logsPerPage);
  const pagedLogs = mockLogs.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  // Analytics data
  const analytics = {
    totalProducts: mockProducts.length,
    activeProducts: mockProducts.filter(p => p.status === 'Active').length,
    totalSyncs: 1247,
    successfulSyncs: 1189,
    failedSyncs: 58,
    successRate: 95.3,
    lastSync: '2024-05-07 10:00 AM',
    apiCalls: 2340,
    avgResponseTime: '1.2s'
  };

  const MetricCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const LogCard = ({ log }) => {
    const isSuccess = log.type === 'success';
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
              {isSuccess ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
            </div>
            <div>
              <p className="font-medium text-gray-900">{log.message}</p>
              <p className="text-sm text-gray-500">Product ID: {log.productId}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">{log.time}</span>
        </div>
        <p className="text-sm text-gray-600">{log.details}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">AliExpress Integration</h1>
                    <p className="text-gray-600">Connect and manage your AliExpress integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Last sync: {analytics.lastSync}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{analytics.apiCalls} API calls today</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>API Docs</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Products"
            value={analytics.totalProducts}
            change="+12.5%"
            trend="up"
            icon={Package}
            color="blue"
          />
          <MetricCard
            title="Success Rate"
            value={`${analytics.successRate}%`}
            change="+2.1%"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="API Calls"
            value={analytics.apiCalls}
            change="+8.7%"
            trend="up"
            icon={Activity}
            color="purple"
          />
          <MetricCard
            title="Avg Response"
            value={analytics.avgResponseTime}
            change="-0.3s"
            trend="up"
            icon={Zap}
            color="orange"
          />
        </div>

        {/* Integration Status Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{analytics.successfulSyncs}</p>
              <p className="text-sm text-green-700">Successful Syncs</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{analytics.failedSyncs}</p>
              <p className="text-sm text-red-700">Failed Syncs</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{analytics.activeProducts}</p>
              <p className="text-sm text-blue-700">Active Products</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{analytics.lastSync}</p>
              <p className="text-sm text-purple-700">Last Sync</p>
            </div>
          </div>
        </div>

        {/* Product Import */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Import</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Single Product Import</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Import
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bulk Product Import</label>
              <div className="space-y-2">
                <textarea
                  rows="3"
                  placeholder="Bulk Product IDs (comma or newline separated)"
                  value={bulkIds}
                  onChange={(e) => setBulkIds(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Bulk Import
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync Controls</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={autoSync} 
                onChange={() => setAutoSync(!autoSync)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Enable Auto Sync</span>
            </label>
            <select
              value={syncFrequency}
              onChange={(e) => setSyncFrequency(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Sync Now</span>
            </button>
          </div>
        </div>

        {/* API Token Manager */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Token Manager</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Access Token</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 font-mono text-sm"
                  readOnly
                />
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Token</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Logs Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagedLogs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No logs found matching your criteria.</p>
              </div>
            ) : (
              pagedLogs.map((log, index) => (
                <LogCard key={index} log={log} />
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pagedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p>No logs found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  pagedLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          log.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.type === 'success' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                          {log.type === 'success' ? 'Success' : 'Error'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{log.message}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{log.productId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{log.details}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">{log.time}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setLogsPage((p) => Math.max(1, p - 1))}
              disabled={logsPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {logsPage} of {totalPages}</span>
            <button
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setLogsPage((p) => Math.min(totalPages, p + 1))}
              disabled={logsPage === totalPages}
            >
              Next
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
