import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { ToastContainer } from "react-toastify";
import ProductBox from "./ProductBox";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../../features/productSlice";
import { fetchCurrencyRates } from "../../../features/currencySlice";

const TopPicks = () => {
  const { products, status } = useSelector((state) => state.products);
  const { shipToCountry, currency } = useSelector(
    (state) => state.userSettings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ country: shipToCountry, currency: currency }));
  }, [dispatch, shipToCountry]);

console.log("TopPicks products:", products);

  if (status === "loading" || status === "idle") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div className="text-red-500">Failed to load products.</div>;
  }

  return (
    <section className="py-10 px-2 sm:px-2 lg:px-4">
      <ToastContainer />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {products.map((product) => {
          return (
            <ProductBox
              product={product}
              key={product._id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TopPicks;
