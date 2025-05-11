import React from "react";
import { Link } from "react-router-dom";
import { ADMIN_PATHS } from "../../../routes/paths";

const ProductList = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading...</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Image</th>
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">AliExpress</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            let imageUrl = "";
            try {
              const parsed = JSON.parse(product.logText);
              imageUrl = parsed?.ae_multimedia_info_dto?.image_urls?.split(";")[0] || "";
            } catch (err) {
              console.warn("Invalid logText for product", product);
            }

            return (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-200 px-4 py-2">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2">{JSON.parse(product.logText).ae_item_base_info_dto.subject.length > 120
                      ? JSON.parse(product.logText).ae_item_base_info_dto.subject.slice(0, 120) +
                        "..."
                      : JSON.parse(product.logText).ae_item_base_info_dto.subject}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <a
                    href={`https://www.aliexpress.com/item/${product.productId}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    View
                  </a>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  
                    <Link to={`${ADMIN_PATHS.PRODUCTS.EDIT+product._id}`} 
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </Link>
                    <Link to={`/editProduct/${product._id}`} 
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Delete
                    </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
