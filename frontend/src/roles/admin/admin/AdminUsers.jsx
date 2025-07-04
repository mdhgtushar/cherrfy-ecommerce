import React, { useState } from 'react';
import { Users, Shield, UserCheck, UserX, Pencil, Trash, Eye, Ban } from 'lucide-react';

const mockAdmins = [
  { id: 'ADM-001', name: 'John Admin', email: 'john@admin.com', role: 'SuperAdmin', status: 'Active', lastLogin: '2024-06-01', created: '2024-01-15' },
  { id: 'ADM-002', name: 'Jane Manager', email: 'jane@admin.com', role: 'Manager', status: 'Active', lastLogin: '2024-06-02', created: '2024-02-20' },
  { id: 'ADM-003', name: 'Bob Support', email: 'bob@admin.com', role: 'Support', status: 'Suspended', lastLogin: '2024-05-15', created: '2024-03-10' },
  { id: 'ADM-004', name: 'Alice Editor', email: 'alice@admin.com', role: 'Editor', status: 'Active', lastLogin: '2024-06-03', created: '2024-04-05' },
];

const roleColors = {
  SuperAdmin: 'bg-red-500',
  Manager: 'bg-blue-500',
  Support: 'bg-green-500',
  Editor: 'bg-purple-500',
};

const statusColors = {
  Active: 'bg-green-500',
  Suspended: 'bg-red-500',
  Pending: 'bg-yellow-500',
};

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAdmins = mockAdmins.filter(admin => {
    const matchesSearch = !search || 
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || admin.role === roleFilter;
    const matchesStatus = !statusFilter || admin.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAdmins(filteredAdmins.map(admin => admin.id));
    } else {
      setSelectedAdmins([]);
    }
  };

  const handleSelectAdmin = (adminId, checked) => {
    if (checked) {
      setSelectedAdmins([...selectedAdmins, adminId]);
    } else {
      setSelectedAdmins(selectedAdmins.filter(id => id !== adminId));
    }
  };

  const summaryStats = {
    total: mockAdmins.length,
    active: mockAdmins.filter(a => a.status === 'Active').length,
    suspended: mockAdmins.filter(a => a.status === 'Suspended').length,
    superAdmins: mockAdmins.filter(a => a.role === 'SuperAdmin').length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Admins</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.suspended}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Super Admins</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.superAdmins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Manager">Manager</option>
              <option value="Support">Support</option>
              <option value="Editor">Editor</option>
            </select>
            <select
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAdmins.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
          <span className="text-blue-700 font-medium">
            {selectedAdmins.length} admin(s) selected
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center gap-1">
              <UserCheck /> Activate
            </button>
            <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 flex items-center gap-1">
              <Ban /> Suspend
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1">
              <Trash /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={selectedAdmins.length === filteredAdmins.length && filteredAdmins.length > 0}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">No admins found.</td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedAdmins.includes(admin.id)}
                      onChange={(e) => handleSelectAdmin(admin.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {admin.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{admin.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-white px-3 py-1 rounded-full text-xs font-semibold ${roleColors[admin.role] || 'bg-gray-400'}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-white px-3 py-1 rounded-full text-xs font-semibold ${statusColors[admin.status] || 'bg-gray-400'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{admin.lastLogin}</td>
                  <td className="px-4 py-3 text-gray-600">{admin.created}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1 text-yellow-600 hover:bg-yellow-100 rounded" title="Suspend">
                        <Ban size={14} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded" title="Delete">
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers; 