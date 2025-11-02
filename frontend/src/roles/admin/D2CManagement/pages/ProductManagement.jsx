import React, { useState } from "react";

export default function ProductManagement() {
  const [productFilter, setProductFilter] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    inventory: "",
    price: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", productData);
    // Handle form submission
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h2>
        <p className="text-gray-600">Add, edit, and manage your D2C products</p>
      </div>

      {/* Search and Filter Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Search Products</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by Product Name, SKU, or Category"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add/Edit Product</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input 
                type="text" 
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select 
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports & Outdoors</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description *
            </label>
            <textarea 
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter detailed product description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Factory Inventory *
              </label>
              <input 
                type="number" 
                name="inventory"
                value={productData.inventory}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Available stock quantity"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input 
                type="number" 
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Product price"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Product
            </button>
            <button 
              type="button"
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Publish Product
            </button>
            <button 
              type="button"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Preview Product
            </button>
          </div>
        </form>
      </div>

      {/* Product List Preview */}
      <div className="border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No products found. Add your first product above.</p>
        </div>
      </div>
    </div>
  );
}
