import { Link } from 'react-router-dom';
import { Home, Eye, Settings, Users, Info, Plus } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-white h-screen w-64 p-4 fixed top-0 left-0 border-r border-gray-200 shadow-lg flex flex-col justify-between">
      
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center h-20 mb-6">
          <h1 className="text-2xl font-bold text-red-500">Cherrfy</h1>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-3">
          <SidebarLink to="/" icon={<Home size={18} />} label="Dashboard" />
          <SidebarLink to="/productViewer" icon={<Eye size={18} />} label="Product View" />
          <SidebarLink to="/users" icon={<Users size={18} />} label="Users" />
          <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />
          <SidebarLink to="/about" icon={<Info size={18} />} label="About" />
        </nav>
      </div>

      {/* Full-width Button */}
      <div className="mt-6">
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200">
          <Plus size={16} /> Add Product
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-500 font-medium hover:bg-gray-100 rounded-lg transition"
  >
    {icon}
    {label}
  </Link>
);

export default Sidebar;
