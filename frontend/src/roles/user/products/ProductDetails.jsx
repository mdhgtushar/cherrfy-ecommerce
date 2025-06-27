import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  fetchProductById,
} from "../../../features/productSlice";

import Loader from "../../../components/Loader";
import ReviewList from "../review/ReviewList";
import ImageZoom from "./ImageZoom";
import RecomandProducts from "./RecomandProducts";
import ViewProductRightSidebar from "./ViewProductRightSidebar";
import ItemProperties from "./ItemProperties";

const ProductView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct, status } = useSelector((state) => state.products);
  const { shipToCountry, currency } = useSelector((state) => state.userSettings);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchProductById({ id, country: shipToCountry, currency }));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id, shipToCountry, currency]);

  // Build variation options
  const availableOptions = useMemo(() => {
    const options = {};
    selectedProduct?.skus?.forEach((sku) => {
      sku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.forEach((prop) => {
        const propName = prop.sku_property_name;
        const propValue = prop.property_value_definition_name || prop.sku_property_value;

        if (!options[propName]) options[propName] = {};
        if (!options[propName][propValue]) {
          options[propName][propValue] = {
            value: propValue,
            image: prop.sku_image || null,
            skuPropertyId: prop.sku_property_id,
          };
        }
      });
    });
    return options;
  }, [selectedProduct]);

  // Build all images
  const allProductImages = useMemo(() => {
    const mainImages = selectedProduct?.images || [];
    const skuImages = new Set();
    selectedProduct?.skus?.forEach((sku) => {
      sku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.forEach((prop) => {
        if (prop?.sku_image) skuImages.add(prop.sku_image);
      });
    });
    return [...new Set([...mainImages, ...skuImages])];
  }, [selectedProduct]);

  // Init selected SKU
  useEffect(() => {
    if (!selectedProduct?.skus?.length) return;

    const firstSku = selectedProduct.skus.find((sku) =>
      sku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.some((p) => p?.sku_image)
    ) || selectedProduct.skus[0];

    if (firstSku) {
      const attrs = {};
      firstSku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.forEach((prop) => {
        attrs[prop.sku_property_name] =
          prop.property_value_definition_name || prop.sku_property_value;
      });
      setSelectedAttributes(attrs);
      setSelectedSKU(firstSku);

      const imgProp = firstSku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.find(
        (p) => p?.sku_image
      );
      setSelectedImage(imgProp?.sku_image || selectedProduct?.images?.[0]);
    }
  }, [selectedProduct]);

  // React to attribute changes
  useEffect(() => {
    if (!selectedProduct?.skus || !Object.keys(selectedAttributes).length) {
      setSelectedSKU(null);
      return;
    }

    const foundSku = selectedProduct.skus.find((sku) =>
      Object.keys(selectedAttributes).every((attrName) =>
        sku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.some((prop) => {
          const val = prop.property_value_definition_name || prop.sku_property_value;
          return (
            prop.sku_property_name === attrName && val === selectedAttributes[attrName]
          );
        })
      )
    );

    if (foundSku) {
      setSelectedSKU(foundSku);
      const img = foundSku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.find(
        (p) => p?.sku_image
      );
      setSelectedImage(img?.sku_image || selectedProduct?.images?.[0]);
    } else {
      setSelectedSKU(null);
      setSelectedImage(selectedProduct?.images?.[0]);
    }
  }, [selectedAttributes, selectedProduct]);

  if (status === "loading" || status === "idle") return <Loader />;
  if (status === "failed" || !selectedProduct?.skus)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-600">Product not found or failed to load.</h1>
      </div>
    );

  return (
    <div className="flex flex-wrap bg-gray-50 mb-10 container mx-auto">
      {/* Left Side */}
      <div className="w-full md:w-3/4">
        <div className="block md:flex border-b-2 border-gray-200 py-2 md:pr-2">
          {/* Image Gallery */}
          <ImageZoom
            imageList={allProductImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Product Info */}
          <div className="w-full md:w-2/5 p-2 md:p-8 bg-white">
            <div className="px-4 py-2 bg-red-100 mb-3 font-bold text-red-600 rounded border">
              <h2>Offer Price</h2>
            </div>
            <h1 className="text-xl font-bold mb-4">
              {selectedProduct?.name || "Unnamed Product"}
            </h1>

            {selectedSKU ? (
              <>
                <p className="text-red-600 text-4xl font-semibold mb-2">
                  {selectedProduct.currency}{selectedSKU.offer_sale_price}
                </p>
                <hr className="my-4 mb-2" />

                {/* Variation Buttons */}
                {Object.entries(availableOptions).map(([propName, valuesMap]) => (
                  <div key={propName} className="mb-4">
                    <p className="text-lg font-semibold mb-2">
                      {propName}:{" "}
                      <span className="font-normal">
                        {selectedAttributes[propName]}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(valuesMap).map((option) => (
                        <button
                          key={option.value}
                          className={`p-1 border-2 rounded-md cursor-pointer ${
                            selectedAttributes[propName] === option.value
                              ? "border-blue-500 ring-2 ring-blue-300"
                              : "border-gray-300"
                          } ${
                            option.image
                              ? "w-16 h-16 flex items-center justify-center"
                              : "px-4 py-2 text-sm"
                          } hover:border-blue-400 transition`}
                          onClick={() =>
                            setSelectedAttributes((prev) => ({
                              ...prev,
                              [propName]: option.value,
                            }))
                          }
                        >
                          {option.image ? (
                            <img
                              src={option.image}
                              alt={option.value}
                              className="w-full h-full object-cover rounded-sm"
                            />
                          ) : (
                            option.value
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div className="my-4">
                  <label className="text-sm font-medium text-gray-600">Quantity</label>
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="border rounded px-3 py-1 w-24 mt-1"
                  />
                </div>

                {/* SKU Info */}
                <div className="text-sm text-gray-600 mt-2">
                  <p><strong>SKU ID:</strong> {selectedSKU?.sku_id}</p>
                  <p><strong>Stock:</strong> {selectedSKU?.sku_available_stock}</p>
                  <p>
                    <strong>Price in {selectedProduct?.currency}:</strong>{" "}
                    {(parseFloat(selectedSKU?.offer_sale_price || 0) * selectedProduct?.rate).toFixed(2)}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-red-500 mt-4">
                No matching variation found. Please change options.
              </p>
            )}
          </div>
        </div>

        {/* Property Info */}
        <ItemProperties selectedProduct={selectedProduct} />

        {/* Reviews */}
        <ReviewList
          reviews={[
            {
              name: "Alice",
              rating: 4,
              comment: "Great product!",
              createdAt: "2024-12-01T12:34:56Z",
            },
            {
              name: "Bob",
              rating: 5,
              comment: "Excellent quality and fast delivery.",
              createdAt: "2024-12-03T15:20:00Z",
            },
          ]}
        />
      </div>

      {/* Sidebar */}
      <ViewProductRightSidebar
        selectedProduct={selectedProduct}
        selectedSKU={selectedSKU}
        selectedImage={selectedImage}
        allProductImages={allProductImages}
      />

      {/* Recommendations */}
      <RecomandProducts />
    </div>
  );
};

export default ProductView;
