import { useDispatch, useSelector } from "react-redux"; 
import Loader from "../../components/Loader";
import { ToastContainer } from "react-toastify";
import ProductBox from "./ProductBox";
import { useEffect } from "react";
import { fetchProducts } from "../../features/productSlice";

const TopPicks = () => {
  const { products, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => { 
      dispatch(fetchProducts()); 
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <section className="bg-gray-50 py-10 px-2 sm:px-2 lg:px-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ✨ Top Picks For You
      </h2>
      <ToastContainer />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
        {products.map((product) => {
         return <ProductBox product={product} key={product._id} />
        })}
      </div>
    </section>
  );
};

export default TopPicks;
