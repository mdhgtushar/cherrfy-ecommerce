import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md md:hidden py-4 px-6 flex justify-between items-center border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">Developer Corner</h1>
      <button
        onClick={toggleSidebar}
        className="text-gray-600 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </header>
  );
};
export default Header;
