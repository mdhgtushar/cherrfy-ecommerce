import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ADMIN_PATHS from "../ADMIN_PATHS";

const sources = [
  {
    id: "manual",
    name: "Manual Creation",
    description: "Create products manually with full control over all details",
    route: ADMIN_PATHS.PRODUCTS.ADD,
    color: "blue",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    features: [
      "Full control over product details",
      "Custom pricing and inventory",
      "Manual image upload",
      "SEO optimization",
      "Custom specifications"
    ],
    bestFor: "Unique products, custom items, or when you need complete control"
  },
  {
    id: "aliexpress",
    name: "AliExpress Import",
    description: "Import products directly from AliExpress with automatic data extraction",
    route: ADMIN_PATHS.PRODUCTS.ALIEXPRESS,
    color: "red",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
      </svg>
    ),
    features: [
      "Automatic product data extraction",
      "Bulk import capabilities",
      "Real-time pricing updates",
      "Multiple SKU support",
      "Image gallery import"
    ],
    bestFor: "Dropshipping, bulk product imports, or AliExpress sourcing"
  },
  {
    id: "factory",
    name: "Factory Direct",
    description: "Connect with manufacturers and import factory-direct products",
    route: ADMIN_PATHS.PRODUCTS.ADD,
    color: "green",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      "Direct manufacturer connections",
      "Bulk order capabilities",
      "Custom manufacturing options",
      "Quality control integration",
      "Supply chain management"
    ],
    bestFor: "Wholesale, private labeling, or custom manufacturing"
  },
  {
    id: "vendor",
    name: "Vendor Upload",
    description: "Allow vendors to upload and manage their own products",
    route: ADMIN_PATHS.PRODUCTS.ADD,
    color: "yellow",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    features: [
      "Vendor self-service portal",
      "Approval workflow system",
      "Commission management",
      "Vendor analytics",
      "Multi-vendor marketplace"
    ],
    bestFor: "Marketplace platforms, vendor partnerships, or multi-seller stores"
  }
];

const ChooseSource = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  const getColorClasses = (color, isSelected = false, isHovered = false) => {
    const colors = {
      blue: {
        bg: isSelected ? "bg-blue-600" : isHovered ? "bg-blue-50" : "bg-white",
        border: "border-blue-200",
        text: "text-blue-600",
        hover: "hover:bg-blue-50 hover:border-blue-300"
      },
      red: {
        bg: isSelected ? "bg-red-600" : isHovered ? "bg-red-50" : "bg-white",
        border: "border-red-200",
        text: "text-red-600",
        hover: "hover:bg-red-50 hover:border-red-300"
      },
      green: {
        bg: isSelected ? "bg-green-600" : isHovered ? "bg-green-50" : "bg-white",
        border: "border-green-200",
        text: "text-green-600",
        hover: "hover:bg-green-50 hover:border-green-300"
      },
      yellow: {
        bg: isSelected ? "bg-yellow-600" : isHovered ? "bg-yellow-50" : "bg-white",
        border: "border-yellow-200",
        text: "text-yellow-600",
        hover: "hover:bg-yellow-50 hover:border-yellow-300"
      }
    };
    return colors[color];
  };

  const handleSourceSelect = (source) => {
    setSelectedSource(source.id);
    // Add a small delay for better UX
    setTimeout(() => {
      navigate(source.route);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
              <p className="text-gray-600 mt-2">
                Choose how you'd like to add products to your catalog
              </p>
            </div>
            <Link
              to={ADMIN_PATHS.PRODUCTS.BASE}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Select Your Product Source
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the method that best fits your business needs. Each option offers different features and workflows.
            </p>
          </div>
        </div>

        {/* Source Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {sources.map((source) => {
            const colorClasses = getColorClasses(
              source.color, 
              selectedSource === source.id, 
              isHovered === source.id
            );
            
            return (
              <div
                key={source.id}
                className={`relative group cursor-pointer transition-all duration-300 transform ${
                  selectedSource === source.id ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => handleSourceSelect(source)}
                onMouseEnter={() => setIsHovered(source.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Card */}
                <div className={`h-full ${colorClasses.bg} ${colorClasses.border} border-2 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${colorClasses.hover}`}>
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${colorClasses.text} bg-opacity-10`}>
                        {source.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {source.name}
                        </h3>
                        <p className="text-gray-600">
                          {source.description}
                        </p>
                      </div>
                      <div className={`p-2 rounded-full ${colorClasses.text} bg-opacity-10`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2 mb-4">
                      {source.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Best For */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Best for:</h5>
                      <p className="text-sm text-gray-600">{source.bestFor}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 bg-gray-50">
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        selectedSource === source.id
                          ? 'bg-blue-600 text-white'
                          : `${colorClasses.text} bg-white border-2 ${colorClasses.border} hover:bg-gray-50`
                      }`}
                    >
                      {selectedSource === source.id ? 'Selected...' : `Choose ${source.name}`}
                    </button>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedSource === source.id && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600">
              Here's a quick guide to help you select the right option
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Manual Creation</h4>
              <p className="text-sm text-gray-600">For unique products or when you need complete control</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">AliExpress Import</h4>
              <p className="text-sm text-gray-600">For dropshipping or bulk product imports</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Factory Direct</h4>
              <p className="text-sm text-gray-600">For wholesale or custom manufacturing</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Vendor Upload</h4>
              <p className="text-sm text-gray-600">For marketplace or multi-vendor platforms</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Still unsure? Our team is here to help you choose the right option.
          </p>
          <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseSource;
