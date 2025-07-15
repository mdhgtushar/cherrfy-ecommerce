import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SaveAliProduct } from "../../../../features/productSlice";

const AliExpressViewer = () => {
  const [productId, setProductId] = useState("");
  const [skus, setSkus] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  const dispatch = useDispatch();

  const fetchProductInfo = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const appKey = "510834";
      const appSecret = "FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad";
      const accessToken =
        "50000101140zfnZXzhWcnqCVodZgFv4Nw1FFFvgvGw1EG3FtRi8Q18207c5aQKm3OAov";
      const timestamp = Date.now();
      const method = "aliexpress.ds.product.get";
      const apiUrl = "https://api-sg.aliexpress.com/sync";

      const params = {
        method,
        app_key: appKey,
        access_token: accessToken,
        timestamp,
        product_id: productId,
        ship_to_country: "bd",
        sign_method: "sha256",
        aliexpress_category_id: "200135143",
      };

      const signString = Object.keys(params)
        .sort()
        .map((key) => key + params[key])
        .join("");

      const encoder = new TextEncoder();
      const keyData = encoder.encode(appSecret);
      const msgData = encoder.encode(signString);

      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        msgData
      );
      const signHex = Array.from(new Uint8Array(signatureBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

      params.sign = signHex;
      const query = new URLSearchParams(params).toString();

      const response = await fetch(`${apiUrl}?${query}`);
      const data = await response.json();
      console.log(data);
      const skuData =
        data?.aliexpress_ds_product_get_response?.result?.ae_item_sku_info_dtos
          ?.ae_item_sku_info_d_t_o || [];

      setSkus(skuData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product info.");
    } finally {
      setLoading(false);
    }
  };

  const saveProductInfo = async () => {
    try {
      const response = await dispatch(SaveAliProduct(productId));
      if (response.error) {
        console.error("Failed to save product info.");
        setMessage("Failed to save product info.");
        toast.error("Failed to save product info.");
      } else {
        console.log("Product info saved successfully.");
        setMessage("Product info saved successfully.");
        toast.success("Product info saved successfully.");
      }
    } catch (error) {
      console.error("Error saving product info:", error);
      setMessage("Error saving product info.");
      toast.error("Error saving product info.");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "skus", label: "SKUs", icon: "📦" },
    { id: "details", label: "Details", icon: "📄" }
  ];

  const getSkuStats = () => {
    if (!skus.length) return null;
    
    const totalPrice = skus.reduce((sum, sku) => sum + parseFloat(sku.offer_sale_price || 0), 0);
    const avgPrice = totalPrice / skus.length;
    const totalStock = skus.reduce((sum, sku) => sum + parseInt(sku.sku_available_stock || 0), 0);
    
    return {
      totalSkus: skus.length,
      avgPrice: avgPrice.toFixed(2),
      totalStock,
      priceRange: {
        min: Math.min(...skus.map(sku => parseFloat(sku.offer_sale_price || 0))),
        max: Math.max(...skus.map(sku => parseFloat(sku.offer_sale_price || 0)))
      }
    };
  };

  const stats = getSkuStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AliExpress Product Viewer</h1>
                <p className="text-sm text-slate-600">View and analyze AliExpress product data</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {skus.length} SKUs Found
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Search AliExpress Product</h2>
              <p className="text-slate-600">Enter the AliExpress product ID to view detailed SKU information</p>
            </div>

            <form onSubmit={fetchProductInfo} className="space-y-4">
              <div>
                <label htmlFor="product_id" className="block text-slate-700 font-semibold mb-2">
                  AliExpress Product ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="product_id"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                    placeholder="e.g. 1005008252021087"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Get Product Info</span>
                    </>
                  )}
                </button>

                {skus.length > 0 && (
                  <button
                    type="button"
                    onClick={saveProductInfo}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Product</span>
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-700 font-medium">{message}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Results */}
        {skus.length > 0 && (
          <div className="space-y-6">
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total SKUs</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.totalSkus}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Average Price</p>
                      <p className="text-2xl font-bold text-slate-900">${stats.avgPrice}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Stock</p>
                      <p className="text-2xl font-bold text-slate-900">{stats.totalStock}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Price Range</p>
                      <p className="text-2xl font-bold text-slate-900">${stats.priceRange.min} - ${stats.priceRange.max}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabbed Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-slate-200">
                <div className="flex space-x-1 p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-orange-50 text-orange-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-900 mb-3">Product Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Product ID:</span>
                            <span className="font-medium">{productId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total SKUs:</span>
                            <span className="font-medium">{skus.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Average Price:</span>
                            <span className="font-medium">${stats?.avgPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-900 mb-3">Stock Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Stock:</span>
                            <span className="font-medium">{stats?.totalStock}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Price Range:</span>
                            <span className="font-medium">${stats?.priceRange.min} - ${stats?.priceRange.max}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Status:</span>
                            <span className="font-medium text-green-600">Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "skus" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">SKU Details</h3>
                      <div className="text-sm text-slate-500">{skus.length} SKUs found</div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {skus.map((sku, index) => (
                        <div
                          key={index}
                          className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-slate-900">SKU #{index + 1}</h4>
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {sku.sku_id}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Attribute:</span>
                              <span className="font-medium">{sku.sku_attr}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Sale Price:</span>
                              <span className="font-medium">{sku.offer_sale_price} {sku.currency_code}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Stock:</span>
                              <span className="font-medium">{sku.sku_available_stock}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Code:</span>
                              <span className="font-medium">{sku.sku_code}</span>
                            </div>
                          </div>

                          {/* SKU Properties */}
                          {(sku.ae_sku_property_dtos?.ae_sku_property_d_t_o || []).length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              <h5 className="font-medium text-slate-900 mb-2">Properties</h5>
                              <div className="space-y-2">
                                {sku.ae_sku_property_dtos.ae_sku_property_d_t_o.map((prop, i) => (
                                  <div key={i} className="bg-white rounded-lg p-3 border border-slate-200">
                                    <div className="flex items-center space-x-4">
                                      {prop.sku_image && (
                                        <img
                                          src={prop.sku_image}
                                          alt="SKU"
                                          className="w-12 h-12 object-cover rounded-lg border"
                                        />
                                      )}
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900">{prop.sku_property_name}</div>
                                        <div className="text-sm text-slate-600">{prop.sku_property_value}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">API Response Details</h4>
                      <div className="text-sm text-slate-600">
                        <p>Product ID: {productId}</p>
                        <p>Total SKUs Retrieved: {skus.length}</p>
                        <p>Data Source: AliExpress API</p>
                        <p>Last Updated: {new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {skus.length === 0 && !error && !loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No SKU Data Found</h3>
              <p className="text-slate-600">Enter a valid AliExpress product ID to view SKU information</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AliExpressViewer;
