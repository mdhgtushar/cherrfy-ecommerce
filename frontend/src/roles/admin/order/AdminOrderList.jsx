import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../features/orderSlice';

const statusColors = {
  Pending: 'bg-yellow-400',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-400',
};

const AdminOrderList = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const [search, setSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!search) {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter(
          (order) =>
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            (order.customer && order.customer.toLowerCase().includes(search.toLowerCase())) ||
            (order.status && order.status.toLowerCase().includes(search.toLowerCase()))
        )
      );
    }
  }, [orders, search]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-blue-700">All Orders</h2>
        <input
          type="text"
          placeholder="Search by Order ID, Customer, Status..."
          className="border rounded px-4 py-2 w-full md:w-80 focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {status === 'loading' && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-blue-500 font-semibold">Loading orders...</td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-red-500 font-semibold">{error || 'Failed to load orders.'}</td>
              </tr>
            )}
            {status === 'succeeded' && filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">No orders found.</td>
              </tr>
            )}
            {status === 'succeeded' && filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-mono text-blue-700">{order.id}</td>
                <td className="px-4 py-3">{order.customer || '-'}</td>
                <td className="px-4 py-3">{order.date || '-'}</td>
                <td className="px-4 py-3">{order.items || '-'}</td>
                <td className="px-4 py-3">{order.total ? order.total.toFixed(2) : '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-white px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-400'}`}>
                    {order.status || 'Unknown'}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">View</button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs">Update</button>
                  <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs">Export</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList; 