import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const adminData = [
  { name: 'Tushar', email: 'tushar@example.com', role: 'Admin' },
  { name: 'Mim', email: 'mim@example.com', role: 'Editor' },
  { name: 'Nayeem', email: 'nayeem@example.com', role: 'Viewer' },
  { name: 'Ayesha', email: 'ayesha@example.com', role: 'Admin' },
];

const roles = ['All', 'Admin', 'Editor', 'Viewer'];

export default function AdminList() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredData = adminData.filter(
    (admin) =>
      admin.email.toLowerCase().includes(search.toLowerCase()) &&
      (selectedRole === 'All' || admin.role === selectedRole)
  );

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center w-full sm:max-w-md bg-gray-100 px-3 py-2 rounded-xl">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by email..."
            className="bg-transparent focus:outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="appearance-none bg-gray-100 text-sm px-4 py-2 pr-8 rounded-xl focus:outline-none"
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center px-5 py-5 text-gray-400">
                  No matching admins found.
                </td>
              </tr>
            ) : (
              filteredData.map((admin, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-5 py-4 font-medium">{admin.name}</td>
                  <td className="px-5 py-4">{admin.email}</td>
                  <td className="px-5 py-4">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-200">
                      {admin.role}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
