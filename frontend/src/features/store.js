import { configureStore } from "@reduxjs/toolkit";

import cartReducter from "./cartSlice"; 
import productReducer from "./productSlice"; 
import adminAuthReducer from "./adminAuthSlice";
import userAuthReducer, { logout } from "./userAuthSlice";
import userSettingsReducer from "./userSettingsSlice";  
import currencyReducer from "./currencySlice"; 
import disputeReducer from "./disputeSlice";
import wishlistReducer from "./wishlistSlice";
import followedStoresReducer from "./followedStoresSlice";
import orderReducer from './orderSlice';
import { setUnauthorizedHandler } from "../util/API";


const store = configureStore({
  reducer: {
    cart: cartReducter,
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    products: productReducer,
    userSettings: userSettingsReducer, 
    currency: currencyReducer,
    dispute: disputeReducer,
    wishlist: wishlistReducer,
    followedStores: followedStoresReducer,
    order: orderReducer
  },
});
 
setUnauthorizedHandler(() => {
  store.dispatch(logout());
});

export default store;