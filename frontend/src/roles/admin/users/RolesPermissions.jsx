import React, { useState } from 'react';

const mockRoles = [
  { name: 'admin', permissions: ['manage_users', 'edit_products', 'view_orders'] },
  { name: 'manager', permissions: ['edit_products', 'view_orders'] },
  { name: 'user', permissions: ['view_orders'] },
];

const allPermissions = ['manage_users', 'edit_products', 'view_orders', 'refunds', 'analytics'];

const RolesPermissions = () => {
  const [roles, setRoles] = useState(mockRoles);

  const togglePermission = (roleName, perm) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.name === roleName
          ? {
              ...role,
              permissions: role.permissions.includes(perm)
                ? role.permissions.filter((p) => p !== perm)
                : [...role.permissions, perm],
            }
          : role
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Roles & Permissions</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-50 text-gray-700">
            <th className="py-3 px-4 text-left font-semibold">Role</th>
            {allPermissions.map((perm) => (
              <th key={perm} className="py-3 px-4 text-left font-semibold">{perm}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.name} className="border-b">
              <td className="py-2 px-4 font-semibold text-blue-700">{role.name}</td>
              {allPermissions.map((perm) => (
                <td key={perm} className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={role.permissions.includes(perm)}
                    onChange={() => togglePermission(role.name, perm)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesPermissions; 