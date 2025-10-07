import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { ToastContainer } from "react-toastify";
import ProductBox from "./ProductBox";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchProducts } from "../../../features/productSlice";
import AllCaughtUp from "../../../components/AllCaughtUp";

const TopPicks = () => {
  const { products, status, hasMore } = useSelector((state) => state.products);
  const { shipToCountry, currency } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const observer = useRef();

  // প্রথমবার load
  useEffect(() => {
    dispatch(fetchProducts({ country: shipToCountry, currency, page: 1 }));
  }, [dispatch, shipToCountry, currency]);

  // স্ক্রলে নিচে গেলে নতুন পেজ লোড
  const lastProductRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  // page change হলে নতুন ডেটা fetch
  useEffect(() => {
    if (page > 1) {
      dispatch(fetchProducts({ country: shipToCountry, currency, page }));
    }
  }, [page, dispatch, shipToCountry, currency]);

  return (
    <section className="py-10 px-2 sm:px-2 lg:px-4">
      <ToastContainer />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            // শেষ প্রোডাক্টে observer attach করো
            return (
              <div ref={lastProductRef} key={product._id}>
                <ProductBox product={product} />
              </div>
            );
          } else {
            return <ProductBox key={product._id} product={product} />;
          }
        })}
      </div>

      {status === "loading" && <div className="mt-4"><Loader /></div>}
      {!hasMore && <AllCaughtUp />}
    </section>
  );
};

export default TopPicks;
