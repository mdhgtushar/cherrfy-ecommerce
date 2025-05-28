import React, { useState } from "react";

export default function AliExpressApiSys() {
  const [productId, setProductId] = useState("");
  const [bulkIds, setBulkIds] = useState("");
  const [autoSync, setAutoSync] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState("daily");
  const [token, setToken] = useState("abc123");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🔗 AliExpress API-SYS</h1>

      {/* Product Import */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Product Import</h2>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <textarea
          rows="3"
          placeholder="Bulk Product IDs (comma or newline separated)"
          value={bulkIds}
          onChange={(e) => setBulkIds(e.target.value)}
          className="block w-full p-2 border rounded mb-2"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Import Products</button>
      </section>

      {/* Product Sync */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Product Sync</h2>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={autoSync} onChange={() => setAutoSync(!autoSync)} />
          <span>Enable Auto Sync</span>
        </label>
        <select
          value={syncFrequency}
          onChange={(e) => setSyncFrequency(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Sync Now</button>
      </section>

      {/* SKU Manager */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">SKU Manager</h2>
        <button className="mr-2 px-4 py-2 bg-yellow-600 text-white rounded">Enable/Disable SKU</button>
        <button className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded">Replace SKU Image</button>
        <button className="px-4 py-2 bg-blue-700 text-white rounded">Set Custom SKU Code</button>
      </section>

      {/* Freight Info */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Freight Info Fetcher</h2>
        <button className="mr-2 px-4 py-2 bg-purple-600 text-white rounded">Fetch Shipping Cost</button>
        <button className="px-4 py-2 bg-green-700 text-white rounded">Save By Country & Carrier</button>
      </section>

      {/* Logistics Info */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Logistics Info Sync</h2>
        <button className="mr-2 px-4 py-2 bg-gray-700 text-white rounded">Sync Carriers</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Manual Refresh</button>
      </section>

      {/* API Token Manager */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">API Token Manager</h2>
        <p className="text-gray-700">Access Token: <span className="font-mono">{token}</span></p>
        <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded">Manual Refresh Token</button>
      </section>

      {/* Sync Logs */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Sync & Error Logs</h2>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Success: Product #123456 Synced</li>
          <li>Error: Invalid Signature for Product #789</li>
          <li>Last Sync: 2025-05-07 10:00 AM</li>
        </ul>
        <button className="mt-2 px-4 py-2 bg-black text-white rounded">Export Logs (CSV)</button>
      </section>
    </div>
  );
}
