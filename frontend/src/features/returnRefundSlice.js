import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../util/API";

// ====== Async Thunks ======

// Create a new return/refund request
export const createReturnRefund = createAsyncThunk(
  "returnRefund/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/return-refund", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create return/refund"
      );
    }
  }
);

// Get all return/refund requests (Admin)
export const getAllReturnRefunds = createAsyncThunk(
  "returnRefund/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/return-refund");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all return/refunds"
      );
    }
  }
);

// Get logged-in user’s requests
export const getUserReturnRefunds = createAsyncThunk(
  "returnRefund/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/return-refund/my-requests");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user return/refunds"
      );
    }
  }
);

// Get single return/refund by ID
export const getReturnRefundById = createAsyncThunk(
  "returnRefund/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/return-refund/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch return/refund"
      );
    }
  }
);

// Update return/refund status (Admin)
export const updateReturnRefundStatus = createAsyncThunk(
  "returnRefund/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/return-refund/${id}`, { status });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }
);

// Delete return/refund (Admin)
export const deleteReturnRefund = createAsyncThunk(
  "returnRefund/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/return-refund/${id}`);
      return { id, message: res.data?.message || "Deleted successfully" };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete return/refund"
      );
    }
  }
);

// ====== Slice ======
const returnRefundSlice = createSlice({
  name: "returnRefund",
  initialState: {
    loading: false,
    error: null,
    success: false,
    allRequests: [],
    userRequests: [],
    singleRequest: null,
  },
  reducers: {
    resetReturnRefundState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createReturnRefund.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReturnRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userRequests.push(action.payload);
      })
      .addCase(createReturnRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllReturnRefunds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReturnRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.allRequests = action.payload?.data || [];
      })
      .addCase(getAllReturnRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User
      .addCase(getUserReturnRefunds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserReturnRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.userRequests = action.payload?.data || [];
      })
      .addCase(getUserReturnRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(getReturnRefundById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReturnRefundById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleRequest = action.payload?.data;
      })
      .addCase(getReturnRefundById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateReturnRefundStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReturnRefundStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.allRequests.findIndex(
          (req) => req._id === action.payload._id
        );
        if (index !== -1) {
          state.allRequests[index] = action.payload;
        }
      })
      .addCase(updateReturnRefundStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteReturnRefund.fulfilled, (state, action) => {
        state.allRequests = state.allRequests.filter(
          (req) => req._id !== action.payload.id
        );
      });
  },
});

export const { resetReturnRefundState } = returnRefundSlice.actions;
export default returnRefundSlice.reducer;
