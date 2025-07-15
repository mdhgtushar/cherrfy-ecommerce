import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../../features/productSlice";
import Loader from "../../../../components/Loader";
import ADMIN_PATHS from "../../ADMIN_PATHS";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("US");
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Load products for the default country
    dispatch(getAllProducts({ country: filterCountry, currency: "USD" }));
  }, [dispatch, filterCountry]);

  const handleCountryChange = (country) => {
    setFilterCountry(country);
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const countries = [
    "US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "PL",
    "SE", "NO", "FI", "DK", "IE", "PT", "BE", "CH", "AT", "CZ",
    "SK", "HU", "RO", "BG", "GR", "SI", "HR", "EE", "LV", "LT",
    "LU", "MT", "CY", "NZ", "AE", "IL", "TR", "MX", "BR", "AR",
    "ZA", "BD"
  ];

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage and edit AliExpress products</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or product ID..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Country</label>
              <select
                value={filterCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Link
                to={ADMIN_PATHS.PRODUCTS.ALIEXPRESS_EDIT}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
              >
                Edit All Countries Data
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name || "Unknown Product"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ID: {product.productId}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price || "0.00"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.country} • {product.currency}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`${ADMIN_PATHS.PRODUCTS.ALIEXPRESS_EDIT}?productId=${product.productId}`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 text-center"
                  >
                    Edit All Countries
                  </Link>
                  <Link
                    to={`${ADMIN_PATHS.PRODUCTS.VIEW}/${product._id}`}
                    className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try adjusting your search terms." : "No products available for this country."}
            </p>
            <Link
              to={ADMIN_PATHS.PRODUCTS.ALIEXPRESS}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Import New Product
            </Link>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="fixed top-6 right-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList; 