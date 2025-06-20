import { configureStore } from "@reduxjs/toolkit";

import cartReducter from "./cartSlice"; 
import productReducer from "./productSlice"; 
import adminAuthReducer from "./adminAuthSlice";
import userAuthReducer from "./userAuthSlice";
import userSettingsReducer from "./userSettingsSlice"; // Import user settings reducer


const store = configureStore({
  reducer: {
    cart: cartReducter,
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    products: productReducer,
    userSettings: userSettingsReducer, // Add user settings reducer
  },
});

export default store;