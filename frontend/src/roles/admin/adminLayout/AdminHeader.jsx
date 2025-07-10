import React from 'react';
import { UserCircle, ChevronDown } from 'lucide-react';

export default function AdminHeader({ title = "Manage admin" }) {
  // Dummy user data; replace with real user info if available
  const user = { name: "Admin User", avatar: null };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between px-8 h-16">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-gray-800 tracking-tight">{title}</span>
      </div>
      {/* User Menu */}
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 transition">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
          ) : (
            <UserCircle className="w-8 h-8 text-blue-400" />
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
    </header>
  );
} 