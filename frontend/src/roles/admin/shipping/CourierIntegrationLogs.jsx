import React, { useState } from "react";

const mockLogs = [
  { type: 'success', message: 'Courier API Connected', time: '2025-05-07 10:00 AM' },
  { type: 'error', message: 'Failed to fetch rates from DHL', time: '2025-05-07 09:55 AM' },
  { type: 'success', message: 'FedEx rates updated', time: '2025-05-07 09:30 AM' },
  { type: 'error', message: 'API Key expired for UPS', time: '2025-05-07 09:10 AM' },
  { type: 'success', message: 'Aramex integration enabled', time: '2025-05-07 08:50 AM' },
  { type: 'success', message: 'Courier webhook received', time: '2025-05-07 08:30 AM' },
  { type: 'error', message: 'Webhook signature invalid', time: '2025-05-07 08:10 AM' },
  { type: 'success', message: 'API token refreshed', time: '2025-05-07 07:50 AM' },
  { type: 'success', message: 'Courier rates synced', time: '2025-05-07 07:30 AM' },
  { type: 'error', message: 'Timeout on courier sync', time: '2025-05-07 07:10 AM' },
];

export default function CourierIntegrationLogs() {
  const [apiKey, setApiKey] = useState("demo-key-123");
  const [autoSync, setAutoSync] = useState(false);
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
            <h1 className="text-3xl font-bold text-pink-700 flex items-center gap-2">Courier Integration & API Logs <span className="text-lg">🚚</span></h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Connect and manage your courier/shipping integrations. Monitor API status, sync rates, manage credentials, and view API logs. For help, see your courier's developer docs.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500">Integration Status:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">Connected</span>
            <span className="text-xs text-gray-400">Last Sync: 2025-05-07 10:00 AM</span>
          </div>
        </div>

        {/* Integration Setup */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-pink-700 flex items-center gap-2">Integration Setup <span>🔗</span></h2>
          <p className="text-gray-600 mb-4">Configure your courier API credentials and endpoints.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="block w-full mb-2 p-3 border rounded-lg"
              />
              <button className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition">Save Credentials</button>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">API Endpoint</label>
              <input
                type="text"
                value="https://api.courier.com/v1/"
                readOnly
                className="block w-full mb-2 p-3 border rounded-lg bg-gray-100"
              />
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition">Test Connection</button>
            </div>
          </div>
        </section>

        {/* Sync Controls */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-pink-700 flex items-center gap-2">Sync Controls <span>🔄</span></h2>
          <p className="text-gray-600 mb-4">Enable auto-sync or trigger a manual sync for courier rates and tracking info.</p>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={autoSync} onChange={() => setAutoSync(!autoSync)} />
              <span>Enable Auto Sync</span>
            </label>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Sync Now</button>
          </div>
        </section>

        {/* API Logs with Pagination */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-pink-700 flex items-center gap-2">API Logs <span>📝</span></h2>
          <p className="text-gray-600 mb-4">View recent API activity and error logs. Use pagination to browse history.</p>
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