import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import Api from "../util/API";

const token = localStorage.getItem("adminToken");

const initialState = {
  user: token && token.split('.').length === 3 ? jwtDecode(token) : null,
  token: token || null,
  loading: false,
};

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await Api.post("/admin/login", data);
    localStorage.setItem("adminToken", res.data.data.token);
    return res.data.data.token;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("adminToken");
    },
    checkToken: (state) => {
      try {
        if (state.token && state.token.split('.').length === 3) {
          const decoded = jwtDecode(state.token);
          if (decoded.exp * 1000 < Date.now()) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("adminToken");
          } else {
            state.user = decoded;
          }
        } else {
          state.user = null;
          state.token = null;
          localStorage.removeItem("adminToken");
        }
      } catch {
        state.user = null;
        state.token = null;
        localStorage.removeItem("adminToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.user = action.payload && action.payload.split('.').length === 3 ? jwtDecode(action.payload) : null;
    });
  },
});

export const { logout, checkToken } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
