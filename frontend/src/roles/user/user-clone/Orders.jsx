import React from 'react';
import SharedLayout from './SharedLayout.jsx';

export default function Orders(){
  const orders = [
    { id: '17345', date: '2025-10-18', items: 3, total: 89.50, status: 'Out for Delivery', eta: 'Oct 23rd', tracking: '#' },
    { id: '17110', date: '2025-10-05', items: 1, total: 29.99, status: 'Delivered', eta: '-', tracking: '#' },
    { id: '17088', date: '2025-09-28', items: 2, total: 64.75, status: 'Processing', eta: '-', tracking: '#' },
  ];

  const inTransit = orders.filter(o => ['Out for Delivery','Shipped'].includes(o.status)).length;
  const delivered = orders.filter(o => o.status==='Delivered').length;
  const totalSpent = orders.reduce((c,o)=>c+o.total,0);

  const badge = (status) => {
    if (['Out for Delivery','Shipped'].includes(status)) return 'bg-blue-100 text-blue-700';
    if (status==='Delivered') return 'bg-green-100 text-green-700';
    if (status==='Processing') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <SharedLayout activeKey="orders" pageTitle="Your Orders">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E0E0E0] rounded p-4">
          <p className="text-xs text-gray-500">Orders in transit</p>
          <p className="text-2xl font-bold text-[#333333] mt-1">{inTransit}</p>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded p-4">
          <p className="text-xs text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-[#333333] mt-1">{delivered}</p>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded p-4">
          <p className="text-xs text-gray-500">Total spent</p>
          <p className="text-2xl font-bold text-[#333333] mt-1">${totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Orders</div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <input placeholder="Search order ID" className="w-52 border border-[#E0E0E0] rounded px-3 py-2 text-sm" />
              <select className="border border-[#E0E0E0] rounded px-3 py-2 text-sm">
                <option value="">All statuses</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="text-xs text-gray-500">Showing {orders.length} orders</div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-[#E0E0E0]">
                  <th className="py-2 pr-4">Order #</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Items</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">ETA</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-[#333333]">#{o.id}</td>
                    <td className="py-3 pr-4 text-gray-600">{o.date}</td>
                    <td className="py-3 pr-4 text-gray-600">{o.items}</td>
                    <td className="py-3 pr-4 text-[#333333] font-semibold">${o.total.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge(o.status)}`}>{o.status}</span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{o.eta}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <a href="#" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded">View</a>
                        {['Out for Delivery','Shipped'].includes(o.status) && (
                          <a href={o.tracking} className="text-xs bg-[#D2042D] hover:bg-[#FA0F3E] text-white px-2 py-1 rounded">Track</a>
                        )}
                        {o.status==='Delivered' && (
                          <a href="reviews.php" className="text-xs text-[#D2042D] hover:underline">Review</a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
