import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, getMeApi } from './authApi';
import { AsyncStorageDelete, AsyncStorageSave } from '@/utils/general';
import { serverSymbolApi } from '@/api/server';

interface AuthState {
    user: any;
    loading: boolean;
    serverSymbolApi: any
}

const initialState: AuthState = {
    user: null,
    loading: false,
    serverSymbolApi: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password, deviceId }: { username: string; password: string, deviceId: string }, thunkAPI) => {
        const res = await loginApi(username, password, deviceId);
        AsyncStorageSave('token', res.data.access_token);
        AsyncStorageSave('device_id', res.data.deviceId);
        return res.data.user;
    }
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
    const res = await getMeApi();
    return res.data;
});

export const getserver = createAsyncThunk('auth/accmt5', async () => {
    const res = await serverSymbolApi();
    return res;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            AsyncStorageDelete('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getserver.fulfilled, (state, action) => {
                state.serverSymbolApi = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
