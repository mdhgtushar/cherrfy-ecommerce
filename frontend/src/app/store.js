import { configureStore } from "@reduxjs/toolkit";

import cartReducter from "../features/cart/cartSlice";
import authReducer from "../admin/auth/authSlice";
import productReducer from "../features/product/productSlice";


const store = configureStore({
  reducer: {
    cart: cartReducter,
    auth: authReducer,
    products: productReducer,
  },
});

export default store;