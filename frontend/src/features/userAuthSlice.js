import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import Api from "../util/API";

// Example async thunk for login
export const loginUser = createAsyncThunk(
    'userAuth/loginUser',
    async (credentials, thunkAPI) => {
        try {
            const res = await Api.post("/user/login", credentials);
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
            const res = await Api.post("/user/register", credentials);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
)



const token = localStorage.getItem("userToken");
const initialState = {
    user: token && token.split('.').length === 3 ? jwtDecode(token) : null,
    token: token || null,
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
        checkToken: (state) => {
            try {
                if (state.token && state.token.split('.').length === 3) {
                    const decoded = jwtDecode(state.token);
                    if (decoded.exp * 1000 < Date.now()) {
                        state.user = null;
                        state.token = null;
                        localStorage.removeItem("userToken");
                    } else {
                        state.user = decoded;
                    }
                } else {
                    state.user = null;
                    state.token = null;
                    localStorage.removeItem("userToken");
                }
            } catch {
                state.user = null;
                state.token = null;
                localStorage.removeItem("userToken");
            }
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
                state.token = action.payload.data.token;
                state.user = action.payload.data.token && action.payload.data.token.split('.').length === 3 ? jwtDecode(action.payload.data.token) : null;
                state.error = null;
                localStorage.setItem("userToken", action.payload.data.token);
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
                state.token = action.payload.data.token;
                state.user = action.payload.data.token && action.payload.data.token.split('.').length === 3 ? jwtDecode(action.payload.data.token) : null;
                state.error = null;
                localStorage.setItem("userToken", action.payload.data.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
    },
});

export const { logout, checkToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;