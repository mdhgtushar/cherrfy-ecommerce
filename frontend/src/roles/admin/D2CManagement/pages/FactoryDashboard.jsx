import React, { useState } from "react";

export default function FactoryDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [withdrawableEarnings, setWithdrawableEarnings] = useState("");

  const handleWithdrawEarnings = () => {
    if (withdrawableEarnings) {
      console.log("Withdrawing earnings:", withdrawableEarnings);
      // Handle earnings withdrawal
    }
  };

  const handleViewGlobalSales = () => {
    console.log("Viewing global sales breakdown");
    // Handle global sales view
  };

  const handleViewPopularProducts = () => {
    console.log("Viewing popular products");
    // Handle popular products view
  };

  const handleViewReviews = () => {
    console.log("Viewing customer reviews");
    // Handle reviews view
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Factory Dashboard</h2>
        <p className="text-gray-600">Analytics, finance, and performance insights for your factory</p>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedPeriod("7d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === "7d" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setSelectedPeriod("30d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === "30d" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setSelectedPeriod("90d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === "90d" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            90 Days
          </button>
          <button 
            onClick={() => setSelectedPeriod("1y")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === "1y" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            1 Year
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-blue-600 text-2xl mr-3">💰</div>
            <div>
              <div className="text-2xl font-bold text-blue-600">$24,567</div>
              <div className="text-sm text-blue-700">Total Revenue</div>
              <div className="text-xs text-green-600">+12.5% from last period</div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-green-600 text-2xl mr-3">📦</div>
            <div>
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-green-700">Orders Shipped</div>
              <div className="text-xs text-green-600">+8.2% from last period</div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-yellow-600 text-2xl mr-3">⭐</div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <div className="text-sm text-yellow-700">Average Rating</div>
              <div className="text-xs text-green-600">+0.2 from last period</div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-purple-600 text-2xl mr-3">👥</div>
            <div>
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-purple-700">New Customers</div>
              <div className="text-xs text-green-600">+15.3% from last period</div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Sales Breakdown */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Global Sales Breakdown</h3>
          <button 
            onClick={handleViewGlobalSales}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            View Details
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
            <div className="text-sm text-gray-600">North America</div>
            <div className="text-xs text-gray-500">$11,055</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">32%</div>
            <div className="text-sm text-gray-600">Europe</div>
            <div className="text-xs text-gray-500">$7,861</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">23%</div>
            <div className="text-sm text-gray-600">Asia Pacific</div>
            <div className="text-xs text-gray-500">$5,651</div>
          </div>
        </div>
      </div>

      {/* Earnings Management */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Earnings Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Withdrawable Earnings (USD)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Enter amount to withdraw"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={withdrawableEarnings}
                onChange={(e) => setWithdrawableEarnings(e.target.value)}
                min="0"
                step="0.01"
              />
              <button 
                onClick={handleWithdrawEarnings}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Withdraw
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Available Balance: $8,432.50
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Pending Withdrawals</div>
              <div className="text-lg font-semibold">$2,150.00</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Next Payout Date</div>
              <div className="text-lg font-semibold">March 15, 2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Popular Products</h3>
            <button 
              onClick={handleViewPopularProducts}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">Wireless Headphones</div>
                <div className="text-sm text-gray-600">45 units sold</div>
              </div>
              <div className="text-green-600 font-semibold">$2,250</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">Smart Watch</div>
                <div className="text-sm text-gray-600">32 units sold</div>
              </div>
              <div className="text-green-600 font-semibold">$1,920</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">Bluetooth Speaker</div>
                <div className="text-sm text-gray-600">28 units sold</div>
              </div>
              <div className="text-green-600 font-semibold">$1,120</div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <button 
              onClick={handleViewReviews}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
                <span className="ml-2 text-sm font-medium">4.8/5</span>
              </div>
              <div className="text-sm text-gray-600">
                "Excellent quality and fast shipping!"
              </div>
              <div className="text-xs text-gray-500 mt-1">- John D.</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
                <span className="ml-2 text-sm font-medium">4.9/5</span>
              </div>
              <div className="text-sm text-gray-600">
                "Great product, exceeded expectations."
              </div>
              <div className="text-xs text-gray-500 mt-1">- Sarah M.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-green-50 rounded">
            <div className="text-green-600 mr-3">✅</div>
            <div className="flex-1">
              <div className="text-sm font-medium">Order #ORD-156 completed</div>
              <div className="text-xs text-gray-600">2 hours ago</div>
            </div>
            <div className="text-sm font-semibold text-green-600">+$299.99</div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded">
            <div className="text-blue-600 mr-3">📦</div>
            <div className="flex-1">
              <div className="text-sm font-medium">New order received</div>
              <div className="text-xs text-gray-600">4 hours ago</div>
            </div>
            <div className="text-sm font-semibold text-blue-600">#ORD-157</div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded">
            <div className="text-yellow-600 mr-3">⭐</div>
            <div className="flex-1">
              <div className="text-sm font-medium">New 5-star review received</div>
              <div className="text-xs text-gray-600">6 hours ago</div>
            </div>
            <div className="text-sm font-semibold text-yellow-600">Wireless Headphones</div>
          </div>
        </div>
      </div>
    </div>
  );
}
