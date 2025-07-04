import React, { useState } from "react";

const mockStats = [
  { label: 'Total Sales', value: '$12,340', change: '+8%', color: 'green' },
  { label: 'Orders', value: '1,234', change: '+5%', color: 'blue' },
  { label: 'Site Visits', value: '45,678', change: '+12%', color: 'purple' },
  { label: 'Conversion Rate', value: '2.7%', change: '+0.3%', color: 'yellow' },
];

const mockReports = [
  { name: 'April Sales', type: 'Sales', date: '2025-05-01', status: 'Generated' },
  { name: 'Traffic Overview', type: 'Traffic', date: '2025-05-01', status: 'Generated' },
  { name: 'Engagement', type: 'Engagement', date: '2025-05-01', status: 'Generated' },
  { name: 'March Sales', type: 'Sales', date: '2025-04-01', status: 'Generated' },
  { name: 'Product Performance', type: 'Product', date: '2025-05-01', status: 'Generated' },
  { name: 'Abandoned Carts', type: 'Cart', date: '2025-05-01', status: 'Generated' },
];

export default function AnalyticsReports() {
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 3;
  const totalPages = Math.ceil(mockReports.length / logsPerPage);
  const pagedReports = mockReports.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Overview Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">Analytics & Reports <span className="text-lg">📊</span></h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              View key metrics, sales, traffic, and engagement analytics. Download detailed reports to track your store's performance.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500">Last Updated:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">2025-05-07 10:00 AM</span>
          </div>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockStats.map((stat, idx) => (
            <div key={idx} className={`bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-${stat.color}-400`}>
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              <span className="text-gray-500 text-sm mt-1">{stat.label}</span>
              <span className={`mt-2 text-xs font-semibold text-${stat.color}-600`}>{stat.change}</span>
            </div>
          ))}
        </section>

        {/* Charts (Mocked) */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Sales & Traffic Trends <span>📈</span></h2>
          <p className="text-gray-600 mb-4">Visualize your sales and traffic over time. (Charts are mocked for now.)</p>
          <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-blue-400 font-bold text-2xl">
            [Sales/Traffic Chart Placeholder]
          </div>
        </section>

        {/* Report Log (Paginated) */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">Report Log <span>📝</span></h2>
          <p className="text-gray-600 mb-4">Browse and download generated reports. Use pagination to browse history.</p>
          <ul className="divide-y divide-gray-200 mb-4">
            {pagedReports.map((r, idx) => (
              <li key={idx} className="py-2 flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">{r.type}</span>
                <span className="flex-1 text-gray-700">{r.name}</span>
                <span className="text-xs text-gray-400">{r.date}</span>
                <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">Download</button>
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
            <button className="ml-4 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition">Export Log (CSV)</button>
          </div>
        </section>
      </div>
    </div>
  );
} 