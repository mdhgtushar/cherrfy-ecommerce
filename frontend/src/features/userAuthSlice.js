import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import Api from "../util/API";

// Example async thunk for login
export const loginUser = createAsyncThunk(
    'userAuth/loginUser',
    async (credentials, thunkAPI) => {
        try {
            const res = await Api.post("/user/auth/login", credentials);
            localStorage.setItem("userToken", res.data.token);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

// Register 
export const registerUser = createAsyncThunk(
    'userAuth/registerUser',
    async (credentials, thunkAPI) => {
        // Replace with your API call
        try {
            const res = await Api.post("/user/auth/register", credentials);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
)

const token = localStorage.getItem("userToken");
const initialState = {
    user: token ? jwtDecode(token) : null,
    token: null,
    loading: false,
    error: null,
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("userToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
    },
});

export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;