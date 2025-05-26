import React, { useState } from "react";

const menuItems = [
  "Overview",
  "Manage Account",
  "My Orders",
  "Return & Refund",
  "My Reviews",
  "Wishlist & Followed Stores",
  "Appeal / Dispute Center",
  "Settings",
];

const UserDashboardPage = () => {
  const [active, setActive] = useState("Overview");

  return (
    <div className="min-h-screen flex bg-gray-50 mb-5">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow border-r">
        <div className="p-6 font-bold text-xl border-b text-blue-600">User Dashboard</div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 ${
                active === item ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{active}</h2>
        <div className="bg-white rounded-xl shadow p-6 text-gray-700">
          <p>This is the <strong>{active}</strong> section content.</p>
          {/* You can render specific components here based on 'active' */}
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;
