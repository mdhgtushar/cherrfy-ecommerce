import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchProducts } from "../../../features/productSlice";
import Loader from "../../../components/Loader";

const Recomand = () => {
  const { products, status } = useSelector((state) => state.products);
  const { country, currency } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();

  // useEffect(() => {
  //    if(status == "idle"){
  //     dispatch(fetchProducts({ country, currency }));
  //    }
  //   console.log(products)
  // }, [dispatch, status]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (status === "loading") {
    return <Loader />;
  } 
  console.log(status)
  if (products.length === 0) {
    return <div className="px-0 py-4">No products found</div>;
  }
return(
  <div>hello {status}</div>
)
  // return (
  //   <div className="px-0 py-4 ">
  //     <Slider {...settings}>
  //       {products.map((product) => {
  //         let prodctbody;
  //         try {
  //           prodctbody = JSON.parse(product.logText);
  //         } catch (error) {
  //           console.error("Error parsing product:", error);
  //           return null;
  //         }

  //         const image =
  //           prodctbody?.ae_multimedia_info_dto?.image_urls?.split(";")[0];
  //         const title = prodctbody?.ae_item_base_info_dto?.subject;
  //         const price =
  //           prodctbody?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o?.[0]
  //             ?.offer_sale_price;
  //         const rating = prodctbody?.ae_item_base_info_dto?.avg_evaluation_rating;

  //         return (
  //           <div key={product._id} className="px-2">
  //             <Link
  //               to={`/products/${product._id}`}
  //               className="block border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden h-full bg-white"
  //             >
  //               <img
  //                 src={image}
  //                 alt={title}
  //                 className="w-full h-40 object-cover"
  //               />
  //               <div className="p-3 flex flex-col justify-between ">
  //                 <div className="mb-2">
  //                   <h3 className="text-red-600 font-semibold text-base mb-1">
  //                     ${price}
  //                   </h3>
  //                   <h4 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
  //                     {title}
  //                   </h4>
  //                   <p className="text-yellow-600 text-sm mt-1">⭐ {rating}</p>
  //                 </div>
  //                 <div className="flex flex-col gap-2 mt-auto">
  //                   <button className="bg-red-600 text-white text-sm font-medium py-1 rounded hover:bg-red-700 transition">
  //                     Add to Cart
  //                   </button>
  //                   <button className="border border-gray-300 text-sm text-gray-800 py-1 rounded hover:bg-gray-100 transition">
  //                     ❤️ Wishlist
  //                   </button>
  //                 </div>
  //               </div>
  //             </Link>
  //           </div>
  //         );
  //       })}
  //     </Slider>
  //   </div>
  // );
};

export default Recomand;
