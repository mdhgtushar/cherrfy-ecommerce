import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const WishlistManagement = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const [filteredCart, setFilteredCart] = useState([]);
  const [wishlistFilter, setWishlistFilter] = useState("");
  const [cartFilter, setCartFilter] = useState("");
  const [activeTab, setActiveTab] = useState("wishlist");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const mockWishlistData = [
    {
      id: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      productName: "Wireless Bluetooth Headphones",
      productId: "PROD-001",
      productImage: "https://via.placeholder.com/60x60",
      price: 89.99,
      addedDate: "2024-01-15",
      category: "Electronics"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      productName: "Smart Watch Series 5",
      productId: "PROD-002",
      productImage: "https://via.placeholder.com/60x60",
      price: 299.99,
      addedDate: "2024-01-14",
      category: "Electronics"
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      productName: "Organic Coffee Beans",
      productId: "PROD-003",
      productImage: "https://via.placeholder.com/60x60",
      price: 24.99,
      addedDate: "2024-01-13",
      category: "Food & Beverages"
    },
    {
      id: 4,
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      productName: "Yoga Mat Premium",
      productId: "PROD-004",
      productImage: "https://via.placeholder.com/60x60",
      price: 45.00,
      addedDate: "2024-01-12",
      category: "Sports & Fitness"
    }
  ];

  const mockCartData = [
    {
      id: 1,
      customerName: "David Brown",
      customerEmail: "david@example.com",
      productName: "Laptop Stand Adjustable",
      productId: "PROD-005",
      productImage: "https://via.placeholder.com/60x60",
      price: 39.99,
      quantity: 2,
      addedDate: "2024-01-15",
      category: "Office Supplies"
    },
    {
      id: 2,
      customerName: "Emily Davis",
      customerEmail: "emily@example.com",
      productName: "Wireless Mouse",
      productId: "PROD-006",
      productImage: "https://via.placeholder.com/60x60",
      price: 29.99,
      quantity: 1,
      addedDate: "2024-01-14",
      category: "Electronics"
    },
    {
      id: 3,
      customerName: "Robert Wilson",
      customerEmail: "robert@example.com",
      productName: "Desk Lamp LED",
      productId: "PROD-007",
      productImage: "https://via.placeholder.com/60x60",
      price: 59.99,
      quantity: 1,
      addedDate: "2024-01-13",
      category: "Home & Office"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWishlistData(mockWishlistData);
      setCartData(mockCartData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = wishlistData;

    if (wishlistFilter) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(wishlistFilter.toLowerCase()) ||
        item.customerName.toLowerCase().includes(wishlistFilter.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(wishlistFilter.toLowerCase()) ||
        item.category.toLowerCase().includes(wishlistFilter.toLowerCase())
      );
    }

    setFilteredWishlist(filtered);
  }, [wishlistData, wishlistFilter]);

  useEffect(() => {
    let filtered = cartData;

    if (cartFilter) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(cartFilter.toLowerCase()) ||
        item.customerName.toLowerCase().includes(cartFilter.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(cartFilter.toLowerCase()) ||
        item.category.toLowerCase().includes(cartFilter.toLowerCase())
      );
    }

    setFilteredCart(filtered);
  }, [cartData, cartFilter]);

  const getTotalWishlistValue = () => {
    return wishlistData.reduce((sum, item) => sum + item.price, 0);
  };

  const getTotalCartValue = () => {
    return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalCartItems = () => {
    return cartData.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wishlist & Cart Overview</h2>
            <p className="text-gray-600">Monitor customer wishlists and shopping cart activities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <span className="text-2xl">❤️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                  <p className="text-2xl font-bold text-gray-900">{wishlistData.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">🛒</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCartItems()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Wishlist Value</p>
                  <p className="text-2xl font-bold text-gray-900">${getTotalWishlistValue().toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cart Value</p>
                  <p className="text-2xl font-bold text-gray-900">${getTotalCartValue().toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "wishlist"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">❤️</span>
                  Wishlist Items ({wishlistData.length})
                </button>
                <button
                  onClick={() => setActiveTab("cart")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "cart"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">🛒</span>
                  Shopping Carts ({cartData.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Search Filter */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={
                    activeTab === "wishlist"
                      ? "Search wishlist by product, customer, or category"
                      : "Search cart by product, customer, or category"
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={activeTab === "wishlist" ? wishlistFilter : cartFilter}
                  onChange={(e) =>
                    activeTab === "wishlist"
                      ? setWishlistFilter(e.target.value)
                      : setCartFilter(e.target.value)
                  }
                />
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        {activeTab === "cart" && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Added Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(activeTab === "wishlist" ? filteredWishlist : filteredCart).map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={item.productImage}
                                alt={item.productName}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.productName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.productId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.customerName}</div>
                            <div className="text-sm text-gray-500">{item.customerEmail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${item.price.toFixed(2)}
                          </td>
                          {activeTab === "cart" && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.quantity}
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.addedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">View</button>
                              <button className="text-green-600 hover:text-green-900">Contact</button>
                              {activeTab === "wishlist" && (
                                <button className="text-purple-600 hover:text-purple-900">Add to Cart</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {(activeTab === "wishlist" ? filteredWishlist : filteredCart).length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No {activeTab === "wishlist" ? "wishlist items" : "cart items"} found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wishlist Analytics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Most Wishlisted Category</span>
                  <span className="text-sm font-medium">Electronics</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Wishlist Size</span>
                  <span className="text-sm font-medium">3.2 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="text-sm font-medium">15.3%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Analytics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Cart Value</span>
                  <span className="text-sm font-medium">${(getTotalCartValue() / cartData.length).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Abandonment Rate</span>
                  <span className="text-sm font-medium">68.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Items per Cart</span>
                  <span className="text-sm font-medium">{(getTotalCartItems() / cartData.length).toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Send Wishlist Reminders
                </button>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Abandoned Cart Recovery
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Generate Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistManagement;
