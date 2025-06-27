// features/currencySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../util/API';

 

// Async thunk to fetch currency data
export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/settings/currency');
      const data = await response.json();
      return data.rates;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency_list: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currency_list = action.payload;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default currencySlice.reducer;
