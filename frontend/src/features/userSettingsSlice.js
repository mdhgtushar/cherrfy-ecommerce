import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../util/API';

// Example async thunk for updating user settings
export const updateUserSettings = createAsyncThunk(
    'userSettings/updateUserSettings',
    async (settings, thunkAPI) => {
        // Replace with your API call
        // const response = await api.updateSettings(settings);
        // return response.data;
        return settings; // Mocked response
    }
);
export const userProfileInfo = createAsyncThunk(
    'userAuth/userProfileInfo',
    async (credentials, thunkAPI) => {
        // Replace with your API call
        try {
            const res = await API.get("/user/profile");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

const initialState = {
    userProfile: null,
    theme: 'light',
    language: 'en',
    currency: 'USD', // Default currency
    shipToCountry: 'BD', // Default to 'BD' if not set
    notifications: true,
    status: 'idle',
    error: null,
};

const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setLanguage(state, action) {
            state.language = action.payload;
        },
        setNotifications(state, action) {
            state.notifications = action.payload;
        },
        setShipToCountry(state, action) {
            state.shipToCountry = action.payload;
        },
        setSettingsSlice(state, action) {
            console.log("setSettingsSlice called with payload:", action.payload);
            state.shipToCountry = action.payload.shipToCountry;
            state.currency = action.payload.currency;
            state.settings = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserSettings.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUserSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                Object.assign(state, action.payload);
            })
            .addCase(updateUserSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(userProfileInfo.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(userProfileInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Access the nested data property from the API response
                state.userProfile = action.payload.data;
            })
            .addCase(userProfileInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { setTheme, setLanguage, setNotifications, setSettingsSlice } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;