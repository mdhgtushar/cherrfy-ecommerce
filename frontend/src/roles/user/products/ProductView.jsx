import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, checkout } from "../../../features/cartSlice";
import {
  clearSelectedProduct,
  fetchProductById,
} from "../../../features/productSlice";
import Loader from "../../../components/Loader";
import USER_PATHS from "../USER_PATHS";
import ReviewList from "../review/ReviewList";
import ImageZoom from "./ImageZoom";
import Recomand from "./Recomand";

const ProductView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedProduct, status } = useSelector((state) => state.products);
  const { shipToCountry } = useSelector((state) => state.userSettings);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById({ id, country:shipToCountry }));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, shipToCountry]);

  useEffect(() => {
    if (selectedProduct.ae_multimedia_info_dto) {
      const firstImage =
        selectedProduct?.ae_multimedia_info_dto?.image_urls.split(";")[0];
      setSelectedImage(firstImage);
      setSelectedSKU(
        selectedProduct?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o[0]
      );
    }
  }, [selectedProduct]);

  if (status === "loading" || status === "idle") {
    return <Loader />;
  }
  if (status === "failed" || !selectedProduct.ae_item_sku_info_dtos) {
    return (
      <div>
        <h1>Failed to fetch selectedProduct</h1>
      </div>
    );
  }

  const goOrder = () => {
    dispatch(
      checkout([
        {
          id: 1,
          name: selectedProduct.ae_item_base_info_dto.subject,
          price: 99.99,
          image:
            selectedProduct?.ae_multimedia_info_dto.image_urls.split(";")[0],
          quantity: 1,
        },
      ])
    );

    navigate(USER_PATHS.CHECKOUT);
  };

  const imageList =
    selectedProduct?.ae_multimedia_info_dto?.image_urls.split(";");

  return (
    <div className="flex flex-wrap bg-gray-50 mb-10">
      <div className="w-full md:w-3/4">
        <div className="block md:flex border-b-2 border-gray-200 py-2 md:pr-2">
          {/* Images Column */}
          <ImageZoom
            imageList={imageList}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* selectedProduct Info Column */}
          <div className="w-full md:w-2/5 p-2 md:p-8 bg-white">
            <div className="px-4 py-2 bg-red-100 mb-3 font-bold text-red-600 rounded border">
              <h2>Offer Price</h2>
            </div>
            <h1 className="text-xl font-bold mb-4">
              {selectedProduct?.ae_item_base_info_dto?.subject}
            </h1>

            {selectedSKU && (
              <>
                <p className="text-red-600 text-6xl font-semibold mb-2">
                  ${selectedSKU.offer_sale_price}
                </p>
                <hr className="my-4 mb-1" />
                {selectedSKU.ae_sku_property_dtos.ae_sku_property_d_t_o.map(
                  (item) => (
                    <p
                      className="text-xl font-semibold mb-2"
                      key={item.sku_property_id}
                    >
                      {item.sku_property_name} : {item.sku_property_value}
                    </p>
                  )
                )}
              </>
            )}

            <div className="grid grid-cols-6 gap-2 mb-4">
              {selectedProduct.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map(
                (item) => {
                  const sku =
                    item.ae_sku_property_dtos.ae_sku_property_d_t_o[0];
                  imageList.push(sku.sku_image);
                  return (
                    <img
                      key={item.sku_id}
                      src={sku.sku_image}
                      alt={sku.property_value_definition_name}
                      className="w-full h-12 object-cover rounded border cursor-pointer"
                      onClick={() => {
                        setSelectedSKU(item);
                        const skuImg =
                          item.ae_sku_property_dtos.ae_sku_property_d_t_o[0]
                            ?.sku_image;
                        if (skuImg) {
                          setSelectedImage(skuImg);
                        }
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Item Properties
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {selectedProduct.ae_item_properties.ae_item_property
              .reduce((rows, item, index) => {
                if (index % 2 === 0) rows.push([item]);
                else rows[rows.length - 1].push(item);
                return rows;
              }, [])
              .map((pair, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{pair[0]?.attr_name}:</span>
                    <span className="ml-2 text-gray-800">
                      {pair[0]?.attr_value}
                    </span>
                  </div>

                  {pair[1] && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">{pair[1]?.attr_name}:</span>
                      <span className="ml-2 text-gray-800">
                        {pair[1]?.attr_value}
                      </span>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
        <ReviewList
          reviews={[
            {
              name: "Alice",
              rating: 4,
              comment: "Great selectedProduct!",
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
      <div className="w-full md:w-1/4 p-4 pt-0 bg-white">
        <div className="bg-white p-6 rounded shadow-md border border-gray-200 w-full">
          {/* Section Title */}
          <h2 className="text-lg font-semibold mb-3">Shipping & Purchase</h2>

          {/* Shipping Cost */}
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Shipping Cost:</span> $
            {selectedSKU?.offer_sale_price ?? "—"}
          </p>
          product id:  {selectedProduct.ae_item_base_info_dto.product_id ?? "—"} <br />
          sku id: {selectedSKU?.sku_id ?? "—"}
          {/* Delivery Estimate */}
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Delivery:</span> 5–10 business days
          </p>

          {/* Stock Info */}
          <p
            className={`text-sm mb-3 ${
              selectedSKU?.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {selectedSKU?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Quantity + Add to Cart */}
          <div className="mt-4 flex items-center space-x-3">
            <label htmlFor="qty" className="text-sm font-medium">
              Qty:
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              max={selectedSKU?.stock || 99}
              defaultValue="1"
              className="w-20 border-2 border-gray-300 rounded px-2 py-2"
            />
            <button
              className="flex-1 border-2 border-red-600 text-red-600 font-semibold px-3 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: selectedProduct._id,
                    name: selectedProduct.ae_item_base_info_dto.subject,
                    price: selectedSKU.offer_sale_price,
                    quantity: 1,
                  })
                );
              }}
            >
              Add to Cart
            </button>
          </div>

          {/* Order Now Button */}
          <button
            onClick={goOrder}
            className="mt-4 block w-full bg-red-600 text-white text-center border-2 border-red-600 text-red-600 font-semibold px-3 py-2 rounded hover:bg-red-700 hover:text-white transition"
          >
            Order Now
          </button>

          {/* Wishlist */}
          <button
            className="mt-2 border border-gray-300 text-gray-700 px-3 py-2 rounded w-full hover:bg-gray-100 transition flex items-center justify-center"
            onClick={() => {
              // Example placeholder
              alert("Added to Wishlist!");
            }}
          >
            ❤️ Add to Wishlist
          </button>

          {/* Return Policy */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-600 space-y-1">
            <p>✅ 7-day easy return</p>
            <p>🔒 Secure payment options</p>
            <p>📦 Packaged with care</p>
          </div>
        </div>
      </div>

      <div className="w-full p-6">
        <div className="flex items-center justify-between p-4 py-2 bg-gray-100 border">
          <h2 className="text-2xl font-semibold text-gray-800">
            Similar Products
          </h2>
          <Link
            to="/search/sfdsdf"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Load More
          </Link>
        </div>
        <Recomand />
      </div>
    </div>
  );
};

export default ProductView;
