import React, { useState } from "react";

export default function D2CManagement() {
  const [factoryFilter, setFactoryFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🏭 D2C (Factory to Customer)</h1>

      {/* Factory Registration */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Factory Registration</h2>
        <button className="mb-2 px-4 py-2 bg-green-600 text-white rounded">
          Apply as Factory Vendor
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Upload Business License</label>
            <input type="file" className="block w-full mb-2 p-2 border rounded" />
          </div>
          <div>
            <label>Upload ID</label>
            <input type="file" className="block w-full mb-2 p-2 border rounded" />
          </div>
          <button className="mb-2 px-4 py-2 bg-blue-600 text-white rounded">
            Complete KYC Verification
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Assign Country Manager</label>
            <select className="w-full p-2 border rounded mb-2">
              <option>Country Manager 1</option>
              <option>Country Manager 2</option>
            </select>
          </div>
          <div>
            <label>Commission & Tax Settings</label>
            <input
              type="number"
              className="w-full p-2 border rounded mb-2"
              placeholder="Set Commission"
            />
          </div>
          <div>
            <label>Currency Settings</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Set Currency"
            />
          </div>
        </div>
      </section>

      {/* Add/Edit D2C Product */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Add/Edit D2C Product</h2>
        <input
          type="text"
          placeholder="Search by Product"
          className="block w-full mb-2 p-2 border rounded"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        />
        <button className="mb-2 px-4 py-2 bg-blue-600 text-white rounded">Add Product</button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Product Name</label>
            <input type="text" className="block w-full mb-2 p-2 border rounded" />
          </div>
          <div>
            <label>Product Description</label>
            <textarea className="block w-full mb-2 p-2 border rounded"></textarea>
          </div>
        </div>
        <div>
          <label>Factory Inventory</label>
          <input type="number" className="w-full p-2 mb-2 border rounded" placeholder="Stock" />
        </div>
        <button className="mb-2 px-4 py-2 bg-yellow-600 text-white rounded">Publish Product</button>
      </section>

      {/* D2C Order Management */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">D2C Order Management</h2>
        <input
          type="text"
          placeholder="Search by Order ID / Customer Name"
          className="block w-full mb-2 p-2 border rounded"
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
        />
        <button className="mb-2 px-4 py-2 bg-green-600 text-white rounded">View Orders</button>
        <div>
          <label>Track Shipment</label>
          <input type="text" className="block w-full mb-2 p-2 border rounded" placeholder="Track Shipment ID" />
        </div>
        <button className="mb-2 px-4 py-2 bg-red-600 text-white rounded">Escalate/Dispute</button>
        <div className="mt-2">
          <label>Payment Settlement</label>
          <input type="number" className="block w-full p-2 mb-2 border rounded" placeholder="Amount Settled" />
        </div>
      </section>

      {/* Shipping Zones & Options */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Shipping Zones & Options</h2>
        <button className="mb-2 px-4 py-2 bg-teal-600 text-white rounded">Define Shipping Countries</button>
        <button className="mb-2 px-4 py-2 bg-purple-600 text-white rounded">Connect Regional Couriers</button>
        <div>
          <label>Estimated Delivery Time</label>
          <input type="text" className="block w-full mb-2 p-2 border rounded" placeholder="Delivery Time" />
        </div>
        <div>
          <label>Country-Based Shipping Price Override</label>
          <input
            type="text"
            className="block w-full p-2 mb-2 border rounded"
            placeholder="Override Price per Country"
          />
        </div>
      </section>

      {/* Factory Dashboard (Analytics & Finance) */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Factory Dashboard</h2>
        <button className="mb-2 px-4 py-2 bg-indigo-600 text-white rounded">View Global Sales Breakdown</button>
        <div>
          <label>Withdrawable Earnings</label>
          <input type="number" className="w-full p-2 mb-2 border rounded" placeholder="Earnings" />
        </div>
        <button className="mb-2 px-4 py-2 bg-orange-600 text-white rounded">View Popular Products</button>
        <button className="mb-2 px-4 py-2 bg-pink-600 text-white rounded">Customer Reviews & Ratings</button>
      </section>

      {/* Storefront Branding & Localization */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Storefront Branding & Localization</h2>
        <button className="mb-2 px-4 py-2 bg-blue-600 text-white rounded">Edit Factory Profile</button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Localized Storefront</label>
            <select className="block w-full p-2 mb-2 border rounded">
              <option>English - USD</option>
              <option>French - EUR</option>
            </select>
          </div>
          <div>
            <label>Featured Product Highlighting</label>
            <input type="text" className="block w-full mb-2 p-2 border rounded" placeholder="Featured Product ID" />
          </div>
        </div>
        <button className="mb-2 px-4 py-2 bg-gray-600 text-white rounded">Link Social Media & Website</button>
      </section>
    </div>
  );
}
