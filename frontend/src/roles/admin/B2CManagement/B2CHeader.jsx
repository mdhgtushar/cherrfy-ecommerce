import React from "react";
import { Link, useLocation } from "react-router-dom";

const B2CHeader = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/manage-admin/b2c/customers",
      label: "👥 Customers",
      icon: "👥"
    },
    {
      path: "/manage-admin/b2c/orders",
      label: "📦 Orders",
      icon: "📦"
    },
    {
      path: "/manage-admin/b2c/wishlist",
      label: "❤️ Wishlist & Cart",
      icon: "❤️"
    },
    {
      path: "/manage-admin/b2c/reviews",
      label: "⭐ Reviews & Feedback",
      icon: "⭐"
    },
    {
      path: "/manage-admin/b2c/pricing",
      label: "💰 Pricing Rules",
      icon: "💰"
    },
    {
      path: "/manage-admin/b2c/coupons",
      label: "🎫 Coupons & Sales",
      icon: "🎫"
    },
    {
      path: "/manage-admin/b2c/loyalty",
      label: "🏆 Loyalty & Referrals",
      icon: "🏆"
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">💼 B2C Management</h1>
           
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="lg:hidden">{item.icon}</span>
                </Link>
              ))}
            </div>
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2CHeader;
