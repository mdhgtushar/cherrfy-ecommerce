import React, { useState } from 'react';
import { Pencil, Printer, Download, Truck, CreditCard, History, Check, X } from 'lucide-react';

const mockOrder = {
  id: 'ORD-001',
  customer: 'John Doe',
  email: 'john@example.com',
  phone: '+1-555-0123',
  date: '2024-06-01',
  status: 'Pending',
  total: 120.5,
  items: [
    { sku: 'SKU-123', name: 'Product A', qty: 2, price: 40, total: 80 },
    { sku: 'SKU-456', name: 'Product B', qty: 1, price: 40.5, total: 40.5 },
  ],
  shipping: {
    method: 'Express',
    tracking: 'TRACK123456',
    address: '123 Main St, City, Country',
    cost: 15.0,
  },
  payment: {
    method: 'Credit Card',
    gatewayRef: 'PAY-789',
    status: 'Paid',
  },
  statusHistory: [
    { status: 'Order Placed', date: '2024-06-01 10:30', by: 'Customer' },
    { status: 'Payment Confirmed', date: '2024-06-01 10:35', by: 'System' },
    { status: 'Processing', date: '2024-06-01 14:20', by: 'Admin' },
  ],
};

const OrderDetails = () => {
  const [currentStatus, setCurrentStatus] = useState(mockOrder.status);

  const statusColors = {
    'Order Placed': 'bg-blue-500',
    'Payment Confirmed': 'bg-green-500',
    'Processing': 'bg-yellow-500',
    'Shipped': 'bg-purple-500',
    'Delivered': 'bg-green-600',
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Actions */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <p className="text-gray-600">Order #{mockOrder.id} • {mockOrder.date}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              <Pencil /> Edit Order
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2">
              <Printer /> Print
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2">
              <Download /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Check className="text-blue-600" /> Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{mockOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-block px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold">
                  {currentStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{mockOrder.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-lg">${mockOrder.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SKU</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Qty</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrder.items.map((item) => (
                    <tr key={item.sku} className="border-b">
                      <td className="px-4 py-2 text-sm">{item.sku}</td>
                      <td className="px-4 py-2 text-sm font-medium">{item.name}</td>
                      <td className="px-4 py-2 text-sm">{item.qty}</td>
                      <td className="px-4 py-2 text-sm">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm font-semibold">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <History className="text-blue-600" /> Status Timeline
            </h3>
            <div className="space-y-4">
              {mockOrder.statusHistory.map((status, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${statusColors[status.status] || 'bg-gray-400'}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{status.status}</p>
                    <p className="text-sm text-gray-600">{status.date} by {status.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{mockOrder.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{mockOrder.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{mockOrder.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="text-blue-600" /> Shipping
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Method</p>
                <p className="font-semibold">{mockOrder.shipping.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tracking</p>
                <p className="font-semibold text-blue-600">{mockOrder.shipping.tracking}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold text-sm">{mockOrder.shipping.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cost</p>
                <p className="font-semibold">${mockOrder.shipping.cost.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="text-blue-600" /> Payment
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Method</p>
                <p className="font-semibold">{mockOrder.payment.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reference</p>
                <p className="font-semibold">{mockOrder.payment.gatewayRef}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                  {mockOrder.payment.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 