import React from 'react';

const UserOverview = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Info */}
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-4" />
        <h2 className="text-xl font-semibold">Tushar Golondaz</h2>
        <p className="text-gray-600">mdhgtushar@gmail.com</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">23</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Pending Delivery</p>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Wishlist Items</p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span>#1001 - Nike Air Max</span>
            <span className="text-gray-600">Delivered</span>
          </li>
          <li className="flex justify-between">
            <span>#1002 - Apple Watch</span>
            <span className="text-gray-600">Processing</span>
          </li>
          <li className="flex justify-between">
            <span>#1003 - Gaming Mouse</span>
            <span className="text-gray-600">Shipped</span>
          </li>
        </ul>
      </div>

      {/* Recommended Products */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          <li>Wireless Headphones</li>
          <li>Laptop Stand</li>
          <li>Ergonomic Chair</li>
        </ul>
      </div>
    </div>
  );
};

export default UserOverview;
