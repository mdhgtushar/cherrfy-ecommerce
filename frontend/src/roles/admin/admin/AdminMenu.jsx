import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Shield, History, Cog, Plus } from 'lucide-react';
import ADMIN_PATHS from '../ADMIN_PATHS';

const menuItems = [
  { path: ADMIN_PATHS.ADMIN.BASE, label: 'Admin Users', icon: <FaUsers /> },
  { path: ADMIN_PATHS.ADMIN.ROLES, label: 'Roles & Permissions', icon: <FaUserShield /> },
  { path: ADMIN_PATHS.ADMIN.SECURITY, label: 'Security Settings', icon: <FaShieldAlt /> },
  { path: ADMIN_PATHS.ADMIN.ACTIVITY, label: 'Activity Logs', icon: <FaHistory /> },
  { path: ADMIN_PATHS.ADMIN.CREATE, label: 'Create Admin', icon: <FaPlus /> },
];

const AdminMenu = () => (
  <header className="bg-white shadow sticky top-0 z-40 border-b">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
        <FaUserShield className="text-blue-500" /> Admin & Role Management
      </h1>
      <nav className="flex flex-wrap gap-2 md:gap-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded font-medium transition-all duration-150 text-sm md:text-base ` +
              (isActive
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-700 hover:bg-blue-100 border border-transparent hover:border-blue-300')
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

export default AdminMenu; 