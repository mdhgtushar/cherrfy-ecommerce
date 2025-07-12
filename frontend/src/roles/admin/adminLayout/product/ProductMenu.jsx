// components/ProductMenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; 
import ADMIN_PATHS from '../../ADMIN_PATHS';

const menuItems = [
  { 
    path: ADMIN_PATHS.PRODUCTS.BASE, 
    label: 'Product Catalog',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  { 
    path: ADMIN_PATHS.PRODUCTS.SOURCE, 
    label: 'Create Product',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  },
  { 
    path: ADMIN_PATHS.PRODUCTS.IMPORT, 
    label: 'Import Products',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    )
  }, 
];

const ProductMenu = () => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Product Management</h1>
              </div>
            </div>
            
            <nav className="flex space-x-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ADMIN_PATHS.PRODUCTS.BASE}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="text-sm text-slate-500">
            Manage your product catalog
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
