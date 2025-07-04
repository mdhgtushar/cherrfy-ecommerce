import React, { useState } from "react";

const mockLogs = [
  { type: 'success', message: 'Product #123456 Synced', time: '2025-05-07 10:00 AM' },
  { type: 'error', message: 'Invalid Signature for Product #789', time: '2025-05-07 09:55 AM' },
  { type: 'success', message: 'Product #654321 Synced', time: '2025-05-07 09:30 AM' },
  { type: 'error', message: 'Timeout for Product #111', time: '2025-05-07 09:10 AM' },
  { type: 'success', message: 'Product #222333 Synced', time: '2025-05-07 08:50 AM' },
  { type: 'success', message: 'Product #444555 Synced', time: '2025-05-07 08:30 AM' },
  { type: 'error', message: 'API Rate Limit', time: '2025-05-07 08:10 AM' },
  { type: 'success', message: 'Product #999888 Synced', time: '2025-05-07 07:50 AM' },
  { type: 'success', message: 'Product #777666 Synced', time: '2025-05-07 07:30 AM' },
  { type: 'error', message: 'Invalid Product ID #555', time: '2025-05-07 07:10 AM' },
  { type: 'success', message: 'Product #333222 Synced', time: '2025-05-07 06:50 AM' },
  { type: 'success', message: 'Product #111000 Synced', time: '2025-05-07 06:30 AM' },
];

export default function AliExpressApiSys() {
  const [productId, setProductId] = useState("");
  const [bulkIds, setBulkIds] = useState("");
  const [autoSync, setAutoSync] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState("daily");
  const [token, setToken] = useState("abc123");
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 5;
  const totalPages = Math.ceil(mockLogs.length / logsPerPage);
  const pagedLogs = mockLogs.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Overview Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">AliExpress Integration <span className="text-lg">🔗</span></h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Connect and manage your AliExpress integration. Import products, sync inventory, manage SKUs, and monitor integration health. For help, see the <a href="https://developers.aliexpress.com/en/doc.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">AliExpress API docs</a>.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500">Integration Status:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">Connected</span>
            <span className="text-xs text-gray-400">Last Sync: 2025-05-07 10:00 AM</span>
          </div>
        </div>

        {/* Product Import */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Product Import <span>📦</span></h2>
          <p className="text-gray-600 mb-4">Import single or multiple products from AliExpress by Product ID.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="block w-full mb-2 p-3 border rounded-lg"
              />
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Import Product</button>
            </div>
            <div>
              <textarea
                rows="3"
                placeholder="Bulk Product IDs (comma or newline separated)"
                value={bulkIds}
                onChange={(e) => setBulkIds(e.target.value)}
                className="block w-full p-3 border rounded-lg mb-2"
              />
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Bulk Import</button>
            </div>
          </div>
        </section>

        {/* Product Sync */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Product Sync <span>🔄</span></h2>
          <p className="text-gray-600 mb-4">Keep your product data up to date with AliExpress. Enable auto-sync or trigger a manual sync.</p>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={autoSync} onChange={() => setAutoSync(!autoSync)} />
              <span>Enable Auto Sync</span>
            </label>
            <select
              value={syncFrequency}
              onChange={(e) => setSyncFrequency(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Sync Now</button>
          </div>
        </section>

        {/* SKU Manager */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">SKU Manager <span>🔢</span></h2>
          <p className="text-gray-600 mb-4">Manage SKUs for imported products. Enable/disable, replace images, or set custom codes.</p>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition">Enable/Disable SKU</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Replace SKU Image</button>
            <button className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition">Set Custom SKU Code</button>
          </div>
        </section>

        {/* Freight Info */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Freight Info Fetcher <span>🚚</span></h2>
          <p className="text-gray-600 mb-4">Fetch and save shipping cost information by country and carrier.</p>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">Fetch Shipping Cost</button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition">Save By Country & Carrier</button>
          </div>
        </section>

        {/* Logistics Info */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Logistics Info Sync <span>📦</span></h2>
          <p className="text-gray-600 mb-4">Sync and refresh logistics/carrier information for your store.</p>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition">Sync Carriers</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">Manual Refresh</button>
          </div>
        </section>

        {/* API Token Manager */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">API Token Manager <span>🔑</span></h2>
          <p className="text-gray-600 mb-4">Manage your AliExpress API access token. Refresh as needed to maintain integration.</p>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-gray-700">Access Token: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{token}</span></span>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">Manual Refresh Token</button>
          </div>
        </section>

        {/* Sync Logs with Pagination */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Sync & Error Logs <span>📝</span></h2>
          <p className="text-gray-600 mb-4">View recent sync and error logs. Use pagination to browse history.</p>
          <ul className="divide-y divide-gray-200 mb-4">
            {pagedLogs.map((log, idx) => (
              <li key={idx} className="py-2 flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${log.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{log.type === 'success' ? 'Success' : 'Error'}</span>
                <span className="flex-1 text-gray-700">{log.message}</span>
                <span className="text-xs text-gray-400">{log.time}</span>
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          <div className="flex items-center justify-between">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setLogsPage((p) => Math.max(1, p - 1))}
              disabled={logsPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {logsPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setLogsPage((p) => Math.min(totalPages, p + 1))}
              disabled={logsPage === totalPages}
            >
              Next
            </button>
            <button className="ml-4 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition">Export Logs (CSV)</button>
          </div>
        </section>
      </div>
    </div>
  );
}
