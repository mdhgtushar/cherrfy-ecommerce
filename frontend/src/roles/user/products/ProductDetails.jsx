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
import ProductSkeleton from "../../../components/ProductSkeleton";

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
    dispatch(fetchProductById({ id, country: shipToCountry || "BD", currency }));
    console.log(selectedProduct)
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

  if (status === "loading" || status === "idle") return <ProductSkeleton />;
  if (status === "failed" && !selectedProduct?.skus)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-600">Product not found or failed to load. {id}</h1>
      </div>
    );

  return (
    <div className="flex flex-wrap mb-10 container mx-auto">
      {/* Left Side */}
      <div className="w-full md:w-3/4">
        <div className="block md:flex border-b-2 border-gray-200 py-2 md:pr-2">
          {/* Image Gallery */}
          <ImageZoom
            imageList={allProductImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Product Info (w-full md:w-2/5) - ENHANCED UI FOR ACCURACY, SIZE, AND ALIGNMENT */}
          <div className="w-full md:w-2/5 p-4 md:p-6 lg:p-7"> {/* Adjusted padding slightly for better flow */}

            {/* Offer Price/Title Block - Accurate & Compact */}
            <div className="flex items-center justify-between mb-3">
              {/* Compact red badge for special offer */}
              <div className="px-2.5 py-0.5 text-xs font-semibold text-white bg-red-600 rounded-full shadow-sm tracking-wide uppercase">
                Special Offer
              </div>
              {/* Placeholder for rating/reviews if available */}
              {/* <div className="text-sm text-gray-500 flex items-center">
            <span className="text-yellow-400 mr-1">★</span> 4.5 (125 Reviews)
        </div> */}
            </div>

            {/* Product Name - SLIGHTLY SMALLER & TIGHTER for accuracy */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
              {selectedProduct?.name || "Unnamed Product"}
            </h1>

            <hr className="my-4 border-gray-100" />

            {selectedSKU ? (
              <>
                {/* Price Block - ACCURATE & SLIGHTLY SMALLER */}
                <div className="mb-4 flex items-baseline"> {/* Use flex to align prices cleanly */}
                  {/* Offer Price - High impact, but smaller than 5xl */}
                  <p className="text-red-600 text-4xl font-extrabold leading-none mr-3">
                    {selectedProduct.currency}{selectedSKU.offer_sale_price}
                  </p>

                  {/* Original Price - Smaller line-through */}
                  <span className="text-lg font-medium text-gray-400 line-through">
                    {selectedProduct.currency}{(selectedSKU.origin_sale_price || (parseFloat(selectedSKU.offer_sale_price) * 1.3).toFixed(2))}
                  </span>
                </div>

                <hr className="my-5 border-gray-100" />

                {/* Variation Options - ENHANCED FOR LESS TEXT CLUTTER */}
                <div className="space-y-5"> {/* Slightly reduced spacing to save vertical space */}
                  {Object.entries(availableOptions).map(([propName, valuesMap]) => (
                    <div key={propName}>
                      {/* Variation Label - Adjusted Margin */}
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {propName}:{" "}
                        {/* Selected Value Highlight - Clear and compact */}
                        <span className="font-semibold text-gray-900 ml-1">
                          {selectedAttributes[propName]}
                        </span>
                      </p>

                      {/* Option Buttons - Refined sizes and gap */}
                      <div className="flex flex-wrap gap-2"> {/* Tighter gap for more options per row */}
                        {Object.values(valuesMap).map((option) => (
                          <button
                            key={option.value}
                            // p-0.5 is fine, but adjusted sizes slightly
                            className={`p-0.5 border-2 rounded-lg transition-all duration-200 
                                        group relative cursor-pointer focus:outline-none 
                                        ${selectedAttributes[propName] === option.value
                                ? "border-red-600 ring-2 ring-red-200 shadow-sm"
                                : "border-gray-300 hover:border-red-400"
                              } 
                                        ${option.image
                                // Image buttons kept at a compact 14x14
                                ? "w-14 h-14 flex items-center justify-center"
                                : "px-3 py-1 text-sm font-medium" // Text buttons are also compact
                              }`}
                            onClick={() =>
                              setSelectedAttributes((prev) => ({
                                ...prev,
                                [propName]: option.value,
                              }))
                            }
                          >
                            {option.image ? (
                              <>
                                <img
                                  src={option.image}
                                  alt={option.value}
                                  className="w-full h-full object-cover rounded-md"
                                />
                                {/* 🚨 UI ENHANCEMENT: Tooltip for image options to avoid large text inside */}
                                <span
                                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                                >
                                  {option.value}
                                </span>
                              </>
                            ) : (
                              option.value
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="text-yellow-700 font-medium">
                  ⚠️ Combination not found. Please select an available option.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Property Info */}
        <ItemProperties selectedProduct={selectedProduct} />
      {/* Reviews */}
      <ReviewList />
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
