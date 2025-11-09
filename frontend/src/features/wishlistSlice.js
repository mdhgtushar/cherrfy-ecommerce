import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../util/API';

/* ================================
✅ Fetch Wishlist
================================ */
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/wishlist');
      return res.data.data; // array of wishlist items
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

/* ================================
✅ Add to Wishlist
================================ */
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.post('/wishlist/add', { productId });
      return res.data.data; // return added item
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add to wishlist');
    }
  }
);

/* ================================
✅ Remove From Wishlist
================================ */
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.delete('/wishlist/remove', { data: { productId } });
      console.log("Remove from wishlist response:", res);
      // ✅ make sure server returns { data: productId }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove from wishlist');
    }
  }
);


/* ================================
✅ Slice
================================ */
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ✅ Fetch Wishlist */
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // array
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ✅ Add To Wishlist */
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.items.some(
          (item) => item.product._id === action.payload.product._id
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      /* ✅ Remove From Wishlist */
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // ✅ action.payload = productId
        state.items = state.items.filter(
          (item) => item.product._id !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;
