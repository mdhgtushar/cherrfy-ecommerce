import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Mock data - replace with actual API call
  const mockOrders = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      status: "pending",
      total: 125.50,
      items: 3,
      orderDate: "2024-01-15",
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      status: "processing",
      total: 89.99,
      items: 2,
      orderDate: "2024-01-14",
      shippingAddress: "456 Oak Ave, Toronto, ON M5V 3A8",
      paymentMethod: "PayPal"
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      status: "shipped",
      total: 245.00,
      items: 5,
      orderDate: "2024-01-13",
      shippingAddress: "789 High St, London, UK SW1A 1AA",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "ORD-004",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      status: "delivered",
      total: 67.25,
      items: 1,
      orderDate: "2024-01-12",
      shippingAddress: "321 Queen St, Sydney, NSW 2000",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-005",
      customerName: "David Brown",
      customerEmail: "david@example.com",
      status: "cancelled",
      total: 156.75,
      items: 4,
      orderDate: "2024-01-11",
      shippingAddress: "654 Pine Rd, Vancouver, BC V6B 1A1",
      paymentMethod: "Credit Card"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by search term
    if (orderFilter) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(orderFilter.toLowerCase()) ||
        order.customerName.toLowerCase().includes(orderFilter.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(orderFilter.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);
          break;
        default:
          break;
      }
    }

    setFilteredOrders(filtered);
  }, [orders, orderFilter, statusFilter, dateFilter]);

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length && filteredOrders.length > 0) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on orders:`, selectedOrders);
    // Implement bulk actions
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      refunded: "bg-gray-100 text-gray-800"
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      pending: "⏳",
      processing: "🔄",
      shipped: "🚚",
      delivered: "✅",
      cancelled: "❌",
      refunded: "💰"
    };
    return statusIcons[status] || "❓";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Management</h2>
            <p className="text-gray-600">Track and manage all B2C customer orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Orders
                </label>
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Date
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Orders
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedOrders.length > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">
                  {selectedOrders.length} order(s) selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('process')}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Mark as Processing
                  </button>
                  <button
                    onClick={() => handleBulkAction('ship')}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleBulkAction('cancel')}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Cancel Orders
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Orders ({filteredOrders.length})
                </h3>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Select All</span>
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading orders...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(order.id)}
                              onChange={() => handleSelectOrder(order.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.id}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.items} items • {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getStatusIcon(order.status)}</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                            <button className="text-green-600 hover:text-green-900">Edit</button>
                            <button className="text-purple-600 hover:text-purple-900">Track</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filteredOrders.length === 0 && !loading && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
