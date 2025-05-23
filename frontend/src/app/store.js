import { configureStore } from "@reduxjs/toolkit";

import cartReducter from "../features/cart/cartSlice"; 
import productReducer from "../features/product/productSlice"; 
import adminAuthReducer from "../features/adminAuth/adminAuthSlice";
import userAuthReducer from "../features/userAuth/userAuthSlice";


const store = configureStore({
  reducer: {
    cart: cartReducter,
    adminAuth: adminAuthReducer,
    products: productReducer,
    userAuth: userAuthReducer
  },
});

export default store;