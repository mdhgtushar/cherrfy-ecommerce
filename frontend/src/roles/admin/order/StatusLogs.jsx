import React from 'react';

const mockStatusLogs = [
  { orderId: 'ORD-001', logs: [
    { status: 'Pending', date: '2024-06-01', by: 'Admin' },
    { status: 'Confirmed', date: '2024-06-01', by: 'System' },
    { status: 'Shipped', date: '2024-06-02', by: 'Admin' },
    { status: 'Delivered', date: '2024-06-03', by: 'Courier' },
  ]},
  { orderId: 'ORD-002', logs: [
    { status: 'Pending', date: '2024-06-02', by: 'Admin' },
    { status: 'Cancelled', date: '2024-06-03', by: 'User' },
  ]},
];

const StatusLogs = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-700">Order Status History Logs</h2>
    {mockStatusLogs.map((order) => (
      <div key={order.orderId} className="mb-6">
        <div className="font-semibold mb-2">Order ID: <span className="font-mono text-blue-700">{order.orderId}</span></div>
        <ul className="border-l-2 border-blue-300 pl-6">
          {order.logs.map((log, i) => (
            <li key={i} className="mb-2 relative">
              <span className="absolute -left-3 top-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="font-semibold text-gray-700">{log.status}</span> on <span className="text-gray-500">{log.date}</span> by <span className="text-gray-600">{log.by}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default StatusLogs; 