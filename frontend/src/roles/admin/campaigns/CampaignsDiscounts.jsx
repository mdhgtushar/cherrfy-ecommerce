import React, { useState } from "react";

const mockCampaigns = [
  { name: 'Spring Sale', type: 'Discount', status: 'Active', start: '2025-04-01', end: '2025-04-30' },
  { name: 'BOGO Weekend', type: 'BOGO', status: 'Scheduled', start: '2025-05-10', end: '2025-05-12' },
  { name: 'Flash Sale', type: 'Flash', status: 'Ended', start: '2025-03-15', end: '2025-03-16' },
  { name: 'VIP Exclusive', type: 'Discount', status: 'Active', start: '2025-04-15', end: '2025-05-15' },
  { name: 'Summer Kickoff', type: 'Discount', status: 'Scheduled', start: '2025-06-01', end: '2025-06-07' },
  { name: 'Clearance', type: 'Discount', status: 'Ended', start: '2025-02-01', end: '2025-02-28' },
];

export default function CampaignsDiscounts() {
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 3;
  const totalPages = Math.ceil(mockCampaigns.length / logsPerPage);
  const pagedCampaigns = mockCampaigns.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Overview Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-yellow-700 flex items-center gap-2">Campaigns & Discounts <span className="text-lg">🏷️</span></h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Create, manage, and track marketing campaigns and discounts. Schedule flash sales, BOGO offers, and more to boost engagement and sales.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500">Active Campaigns:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">2</span>
          </div>
        </div>

        {/* Campaign Creation */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Create New Campaign <span>➕</span></h2>
          <p className="text-gray-600 mb-4">Launch a new campaign or discount. Choose type, set dates, and define rules.</p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Campaign Name</label>
              <input type="text" className="block w-full mb-2 p-3 border rounded-lg" placeholder="e.g. Summer Sale" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Type</label>
              <select className="block w-full mb-2 p-3 border rounded-lg">
                <option>Discount</option>
                <option>BOGO</option>
                <option>Flash Sale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Start Date</label>
              <input type="date" className="block w-full mb-2 p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">End Date</label>
              <input type="date" className="block w-full mb-2 p-3 border rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Rules/Description</label>
              <textarea className="block w-full p-3 border rounded-lg mb-2" rows="2" placeholder="Describe the offer, e.g. 20% off all shoes."></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition">Create Campaign</button>
            </div>
          </form>
        </section>

        {/* Active & Scheduled Campaigns */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Active & Scheduled Campaigns <span>📅</span></h2>
          <p className="text-gray-600 mb-4">View and manage your current and upcoming campaigns.</p>
          <table className="w-full text-left border rounded-lg overflow-hidden">
            <thead className="bg-yellow-50">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Status</th>
                <th className="p-2">Start</th>
                <th className="p-2">End</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.map((c, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2 font-semibold">{c.name}</td>
                  <td className="p-2">{c.type}</td>
                  <td className={`p-2 font-bold ${c.status === 'Active' ? 'text-green-600' : c.status === 'Scheduled' ? 'text-blue-600' : 'text-gray-400'}`}>{c.status}</td>
                  <td className="p-2">{c.start}</td>
                  <td className="p-2">{c.end}</td>
                  <td className="p-2 flex gap-2">
                    <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                    <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Campaign Log (Paginated) */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Campaign Log <span>📝</span></h2>
          <p className="text-gray-600 mb-4">Track recent campaign activity and changes. Use pagination to browse history.</p>
          <ul className="divide-y divide-gray-200 mb-4">
            {pagedCampaigns.map((c, idx) => (
              <li key={idx} className="py-2 flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">{c.type}</span>
                <span className="flex-1 text-gray-700">{c.name} ({c.status})</span>
                <span className="text-xs text-gray-400">{c.start} - {c.end}</span>
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