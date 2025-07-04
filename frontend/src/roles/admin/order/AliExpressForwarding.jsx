import React from 'react';

const mockAliOrders = [
  { id: 'AE-001', product: 'Product A', country: 'USA', shipping: 'AliExpress Standard', status: 'Placed', aeOrderId: 'AEX-123', syncLog: 'Synced' },
  { id: 'AE-002', product: 'Product B', country: 'UK', shipping: 'AliExpress Saver', status: 'Shipped', aeOrderId: 'AEX-456', syncLog: 'Pending' },
];

const AliExpressForwarding = () => (
  <div className="max-w-5xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-700">AliExpress Order Forwarding</h2>
    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">AE Order ID</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sync Log</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {mockAliOrders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-mono text-blue-700">{order.id}</td>
            <td className="px-4 py-3">{order.product}</td>
            <td className="px-4 py-3">{order.country}</td>
            <td className="px-4 py-3">{order.shipping}</td>
            <td className="px-4 py-3">{order.status}</td>
            <td className="px-4 py-3">{order.aeOrderId}</td>
            <td className="px-4 py-3">{order.syncLog}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AliExpressForwarding; 