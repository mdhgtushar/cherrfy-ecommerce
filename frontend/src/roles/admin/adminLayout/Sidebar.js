import { useState } from 'react';
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
  ClipboardListIcon,
  AlertTriangle,
  UserCircle,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import ADMIN_PATHS from '../ADMIN_PATHS';

const navCategories = [
  {
    heading: 'Store Management',
    icon: <Boxes size={18} className="text-red-400" />,
    links: [
      { to: ADMIN_PATHS.DASHBOARD, icon: <Home size={18} />, label: 'Dashboard' },
      { to: ADMIN_PATHS.PRODUCTS.BASE, icon: <Boxes size={18} />, label: 'Product Management' },
      { to: ADMIN_PATHS.ORDERS, icon: <ClipboardList size={18} />, label: 'Order Management' },
      { to: ADMIN_PATHS.DISPUTES, icon: <AlertTriangle size={18} />, label: 'Dispute Management' },
      { to: ADMIN_PATHS.USERS, icon: <Users size={18} />, label: 'Users Management' },
      { to: ADMIN_PATHS.ADMIN.BASE, icon: <Users size={18} />, label: 'Admin & Role Management' },
    ],
  },
  {
    heading: 'Integrations',
    icon: <PackageSearch size={18} className="text-pink-400" />,
    links: [
      { to: ADMIN_PATHS.ALIEXPRESS, icon: <PackageSearch size={18} />, label: 'AliExpress Integration' },
      { to: ADMIN_PATHS.SHIPPING, icon: <Truck size={18} />, label: 'Courier Integration & API Logs' },
    ],
  },
  {
    heading: 'Marketing & Content',
    icon: <Megaphone size={18} className="text-yellow-400" />,
    links: [
      { to: ADMIN_PATHS.CAMPAIGNS, icon: <Tag size={18} />, label: 'Campaigns & Discounts' },
      { to: ADMIN_PATHS.MARKETING, icon: <Megaphone size={18} />, label: 'Marketing & Content' },
      { to: ADMIN_PATHS.MEDIA, icon: <Image size={18} />, label: 'File & Media Manager' },
    ],
  },
  {
    heading: 'Analytics & System',
    icon: <BarChart size={18} className="text-blue-400" />,
    links: [
      { to: ADMIN_PATHS.ANALYTICS, icon: <BarChart size={18} />, label: 'Analytics & Reports' },
      { to: ADMIN_PATHS.BACKUP, icon: <RefreshCcw size={18} />, label: 'Backup & Restore' },
      { to: ADMIN_PATHS.PRICING, icon: <DollarSign size={18} />, label: 'Pricing & Profit Management' },
      { to: ADMIN_PATHS.SETTINGS, icon: <Settings size={18} />, label: 'System Settings' },
      { to: ADMIN_PATHS.WORKUPDATE, icon: <ClipboardListIcon size={18} />, label: 'Work Update' },
      { to: ADMIN_PATHS.B2C, icon: <ShoppingCart size={18} />, label: 'B2C Management' },
      { to: ADMIN_PATHS.D2C, icon: <Factory size={18} />, label: 'Domestic D2C Management' },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = { name: "Admin User", role: "Super Admin" };
  // By default, open the first category
  const [openCategories, setOpenCategories] = useState([navCategories[0].heading]);

  const toggleCategory = (heading) => {
    setOpenCategories((prev) =>
      prev.includes(heading)
        ? prev.filter((h) => h !== heading)
        : [...prev, heading]
    );
  };

  return (
    <aside className="bg-white h-screen w-64 p-0 fixed top-0 left-0 border-r border-gray-200 shadow-lg flex flex-col justify-between overflow-y-auto hidden md:flex custom-scrollbar">
      {/* Top: Logo & Brand */}
      <div>
        <div className="flex items-center justify-center h-16 mb-2 border-b border-gray-200 bg-gradient-to-r from-red-100 to-pink-100 rounded-b-lg shadow-sm">
          <h1 className="text-xl font-extrabold text-red-500 tracking-wide">Cherrfy Admin</h1>
        </div>
        {/* Nav Categories */}
        <nav className="flex flex-col gap-2 mt-2">
          {navCategories.map((cat) => (
            <div key={cat.heading} className="mb-2">
              <button
                className="flex items-center w-full gap-2 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 rounded transition group"
                onClick={() => toggleCategory(cat.heading)}
                aria-expanded={openCategories.includes(cat.heading)}
              >
                <span>{cat.icon}</span>
                <span className="flex-1 text-left">{cat.heading}</span>
                {openCategories.includes(cat.heading) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                )}
              </button>
              <div
                className={`flex flex-col gap-1 pl-2 border-l-2 border-transparent transition-all duration-200 overflow-hidden ${openCategories.includes(cat.heading) ? 'max-h-[1000px] border-red-100' : 'max-h-0'}`}
                style={{ transition: 'max-height 0.3s' }}
              >
                {openCategories.includes(cat.heading) &&
                  cat.links.map(link => (
                    <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} />
                  ))}
              </div>
            </div>
          ))}
        </nav>
        {/* Add Product Button */}
        <div className="mt-4 px-4">
          <Link to={ADMIN_PATHS.PRODUCTS.ADD} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-lg text-base">
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>
      {/* Bottom: User Profile Quick Actions */}
      <div className="px-4 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center gap-3">
        <div className="bg-red-100 rounded-full p-1">
          <UserCircle className="w-8 h-8 text-red-400" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-800 text-sm leading-tight">{user.name}</div>
          <div className="text-xs text-gray-400">{user.role}</div>
        </div>
        <button className="p-2 rounded hover:bg-gray-100 transition" title="Logout">
          <LogOut className="w-5 h-5 text-gray-400" />
        </button>
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
      className={`flex items-center gap-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-150
        ${isActive ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 font-bold shadow' : 'text-gray-700 hover:bg-gray-100'}
      `}
    >
      {icon} <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
