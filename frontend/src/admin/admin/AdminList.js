import React, { useState } from "react";

export default function UserRoleManagement() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [logsFilter, setLogsFilter] = useState({ admin: "", date: "", action: "" });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">👤 User & Role Management</h1>

      {/* Admin Users */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Admin Users</h2>
        <button className="mb-2 px-4 py-2 bg-green-600 text-white rounded">Add New Admin</button>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        >
          <option value="all">All Roles</option>
          <option value="superadmin">SuperAdmin</option>
          <option value="manager">Manager</option>
          <option value="support">Support</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
        <button className="px-4 py-2 bg-blue-700 text-white rounded">Edit Profile & Password</button>
      </section>

      {/* Roles & Permissions */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Roles & Permissions</h2>
        <button className="mb-2 px-4 py-2 bg-indigo-600 text-white rounded">Create/Edit Roles</button>
        <button className="mb-2 px-4 py-2 bg-purple-600 text-white rounded">Assign Section Access</button>
        <div className="grid grid-cols-2 gap-2">
          <label><input type="checkbox" /> View</label>
          <label><input type="checkbox" /> Edit</label>
          <label><input type="checkbox" /> Delete</label>
          <label><input type="checkbox" /> Export</label>
        </div>
        <textarea
          rows="2"
          placeholder="Role Descriptions & Notes"
          className="block w-full p-2 mt-2 border rounded"
        />
      </section>

      {/* Activity Logs */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Activity Logs</h2>
        <input
          type="text"
          placeholder="Filter by Admin"
          className="block w-full mb-2 p-2 border rounded"
          onChange={(e) => setLogsFilter({ ...logsFilter, admin: e.target.value })}
        />
        <input
          type="date"
          className="block w-full mb-2 p-2 border rounded"
          onChange={(e) => setLogsFilter({ ...logsFilter, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Action Type (e.g., Login, Edit)"
          className="block w-full mb-2 p-2 border rounded"
          onChange={(e) => setLogsFilter({ ...logsFilter, action: e.target.value })}
        />
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Login from IP 192.168.1.1 - Chrome - 2025-05-07</li>
          <li>Edited Product #123 by Admin Tushar</li>
          <li>Failed Login - Wrong Password - AdminX</li>
        </ul>
      </section>

      {/* Security & 2FA */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Security & 2FA</h2>
        <label className="flex items-center space-x-2 mb-2">
          <input type="checkbox" />
          <span>Enable 2FA for this Admin</span>
        </label>
        <button className="mb-2 px-4 py-2 bg-gray-700 text-white rounded">Manage Trusted Devices</button>
        <input
          type="number"
          placeholder="Set Password Expiry (days)"
          className="block w-full mb-2 p-2 border rounded"
        />
        <textarea
          rows="2"
          placeholder="IP Whitelist or Block List (comma separated)"
          className="block w-full p-2 mb-2 border rounded"
        />
        <button className="px-4 py-2 bg-red-600 text-white rounded">Setup Security Alerts</button>
      </section>
    </div>
  );
}