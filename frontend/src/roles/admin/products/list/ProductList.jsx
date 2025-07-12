import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ADMIN_PATHS from "../../ADMIN_PATHS";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchProducts } from "../../../../features/productSlice";
import { toast } from "react-toastify";

const ProductList = ({ products = [] }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ 
    source: "all", 
    search: "",
    status: "all",
    priceRange: "all"
  });
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts({country: "BD", currency: "BDT"}));
      toast.success("Products refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh products");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await dispatch(deleteProduct(productId));
      if (response.error) {
        console.log("error", response.error);
        return toast.error(response.error.message || "Failed to delete product");
      } else {
        dispatch(fetchProducts({country: "BD", currency: "BDT"}));
        return toast.success("Product deleted successfully.");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) {
      toast.warning("Please select products to delete");
      return;
    }
    
    try {
      for (const productId of selectedProducts) {
        await dispatch(deleteProduct(productId));
      }
      dispatch(fetchProducts({country: "BD", currency: "BDT"}));
      setSelectedProducts([]);
      toast.success(`${selectedProducts.length} products deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete selected products");
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.productId));
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const sourceMatch = filter.source === "all" || product.source === filter.source;
      const statusMatch = filter.status === "all" || product.status === filter.status;
      const searchMatch = filter.search
        ? JSON.stringify(product).toLowerCase().includes(filter.search.toLowerCase())
        : true;
      
      // Price range filtering
      let priceMatch = true;
      if (filter.priceRange !== "all") {
        const price = parseFloat(product.price || product.sku?.offer_sale_price || 0);
        switch (filter.priceRange) {
          case "0-10":
            priceMatch = price >= 0 && price <= 10;
            break;
          case "10-50":
            priceMatch = price > 10 && price <= 50;
            break;
          case "50-100":
            priceMatch = price > 50 && price <= 100;
            break;
          case "100+":
            priceMatch = price > 100;
            break;
        }
      }
      
      return sourceMatch && statusMatch && searchMatch && priceMatch;
    });
  }, [products, filter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Helper to get fallback image from SKU if main image is missing
  const getProductImage = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    if (product.sku && product.sku.ae_sku_property_dtos && product.sku.ae_sku_property_dtos.ae_sku_property_d_t_o) {
      const skuImages = product.sku.ae_sku_property_dtos.ae_sku_property_d_t_o
        .map((prop) => prop.sku_image)
        .filter(Boolean);
      if (skuImages.length > 0) return skuImages[0];
    }
    return "";
  };

  // Helper to get product title
  const getProductTitle = (product) => {
    if (typeof product.name === 'string' && product.name.trim()) {
      return product.name;
    }
    if (product.sku && product.sku.sku_attr) {
      return product.sku.sku_attr;
    }
    return "Untitled Product";
  };

  // Helper to get product price
  const getProductPrice = (product) => {
    if (product.price) {
      return `${product.currency || ''} ${product.price}`;
    }
    if (product.sku && product.sku.offer_sale_price) {
      return `${product.sku.converted_currency || product.currency || ''} ${product.sku.offer_sale_price}`;
    }
    return "N/A";
  };

  const getProductStatus = (product) => {
    if (product.status === 'active') return { label: 'Active', color: 'green' };
    if (product.status === 'draft') return { label: 'Draft', color: 'yellow' };
    if (product.status === 'inactive') return { label: 'Inactive', color: 'red' };
    return { label: 'Unknown', color: 'gray' };
  };

  const renderProductCard = (product, index) => {
    const imageUrl = getProductImage(product);
    const title = getProductTitle(product);
    const price = getProductPrice(product);
    const productId = product.productId || "N/A";
    const status = getProductStatus(product);
    const isSelected = selectedProducts.includes(product.productId);

    return (
      <div
        key={index}
        className={`bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        {/* Selection Checkbox */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSelectProduct(product.productId)}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Select</span>
            </label>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              status.color === 'green' ? 'bg-green-100 text-green-700' :
              status.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
              status.color === 'red' ? 'bg-red-100 text-red-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {status.label}
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="p-4">
          <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-full h-full flex items-center justify-center text-slate-400" style={{ display: imageUrl ? 'none' : 'flex' }}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 line-clamp-2" title={title}>
              {title.length > 60 ? `${title.slice(0, 60)}...` : title}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900">{price}</span>
              <span className="text-sm text-slate-500">ID: {productId}</span>
            </div>

            {/* Source Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500">Source:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.source === 'aliexpress' ? 'bg-orange-100 text-orange-700' :
                product.source === 'local' ? 'bg-blue-100 text-blue-700' :
                product.source === 'vendor' ? 'bg-purple-100 text-purple-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {product.source || 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Link
                to={`/manage-admin/products/view/${product._id}`}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                View
              </Link>
              <Link
                to={`${ADMIN_PATHS.PRODUCTS.EDIT + product._id}`}
                className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href={`https://www.aliexpress.com/item/${product.productId}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="View on AliExpress"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button
                onClick={() => setConfirmDelete(product.productId)}
                className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                title="Delete product"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProductTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left">
              <input
                type="checkbox"
                checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Product</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Source</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {currentProducts.map((product, index) => {
            const imageUrl = getProductImage(product);
            const title = getProductTitle(product);
            const price = getProductPrice(product);
            const status = getProductStatus(product);
            const isSelected = selectedProducts.includes(product.productId);

            return (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectProduct(product.productId)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{title}</div>
                      <div className="text-sm text-slate-500">ID: {product.productId || "N/A"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-900">{price}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status.color === 'green' ? 'bg-green-100 text-green-700' :
                    status.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    status.color === 'red' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.source === 'aliexpress' ? 'bg-orange-100 text-orange-700' :
                    product.source === 'local' ? 'bg-blue-100 text-blue-700' :
                    product.source === 'vendor' ? 'bg-purple-100 text-purple-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {product.source || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/manage-admin/products/view/${product.productId}`}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      to={`${ADMIN_PATHS.PRODUCTS.EDIT + product._id}`}
                      className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setConfirmDelete(product.productId)}
                      className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Product Catalog</h2>
          <p className="text-slate-600">Manage and organize your product inventory</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/manage-admin/products/import"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Import Products</span>
          </Link>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Source</label>
            <select
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter.source}
              onChange={(e) => setFilter({ ...filter, source: e.target.value })}
            >
              <option value="all">All Sources</option>
              <option value="aliexpress">AliExpress</option>
              <option value="local">Local</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
            <select
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter.priceRange}
              onChange={(e) => setFilter({ ...filter, priceRange: e.target.value })}
            >
              <option value="all">All Prices</option>
              <option value="0-10">$0 - $10</option>
              <option value="10-50">$10 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100+">$100+</option>
            </select>
          </div>
          
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, SKU, or description..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* View Toggle and Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-slate-200 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "table" ? "bg-blue-100 text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </button>
          </div>
          
          <span className="text-sm text-slate-600">
            {currentProducts.length} of {filteredProducts.length} products
          </span>
        </div>
        
        {selectedProducts.length > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600">
              {selectedProducts.length} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete Selected</span>
            </button>
          </div>
        )}
      </div>

      {/* Products Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product, index) => renderProductCard(product, index))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {renderProductTable()}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Items per page selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-600">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-3 py-1 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>

            {/* Page info */}
            <div className="text-sm text-slate-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {products.length === 0 ? 'No products available' : 'No products found'}
          </h3>
          <p className="text-slate-600 mb-6">
            {products.length === 0 
              ? 'Get started by creating your first product' 
              : 'Try adjusting your filters or create a new product'
            }
          </p>
          <div className="flex items-center justify-center space-x-3">
            <Link
              to="/manage-admin/products/source"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create Product</span>
            </Link>
            {products.length > 0 && (
              <button
                onClick={() => setFilter({ source: "all", search: "", status: "all", priceRange: "all" })}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete Product</h3>
                <p className="text-slate-600">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

