import React, { useState } from 'react';

const ManageAccountPage = () => {
  // Initial States
  const [profile, setProfile] = useState({
    firstName: 'Tushar',
    lastName: 'Golondaz',
    email: 'tushar@example.com',
    phone: '+8801300000000',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [billing, setBilling] = useState({
    address: '138, KBI Road, Gafargaon, Mymensingh',
  });

  const [shippingList, setShippingList] = useState([
    { id: 1, address: 'House #1, Dhaka' },
    { id: 2, address: 'Village #2, Mymensingh' },
  ]);

  const [newShipping, setNewShipping] = useState('');
  const [editingShippingId, setEditingShippingId] = useState(null);
  const [editingShippingText, setEditingShippingText] = useState('');

  // Handlers
  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleBillingChange = (e) =>
    setBilling({ ...billing, address: e.target.value });

  const handleAddShipping = () => {
    if (newShipping.trim() !== '') {
      setShippingList([
        ...shippingList,
        { id: Date.now(), address: newShipping },
      ]);
      setNewShipping('');
    }
  };

  const handleEditShipping = (id) => {
    const item = shippingList.find((s) => s.id === id);
    setEditingShippingId(id);
    setEditingShippingText(item.address);
  };

  const handleUpdateShipping = () => {
    setShippingList(
      shippingList.map((s) =>
        s.id === editingShippingId ? { ...s, address: editingShippingText } : s
      )
    );
    setEditingShippingId(null);
    setEditingShippingText('');
  };

  const handleDeleteShipping = (id) => {
    setShippingList(shippingList.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-semibold">Manage Account</h1>

      {/* Profile Info */}
      <section>
        <h2 className="text-xl font-medium mb-2">Edit Profile Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Phone Number"
          />
        </div>
      </section>

      {/* Password Change */}
      <section>
        <h2 className="text-xl font-medium mb-2">Change Password</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordChange}
            className="border p-2 rounded"
            placeholder="Current Password"
          />
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordChange}
            className="border p-2 rounded"
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            className="border p-2 rounded"
            placeholder="Confirm Password"
          />
        </div>
      </section>

      {/* Billing Address */}
      <section>
        <h2 className="text-xl font-medium mb-2">Billing Address</h2>
        <textarea
          value={billing.address}
          onChange={handleBillingChange}
          rows="3"
          className="w-full border rounded p-2"
        ></textarea>
      </section>

      {/* Shipping Addresses */}
      <section>
        <h2 className="text-xl font-medium mb-2">Shipping Addresses</h2>

        {/* List */}
        {shippingList.map((item) =>
          editingShippingId === item.id ? (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={editingShippingText}
                onChange={(e) => setEditingShippingText(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleUpdateShipping}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          ) : (
            <div key={item.id} className="flex items-center justify-between mb-2">
              <span>{item.address}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditShipping(item.id)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteShipping(item.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}

        {/* Add New */}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newShipping}
            onChange={(e) => setNewShipping(e.target.value)}
            placeholder="New Shipping Address"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddShipping}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </section>

      {/* Save Changes */}
      <div className="pt-6">
        <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default ManageAccountPage;
