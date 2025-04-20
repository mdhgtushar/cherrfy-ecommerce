import { configureStore } from "@reduxjs/toolkit";

import cartReducter from "../features/cart/cartSlice";


const store = configureStore({
  reducer: {
    cart: cartReducter,
  },
});

export default store;