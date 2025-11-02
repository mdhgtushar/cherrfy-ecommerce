import React, { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Plus,
  ClipboardList,
  Globe,
  Activity,
  Target,
  CreditCard,
  Eye,
  MousePointer,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import ADMIN_PATHS from "../ADMIN_PATHS";
import API from "../../../util/API";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const getdata = async () => {
    try {
      setLoading(true);
      const response = await API.get("/extra/dashboard");
      setDashboardData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata()
  }, []);
  // Organized dummy data
  const stats = {
    // Primary Metrics
    primary: [
      { title: "Total Revenue", value: "--", change: "+12.5%", trend: "up", icon: DollarSign, color: "green" },
      { title: "Total Orders", value: dashboardData.totalOrders, change: "+8.2%", trend: "up", icon: ShoppingCart, color: "blue" },
      { title: "Total Products", value: dashboardData.totalProducts, change: "+15.3%", trend: "up", icon: Package, color: "purple" },
      { title: "Total Users", value: dashboardData.totalUsers, change: "+5.7%", trend: "up", icon: Users, color: "indigo" }
    ],

    // Secondary Metrics
    secondary: [
      { title: "Conversion Rate", value: "3.2%", change: "-0.8%", trend: "down", icon: Target, color: "orange" },
      { title: "Avg Order Value", value: "--", change: "+2.1%", trend: "up", icon: CreditCard, color: "emerald" },
      { title: "Active Users", value: "8,920", change: "+12.3%", trend: "up", icon: Activity, color: "cyan" },
      { title: "Page Views", value: "45,230", change: "+18.7%", trend: "up", icon: Eye, color: "pink" }
    ],

    // Sales Data
    sales: {
      today: dashboardData.totalOrders,
      thisWeek: "$87,450",
      thisMonth: "$324,750",
      growth: "+8.8%"
    },

    // Order Status
    orders: {
      pending: 47,
      processing: 23,
      shipped: 156,
      delivered: 892,
      cancelled: 12,
      refunded: 8
    },

    // System Health
    system: {
      apiCalls: "12,470",
      serverLoad: "67%",
      uptime: "99.8%",
      lastBackup: "2 hours ago"
    },

    // Recent Activity
    activity: [
      { message: "New order #ORD-2024-001 received", time: "2 min ago", type: "order" },
      { message: "Product stock updated", time: "5 min ago", type: "product" },
      { message: "New user registration", time: "8 min ago", type: "user" },
      { message: "Daily backup completed", time: "15 min ago", type: "system" }
    ],

    // Quick Stats
    quickStats: [
      { label: "Low Stock Items", value: "23", color: "yellow" },
      { label: "Pending Orders", value: "47", color: "orange" },
      { label: "New Users Today", value: "234", color: "green" },
      { label: "API Calls Today", value: "12,470", color: "blue" }
    ]
  };

  const MetricCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, link }) => (
    <Link to={link} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-lg bg-${color}-100 w-fit mb-4`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );

  const StatCard = ({ label, value, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your store overview.</p>
        </div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.primary.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Sales Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Today:</span>
                <span className="font-semibold text-gray-900">{stats.sales.today}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">This Week:</span>
                <span className="font-semibold text-gray-900">{stats.sales.thisWeek}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">This Month:</span>
                <span className="font-semibold text-gray-900">{stats.sales.thisMonth}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold">{stats.sales.growth}</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Sales Chart</p>
            </div>
          </div>
        </div>

        {/* Secondary Metrics & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Secondary Metrics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {stats.secondary.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickActionCard
                  title="Add Product"
                  description="Create a new product manually"
                  icon={Plus}
                  color="blue"
                  link={ADMIN_PATHS.PRODUCTS.SOURCE}
                />
                <QuickActionCard
                  title="Import Products"
                  description="Import from AliExpress"
                  icon={Package}
                  color="orange"
                  link={ADMIN_PATHS.PRODUCTS.IMPORT}
                />
                <QuickActionCard
                  title="Order Management"
                  description="View and manage orders"
                  icon={ClipboardList}
                  color="green"
                  link={ADMIN_PATHS.ORDERS}
                />
                <QuickActionCard
                  title="User Management"
                  description="Manage user accounts"
                  icon={Users}
                  color="purple"
                  link={ADMIN_PATHS.USERS}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Status & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{stats.orders.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats.orders.processing}</p>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{stats.orders.shipped}</p>
                <p className="text-sm text-gray-600">Shipped</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stats.orders.delivered}</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Calls Today</span>
                <span className="font-semibold text-gray-900">{stats.system.apiCalls}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Load</span>
                <span className="font-semibold text-gray-900">{stats.system.serverLoad}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="font-semibold text-green-600">{stats.system.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="font-semibold text-gray-900">{stats.system.lastBackup}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.quickStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {stats.activity.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{item.message}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
