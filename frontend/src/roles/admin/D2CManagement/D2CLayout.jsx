import React, { useState } from "react";

export default function D2CLayout({ children, activeTab, setActiveTab }) {
  const tabs = [
    { id: "factory-registration", label: "Factory Registration", icon: "🏭" },
    { id: "product-management", label: "Product Management", icon: "📦" },
    { id: "order-management", label: "Order Management", icon: "📋" },
    { id: "shipping-zones", label: "Shipping Zones", icon: "🚚" },
    { id: "factory-dashboard", label: "Factory Dashboard", icon: "📊" },
    { id: "storefront-branding", label: "Storefront Branding", icon: "🎨" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">🏭 D2C Management</h1>
            <div className="text-sm text-gray-500">
              Factory to Customer Platform
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
