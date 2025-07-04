import React, { useState } from 'react';
import { Filter, Download, Trash, Pencil, Eye, Printer } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2024-06-01', status: 'Pending', total: 120.5, items: 3, payment: 'Credit Card' },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2024-06-02', status: 'Shipped', total: 89.99, items: 2, payment: 'PayPal' },
  { id: 'ORD-003', customer: 'Alice Johnson', date: '2024-06-03', status: 'Delivered', total: 45.0, items: 1, payment: 'Credit Card' },
  { id: 'ORD-004', customer: 'Bob Wilson', date: '2024-06-04', status: 'Cancelled', total: 200.0, items: 4, payment: 'Credit Card' },
];

const statusColors = {
  Pending: 'bg-yellow-400',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-400',
};

const AllOrders = () => {
  const [search, setSearch] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = !search || 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  const summaryStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'Pending').length,
    shipped: mockOrders.filter(o => o.status === 'Shipped').length,
    revenue: mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2),
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Filter />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Shipped</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.shipped}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Pencil />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${summaryStats.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search by Order ID, Customer..."
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2"
            >
              <Filter /> Filters
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              <Download /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
          <span className="text-blue-700 font-medium">
            {selectedOrders.length} order(s) selected
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Update Status
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1">
              <Trash /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">No orders found.</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-blue-700">{order.id}</td>
                  <td className="px-4 py-3 font-medium">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  <td className="px-4 py-3">{order.items}</td>
                  <td className="px-4 py-3 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-600">{order.payment}</td>
                  <td className="px-4 py-3">
                    <span className={`text-white px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-400'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="View">
                        <Eye />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Edit">
                        <Pencil />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Print">
                        <Printer />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded" title="Delete">
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders; 