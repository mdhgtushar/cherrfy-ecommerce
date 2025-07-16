import React, { useEffect, useState } from "react";
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
  // New state to manage selected values for each attribute (e.g., {Color: 'Red', Size: 'M'})
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [qty, setQty] = useState(1);

  // Fetch product data on component mount or ID/country change
  useEffect(() => {
    dispatch(fetchProductById({ id, country: shipToCountry, currency }));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, shipToCountry, currency]);

  // Derive available options and their values from the product data
  const availableOptions = React.useMemo(() => {
    const options = {};
    // Use the country-specific product data structure
    if (selectedProduct?.skus) {
      selectedProduct.skus.forEach((skuItem) => {
        skuItem.ae_sku_property_dtos?.ae_sku_property_d_t_o?.forEach((prop) => {
          const propName = prop.sku_property_name;
          const propValue = prop.property_value_definition_name || prop.sku_property_value;
          if (!options[propName]) {
            options[propName] = {};
          }
          if (!options[propName][propValue]) {
            options[propName][propValue] = {
              value: propValue,
              image: prop.sku_image || null,
              skuPropertyId: prop.sku_property_id,
            };
          }
        });
      });
    }
    return options;
  }, [selectedProduct]);

  // Get all images (main product images + any SKU specific images)
  const allProductImages = React.useMemo(() => {
    const mainImages = selectedProduct?.images || [];
    const skuImages = new Set();
    selectedProduct?.skus?.forEach((skuItem) => {
      skuItem.ae_sku_property_dtos?.ae_sku_property_d_t_o?.forEach((prop) => {
        if (prop.sku_image) {
          skuImages.add(prop.sku_image);
        }
      });
    });
    return [...new Set([...mainImages, ...Array.from(skuImages)])];
  }, [selectedProduct]);

  // Initialize selected attributes and selected SKU when product data is available
  useEffect(() => {
    if (selectedProduct?.skus?.length > 0) {
      const firstSkuWithImage =
        selectedProduct.skus.find(
          (sku) =>
            sku.ae_sku_property_dtos?.ae_sku_property_d_t_o?.some((prop) => prop.sku_image)
        ) || selectedProduct.skus[0];

      if (firstSkuWithImage) {
        const initialAttributes = {};
        firstSkuWithImage.ae_sku_property_dtos?.ae_sku_property_d_t_o?.forEach((prop) => {
          initialAttributes[prop.sku_property_name] = prop.property_value_definition_name || prop.sku_property_value;
        });
        setSelectedAttributes(initialAttributes);
        setSelectedSKU(firstSkuWithImage);
        const primaryVisualProp = firstSkuWithImage.ae_sku_property_dtos?.ae_sku_property_d_t_o?.find((p) => p.sku_image);
        if (primaryVisualProp && primaryVisualProp.sku_image) {
          setSelectedImage(primaryVisualProp.sku_image);
        } else if (selectedProduct?.images?.length) {
          setSelectedImage(selectedProduct.images[0]);
        }
      }
    }
  }, [selectedProduct]);

  // Effect to find the matching SKU whenever selected attributes change
  useEffect(() => {
    if (!selectedProduct?.skus || Object.keys(selectedAttributes).length === 0) {
      setSelectedSKU(null);
      return;
    }
    const allSkus = selectedProduct.skus;
    const foundSku = allSkus.find((skuItem) => {
      return Object.keys(selectedAttributes).every((attrName) => {
        const selectedValue = selectedAttributes[attrName];
        return skuItem.ae_sku_property_dtos?.ae_sku_property_d_t_o?.some((prop) => {
          const skuPropValue = prop.property_value_definition_name || prop.sku_property_value;
          return prop.sku_property_name === attrName && skuPropValue === selectedValue;
        });
      });
    });
    if (foundSku) {
      setSelectedSKU(foundSku);
      const primaryVisualProp = foundSku.ae_sku_property_dtos?.ae_sku_property_d_t_o?.find((p) => p.sku_image);
      if (primaryVisualProp && primaryVisualProp.sku_image) {
        setSelectedImage(primaryVisualProp.sku_image);
      } else if (selectedProduct?.images?.length) {
        setSelectedImage(selectedProduct.images[0]);
      }
    } else {
      setSelectedSKU(null);
      if (selectedProduct?.images?.length) {
        setSelectedImage(selectedProduct.images[0]);
      }
    }
  }, [selectedAttributes, selectedProduct]);

  if (status === "loading" || status === "idle") {
    return <Loader />;
  }

  // Check for selectedProduct and essential data before rendering the main content
  if (
    status === "failed" ||
    !selectedProduct ||
    !selectedProduct.skus
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-600">
          Failed to load product details or product not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap bg-gray-50 mb-10">
      <div className="w-full md:w-3/4">
        <div className="block md:flex border-b-2 border-gray-200 py-2 md:pr-2">
          {/* Images Column */}
          <ImageZoom
            imageList={selectedProduct.images} // Pass all derived product images
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Product Info Column */}
          <div className="w-full md:w-2/5 p-2 md:p-8 bg-white">
            <div className="px-4 py-2 bg-red-100 mb-3 font-bold text-red-600 rounded border">
              <h2>Offer Price</h2>
            </div>
            <h1 className="text-xl font-bold mb-4">
              {selectedProduct?.ae_item_base_info_dto?.subject}
            </h1>

            {selectedSKU ? (
              <>
                <p className="text-red-600 text-6xl font-semibold mb-2">
                  ${selectedSKU.offer_sale_price}
                </p>
                <hr className="my-4 mb-1" />

                {/* Dynamically render options for each attribute type */}
                {Object.entries(availableOptions).map(
                  ([propName, valuesMap]) => (
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
                            className={`
                            p-1 border-2 rounded-md cursor-pointer
                            ${
                              selectedAttributes[propName] === option.value
                                ? "border-blue-500 ring-2 ring-blue-300"
                                : "border-gray-300"
                            }
                            ${
                              option.image
                                ? "w-16 h-16 flex items-center justify-center"
                                : "px-4 py-2 text-sm"
                            }
                            hover:border-blue-400 transition
                          `}
                            onClick={() =>
                              setSelectedAttributes((prev) => ({
                                ...prev,
                                [propName]: option.value,
                              }))
                            }
                            aria-label={`Select ${propName} ${option.value}`}
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
                  )
                )}
                {/* Display selected SKU details for debugging/info */}
                <div className="mt-4 text-sm text-gray-700">
                  <p>Selected SKU ID: {selectedSKU?.sku_id ?? "N/A"}</p>
                  <p>
                    Available Stock: {selectedSKU?.sku_available_stock ?? "N/A"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-red-500 text-lg">
                No matching product variation found for selected options. Please
                adjust your selections.
              </p>
            )}
          </div>
        </div>

        {/* Item Properties Section */}
        <ItemProperties selectedProduct={selectedProduct} />

        {/* Review List Section */}
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

      {/* Right Sidebar */}
      <ViewProductRightSidebar
        selectedProduct={selectedProduct}
        selectedSKU={selectedSKU}
        selectedImage={selectedImage}
        allProductImages={allProductImages}
      />

      <RecomandProducts />
    </div>
  );
};

export default ProductView;
