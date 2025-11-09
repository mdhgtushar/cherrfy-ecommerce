import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from '../util/API';


export const fetchShippingAddresses = createAsyncThunk(
  'shippingAddresses/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const res = await API.get('/shipping-address');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shipping addresses');
    }
  }
);

export const addShippingAddress = createAsyncThunk(
  'shippingAddresses/add',
  async (addressData, {rejectWithValue}) => {
    try {
      const res = await API.post('/shipping-address', addressData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add shipping address');
    }
  }
);

export const shippingAddressSlice = createSlice({
  name: 'shippingAddresses',
  initialState: {
    shippingAddresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingAddresses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchShippingAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shippingAddresses = action.payload;
      })
      .addCase(fetchShippingAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addShippingAddress.fulfilled, (state, action) => {
        state.shippingAddresses.push(action.payload);
      });
  } 
});

export default shippingAddressSlice.reducer;