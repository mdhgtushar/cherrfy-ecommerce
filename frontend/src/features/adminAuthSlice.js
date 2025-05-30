import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import Api from "../util/API";

const token = localStorage.getItem("adminToken");

const initialState = {
  user: token ? jwtDecode(token) : null,
  token,
  loading: false,
};

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await Api.post("/auth/", data);
    localStorage.setItem("adminToken", res.data.token);
    return res.data.token;
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
        const decoded = jwtDecode(state.token);
        if (decoded.exp * 1000 < Date.now()) {
          state.user = null;
          state.token = null;
          localStorage.removeItem("token");
        } else {
          state.user = decoded;
        }
      } catch {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
    });
  },
});

export const { logout, checkToken } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
