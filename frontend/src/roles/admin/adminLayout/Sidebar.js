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
  ChevronRight,
  Shield
} from 'lucide-react';
import ADMIN_PATHS from '../ADMIN_PATHS';

const navCategories = [
  {
    heading: 'Store Management',
    icon: <Boxes size={18} className="text-blue-400" />,
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
    icon: <PackageSearch size={18} className="text-blue-400" />,
    links: [
      { to: ADMIN_PATHS.ALIEXPRESS, icon: <PackageSearch size={18} />, label: 'AliExpress Integration' },
      { to: ADMIN_PATHS.SHIPPING, icon: <Truck size={18} />, label: 'Courier Integration & API Logs' },
    ],
  },
  {
    heading: 'Marketing & Content',
    icon: <Megaphone size={18} className="text-blue-400" />,
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

const advancedOptions = [
  { to: ADMIN_PATHS.ADMIN.BASE, icon: <Shield size={18} />, label: 'Security Settings' },
  { to: ADMIN_PATHS.SETTINGS, icon: <Settings size={18} />, label: 'Advanced System Settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = { name: "Admin User", role: "Super Admin" };
  // By default, open the first category
  const [openCategories, setOpenCategories] = useState([navCategories[0].heading]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleCategory = (heading) => {
    setOpenCategories((prev) =>
      prev.includes(heading)
        ? prev.filter((h) => h !== heading)
        : [...prev, heading]
    );
  };

  return (
    <aside className="bg-gray-900 h-screen w-72 p-0 fixed top-0 left-0 border-r border-gray-800 shadow-lg flex flex-col justify-between overflow-y-auto hidden md:flex custom-scrollbar transition-all duration-300">
      {/* Top: Logo & Brand */}
      <div>
        <div className="flex items-center justify-center h-16 mb-2 border-b border-gray-800 bg-gray-900">
          <h1 className="text-xl font-extrabold text-blue-400 tracking-wide">Cherrfy Admin</h1>
        </div>
        {/* Nav Categories */}
        <nav className="flex flex-col gap-2 mt-2">
          {navCategories.map((cat) => (
            <div key={cat.heading} className="mb-2">
              <button
                className="flex items-center w-full gap-2 px-4 py-2 text-xs font-bold text-gray-300 uppercase tracking-wider hover:bg-gray-800 rounded transition group"
                onClick={() => toggleCategory(cat.heading)}
                aria-expanded={openCategories.includes(cat.heading)}
              >
                <span>{cat.icon}</span>
                <span className="flex-1 text-left">{cat.heading}</span>
                {openCategories.includes(cat.heading) ? (
                  <ChevronDown className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                )}
              </button>
              <div
                className={`flex flex-col gap-1 pl-4 border-l-4 border-transparent transition-all duration-300 overflow-hidden ${openCategories.includes(cat.heading) ? 'max-h-[1000px] border-blue-800 bg-gray-800/60' : 'max-h-0'}`}
                style={{ transition: 'max-height 0.4s' }}
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
        <div className="mt-6 px-4">
          <Link to={ADMIN_PATHS.PRODUCTS.ADD} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-200 shadow text-base">
            <Plus size={18} /> Add Product
          </Link>
        </div>
        {/* Advanced Options */}
        <div className="mt-8 px-4">
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center w-full gap-2 px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider hover:bg-gray-800 rounded transition group">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="flex-1 text-left">Advanced Options</span>
            {showAdvanced ? <ChevronDown className="w-4 h-4 text-blue-400" /> : <ChevronRight className="w-4 h-4 text-blue-400" />}
          </button>
          <div className={`flex flex-col gap-1 pl-4 border-l-4 border-transparent transition-all duration-300 overflow-hidden ${showAdvanced ? 'max-h-[500px] border-blue-800 bg-gray-800/60' : 'max-h-0'}`} style={{ transition: 'max-height 0.4s' }}>
            {showAdvanced && advancedOptions.map(link => (
              <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} />
            ))}
          </div>
        </div>
      </div>
      {/* Bottom: User Profile Quick Actions */}
      <div className="px-4 py-6 border-t border-gray-800 bg-gray-900 flex items-center gap-3 mt-4">
        <div className="bg-gray-800 rounded-full p-2">
          <UserCircle className="w-10 h-10 text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-200 text-base leading-tight">{user.name}</div>
          <div className="text-xs text-gray-500">{user.role}</div>
        </div>
        <button className="p-2 rounded hover:bg-gray-800 transition" title="Logout">
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
      className={`flex items-center gap-3 px-6 py-2 rounded text-sm font-medium transition-colors duration-200
        ${isActive ? 'bg-blue-900 text-blue-300 font-bold shadow' : 'text-gray-300 hover:bg-gray-800'}
      `}
    >
      {icon} <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
