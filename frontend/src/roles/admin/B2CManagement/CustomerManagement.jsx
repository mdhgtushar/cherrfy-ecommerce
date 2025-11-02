import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Mock data - replace with actual API call
  const mockCustomers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      country: "USA",
      orderCount: 15,
      status: "active",
      joinDate: "2023-01-15",
      lastOrder: "2024-01-10",
      totalSpent: 1250.00
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      country: "Canada",
      orderCount: 8,
      status: "active",
      joinDate: "2023-03-20",
      lastOrder: "2024-01-08",
      totalSpent: 890.50
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      country: "UK",
      orderCount: 3,
      status: "suspended",
      joinDate: "2023-06-10",
      lastOrder: "2023-12-15",
      totalSpent: 245.00
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      country: "Australia",
      orderCount: 0,
      status: "guest",
      joinDate: "2024-01-01",
      lastOrder: null,
      totalSpent: 0.00
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = customers;

    // Filter by search term
    if (customerFilter) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(customerFilter.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerFilter.toLowerCase()) ||
        customer.country.toLowerCase().includes(customerFilter.toLowerCase()) ||
        customer.orderCount.toString().includes(customerFilter)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, customerFilter, statusFilter]);

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(customer => customer.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on customers:`, selectedCustomers);
    // Implement bulk actions
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      guest: "bg-gray-100 text-gray-800"
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Management</h2>
            <p className="text-gray-600">Manage your B2C customers, view their activity, and control access</p>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Customers
                </label>
                <input
                  type="text"
                  placeholder="Search by name, email, country, or order count"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                />
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
                  <option value="suspended">Suspended</option>
                  <option value="guest">Guest</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Customer Data
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedCustomers.length > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">
                  {selectedCustomers.length} customer(s) selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleBulkAction('suspend')}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Suspend
                  </button>
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                  >
                    Export Selected
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Customer List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Customers ({filteredCustomers.length})
                </h3>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Select All</span>
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading customers...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCustomers.includes(customer.id)}
                              onChange={() => handleSelectCustomer(customer.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {customer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Joined {new Date(customer.joinDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.orderCount} orders
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${customer.totalSpent.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(customer.status)}`}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : 'No orders'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                            <button className="text-green-600 hover:text-green-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Suspend</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filteredCustomers.length === 0 && !loading && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No customers found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
