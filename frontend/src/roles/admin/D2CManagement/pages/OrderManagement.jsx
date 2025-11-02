import React, { useState } from "react";

export default function OrderManagement() {
  const [orderFilter, setOrderFilter] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [settlementAmount, setSettlementAmount] = useState("");

  const handleTrackShipment = () => {
    if (trackingId) {
      console.log("Tracking shipment:", trackingId);
      // Handle shipment tracking
    }
  };

  const handleEscalateDispute = () => {
    console.log("Escalating dispute");
    // Handle dispute escalation
  };

  const handleSettlement = () => {
    if (settlementAmount) {
      console.log("Processing settlement:", settlementAmount);
      // Handle payment settlement
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Management</h2>
        <p className="text-gray-600">Manage D2C orders, track shipments, and handle disputes</p>
      </div>

      {/* Search Orders Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Search Orders</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, or Email"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
          />
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            View Orders
          </button>
        </div>
      </div>

      {/* Shipment Tracking Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Shipment Tracking</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button 
            onClick={handleTrackShipment}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Track Shipment
          </button>
        </div>
      </div>

      {/* Dispute Management Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Dispute Management</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">⚠️</div>
            <div>
              <h4 className="font-medium text-yellow-800">Active Disputes</h4>
              <p className="text-sm text-yellow-700">You have 3 pending disputes that require attention</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleEscalateDispute}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Escalate/Dispute
        </button>
      </div>

      {/* Payment Settlement Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Settlement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Settlement Amount (USD)
            </label>
            <input
              type="number"
              placeholder="Enter settlement amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settlementAmount}
              onChange={(e) => setSettlementAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleSettlement}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Process Settlement
            </button>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">24</div>
          <div className="text-sm text-blue-700">Pending Orders</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-green-700">Completed Orders</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">8</div>
          <div className="text-sm text-yellow-700">In Transit</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-sm text-red-700">Disputes</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #ORD-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  John Doe
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $299.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
