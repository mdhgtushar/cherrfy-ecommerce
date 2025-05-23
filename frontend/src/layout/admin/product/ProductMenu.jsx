// components/ProductMenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_PATHS } from '../../../routes/paths';

const menuItems = [
  { path: ADMIN_PATHS.PRODUCTS.BASE, label: 'Products List' },
  { path: ADMIN_PATHS.PRODUCTS.SOURCE, label: '+ Create Product' }, 
];

const ProductMenu = () => {
  return (
    <header className="bg-red-100 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">Products Management</h1>
        <nav className="flex space-x-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default ProductMenu;
