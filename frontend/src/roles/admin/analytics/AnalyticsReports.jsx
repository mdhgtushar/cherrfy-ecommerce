import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye, 
  MousePointer,
  Star,
  Clock,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  CreditCard,
  Package,
  Globe,
  PieChart,
  LineChart,
  AreaChart,
  BarChart,
  Download as DownloadIcon,
  FileText,
  Settings
} from "lucide-react";

export default function AnalyticsReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [logsPage, setLogsPage] = useState(1);

  // Comprehensive analytics data
  const analyticsData = {
    // Key Metrics
    keyMetrics: [
      { 
        title: "Total Revenue", 
        value: "$124,750", 
        change: "+12.5%", 
        trend: "up", 
        icon: DollarSign, 
        color: "green",
        detail: "vs last month"
      },
      { 
        title: "Total Orders", 
        value: "2,847", 
        change: "+8.2%", 
        trend: "up", 
        icon: ShoppingCart, 
        color: "blue",
        detail: "vs last month"
      },
      { 
        title: "Total Visitors", 
        value: "45,230", 
        change: "+18.7%", 
        trend: "up", 
        icon: Eye, 
        color: "purple",
        detail: "vs last month"
      },
      { 
        title: "Conversion Rate", 
        value: "3.2%", 
        change: "-0.8%", 
        trend: "down", 
        icon: Target, 
        color: "orange",
        detail: "vs last month"
      },
      { 
        title: "Avg Order Value", 
        value: "$43.85", 
        change: "+2.1%", 
        trend: "up", 
        icon: CreditCard, 
        color: "emerald",
        detail: "vs last month"
      },
      { 
        title: "Active Users", 
        value: "8,920", 
        change: "+12.3%", 
        trend: "up", 
        icon: Users, 
        color: "indigo",
        detail: "vs last month"
      }
    ],

    // Sales Analytics
    salesData: {
      today: "$12,450",
      thisWeek: "$87,450",
      thisMonth: "$324,750",
      growth: "+8.8%",
      topProducts: [
        { name: "Wireless Earbuds Pro", sales: 234, revenue: 12540 },
        { name: "Smart Watch Series 5", sales: 189, revenue: 18900 },
        { name: "Bluetooth Speaker", sales: 156, revenue: 7800 },
        { name: "Phone Case Premium", sales: 134, revenue: 2680 }
      ]
    },

    // Traffic Analytics
    trafficData: {
      totalVisitors: "45,230",
      uniqueVisitors: "32,150",
      pageViews: "156,780",
      bounceRate: "23.4%",
      avgSessionDuration: "4m 32s",
      topPages: [
        { page: "/products", views: 12540, conversion: "3.2%" },
        { page: "/home", views: 9870, conversion: "2.8%" },
        { page: "/category/electronics", views: 6540, conversion: "4.1%" },
        { page: "/product/wireless-earbuds", views: 4320, conversion: "5.2%" }
      ]
    },

    // Geographic Data
    geographicData: [
      { country: "United States", visitors: 18920, revenue: 45670, percentage: 42 },
      { country: "United Kingdom", visitors: 9870, revenue: 23450, percentage: 22 },
      { country: "Canada", visitors: 6540, revenue: 12340, percentage: 14 },
      { country: "Australia", visitors: 4320, revenue: 9870, percentage: 10 },
      { country: "Germany", visitors: 3450, revenue: 8760, percentage: 8 }
    ],

    // Reports
    reports: [
      { name: 'April Sales Report', type: 'Sales', date: '2024-05-01', status: 'Generated', size: '2.4 MB' },
      { name: 'Traffic Overview Q1', type: 'Traffic', date: '2024-05-01', status: 'Generated', size: '1.8 MB' },
      { name: 'User Engagement Analysis', type: 'Engagement', date: '2024-05-01', status: 'Generated', size: '3.2 MB' },
      { name: 'March Sales Report', type: 'Sales', date: '2024-04-01', status: 'Generated', size: '2.1 MB' },
      { name: 'Product Performance Q1', type: 'Product', date: '2024-05-01', status: 'Generated', size: '4.1 MB' },
      { name: 'Abandoned Cart Analysis', type: 'Cart', date: '2024-05-01', status: 'Generated', size: '1.5 MB' }
    ]
  };

  const MetricCard = ({ title, value, change, trend, icon: Icon, color, detail }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{detail}</p>
      </div>
    </div>
  );

  const ChartCard = ({ title, subtitle, children, className = "" }) => (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );

  const ReportItem = ({ report }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          report.type === 'Sales' ? 'bg-green-100' :
          report.type === 'Traffic' ? 'bg-blue-100' :
          report.type === 'Engagement' ? 'bg-purple-100' :
          report.type === 'Product' ? 'bg-orange-100' :
          'bg-gray-100'
        }`}>
          <FileText className={`w-4 h-4 ${
            report.type === 'Sales' ? 'text-green-600' :
            report.type === 'Traffic' ? 'text-blue-600' :
            report.type === 'Engagement' ? 'text-purple-600' :
            report.type === 'Product' ? 'text-orange-600' :
            'text-gray-600'
          }`} />
        </div>
        <div>
          <p className="font-medium text-gray-900">{report.name}</p>
          <p className="text-sm text-gray-500">{report.type} • {report.size}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">{report.date}</span>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <DownloadIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights into your store's performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {analyticsData.keyMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <ChartCard 
            title="Revenue Trends" 
            subtitle="Sales performance over time"
          >
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue Chart</p>
                <p className="text-sm text-gray-400 mt-1">Interactive chart showing sales trends</p>
              </div>
            </div>
          </ChartCard>

          {/* Traffic Chart */}
          <ChartCard 
            title="Traffic Analytics" 
            subtitle="Visitor behavior and engagement"
          >
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Traffic Chart</p>
                <p className="text-sm text-gray-400 mt-1">Visitor trends and page views</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sales Overview */}
          <ChartCard title="Sales Overview" subtitle="Key sales metrics">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Today</span>
                <span className="font-semibold text-gray-900">{analyticsData.salesData.today}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold text-gray-900">{analyticsData.salesData.thisWeek}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-gray-900">{analyticsData.salesData.thisMonth}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600">Growth</span>
                <span className="font-semibold text-green-600">{analyticsData.salesData.growth}</span>
              </div>
            </div>
          </ChartCard>

          {/* Traffic Overview */}
          <ChartCard title="Traffic Overview" subtitle="Visitor metrics">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Visitors</span>
                <span className="font-semibold text-gray-900">{analyticsData.trafficData.totalVisitors}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Unique Visitors</span>
                <span className="font-semibold text-gray-900">{analyticsData.trafficData.uniqueVisitors}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Page Views</span>
                <span className="font-semibold text-gray-900">{analyticsData.trafficData.pageViews}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Bounce Rate</span>
                <span className="font-semibold text-gray-900">{analyticsData.trafficData.bounceRate}</span>
              </div>
            </div>
          </ChartCard>

          {/* Geographic Distribution */}
          <ChartCard title="Geographic Distribution" subtitle="Revenue by country">
            <div className="space-y-3">
              {analyticsData.geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${country.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{country.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Reports Section */}
        <ChartCard title="Generated Reports" subtitle="Download and manage analytics reports">
          <div className="space-y-2">
            {analyticsData.reports.map((report, index) => (
              <ReportItem key={index} report={report} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Previous
              </button>
              <span className="text-sm text-gray-500">Page 1 of 1</span>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Next
              </button>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <DownloadIcon className="w-4 h-4" />
              <span>Export All</span>
            </button>
          </div>
        </ChartCard>
      </div>
    </div>
  );
} 