import React, { useState } from 'react';
import { Shield, Plus, Pencil, Trash, Save, X, Check, Lock } from 'lucide-react';

const mockRoles = [
  {
    id: 'role-1',
    name: 'SuperAdmin',
    description: 'Full system access with all permissions',
    permissions: ['view', 'edit', 'delete', 'create', 'export', 'import', 'admin'],
    userCount: 2,
    isDefault: true,
  },
  {
    id: 'role-2',
    name: 'Manager',
    description: 'Manage products, orders, and users',
    permissions: ['view', 'edit', 'create', 'export'],
    userCount: 5,
    isDefault: false,
  },
  {
    id: 'role-3',
    name: 'Support',
    description: 'Handle customer support and disputes',
    permissions: ['view', 'edit'],
    userCount: 8,
    isDefault: false,
  },
  {
    id: 'role-4',
    name: 'Editor',
    description: 'Edit products and content',
    permissions: ['view', 'edit'],
    userCount: 3,
    isDefault: false,
  },
];

const allPermissions = [
  { key: 'view', label: 'View', description: 'View data and reports' },
  { key: 'edit', label: 'Edit', description: 'Edit existing data' },
  { key: 'create', label: 'Create', description: 'Create new records' },
  { key: 'delete', label: 'Delete', description: 'Delete records' },
  { key: 'export', label: 'Export', description: 'Export data' },
  { key: 'import', label: 'Import', description: 'Import data' },
  { key: 'admin', label: 'Admin', description: 'Manage other admins' },
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [editingRole, setEditingRole] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [],
  });

  const handleCreateRole = () => {
    if (newRole.name.trim()) {
      const role = {
        id: `role-${Date.now()}`,
        ...newRole,
        userCount: 0,
        isDefault: false,
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowCreateForm(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole({ ...role });
  };

  const handleSaveRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? editingRole : role
      ));
      setEditingRole(null);
    }
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const togglePermission = (roleId, permission) => {
    if (editingRole && editingRole.id === roleId) {
      const permissions = editingRole.permissions.includes(permission)
        ? editingRole.permissions.filter(p => p !== permission)
        : [...editingRole.permissions, permission];
      setEditingRole({ ...editingRole, permissions });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="text-blue-600" />
          Roles & Permissions
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus /> Create New Role
        </button>
      </div>

      {/* Create Role Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter role name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter role description"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {allPermissions.map(permission => (
                <label key={permission.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newRole.permissions.includes(permission.key)}
                    onChange={(e) => {
                      const permissions = e.target.checked
                        ? [...newRole.permissions, permission.key]
                        : newRole.permissions.filter(p => p !== permission.key);
                      setNewRole({ ...newRole, permissions });
                    }}
                  />
                  <span className="text-sm">{permission.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateRole}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save /> Create Role
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
            >
              <X /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {role.name}
                    {role.isDefault && <Lock className="text-yellow-500" title="Default Role" />}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{role.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{role.userCount} users assigned</p>
                </div>
                <div className="flex gap-1">
                  {editingRole?.id === role.id ? (
                    <>
                      <button
                        onClick={handleSaveRole}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingRole(null)}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      {!role.isDefault && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-700 mb-3">Permissions</h4>
              <div className="grid grid-cols-2 gap-2">
                {allPermissions.map(permission => (
                  <label key={permission.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={
                        editingRole?.id === role.id
                          ? editingRole.permissions.includes(permission.key)
                          : role.permissions.includes(permission.key)
                      }
                      onChange={() => togglePermission(role.id, permission.key)}
                      disabled={role.isDefault}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="mt-8 bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Permission Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                {allPermissions.map(permission => (
                  <th key={permission.key} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    {permission.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{role.name}</td>
                  {allPermissions.map(permission => (
                    <td key={permission.key} className="px-4 py-3 text-center">
                      {role.permissions.includes(permission.key) ? (
                        <Check className="text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions; 