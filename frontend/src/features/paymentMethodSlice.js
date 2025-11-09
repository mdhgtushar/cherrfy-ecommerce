import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../util/API';

// ✅ Fetch all payment methods
export const fetchPaymentMethods = createAsyncThunk(
  'paymentMethods/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/payment-methods');
      return res.data.data; // ধরে নিচ্ছি backend থেকে { data: [...] } আসছে
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch payment methods'
      );
    }
  }
);

// ✅ Add a new payment method
export const addPaymentMethod = createAsyncThunk(
  'paymentMethods/add',
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await API.post('/payment-methods', paymentData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add payment method'
      );
    }
  }
);

// ✅ Update payment method
export const updatePaymentMethod = createAsyncThunk(
  'paymentMethods/update',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/payment-methods/${id}`, updateData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update payment method'
      );
    }
  }
);

// ✅ Delete payment method
export const deletePaymentMethod = createAsyncThunk(
  'paymentMethods/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/payment-methods/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete payment method'
      );
    }
  }
);

// ✅ Slice
export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState: {
    paymentMethods: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Optional: Local action to set default method instantly
    setDefaultMethod: (state, action) => {
      const id = action.payload;
      state.paymentMethods = state.paymentMethods.map((method) => ({
        ...method,
        isDefault: method._id === id, // backend field অনুযায়ী ঠিক করে নাও
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ADD
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.paymentMethods.push(action.payload);
      })

      // UPDATE
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.paymentMethods.findIndex(
          (item) => item._id === updated._id
        );
        if (index !== -1) state.paymentMethods[index] = updated;
      })

      // DELETE
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.paymentMethods = state.paymentMethods.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { setDefaultMethod } = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;
