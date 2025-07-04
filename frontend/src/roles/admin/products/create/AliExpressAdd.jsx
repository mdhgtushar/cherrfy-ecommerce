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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header & Stepper */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">AliExpress Product Import</h1>
            <p className="text-gray-600 mt-1 text-sm">Import products directly from AliExpress by Product ID</p>
          </div>
          <Link
            to={ADMIN_PATHS.PRODUCTS.SOURCE}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-700 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </Link>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}>1</div>
            <span className={`font-medium ${step >= 1 ? 'text-blue-700' : 'text-gray-400'}`}>Enter Product ID</span>
            <div className={`w-8 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}>2</div>
            <span className={`font-medium ${step >= 2 ? 'text-blue-700' : 'text-gray-400'}`}>Preview & Import</span>
          </div>
        </div>

        {/* Step 1: Enter Product ID */}
        {step === 1 && (
          <form onSubmit={fetchProductInfo} className="space-y-6">
            <div>
              <label htmlFor="product_id" className="block text-gray-700 font-semibold mb-2">
                AliExpress Product ID
              </label>
              <input
                type="text"
                id="product_id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 1005008252021087"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 font-semibold text-sm">
                {typeof error === 'string' ? error : error?.message || 'Failed to fetch product info.'}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Loading...' : 'Get Product Info'}
            </button>
          </form>
        )}

        {/* Step 2: Preview & Import */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Product Preview Card */}
            {selectedProduct?.BD?.ae_multimedia_info_dto ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedProduct.BD.ae_multimedia_info_dto.image_urls?.split(';')[0]}
                    alt={selectedProduct.BD.ae_item_base_info_dto?.subject}
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedProduct.BD.ae_item_base_info_dto?.subject}
                  </h2>
                  <div className="text-gray-600 text-sm">
                    <span className="font-semibold">Product ID:</span> {productId}
                  </div>
                  <div className="text-gray-600 text-sm">
                    <span className="font-semibold">SKUs:</span> {selectedProduct.BD.ae_item_sku_info_dtos?.length}
                  </div>
                  <div className="text-gray-600 text-sm">
                    <span className="font-semibold">Category:</span> {selectedProduct.BD.ae_item_base_info_dto?.category_id}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={saveProductInfo}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Saving...' : 'Import to Catalog'}
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                      onClick={() => setStep(1)}
                    >
                      Search Another
                    </button>
                  </div>
                  {message && (
                    <div className="mt-2 text-green-600 font-semibold text-sm">{message}</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800 text-center">
                No product data found. Please check the Product ID and try again.
              </div>
            )}

            {/* Product Details (Optional: Expandable) */}
            {selectedProduct?.BD?.ae_multimedia_info_dto && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Product Details</h3>
                <ProductImages images={selectedProduct.BD.ae_multimedia_info_dto.image_urls} />
                <ProductInformationCreate productInfo={selectedProduct.BD.ae_item_base_info_dto} />
                <AddProperty propertyList={selectedProduct.BD.ae_item_properties?.ae_item_property} />
                <AddSKU skuList={selectedProduct.BD.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AliExpressAdd;
