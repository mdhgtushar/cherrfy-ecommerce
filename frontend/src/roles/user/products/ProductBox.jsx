import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../../features/cartSlice";

const ProductBox = ({ product }) => {
  const { shipToCountry } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();

  let prodctbody = product.ali_data[shipToCountry]; 
  const imageUrl =
    prodctbody?.ae_multimedia_info_dto?.image_urls?.split(";")[0] || "";
  if (!prodctbody || !prodctbody.ae_item_base_info_dto) {
    return null;
  }
  return (
    <div class="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
        src={imageUrl}
        loading="lazy"
        alt="Product Image"
        class="rounded-xl w-full h-48 object-cover mb-4"
      />
      <h2 class="text-lg font-semibold text-gray-800 mb-2">
        {" "}
        {prodctbody.ae_item_base_info_dto.subject.length > 30
          ? prodctbody.ae_item_base_info_dto.subject.slice(0, 30) + "..."
          : prodctbody.ae_item_base_info_dto.subject}
      </h2>

      <div class="flex justify-between items-center">
        <span
          class="text-indigo-600 font-bold text-lg"
          style={{ color: "#e6931d" }}
        >
          $
          {
            prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
              .offer_sale_price
          }
        </span>
        <Link to={`/products/${product._id}`}>
          {" "}
          <button
            style={{ backgroundColor: "#e6931d" }}
            class="text-white px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-700"
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductBox;
