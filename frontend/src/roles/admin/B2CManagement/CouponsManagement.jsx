import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const CouponsManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [filteredFlashSales, setFilteredFlashSales] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("coupons");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Mock data - replace with actual API call
  const mockCoupons = [
    {
      id: 1,
      code: "WELCOME10",
      name: "Welcome Discount",
      type: "percentage",
      value: 10,
      minOrder: 50,
      maxDiscount: 25,
      usageLimit: 1000,
      usedCount: 245,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      applicableProducts: "all",
      customerGroups: ["new", "regular"]
    },
    {
      id: 2,
      code: "SAVE20",
      name: "Summer Sale",
      type: "fixed",
      value: 20,
      minOrder: 100,
      maxDiscount: null,
      usageLimit: 500,
      usedCount: 89,
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      applicableProducts: "electronics",
      customerGroups: ["all"]
    },
    {
      id: 3,
      code: "VIP15",
      name: "VIP Exclusive",
      type: "percentage",
      value: 15,
      minOrder: 200,
      maxDiscount: 50,
      usageLimit: 100,
      usedCount: 67,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      applicableProducts: "premium",
      customerGroups: ["vip"]
    },
    {
      id: 4,
      code: "EXPIRED5",
      name: "Old Coupon",
      type: "percentage",
      value: 5,
      minOrder: 25,
      maxDiscount: 10,
      usageLimit: 200,
      usedCount: 200,
      status: "expired",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      applicableProducts: "all",
      customerGroups: ["all"]
    }
  ];

  const mockFlashSales = [
    {
      id: 1,
      name: "Black Friday Electronics",
      description: "Up to 70% off on electronics",
      discount: 70,
      startDate: "2024-11-29",
      endDate: "2024-11-30",
      startTime: "00:00",
      endTime: "23:59",
      status: "scheduled",
      products: ["PROD-001", "PROD-002", "PROD-003"],
      categories: ["electronics"],
      priority: 1
    },
    {
      id: 2,
      name: "Weekend Flash Sale",
      description: "50% off on selected items",
      discount: 50,
      startDate: "2024-01-20",
      endDate: "2024-01-21",
      startTime: "09:00",
      endTime: "18:00",
      status: "active",
      products: ["PROD-004", "PROD-005"],
      categories: ["home", "fashion"],
      priority: 2
    },
    {
      id: 3,
      name: "New Year Clearance",
      description: "Clearance sale on old inventory",
      discount: 80,
      startDate: "2024-01-01",
      endDate: "2024-01-07",
      startTime: "00:00",
      endTime: "23:59",
      status: "completed",
      products: ["PROD-006", "PROD-007", "PROD-008"],
      categories: ["clearance"],
      priority: 3
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCoupons(mockCoupons);
      setFlashSales(mockFlashSales);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = activeTab === "coupons" ? coupons : flashSales;

    // Filter by search term
    if (searchFilter) {
      if (activeTab === "coupons") {
        filtered = filtered.filter(coupon =>
          coupon.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
          coupon.name.toLowerCase().includes(searchFilter.toLowerCase())
        );
      } else {
        filtered = filtered.filter(sale =>
          sale.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          sale.description.toLowerCase().includes(searchFilter.toLowerCase())
        );
      }
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Filter by type (for coupons only)
    if (activeTab === "coupons" && typeFilter !== "all") {
      filtered = filtered.filter(coupon => coupon.type === typeFilter);
    }

    if (activeTab === "coupons") {
      setFilteredCoupons(filtered);
    } else {
      setFilteredFlashSales(filtered);
    }
  }, [coupons, flashSales, searchFilter, statusFilter, typeFilter, activeTab]);

  const handleCreateItem = () => {
    setShowCreateModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowCreateModal(true);
  };

  const handleDeleteItem = (itemId) => {
    const itemType = activeTab === "coupons" ? "coupon" : "flash sale";
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      if (activeTab === "coupons") {
        setCoupons(prev => prev.filter(coupon => coupon.id !== itemId));
      } else {
        setFlashSales(prev => prev.filter(sale => sale.id !== itemId));
      }
    }
  };

  const handleToggleStatus = (itemId) => {
    if (activeTab === "coupons") {
      setCoupons(prev =>
        prev.map(coupon =>
          coupon.id === itemId
            ? { ...coupon, status: coupon.status === 'active' ? 'inactive' : 'active' }
            : coupon
        )
      );
    } else {
      setFlashSales(prev =>
        prev.map(sale =>
          sale.id === itemId
            ? { ...sale, status: sale.status === 'active' ? 'inactive' : 'active' }
            : sale
        )
      );
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-purple-100 text-purple-800"
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const getUsagePercentage = (used, limit) => {
    return limit > 0 ? (used / limit) * 100 : 0;
  };

  const isExpiringSoon = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const getActiveCouponsCount = () => coupons.filter(c => c.status === 'active').length;
  const getActiveFlashSalesCount = () => flashSales.filter(s => s.status === 'active').length;
  const getTotalCouponUsage = () => coupons.reduce((sum, c) => sum + c.usedCount, 0);
  const getTotalFlashSalesRevenue = () => flashSales.reduce((sum, s) => sum + (s.discount * 100), 0); // Mock calculation

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coupons & Flash Sales Management</h2>
            <p className="text-gray-600">Create and manage promotional campaigns and discount codes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">🎫</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Coupons</p>
                  <p className="text-2xl font-bold text-gray-900">{getActiveCouponsCount()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Flash Sales</p>
                  <p className="text-2xl font-bold text-gray-900">{getActiveFlashSalesCount()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Usage</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCouponUsage()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue Impact</p>
                  <p className="text-2xl font-bold text-gray-900">${getTotalFlashSalesRevenue()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("coupons")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "coupons"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">🎫</span>
                  Coupons ({coupons.length})
                </button>
                <button
                  onClick={() => setActiveTab("flashsales")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "flashsales"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">⚡</span>
                  Flash Sales ({flashSales.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Filters and Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder={
                      activeTab === "coupons"
                        ? "Search coupons by code or name"
                        : "Search flash sales by name or description"
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                  
                  <select
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                    {activeTab === "flashsales" && (
                      <>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                      </>
                    )}
                  </select>

                  {activeTab === "coupons" && (
                    <select
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  )}
                </div>

                <button
                  onClick={handleCreateItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Create {activeTab === "coupons" ? "Coupon" : "Flash Sale"}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading data...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {activeTab === "coupons" ? (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Coupon Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Discount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Usage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Validity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Sale Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Discount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Schedule
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Products
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(activeTab === "coupons" ? filteredCoupons : filteredFlashSales).map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {activeTab === "coupons" ? (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.code}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Min Order: ${item.minOrder}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.type === 'percentage' ? `${item.value}%` : `$${item.value}`}
                                </div>
                                {item.maxDiscount && (
                                  <div className="text-xs text-gray-500">
                                    Max: ${item.maxDiscount}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.usedCount} / {item.usageLimit}
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${getUsagePercentage(item.usedCount, item.usageLimit)}%` }}
                                  ></div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(item.startDate).toLocaleDateString()}
                                </div>
                                <div className={`text-sm ${isExpiringSoon(item.endDate) ? 'text-red-600' : 'text-gray-500'}`}>
                                  to {new Date(item.endDate).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.description}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Priority: {item.priority}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.discount}% OFF
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(item.startDate).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.startTime} - {item.endTime}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.products.length} products
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.categories.join(', ')}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditItem(item)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleToggleStatus(item.id)}
                                className={item.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                              >
                                {item.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {(activeTab === "coupons" ? filteredCoupons : filteredFlashSales).length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No {activeTab === "coupons" ? "coupons" : "flash sales"} found matching your criteria.
                  </p>
                  <button
                    onClick={handleCreateItem}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First {activeTab === "coupons" ? "Coupon" : "Flash Sale"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? `Edit ${activeTab === "coupons" ? "Coupon" : "Flash Sale"}` : `Create New ${activeTab === "coupons" ? "Coupon" : "Flash Sale"}`}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingItem(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {activeTab === "coupons" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coupon Code
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., WELCOME10"
                        defaultValue={editingItem?.code || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coupon Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Welcome Discount"
                        defaultValue={editingItem?.name || ''}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Type
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Value
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10"
                        defaultValue={editingItem?.value || ''}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flash Sale Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Black Friday Electronics"
                      defaultValue={editingItem?.name || ''}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Describe the flash sale"
                      defaultValue={editingItem?.description || ''}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Percentage
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="50"
                        defaultValue={editingItem?.discount || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1"
                        defaultValue={editingItem?.priority || ''}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {editingItem ? 'Update' : 'Create'} {activeTab === "coupons" ? "Coupon" : "Flash Sale"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsManagement;
