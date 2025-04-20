import { useState } from "react";
import axios from "axios";

const AliExpressViewer = () => {
  const [productId, setProductId] = useState("");
  const [skus, setSkus] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const response = await axios.post(
        "http://localhost:5000/api/product/" + productId,
        {
          productId: productId,
        }
      );

      if (response.status === 200) {
        console.log("Product info saved successfully.");
        setMessage("Product info saved successfully.");
      } else {
        console.error("Failed to save product info.");
        setMessage("Failed to save product info.");
      }
    } catch (error) {
      console.error("Error saving product info:", error);
      setMessage("Error saving product info.");
    }
  };

  return (
    <div className="bg-gradient-to-br border rounded border-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white p-8 rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          AliExpress Product Viewer
        </h1>

        <form
          onSubmit={fetchProductInfo}
          className="space-y-4 mb-8 w-96 mx-auto"
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
            {loading ? "Loading..." : "Get Product Info"}
          </button>

          {skus.length !== 0 && !error && !loading && (
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={saveProductInfo}
            >
              {loading ? "Loading..." : "Save Product Info"}
            </button>
          )}
        {message && (<b>{message}</b>)}
        </form>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {skus.length === 0 && !error && !loading && (
          <p className="text-yellow-600 font-medium text-center">
            No SKU data found.
          </p>
        )}
        <div className="space-y-6">
          {skus.map((sku, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default AliExpressViewer;
