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

const AliExpressViewer = () => {
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const fetchProductInfo = async (e) => {
    e.preventDefault();

    const response = await dispatch(fetchAliProduct(productId));

      console.log("error response", response);
    if (response.error) {
      console.log("error", response);
      return toast.error(response.error.message);
    } else {
      return toast.success("Product info fetched successfully.");
    }
  };
  console.log(error);
  const saveProductInfo = async () => {
    try {
      const response = await dispatch(SaveAliProduct(productId));

      console.log(response);
      console.log("Product info saved successfully.");
      setMessage("Product info saved successfully.");
      toast.success("Product info saved successfully.");
    } catch (error) {
      console.error("Error saving product info:", error);
      setMessage("Error saving product info.");
      toast.error("Error saving product info.");
    }
  };
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div className="bg-gradient-to-br border rounded border-gray-200 min-h-screen">
      <div className="w-full bg-white p-8 rounded-2xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          AliExpress Product Import
        </h1>

        <div className="flex items-center bg-gray-100 p-4 mb-5">
          <form
            onSubmit={fetchProductInfo}
            className="space-y-4 mb-8 w-96 shadow p-4 my-2"
          >
            <label
              htmlFor="product_id"
              className="block text-gray-700 font-semibold"
            >
              Enter Product ID
            </label>
            <input
              type="text"
              id="product_id"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 1005008252021087"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {status === "loading" ? "Loading..." : "Get Product Info"}
            </button>

            {/* {selectedProduct?.BD?.skus.length !== 0 && !error && !loading && (
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={saveProductInfo}
            >
              {loading ? "Loading..." : "Save Product Info"}
            </button>
          )} */}
            {error && <b>{error}</b>}
          </form>
          <div className="flex-1">
            {selectedProduct?.BD?.ae_multimedia_info_dto && (
              <div className="p-4 shadow ml-4">
                <h2 className="text-xl font-semibold mb-2 inline">
                  Product Title:{" "}
                </h2>
                <span className=" font-semibold">
                  {selectedProduct?.BD?.ae_item_base_info_dto?.subject}
                </span>
                <h2 className="text-xl font-semibold mb-2">Total Sku: </h2>
                <p className="text-lg font-semibold">
                  {selectedProduct?.BD?.ae_item_sku_info_dtos?.length}
                </p>
                <button
                  className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 mt-2 px-5"
                  onClick={saveProductInfo}
                >
                  Save Product Info
                </button>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {selectedProduct?.BD?.ae_multimedia_info_dto && (
          <>
            <ProductImages
              images={selectedProduct?.BD?.ae_multimedia_info_dto?.image_urls}
            />
            <ProductInformationCreate
              productInfo={selectedProduct?.BD?.ae_item_base_info_dto}
            />
            <AddProperty
              propertyList={
                selectedProduct?.BD?.ae_item_properties.ae_item_property
              }
            />
            <AddSKU
              skuList={
                selectedProduct?.BD?.ae_item_sku_info_dtos
                  .ae_item_sku_info_d_t_o
              }
            />
          </>
        )}

        {!selectedProduct?.BD?.ae_multimedia_info_dto && (
          <p className="h-40 flex items-center justify-center text-green-600 font-semibold text-2xl bg-gray-100 shadow">
            Please Search by a product from aliexpress
          </p>
        )}

        {/* <div className="space-y-6">
          {selectedProduct?.BD?.skus.map((sku, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <p>
                <strong>SKU Attribute:</strong> {sku.sku_attr}
              </p>
              <p>
                <strong>Sale Price:</strong> {sku.offer_sale_price}{" "}
                {sku.currency_code}
              </p>
              <p>
                <strong>Stock:</strong> {sku.sku_available_stock}
              </p>
              <p>
                <strong>SKU ID:</strong> {sku.sku_id}
              </p>
              <p>
                <strong>SKU Code:</strong> {sku.sku_code}
              </p>

              {(sku.ae_sku_property_dtos?.ae_sku_property_d_t_o || []).map(
                (prop, i) => (
                  <div key={i} className="mt-2 pl-2 border-l-4 border-blue-500">
                    <p>
                      <strong>Property Name:</strong> {prop.sku_property_name}
                    </p>
                    <p>
                      <strong>Property Value:</strong> {prop.sku_property_value}
                    </p>
                    {prop.sku_image && (
                      <img
                        src={prop.sku_image}
                        alt="SKU"
                        className="w-24 h-24 object-cover rounded border mt-2"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AliExpressViewer;
