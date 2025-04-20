import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product/");
      const data = await response.json();
      setProducts(data);
      console.log("Fetched products:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="px-4 py-8 bg-white">
      <h2 className="text-xl font-bold mb-4">🔥 Hot Offers</h2>
      <Slider {...settings}>
        {products.map((product) => {
          let prodctbody;
          try {
            prodctbody = JSON.parse(product.logText);
            console.log("Parsed product:", prodctbody);
          } catch (error) {
            console.error("Error parsing product:", error);
          }
          return (
            <Link to={`/products/${product._id}`} key={product._id}>
              <div className="px-2">
                <div className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                  <img
                    src={prodctbody.ae_multimedia_info_dto.image_urls.split(";")[0]
                    }
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-red-700">${prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0].offer_sale_price}</h3>
                    <h3 className="text-sm font-semibold">{prodctbody.ae_item_base_info_dto.subject.length > 100
                      ? prodctbody.ae_item_base_info_dto.subject.slice(0, 100) +
                        "..."
                      : prodctbody.ae_item_base_info_dto.subject}</h3>
                    <p className="text-yellow-700 font-bold">{prodctbody.ae_item_base_info_dto.avg_evaluation_rating}</p>
                    
                  </div>
                  <div className="p-4 pt-0">
                  <button className="bg-red-700 text-white font-semibold px-3 py-1 rounded hover:bg-red-700 transition mr-2">
              Add to Cart
            </button>
            <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition">
              ❤️ Wishlist
            </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
