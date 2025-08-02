import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, getMeApi } from './authApi';
import { AsyncStorageDelete, AsyncStorageSave } from '@/utils/general';
import { serverSymbolApi } from '@/api/server';
import { IUser } from '@/utils/type';

interface AuthState {
    user: IUser | null;
    loading: boolean;
    loadingGetMe: boolean;
    loadingGetServer: boolean;
    serverSymbolApi: any
}

const initialState: AuthState = {
    user: null,
    serverSymbolApi: null,
    loading: false,
    loadingGetMe: false,
    loadingGetServer: false,
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
            state.serverSymbolApi = null;
            AsyncStorageDelete('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getMe.pending, (state) => {
                state.loadingGetMe = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loadingGetMe = false;
            })
            .addCase(getMe.rejected, (state) => {
                state.user = null;
                AsyncStorageDelete('token');
                state.loadingGetMe = false;
            })
            .addCase(getserver.pending, (state) => {
                state.loadingGetServer = true;
            })
            .addCase(getserver.fulfilled, (state, action) => {
                state.serverSymbolApi = action.payload;
                state.loadingGetServer = false;
            })
            .addCase(getserver.rejected, (state) => {
                state.loadingGetServer = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
