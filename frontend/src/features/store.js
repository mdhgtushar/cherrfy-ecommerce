import { configureStore } from "@reduxjs/toolkit";

import cartReducter from "./cartSlice"; 
import productReducer from "./productSlice"; 
import adminAuthReducer from "./adminAuthSlice";
import userAuthReducer from "./userAuthSlice";


const store = configureStore({
  reducer: {
    cart: cartReducter,
    adminAuth: adminAuthReducer,
    products: productReducer,
    userAuth: userAuthReducer
  },
});

export default store;