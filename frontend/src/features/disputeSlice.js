import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../util/API';

// Async thunks
export const createDispute = createAsyncThunk(
  'dispute/createDispute',
  async (disputeData, { rejectWithValue }) => {
    try {
      const response = await API.post('/dispute', disputeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create dispute');
    }
  }
);

export const getUserDisputes = createAsyncThunk(
  'dispute/getUserDisputes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/dispute/user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch disputes');
    }
  }
);

export const getDisputeById = createAsyncThunk(
  'dispute/getDisputeById',
  async (disputeId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/dispute/${disputeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dispute');
    }
  }
);

export const addMessage = createAsyncThunk(
  'dispute/addMessage',
  async ({ disputeId, message }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/dispute/${disputeId}/messages`, { message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const escalateDispute = createAsyncThunk(
  'dispute/escalateDispute',
  async (disputeId, { rejectWithValue }) => {
    try {
      const response = await API.post(`/dispute/${disputeId}/escalate`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to escalate dispute');
    }
  }
);

export const getDisputeStats = createAsyncThunk(
  'dispute/getDisputeStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/dispute/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dispute statistics');
    }
  }
);

// Admin thunks
export const getAllDisputes = createAsyncThunk(
  'dispute/getAllDisputes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/dispute/admin/all');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all disputes');
    }
  }
);

export const updateDisputeStatus = createAsyncThunk(
  'dispute/updateDisputeStatus',
  async ({ disputeId, status, resolution }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/dispute/${disputeId}/status`, { status, resolution });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update dispute status');
    }
  }
);

const initialState = {
  disputes: [],
  selectedDispute: null,
  stats: {
    total: 0,
    open: 0,
    byStatus: []
  },
  loading: false,
  error: null,
  success: false
};

const disputeSlice = createSlice({
  name: 'dispute',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setSelectedDispute: (state, action) => {
      state.selectedDispute = action.payload;
    },
    clearDisputes: (state) => {
      state.disputes = [];
      state.selectedDispute = null;
      state.stats = {
        total: 0,
        open: 0,
        byStatus: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Create dispute
      .addCase(createDispute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDispute.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.disputes.unshift(action.payload.data);
      })
      .addCase(createDispute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get user disputes
      .addCase(getUserDisputes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDisputes.fulfilled, (state, action) => {
        state.loading = false;
        state.disputes = action.payload.data;
      })
      .addCase(getUserDisputes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get dispute by ID
      .addCase(getDisputeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisputeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDispute = action.payload.data;
      })
      .addCase(getDisputeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add message
      .addCase(addMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDispute = action.payload.data;
        // Update the dispute in the list
        const index = state.disputes.findIndex(d => d._id === action.payload.data._id);
        if (index !== -1) {
          state.disputes[index] = action.payload.data;
        }
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Escalate dispute
      .addCase(escalateDispute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(escalateDispute.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDispute = action.payload.data;
        // Update the dispute in the list
        const index = state.disputes.findIndex(d => d._id === action.payload.data._id);
        if (index !== -1) {
          state.disputes[index] = action.payload.data;
        }
      })
      .addCase(escalateDispute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get dispute stats
      .addCase(getDisputeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisputeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(getDisputeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get all disputes (admin)
      .addCase(getAllDisputes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDisputes.fulfilled, (state, action) => {
        state.loading = false;
        state.disputes = action.payload.data;
      })
      .addCase(getAllDisputes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update dispute status (admin)
      .addCase(updateDisputeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDisputeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDispute = action.payload.data;
        // Update the dispute in the list
        const index = state.disputes.findIndex(d => d._id === action.payload.data._id);
        if (index !== -1) {
          state.disputes[index] = action.payload.data;
        }
      })
      .addCase(updateDisputeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, setSelectedDispute, clearDisputes } = disputeSlice.actions;
export default disputeSlice.reducer; 