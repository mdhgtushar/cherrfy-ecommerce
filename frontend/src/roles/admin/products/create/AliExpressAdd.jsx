import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAliProduct,
  SaveAliProduct,
} from "../../../../features/productSlice";
import Loader from "../../../../components/Loader";
import ProductInformationCreate from "./ProductInformationCreate";
import ProductImages from "./ProductImages";
import AddProperty from "./AddProperty";
import AddSKU from "./AddSKU";
import { Link } from "react-router-dom";
import ADMIN_PATHS from "../../ADMIN_PATHS";

const AliExpressAdd = () => {
  const [productId, setProductId] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const { selectedProduct, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const fetchProductInfo = async (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      toast.error("Please enter a valid AliExpress Product ID.");
      return;
    }
    const response = await dispatch(fetchAliProduct(productId));
    if (response.error) {
      toast.error(response.error.message || "Failed to fetch product info.");
    } else {
      toast.success("Product info fetched successfully.");
      setStep(2);
    }
  };

  const saveProductInfo = async () => {
    try {
      const response = await dispatch(SaveAliProduct(productId));
      if (response.error) {
        toast.error(response.error.message || "Failed to save product info.");
        setMessage("Error saving product info.");
      } else {
        setMessage("Product info saved successfully.");
        toast.success("Product info saved successfully.");
      }
    } catch (error) {
      setMessage("Error saving product info.");
      toast.error("Error saving product info.");
    }
  };

  const getProductData = () => {
    return selectedProduct?.BD || selectedProduct?.US || selectedProduct?.GB || selectedProduct?.CA;
  };

  const productData = getProductData();

  const tabs = [
    { id: "preview", label: "Preview", icon: "👁️" },
    { id: "images", label: "Images", icon: "🖼️" },
    { id: "skus", label: "SKUs", icon: "📦" },
    { id: "properties", label: "Properties", icon: "🏷️" },
    { id: "details", label: "Details", icon: "📄" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={ADMIN_PATHS.PRODUCTS.SOURCE}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AliExpress Product Import</h1>
                <p className="text-sm text-slate-600">Import products directly from AliExpress</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Step {step} of 2
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                step >= 1 ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                1
              </div>
              <div>
                <div className={`font-semibold ${step >= 1 ? 'text-blue-700' : 'text-slate-400'}`}>
                  Enter Product ID
                </div>
                <div className="text-xs text-slate-500">Find your product</div>
              </div>
            </div>
            
            <div className="w-16 h-1 bg-slate-200 rounded-full">
              <div className={`h-1 rounded-full transition-all duration-300 ${
                step >= 2 ? 'bg-blue-600' : 'bg-slate-200'
              }`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                step >= 2 ? 'bg-blue-600' : 'bg-slate-300'
              }`}>
                2
              </div>
              <div>
                <div className={`font-semibold ${step >= 2 ? 'text-blue-700' : 'text-slate-400'}`}>
                  Preview & Import
                </div>
                <div className="text-xs text-slate-500">Review and save</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Enter Product ID */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Import from AliExpress</h2>
                <p className="text-slate-600">Enter the AliExpress product ID to import product details</p>
              </div>

              <form onSubmit={fetchProductInfo} className="space-y-6">
                <div>
                  <label htmlFor="product_id" className="block text-slate-700 font-semibold mb-3">
                    AliExpress Product ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="product_id"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                      placeholder="e.g. 1005008252021087"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Find the product ID in the AliExpress URL: aliexpress.com/item/1005008252021087.html
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-red-700 font-medium">
                        {typeof error === 'string' ? error : error?.message || 'Failed to fetch product info.'}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Fetching Product...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                      </svg>
                      <span>Get Product Info</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Preview & Import */}
        {step === 2 && productData && (
          <div className="space-y-6">
            {/* Product Preview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Product Preview</h2>
                      <p className="text-slate-600">Review and import product details</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                      onClick={() => setStep(1)}
                    >
                      Search Another
                    </button>
                    <button
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                      onClick={saveProductInfo}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Import to Catalog</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Basic Info */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Image */}
                  <div className="lg:col-span-1">
                    <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
                      {productData.ae_multimedia_info_dto?.image_urls ? (
                        <img
                          src={productData.ae_multimedia_info_dto.image_urls.split(';')[0]}
                          alt={productData.ae_item_base_info_dto?.subject}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center text-slate-400" style={{ display: productData.ae_multimedia_info_dto?.image_urls ? 'none' : 'flex' }}>
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {productData.ae_item_base_info_dto?.subject || 'Untitled Product'}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {productData.ae_item_base_info_dto?.description || 'No description available'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Product ID</div>
                        <div className="font-semibold text-slate-900">{productId}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">SKUs</div>
                        <div className="font-semibold text-slate-900">
                          {productData.ae_item_sku_info_dtos?.length || 0}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Category</div>
                        <div className="font-semibold text-slate-900">
                          {productData.ae_item_base_info_dto?.category_id || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Images</div>
                        <div className="font-semibold text-slate-900">
                          {productData.ae_multimedia_info_dto?.image_urls?.split(';').length || 0}
                        </div>
                      </div>
                    </div>

                    {message && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-green-700 font-medium">{message}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
                          ? 'bg-blue-50 text-blue-700 shadow-sm'
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
                {activeTab === "preview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-900 mb-3">Product Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Title:</span>
                            <span className="font-medium">{productData.ae_item_base_info_dto?.subject}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Category:</span>
                            <span className="font-medium">{productData.ae_item_base_info_dto?.category_id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">SKUs:</span>
                            <span className="font-medium">{productData.ae_item_sku_info_dtos?.length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-900 mb-3">Import Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Images:</span>
                            <span className="font-medium">{productData.ae_multimedia_info_dto?.image_urls?.split(';').length || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Properties:</span>
                            <span className="font-medium">{productData.ae_item_properties?.ae_item_property?.length || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Status:</span>
                            <span className="font-medium text-green-600">Ready to Import</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "images" && (
                  <ProductImages images={productData.ae_multimedia_info_dto?.image_urls} />
                )}

                {activeTab === "skus" && (
                  <AddSKU skuList={productData.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o} />
                )}

                {activeTab === "properties" && (
                  <AddProperty propertyList={productData.ae_item_properties?.ae_item_property} />
                )}

                {activeTab === "details" && (
                  <ProductInformationCreate productInfo={productData.ae_item_base_info_dto} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {step === 2 && !productData && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Product Data Found</h3>
              <p className="text-slate-600 mb-6">Please check the Product ID and try again.</p>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Search Another Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AliExpressAdd;
