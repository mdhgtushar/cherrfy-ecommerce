import React from 'react';
import { MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-4 grid gap-6 grid-cols-1 xl:grid-cols-3">
      {/* Overview */}
      <div className="col-span-2 grid gap-4">
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Overview</h2>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm">Total Sales</p>
              <p className="text-lg font-bold">$2,345 Today</p>
              <p className="text-sm text-gray-500">$12,456 This Week / $45,678 This Month</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm">Orders Count</p>
              <p className="text-lg font-bold">B2C: 320 / D2C: 120 / B2B: 80</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm">Traffic Summary</p>
              <p className="text-lg font-bold">12.3k Visitors</p>
              <p className="text-sm text-gray-500">34.5k Pageviews</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm">Conversion Rate</p>
              <p className="text-lg font-bold">4.2%</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm">Popular Products</p>
              <p className="text-lg font-bold">Smart Watch, Headphones</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Add New Product</button>
            <button className="border py-2 px-4 rounded">Import AliExpress Product</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Create Flash Sale</button>
            <button className="border py-2 px-4 rounded">Check Sync Logs</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">View Latest Orders</button>
            <button className="bg-red-600 text-white py-2 px-4 rounded">Approve Pending Vendors</button>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">System Alerts</h2>
          </div>
          <div className="p-4 text-sm text-red-600 space-y-2">
            <p><AlertTriangle className="inline mr-2" />Token Expiry Warning (AliExpress)</p>
            <p><AlertTriangle className="inline mr-2" />API Sync Failures</p>
            <p><AlertTriangle className="inline mr-2" />Low Stock Notifications</p>
            <p><AlertTriangle className="inline mr-2" />Product Import Failures</p>
            <p><AlertTriangle className="inline mr-2" />Manual Payment Match Pending</p>
            <p><AlertTriangle className="inline mr-2" />New Support Tickets Opened</p>
          </div>
        </div>
      </div>

      {/* Live Widgets */}
      <div className="grid gap-4">
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Revenue vs Refund</h2>
          </div>
          <div className="p-4 h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">Graph Here</div>
        </div>
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Top 5 Selling Products</h2>
          </div>
          <div className="p-4 text-sm">
            <ul className="list-disc pl-5">
              <li>Smart Watch</li>
              <li>Wireless Headphones</li>
              <li>Fitness Tracker</li>
              <li>Laptop Sleeve</li>
              <li>Bluetooth Speaker</li>
            </ul>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Customer Geo Distribution</h2>
          </div>
          <div className="p-4 h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
            <MapPin className="mr-2" />Map Here
          </div>
        </div>
      </div>

      {/* Pending Actions Overview */}
      <div className="col-span-3">
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Pending Actions Overview</h2>
          </div>
          <div className="p-4 grid md:grid-cols-2 gap-4 text-sm">
            <p><CheckCircle className="inline mr-2 text-yellow-500" />Products Pending Approval</p>
            <p><CheckCircle className="inline mr-2 text-yellow-500" />Orders Awaiting Fulfillment</p>
            <p><CheckCircle className="inline mr-2 text-yellow-500" />Factory/Vendor Applications</p>
            <p><CheckCircle className="inline mr-2 text-yellow-500" />Unread Support Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
