import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    id: null,
    getLoading: false,
    profileLoading: false,
    loading: false,
    isLoading: false,
    isAuthenticated: false,
    token: null,
    error: null
}
export const createUser = createAsyncThunk('user/createUser', async (userData, thunkAPI) => {
    try {
        const { data, navigate } = userData;
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}/register`, data);
        console.log(response.data);
        if (response.data) {
            toast.success(response.data.message);
            navigate('/verify/otp');
            return response.data;
        }
    } catch (e) {
        toast.error(e.response.data.message)
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message)
    }
})
export const userAuth = createAsyncThunk('user/userAuth', async (userData, thunkAPI) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}/login`, userData.data);
        console.log(response.data)
        if (response.data) {
            toast.success(response.data.message);
            userData.navigate('/verify/otp');
            return response.data;
        }
    } catch (e) {
        toast.error(e.response.data.message)
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message)
    }
})

export const userVerify = createAsyncThunk('user/userVerify', async (userData, thunkAPI) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}/verify`, userData);
        console.log(response.data);
        localStorage.setItem('user-token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success(response.data.message);
        userData.navigate('/profile')
        return response.data;
    } catch (e) {
        toast.error(e.response.data.message)
        return thunkAPI.rejectWithValue(e.response.data.message)
    }
})
export const getProfile = createAsyncThunk('profile/userProfile', async (token, thunkAPI) => {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.get(`${BASE_URL}/profile`, config);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.message)
    }
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
            localStorage.removeItem('user-token')

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.getLoading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.getLoading = false;
                state.id = action.payload.userId
            })
            .addCase(createUser.rejected, (state, action) => {
                state.getLoading = false;
                state.error = action.payload;
            })
            .addCase(userAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(userAuth.fulfilled, (state, action) => {
                //console.log(action.payload)
                state.loading = false;
                state.id = action.payload.userId;
            })
            .addCase(userAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userVerify.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userVerify.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true
            })
            .addCase(userVerify.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getProfile.pending, (state) => {
                state.profileLoading = true
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileLoading = false
                state.user = action.payload
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.profileLoading = false
                state.error = action.payload
            })
    }
})
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;