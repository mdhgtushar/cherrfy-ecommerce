import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../util/API';

export const fetchFollowedStores = createAsyncThunk('followedStores/fetchFollowedStores', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/followed-stores/');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch followed stores');
  }
});

export const followStore = createAsyncThunk('followedStores/followStore', async (storeId, { rejectWithValue }) => {
  try {
    const res = await API.post('/followed-stores/follow', { storeId });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to follow store');
  }
});

export const unfollowStore = createAsyncThunk('followedStores/unfollowStore', async (storeId, { rejectWithValue }) => {
  try {
    await API.post('/followed-stores/unfollow', { storeId });
    return storeId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to unfollow store');
  }
});

const followedStoresSlice = createSlice({
  name: 'followedStores',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowedStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowedStores.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFollowedStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(followStore.fulfilled, (state, action) => {
        if (!state.items.some(item => item.store._id === action.payload.store._id)) {
          state.items.push(action.payload);
        }
      })
      .addCase(unfollowStore.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.store._id !== action.payload);
      });
  }
});

export default followedStoresSlice.reducer; 