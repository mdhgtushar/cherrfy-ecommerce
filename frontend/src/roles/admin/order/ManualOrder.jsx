import React, { useState } from 'react';

const mockProducts = [
  { id: 'P-001', name: 'Product A', price: 40 },
  { id: 'P-002', name: 'Product B', price: 60 },
];

const ManualOrder = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [address, setAddress] = useState('');
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState('Cash');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Manual Order Placement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select Product</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">-- Choose --</option>
            {mockProducts.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Discount (%)</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Payment Method</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Offline">Offline</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Create Order</button>
      </form>
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">Order created successfully (mock)!</div>
      )}
    </div>
  );
};

export default ManualOrder; 