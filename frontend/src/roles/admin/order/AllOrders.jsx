import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Trash, 
  Pencil, 
  Eye, 
  Printer, 
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Package,
  DollarSign,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  FileText,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const mockOrders = [
  { 
    id: 'ORD-2024-001', 
    customer: 'John Doe', 
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    date: '2024-06-01', 
    status: 'Pending', 
    total: 120.50, 
    items: 3, 
    payment: 'Credit Card',
    shipping: 'Express',
    address: '123 Main St, New York, NY 10001',
    products: ['Wireless Earbuds Pro', 'Phone Case', 'USB Cable']
  },
  { 
    id: 'ORD-2024-002', 
    customer: 'Jane Smith', 
    email: 'jane.smith@email.com',
    phone: '+1 (555) 987-6543',
    date: '2024-06-02', 
    status: 'Shipped', 
    total: 89.99, 
    items: 2, 
    payment: 'PayPal',
    shipping: 'Standard',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    products: ['Smart Watch Series 5', 'Bluetooth Speaker']
  },
  { 
    id: 'ORD-2024-003', 
    customer: 'Alice Johnson', 
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 456-7890',
    date: '2024-06-03', 
    status: 'Delivered', 
    total: 45.00, 
    items: 1, 
    payment: 'Credit Card',
    shipping: 'Standard',
    address: '789 Pine Rd, Chicago, IL 60601',
    products: ['Phone Case Premium']
  },
  { 
    id: 'ORD-2024-004', 
    customer: 'Bob Wilson', 
    email: 'bob.wilson@email.com',
    phone: '+1 (555) 321-0987',
    date: '2024-06-04', 
    status: 'Cancelled', 
    total: 200.00, 
    items: 4, 
    payment: 'Credit Card',
    shipping: 'Express',
    address: '321 Elm St, Miami, FL 33101',
    products: ['Wireless Earbuds Pro', 'Smart Watch', 'Bluetooth Speaker', 'Phone Case']
  },
  { 
    id: 'ORD-2024-005', 
    customer: 'Sarah Davis', 
    email: 'sarah.davis@email.com',
    phone: '+1 (555) 654-3210',
    date: '2024-06-05', 
    status: 'Processing', 
    total: 156.75, 
    items: 3, 
    payment: 'PayPal',
    shipping: 'Standard',
    address: '654 Maple Dr, Seattle, WA 98101',
    products: ['Bluetooth Speaker', 'USB-C Cable Pack', 'Phone Case Premium']
  },
  { 
    id: 'ORD-2024-006', 
    customer: 'Mike Brown', 
    email: 'mike.brown@email.com',
    phone: '+1 (555) 789-0123',
    date: '2024-06-06', 
    status: 'Shipped', 
    total: 78.25, 
    items: 2, 
    payment: 'Credit Card',
    shipping: 'Express',
    address: '987 Cedar Ln, Austin, TX 73301',
    products: ['Wireless Earbuds Pro', 'USB-C Cable Pack']
  }
];

const statusConfig = {
  Pending: { color: 'yellow', icon: Clock, bg: 'bg-yellow-100', text: 'text-yellow-800' },
  Processing: { color: 'blue', icon: Package, bg: 'bg-blue-100', text: 'text-blue-800' },
  Shipped: { color: 'purple', icon: Package, bg: 'bg-purple-100', text: 'text-purple-800' },
  Delivered: { color: 'green', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-800' },
  Cancelled: { color: 'red', icon: XCircle, bg: 'bg-red-100', text: 'text-red-800' }
};

const AllOrders = () => {
  const [search, setSearch] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // table or grid

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = !search || 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesDate = !dateFilter || order.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  // Analytics data
  const analytics = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'Pending').length,
    processing: mockOrders.filter(o => o.status === 'Processing').length,
    shipped: mockOrders.filter(o => o.status === 'Shipped').length,
    delivered: mockOrders.filter(o => o.status === 'Delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'Cancelled').length,
    revenue: mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2),
    avgOrderValue: (mockOrders.reduce((sum, o) => sum + o.total, 0) / mockOrders.length).toFixed(2),
    totalItems: mockOrders.reduce((sum, o) => sum + o.items, 0)
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

  const OrderCard = ({ order }) => {
    const status = statusConfig[order.status];
    const StatusIcon = status.icon;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedOrders.includes(order.id)}
              onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{order.id}</h3>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span>{order.status}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900">{order.customer}</p>
            <p className="text-sm text-gray-500">{order.email}</p>
            <p className="text-sm text-gray-500">{order.phone}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="font-semibold text-gray-900">{order.items}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment</p>
              <p className="font-semibold text-gray-900">{order.payment}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                  <Printer className="w-4 h-4" />
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
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-2">Track and manage customer orders efficiently</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Orders"
            value={analytics.total}
            change="+12.5%"
            trend="up"
            icon={FileText}
            color="blue"
          />
          <MetricCard
            title="Total Revenue"
            value={`$${analytics.revenue}`}
            change="+8.2%"
            trend="up"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Pending Orders"
            value={analytics.pending}
            change="+5.3%"
            trend="up"
            icon={Clock}
            color="yellow"
          />
          <MetricCard
            title="Avg Order Value"
            value={`$${analytics.avgOrderValue}`}
            change="+2.1%"
            trend="up"
            icon={TrendingUp}
            color="purple"
          />
        </div>

        {/* Order Status Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{analytics.pending}</p>
              <p className="text-sm text-yellow-700">Pending</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{analytics.processing}</p>
              <p className="text-sm text-blue-700">Processing</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{analytics.shipped}</p>
              <p className="text-sm text-purple-700">Shipped</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{analytics.delivered}</p>
              <p className="text-sm text-green-700">Delivered</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{analytics.cancelled}</p>
              <p className="text-sm text-red-700">Cancelled</p>
            </div>
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
                  placeholder="Search by Order ID, Customer, Email..."
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
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">All Dates</option>
                <option value="2024-06-01">June 1, 2024</option>
                <option value="2024-06-02">June 2, 2024</option>
                <option value="2024-06-03">June 3, 2024</option>
                <option value="2024-06-04">June 4, 2024</option>
                <option value="2024-06-05">June 5, 2024</option>
                <option value="2024-06-06">June 6, 2024</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
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

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 flex items-center justify-between">
            <span className="text-blue-700 font-medium">
              {selectedOrders.length} order(s) selected
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Update Status
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* Orders Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p>No orders found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const status = statusConfig[order.status];
                    const StatusIcon = status.icon;

                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.items} items</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">{order.payment}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                              <Printer className="w-4 h-4" />
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
};

export default AllOrders; 