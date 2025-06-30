import React, { useEffect, useState } from "react";
import { MapPin, AlertTriangle, CheckCircle, BarChart2, ShoppingCart, Users, DollarSign, TrendingUp, PackageCheck } from "lucide-react";
import Api from "../../../util/API";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [pending, setPending] = useState(null);
  const [callsToday, setCallsToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // Example: Replace with your real endpoints
      const [overviewRes, alertsRes, pendingRes, apiCallsRes] = await Promise.all([
        Api.get("/stats/overview"), // { salesToday, salesWeek, salesMonth, orders, traffic, conversion, topProducts, revenueVsRefund, geo }
        Api.get("/admin/alerts"),   // [ { type, message }, ... ]
        Api.get("/admin/pending-actions"), // { products, orders, vendors, support }
        Api.get("/stats/daily-count")
      ]);
      setStats(overviewRes.data);
      setAlerts(alertsRes.data);
      setPending(pendingRes.data);
      setCallsToday(apiCallsRes.data[0]?.count || 0);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 grid gap-6 grid-cols-1 xl:grid-cols-3">
      {/* Overview */}
      <div className="col-span-2 grid gap-4">
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Overview</h2>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-xl animate-pulse h-24" />
                ))}
              </>
            ) : error ? (
              <div className="col-span-3 text-red-500">{error}</div>
            ) : stats ? (
              <>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-600" /> Total Sales</p>
                  <p className="text-lg font-bold">${stats.salesToday?.toLocaleString() || 0} Today</p>
                  <p className="text-sm text-gray-500">${stats.salesWeek?.toLocaleString() || 0} This Week / ${stats.salesMonth?.toLocaleString() || 0} This Month</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-blue-600" /> Orders Count</p>
                  <p className="text-lg font-bold">B2C: {stats.orders?.b2c || 0} / D2C: {stats.orders?.d2c || 0} / B2B: {stats.orders?.b2b || 0}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm flex items-center gap-2"><Users className="w-4 h-4 text-indigo-600" /> Traffic Summary</p>
                  <p className="text-lg font-bold">{stats.traffic?.visitors?.toLocaleString() || 0} Visitors</p>
                  <p className="text-sm text-gray-500">{stats.traffic?.pageviews?.toLocaleString() || 0} Pageviews</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-orange-600" /> Conversion Rate</p>
                  <p className="text-lg font-bold">{stats.conversion || 0}%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm flex items-center gap-2"><BarChart2 className="w-4 h-4 text-pink-600" /> Top Products</p>
                  <p className="text-lg font-bold">{stats.topProducts?.join(', ') || '-'}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> API Calls Today</p>
                  <p className="text-lg font-bold">{callsToday}</p>
                </div>
              </>
            ) : null}
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
            {loading ? (
              <p>Loading alerts...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : alerts.length === 0 ? (
              <p className="text-gray-500">No alerts</p>
            ) : alerts.map((alert, i) => (
              <p key={i}><AlertTriangle className="inline mr-2" />{alert.message}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Live Widgets */}
      <div className="grid gap-4">
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Revenue vs Refund</h2>
          </div>
          <div className="p-4 h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
            {loading ? 'Loading...' : stats?.revenueVsRefund ? <span>{stats.revenueVsRefund}</span> : 'Graph Here'}
          </div>
        </div>
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Top 5 Selling Products</h2>
          </div>
          <div className="p-4 text-sm">
            {loading ? 'Loading...' : stats?.topProducts ? (
              <ul className="list-disc pl-5">
                {stats.topProducts.slice(0, 5).map((prod, i) => <li key={i}>{prod}</li>)}
              </ul>
            ) : 'No data'}
          </div>
        </div>
        <div className="bg-white shadow rounded-xl">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Customer Geo Distribution</h2>
          </div>
          <div className="p-4 h-40 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
            <MapPin className="mr-2" />
            {loading ? 'Loading...' : stats?.geo ? <span>{stats.geo}</span> : 'Map Here'}
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
            {loading ? (
              <>
                {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-100 h-8 rounded animate-pulse" />)}
              </>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : pending ? (
              <>
                <p><CheckCircle className="inline mr-2 text-yellow-500" /> Products Pending Approval: <b>{pending.products || 0}</b></p>
                <p><CheckCircle className="inline mr-2 text-yellow-500" /> Orders Awaiting Fulfillment: <b>{pending.orders || 0}</b></p>
                <p><CheckCircle className="inline mr-2 text-yellow-500" /> Factory/Vendor Applications: <b>{pending.vendors || 0}</b></p>
                <p><CheckCircle className="inline mr-2 text-yellow-500" /> Unread Support Messages: <b>{pending.support || 0}</b></p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
