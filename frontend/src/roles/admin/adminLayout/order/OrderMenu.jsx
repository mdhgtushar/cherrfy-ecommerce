// components/OrderMenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import ADMIN_PATHS from '../../ADMIN_PATHS';
import { List, Info, Plus, Truck, AlertTriangle, Undo, History } from 'lucide-react';

const menuItems = [
  { path: ADMIN_PATHS.ORDERS_PAGES.ALL, label: 'All Orders', icon: <List /> },
  { path: ADMIN_PATHS.ORDERS_PAGES.DETAILS, label: 'Order Details', icon: <Info /> },
  { path: ADMIN_PATHS.ORDERS_PAGES.MANUAL, label: 'Manual Order', icon: <Plus /> },
  { path: ADMIN_PATHS.ORDERS_PAGES.ALIEXPRESS, label: 'AliExpress Forwarding', icon: <Truck /> },
  { path: ADMIN_PATHS.ORDERS_PAGES.RECOVERY, label: 'Failed/Cancelled', icon: <AlertTriangle /> },
  { path: ADMIN_PATHS.ORDERS_PAGES.REFUNDS, label: 'Refunds', icon: <Undo /> },
  { path: ADMIN_PATHS.ORDERS_PAGES.STATUS_LOGS, label: 'Status Logs', icon: <History /> },
];

const OrderMenu = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50 border-b">
      <div className="mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <List className="text-blue-500" /> Order Management
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
};

export default OrderMenu;
