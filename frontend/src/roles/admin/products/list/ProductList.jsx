import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ADMIN_PATHS from "../../ADMIN_PATHS";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchProducts } from "../../../../features/productSlice";
import { toast } from "react-toastify";

const ProductList = ({ products = [] }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ source: "all", search: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const sourceMatch =
        filter.source === "all" || product.source === filter.source;
      const searchMatch = filter.search
        ? JSON.stringify(product)
            .toLowerCase()
            .includes(filter.search.toLowerCase())
        : true;
      return sourceMatch && searchMatch;
    });
  }, [products, filter]);

  // Helper to get fallback image from SKU if main image is missing
  const getProductImage = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    // Fallback: try to get SKU image
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
    // Fallback: try to get from SKU property
    if (product.sku && product.sku.sku_attr) {
      return product.sku.sku_attr;
    }
    return "hello";
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

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <section className="bg-white p-4 rounded-xl border flex flex-col md:flex-row md:items-end gap-4 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Product Filters</h2>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm transition disabled:opacity-50"
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
          <select
            className="p-2 border border-gray-300 rounded-lg w-full md:w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter.source}
            onChange={(e) => setFilter({ ...filter, source: e.target.value })}
          >
            <option value="all">All Sources</option>
            <option value="aliexpress">AliExpress</option>
            <option value="local">Local</option>
            <option value="vendor">Vendor</option>
          </select>
          <input
            type="text"
            placeholder="Search by Name, SKU, Tag"
            className="p-2 border border-gray-300 rounded-lg w-full flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
      </section>

      {/* Product Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="border px-4 py-2 text-left">Image</th>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Product ID</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((product, index) => {
                const imageUrl = getProductImage(product);
                const title = getProductTitle(product);
                const price = getProductPrice(product);
                const productId = product.productId || "N/A";

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="max-w-xs">
                        {title.length > 80 ? `${title.slice(0, 80)}...` : title}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      {price}
                    </td>
                    <td className="border px-4 py-2">
                      <span className="text-sm text-gray-600">{productId}</span>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        <Link
                          to={`/manage-admin/products/view/${product.productId}`}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        >
                          View
                        </Link>
                        <a
                          href={`https://www.aliexpress.com/item/${product.productId}.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          AliExpress
                        </a>
                        <Link
                          to={`${ADMIN_PATHS.PRODUCTS.EDIT + product._id}`}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                          onClick={() => {
                            console.log('Edit link clicked:', {
                              _id: product._id,
                              editPath: `${ADMIN_PATHS.PRODUCTS.EDIT + product._id}`
                            });
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          onClick={() => setConfirmDelete(product._id)}
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
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => {
                  handleDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
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

