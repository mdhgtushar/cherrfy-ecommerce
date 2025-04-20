import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../cart/cartSlice";

const TopPicks = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ✨ Top Picks For You
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => {
          let prodctbody;
          try {
            prodctbody = JSON.parse(product.logText);
            console.log("Parsed product:", prodctbody);
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
              <h3 className="text-xl font-semibold text-red-700">${prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0].offer_sale_price}</h3>

                <h3 className="text-sm font-semibold text-gray-700">
                  <Link to={`/products/${product._id}`}>
                    {" "}
                    {prodctbody.ae_item_base_info_dto.subject.length > 30
                      ? prodctbody.ae_item_base_info_dto.subject.slice(0, 30) +
                        "..."
                      : prodctbody.ae_item_base_info_dto.subject}
                  </Link>
                  <br />
                  <span className="text-yellow-500">
                    {prodctbody.ae_item_base_info_dto.avg_evaluation_rating}
                  </span>
                </h3>
                <p className="text-red-700 font-bold text-sm mt-1">
                  {product.price}
                </p>
                <button
                  className="bg-red-700 text-white font-semibold px-3 py-1 rounded hover:bg-red-700 transition mr-2"
                  // onClick={() => {dispatch(addToCart({"id": product._id, "title": prodctbody.ae_item_base_info_dto.subject, "price": product.price, "quantity": 1}))}}
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product._id,
                        name: prodctbody.ae_item_base_info_dto.subject,
                        price: prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0].offer_sale_price,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition">
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopPicks;
