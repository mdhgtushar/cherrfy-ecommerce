 
// App.js বা index.js-এ
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import ProductView from "./features/product/ProductView";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./features/main/MainPage";
import About from "./pages/About";
import CartPage from "./features/cart/CartPage";
import OrderForm from "./features/order/OrderForm";

 
function App() {
  return (
    <div> 
     <Routes>
     <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/order" element={<OrderForm/>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route> 
     </Routes>
    </div>
  );
}

export default App;
