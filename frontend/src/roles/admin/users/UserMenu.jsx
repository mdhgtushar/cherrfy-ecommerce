import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, UserPlus, Shield, Badge } from 'lucide-react';
import ADMIN_PATHS from '../ADMIN_PATHS';

const menuItems = [
  { path: ADMIN_PATHS.USERS, label: 'User List', icon: <Users /> },
  { path: ADMIN_PATHS.USERS + '/create', label: 'Create User', icon: <UserPlus /> },
  { path: ADMIN_PATHS.USERS + '/roles', label: 'Roles & Permissions', icon: <Shield /> },
  { path: ADMIN_PATHS.USERS + '/details', label: 'User Details', icon: <Badge /> },
];

const UserMenu = () => (
  <header className="bg-white shadow sticky top-0 z-40 border-b">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
        <Users className="text-blue-500" /> User Management
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

export default UserMenu; 