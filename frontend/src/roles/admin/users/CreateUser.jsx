import React, { useState } from 'react';

const CreateUser = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            name="name"
            className="border rounded px-3 py-2 w-full"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="border rounded px-3 py-2 w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="border rounded px-3 py-2 w-full"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Role</label>
          <select
            name="role"
            className="border rounded px-3 py-2 w-full"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Create User</button>
      </form>
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">User created successfully (mock)!</div>
      )}
    </div>
  );
};

export default CreateUser; 