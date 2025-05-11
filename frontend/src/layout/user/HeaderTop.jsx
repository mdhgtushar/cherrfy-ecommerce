import { Link } from 'react-router-dom';
import React from 'react';

const HeaderTop = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 bg-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="font-bold text-2xl" style={{color: '#e6931d'}}>
            <span>Cherrfy</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-8">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="man watches"
              className="w-full py-2 px-4 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
              autoComplete="off"
              maxLength="50"
              id="search-words"
              name="searchWords"
              defaultValue=""
            />
            <div className="absolute right-5 p-2 cursor-pointer"  style={{background: '#e6931d'}}>
              <img
                alt="Search.."
                width="24"
                height="24"
                src="https://ae01.alicdn.com/kf/Sf683a50b80cc4690a747a857f150abc8p/48x48.png"
                className="opacity-70 hover:opacity-100"
              />
            </div> 
          </div>
        </div>

        {/* Right Side Menu */}
        <div className="flex items-center space-x-6">
          {/* Download App */}
          <div className="flex items-center cursor-pointer group relative">
            <svg viewBox="0 0 1024 1024" width="20" height="20" className="text-gray-600 group-hover:text-red-600">
              {/* SVG Path omitted for brevity */}
            </svg>
            <div className="ml-2">
              <div className="text-xs text-gray-500">Download the</div>
              <div className="font-semibold text-sm flex items-center">
                <span>Cherrfy app</span>
                <svg viewBox="0 0 1024 1024" width="12" height="12" className="ml-1">
                  <path d="M296.256 354.944l224 224 224-224a74.656 74.656 0 0 1 0 105.6l-197.6 197.6a37.344 37.344 0 0 1-52.8 0l-197.6-197.6a74.656 74.656 0 0 1 0-105.6z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Ship To */}
          <div className="flex items-center cursor-pointer group relative">
            <div className="w-5 h-5 rounded-full bg-blue-500 mr-1"></div>
            <div className="text-sm">
              <div className="text-xs text-gray-500">EN/</div>
              <div className="font-semibold flex items-center">
                <span>BDT</span>
                <svg viewBox="0 0 1024 1024" width="12" height="12" className="ml-1">
                  {/* Path shortened */}
                  <path d="M296.256 354.944l224 224 224-224a74..."></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
