import React from 'react';
import { Bell, UserCircle, ChevronDown } from 'lucide-react';

export default function AdminHeader({ title = "Dashboard" }) {
  // Dummy user data; replace with real user info if available
  const user = { name: "Admin User", avatar: null };

  return (
    <header className="sticky top-0 z-30 bg-white shadow flex items-center justify-between px-6 h-16 border-b border-gray-200">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-gray-800 tracking-tight">{title}</span>
      </div>

      {/* Right Side: Notifications & User */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-500" />
          {/* Notification badge (optional) */}
          {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </button>

        {/* User Avatar & Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <UserCircle className="w-8 h-8 text-gray-400" />
            )}
            <span className="font-medium text-gray-700 text-sm">{user.name}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 z-50">
            <a href="#profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
            <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
} 