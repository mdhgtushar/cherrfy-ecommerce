import React, { useState } from "react";
import { 
  Tag, 
  Plus, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Eye, 
  Edit, 
  Trash, 
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Package,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  FileText,
  Activity,
  Settings,
  Send,
  Target,
  Star,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Search,
  RefreshCw
} from "lucide-react";

const mockCampaigns = [
  { 
    id: 'CAMP-001',
    name: 'Spring Sale 2024', 
    type: 'Discount', 
    status: 'Active', 
    start: '2024-04-01', 
    end: '2024-04-30',
    discount: '20%',
    target: 'All Products',
    revenue: 15420,
    orders: 234,
    customers: 189,
    conversion: '3.2%',
    description: 'Spring season sale with 20% off on all products'
  },
  { 
    id: 'CAMP-002',
    name: 'BOGO Weekend', 
    type: 'BOGO', 
    status: 'Scheduled', 
    start: '2024-05-10', 
    end: '2024-05-12',
    discount: 'Buy 1 Get 1',
    target: 'Electronics',
    revenue: 0,
    orders: 0,
    customers: 0,
    conversion: '0%',
    description: 'Buy one get one free on selected electronics'
  },
  { 
    id: 'CAMP-003',
    name: 'Flash Sale', 
    type: 'Flash', 
    status: 'Ended', 
    start: '2024-03-15', 
    end: '2024-03-16',
    discount: '50%',
    target: 'Fashion',
    revenue: 8920,
    orders: 156,
    customers: 134,
    conversion: '4.8%',
    description: '24-hour flash sale with 50% off on fashion items'
  },
  { 
    id: 'CAMP-004',
    name: 'VIP Exclusive', 
    type: 'Discount', 
    status: 'Active', 
    start: '2024-04-15', 
    end: '2024-05-15',
    discount: '25%',
    target: 'VIP Customers',
    revenue: 23450,
    orders: 89,
    customers: 67,
    conversion: '5.2%',
    description: 'Exclusive discount for VIP customers'
  },
  { 
    id: 'CAMP-005',
    name: 'Summer Kickoff', 
    type: 'Discount', 
    status: 'Scheduled', 
    start: '2024-06-01', 
    end: '2024-06-07',
    discount: '15%',
    target: 'Summer Collection',
    revenue: 0,
    orders: 0,
    customers: 0,
    conversion: '0%',
    description: 'Summer collection launch with 15% discount'
  },
  { 
    id: 'CAMP-006',
    name: 'Clearance Sale', 
    type: 'Discount', 
    status: 'Ended', 
    start: '2024-02-01', 
    end: '2024-02-28',
    discount: '40%',
    target: 'Clearance Items',
    revenue: 18760,
    orders: 298,
    customers: 245,
    conversion: '3.8%',
    description: 'Clearance sale with up to 40% off'
  }
];

const statusConfig = {
  Active: { color: 'green', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-800' },
  Scheduled: { color: 'blue', icon: Clock, bg: 'bg-blue-100', text: 'text-blue-800' },
  Ended: { color: 'gray', icon: XCircle, bg: 'bg-gray-100', text: 'text-gray-800' },
  Paused: { color: 'yellow', icon: AlertTriangle, bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

const typeConfig = {
  Discount: { color: 'blue', icon: Tag, bg: 'bg-blue-100', text: 'text-blue-800' },
  BOGO: { color: 'purple', icon: Package, bg: 'bg-purple-100', text: 'text-purple-800' },
  Flash: { color: 'red', icon: Clock, bg: 'bg-red-100', text: 'text-red-800' }
};

export default function CampaignsDiscounts() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = !search || 
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    const matchesType = !typeFilter || campaign.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Analytics data
  const analytics = {
    total: mockCampaigns.length,
    active: mockCampaigns.filter(c => c.status === 'Active').length,
    scheduled: mockCampaigns.filter(c => c.status === 'Scheduled').length,
    ended: mockCampaigns.filter(c => c.status === 'Ended').length,
    totalRevenue: mockCampaigns.reduce((sum, c) => sum + c.revenue, 0),
    totalOrders: mockCampaigns.reduce((sum, c) => sum + c.orders, 0),
    totalCustomers: mockCampaigns.reduce((sum, c) => sum + c.customers, 0),
    avgConversion: (mockCampaigns.reduce((sum, c) => sum + parseFloat(c.conversion), 0) / mockCampaigns.length).toFixed(1)
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

  const CampaignCard = ({ campaign }) => {
    const status = statusConfig[campaign.status];
    const type = typeConfig[campaign.type];
    const StatusIcon = status.icon;
    const TypeIcon = type.icon;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${type.bg}`}>
              <TypeIcon className={`w-5 h-5 ${type.text}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
              <p className="text-sm text-gray-500">{campaign.id}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span>{campaign.status}</span>
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">{campaign.description}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Discount</p>
              <p className="font-semibold text-gray-900">{campaign.discount}</p>
            </div>
            <div>
              <p className="text-gray-600">Target</p>
              <p className="font-semibold text-gray-900">{campaign.target}</p>
            </div>
            <div>
              <p className="text-gray-600">Revenue</p>
              <p className="font-semibold text-gray-900">${campaign.revenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Orders</p>
              <p className="font-semibold text-gray-900">{campaign.orders}</p>
            </div>
            <div>
              <p className="text-gray-600">Customers</p>
              <p className="font-semibold text-gray-900">{campaign.customers}</p>
            </div>
            <div>
              <p className="text-gray-600">Conversion</p>
              <p className="font-semibold text-gray-900">{campaign.conversion}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campaigns & Discounts</h1>
              <p className="text-gray-600 mt-2">Create, manage, and track marketing campaigns and discounts</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Campaigns"
            value={analytics.total}
            change="+12.5%"
            trend="up"
            icon={Tag}
            color="blue"
          />
          <MetricCard
            title="Active Campaigns"
            value={analytics.active}
            change="+8.2%"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="Total Revenue"
            value={`$${analytics.totalRevenue.toLocaleString()}`}
            change="+15.3%"
            trend="up"
            icon={DollarSign}
            color="purple"
          />
          <MetricCard
            title="Avg Conversion"
            value={`${analytics.avgConversion}%`}
            change="+2.1%"
            trend="up"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* Campaign Performance Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{analytics.active}</p>
              <p className="text-sm text-green-700">Active</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{analytics.scheduled}</p>
              <p className="text-sm text-blue-700">Scheduled</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <XCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-600">{analytics.ended}</p>
              <p className="text-sm text-gray-700">Ended</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{analytics.totalCustomers}</p>
              <p className="text-sm text-purple-700">Customers</p>
            </div>
          </div>
        </div>

        {/* Create Campaign Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Name</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Summer Sale" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Discount</option>
                  <option>BOGO</option>
                  <option>Flash Sale</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input type="date" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input type="date" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="Describe the offer, e.g. 20% off all shoes."></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
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
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Ended">Ended</option>
                <option value="Paused">Paused</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Discount">Discount</option>
                <option value="BOGO">BOGO</option>
                <option value="Flash">Flash Sale</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('');
                  setTypeFilter('');
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

        {/* Campaigns Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No campaigns found matching your criteria.</p>
              </div>
            ) : (
              filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p>No campaigns found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((campaign) => {
                    const status = statusConfig[campaign.status];
                    const type = typeConfig[campaign.type];
                    const StatusIcon = status.icon;
                    const TypeIcon = type.icon;

                    return (
                      <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{campaign.name}</p>
                            <p className="text-sm text-gray-500">{campaign.id}</p>
                            <p className="text-sm text-gray-500">{campaign.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${type.bg} ${type.text}`}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {campaign.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Revenue:</span>
                              <span className="font-medium">${campaign.revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Orders:</span>
                              <span className="font-medium">{campaign.orders}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Conversion:</span>
                              <span className="font-medium">{campaign.conversion}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 