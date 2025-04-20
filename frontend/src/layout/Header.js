import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.items.length || 0; // Get the count of items in the cart
  return (
    <header className="shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Top Section */}
      <div className="flex items-center justify-between px-6 py-3 bg-white">
        {/* Logo */}
        <Link to="/"><div className="text-2xl font-bold text-red-600">Cherrfy</div></Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-6">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for products"
              className="flex-grow px-4 py-2 focus:outline-none"
            />
            <button className="bg-red-600 text-white px-4 hover:bg-red-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex space-x-4 items-center text-sm text-gray-600">
          {/* <div className="hover:text-red-600 cursor-pointer">Sign In</div>
          <div className="hover:text-red-600 cursor-pointer">Orders</div> */}
          <Link to="/cart" className="hover:text-gray-600 text-red-700 cursor-pointer">Cart ({cartItemCount})</Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-100 text-sm text-gray-700">
        <div className="flex space-x-6 px-6 py-2">
          <Link to="/">
            <div className="hover:text-red-600 cursor-pointer">Home</div>
          </Link>
          {/* <Link to="/about">
            <div className="hover:text-red-600 cursor-pointer">About</div>
          </Link>
          <Link to="/contact">
            <div className="hover:text-red-600 cursor-pointer">Contact</div>
          </Link>
          <Link to="/services">
            <div className="hover:text-red-600 cursor-pointer">Services</div>
          </Link>
          <Link to="/categories">
            <div className="hover:text-red-600 cursor-pointer">Categories</div>
          </Link>
          <Link to="/deals">
            <div className="hover:text-red-600 cursor-pointer">Deals</div>
          </Link> */}
        </div>

      </nav>
    </header>
  );
};

export default Header;
