import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const PricingManagement = () => {
  const [pricingRules, setPricingRules] = useState([]);
  const [filteredRules, setFilteredRules] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Mock data - replace with actual API call
  const mockPricingRules = [
    {
      id: 1,
      name: "US Premium Pricing",
      type: "country",
      target: "United States",
      condition: "country = 'US'",
      action: "markup",
      value: 15,
      status: "active",
      priority: 1,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15"
    },
    {
      id: 2,
      name: "VIP Customer Discount",
      type: "customer",
      target: "VIP Customers",
      condition: "customer_tier = 'VIP'",
      action: "discount",
      value: 10,
      status: "active",
      priority: 2,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Bulk Order Discount",
      type: "quantity",
      target: "Bulk Orders",
      condition: "quantity >= 10",
      action: "discount",
      value: 20,
      status: "active",
      priority: 3,
      createdAt: "2024-01-08",
      updatedAt: "2024-01-12"
    },
    {
      id: 4,
      name: "EU VAT Adjustment",
      type: "country",
      target: "European Union",
      condition: "country IN ('DE', 'FR', 'IT', 'ES')",
      action: "markup",
      value: 8,
      status: "inactive",
      priority: 4,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-14"
    },
    {
      id: 5,
      name: "New Customer Welcome",
      type: "customer",
      target: "First-time Buyers",
      condition: "order_count = 1",
      action: "discount",
      value: 5,
      status: "active",
      priority: 5,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-15"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPricingRules(mockPricingRules);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = pricingRules;

    // Filter by search term
    if (searchFilter) {
      filtered = filtered.filter(rule =>
        rule.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        rule.target.toLowerCase().includes(searchFilter.toLowerCase()) ||
        rule.condition.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter(rule => rule.type === typeFilter);
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(rule => rule.status === statusFilter);
    }

    setFilteredRules(filtered);
  }, [pricingRules, searchFilter, typeFilter, statusFilter]);

  const handleCreateRule = () => {
    setShowCreateModal(true);
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setShowCreateModal(true);
  };

  const handleDeleteRule = (ruleId) => {
    if (window.confirm("Are you sure you want to delete this pricing rule?")) {
      setPricingRules(prev => prev.filter(rule => rule.id !== ruleId));
    }
  };

  const handleToggleStatus = (ruleId) => {
    setPricingRules(prev =>
      prev.map(rule =>
        rule.id === ruleId
          ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
          : rule
      )
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      draft: "bg-yellow-100 text-yellow-800"
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      country: "🌍",
      customer: "👤",
      quantity: "📦",
      category: "🏷️",
      product: "🛍️"
    };
    return typeIcons[type] || "⚙️";
  };

  const getActionColor = (action) => {
    return action === 'discount' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">B2C Pricing Rules Management</h2>
            <p className="text-gray-600">Create and manage dynamic pricing rules for B2C customers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">⚙️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Rules</p>
                  <p className="text-2xl font-bold text-gray-900">{pricingRules.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Rules</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pricingRules.filter(r => r.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🌍</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Country Rules</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pricingRules.filter(r => r.type === 'country').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Impact</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pricingRules.length > 0 
                      ? (pricingRules.reduce((sum, rule) => sum + rule.value, 0) / pricingRules.length).toFixed(1) + '%'
                      : '0%'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <button
                onClick={handleCreateRule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create New Rule
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Country-Based Pricing</p>
                    <p className="text-sm text-gray-600">Set different prices by country</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Customer Tier Pricing</p>
                    <p className="text-sm text-gray-600">VIP, Premium, Regular pricing</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📦</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Volume Discounts</p>
                    <p className="text-sm text-gray-600">Bulk order pricing rules</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Rules
                </label>
                <input
                  type="text"
                  placeholder="Search by name, target, or condition"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Type
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="country">Country</option>
                  <option value="customer">Customer</option>
                  <option value="quantity">Quantity</option>
                  <option value="category">Category</option>
                  <option value="product">Product</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Export Rules
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Rules List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Pricing Rules ({filteredRules.length})
              </h3>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading pricing rules...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rule Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type & Target
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {rule.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {rule.condition}
                            </div>
                            <div className="text-xs text-gray-400">
                              Updated: {new Date(rule.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getTypeIcon(rule.type)}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 capitalize">
                                {rule.type}
                              </div>
                              <div className="text-sm text-gray-500">
                                {rule.target}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium capitalize ${getActionColor(rule.action)}`}>
                            {rule.action === 'discount' ? '↓' : '↑'} {rule.value}%
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {rule.action}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Priority {rule.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(rule.status)}`}>
                            {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditRule(rule)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleToggleStatus(rule.id)}
                              className={rule.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                            >
                              {rule.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteRule(rule.id)}
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

            {filteredRules.length === 0 && !loading && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No pricing rules found matching your criteria.</p>
                <button
                  onClick={handleCreateRule}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Rule
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingRule ? 'Edit Pricing Rule' : 'Create New Pricing Rule'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingRule(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rule Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter rule name"
                  defaultValue={editingRule?.name || ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="country">Country</option>
                    <option value="customer">Customer</option>
                    <option value="quantity">Quantity</option>
                    <option value="category">Category</option>
                    <option value="product">Product</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="discount">Discount</option>
                    <option value="markup">Markup</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value (%)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter percentage value"
                  defaultValue={editingRule?.value || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter condition (e.g., country = 'US')"
                  defaultValue={editingRule?.condition || ''}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingRule(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManagement;
