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

  const handleDelete = async (productId) => {
    const response = await dispatch(deleteProduct(productId));
    if (response.error) {
      console.log("error", response.error);
      return toast.error(response.error.message);
    } else {
      dispatch(fetchProducts());
      return toast.success("Product deleted successfully.");
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

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Product Filters</h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
          <select
            className="p-2 border rounded-md w-full md:w-48"
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
            className="p-2 border rounded-md w-full flex-1"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Disable</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Bulk Edit</button>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Export CSV</button>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Export JSON</button>
        </div>
      </section>

      {/* Product Table */}
      <div className="overflow-x-auto border rounded shadow bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Image</th>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((product, index) => {
                let imageUrl = "";
                let title = "";
                try {
                  const parsed = JSON.parse(product.logText);
                  imageUrl = parsed?.ae_multimedia_info_dto?.image_urls?.split(";")[0] || "";
                  title = parsed?.ae_item_base_info_dto?.subject || "No title";
                } catch (err) {
                  console.warn("Invalid logText for product", product);
                }

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {title.length > 120 ? `${title.slice(0, 120)}...` : title}
                    </td>
                    <td className="border px-4 py-2">
                      <a
                        href={`https://www.aliexpress.com/item/${product.productId}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      >
                        View on AliExpress
                      </a>
                      <Link
                        to={`${ADMIN_PATHS.PRODUCTS.EDIT + product._id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => setConfirmDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 top-0" style={{ margin: 0 }}>
          <div className="bg-white p-6 rounded shadow-lg">
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

