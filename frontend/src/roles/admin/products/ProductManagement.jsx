import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/productSlice";
import { Link } from "react-router-dom";
import ADMIN_PATHS from "../ADMIN_PATHS";
import { Button } from "../../../components/ui/Button";
import { TableLoader } from "../../../components/Loader";
import { toast } from "react-toastify";
import ProductImages from "./create/ProductImages";

export default function ProductManagement() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [filter, setFilter] = useState({ source: "all", search: "", status: "all" });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // Remove viewProduct state and modal

  useEffect(() => {
    dispatch(fetchProducts({ country: "BD", currency: "BDT" }));
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(product => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const filteredProducts = products.filter((product) => {
    const sourceMatch = filter.source === "all" || product.source === filter.source;
    const statusMatch = filter.status === "all" || product.status === filter.status;
    const searchMatch = filter.search
      ? JSON.stringify(product).toLowerCase().includes(filter.search.toLowerCase())
      : true;
    return sourceMatch && statusMatch && searchMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Updated getProductInfo to use new API structure
  const getProductInfo = (product) => {
    // Title
    let title = typeof product.name === 'string' && product.name.trim() ? product.name : '';
    if (!title && product.sku && product.sku.sku_attr) title = product.sku.sku_attr;
    if (!title) title = 'No title';

    // Image
    let imageUrl = Array.isArray(product.images) && product.images.length > 0 && product.images[0] ? product.images[0] : '';
    if (!imageUrl && product.sku && product.sku.ae_sku_property_dtos && product.sku.ae_sku_property_dtos.ae_sku_property_d_t_o) {
      const skuImages = product.sku.ae_sku_property_dtos.ae_sku_property_d_t_o
        .map((prop) => prop.sku_image)
        .filter(Boolean);
      if (skuImages.length > 0) imageUrl = skuImages[0];
    }

    // Price
    let price = product.price || (product.sku && product.sku.offer_sale_price) || 'N/A';
    let currency = product.currency || (product.sku && product.sku.converted_currency) || '';
    if (price !== 'N/A') price = `${currency} ${price}`;

    // SKU
    let sku = product.productId || (product.sku && product.sku.sku_id) || 'N/A';

    // Status
    let status = product.status || 'draft';

    return {
      imageUrl,
      title,
      price,
      sku,
      status
    };
  };

  if (status === "loading") {
    return <TableLoader />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Product Management</h1>
          <p className="text-neutral-500 mt-1 text-base">Manage your product catalog, inventory, and pricing.</p>
        </div>
        <div className="flex gap-3">
          <Link to={ADMIN_PATHS.PRODUCTS.SOURCE} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-sm transition">+ Add Product</Link>
          <Link to="/manage-admin/products/import" className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold px-4 py-2 rounded shadow-sm transition">Import Products</Link>
        </div>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Card Example */}
        <div className="bg-white p-6 rounded-xl shadow border flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Total Products</p>
            <p className="text-2xl font-bold text-neutral-900">{products.length}</p>
          </div>
        </div>
        {/* ...repeat for other stats, using green/yellow/red for published/draft/out_of_stock... */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === "published").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === "draft").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.status === "out_of_stock").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filters */}
      <div className="bg-white p-4 rounded-xl border flex flex-col md:flex-row md:items-end gap-4 mb-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
          >
            <option value="all">All Sources</option>
            <option value="aliexpress">AliExpress</option>
            <option value="manual">Manual</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by title, SKU, or description..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
      </div>

      {/* 4. Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="sticky top-0 z-10 bg-blue-50 p-4 rounded-xl border flex items-center justify-between mb-4 shadow-sm">
          <span className="text-sm font-medium text-blue-900">{selectedProducts.length} selected</span>
          <div className="flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Publish</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Draft</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</Button>
          </div>
        </div>
      )}

      {/* 5. Product Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0} onChange={(e) => handleSelectAll(e.target.checked)} />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => {
                const productInfo = getProductInfo(product);
                const isSelected = selectedProducts.includes(product._id);
                
                return (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={isSelected}
                        onChange={(e) => handleSelectProduct(product._id, e.target.checked)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {productInfo.imageUrl ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={productInfo.imageUrl}
                              alt={productInfo.title}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {productInfo.title.length > 60 
                              ? `${productInfo.title.substring(0, 60)}...` 
                              : productInfo.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {productInfo.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${productInfo.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        productInfo.status === "published" 
                          ? "bg-green-100 text-green-800"
                          : productInfo.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {productInfo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.source || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`${ADMIN_PATHS.PRODUCTS.EDIT}${product._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/manage-admin/products/view/${product.productId}`}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        >
                          View
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => toast.info("Delete functionality coming soon")}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new product.
                    </p>
                    <div className="mt-6">
                      <Link
                        to={ADMIN_PATHS.PRODUCTS.SOURCE}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        + Add Product
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 6. Pagination */}
      <div className="flex justify-end mt-4">
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-xl shadow-sm">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredProducts.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Remove modal ... */}
    </div>
  );
}
