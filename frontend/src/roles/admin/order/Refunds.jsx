import React from 'react';

const mockRefunds = [
  { id: 'REF-001', orderId: 'ORD-001', customer: 'John Doe', amount: 40, status: 'Pending', reason: 'Product damaged' },
  { id: 'REF-002', orderId: 'ORD-002', customer: 'Jane Smith', amount: 20, status: 'Completed', reason: 'Wrong item' },
];

const Refunds = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-700">Refund Handling</h2>
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Refund ID</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {mockRefunds.map((refund) => (
          <tr key={refund.id} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-mono text-blue-700">{refund.id}</td>
            <td className="px-4 py-3">{refund.orderId}</td>
            <td className="px-4 py-3">{refund.customer}</td>
            <td className="px-4 py-3">${refund.amount.toFixed(2)}</td>
            <td className="px-4 py-3">{refund.status}</td>
            <td className="px-4 py-3">{refund.reason}</td>
            <td className="px-4 py-3 space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">View</button>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs">Process</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Refunds; 