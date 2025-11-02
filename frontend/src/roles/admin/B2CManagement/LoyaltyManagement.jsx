import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const LoyaltyManagement = () => {
  const [loyaltyData, setLoyaltyData] = useState([]);
  const [referralData, setReferralData] = useState([]);
  const [fraudData, setFraudData] = useState([]);
  const [filteredLoyalty, setFilteredLoyalty] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filteredFraud, setFilteredFraud] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("loyalty");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Mock data - replace with actual API call
  const mockLoyaltyData = [
    {
      id: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      tier: "Gold",
      points: 2500,
      totalSpent: 5000,
      ordersCount: 25,
      joinDate: "2023-01-15",
      lastActivity: "2024-01-15",
      status: "active",
      nextTierPoints: 500,
      lifetimeValue: 5000
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      tier: "Platinum",
      points: 5000,
      totalSpent: 10000,
      ordersCount: 50,
      joinDate: "2022-06-20",
      lastActivity: "2024-01-14",
      status: "active",
      nextTierPoints: 0,
      lifetimeValue: 10000
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      tier: "Silver",
      points: 800,
      totalSpent: 2000,
      ordersCount: 10,
      joinDate: "2023-08-10",
      lastActivity: "2024-01-10",
      status: "inactive",
      nextTierPoints: 1200,
      lifetimeValue: 2000
    },
    {
      id: 4,
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      tier: "Bronze",
      points: 200,
      totalSpent: 500,
      ordersCount: 3,
      joinDate: "2024-01-01",
      lastActivity: "2024-01-12",
      status: "active",
      nextTierPoints: 300,
      lifetimeValue: 500
    }
  ];

  const mockReferralData = [
    {
      id: 1,
      referrerName: "John Doe",
      referrerEmail: "john@example.com",
      referredName: "Alice Brown",
      referredEmail: "alice@example.com",
      referralCode: "JOHN2024",
      status: "completed",
      reward: 50,
      date: "2024-01-10",
      referredOrderValue: 250
    },
    {
      id: 2,
      referrerName: "Jane Smith",
      referrerEmail: "jane@example.com",
      referredName: "Bob Wilson",
      referredEmail: "bob@example.com",
      referralCode: "JANE2024",
      status: "pending",
      reward: 25,
      date: "2024-01-12",
      referredOrderValue: 0
    },
    {
      id: 3,
      referrerName: "Mike Johnson",
      referrerEmail: "mike@example.com",
      referredName: "Carol Davis",
      referredEmail: "carol@example.com",
      referralCode: "MIKE2024",
      status: "completed",
      reward: 75,
      date: "2024-01-08",
      referredOrderValue: 500
    }
  ];

  const mockFraudData = [
    {
      id: 1,
      customerName: "Suspicious User",
      customerEmail: "suspicious@example.com",
      riskScore: 85,
      flaggedReasons: ["Multiple accounts", "Unusual behavior", "High return rate"],
      status: "under_review",
      flaggedDate: "2024-01-15",
      totalOrders: 5,
      totalReturns: 4,
      suspiciousActivity: "Created 3 accounts in 1 day"
    },
    {
      id: 2,
      customerName: "High Risk Customer",
      customerEmail: "risk@example.com",
      riskScore: 92,
      flaggedReasons: ["Chargeback history", "Fake address"],
      status: "blocked",
      flaggedDate: "2024-01-14",
      totalOrders: 2,
      totalReturns: 2,
      suspiciousActivity: "Multiple chargebacks"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoyaltyData(mockLoyaltyData);
      setReferralData(mockReferralData);
      setFraudData(mockFraudData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [];

    if (activeTab === "loyalty") {
      filtered = loyaltyData;
    } else if (activeTab === "referrals") {
      filtered = referralData;
    } else {
      filtered = fraudData;
    }

    // Filter by search term
    if (searchFilter) {
      if (activeTab === "loyalty") {
        filtered = filtered.filter(item =>
          item.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.customerEmail.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.tier.toLowerCase().includes(searchFilter.toLowerCase())
        );
      } else if (activeTab === "referrals") {
        filtered = filtered.filter(item =>
          item.referrerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.referredName.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.referralCode.toLowerCase().includes(searchFilter.toLowerCase())
        );
      } else {
        filtered = filtered.filter(item =>
          item.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.customerEmail.toLowerCase().includes(searchFilter.toLowerCase())
        );
      }
    }

    // Filter by tier (loyalty only)
    if (activeTab === "loyalty" && tierFilter !== "all") {
      filtered = filtered.filter(item => item.tier.toLowerCase() === tierFilter.toLowerCase());
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (activeTab === "loyalty") {
      setFilteredLoyalty(filtered);
    } else if (activeTab === "referrals") {
      setFilteredReferrals(filtered);
    } else {
      setFilteredFraud(filtered);
    }
  }, [loyaltyData, referralData, fraudData, searchFilter, tierFilter, statusFilter, activeTab]);

  const handleCreateItem = () => {
    setShowCreateModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowCreateModal(true);
  };

  const handleDeleteItem = (itemId) => {
    const itemType = activeTab === "loyalty" ? "loyalty record" : activeTab === "referrals" ? "referral" : "fraud record";
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      if (activeTab === "loyalty") {
        setLoyaltyData(prev => prev.filter(item => item.id !== itemId));
      } else if (activeTab === "referrals") {
        setReferralData(prev => prev.filter(item => item.id !== itemId));
      } else {
        setFraudData(prev => prev.filter(item => item.id !== itemId));
      }
    }
  };

  const getTierBadge = (tier) => {
    const tierConfig = {
      Bronze: "bg-orange-100 text-orange-800",
      Silver: "bg-gray-100 text-gray-800",
      Gold: "bg-yellow-100 text-yellow-800",
      Platinum: "bg-purple-100 text-purple-800",
      Diamond: "bg-blue-100 text-blue-800"
    };
    return tierConfig[tier] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      under_review: "bg-orange-100 text-orange-800",
      blocked: "bg-red-100 text-red-800"
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const getRiskColor = (score) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-orange-600";
    if (score >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getTotalPoints = () => loyaltyData.reduce((sum, item) => sum + item.points, 0);
  const getTotalReferrals = () => referralData.filter(item => item.status === 'completed').length;
  const getTotalFraudCases = () => fraudData.filter(item => item.status === 'under_review').length;
  const getAverageLifetimeValue = () => {
    if (loyaltyData.length === 0) return 0;
    return loyaltyData.reduce((sum, item) => sum + item.lifetimeValue, 0) / loyaltyData.length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loyalty & Referral Points Management</h2>
            <p className="text-gray-600">Manage customer loyalty programs, referrals, and fraud detection</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalPoints().toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Successful Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalReferrals()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <span className="text-2xl">🚨</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fraud Cases</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalFraudCases()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Lifetime Value</p>
                  <p className="text-2xl font-bold text-gray-900">${getAverageLifetimeValue().toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("loyalty")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "loyalty"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">🏆</span>
                  Loyalty Points ({loyaltyData.length})
                </button>
                <button
                  onClick={() => setActiveTab("referrals")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "referrals"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">👥</span>
                  Referral Program ({referralData.length})
                </button>
                <button
                  onClick={() => setActiveTab("fraud")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "fraud"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">🚨</span>
                  Fraud Detection ({fraudData.length})
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
                      activeTab === "loyalty"
                        ? "Search by customer name, email, or tier"
                        : activeTab === "referrals"
                        ? "Search by referrer, referred, or code"
                        : "Search by customer name or email"
                    }
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                  
                  {activeTab === "loyalty" && (
                    <select
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierFilter}
                      onChange={(e) => setTierFilter(e.target.value)}
                    >
                      <option value="all">All Tiers</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Diamond">Diamond</option>
                    </select>
                  )}

                  <select
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    {activeTab === "loyalty" && (
                      <>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </>
                    )}
                    {activeTab === "referrals" && (
                      <>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </>
                    )}
                    {activeTab === "fraud" && (
                      <>
                        <option value="under_review">Under Review</option>
                        <option value="blocked">Blocked</option>
                        <option value="resolved">Resolved</option>
                      </>
                    )}
                  </select>
                </div>

                <button
                  onClick={handleCreateItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + {activeTab === "loyalty" ? "Add Points" : activeTab === "referrals" ? "Create Referral" : "Flag Customer"}
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
                        {activeTab === "loyalty" ? (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tier & Points
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Activity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Lifetime Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </>
                        ) : activeTab === "referrals" ? (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Referrer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Referred Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Referral Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Reward
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
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Risk Score
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Flagged Reasons
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Activity
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
                      {(activeTab === "loyalty" ? filteredLoyalty : activeTab === "referrals" ? filteredReferrals : filteredFraud).map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {activeTab === "loyalty" ? (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.customerName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.customerEmail}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Joined: {new Date(item.joinDate).toLocaleDateString()}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierBadge(item.tier)}`}>
                                    {item.tier}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-900 mt-1">
                                  {item.points.toLocaleString()} points
                                </div>
                                {item.nextTierPoints > 0 && (
                                  <div className="text-xs text-gray-500">
                                    {item.nextTierPoints} to next tier
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.ordersCount} orders
                                </div>
                                <div className="text-sm text-gray-500">
                                  ${item.totalSpent.toLocaleString()} spent
                                </div>
                                <div className="text-xs text-gray-400">
                                  Last: {new Date(item.lastActivity).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  ${item.lifetimeValue.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                              </td>
                            </>
                          ) : activeTab === "referrals" ? (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.referrerName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.referrerEmail}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.referredName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.referredEmail}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.referralCode}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(item.date).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.reward} points
                                </div>
                                {item.referredOrderValue > 0 && (
                                  <div className="text-xs text-gray-500">
                                    Order: ${item.referredOrderValue}
                                  </div>
                                )}
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
                                    {item.customerName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.customerEmail}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Flagged: {new Date(item.flaggedDate).toLocaleDateString()}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`text-sm font-medium ${getRiskColor(item.riskScore)}`}>
                                  {item.riskScore}/100
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div
                                    className={`h-2 rounded-full ${item.riskScore >= 80 ? 'bg-red-500' : item.riskScore >= 60 ? 'bg-orange-500' : item.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                    style={{ width: `${item.riskScore}%` }}
                                  ></div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.flaggedReasons.join(', ')}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.suspiciousActivity}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.totalOrders} orders
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.totalReturns} returns
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                                  {item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.replace('_', ' ').slice(1)}
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
                                View
                              </button>
                              {activeTab === "fraud" && (
                                <>
                                  <button className="text-green-600 hover:text-green-900">
                                    Resolve
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    Block
                                  </button>
                                </>
                              )}
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

              {(activeTab === "loyalty" ? filteredLoyalty : activeTab === "referrals" ? filteredReferrals : filteredFraud).length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No {activeTab === "loyalty" ? "loyalty records" : activeTab === "referrals" ? "referrals" : "fraud cases"} found matching your criteria.
                  </p>
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
                {editingItem ? `Edit ${activeTab}` : `Create New ${activeTab === "loyalty" ? "Loyalty Record" : activeTab === "referrals" ? "Referral" : "Fraud Case"}`}
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
              {activeTab === "loyalty" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue={editingItem?.customerName || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue={editingItem?.points || ''}
                      />
                    </div>
                  </div>
                </>
              ) : activeTab === "referrals" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Referrer Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue={editingItem?.referrerEmail || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Referred Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue={editingItem?.referredEmail || ''}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={editingItem?.customerEmail || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={editingItem?.riskScore || ''}
                    />
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
                {editingItem ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyManagement;
