import React from 'react';

const mockUser = {
  id: 'USR-001',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin',
  status: 'Active',
  joined: '2024-01-15',
};

const UserDetails = () => (
  <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-700">User Details</h2>
    <div className="mb-4">
      <span className="font-semibold">ID:</span> {mockUser.id}
      <span className="ml-6 font-semibold">Name:</span> {mockUser.name}
      <span className="ml-6 font-semibold">Email:</span> {mockUser.email}
    </div>
    <div className="mb-4">
      <span className="font-semibold">Role:</span> <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">{mockUser.role}</span>
      <span className="ml-6 font-semibold">Status:</span> <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">{mockUser.status}</span>
    </div>
    <div className="mb-4">
      <span className="font-semibold">Joined:</span> {mockUser.joined}
    </div>
    <div className="flex gap-2 mt-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Deactivate</button>
    </div>
  </div>
);

export default UserDetails; 