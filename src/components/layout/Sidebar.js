import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
    return (
      <div
        id="sidebar"
        className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform -translate-x-full md:translate-x-0 transition-transform duration-200 ease-in-out z-10 md:relative"
      >
        <div className="p-6 text-center border-b border-gray-700">
          <h2 className="text-2xl font-bold">Developer Corner</h2>
        </div>
        <nav className="flex-grow">
          <ul className="mt-6 space-y-2">
            <li>
              <Link to="/overview" className="block py-3 px-6 hover:bg-gray-700">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/about-project" className="block py-3 px-6 hover:bg-gray-700">
                About Project
              </Link>
            </li>
            <li>
              <Link to="/api-integration" className="block py-3 px-6 hover:bg-gray-700">
                API Integration
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  

export default Sidebar