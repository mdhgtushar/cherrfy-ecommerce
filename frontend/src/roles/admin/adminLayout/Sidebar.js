import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  PackageSearch,
  ShoppingCart,
  Factory,
  Boxes,
  DollarSign,
  ClipboardList,
  Truck,
  Tag,
  Megaphone,
  BarChart,
  Image,
  RefreshCcw,
  Settings,
  Plus,
  ClipboardListIcon
} from 'lucide-react';
import  ADMIN_PATHS  from '../ADMIN_PATHS';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white h-screen w-64 p-4 fixed top-0 left-0 border-r border-gray-200 shadow-lg flex flex-col justify-between overflow-y-scroll">
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center h-20 mb-3 border-b border-gray-200 bg-red-100 rounded border-2 border-red-200 shadow-sm">
          <h1 className="text-2xl font-bold text-red-500">Cherrfy</h1>
        </div>
        <hr className='mb-3 border-gray-300' />
        {/* Nav Links */}
        <nav className="flex flex-col gap-1">
          <SidebarLink to={ADMIN_PATHS.DASHBOARD} icon={<Home size={18} />} label="Dashboard" />
          <SidebarLink to={ADMIN_PATHS.PRODUCTS.BASE} icon={<Boxes size={18} />} label="Product Management" />
          <SidebarLink to={ADMIN_PATHS.ORDERS} icon={<ClipboardList size={18} />} label="Order Management" />
          <SidebarLink to={ADMIN_PATHS.USERSs} icon={<Users size={18} />} label="Users Management" />
          <SidebarLink to={ADMIN_PATHS.ADMIN.BASE} icon={<Users size={18} />} label="Admin & Role Management" />
          <SidebarLink to={ADMIN_PATHS.ALIEXPRESS} icon={<PackageSearch size={18} />} label="AliExpress Integration" />
          <SidebarLink to={ADMIN_PATHS.B2C} icon={<ShoppingCart size={18} />} label="B2C Management" />
          <SidebarLink to={ADMIN_PATHS.D2C} icon={<Factory size={18} />} label="Domestic D2C Management" />
          <SidebarLink to={ADMIN_PATHS.PRICING} icon={<DollarSign size={18} />} label="Pricing & Profit Management" />
          <SidebarLink to={ADMIN_PATHS.SHIPPING} icon={<Truck size={18} />} label="Courier Integration & API Logs" />
          <SidebarLink to="ADMIN_PATHS" icon={<Truck size={18} />} label="Shipping Rules & Price Zones" />
          <SidebarLink to={ADMIN_PATHS.CAMPAIGNS} icon={<Tag size={18} />} label="Campaigns & Discounts" />
          <SidebarLink to={ADMIN_PATHS.MARKETING} icon={<Megaphone size={18} />} label="Marketing & Content" />
          <SidebarLink to={ADMIN_PATHS.ANALYTICS} icon={<BarChart size={18} />} label="Analytics & Reports" />
          <SidebarLink to={ADMIN_PATHS.MEDIA} icon={<Image size={18} />} label="File & Media Manager" />
          <SidebarLink to={ADMIN_PATHS.BACKUP} icon={<RefreshCcw size={18} />} label="Backup & Restore" />
          <SidebarLink to={ADMIN_PATHS.SETTINGS} icon={<Settings size={18} />} label="System Settings" />
          <SidebarLink to={ADMIN_PATHS.WORKUPDATE} icon={<ClipboardListIcon size={18} />} label="Work Update" />
        </nav>
      </div>

      {/* Add Product Button */}
      <div className="mt-6">
        <Link to={ADMIN_PATHS.PRODUCTS.ADD} className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-all duration-200">
          <Plus size={16} /> Add Product
        </Link>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = currentPath.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium ${
                isActive ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
    >
      {icon} {label}
    </Link>
  );
};

export default Sidebar;
