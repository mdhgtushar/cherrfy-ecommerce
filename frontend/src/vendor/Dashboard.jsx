import { Card, CardContent } from "../components/ui/card";
import { BarChart, PackageCheck, DollarSign, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Vendor!</h1>
        <p className="text-gray-600">Here’s what’s happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <PackageCheck className="text-indigo-500 w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">1,205</h2>
              <p className="text-sm text-gray-500">Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <DollarSign className="text-green-500 w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">$24,800</h2>
              <p className="text-sm text-gray-500">Revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <BarChart className="text-orange-500 w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">35</h2>
              <p className="text-sm text-gray-500">Active Products</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 shadow-md rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#1001", name: "John Doe", date: "2025-05-20", amount: "$250", status: "Shipped" },
                { id: "#1002", name: "Jane Smith", date: "2025-05-21", amount: "$180", status: "Pending" },
                { id: "#1003", name: "Ali Khan", date: "2025-05-22", amount: "$320", status: "Delivered" },
              ].map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.name}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
