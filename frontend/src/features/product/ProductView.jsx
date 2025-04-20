import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const ProductView = () => {
  const [product, setProducts] = useState([]);
  const [prodctbody, setProductbody] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product/" + id);
      const data = await response.json();
      setProducts(data);
      console.log("Fetched products:", data);
      setProductbody(JSON.parse(data.logText));
      console.log("Fetched products:", JSON.parse(data.logText));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product.logText) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex  bg-gray-50 ">
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-md">
                <img
                  // src="ss.png"
                  src={
                    JSON.parse(
                      product.logText
                    ).ae_multimedia_info_dto.image_urls.split(";")[0]
                  }
                  alt={product.title}
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
                <div className="flex">
                  {prodctbody.ae_multimedia_info_dto.image_urls
                    .split(";")
                    .map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-md mt-2 mr-2"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {prodctbody.ae_item_base_info_dto.subject}
              </h1>

              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-lg">
                  ★ {product.rating}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  ({prodctbody.ae_item_base_info_dto.avg_evaluation_rating}{" "}
                  reviews)
                </span>
              </div>

              <p className="text-red-600 text-2xl font-semibold mt-4">
                $
                {
                  prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
                    .offer_sale_price
                }
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1 text-sm">
                {prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map(
                  (item) => {
                    const sku =
                      item.ae_sku_property_dtos.ae_sku_property_d_t_o[0];

                    return (
                      <div
                        key={item.sku_id}
                        className="border border-gray-200 p-1 hover:shadow-lg transition"
                      >
                        <img
                          src={sku.sku_image}
                          alt={sku.property_value_definition_name}
                          className="w-full object-cover cursor-pointer"
                        />
                        {/* <h2 className="text-lg font-semibold mb-2">
              {sku.property_value_definition_name}
            </h2>
            <p className="text-gray-600">Color: {sku.sku_property_value}</p>
            <p className="text-green-600 font-semibold">
              Price: ${item.offer_sale_price}
            </p>
            <p className="text-gray-500 text-sm">In stock: {item.sku_available_stock}</p> */}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-700 mt-6 leading-relaxed shadow p-4 bg-white rounded-lg border border-gray-200 w-full">
          <h2 className="text-xl font-bold mb-2">Item Properties</h2>
          <div className="space-y-2">
            {prodctbody.ae_item_properties.ae_item_property
              .reduce((rows, item, index) => {
                if (index % 2 === 0) rows.push([item]);
                else rows[rows.length - 1].push(item);
                return rows;
              }, [])
              .map((pair, i) => (
                <div key={i} className="flex justify-between gap-4">
                  {/* Left Item */}
                  <div className="flex-1">
                    <span className="font-semibold">{pair[0]?.attr_name}:</span>{" "}
                    <span>{pair[0]?.attr_value}</span>
                  </div>

                  {/* Right Item */}
                  <div className="flex-1">
                    {pair[1] && (
                      <>
                        <span className="font-semibold">
                          {pair[1].attr_name}:
                        </span>{" "}
                        <span>{pair[1].attr_value}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          className="text-gray-700 mt-6 leading-relaxed shadow p-4 bg-white rounded-lg border border-gray-200 w-full"
          dangerouslySetInnerHTML={{
            __html: prodctbody.ae_item_base_info_dto.detail,
          }}
        ></div>
      </div>
      <div className="w-96 border border-gray-200 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <p className="text-gray-700 mb-2">product id: {product.productId}</p>
        <p className="text-gray-700 mb-2">
          sku id:{" "}
          {prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0].sku_id}
        </p>

        <h2 className="text-lg font-semibold mb-2">Shipping</h2>
        <p className="text-gray-700 mb-2">
          Shipping Cost: $
          {
            prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
              .shipping_cost
          }
        </p>
        {/* Action Buttons */}
        <Link
          to="/order"
          className="border-2 border-red-600 text-center text-red-600 font-semibold px-3 py-2 rounded hover:bg-red-700 hover:text-white transition w-full block"
        >
          Order Now
        </Link>
        <div className="mt-6 flex items-center space-x-4">
      
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="w-20 border border-gray-200 border-gray-300 rounded px-3 py-2 focus:outline-none"
          />
          <button
            className="bg-red-600 text-white font-semibold px-3 py-2 rounded hover:bg-red-700 transition"
            onClick={() => {
              dispatch(
                addToCart({
                  id: product._id,
                  name: prodctbody.ae_item_base_info_dto.subject,
                  price:
                    prodctbody.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o[0]
                      .offer_sale_price,
                  quantity: 1,
                })
              );
            }}
          >
            Add to Cart
          </button>
          <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition">
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
