import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, checkout } from "../../features/cartSlice";
import {
  clearSelectedProduct,
  fetchProductById,
} from "../../features/productSlice";
import Loader from "../../components/Loader";
import USER_PATHS from "./USER_PATHS";
import ReviewList from "./ReviewList";

const ProductView = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const prodctbody = product.logText && JSON.parse(product?.logText);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (prodctbody) {
      const firstImage =
        prodctbody.ae_multimedia_info_dto.image_urls.split(";")[0];
      setSelectedImage(firstImage);
      setSelectedSKU(
        prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
      );
    }
  }, [product]);
  const goOrder = () => {
    dispatch(
      checkout([
        {
          id: 1,
          name: prodctbody.ae_item_base_info_dto.subject,
          price: 99.99,
          image: prodctbody.ae_multimedia_info_dto.image_urls.split(";")[0],
          quantity: 1,
        },
      ])
    );

    navigate(USER_PATHS.CHECKOUT);
  };

  if (!prodctbody) {
    return <Loader />;
  }

  const imageList = prodctbody.ae_multimedia_info_dto.image_urls.split(";");

  return (
    <div className="flex flex-wrap bg-gray-50 mb-10">
      <div className="w-full md:w-3/4">
        <div className="block md:flex border-b-2 border-gray-200 py-2 pr-2">
          {/* Images Column */}
          <div className="w-full md:w-3/5 flex p-2 md:p-4 md:h-[500px] h-[300px]">
            {/* Left scrollable thumbnails */}
            <div className="w-24 overflow-y-auto space-y-4 pr-4">
              {imageList.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumb ${index}`}
                  onClick={() => setSelectedImage(image)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-red-500 ${
                    selectedImage === image
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Selected Image */}
            <div className="flex-1 flex justify-center items-center border border-gray-200 rounded-md bg-white">
              <img
                src={selectedImage}
                alt="Selected"
                className="object-contain h-full w-full max-w-full"
              />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="w-full md:w-2/5 p-8 bg-white">
            <h1 className="text-xl font-bold mb-4">
              {prodctbody.ae_item_base_info_dto.subject}
            </h1>

            {selectedSKU && (
              <p className="text-red-600 text-xl font-semibold mb-2">
                ${selectedSKU.offer_sale_price}
              </p>
            )}

            <div className="grid grid-cols-6 gap-2 mb-4">
              {prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map(
                (item) => {
                  const sku =
                    item.ae_sku_property_dtos.ae_sku_property_d_t_o[0];
                  return (
                    <img
                      key={item.sku_id}
                      src={sku.sku_image}
                      alt={sku.property_value_definition_name}
                      className="w-full h-12 object-cover rounded border cursor-pointer"
                      onClick={() => setSelectedSKU(item)}
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
            {prodctbody.ae_item_properties.ae_item_property
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
      <div className="w-full md:w-1/4 p-4 pt-0 bg-white">
        <div className="bg-white p-6 rounded shadow-md border border-gray-200 w-full">
          <h2 className="text-lg font-semibold mb-2">Shipping</h2>
          <p className="text-gray-700 mb-2">
            Shipping Cost: ${selectedSKU?.shipping_cost}
          </p>

          <button
            onClick={goOrder}
            className="block w-full text-center border-2 border-red-600 text-red-600 font-semibold px-3 py-2 rounded hover:bg-red-700 hover:text-white transition"
          >
            Order Now
          </button>

          <div className="mt-4 flex items-center space-x-4">
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-20 border border-gray-300 rounded px-3 py-2"
            />
            <button
              className="flex-1 bg-red-600 text-white font-semibold px-3 py-2 rounded hover:bg-red-700 transition"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product._id,
                    name: prodctbody.ae_item_base_info_dto.subject,
                    price: selectedSKU.offer_sale_price,
                    quantity: 1,
                  })
                );
              }}
            >
              Add to Cart
            </button>
          </div>
          <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition mt-2 w-full">
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
