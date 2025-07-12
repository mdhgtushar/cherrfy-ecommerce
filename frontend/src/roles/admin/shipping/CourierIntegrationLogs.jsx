import React, { useState } from "react";
import { 
  Truck, 
  RefreshCw, 
  Settings, 
  Key, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Search,
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
  Unlock,
  Package,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Plus,
  Minus,
  Users,
  DollarSign
} from "lucide-react";

const mockLogs = [
  { type: 'success', message: 'Courier API Connected', time: '2024-05-07 10:00 AM', courier: 'DHL', details: 'API connection established successfully' },
  { type: 'error', message: 'Failed to fetch rates from DHL', time: '2024-05-07 09:55 AM', courier: 'DHL', details: 'Rate limit exceeded, retry in 60s' },
  { type: 'success', message: 'FedEx rates updated', time: '2024-05-07 09:30 AM', courier: 'FedEx', details: 'Shipping rates synchronized successfully' },
  { type: 'error', message: 'API Key expired for UPS', time: '2024-05-07 09:10 AM', courier: 'UPS', details: 'API key needs renewal' },
  { type: 'success', message: 'Aramex integration enabled', time: '2024-05-07 08:50 AM', courier: 'Aramex', details: 'New courier integration activated' },
  { type: 'success', message: 'Courier webhook received', time: '2024-05-07 08:30 AM', courier: 'DHL', details: 'Tracking update received' },
  { type: 'error', message: 'Webhook signature invalid', time: '2024-05-07 08:10 AM', courier: 'FedEx', details: 'Webhook verification failed' },
  { type: 'success', message: 'API token refreshed', time: '2024-05-07 07:50 AM', courier: 'UPS', details: 'Token renewed successfully' },
  { type: 'success', message: 'Courier rates synced', time: '2024-05-07 07:30 AM', courier: 'All', details: 'All courier rates updated' },
  { type: 'error', message: 'Timeout on courier sync', time: '2024-05-07 07:10 AM', courier: 'Aramex', details: 'Request timed out after 30s' },
];

const mockCouriers = [
  { name: 'DHL', status: 'Active', lastSync: '2024-05-07 10:00 AM', apiCalls: 234, successRate: 98.5, avgResponse: '0.8s' },
  { name: 'FedEx', status: 'Active', lastSync: '2024-05-07 09:30 AM', apiCalls: 189, successRate: 97.2, avgResponse: '1.1s' },
  { name: 'UPS', status: 'Warning', lastSync: '2024-05-07 09:10 AM', apiCalls: 156, successRate: 92.1, avgResponse: '1.5s' },
  { name: 'Aramex', status: 'Active', lastSync: '2024-05-07 08:50 AM', apiCalls: 98, successRate: 99.1, avgResponse: '0.9s' },
  { name: 'USPS', status: 'Inactive', lastSync: '2024-05-06 15:30 PM', apiCalls: 0, successRate: 0, avgResponse: 'N/A' },
];

export default function CourierIntegrationLogs() {
  const [apiKey, setApiKey] = useState("demo-key-123456789");
  const [autoSync, setAutoSync] = useState(true);
  const [logsPage, setLogsPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const [statusFilter, setStatusFilter] = useState('');
  const [courierFilter, setCourierFilter] = useState('');
  const [search, setSearch] = useState('');

  const logsPerPage = 5;
  const totalPages = Math.ceil(mockLogs.length / logsPerPage);
  const pagedLogs = mockLogs.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  // Analytics data
  const analytics = {
    totalCouriers: mockCouriers.length,
    activeCouriers: mockCouriers.filter(c => c.status === 'Active').length,
    totalApiCalls: 677,
    successfulCalls: 654,
    failedCalls: 23,
    successRate: 96.6,
    lastSync: '2024-05-07 10:00 AM',
    avgResponseTime: '1.1s',
    totalShipments: 1247
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
              <p className="text-sm text-gray-500">Courier: {log.courier}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">{log.time}</span>
        </div>
        <p className="text-sm text-gray-600">{log.details}</p>
      </div>
    );
  };

  const CourierCard = ({ courier }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Warning': return 'bg-yellow-100 text-yellow-800';
        case 'Inactive': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{courier.name}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(courier.status)}`}>
                {courier.status}
              </span>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Last Sync:</span>
            <span className="text-gray-900">{courier.lastSync}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">API Calls:</span>
            <span className="text-gray-900">{courier.apiCalls}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Success Rate:</span>
            <span className="text-gray-900">{courier.successRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg Response:</span>
            <span className="text-gray-900">{courier.avgResponse}</span>
          </div>
        </div>
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
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Truck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courier Integration & API Logs</h1>
                    <p className="text-gray-600">Connect and manage your courier/shipping integrations</p>
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
                    <span className="text-sm text-gray-600">{analytics.totalApiCalls} API calls today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{analytics.totalShipments} shipments tracked</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
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
            title="Active Couriers"
            value={analytics.activeCouriers}
            change="+1"
            trend="up"
            icon={Truck}
            color="blue"
          />
          <MetricCard
            title="Success Rate"
            value={`${analytics.successRate}%`}
            change="+1.2%"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="API Calls"
            value={analytics.totalApiCalls}
            change="+15.3%"
            trend="up"
            icon={Activity}
            color="purple"
          />
          <MetricCard
            title="Avg Response"
            value={analytics.avgResponseTime}
            change="-0.2s"
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
              <p className="text-2xl font-bold text-green-600">{analytics.successfulCalls}</p>
              <p className="text-sm text-green-700">Successful Calls</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{analytics.failedCalls}</p>
              <p className="text-sm text-red-700">Failed Calls</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{analytics.totalShipments}</p>
              <p className="text-sm text-blue-700">Total Shipments</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{analytics.lastSync}</p>
              <p className="text-sm text-purple-700">Last Sync</p>
            </div>
          </div>
        </div>

        {/* Courier Status Grid */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Courier Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCouriers.map((courier, index) => (
              <CourierCard key={index} courier={courier} />
            ))}
          </div>
        </div>

        {/* Integration Setup */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Setup</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Credentials
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Endpoint</label>
              <input
                type="text"
                value="https://api.courier.com/v1/"
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
              />
              <button className="w-full mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Test Connection
              </button>
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
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Sync Now</span>
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
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={courierFilter}
                onChange={(e) => setCourierFilter(e.target.value)}
              >
                <option value="">All Couriers</option>
                <option value="DHL">DHL</option>
                <option value="FedEx">FedEx</option>
                <option value="UPS">UPS</option>
                <option value="Aramex">Aramex</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('');
                  setCourierFilter('');
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

        {/* API Logs Display */}
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courier</th>
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
                        <p className="text-sm text-gray-900">{log.courier}</p>
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