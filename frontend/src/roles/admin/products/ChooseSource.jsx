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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    bestFor: "Unique products, custom items, or when you need complete control",
    estimatedTime: "10-15 minutes per product",
    difficulty: "Easy"
  },
  {
    id: "aliexpress",
    name: "AliExpress Import",
    description: "Import products directly from AliExpress with automatic data extraction",
    route: ADMIN_PATHS.PRODUCTS.ALIEXPRESS,
    color: "orange",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    bestFor: "Dropshipping, bulk product imports, or AliExpress sourcing",
    estimatedTime: "2-5 minutes per product",
    difficulty: "Medium"
  },
  {
    id: "factory",
    name: "Factory Direct",
    description: "Connect with manufacturers and import factory-direct products",
    route: ADMIN_PATHS.PRODUCTS.ADD,
    color: "green",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    bestFor: "Wholesale, private labeling, or custom manufacturing",
    estimatedTime: "15-30 minutes per product",
    difficulty: "Advanced"
  },
  {
    id: "vendor",
    name: "Vendor Upload",
    description: "Allow vendors to upload and manage their own products",
    route: ADMIN_PATHS.PRODUCTS.ADD,
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    bestFor: "Marketplace platforms, vendor partnerships, or multi-seller stores",
    estimatedTime: "5-10 minutes per product",
    difficulty: "Medium"
  }
];

const ChooseSource = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getColorClasses = (color, isSelected = false, isHovered = false) => {
    const colors = {
      blue: {
        bg: isSelected ? "bg-blue-600" : isHovered ? "bg-blue-50" : "bg-white",
        border: "border-blue-200",
        text: "text-blue-600",
        hover: "hover:bg-blue-50 hover:border-blue-300",
        gradient: "from-blue-500 to-blue-600"
      },
      orange: {
        bg: isSelected ? "bg-orange-600" : isHovered ? "bg-orange-50" : "bg-white",
        border: "border-orange-200",
        text: "text-orange-600",
        hover: "hover:bg-orange-50 hover:border-orange-300",
        gradient: "from-orange-500 to-orange-600"
      },
      green: {
        bg: isSelected ? "bg-green-600" : isHovered ? "bg-green-50" : "bg-white",
        border: "border-green-200",
        text: "text-green-600",
        hover: "hover:bg-green-50 hover:border-green-300",
        gradient: "from-green-500 to-green-600"
      },
      purple: {
        bg: isSelected ? "bg-purple-600" : isHovered ? "bg-purple-50" : "bg-white",
        border: "border-purple-200",
        text: "text-purple-600",
        hover: "hover:bg-purple-50 hover:border-purple-300",
        gradient: "from-purple-500 to-purple-600"
      }
    };
    return colors[color];
  };

  const handleSourceSelect = async (source) => {
    setSelectedSource(source.id);
    setIsLoading(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      navigate(source.route);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Create New Product</h1>
                <p className="text-slate-600 text-sm">Choose how you'd like to add products</p>
              </div>
            </div>
            <Link
              to={ADMIN_PATHS.PRODUCTS.BASE}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Introduction */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Select Your Product Source
          </h2>
          <p className="text-slate-600">
            Choose the method that best fits your business needs
          </p>
        </div>

        {/* Source Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                <div className={`h-full ${colorClasses.bg} ${colorClasses.border} border rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${colorClasses.hover}`}>
                  {/* Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${colorClasses.text} bg-opacity-10`}>
                        {source.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          source.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          source.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {source.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                          {source.estimatedTime}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {source.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        {source.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-3">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="line-clamp-2">Best for: {source.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-4 pb-4">
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">Key Features</h4>
                    <ul className="space-y-1">
                      {source.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.text} bg-opacity-60`}></div>
                          <span className="text-slate-700 text-xs">{feature}</span>
                        </li>
                      ))}
                      {source.features.length > 3 && (
                        <li className="text-xs text-slate-500">
                          +{source.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                        selectedSource === source.id
                          ? `bg-gradient-to-r ${colorClasses.gradient} text-white shadow-md`
                          : `${colorClasses.text} bg-white border ${colorClasses.border} hover:bg-opacity-5`
                      }`}
                      disabled={isLoading && selectedSource === source.id}
                    >
                      {isLoading && selectedSource === source.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        `Choose ${source.name}`
                      )}
                    </button>
                  </div>

                  {/* Selection Indicator */}
                  {selectedSource === source.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Fast Setup</h3>
            <p className="text-slate-600 text-xs">Get started in minutes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Quality Assured</h3>
            <p className="text-slate-600 text-xs">Quality verification process</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Secure Process</h3>
            <p className="text-slate-600 text-xs">Enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSource;
