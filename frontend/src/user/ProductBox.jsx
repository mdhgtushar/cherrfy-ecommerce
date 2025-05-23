import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../features/cart/cartSlice";

const ProductBox = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = async (data) => {
    const response = await dispatch(addToCart(data));
    console.log(response);
    if (response.error) {
      toast.error(response.error.message);
    } else {
      toast.success("Product added to cart successfully.");
    }
  };
  let prodctbody;
  try {
    prodctbody = JSON.parse(product.logText);
  } catch (error) {
    console.error("Invalid JSON in product.logText:", error);
    return null; // skip this product
  }

  const imageUrl =
    prodctbody?.ae_multimedia_info_dto?.image_urls?.split(";")[0] || "";

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm md:shadow-none hover:shadow-md transition duration-200"
      key={product._id}
    >
      <ToastContainer />
      <Link to={`/products/${product._id}`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={prodctbody?.title || product.title}
            className="w-full h-48 object-cover rounded-t-md"
          />
        )}
      </Link>
      <div className="p-3">
        <h3 className="text-xl font-semibold text-red-700">
          $
          {
            prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
              .offer_sale_price
          }
        </h3>

        <h3 className="text-sm font-semibold text-gray-700">
          <Link to={`/products/${product._id}`}>
            {" "}
            {prodctbody.ae_item_base_info_dto.subject.length > 30
              ? prodctbody.ae_item_base_info_dto.subject.slice(0, 30) + "..."
              : prodctbody.ae_item_base_info_dto.subject}
          </Link>
          <br />
          <span className="text-yellow-500">
            {prodctbody.ae_item_base_info_dto.avg_evaluation_rating}
          </span>
        </h3>
        <p className="text-red-700 font-bold text-sm mt-1">{product.price}</p>
        <div className="flex justify-between">
          <button
            className="flex-1 bg-red-700 text-white md:font-semibold px-3 py-1 rounded hover:bg-red-700 transition mr-2 text-sm"
            // onClick={() => {dispatch(addToCart({"id": product._id, "title": prodctbody.ae_item_base_info_dto.subject, "price": product.price, "quantity": 1}))}}
            onClick={() =>
              handleAddToCart({
                id: product._id,
                name: prodctbody?.ae_item_base_info_dto.subject,
                price:
                  prodctbody?.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
                    .offer_sale_price,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>
          <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition">
            ❤️ <span className="hidden md:inline">Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
