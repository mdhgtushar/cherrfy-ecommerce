import React from 'react';

const mockFailedOrders = [
  { id: 'ORD-010', customer: 'Bob', date: '2024-06-05', reason: 'Payment Failed', status: 'Failed' },
  { id: 'ORD-011', customer: 'Eve', date: '2024-06-06', reason: 'Cancelled by User', status: 'Cancelled' },
];

const FailedOrders = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4 text-red-600">Failed / Cancelled Orders</h2>
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {mockFailedOrders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-mono text-blue-700">{order.id}</td>
            <td className="px-4 py-3">{order.customer}</td>
            <td className="px-4 py-3">{order.date}</td>
            <td className="px-4 py-3 text-red-500">{order.reason}</td>
            <td className="px-4 py-3">{order.status}</td>
            <td className="px-4 py-3 space-x-2">
              <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs">Retry</button>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs">Restore</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FailedOrders; 