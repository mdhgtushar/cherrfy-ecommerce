import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const initialState = {
    theme: 'light',
    language: 'en',
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
            });
    },
});

export const { setTheme, setLanguage, setNotifications,setSettingsSlice } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;