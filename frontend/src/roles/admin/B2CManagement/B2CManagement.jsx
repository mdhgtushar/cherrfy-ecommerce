import React, { useState } from "react";

export default function B2CManagement() {
  const [customerFilter, setCustomerFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [wishlistFilter, setWishlistFilter] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">💼 B2C Management</h1>

      {/* Customer List */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Customer List</h2>
        <input
          type="text"
          placeholder="Search by Country / Email / Order Count"
          className="block w-full mb-2 p-2 border rounded"
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
        />
        <select className="block w-full mb-2 p-2 border rounded">
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="guest">Guest</option>
        </select>
        <button className="mb-2 px-4 py-2 bg-blue-600 text-white rounded">View All Customers</button>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Customer 1</p>
            <p className="text-gray-600">Status: Active</p>
          </div>
          {/* More customers listed here */}
        </div>
      </section>

      {/* Orders (by Customer) */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Orders (by Customer)</h2>
        <input
          type="text"
          placeholder="Search by Customer Name / Email / Order ID"
          className="block w-full mb-2 p-2 border rounded"
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
        />
        <button className="mb-2 px-4 py-2 bg-green-600 text-white rounded">View Orders</button>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Order #12345 - Pending</li>
          {/* More orders */}
        </ul>
      </section>

      {/* Wishlist & Cart Overview */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Wishlist & Cart Overview</h2>
        <input
          type="text"
          placeholder="Search Wishlist by Product"
          className="block w-full mb-2 p-2 border rounded"
          value={wishlistFilter}
          onChange={(e) => setWishlistFilter(e.target.value)}
        />
        <button className="mb-2 px-4 py-2 bg-yellow-600 text-white rounded">View Wishlist Products</button>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Product 1 in Wishlist</p>
          </div>
          {/* More wishlist items */}
        </div>
      </section>

      {/* Reviews & Feedback */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Reviews & Feedback</h2>
        <button className="mb-2 px-4 py-2 bg-purple-600 text-white rounded">Moderate Reviews</button>
        <div className="grid grid-cols-2 gap-2">
          <label><input type="checkbox" /> Approve</label>
          <label><input type="checkbox" /> Hide</label>
          <label><input type="checkbox" /> Reply</label>
        </div>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Reviewed Product #123 - 5 stars</li>
          {/* More reviews */}
        </ul>
      </section>

      {/* B2C Pricing Rules */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">B2C Pricing Rules</h2>
        <button className="mb-2 px-4 py-2 bg-red-600 text-white rounded">Manage Pricing Rules</button>
        <div>
          <label>Country-Specific Pricing Override</label>
          <input type="text" className="block w-full p-2 mb-2 border rounded" placeholder="Enter Country Override" />
        </div>
      </section>

      {/* Coupons / Flash Sales */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Coupons / Flash Sales</h2>
        <button className="mb-2 px-4 py-2 bg-orange-600 text-white rounded">Create Coupon</button>
        <button className="mb-2 px-4 py-2 bg-teal-600 text-white rounded">Schedule Flash Sale</button>
      </section>

      {/* Loyalty & Referral Points */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Loyalty & Referral Points</h2>
        <button className="mb-2 px-4 py-2 bg-indigo-600 text-white rounded">View Earned Points</button>
        <button className="mb-2 px-4 py-2 bg-pink-600 text-white rounded">Manage Referral Links</button>
        <button className="mb-2 px-4 py-2 bg-gray-600 text-white rounded">Fraud Detection</button>
      </section>
    </div>
  );
}
