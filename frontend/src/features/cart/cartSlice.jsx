// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCart = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (err) {
    console.error("Error loading cart:", err);
    return [];
  }
};

// Save cart to localStorage
const saveCart = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Error saving cart:", err);
  }
};

const initialState = {
  items: loadCart(),
  checkoutItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      saveCart(state.items);
    },
    checkout: (state, action) => {
      const item = action.payload;

      state.checkoutItems = item;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity,checkout } =
  cartSlice.actions;
export default cartSlice.reducer;
